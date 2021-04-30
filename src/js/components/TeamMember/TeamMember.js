import { CImg } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';

const TeamMember = (props) => {
  const { member: { imgSrc, path, name } } = props;
  return (
    <div className="m-auto p-4 d-flex align-items-center">
      <div>
        <CImg
          src={imgSrc}
          className="c-avatar-img developer-avatar round"
          width="120"
          height="120"
          role="presentation"
        />
      </div>
      <div className="p-4">
        <span className="mr-1 font-weight-bold">
          <a href={path} target="_blank" rel="noreferrer">
            {name}
          </a>
        </span>
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  member: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    path: PropTypes.number.isRequired,
    name: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeamMember;
