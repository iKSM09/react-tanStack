import { deleteRequest, fetcher, modifyRequest } from "../utils/fetcher";

const API_KEY = "http://localhost:3000";

export type PostType = {
  id: string;
  title: string;
  content: string;
};

export const getPosts = (): Promise<PostType[]> => fetcher(`${API_KEY}/posts`);

export const getPost = (id: string): Promise<PostType> =>
  fetcher(`${API_KEY}/posts/${id}`);

export const createPost = (title: string, content: string) =>
  modifyRequest(`${API_KEY}/posts`, "POST", {
    id: () => Date.now(),
    title,
    content,
  });

export const updatePost = (
  id: string,
  title: string,
  content: string
): Promise<PostType> =>
  modifyRequest(`${API_KEY}/posts/${id}`, "PUT", {
    title,
    content,
  });

export const deletePost = (postId: string) =>
  deleteRequest(`${API_KEY}/posts/${postId}`);
