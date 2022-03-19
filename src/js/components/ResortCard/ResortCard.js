import { useQuery } from '@apollo/react-hooks';
import {
  CCard, CCardBody, CCardFooter, CCardHeader,
} from '@coreui/react';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import useResortCardToggledState from '../../hooks/useResortCardToggledState';
import ResortCardFooter from '../ResorctCardFooter/ResortCardFooter';
import ResortCardBody from '../ResortCardBody/ResortCardBody';
import ResortCardHeader from '../ResortCardHeader/ResortCardHeader';
import ResortCardSkeleton from '../SkeletonState/ResortCardSkeleton';

export const QUERY_RESORTCARD = gql`
query ResortByURLSegment($url_segment: String!) {
  resortByUrlSegment(url_segment: $url_segment) {
    id
    title
    url_segment
    url
    description
    location {
      id
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
    total_score {
      value
    }
    highlights {
      id
      title
      value
    }
    lowlights {
      id
      title
      value
    }
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
    comments {
      id
      comment
      author
    }
  }
}
`;

const ResortCard = ({ resortId, urlSegment }) => {
  const [collapsed, setToggled] = useResortCardToggledState(resortId);

  const { loading, error, data } = useQuery(
    QUERY_RESORTCARD,
    {
      variables: { url_segment: urlSegment },
    },
  );

  if (loading) {
    return <ResortCardSkeleton />;
  }

  const {
    resortByUrlSegment: resort,
  } = data;

  if (!resort || error) {
    throw new Error('Resort failed to load');
  }

  const { title, url, total_score } = resort;

  return (
    <div className="resort-card d-flex justify-content-center">
      <CCard className={`${!collapsed ? 'collapsed' : 'full-expanded'} resort-card__wrap`}>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <ResortCardHeader title={title} totalScore={total_score} />
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <ResortCardBody resort={resort} collapsed={!collapsed} />
        </CCardBody>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <CCardFooter className="resort-card__footer-wrap pointer-event" onClick={() => setToggled(!collapsed)}>
          <ResortCardFooter url={url} collapsed={!collapsed} />
        </CCardFooter>
      </CCard>
    </div>
  );
};

ResortCard.propTypes = {
  resortId: PropTypes.string.isRequired,
  urlSegment: PropTypes.string.isRequired,
};

export default ResortCard;
