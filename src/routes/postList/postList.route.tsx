import { Route } from "@tanstack/router";

import PostList from "../../pages/PostList.page";
import Post from "../../pages/Post.page";
import EditPost from "../../pages/EditPost.page";

import { rootRoute } from "../root.route";

export const postListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/posts",
});

export const postListIndexRoute = new Route({
  getParentRoute: () => postListRoute,
  path: "/",
  component: PostList,
});

export const postRoute = new Route({
  getParentRoute: () => postListRoute,
  path: "/$postId",
});

export const postIndexRoute = new Route({
  getParentRoute: () => postRoute,
  path: "/",
  component: Post,
});

export const editPostRoute = new Route({
  getParentRoute: () => postRoute,
  path: "/edit",
  component: EditPost,
});
