import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import useResortCardToggledState from '../useResortCardToggledState';

describe('useResortCardToggledState hook', () => {
  it('Retrieves the correct initial state from local storage', () => {
    let actual;
    const resortId = '1';
    localStorage.setItem('resortCollapsedState', `io_${resortId}`);
    const TestHook = () => {
      actual = useResortCardToggledState(resortId);
      return null;
    };

    mount(<TestHook />);

    expect(actual[0]).toBe(true);
  });

  it('Updates local storage correctly when storeExpanded is called', async () => {
    let storeExpanded;
    const resortId = '1';
    localStorage.setItem('resortCollapsedState', 'io');
    const TestHook = () => {
      const [collapsed, setStoreExpanded] = useResortCardToggledState(resortId);
      storeExpanded = setStoreExpanded;
      return collapsed;
    };

    mount(<TestHook />);

    await act(async () => {
      storeExpanded(true);
    });

    await act(wait);
    expect(localStorage.getItem('resortCollapsedState')).toBe(`io_${resortId}`);

    await act(async () => {
      storeExpanded(false);
    });
    await act(wait);
    expect(localStorage.getItem('resortCollapsedState')).toBe('io');
  });
});
