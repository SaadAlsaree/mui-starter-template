'use client';

import * as React from 'react';

/**
 * Runs axe-core a11y checks in development.
 * Add inside your component tree to audit accessibility.
 */
export default function AxeProvider() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    Promise.all([
      import('react-dom'),
      import('@axe-core/react'),
    ]).then(([ReactDOM, axe]) => {
      axe.default(React, ReactDOM, 1000, {});
    }).catch(() => {
      // axe not available
    });
  }, []);

  return null;
}
