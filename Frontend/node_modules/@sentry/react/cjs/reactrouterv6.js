Object.defineProperty(exports, '__esModule', { value: true });

const browser = require('@sentry/browser');
const core = require('@sentry/core');
const utils = require('@sentry/utils');
const hoistNonReactStatics = require('hoist-non-react-statics');
const React = require('react');
const debugBuild = require('./debug-build.js');

const _interopDefault = e => e && e.__esModule ? e.default : e;

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const hoistNonReactStatics__default = /*#__PURE__*/_interopDefault(hoistNonReactStatics);
const React__namespace = /*#__PURE__*/_interopNamespace(React);

const _jsxFileName = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/reactrouterv6.tsx";/* eslint-disable max-lines */

let activeTransaction;

let _useEffect;
let _useLocation;
let _useNavigationType;
let _createRoutesFromChildren;
let _matchRoutes;
let _customStartTransaction;
let _startTransactionOnLocationChange;
let _stripBasename = false;

/**
 * A browser tracing integration that uses React Router v3 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
function reactRouterV6BrowserTracingIntegration(
  options,
) {
  const integration = browser.browserTracingIntegration({
    ...options,
    instrumentPageLoad: false,
    instrumentNavigation: false,
  });

  const {
    useEffect,
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
    stripBasename,
    instrumentPageLoad = true,
    instrumentNavigation = true,
  } = options;

  return {
    ...integration,
    afterAllSetup(client) {
      integration.afterAllSetup(client);

      const startNavigationCallback = (startSpanOptions) => {
        browser.startBrowserTracingNavigationSpan(client, startSpanOptions);
        return undefined;
      };

      const initPathName = browser.WINDOW && browser.WINDOW.location && browser.WINDOW.location.pathname;
      if (instrumentPageLoad && initPathName) {
        browser.startBrowserTracingPageLoadSpan(client, {
          name: initPathName,
          attributes: {
            [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: 'url',
            [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: 'pageload',
            [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.pageload.react.reactrouter_v6',
          },
        });
      }

      _useEffect = useEffect;
      _useLocation = useLocation;
      _useNavigationType = useNavigationType;
      _matchRoutes = matchRoutes;
      _createRoutesFromChildren = createRoutesFromChildren;
      _stripBasename = stripBasename || false;

      _customStartTransaction = startNavigationCallback;
      _startTransactionOnLocationChange = instrumentNavigation;
    },
  };
}

/**
 * @deprecated Use `reactRouterV6BrowserTracingIntegration()` instead.
 */
