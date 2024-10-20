import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Rating from '../../Rating/Rating';
import { Score } from '../../../types/resortTypes';

const ResortRatings: React.FC <Score[]> = ({ ratings }) => {
  const groupedRatings = useMemo(() => {
    if (ratings?.length >= 1) {
      const sortedRatings = [...ratings].sort((a, b) => (
        a.type.type_group?.id || 0) - (b.type.type_group?.id || 0
      ));

      return sortedRatings.reduce((acc, rating) => {
        const category = rating.type.type_group?.title || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(rating);
        return acc;
      }, {});
    }
  }, [ratings]);

  const renderCategoryRatings = (category, index) => {
    const categoryRatings = groupedRatings[category];
    if (!categoryRatings || categoryRatings.length === 0) return null;

    return (
      <div key={category} className="category-ratings">
        <h6 className={`category-title ${index === 0 ? 'mt-0' : 'mt-4'}`}>{category}</h6>
        <div className="d-flex flex-wrap rating-item-wrap">
          {categoryRatings.map(({
            id, title, name, value,
          }) => (
            <div key={id} className="rating-item">
              <Rating title={title} rating={value} name={name} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!ratings) {
    return (
      <CCard className="ratings-card">
        <CCardBody>
          <CListGroup>
            <p className="ratings caption-text">
              No available ratings
            </p>
          </CListGroup>
        </CCardBody>
      </CCard>
    );
  }

  return (
    <div className="resort-ratings mb-4">
      <h3 className="resort-single-card-heading user-select-none mb-2">
        <FormattedMessage
          id="shredindex.rating.RATINGS"
          defaultMessage="Ratings"
        />
      </h3>
      <CCard className="ratings-card">
        <CCardBody>
          <CListGroup>
            <div className="ratings">
              {groupedRatings && Object.keys(groupedRatings).map(
                (category, index) => renderCategoryRatings(category, index),
              )}
            </div>
          </CListGroup>
        </CCardBody>
      </CCard>
    </div>
  );
};

ResortRatings.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.shape({
      type_group: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    }).isRequired,
  })).isRequired,
};

export default ResortRatings;
