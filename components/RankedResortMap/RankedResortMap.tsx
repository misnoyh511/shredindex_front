import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '../../src/js/components/config/breakpoints';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import useQueryResortsMap from '../../hooks/useQueryResortsMap';
import { CSpinner } from '@coreui/react';
import { MAP_STYLES } from '@/RankedResortMap/GoogleMapStyles';
import ResortPopup from '@/RankedResortMap/RankedResortMapPopup';
import ResortMarker from '@/RankedResortMap/RankedResortMapMarker';
import { Resort, ApiFilters, PixelOffset } from '../../types/googleMapTypes';

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
      const { orderBy: _, ...filterData } = filters; // Remove orderBy from filters
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
      // Fallback to default if parsing fails
      return {
        type_name: 'total_score',
        direction: 'desc',
      };
    }
  }, [router.query.orderBy]);

  // Track if this is a new query
  const currentQuery = JSON.stringify(apiFilters);
  const isNewQuery = currentQuery !== previousQueryRef.current;

  // Query using URL-based filters
  const { loading, data, error } = useQueryResortsMap(13, 1, apiFilters, orderBy);

  // Map configuration
  const defaultCenter = useMemo(() => ({ lat: 40, lng: -100 }), []);
  const defaultZoom = useMemo(() => 4, []);
  const mapOptions: google.maps.MapOptions = useMemo(() => ({
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoomControl: false,
    clickableIcons: false,
    minZoom: 2,
    maxZoom: 15,
    gestureHandling: 'greedy',
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      },
      strictBounds: true,
    },
    styles: MAP_STYLES,
  }), []);

  const mapContainerStyle = useMemo(() => ({
    width: '100%',
    height: isMobileTablet ? '100%' : 'calc(100vh - 80px)',
    position: 'sticky' as const,
    top: 0,
  }), [isMobileTablet]);

  const wrapperStyle = useMemo(() => ({
    position: 'relative' as const,
    height: '100%',
    paddingBottom: '2rem',
    paddingTop: isMobileTablet ? '0rem' : '2rem',
  }), [isMobileTablet]);

  const stickyContainerStyle = useMemo(() => ({
    position: 'sticky' as const,
    top: isMobileTablet ? '0rem' : '2rem',
    left: '0',
    right: '0',
    height: isMobileTablet ? '100%' : 'calc(100vh - 80px)',
  }), [isMobileTablet]);

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

  // Update display resorts smoothly
  useEffect(() => {
    if (resorts.length > 0) {
      setDisplayResorts(resorts);
    }
  }, [resorts]);

  // Function to update filters with Map Area
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

    // Update URL with new filters
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
    () => debounce(updateFiltersForMapArea, 500),
    [updateFiltersForMapArea],
  );

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setIsMapReady(true);
  }, []);

  // Function to fit bounds based on resorts
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

    // Use setTimeout to ensure isAutoFitRef is reset after the bounds_changed event is triggered
    setTimeout(() => {
      isAutoFitRef.current = false;
    }, 1000);
  }, [map, resorts]);

  // Handle location type changes
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

  // Effect for handling resort updates and new queries
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

  // Effect for handling map interaction
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

  // Cleanup
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
      <div className="d-flex align-items-center justify-content-center h-100 bg-dark border-radius-large">
        <div className="text-medium-emphasis">Loading map...</div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={stickyContainerStyle} className={`sticky-resort-map overflow-hidden ${isMobileTablet ? '' : 'border-radius-large'}`}>
        <div className="h-100">
          {error && (
            <div className="d-flex align-items-center justify-content-center h-100 bg-dark">
              <div className="text-danger">Error loading resorts. Please try again.</div>
            </div>
          )}

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
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
            <div className="position-absolute top-0 start-0 w-100 mt-4 d-flex align-items-center justify-content-center">
              <CSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankedResortMap;
