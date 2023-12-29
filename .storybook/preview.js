import React from "react";
import { MemoryRouter } from "react-router";
import '../src/scss/style.scss';

export default {
  decorators: [story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>],
};
