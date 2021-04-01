import { PostModel } from "../../models";
import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

const AllPosts: React.FC<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
