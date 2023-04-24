import { Route } from "@tanstack/router";

import { rootRoute } from "./root.route";
import Home from "../pages/Home.page";

// Create an index route
export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
