import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "@tanstack/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Header1 } from "../components/Header.component";
import Input from "../components/Input.component";

import { editPostRoute } from "../routes/postList/postList.route";
import { PostType, getPost, updatePost } from "../api/posts";

type FormDataType = {
  [key: string]: FormDataEntryValue;
};

const EditPost = () => {
  const postInitialValue: PostType = { id: "", title: "", content: "" };
  const [postData, setPostData] = useState<PostType>(postInitialValue);

  const queryClient = useQueryClient();

  const { postId } = useParams({
    from: editPostRoute.id,
  });

  const { data, error, isLoading, isError } = useQuery<PostType, Error>({
    queryKey: ["posts", postId],
    queryFn: async () => getPost(postId),
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  const navigate = useNavigate({ from: "/posts/$postId" });

  const updatePostMutation = useMutation({
    mutationFn: () => updatePost(postId, postData?.title, postData?.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      navigate({ to: "/posts/$postId", params: { postId } });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setPostData(data);

    const responseBody = {} as FormDataType;
    const formData = new FormData(e.currentTarget);
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );

    setPostData((prev) => {
      return {
        ...prev,
        title: responseBody.title,
        content: responseBody.content,
      };
    });

    updatePostMutation.mutate();
  };

  return (
    <div>
      <Header1>Edit Content</Header1>
      <form
        onSubmit={handleSubmit}
        className="mx-8 flex flex-col justify-between items-end"
      >
        <Input label="Title" value={data.title} />
        <Input
          label="Content"
          value={data.content}
          placeholder="What's on your mind..."
        />
        <button
          type="submit"
          className="min-w-fit px-6 py-2 my-4 rounded-full bg-slate-100 border-2 border-slate-100"
        >
          Save Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