function reactRouterV6Instrumentation(
  useEffect,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
  stripBasename,
) {
  return (
    customStartTransaction,
    startTransactionOnPageLoad = true,
    startTransactionOnLocationChange = true,
  ) => {
    const initPathName = browser.WINDOW && browser.WINDOW.location && browser.WINDOW.location.pathname;
    if (startTransactionOnPageLoad && initPathName) {
      activeTransaction = customStartTransaction({
        name: initPathName,
        attributes: {
          [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: 'url',
          [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: 'pageload',
          [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.pageload.react.reactrouter_v6',
        },
      });
    }

    _useEffect = useEffect;
    _useLocation = useLocation;
    _useNavigationType = useNavigationType;
    _matchRoutes = matchRoutes;
    _createRoutesFromChildren = createRoutesFromChildren;
    _stripBasename = stripBasename || false;

    _customStartTransaction = customStartTransaction;
    _startTransactionOnLocationChange = startTransactionOnLocationChange;
  };
}

/**
 * Strip the basename from a pathname if exists.
 *
 * Vendored and modified from `react-router`
 * https://github.com/remix-run/react-router/blob/462bb712156a3f739d6139a0f14810b76b002df6/packages/router/utils.ts#L1038
 */
function stripBasenameFromPathname(pathname, basename) {
  if (!basename || basename === '/') {
    return pathname;
  }

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return pathname;
  }

  // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it
  const startIndex = basename.endsWith('/') ? basename.length - 1 : basename.length;
  const nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== '/') {
    // pathname does not start with basename/
    return pathname;
  }

  return pathname.slice(startIndex) || '/';
}

function getNormalizedName(
  routes,
  location,
  branches,
  basename = '',
) {
  if (!routes || routes.length === 0) {
    return [_stripBasename ? stripBasenameFromPathname(location.pathname, basename) : location.pathname, 'url'];
  }

  let pathBuilder = '';
  if (branches) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let x = 0; x < branches.length; x++) {
      const branch = branches[x];
      const route = branch.route;
      if (route) {
        // Early return if index route
        if (route.index) {
          return [_stripBasename ? stripBasenameFromPathname(branch.pathname, basename) : branch.pathname, 'route'];
        }

        const path = route.path;
        if (path) {
          const newPath = path[0] === '/' || pathBuilder[pathBuilder.length - 1] === '/' ? path : `/${path}`;
          pathBuilder += newPath;

          if (basename + branch.pathname === location.pathname) {
            if (
              // If the route defined on the element is something like
              // <Route path="/stores/:storeId/products/:productId" element={<div>Product</div>} />
              // We should check against the branch.pathname for the number of / seperators
              utils.getNumberOfUrlSegments(pathBuilder) !== utils.getNumberOfUrlSegments(branch.pathname) &&
              // We should not count wildcard operators in the url segments calculation
              pathBuilder.slice(-2) !== '/*'
            ) {
              return [(_stripBasename ? '' : basename) + newPath, 'route'];
            }
            return [(_stripBasename ? '' : basename) + pathBuilder, 'route'];
          }
        }
      }
    }
  }

  return [_stripBasename ? stripBasenameFromPathname(location.pathname, basename) : location.pathname, 'url'];
}

function updatePageloadTransaction(
  activeRootSpan,
  location,
  routes,
  matches,
  basename,
) {
  const branches = Array.isArray(matches)
    ? matches
    : (_matchRoutes(routes, location, basename) );

  if (activeRootSpan && branches) {
    const [name, source] = getNormalizedName(routes, location, branches, basename);
    activeRootSpan.updateName(name);
    activeRootSpan.setAttribute(core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, source);
  }
}

