import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Comment } from '../../../types/types';
import ResortCardCommentCarousel from '@/ResortCard/ResortCardCommentCarousel/ResortCardCommentCarousel';

interface ResortCommentsProps {
  comments?: Comment[];
}

const ResortComments: React.FC<ResortCommentsProps> = ({ comments }) => {
  if (comments && comments?.length < 1) {
    return (
      <span className="resort-card__small-label d-block mb-4 user-select-none mb-2">
        <FormattedMessage
          id="shredindex.commentcard.RESORT_HAS_NO_COMMENTS"
          defaultMessage="Resort has no comments"
        />
      </span>
    );
  }

  return (
    <div className="resort-comments">
      <h3 className="resort-single-card-heading user-select-none">
        <FormattedMessage id="shredindex.commentcard.COMMENTS" defaultMessage="Comments" />
      </h3>
      <ResortCardCommentCarousel comments={comments} />
    </div>
  );
};

export default ResortComments;
