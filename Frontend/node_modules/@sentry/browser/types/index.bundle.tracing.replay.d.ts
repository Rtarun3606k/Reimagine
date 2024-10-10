import { Feedback, feedbackIntegration } from '@sentry-internal/integration-shims';
import { BrowserTracing, Span, addExtensionMethods } from '@sentry-internal/tracing';
import { Replay, replayIntegration } from '@sentry/replay';
import { bundleBrowserTracingIntegration as browserTracingIntegration } from './helpers';
export { Feedback, Replay, replayIntegration, feedbackIntegration, BrowserTracing, browserTracingIntegration, Span, addExtensionMethods, };
export * from './index.bundle.base';
//# sourceMappingURL=index.bundle.tracing.replay.d.ts.map