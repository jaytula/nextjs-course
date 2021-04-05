import { GetStaticPaths, GetStaticProps } from "next";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllPosts, getPostData, getPostsFiles } from "../../lib/post-util";
import { PostModel } from "../../models";

interface Props {
  post: PostModel;
}

const PostDetailPage: React.FC<Props> = ({ post }) => {
  return <PostContent post={post} />;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const post = getPostData(`${slug}.md`);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
