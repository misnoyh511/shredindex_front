import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
export function MockNextRouter({ children, router }) {
  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  );
}
