import Markdown from "react-markdown";

import BlogLayout from "../../components/BlogLayout";
import CodeBlock from "../../components/CodeBlock";
import PostHeader from "../../components/PostHeader";
import getSiteMetadata from "../../lib/getSiteMetadata";

import { getAllPostSlugs, getPostBySlug } from "../../lib/posts";

import styles from "../../styles/Blog.module.scss";

export default function Post({ meta, data, content }) {
  return (
    <>
      <BlogLayout meta={meta} pageMeta={data}>
        <PostHeader
          title={data.title}
          date={data.date}
          updated={data.updated}
        />

        <Markdown linkTarget="_blank" components={{ code: CodeBlock }}>
          {content}
        </Markdown>
      </BlogLayout>

      <footer className={styles.footer}>
        {" "}
        <small>
          &copy; {currentYear()} Anderson Fernandes. All rights reserved
        </small>{" "}
      </footer>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      data: post.data,
      content: post.content,
      meta: await getSiteMetadata(),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPostSlugs().map((slug) => {
      return {
        params: { slug },
      };
    }),
    fallback: false,
  };
}

function currentYear() {
  const today = new Date();
  return today.getFullYear();
}
