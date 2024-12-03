import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CFormInput, CListGroup, CListGroupItem } from '@coreui/react';
import LocationMap from '../../icons/location-map.svg';
import { gql, useLazyQuery } from '@apollo/client';
import countryList from 'react-select-country-list';
import SnowboardBackflip from '../../images/snowboard-backflip.svg';
import { TypeIcon } from '@/Icons/TypeIcon';
import RegionSelect from './../RegionSelect/RegionSelectSearch';
import { currentFilterState } from '../../atoms/filterState';
import { getContinent } from '../../hooks/getContinent';
import { SvgIcon } from '@/Icons/SvgIcon';

export const SEARCH_RESORTS = gql`
  query SearchResorts($query: String!, $page: Int = 1, $perPage: Int = 20) {
    searchResorts(query: $query, page: $page, perPage: $perPage) {
      data {
        id
        title
        url_segment
        location {
          city
          state {
            name
          }
          country {
            name
          }
        }
      }
      paginatorInfo {
        currentPage
        perPage
        total
        lastPage
      }
    }
  }
`;

const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRegionSelect, setShowRegionSelect] = useState(false);
  const [, setFormData] = useRecoilState(currentFilterState);
  const searchRef = useRef(null);
  const router = useRouter();
  const [isMapArea, setIsMapArea] = useState(false);

  const [searchResorts, { loading, error, data }] = useLazyQuery(SEARCH_RESORTS);

  const countries = countryList().getData();
  const continents = [
    { label: 'Worldwide', value: 'worldwide' },
    { label: 'Asia', value: 'AS' },
    { label: 'North America', value: 'NA' },
    { label: 'South America', value: 'SA' },
    { label: 'Europe', value: 'EU' },
    { label: 'Oceania', value: 'OC' },
    { label: 'Africa', value: 'AF' },
  ];

  // Check if current filter is a map area
  useEffect(() => {
    if (router.query.filters) {
      try {
        const filters = JSON.parse(router.query.filters);
        const hasMapArea = filters.locationType?.mapArea;
        setIsMapArea(!!hasMapArea);

        if (hasMapArea) {
          setQuery('Map area');
          setShowSuggestions(false);
          setShowRegionSelect(false);
        } else if (!filters.locationType?.countryId && !filters.locationType?.continentId) {
          setQuery('');
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        console.error('Error parsing filters:', error);
      }
    }
  }, [router.query.filters]);

  const updateQuery = useCallback((newLocationData) => {
    console.log('updateQuery called with:', newLocationData);

    // Get the current filters from the URL or default to empty object
    const currentFilters = router.query.filters ? JSON.parse(router.query.filters) : {};

    const updatedQuery = {
      ...router.query,
      filters: JSON.stringify({
        ...currentFilters,
        groupedType: currentFilters.groupedType || [], // Preserve groupedType
        locationType: newLocationData,
      }),
      page: '1',
    };

    console.log('pushing new query:', updatedQuery);
    router.push({
      pathname: '/resorts',
      query: updatedQuery,
    }, undefined, { scroll: false });
  }, [router]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    // Don't allow changing the input if it's currently showing map area
    if (isMapArea) {
      return;
    }

    setQuery(newQuery);
    if (newQuery.length > 2) {
      searchResorts({ variables: { query: newQuery, perPage: 400 } });
      setShowSuggestions(true);
      setShowRegionSelect(false);
    } else {
      setShowSuggestions(false);
      setShowRegionSelect(true);
    }
  };

  const handleInputFocus = () => {
    // If it's a map area, clear the filters when focusing
    if (isMapArea) {
      const currentFilters = router.query.filters ? JSON.parse(router.query.filters) : {};
      const updatedQuery = {
        ...router.query,
        filters: JSON.stringify({
          ...currentFilters,
          locationType: {},
        }),
        page: '1',
      };
      router.push({
        pathname: '/resorts',
        query: updatedQuery,
      }, undefined, { scroll: false });
      setIsMapArea(false);
    }

    setQuery('');
    setShowRegionSelect(true);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (item) => {
    console.log('handleSuggestionClick called with:', item);

    setShowSuggestions(false);
    setShowRegionSelect(false);
    setIsMapArea(false);

    if (item.type === 'resort') {
      const url = `/resort/${item.url_segment}`;
      router.push(url);
    } else if (item.type === 'country') {
      const newLocationData = { countryId: [item.value] };
      console.log('Country selection - new location data:', newLocationData);
      setFormData(prevData => ({
        ...prevData,
        locationType: newLocationData,
      }));
      updateQuery(newLocationData);
    } else if (item.type === 'continent') {
      const continentId = item.value === 'worldwide' ? null : getContinent(item.value).continent_id;
      const newLocationData = { continentId: continentId ? [continentId] : null };
      console.log('Continent selection - new location data:', newLocationData);
      setFormData(prevData => ({
        ...prevData,
        locationType: newLocationData,
      }));
      updateQuery(newLocationData);
    }

    setQuery(item.label || item.title);
  };

  const handleRegionSelect = useCallback((region) => {
    setIsMapArea(false);

    let newLocationData;
    if (region.value === 'worldwide') {
      newLocationData = {};
    } else {
      const continentId = getContinent(region.value).continent_id;
      newLocationData = { continentId: [continentId] };
    }
    console.log('New location data:', newLocationData);

    // Update form data
    setFormData(prevData => ({
      ...prevData,
      locationType: newLocationData,
    }));

    // Update query state and UI
    setQuery(region.label);
    setShowRegionSelect(false);
    setShowSuggestions(false);

    // Trigger the query update
    updateQuery(newLocationData);
  }, [updateQuery, setFormData]);

  const renderSuggestionItem = (item) => {
    let icon;
    let iconType;
    if (item.type === 'resort') {
      icon = <TypeIcon typeName='traditional_ski_resort' size="2rem" />;
      iconType = 'traditional-ski-resort';
    } else if (item.type === 'country' || item.type === 'continent') {
      icon = <SvgIcon svgContent={LocationMap} size="2.6rem" />;
      iconType = 'country-continent';
    }

    return (
      <CListGroupItem
        key={item.id || item.value}
        onClick={() => handleSuggestionClick(item)}
        className="resort-search__suggestion-item"
      >
        <div className={`icon-wrapper ${iconType}`}>
          {icon}
        </div>
        <div className="text-wrapper">
          <div className="title">{item.label || item.title}</div>
          {item.type === 'resort' && (
            <div className="location">
              {[
                item.location.city,
                item.location.state?.name,
                item.location.country.name,
              ].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </CListGroupItem>
    );
  };

  const getSuggestions = () => {
    const resortSuggestions = data?.searchResorts.data.map(resort => ({ ...resort, type: 'resort' })) || [];
    const countrySuggestions = countries
      .filter(country => country.label.toLowerCase().includes(query.toLowerCase()))
      .map(country => ({ ...country, type: 'country' }));
    const continentSuggestions = continents
      .filter(continent => continent.label.toLowerCase().includes(query.toLowerCase()))
      .map(continent => ({ ...continent, type: 'continent' }));

    return [...countrySuggestions, ...continentSuggestions, ...resortSuggestions];
  };

  // Add click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setShowRegionSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="resort-search" ref={searchRef}>
      <div className="search-input-wrapper d-inline-flex">
        <CFormInput
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Where to?"
          className={`resort-search__input ${isMapArea ? 'map-area-active' : ''}`}
        />
      </div>
      {(showSuggestions || showRegionSelect) && (
        <CListGroup className="resort-search__suggestions">
          {showSuggestions && (
            <>
              {(() => {
                if (error) {
                  return <div>Error searching resorts.</div>;
                }
                if (loading) {
                  return (
                    <CListGroupItem className="resort-search__spinner">
                      <SnowboardBackflip className="spinner-svg"/>
                    </CListGroupItem>
                  );
                }

                const suggestions = getSuggestions();
                if (suggestions.length > 0) {
                  return suggestions.map(renderSuggestionItem);
                }
                return (
                  <CListGroupItem className="resort-search__no-results">
                    No results found for &quot;{query}&quot;
                  </CListGroupItem>
                );
              })()}
            </>
          )}
          {showRegionSelect && !showSuggestions && (
            <CListGroupItem>
              <RegionSelect onSelect={handleRegionSelect} />
            </CListGroupItem>
          )}
        </CListGroup>
      )}
    </div>
  );
};

export default AdvancedSearch;
