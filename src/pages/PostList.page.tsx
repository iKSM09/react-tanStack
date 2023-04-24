import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Header1 } from "../components/Header.component";

import { Link } from "@tanstack/router";
import { createPost, deletePost, getPosts, PostType } from "../api/posts";

const PostList = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<PostType[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: () => createPost("jsad", "asdfg"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleAddPost = () => {
    createPostMutation.mutate();
  };

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  return (
    <div>
      <Header1>Posts</Header1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <ul>
            {posts?.map((post) => (
              <li
                key={post.id}
                className="mx-8 my-5 p-4 rounded-md bg-slate-400 flex justify-between items-center flex-wrap border-l-8 border-l-cyan-500"
              >
                <h2 className="pb-5 sm:pb-0">
                  <Link
                    to="/posts/$postId"
                    params={{
                      postId: post.id,
                    }}
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="flex gap-6">
                  <Link to="/posts/$postId/edit" params={{ postId: post.id }}>
                    <button className="px-6 py-2 rounded-full bg-slate-100 border-2 border-slate-100">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-6 py-2 rounded-full border-2 border-slate-100"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default PostList;
