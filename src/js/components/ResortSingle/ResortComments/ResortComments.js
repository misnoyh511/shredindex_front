import { arrayOf } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Flickity from 'react-flickity-component';
import { CImage } from '@coreui/react';
import { commentType } from '../../../types/types';
import flickityOptions from '../../config/flickity-options';
import resortCardMountains from '../../../../images/resort-card-comment-background.svg';

const ResortComments = ({ comments }) => {
  if (comments?.length < 1) {
    return (
      <div className="resort-card__small-label user-select-none">
        <FormattedMessage id="shredindex.ratinglist.RESORT_IS_UNRATED" defaultMessage="Resort has no statistics" />
      </div>
    );
  }

  const options = {
    ...flickityOptions,
    cellAlign: 'left',
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    draggable: '>2',
  };

  return (
    <div className="resort-comments">
      <div className="h6 user-select-none mb-2">
        <FormattedMessage id="shredindex.commentcard.COMMENTS" defaultMessage="Comments" />
      </div>
      <Flickity
        className="carousel w-100 h-100"
        elementType="div"
        options={options}
        disableImagesLoaded
        reloadOnUpdate
        static
      >
        {comments?.map(({
          id, author, comment,
        }) => (
          <div key={id} className="resort-comments__card card p-2 d-block border-radius-medium">
            <CImage
              className="carousel__comment-background position-absolute w-100"
              src={resortCardMountains}
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
        ))}
      </Flickity>
    </div>
  );
};

ResortComments.propTypes = {
  comments: arrayOf(commentType.isRequired).isRequired,
};

export default ResortComments;
