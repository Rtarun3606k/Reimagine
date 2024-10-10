Object.defineProperty(exports, '__esModule', { value: true });

const browser = require('@sentry/browser');
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

const _jsxFileName = "/home/runner/work/sentry-javascript/sentry-javascript/packages/react/src/errorboundary.tsx";

function isAtLeastReact17(version) {
  const major = version.match(/^([^.]+)/);
  return major !== null && parseInt(major[0]) >= 17;
}

const UNKNOWN_COMPONENT = 'unknown';

const INITIAL_STATE = {
  componentStack: null,
  error: null,
  eventId: null,
};

function setCause(error, cause) {
  const seenErrors = new WeakMap();

  function recurse(error, cause) {
    // If we've already seen the error, there is a recursive loop somewhere in the error's
    // cause chain. Let's just bail out then to prevent a stack overflow.
    if (seenErrors.has(error)) {
      return;
    }
    if (error.cause) {
      seenErrors.set(error, true);
      return recurse(error.cause, cause);
    }
    error.cause = cause;
  }

  recurse(error, cause);
}

/**
 * A ErrorBoundary component that logs errors to Sentry. Requires React >= 16.
 * NOTE: If you are a Sentry user, and you are seeing this stack frame, it means the
 * Sentry React SDK ErrorBoundary caught an error invoking your application code. This
 * is expected behavior and NOT indicative of a bug with the Sentry React SDK.
 */
class ErrorBoundary extends React__namespace.Component {

   constructor(props) {
    super(props);ErrorBoundary.prototype.__init.call(this);
    this.state = INITIAL_STATE;
    this._openFallbackReportDialog = true;

    const client = browser.getClient();
    if (client && client.on && props.showDialog) {
      this._openFallbackReportDialog = false;
      client.on('afterSendEvent', event => {
        if (!event.type && event.event_id === this._lastEventId) {
          // eslint-disable-next-line deprecation/deprecation
          browser.showReportDialog({ ...props.dialogOptions, eventId: this._lastEventId });
        }
      });
    }
  }

   componentDidCatch(error, { componentStack }) {
    const { beforeCapture, onError, showDialog, dialogOptions } = this.props;
    browser.withScope(scope => {
      // If on React version >= 17, create stack trace from componentStack param and links
      // to to the original error using `error.cause` otherwise relies on error param for stacktrace.
      // Linking errors requires the `LinkedErrors` integration be enabled.
      // See: https://reactjs.org/blog/2020/08/10/react-v17-rc.html#native-component-stacks
      //
      // Although `componentDidCatch` is typed to accept an `Error` object, it can also be invoked
      // with non-error objects. This is why we need to check if the error is an error-like object.
      // See: https://github.com/getsentry/sentry-javascript/issues/6167
      if (isAtLeastReact17(React__namespace.version) && utils.isError(error)) {
        const errorBoundaryError = new Error(error.message);
        errorBoundaryError.name = `React ErrorBoundary ${error.name}`;
        errorBoundaryError.stack = componentStack;

        // Using the `LinkedErrors` integration to link the errors together.
        setCause(error, errorBoundaryError);
      }

      if (beforeCapture) {
        beforeCapture(scope, error, componentStack);
      }

      const eventId = browser.captureException(error, {
        captureContext: {
          contexts: { react: { componentStack } },
        },
        mechanism: { handled: false },
      });

      if (onError) {
        onError(error, componentStack, eventId);
      }
      if (showDialog) {
        this._lastEventId = eventId;
        if (this._openFallbackReportDialog) {
          browser.showReportDialog({ ...dialogOptions, eventId });
        }
      }

      // componentDidCatch is used over getDerivedStateFromError
      // so that componentStack is accessible through state.
      this.setState({ error, componentStack, eventId });
    });
  }

   componentDidMount() {
    const { onMount } = this.props;
    if (onMount) {
      onMount();
    }
  }

   componentWillUnmount() {
    const { error, componentStack, eventId } = this.state;
    const { onUnmount } = this.props;
    if (onUnmount) {
      onUnmount(error, componentStack, eventId);
    }
  }

   __init() {this.resetErrorBoundary = () => {
    const { onReset } = this.props;
    const { error, componentStack, eventId } = this.state;
    if (onReset) {
      onReset(error, componentStack, eventId);
    }
    this.setState(INITIAL_STATE);
  };}

   render() {
    const { fallback, children } = this.props;
    const state = this.state;

    if (state.error) {
      let element = undefined;
      if (typeof fallback === 'function') {
        element = fallback({
          error: state.error,
          componentStack: state.componentStack,
          resetError: this.resetErrorBoundary,
          eventId: state.eventId,
        });
      } else {
        element = fallback;
      }

      if (React__namespace.isValidElement(element)) {
        return element;
      }

      if (fallback) {
        debugBuild.DEBUG_BUILD && utils.logger.warn('fallback did not produce a valid ReactElement');
      }

      // Fail gracefully if no fallback provided or is not valid
      return null;
    }

    if (typeof children === 'function') {
      return (children )();
    }
    return children;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withErrorBoundary(
  WrappedComponent,
  errorBoundaryOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const componentDisplayName = WrappedComponent.displayName || WrappedComponent.name || UNKNOWN_COMPONENT;

  const Wrapped = (props) => (
    React__namespace.createElement(ErrorBoundary, { ...errorBoundaryOptions, __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}
      , React__namespace.createElement(WrappedComponent, { ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 239}} )
    )
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Wrapped.displayName = `errorBoundary(${componentDisplayName})`;

  // Copy over static methods from Wrapped component to Profiler HOC
  // See: https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics__default(Wrapped, WrappedComponent);
  return Wrapped;
}

exports.ErrorBoundary = ErrorBoundary;
exports.UNKNOWN_COMPONENT = UNKNOWN_COMPONENT;
exports.isAtLeastReact17 = isAtLeastReact17;
exports.withErrorBoundary = withErrorBoundary;
//# sourceMappingURL=errorboundary.js.map
