import { Link, useParams } from "@tanstack/router";
import { Header1 } from "../components/Header.component";
import { postRoute } from "../routes/postList/postList.route";
import { useQuery } from "@tanstack/react-query";
import { getPost, PostType } from "../api/posts";

const Post = () => {
  const { postId } = useParams({ from: postRoute.id });

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostType, Error>({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });

  if (isLoading) return <Header1>Loading...</Header1>;
  if (isError) return <Header1>Opps... Something went wrong.</Header1>;

  return (
    <div className="m-4">
      <div className="flex justify-between items-center">
        <Header1>{post.title}</Header1>
        <Link to="/posts/$postId/edit" params={{ postId: post.id }}>
          <button className="px-6 py-2 rounded-full bg-slate-100 border-2 border-slate-100">
            Edit
          </button>
        </Link>
      </div>
      <p className="my-4">{post.body}</p>
    </div>
  );
};

export default Post;
