import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CCol, CRow } from '@coreui/react';
import { rgbToHex } from '@coreui/utils';

export default { title: 'CoreUI/Colors' };

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)');
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.parentNode.firstChild;
    const varColor = window.getComputedStyle(el)
      .getPropertyValue('background-color');
    setColor(varColor);
  }, [ref]);

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-muted">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-muted">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  );
};

// eslint-disable-next-line react/prop-types
const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3');
  return (
    <CCol xl="2" md="4" sm="6" xs="12" className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }} />
      {children}
      <ThemeView />
    </CCol>
  );
};

export const Colors = () => (
  <div className="c-main container-fluid">
    <div className="card">
      <div className="card-header">
        Theme colors
      </div>
      <div className="card-body">
        <CRow>
          <ThemeColor className="bg-primary">
            <h6>Brand Primary Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-secondary">
            <h6>Brand Secondary Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-success">
            <h6>Brand Success Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-danger">
            <h6>Brand Danger Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-warning">
            <h6>Brand Warning Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-info">
            <h6>Brand Info Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-light">
            <h6>Brand Light Color</h6>
          </ThemeColor>
          <ThemeColor className="bg-dark">
            <h6>Brand Dark Color</h6>
          </ThemeColor>
        </CRow>
      </div>
    </div>
  </div>
);
