import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostModel } from "../models";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostsFiles = () => {
  const postFiles = fs.readdirSync(postsDirectory);
  return postFiles;
}
export function getPostData(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");
  const postData: PostModel = {
    slug: postSlug,
    title: data.title,
    date: data.date,
    image: data.image,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content,
  };

  return postData;
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map(postFile => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
}