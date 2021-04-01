import AllPosts from "../../components/posts/all-posts";
import { PostModel } from "../../models";

const DUMMY_POSTS: PostModel[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production -  it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production -  it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production -  it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production -  it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
];

const AllPostsPage: React.FC = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
