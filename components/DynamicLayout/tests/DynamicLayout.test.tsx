import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicLayout from '../DynamicLayout';

// Mock the layouts
jest.mock('../../../pages/_app', () => ({
  layouts: {
    foo: () => <div>Foo layout</div>,
    fooBar: () => <div>FooBar layout</div>, // Changed from 'foo/:bar' to 'fooBar'
  },
}));

// Mock Helmet to avoid warnings
jest.mock('react-helmet', () => ({
  Helmet: () => null,
}));

describe('DynamicLayout Component', () => {
  it('Renders layout for /foo', () => {
    render(
      <DynamicLayout
        url="/foo"
        layout="foo"
        headerMenuItems={[]}
        footerMenuItems={[]}
      />,
    );
    expect(screen.getByText('Foo layout')).toBeInTheDocument();
  });

  it('Renders layout for /foo/:bar', () => {
    render(
      <DynamicLayout
        url="/foo/bar"
        layout="fooBar" // Changed from 'foo/:bar' to 'fooBar'
        headerMenuItems={[]}
        footerMenuItems={[]}
      />,
    );
    expect(screen.getByText('FooBar layout')).toBeInTheDocument();
  });

  it('Renders null for unknown layout', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const { container } = render(
      <DynamicLayout
        url="/unknown"
        layout="unknown"
        headerMenuItems={[]}
        footerMenuItems={[]}
      />,
    );
    expect(container.firstChild).toBeNull();
    expect(consoleWarnMock).toHaveBeenCalledWith('Layout "unknown" not found');
    consoleWarnMock.mockRestore();
  });
});
