import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CBadge,
} from '@coreui/react';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { currentFilterState } from '../../../atoms/filterState';
import { getContinent } from '../../../hooks/getContinent'; // Import the continent utility
import SnowBoarderLost from '../../../images/snowboarder-lost.svg';
import { convertToLabel } from '../../../utils/helperFunctions';

interface ResortCardNoResultsProps {
  title: string;
  titleId: string;
  help: string;
  helpId: string;
  suggestion: string;
  suggestionId: string;
  errorMessage: string;
  errorMessageId: string;
}

interface GroupedType {
  type_name: string;
  operator: string;
  value: string | number;
}

// Helper function to get continent name using the provided utility
const getContinentName = (continentId: number): string => {
  const continent = getContinent(continentId);
  return continent ? continent.name : 'Unknown Continent';
};

// Helper function to format grouped type for display
const formatGroupedType = (type: GroupedType): string => {
  return `${convertToLabel(type.type_name)} ${type.operator} ${type.value}`;
};

const ResortCardNoResults: React.FC<ResortCardNoResultsProps> = ({
  title,
  titleId,
  help,
  helpId,
  suggestion,
  suggestionId,
  errorMessage,
  errorMessageId,
}) => {
  const router = useRouter();
  const [, setFormData] = useRecoilState(currentFilterState);

  // Parse and format the search criteria
  const searchCriteria = useMemo(() => {
    try {
      const filters = router.query.filters ? JSON.parse(decodeURIComponent(router.query.filters as string)) : null;
      if (!filters) return null;

      return {
        groupedTypes: filters.groupedType || [],
        continents: filters.locationType?.continentId?.map((id: number) => getContinentName(id)) || [],
        countries: filters.locationType?.countryId || [],
      };
    } catch (error) {
      console.error('Error parsing filters:', error);
      return null;
    }
  }, [router.query.filters]);

  const resetFilters = useCallback(() => {
    setFormData({
      groupedType: [],
      locationType: {},
    });

    router.push({
      pathname: '/resorts',
      query: {
        filters: JSON.stringify({
          groupedType: [],
          locationType: {},
        }),
        page: '1',
      },
    }, undefined, { scroll: false });
  }, [router, setFormData]);

  return (
    <div className="resort-card resort-card--error d-flex justify-content-center fade-in">
      <CCard className="resort-card__wrap collapsed">
        <CCardHeader className="resort-card__header-wrap pb-0">
          <h1 className="fw-bold fs-3">
            <FormattedMessage id={titleId} defaultMessage={title} />
          </h1>
          <div className="mb-4 error-help">
            {help && <p><FormattedMessage id={helpId} defaultMessage={help} /></p>}
          </div>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0 mb-3">
          <div className="resort-card__error-details-wrap d-flex mb-2 ps-4 pe-4">
            <div className="resort-card__error-details w-100">
              <div className="resort-card__error-details-title mt-2 mb-2">
                <p className="fs-6 text-break">
                  <FormattedMessage id={errorMessageId} defaultMessage={errorMessage} />
                </p>
                {searchCriteria && (
                  <CListGroup className="mt-3" flush>
                    {searchCriteria.continents.length > 0 && (
                      <CListGroupItem className="d-flex justify-content-between align-items-center">
                        <span className="fw-light me-2">Continent:</span>
                        <div>
                          {searchCriteria.continents.map((continent: string, index: number) => (
                            <CBadge key={index} color="dark" className="me-1 fw-light">
                              {continent}
                            </CBadge>
                          ))}
                        </div>
                      </CListGroupItem>
                    )}
                    {searchCriteria.countries.length > 0 && (
                      <CListGroupItem className="d-flex justify-content-between align-items-center">
                        <span className="fw-light me-2">Countries:</span>
                        <div>
                          {searchCriteria.countries.map((country: string, index: number) => (
                            <CBadge key={index} color="dark" className="me-1 fw-light">
                              {country}
                            </CBadge>
                          ))}
                        </div>
                      </CListGroupItem>
                    )}
                    {searchCriteria.groupedTypes.length > 0 && (
                      <CListGroupItem className="d-flex justify-content-between align-items-center">
                        <span className="fw-light me-2">Filters:</span>
                        <div>
                          {searchCriteria.groupedTypes.map((type: GroupedType, index: number) => (
                            <CBadge key={index} color="dark" className="me-1 fw-light">
                              {formatGroupedType(type)}
                            </CBadge>
                          ))}
                        </div>
                      </CListGroupItem>
                    )}
                  </CListGroup>
                )}
              </div>
            </div>
          </div>
          <div className="resort-card__suggestion text-center mt-5">
            <p className="fst-italic text-break">
              <FormattedMessage id={suggestionId} defaultMessage={suggestion} />
            </p>
            <div className="d-flex flex-row">
              <CButton color="info" href="/" className="me-2 w-100">Go To Home</CButton>
              <CButton
                color="primary"
                className="w-100"
                onClick={resetFilters}
              >
                Reset Filters
              </CButton>
            </div>
          </div>
        </CCardBody>
        <SnowBoarderLost
          className="resort-card__error-image"
          src={SnowBoarderLost}
          alt="Lost Snowboarder"
          width="100%"
        />
      </CCard>
    </div>
  );
};

export default ResortCardNoResults;
