import React from 'react';
import Flickity from 'react-flickity-component';
import PropTypes from 'prop-types';
import { ReactComponent as WatchThisSpace } from '../../../images/resort-card-watch-this-space.svg';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '../config/breakpoints';
import flickityOptions from '../config/flickity-options';

// Forthcoming
const proMemberResortList = [
  {
    id: 1, name: 'Powder Mountain', location: 'Utah, USA', url: '/resort/powder-mountain',
  },
  {
    id: 2, name: 'Revelstoke', location: 'British Columbia, Canada', url: '/resort/revelstoke',
  },
  {
    id: 3, name: 'Niseko United', location: 'Hokkaido, Japan', url: '/resort/niseko-united',
  },
  {
    id: 4, name: 'La Grave', location: 'French Alps, France', url: '/resort/la-grave',
  },
  {
    id: 5, name: 'Silverton Mountain', location: 'Colorado, USA', url: '/resort/silverton-mountain',
  },
];

const ProMemberResortList = ({ title }) => {
  const { width } = useWindowDimensions();

  const options = {
    ...flickityOptions,
    cellAlign: 'left',
    wrapAround: false,
    prevNextButtons: width < breakpoints.md,
    pageDots: false,
    draggable: width < breakpoints.md,
  };

  const displayedResorts = width > breakpoints.lg
    ? proMemberResortList : proMemberResortList.slice(0, 3);

  return (
    <div className="hidden-gems mt-5">
      <h4 className="fw-bolder">{title}</h4>
      <div className="home-lifestyles-cards">
        <Flickity
          className="carousel w-100 h-100"
          elementType="div"
          options={options}
        >
          {displayedResorts.map((item) => (
            <div key={item.id}>
              <WatchThisSpace className="me-2" />
            </div>
          ))}
        </Flickity>
      </div>
    </div>
  );
};

ProMemberResortList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProMemberResortList;
