Object.defineProperty(exports, '__esModule', { value: true });

const browser = require('@sentry/browser');
const core = require('@sentry/core');

/**
 * Inits the React SDK
 */
function init(options) {
  const opts = {
    ...options,
  };

  core.applySdkMetadata(opts, 'react');

  browser.init(opts);
}

exports.init = init;
//# sourceMappingURL=sdk.js.map
