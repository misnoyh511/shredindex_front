import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  CFormInput, CImage, CListGroup, CListGroupItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLocationPin, cilMagnifyingGlass, cilHistory } from '@coreui/icons';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import snowboardBackflip from '../../../images/snowboard-backflip.svg';

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

const ResortSearchAutosuggest = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchResorts, { loading, error, data }] = useLazyQuery(SEARCH_RESORTS);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentResortSearches') || '[]');
    setRecentSearches(storedSearches.slice(0, 5));
  }, []);

  const handleSearch = useCallback(() => {
    if (query.length > 2) {
      searchResorts({ variables: { query, perPage: 400 } });
      setShowSuggestions(true);
      setShowRecentSearches(false);
    } else {
      setShowSuggestions(false);
      setShowRecentSearches(isInputFocused && query.length === 0 && recentSearches.length > 0);
    }
  }, [query, searchResorts, recentSearches.length, isInputFocused]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setShowRecentSearches(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (query.length === 0 && recentSearches.length > 0) {
      setShowRecentSearches(true);
    }
  };

  const handleInputBlur = () => {
    // Delay setting isInputFocused to false to allow click events on suggestions
    setTimeout(() => setIsInputFocused(false), 200);
  };

  const addToRecentSearches = (resort) => {
    const updatedSearches = [resort,
      ...recentSearches.filter((r) => r.id !== resort.id)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentResortSearches', JSON.stringify(updatedSearches));
  };
  const handleSuggestionClick = (resort) => {
    setQuery('');
    setShowSuggestions(false);
    setShowRecentSearches(false);
    setIsInputFocused(false);
    addToRecentSearches(resort);
    navigate(`/resorts/${resort.url_segment}`);
  };
  const renderSuggestionItem = (resort) => (
    <CListGroupItem
      key={resort.id}
      onClick={() => handleSuggestionClick(resort)}
      className="resort-search__suggestion-item"
    >
      <div className="icon-wrapper">
        <CIcon icon={cilLocationPin} size="lg" />
      </div>
      <div className="text-wrapper">
        <div className="title">{resort.title}</div>
        <div className="location">
          {`${resort.location.city}, ${resort.location.state?.name || ''}, ${resort.location.country.name}`}
        </div>
      </div>
    </CListGroupItem>
  );

  return (
    <div className="resort-search" ref={searchRef}>
      <CFormInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Where to?"
        className="resort-search__input"
      />
      <CIcon
        icon={cilMagnifyingGlass}
        className="resort-search__icon"
      />
      {(showSuggestions || showRecentSearches) && (
        <CListGroup className="resort-search__suggestions">
          {(() => {
            if (error) {
              return (
                <div>Error searching resorts.</div>
              );
            }
            if (loading) {
              return (
                <CListGroupItem className="resort-search__spinner">
                  <CImage src={snowboardBackflip} />
                </CListGroupItem>
              );
            }

            if (showSuggestions) {
              if (data?.searchResorts.data.length > 0) {
                return data.searchResorts.data.map(renderSuggestionItem);
              }
              return (
                <CListGroupItem className="resort-search__no-results">
                  No results found for
                  {' "'}
                  {query}
                  {'" '}
                </CListGroupItem>
              );
            }

            return null;
          })()}
          {showRecentSearches && (
            <>
              <CListGroupItem className="resort-search__recent-header">
                <CIcon icon={cilHistory} className="me-2" />
                Recent Searches
              </CListGroupItem>
              {recentSearches.map(renderSuggestionItem)}
            </>
          )}
        </CListGroup>
      )}
    </div>
  );
};

export default ResortSearchAutosuggest;
