import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import {
  CCard, CCardBody, CCardHeader, CContainer,
} from '@coreui/react';
import ResortHeader from '../../components/ResortHeader/ResortHeader';
import ResortRatings from '../../components/ResortRatings/ResortRatings';
import Statistics from '../../components/Statistics/Statistics';
import ResortSkeleton from '../../components/SkeletonState/ResortSkeleton';

export const QUERY_RESORT = gql`
query ResortByURLSegment($url_segment: String!) {
  resortByUrlSegment(url_segment: $url_segment) {
    id
    title
    url_segment
    description
    location {
      id
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
    ratings {
      id
      title
      value
    }
    numerics {
      id
      title
      value
    }
    generics {
      id
      title
      value
    }
  }
}
`;

const Resort = () => {
  const { url_segment } = useParams();

  const { loading, error, data } = useQuery(
    QUERY_RESORT,
    {
      variables: { url_segment },
    },
  );

  if (loading || error) {
    return (
      <ResortSkeleton />
    );
  }

  const {
    resortByUrlSegment: resort,
    resortByUrlSegment: {
      description, ratings, numerics, generics,
    },
  } = data;

  return (
    <CContainer>
      <div className="resort">
        <ResortHeader resort={resort} />
        <CCard className="resort__description-card mb-4">
          <CCardHeader>
            <h3 className="resort__description-title h6">
              <FormattedMessage
                id="shredindex.resort.DESCRIPTION"
                defaultMessage="Description"
              />
            </h3>
          </CCardHeader>
          <CCardBody>
            <p className="resort__description-content mb-0">{description}</p>
          </CCardBody>
        </CCard>
        <ResortRatings ratings={ratings} />
        <Statistics statistics={numerics} generics={generics} />
      </div>
    </CContainer>
  );
};

export default Resort;
