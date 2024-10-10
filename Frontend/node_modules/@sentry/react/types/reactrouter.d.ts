import { browserTracingIntegration } from '@sentry/browser';
import type { Integration } from '@sentry/types';
import * as React from 'react';
import type { Action, Location, ReactRouterInstrumentation } from './types';
type Match = {
    path: string;
    url: string;
    params: Record<string, any>;
    isExact: boolean;
};
export type RouterHistory = {
    location?: Location;
    listen?(cb: (location: Location, action: Action) => void): void;
} & Record<string, any>;
export type RouteConfig = {
    [propName: string]: unknown;
    path?: string | string[];
    exact?: boolean;
    component?: JSX.Element;
    routes?: RouteConfig[];
};
export type MatchPath = (pathname: string, props: string | string[] | any, parent?: Match | null) => Match | null;
interface ReactRouterOptions {
    history: RouterHistory;
    routes?: RouteConfig[];
    matchPath?: MatchPath;
}
/**
 * A browser tracing integration that uses React Router v4 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
export declare function reactRouterV4BrowserTracingIntegration(options: Parameters<typeof browserTracingIntegration>[0] & ReactRouterOptions): Integration;
/**
 * A browser tracing integration that uses React Router v5 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
export declare function reactRouterV5BrowserTracingIntegration(options: Parameters<typeof browserTracingIntegration>[0] & ReactRouterOptions): Integration;
/**
 * @deprecated Use `browserTracingReactRouterV4()` instead.
 */
export declare function reactRouterV4Instrumentation(history: RouterHistory, routes?: RouteConfig[], matchPath?: MatchPath): ReactRouterInstrumentation;
/**
 * @deprecated Use `browserTracingReactRouterV5()` instead.
 */
export declare function reactRouterV5Instrumentation(history: RouterHistory, routes?: RouteConfig[], matchPath?: MatchPath): ReactRouterInstrumentation;
export declare function withSentryRouting<P extends Record<string, any>, R extends React.ComponentType<P>>(Route: R): R;
export {};
//# sourceMappingURL=reactrouter.d.ts.map