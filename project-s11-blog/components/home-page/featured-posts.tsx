import { PostModel } from "../../models";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

type Props = {
  posts: PostModel[],
}

const FeaturedPosts: React.FC<Props> = ({posts}) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
