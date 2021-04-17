import { CImg } from '@coreui/react';
import React from 'react';

const TeamMember = (props) => {
  const { imgSrc, path, name } = props.member;
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
          <a href={path} target="_blank" rel="noopener">
            {name}
          </a>
        </span>
      </div>
    </div>
  );
};
export default TeamMember;
