import { Route } from "@tanstack/router";

import HookForm from "../../pages/HookForm.page";
import { rootRoute } from "../root.route";

export const hookFormRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/hook-form",
});

export const hookFormIndexRoute = new Route({
  getParentRoute: () => hookFormRoute,
  path: "/",
  component: HookForm,
});
