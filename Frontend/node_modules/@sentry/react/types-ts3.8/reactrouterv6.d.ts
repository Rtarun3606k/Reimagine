import { browserTracingIntegration } from '@sentry/browser';
import { Integration, Transaction, TransactionContext } from '@sentry/types';
import * as React from 'react';
import { CreateRouterFunction, CreateRoutesFromChildren, MatchRoutes, Router, RouterState, UseEffect, UseLocation, UseNavigationType, UseRoutes } from './types';
interface ReactRouterOptions {
    useEffect: UseEffect;
    useLocation: UseLocation;
    useNavigationType: UseNavigationType;
    createRoutesFromChildren: CreateRoutesFromChildren;
    matchRoutes: MatchRoutes;
    stripBasename?: boolean;
}
/**
 * A browser tracing integration that uses React Router v3 to instrument navigations.
 * Expects `history` (and optionally `routes` and `matchPath`) to be passed as options.
 */
export declare function reactRouterV6BrowserTracingIntegration(options: Parameters<typeof browserTracingIntegration>[0] & ReactRouterOptions): Integration;
/**
 * @deprecated Use `reactRouterV6BrowserTracingIntegration()` instead.
 */
export declare function reactRouterV6Instrumentation(useEffect: UseEffect, useLocation: UseLocation, useNavigationType: UseNavigationType, createRoutesFromChildren: CreateRoutesFromChildren, matchRoutes: MatchRoutes, stripBasename?: boolean): (customStartTransaction: (context: TransactionContext) => Transaction | undefined, startTransactionOnPageLoad?: boolean, startTransactionOnLocationChange?: boolean) => void;
export declare function withSentryReactRouterV6Routing<P extends Record<string, any>, R extends React.FC<P>>(Routes: R): R;
export declare function wrapUseRoutes(origUseRoutes: UseRoutes): UseRoutes;
export declare function wrapCreateBrowserRouter<TState extends RouterState = RouterState, TRouter extends Router<TState> = Router<TState>>(createRouterFunction: CreateRouterFunction<TState, TRouter>): CreateRouterFunction<TState, TRouter>;
export {};
//# sourceMappingURL=reactrouterv6.d.ts.map
