import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '../../src/js/components/config/breakpoints';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import useQueryResortsMap from '../../hooks/useQueryResortsMap';
import { CSpinner } from '@coreui/react';
import ResortPopup from '@/RankedResortMap/RankedResortMapPopup/RankedResortMapPopup';
import ResortMarker from '@/RankedResortMap/RankedResortMapMarker';
import { Resort, ApiFilters, PixelOffset } from '../../types/googleMapTypes';
import { googleMapsOptions } from '@/js/components/config/google-maps-options';

const RankedResortMap: React.FC = () => {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [displayResorts, setDisplayResorts] = useState<Resort[]>([]);
  const { width } = useWindowDimensions();
  const isMobileTablet = width <= breakpoints.md;
  const userInteractionRef = useRef(false);
  const shouldUpdateFiltersRef = useRef(false);
  const isAutoFitRef = useRef(false);
  const previousResortsRef = useRef<Resort[]>([]);
  const previousQueryRef = useRef('');
  const previousLocationTypeRef = useRef<ApiFilters['locationType'] | null>(null);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  // Get and transform filters from URL
  const apiFilters: ApiFilters = useMemo(() => {
    if (!router.query.filters) return { groupedType: [], locationType: {} };

    try {
      const filters = JSON.parse(router.query.filters as string);
      const { orderBy: _, ...filterData } = filters;
      return {
        groupedType: Array.isArray(filterData.groupedType) ? filterData.groupedType : [],
        locationType: filterData.locationType || {},
      };
    } catch (error) {
      console.error('Error parsing filters from URL:', error);
      return { groupedType: [], locationType: {} };
    }
  }, [router.query.filters]);

  // Get orderBy with total_score as default
  const orderBy = useMemo(() => {
    if (!router.query.orderBy) {
      return {
        type_name: 'total_score',
        direction: 'desc',
      };
    }

    try {
      return JSON.parse(router.query.orderBy as string);
    } catch (error) {
      console.error('Error parsing orderBy from URL:', error);
      return {
        type_name: 'total_score',
        direction: 'desc',
      };
    }
  }, [router.query.orderBy]);

  const currentQuery = JSON.stringify(apiFilters);
  const isNewQuery = currentQuery !== previousQueryRef.current;

  const { loading, data, error } = useQueryResortsMap(13, 1, apiFilters, orderBy);

  const defaultCenter = useMemo(() => ({ lat: 10, lng: -110 }), []);
  const defaultZoom = useMemo(() => 2, []);
  const mapOptions: google.maps.MapOptions = useMemo(() => (googleMapsOptions), []);

  const mapContainerClass = isMobileTablet ? 'map-container map-container--mobile' : 'map-container';

  // Process resorts data
  const resorts = useMemo(() => {
    if (!data?.resorts?.data) return [];

    return data.resorts.data.filter(resort => {
      if (!resort?.location?.latitude || !resort?.location?.longitude) return false;
      const lat = parseFloat(resort.location.latitude);
      const lng = parseFloat(resort.location.longitude);
      return !isNaN(lat) && !isNaN(lng);
    });
  }, [data]);

  useEffect(() => {
    if (resorts.length > 0) {
      setDisplayResorts(resorts);
    }
  }, [resorts]);

  const updateFiltersForMapArea = useCallback((bounds: google.maps.LatLngBounds) => {
    if (!bounds || !shouldUpdateFiltersRef.current || isAutoFitRef.current) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const newFilters: ApiFilters = {
      ...apiFilters,
      locationType: {
        mapArea: {
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng(),
        },
      },
    };

    const newQuery = {
      ...router.query,
      filters: JSON.stringify(newFilters),
    };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    }, undefined, { shallow: true });
  }, [apiFilters, router]);

  const debouncedUpdateFilters = useMemo(
    () => debounce(updateFiltersForMapArea, 10),
    [updateFiltersForMapArea],
  );

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setIsMapReady(true);
  }, []);

  const fitBoundsToResorts = useCallback(() => {
    if (!map || !resorts.length) return;

    isAutoFitRef.current = true;
    const bounds = new google.maps.LatLngBounds();
    let validBounds = false;

    resorts.forEach(resort => {
      const lat = parseFloat(resort.location.latitude);
      const lng = parseFloat(resort.location.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend({ lat, lng });
        validBounds = true;
      }
    });

    if (validBounds) {
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      map.setOptions({ maxZoom: 10 });
      map.fitBounds(bounds, padding);
    }

    setTimeout(() => {
      isAutoFitRef.current = false;
    }, 1000);
  }, [map, resorts]);

  useEffect(() => {
    if (!map || !isMapReady) return;

    const currentLocationType = apiFilters.locationType;
    const previousLocationType = previousLocationTypeRef.current;

    const hasLocationChange = JSON.stringify(currentLocationType) !== JSON.stringify(previousLocationType);
    const isMapAreaChange = hasLocationChange &&
      currentLocationType?.mapArea && previousLocationType?.mapArea;

    if (hasLocationChange && !isMapAreaChange) {
      userInteractionRef.current = false;
      shouldUpdateFiltersRef.current = false;
      fitBoundsToResorts();
    }

    previousLocationTypeRef.current = currentLocationType;
  }, [apiFilters.locationType, map, isMapReady, fitBoundsToResorts]);

  useEffect(() => {
    if (!map || !isMapReady) return;

    if (isNewQuery && !shouldUpdateFiltersRef.current) {
      userInteractionRef.current = false;
      previousQueryRef.current = currentQuery;
    }

    const resortsChanged = JSON.stringify(resorts) !== JSON.stringify(previousResortsRef.current);

    if ((isNewQuery || resortsChanged) && !userInteractionRef.current && !shouldUpdateFiltersRef.current) {
      fitBoundsToResorts();
    }

    previousResortsRef.current = resorts;
  }, [map, resorts, isMapReady, fitBoundsToResorts, isNewQuery, currentQuery]);

  useEffect(() => {
    if (!map || !isMapReady) return;

    const dragStartListener = map.addListener('dragstart', () => {
      if (!isAutoFitRef.current) {
        userInteractionRef.current = true;
        shouldUpdateFiltersRef.current = true;
      }
    });

    const zoomChangedListener = map.addListener('zoom_changed', () => {
      if (!isAutoFitRef.current) {
        userInteractionRef.current = true;
        shouldUpdateFiltersRef.current = true;
      }
    });

    const boundsChangedListener = map.addListener('bounds_changed', () => {
      if (!isAutoFitRef.current && userInteractionRef.current && shouldUpdateFiltersRef.current) {
        const bounds = map.getBounds();
        if (bounds) {
          debouncedUpdateFilters(bounds);
        }
      }
    });

    return () => {
      google.maps.event.removeListener(dragStartListener);
      google.maps.event.removeListener(zoomChangedListener);
      google.maps.event.removeListener(boundsChangedListener);
    };
  }, [map, isMapReady, debouncedUpdateFilters]);

  useEffect(() => {
    return () => {
      debouncedUpdateFilters.cancel();
    };
  }, [debouncedUpdateFilters]);

  const getPixelPositionOffset = useCallback((): PixelOffset => ({
    x: 0,
    y: 0,
  }), []);

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="text-medium-emphasis">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="map-wrapper">
      <div className={`sticky-resort-map ${isMobileTablet ? '' : 'border-radius-large'}`}>
        <div className="h-100">
          {error && (
            <div className="map-error">
              <div className="text-danger">Error loading resorts. Please try again.</div>
            </div>
          )}

          <GoogleMap
            mapContainerClassName={mapContainerClass}
            center={defaultCenter}
            zoom={defaultZoom}
            options={mapOptions}
            onLoad={handleMapLoad}
          >
            {displayResorts.map(resort => {
              const lat = parseFloat(resort.location.latitude);
              const lng = parseFloat(resort.location.longitude);

              if (isNaN(lat) || isNaN(lng)) return null;

              return (
                <OverlayView
                  key={resort.id}
                  position={{ lat, lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <ResortMarker
                    resort={resort}
                    isSelected={selectedResort?.id === resort.id}
                    onClick={() => setSelectedResort(resort)}
                  />
                </OverlayView>
              );
            })}

            {selectedResort && isMobileTablet && (
              <ResortPopup
                url_segment={selectedResort?.url_segment}
                onClose={() => setSelectedResort(null)}
                containerRef={mapContainerRef}
              />
            )}

            {selectedResort && !isMobileTablet && (
              <OverlayView
                key={`popup-${selectedResort.id}`}
                position={{
                  lat: parseFloat(selectedResort.location.latitude),
                  lng: parseFloat(selectedResort.location.longitude),
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={getPixelPositionOffset}
              >
                <ResortPopup
                  url_segment={selectedResort?.url_segment}
                  onClose={() => setSelectedResort(null)}
                  containerRef={mapContainerRef}
                />
              </OverlayView>
            )}
          </GoogleMap>

          {loading && (
            <div className="map-loading-overlay">
              <CSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankedResortMap;
