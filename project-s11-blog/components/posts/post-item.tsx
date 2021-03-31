import Link from "next/link";
import Image from "next/image";
import { PostModel } from "../../models";
import classes from "./post-item.module.css";

type PostItemProps = {
  post: PostModel;
};

const PostItem: React.FC<PostItemProps> = ({
  post: { title, image, excerpt, date, slug },
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image}`}
              alt={title}
              width={300}
              height={200}
            />
          </div>
          <div>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