function handleNavigation(
  location,
  routes,
  navigationType,
  matches,
  basename,
) {
  const branches = Array.isArray(matches) ? matches : _matchRoutes(routes, location, basename);

  if (_startTransactionOnLocationChange && (navigationType === 'PUSH' || navigationType === 'POP') && branches) {
    if (activeTransaction) {
      activeTransaction.end();
    }

    const [name, source] = getNormalizedName(routes, location, branches, basename);
    activeTransaction = _customStartTransaction({
      name,
      attributes: {
        [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
        [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: 'navigation',
        [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.navigation.react.reactrouter_v6',
      },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withSentryReactRouterV6Routing(Routes) {
  if (
    !_useEffect ||
    !_useLocation ||
    !_useNavigationType ||
    !_createRoutesFromChildren ||
    !_matchRoutes ||
    !_customStartTransaction
  ) {
    debugBuild.DEBUG_BUILD &&
      utils.logger.warn(`reactRouterV6Instrumentation was unable to wrap Routes because of one or more missing parameters.
      useEffect: ${_useEffect}. useLocation: ${_useLocation}. useNavigationType: ${_useNavigationType}.
      createRoutesFromChildren: ${_createRoutesFromChildren}. matchRoutes: ${_matchRoutes}. customStartTransaction: ${_customStartTransaction}.`);

    return Routes;
  }

  let isMountRenderPass = true;

  const SentryRoutes = (props) => {
    const location = _useLocation();
    const navigationType = _useNavigationType();

    _useEffect(
      () => {
        const routes = _createRoutesFromChildren(props.children) ;

        if (isMountRenderPass) {
          updatePageloadTransaction(getActiveRootSpan(), location, routes);
          isMountRenderPass = false;
        } else {
          handleNavigation(location, routes, navigationType);
        }
      },
      // `props.children` is purpusely not included in the dependency array, because we do not want to re-run this effect
      // when the children change. We only want to start transactions when the location or navigation type change.
      [location, navigationType],
    );

    // @ts-expect-error Setting more specific React Component typing for `R` generic above
    // will break advanced type inference done by react router params
    return React__namespace.createElement(Routes, { ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 329}} );
  };

  hoistNonReactStatics__default(SentryRoutes, Routes);

  // @ts-expect-error Setting more specific React Component typing for `R` generic above
  // will break advanced type inference done by react router params
  return SentryRoutes;
}

function wrapUseRoutes(origUseRoutes) {
  if (!_useEffect || !_useLocation || !_useNavigationType || !_matchRoutes || !_customStartTransaction) {
    debugBuild.DEBUG_BUILD &&
      utils.logger.warn(
        'reactRouterV6Instrumentation was unable to wrap `useRoutes` because of one or more missing parameters.',
      );

    return origUseRoutes;
  }

  let isMountRenderPass = true;

  const SentryRoutes

 = (props) => {
    const { routes, locationArg } = props;

    const Routes = origUseRoutes(routes, locationArg);

    const location = _useLocation();
    const navigationType = _useNavigationType();

    // A value with stable identity to either pick `locationArg` if available or `location` if not
    const stableLocationParam =
      typeof locationArg === 'string' || (locationArg && locationArg.pathname)
        ? (locationArg )
        : location;

    _useEffect(() => {
      const normalizedLocation =
        typeof stableLocationParam === 'string' ? { pathname: stableLocationParam } : stableLocationParam;

      if (isMountRenderPass) {
        updatePageloadTransaction(getActiveRootSpan(), normalizedLocation, routes);
        isMountRenderPass = false;
      } else {
        handleNavigation(normalizedLocation, routes, navigationType);
      }
    }, [navigationType, stableLocationParam]);

    return Routes;
  };

  // eslint-disable-next-line react/display-name
  return (routes, locationArg) => {
    return React__namespace.createElement(SentryRoutes, { routes: routes, locationArg: locationArg, __self: this, __source: {fileName: _jsxFileName, lineNumber: 386}} );
  };
}

function wrapCreateBrowserRouter

(createRouterFunction) {
  // `opts` for createBrowserHistory and createMemoryHistory are different, but also not relevant for us at the moment.
  // `basename` is the only option that is relevant for us, and it is the same for all.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (routes, opts) {
    const router = createRouterFunction(routes, opts);
    const basename = opts && opts.basename;

    const activeRootSpan = getActiveRootSpan();

    // The initial load ends when `createBrowserRouter` is called.
    // This is the earliest convenient time to update the transaction name.
    // Callbacks to `router.subscribe` are not called for the initial load.
    if (router.state.historyAction === 'POP' && activeRootSpan) {
      updatePageloadTransaction(activeRootSpan, router.state.location, routes, undefined, basename);
    }

    router.subscribe((state) => {
      const location = state.location;
      if (_startTransactionOnLocationChange && (state.historyAction === 'PUSH' || state.historyAction === 'POP')) {
        handleNavigation(location, routes, state.historyAction, undefined, basename);
      }
    });

    return router;
  };
}

function getActiveRootSpan() {
  // Legacy behavior for "old" react router instrumentation
  if (activeTransaction) {
    return activeTransaction;
  }

  const span = core.getActiveSpan();
  const rootSpan = span ? core.getRootSpan(span) : undefined;

  if (!rootSpan) {
    return undefined;
  }

  const op = core.spanToJSON(rootSpan).op;

  // Only use this root span if it is a pageload or navigation span
  return op === 'navigation' || op === 'pageload' ? rootSpan : undefined;
}

exports.reactRouterV6BrowserTracingIntegration = reactRouterV6BrowserTracingIntegration;
exports.reactRouterV6Instrumentation = reactRouterV6Instrumentation;
exports.withSentryReactRouterV6Routing = withSentryReactRouterV6Routing;
exports.wrapCreateBrowserRouter = wrapCreateBrowserRouter;
exports.wrapUseRoutes = wrapUseRoutes;
//# sourceMappingURL=reactrouterv6.js.map
