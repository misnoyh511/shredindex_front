import React from 'react';
import Skier from '../../images/handsome-skier-face-happy.svg';
import { CAvatar } from '@coreui/react';

const UserAvatar: React.FC<{ src: string | null | undefined; className?: string }> = ({ src, className }) => {
  if (!src) {
    return (
      <div className={`custom-avatar relative rounded-full overflow-hidden ${className}`}>
        <Skier className="w-full h-full object-cover" />
      </div>
    );
  }

  return <CAvatar src={src} size="md" className={className} />;
};

export default UserAvatar;
