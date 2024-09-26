import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useLocalStorageDrivenBooleanState from '../useLocalStorageDrivenBooleanState';

const localStorageKey = 'foo';

describe('useLocalStorageDrivenBooleanState hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Retrieves the correct initial state from local storage', () => {
    const testId = Math.floor(Math.random() * 10).toString();
    localStorage.setItem(localStorageKey, `${testId}`);

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    expect(result.current[0]).toBe(true);
  });

  it('Updates local storage correctly when store is called', async () => {
    const testId = Math.floor(Math.random() * 10).toString();

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    act(() => {
      result.current[1](true);
    });

    expect(localStorage.getItem(localStorageKey)).toBe(`${testId}`);

    act(() => {
      result.current[1](false);
    });

    expect(localStorage.getItem(localStorageKey)).toBe('');
  });

  it('Generates the new state correctly, omitting the current id if the boolean flag is false', () => {
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, `${testId}_${otherIds}`);

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    act(() => {
      result.current[1](false);
    });

    expect(localStorage.getItem(localStorageKey)).toBe(otherIds);
  });

  it('Generates the new state correctly, including the current id if the boolean flag is true', () => {
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, otherIds);

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    act(() => {
      result.current[1](true);
    });

    expect(localStorage.getItem(localStorageKey)).toBe(`${otherIds}_${testId}`);
  });

  it('Retrieves from the stored state correctly', () => {
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, `${testId}_${otherIds}`);

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    expect(result.current[0]).toBe(true);
  });

  it('Retrieves correctly and indicates that the id is not in the stored state', () => {
    const testId = '1';
    const otherIds = '2_3_4';
    localStorage.setItem(localStorageKey, otherIds);

    const { result } = renderHook(() => useLocalStorageDrivenBooleanState(localStorageKey, testId));

    expect(result.current[0]).toBe(false);
  });
});
