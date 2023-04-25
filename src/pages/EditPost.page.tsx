import { useEffect, useState } from "react";
import { useParams } from "@tanstack/router";
import { useQuery } from "@tanstack/react-query";

import Form from "../components/Form.component";

import { editPostRoute } from "../routes/postList/postList.route";
import { PostType, getPost } from "../api/posts";
import { Header1 } from "../components/Header.component";

const EditPost = () => {
  const { postId } = useParams({
    from: editPostRoute.id,
  });

  const { data, error, isLoading, isError } = useQuery<PostType, Error>({
    queryKey: ["posts", postId],
    queryFn: async () => getPost(postId),
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <Header1>Edit Content</Header1>
      <Form {...data} />
    </div>
  );
};

export default EditPost;
