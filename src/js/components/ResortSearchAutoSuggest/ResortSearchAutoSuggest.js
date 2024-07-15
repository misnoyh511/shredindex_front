import React, { useState, useEffect, useRef } from 'react';
import { CFormInput, CImage, CListGroup, CListGroupItem, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLocationPin, cilMagnifyingGlass, cilHistory } from '@coreui/icons';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import snowboardBackflip from '../../../images/snowboard-backflip.svg';

const SEARCH_RESORTS = gql`
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
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchResorts, { loading, data }] = useLazyQuery(SEARCH_RESORTS);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentResortSearches') || '[]');
    setRecentSearches(storedSearches.slice(0, 5));
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      searchResorts({ variables: { query, perPage: 400 } });
      setShowSuggestions(true);
      setShowRecentSearches(false);
    } else {
      setShowSuggestions(false);
      setShowRecentSearches(query.length === 0 && recentSearches.length > 0);
    }
  }, [query, searchResorts, recentSearches.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setShowRecentSearches(false);
        setQuery('');
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
    if (query.length === 0 && recentSearches.length > 0) {
      setShowRecentSearches(true);
    }
  };

  const handleSuggestionClick = (resort) => {
    setQuery('');
    setShowSuggestions(false);
    setShowRecentSearches(false);
    addToRecentSearches(resort);
    navigate(`/resorts/${resort.url_segment}`);
  };

  const addToRecentSearches = (resort) => {
    const updatedSearches = [resort, ...recentSearches.filter(r => r.id !== resort.id)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentResortSearches', JSON.stringify(updatedSearches));
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
        placeholder="Where to?"
        className="resort-search__input"
      />
      <CIcon
        icon={cilMagnifyingGlass}
        className="resort-search__icon"
      />
      {(showSuggestions || showRecentSearches) && (
        <CListGroup className="resort-search__suggestions">
          {loading ? (
            <CListGroupItem className="resort-search__spinner">
              <CImage src={snowboardBackflip} />
            </CListGroupItem>
          ) : showSuggestions && data?.searchResorts.data.length > 0 ? (
            data.searchResorts.data.map(renderSuggestionItem)
          ) : showSuggestions ? (
            <CListGroupItem className="resort-search__no-results">
              No results found for "{query}"
            </CListGroupItem>
          ) : null}
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
