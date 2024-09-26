import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import { Comment } from '../../../types/types';
import flickityOptions from '../../../src/js/components/config/flickity-options';
import ResortCardMountains from '../../../images/resort-card-comment-background.svg';

interface ResortCommentsProps {
  comments?: Comment[];
}

const ResortComments: React.FC<ResortCommentsProps> = ({ comments }) => {
  if (comments && comments?.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="ResortSingle has no statistics" />
      </div>
    );
  }

  const options = {
    ...flickityOptions,
    cellAlign: 'left',
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    draggable: comments && comments?.length > 2,
  };

  return (
    <div className="resort-comments">
      <h3 className="resort-single-card-heading user-select-none mb-2">
        <FormattedMessage id="shredindex.commentcard.COMMENTS" defaultMessage="Comments" />
      </h3>
      <Flickity
        className="carousel w-100 h-100"
        elementType="div"
        options={options}
        disableImagesLoaded
        reloadOnUpdate
      >
        {comments && comments?.length >= 1 ? comments?.map(({
          id, author, comment,
        }) => (
          <div key={id} className="resort-comments__card card p-2 d-block border-radius-medium">
            <ResortCardMountains
              className="carousel__comment-background position-absolute w-100"
            />
            <div
              className="carousel__comment w-100 d-flex flex-column justify-content-between"
            >
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
          </div>
        )) : (
          <div className="resort-comments__card card p-2 d-block border-radius-medium">
            <ResortCardMountains
              className="carousel__comment-background position-absolute w-100"
            />
            <div
              className="carousel__comment w-100 d-flex flex-column justify-content-between"
            >
              <span className="carousel__comment-text small user-select-none">
                {'No comments available'}
              </span>
            </div>
          </div>
        )}
      </Flickity>
    </div>
  );
};

export default ResortComments;
