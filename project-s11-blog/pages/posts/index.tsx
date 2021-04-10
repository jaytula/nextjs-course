import { GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";
import { PostModel } from "../../models";

const AllPostsPage: React.FC<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all programming-related tutorials and posts!" />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
