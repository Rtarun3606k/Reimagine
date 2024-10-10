import { init as init$1 } from '@sentry/browser';
import { applySdkMetadata } from '@sentry/core';

/**
 * Inits the React SDK
 */
function init(options) {
  const opts = {
    ...options,
  };

  applySdkMetadata(opts, 'react');

  init$1(opts);
}

export { init };
//# sourceMappingURL=sdk.js.map
