import React from 'react';
import PropTypes from 'prop-types';

const ButtonSkeleton = ({ className }) => (
  <div className={`${className} p-2 gray-400-bg w-100 border-radius-medium`}>
      &nbsp;
  </div>
);

ButtonSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ButtonSkeleton;
