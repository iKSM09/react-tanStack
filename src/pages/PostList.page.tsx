import { FormEvent, useEffect, useState } from "react";
import { Link } from "@tanstack/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Header1 } from "../components/Header.component";
import Input from "../components/Input.component";

import { createPost, deletePost, getPosts, PostType } from "../api/posts";

type FormDataType = {
  [key: string]: FormDataEntryValue;
};

type PostDataType = {
  title: string;
  content: string;
};

const PostList = () => {
  const postInitialValue: PostDataType = { title: "", content: "" };
  const [postData, setPostData] = useState<PostDataType>(postInitialValue);

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
    mutationFn: () => createPost(postData?.title, postData?.content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const responseBody = {} as FormDataType;
    const formData = new FormData(e.currentTarget);
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );

    setPostData(responseBody);

    await createPostMutation.mutate();
    setPostData(postInitialValue);
  };

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  return (
    <div>
      <Header1>Posts</Header1>
      <form
        onSubmit={handleSubmit}
        className="mx-8 flex justify-between items-end gap-6"
      >
        <Input label="Title" value={postData.title} />
        <Input
          label="Content"
          value={postData.content}
          placeholder="What's on your mind..."
        />
        <button
          type="submit"
          className="min-w-fit px-6 py-2 my-4 rounded-full bg-slate-100 border-2 border-slate-100"
        >
          Add Post
        </button>
      </form>

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
    </div>
  );
};

export default PostList;
