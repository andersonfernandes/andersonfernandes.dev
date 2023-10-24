import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import { Post } from "../types/post";
import { publishedAt } from "./dates_helper";

const filesBasePath = `${process.cwd()}/_posts`;

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(filesBasePath, "utf-8");
  const mdFiles = files.filter((fn) => fn.endsWith(".md"));

  return mdFiles.map((filename) => filename.replace(/\.md$/, ""));
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const path = `${filesBasePath}/${slug}.md`;
    const rawPostContent = fs.readFileSync(path, "utf8");

    const { title, description, date, updated } = matter(rawPostContent).data;

    return {
      slug,
      title,
      description,
      date,
      updated,
    };
  });

  return posts.sort(
    (a, b) => publishedAt(b.date).getTime() - publishedAt(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): GrayMatterFile<Buffer> {
  const postData = fs.readFileSync(`${filesBasePath}/${slug}.md`);

  return matter(postData);
}
