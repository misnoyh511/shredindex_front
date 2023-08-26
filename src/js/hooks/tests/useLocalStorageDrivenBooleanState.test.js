import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import useLocalStorageDrivenBooleanState from '../useLocalStorageDrivenBooleanState';

const localStorageKey = 'foo';

describe('useLocalStorageDrivenBooleanState hook', () => {
  beforeEach(() => {
    // Ensure local storage has no data from previously run tests
    localStorage.clear();
  });

  it('Retrieves the correct initial state from local storage', () => {
    let actual;
    const testId = Math.floor(Math.random() * 10).toString();
    localStorage.setItem(localStorageKey, `${testId}`);
    const TestHook = () => {
      actual = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      return null;
    };

    mount(<TestHook />);

    expect(actual[0]).toBe(true);
  });

  it('Updates local storage correctly when store is called', async () => {
    let store;
    const testId = Math.floor(Math.random() * 10).toString();

    // localStorage.setItem(localStorageKey, 'io');

    const TestHook = () => {
      const [stored, setStored] = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      store = setStored;
      return stored;
    };

    mount(<TestHook />);

    await act(async () => {
      store(true);
    });

    await act(wait);
    expect(localStorage.getItem(localStorageKey)).toBe(`${testId}`);

    await act(async () => {
      store(false);
    });
    await act(wait);
    expect(localStorage.getItem(localStorageKey)).toBe('');
  });
});
