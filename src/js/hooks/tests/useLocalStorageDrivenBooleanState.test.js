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

  it('Generates the new state correctly, omitting the current id if the boolean flag is false', async () => {
    let store;
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, `${testId}_${otherIds}`);

    const TestHook = () => {
      const [stored, setStored] = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      store = setStored;
      return stored;
    };

    mount(<TestHook />);

    await act(async () => {
      store(false);
    });

    expect(localStorage.getItem(localStorageKey)).toBe(otherIds);
  });

  it('Generates the new state correctly, including the current id if the boolean flag is true', async () => {
    let store;
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, otherIds);

    const TestHook = () => {
      const [stored, setStored] = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      store = setStored;
      return stored;
    };

    mount(<TestHook />);

    await act(async () => {
      store(true);
    });

    expect(localStorage.getItem(localStorageKey)).toBe(`${otherIds}_${testId}`);
  });

  it('Retrieves from the stored state correctly', () => {
    let actual;
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, `${testId}_${otherIds}`);

    const TestHook = () => {
      actual = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      return null;
    };

    mount(<TestHook />);

    expect(actual[0]).toBe(true);
  });

  it('Retrieves correctly and indicates that the id is not in the stored state', () => {
    let actual;
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, otherIds);

    const TestHook = () => {
      actual = useLocalStorageDrivenBooleanState(localStorageKey, testId);
      return null;
    };

    mount(<TestHook />);

    expect(actual[0]).toBe(false);
  });
});
