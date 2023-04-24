import { Outlet, RootRoute } from "@tanstack/router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navigation from "../components/Navigation.component";

// Create a root route
export const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Navigation />
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
      </>
    );
  },
});
