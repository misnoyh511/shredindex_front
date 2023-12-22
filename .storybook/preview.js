import React from "react";
import { MemoryRouter } from "react-router";

export default {
  decorators: [story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>],
};
