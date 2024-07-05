import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { useParams, useNavigate } from 'react-router';
import {
  CCard, CCardBody, CCol, CContainer, CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';
import ResortHeader from '../../components/ResortSingle/ResortHeader/ResortHeader';
import ResortRatings from '../../components/ResortSingle/ResortRatings/ResortRatings';
import ResortNumerics from '../../components/ResortSingle/ResortNumerics/ResortNumerics';
import ResortSkeleton from '../../components/SkeletonState/ResortSkeleton';
import ResortsParallaxBackground from '../../components/ResortsParallaxBackground/ResortsParallaxBackground';
import ResortMap from '../../components/ResortSingle/ResortMap/ResortMap';
import ResortComments from '../../components/ResortSingle/ResortComments/ResortComments';
import ResortImageCarousel from '../../components/ResortSingle/ResortImageCarousel/ResortImageCarousel';

export const QUERY_RESORT = gql`
query ResortByURLSegment($url_segment: String!) {
  resortByUrlSegment(url_segment: $url_segment) {
    id
    title
    url_segment
    description
    resort_images {
      id
      name
      alt
      sort_order
      image {
        path
        content_type
      }
    }
    total_score {
      title
      value
    }
    location {
      id
      latitude
      longitude
      city
      country {
        id
        code
        name
      }
      state {
        id
        code
        name
      }
    }
    ratingScores {
      id
      title
      value
      name
    }
    numerics {
      id
      title
      value
      name
      type {
        unit
        max_value
      }
    }
    generics {
      id
      title
      value
      name
    }
    comments {
      id
      author
      comment
    }
  }
}
`;

const Resort = () => {
  const { url_segment } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(
    QUERY_RESORT,
    {
      variables: { url_segment },
    },
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading || error) {
    return (
      <ResortSkeleton />
    );
  }

  const {
    resortByUrlSegment: resort,
    resortByUrlSegment: {
      resort_images, ratingScores: ratings, numerics, location, comments,
    },
  } = data;

  return (
    <CContainer>
      <ResortsParallaxBackground />
      <div className="resort resort-single mt-4">
        <div className="resort back-button-wrap mb-4 w-100 d-flex justify-content-end justify-content-lg-start">
          <div
            role="button"
            aria-label="Back button"
            tabIndex={0}
            onClick={handleBackClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleBackClick();
              }
            }}
            className="resort back-button"
          >
            <CIcon icon={cilArrowLeft} />
          </div>
        </div>
        <CRow>
          <CCol lg={8}>
            <ResortHeader resort={resort} />
            <ResortImageCarousel images={resort_images} />
            <ResortNumerics numerics={numerics} />
            <ResortRatings ratings={ratings} />
            <ResortComments comments={comments} />
          </CCol>
          <CCol lg={4}>
            <h3 className="resort__description-title h6">
              <FormattedMessage
                id="shredindex.resort.Map"
                defaultMessage="Map"
              />
            </h3>
            <CCard className="resort__map-card mb-4">
              <CCardBody>
                <ResortMap longitude={location.longitude} latitude={location.latitude} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
};

export default Resort;
