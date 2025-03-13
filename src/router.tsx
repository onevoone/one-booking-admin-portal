import { createRouter, createRootRoute, Outlet, createRoute } from '@tanstack/react-router';
import Dashboard from './pages/dashboard';
import Tenants from './pages/tenants';
import Login from './pages/login';
import { auth } from './lib/firebase';

const rootRoute = createRootRoute({
	component: () => {
		const user = auth.currentUser;
		if (!user) {
			return <Login />;
		}
		return <Outlet />;
	},
});

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Dashboard,
})

const tenantsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/tenants',
	component: Tenants,
});

const routeTree = rootRoute.addChildren([dashboardRoute, tenantsRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
