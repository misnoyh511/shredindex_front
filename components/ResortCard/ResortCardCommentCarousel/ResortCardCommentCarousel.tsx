import React from 'react';
import Flickity from 'react-flickity-component';
import { FormattedMessage } from 'react-intl';
import { Comment } from '../../../types/types';
import ResortCardMountains from '../../../images/resort-card-comment-background.svg';
import flickityOptions from '../../../src/js/components/config/flickity-options';

interface ResortCardCommentCarouselProps {
  comments: Comment[];
  'aria-label'?: string;
}

const ResortCardCommentCarousel: React.FC<ResortCardCommentCarouselProps> = ({
  comments,
  'aria-label': ariaLabel,
}) => {
  const options = {
    ...flickityOptions,
    prevNextButtons: comments.length > 1,
    pageDots: comments.length > 1,
    adaptiveHeight: true,
    ariaLabel: ariaLabel || 'Resort comments carousel',
  };

  if (comments.length === 0) {
    return (
      <div
        className="resort-card__comment-carousel d-block w-50 ms-2"
        role="region"
        aria-label="Comments section"
      >
        <div
          className="carousel__comment--no-comments w-100 d-flex flex-column justify-content-between"
          role="status"
          aria-live="polite"
        >
          <p className="resort-card__small-label d-block mb-4 user-select-none">
            <FormattedMessage
              id="shredindex.commentcard.RESORT_HAS_NO_COMMENTS"
              defaultMessage="Resort has no comments"
            />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="resort-card__comment-carousel d-block w-50 ms-2 border-radius-medium"
      role="region"
      aria-label={ariaLabel || 'Resort comments carousel'}
    >
      <ResortCardMountains
        className="carousel__comment-background position-absolute w-100"
        aria-hidden="true"
      />
      <Flickity
        className="carousel w-100 h-100"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
        aria-roledescription="carousel"
      >
        {comments.map(({
          id, comment, author,
        }, index) => (
          <article
            key={id}
            className="carousel__comment w-100 d-flex flex-column justify-content-between"
            role="tabpanel"
            aria-label={`Comment ${index + 1} of ${comments.length}`}
            aria-roledescription="slide"
          >
            <blockquote className="carousel__comment-text small user-select-none m-0">
              &ldquo;
              {comment}
              &rdquo;
            </blockquote>
            <cite className="carousel__author font-italic user-select-none">
              &#8226;
              &ensp;
              {author}
            </cite>
          </article>
        ))}
      </Flickity>
    </div>
  );
};

export default ResortCardCommentCarousel;
