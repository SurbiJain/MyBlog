
import { useSelector} from "react-redux";
import {
  
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";
import PostsExcerpt from "./PostExcerpt";

const PostsList = () => {
  
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  
  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date?.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="gap-5 flex flex-col justify-center items-center ">
      <h2 className=" ">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
