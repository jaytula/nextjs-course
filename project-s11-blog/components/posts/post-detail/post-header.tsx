import Image from "next/image";
import { useRouter } from "next/router";

import classes from './post-header.module.css'

type Props = {
  title: string;
  image: string;
};

const PostHeader: React.FC<Props> = ({ title, image }) => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image
        src={image}
        alt={title}
        width={200}
        height={150}
      />
    </header>
  );
};

export default PostHeader;
