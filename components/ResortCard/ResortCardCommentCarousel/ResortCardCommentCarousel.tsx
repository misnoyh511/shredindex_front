import React from 'react';
import Flickity from 'react-flickity-component';
import { FormattedMessage } from 'react-intl';
import { Comment } from '../../../types/types';
import ResortCardMountains from '../../../images/resort-card-comment-background.svg';
import flickityOptions from '../../../src/js/components/config/flickity-options';

interface ResortCardCommentCarouselProps {
  comments: Comment[];
}

const ResortCardCommentCarousel: React.FC<ResortCardCommentCarouselProps> = ({ comments }) => {
  const options = {
    ...flickityOptions,
    prevNextButtons: comments.length > 1,
    pageDots: comments.length > 1,
  };

  if (comments.length === 0) {
    return (
      <div className="resort-card__comment-carousel d-block w-50 ms-2">
        <div className="carousel__comment--no-comments w-100 d-flex flex-column justify-content-between">
          <span className="resort-card__small-label d-block mb-4 user-select-none">
            <FormattedMessage
              id="shredindex.commentcard.RESORT_HAS_NO_COMMENTS"
              defaultMessage="ResortSingle has no comments"
            />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="resort-card__comment-carousel d-block w-50 ms-2 border-radius-medium">
      <ResortCardMountains className="carousel__comment-background position-absolute w-100" />
      <Flickity
        className="carousel w-100 h-100"
        elementType="div"
        options={options}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {comments.map(({
          id, comment, author,
        }) => (
          <div key={id} className="carousel__comment w-100 d-flex flex-column justify-content-between">
            <span className="carousel__comment-text small user-select-none">
              &ldquo;
              {comment}
              &rdquo;
            </span>
            <span className="carousel__author font-italic user-select-none">
              &#8226;
              &ensp;
              {author}
            </span>
          </div>
        ))}
      </Flickity>
    </div>
  );
};

export default ResortCardCommentCarousel;
