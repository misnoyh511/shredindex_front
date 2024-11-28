import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Comment } from '../../../types/types';
import ResortCardCommentCarousel from '@/ResortCard/ResortCardCommentCarousel/ResortCardCommentCarousel';

interface ResortCommentsProps {
  comments?: Comment[];
}

const ResortComments: React.FC<ResortCommentsProps> = ({ comments }) => {
  const commentsId = 'resort-comments-section';

  if (!comments?.length) {
    return (
      <section
        aria-label="Resort comments"
        className="resort-comments-empty"
      >
        <p
          className="resort-card__small-label d-block mb-4 user-select-none mb-2"
          role="status"
          aria-live="polite"
        >
          <FormattedMessage
            id="shredindex.commentcard.RESORT_HAS_NO_COMMENTS"
            defaultMessage="Resort has no comments"
          />
        </p>
      </section>
    );
  }

  return (
    <section
      className="resort-comments"
      aria-labelledby={commentsId}
    >
      <h2
        id={commentsId}
        className="resort-single-card-heading user-select-none"
      >
        <FormattedMessage
          id="shredindex.commentcard.COMMENTS"
          defaultMessage="Comments"
        />
      </h2>
      <ResortCardCommentCarousel
        comments={comments}
        aria-label="Resort visitor comments carousel"
      />
    </section>
  );
};

export default ResortComments;
