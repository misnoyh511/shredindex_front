import React from 'react';
import { CButton } from '@coreui/react';

interface ShowMoreButtonProps {
  showMore: boolean;
  onToggle: (value: boolean) => void;
  showMoreText: string;
  showLessText: string;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  showMore,
  onToggle,
  showMoreText,
  showLessText,
}) => (
  <div className="d-flex justify-content-center align-content-center">
    <CButton
      className="mt-4"
      onClick={() => onToggle(!showMore)}
      variant="outline"
      color="light"
      shape="rounded-pill"
    >
      <span>{showMore ? showLessText : showMoreText}</span>
    </CButton>
  </div>
);

export default ShowMoreButton;
