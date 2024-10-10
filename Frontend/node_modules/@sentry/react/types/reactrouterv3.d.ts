import { browserTracingIntegration } from '@sentry/browser';
import type { Integration } from '@sentry/types';
import type { Location, ReactRouterInstrumentation } from './types';
type HistoryV3 = {
    location?: Location;
    listen?(cb: (location: Location) => void): void;
} & Record<string, any>;
export type Route = {
    path?: string;
    childRoutes?: Route[];
};
export type Match = (props: {
    location: Location;
    routes: Route[];
}, cb: (error?: Error, _redirectLocation?: Location, renderProps?: {
    routes?: Route[];
}) => void) => void;
interface ReactRouterOptions {
    history: HistoryV3;
    routes: Route[];
    match: Match;
}
/**
 * A browser tracing integration that uses React Router v3 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
export declare function reactRouterV3BrowserTracingIntegration(options: Parameters<typeof browserTracingIntegration>[0] & ReactRouterOptions): Integration;
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
export declare function reactRouterV3Instrumentation(history: HistoryV3, routes: Route[], match: Match): ReactRouterInstrumentation;
export {};
//# sourceMappingURL=reactrouterv3.d.ts.map