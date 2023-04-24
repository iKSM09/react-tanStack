import { Outlet, RootRoute } from "@tanstack/router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Create a root route
export const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
      </>
    );
  },
});
