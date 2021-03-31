import Image from "next/image";
import { PostModel } from "../../models";
import classes from "./post-item.module.css";

type PostItemProps = {
  post: PostModel;
};
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return <div className={classes.post}></div>;
};

export default PostItem;
