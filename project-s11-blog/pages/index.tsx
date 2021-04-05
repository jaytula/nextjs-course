import { GetStaticProps } from "next";
import React, { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/post-util";
import { PostModel } from "../models";

const HomePage: React.FC<{posts: PostModel[]}> = ({posts}) => {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage;

// 1) Hero => Present ourselves
// 2) Featured Posts
