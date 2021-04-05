import { GetStaticProps } from "next";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";
import { PostModel } from "../../models";


const AllPostsPage: React.FC<{posts: PostModel[]}> = ({posts}) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage;
