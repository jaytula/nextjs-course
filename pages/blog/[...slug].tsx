import { useRouter } from "next/router";
const BlogPostsPage = () => {
  const router = useRouter();

  // slug is an array of all the segments
  const { slug } = router.query;

  return (
    <div>
      <h1>The Blog Posts: {router.pathname}</h1>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  );
};

export default BlogPostsPage;
