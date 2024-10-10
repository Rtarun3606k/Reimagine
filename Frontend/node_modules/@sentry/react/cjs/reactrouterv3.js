Object.defineProperty(exports, '__esModule', { value: true });

const browser = require('@sentry/browser');
const core = require('@sentry/core');

// Many of the types below had to be mocked out to prevent typescript issues
// these types are required for correct functionality.

/**
 * A browser tracing integration that uses React Router v3 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
function reactRouterV3BrowserTracingIntegration(
  options,
) {
  const integration = browser.browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false,
  });

  const { history, routes, match, instrumentPageLoad = true, instrumentNavigation = true } = options;

  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);

      const startPageloadCallback = (startSpanOptions) => {
        browser.startBrowserTracingPageLoadSpan(client, startSpanOptions);
        return undefined;
      };

      const startNavigationCallback = (startSpanOptions) => {
        browser.startBrowserTracingNavigationSpan(client, startSpanOptions);
        return undefined;
      };

      // eslint-disable-next-line deprecation/deprecation
      const instrumentation = reactRouterV3Instrumentation(history, routes, match);

      // Now instrument page load & navigation with correct settings
      instrumentation(startPageloadCallback, instrumentPageLoad, false);
      instrumentation(startNavigationCallback, false, instrumentNavigation);
    },
  };
}

/**
 * Creates routing instrumentation for React Router v3
 * Works for React Router >= 3.2.0 and < 4.0.0
 *
 * @param history object from the `history` library
 * @param routes a list of all routes, should be
 * @param match `Router.match` utility
 *
 * @deprecated Use `reactRouterV3BrowserTracingIntegration()` instead
 */
function reactRouterV3Instrumentation(
  history,
  routes,
  match,
) {
  return (
    startTransaction,
    startTransactionOnPageLoad = true,
    startTransactionOnLocationChange = true,
  ) => {
    let activeTransaction;
    let prevName;

    // Have to use window.location because history.location might not be defined.
    if (startTransactionOnPageLoad && browser.WINDOW && browser.WINDOW.location) {
      normalizeTransactionName(
        routes,
        browser.WINDOW.location ,
        match,
        (localName, source = 'url') => {
          prevName = localName;
          activeTransaction = startTransaction({
            name: prevName,
            attributes: {
              [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: 'pageload',
              [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.pageload.react.reactrouter_v3',
              [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
            },
          });
        },
      );
    }

    if (startTransactionOnLocationChange && history.listen) {
      history.listen(location => {
        if (location.action === 'PUSH' || location.action === 'POP') {
          if (activeTransaction) {
            activeTransaction.end();
          }
          normalizeTransactionName(routes, location, match, (localName, source = 'url') => {
            prevName = localName;

            const attributes = {
              [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: 'navigation',
              [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.navigation.react.reactrouter_v3',
              [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
            };

            activeTransaction = startTransaction({
              name: prevName,
              attributes,
            });
          });
        }
      });
    }
  };
}

/**
 * Normalize transaction names using `Router.match`
 */
function normalizeTransactionName(
  appRoutes,
  location,
  match,
  callback,
) {
  let name = location.pathname;
  match(
    {
      location,
      routes: appRoutes,
    },
    (error, _redirectLocation, renderProps) => {
      if (error || !renderProps) {
        return callback(name);
      }

      const routePath = getRouteStringFromRoutes(renderProps.routes || []);
      if (routePath.length === 0 || routePath === '/*') {
        return callback(name);
      }

      name = routePath;
      return callback(name, 'route');
    },
  );
}

/**
 * Generate route name from array of routes
 */
function getRouteStringFromRoutes(routes) {
  if (!Array.isArray(routes) || routes.length === 0) {
    return '';
  }

  const routesWithPaths = routes.filter((route) => !!route.path);

  let index = -1;
  for (let x = routesWithPaths.length - 1; x >= 0; x--) {
    const route = routesWithPaths[x];
    if (route.path && route.path.startsWith('/')) {
      index = x;
      break;
    }
  }

  return routesWithPaths
    .slice(index)
    .filter(({ path }) => !!path)
    .map(({ path }) => path)
    .join('');
}

exports.reactRouterV3BrowserTracingIntegration = reactRouterV3BrowserTracingIntegration;
exports.reactRouterV3Instrumentation = reactRouterV3Instrumentation;
//# sourceMappingURL=reactrouterv3.js.map
