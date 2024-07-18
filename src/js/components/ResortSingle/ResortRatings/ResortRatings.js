import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CListGroup } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Rating from '../../Rating/Rating';

const ResortRatings = ({ ratings }) => {
  const groupedRatings = useMemo(() => {
    // Sort ratings by type_group.id
    const sortedRatings = [...ratings].sort((a, b) => (
      a.type.type_group?.id || 0) - (b.type.type_group?.id || 0
    ));

    // Group sorted ratings by type_group.title
    return sortedRatings.reduce((acc, rating) => {
      const category = rating.type.type_group?.title || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(rating);
      return acc;
    }, {});
  }, [ratings]);

  const renderCategoryRatings = (category) => {
    const categoryRatings = groupedRatings[category];
    if (!categoryRatings || categoryRatings.length === 0) return null;

    return (
      <div key={category} className="category-ratings">
        <h6 className="category-title">{category}</h6>
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
            <div className="ratings">
              {Object.keys(groupedRatings).map(renderCategoryRatings)}
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
