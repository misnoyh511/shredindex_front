import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import { resortAttributeType } from '../../../types/types';
import Rating from '../../Rating/Rating';

// Define the order of categories
const CATEGORY_ORDER = [
  'Terrain and Snow',
  'Resort Characteristics',
  'Facilities and Services',
  'Lifestyle and Community',
  'Seasonal Aspects',
  'Accessibility and Convenience',
];

const ResortRatings = ({ ratings }) => {
  const groupedRatings = useMemo(() => ratings.reduce((acc, rating) => {
    const category = rating.type.score_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rating);
    return acc;
  }, {}), [ratings]);

  const renderCategoryRatings = (category) => {
    const categoryRatings = groupedRatings[category];
    if (!categoryRatings || categoryRatings.length === 0) return null;

    return (
      <div key={category} className="category-ratings">
        <h6 className="category-title">{category}</h6>
        {categoryRatings.map(({
          id, title, name, value,
        }) => (
          <div key={id} className="rating-item">
            <Rating title={title} rating={value} name={name} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="resort-ratings">
      <h2 className="ratings-title h6">
        <FormattedMessage
          id="shredindex.rating.RATINGS"
          defaultMessage="Ratings"
        />
      </h2>
      <CCard className="ratings-card">
        <CCardBody>
          <CListGroup>
            <div className="ratings-grid">
              {CATEGORY_ORDER.map(renderCategoryRatings)}
            </div>
          </CListGroup>
        </CCardBody>
      </CCard>
    </div>
  );
};

ResortRatings.propTypes = {
  ratings: PropTypes.arrayOf(resortAttributeType).isRequired,
};

export default ResortRatings;
