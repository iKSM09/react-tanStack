import { Router } from "@tanstack/router";

import { rootRoute } from "./routes/root.route";
import { indexRoute } from "./routes/index.route";
import {
  postListRoute,
  postListIndexRoute,
  postRoute,
  postIndexRoute,
  editPostRoute,
} from "./routes/postList/postList.route";

// Querying different types of routes
// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", { suthorID: 1 }]
// /POSTS/2/commenst -> ["posts", post.id, "comments"]

// Create the route tree using routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  postListRoute.addChildren([
    postListIndexRoute,
    postRoute.addChildren([postIndexRoute, editPostRoute]),
  ]),
]);

// Create the router using route tree
export const router = new Router({ routeTree });

// Register router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
