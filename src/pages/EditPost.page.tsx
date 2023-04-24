import { useParams } from "@tanstack/router";
import { editPostRoute } from "../routes/postList/postList.route";
import { useQuery } from "@tanstack/react-query";
import { PostType, getPost } from "../api/posts";

const EditPost = () => {
  const { postId } = useParams({
    from: editPostRoute.id,
  });

  const { data, error, isLoading, isError } = useQuery<PostType, Error>({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });

  return <div>{data?.title}</div>;
};

export default EditPost;
