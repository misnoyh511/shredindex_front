import {
  shape, arrayOf, string, number, oneOfType,
} from 'prop-types';

export const resortAttributeType = shape({
  id: string,
  title: string.isRequired,
  value: oneOfType([
    number,
    string,
  ]).isRequired,
});

export const commentType = shape({
  id: string,
  author: string.isRequired,
  comment: string.isRequired,
});

export const countryStateType = shape({
  id: string,
  code: string.isRequired,
  name: string.isRequired,
});

export const locationType = shape({
  id: string,
  city: string.isRequired,
  country: countryStateType.isRequired,
  state: countryStateType,
});

export const imageType = shape({
  id: string.isRequired,
  name: string.isRequired,
  alt: string.isRequired,
  image: {
    path: string.isRequired,
    content_type: string.isRequired,
  },
});

export const resortType = shape({
  description: string.isRequired,
  location: locationType.isRequired,
  highlights: arrayOf(resortAttributeType).isRequired,
  lowlights: arrayOf(resortAttributeType).isRequired,
  comments: arrayOf(commentType).isRequired,
  resort_images: arrayOf(imageType).isRequired,
});
