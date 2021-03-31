import { PostModel } from "../../models";
import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

type PostsProps = {
  posts: PostModel[];
};

const PostsGrid: React.FC<PostsProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
