import '../src/scss/style.scss';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';
export const reactRouterDecorator = ({Story, path}) => {
  return (
    <MemoryRouter initialEntries={[path ? path : '/*']}>
      <Routes>
        <Route path={path ? path : '/*'} element={<Story />} />
      </Routes>
    </MemoryRouter>
  )
};
