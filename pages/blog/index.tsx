import Link from "next/link";

import BlogLayout from "../../components/BlogLayout";

import { formatedPublishedAt } from "../../lib/dates_helper";
import { getAllPosts } from "../../lib/posts_loader";
import getSiteMeta from "../../lib/site_metadata";

import styles from "../../styles/Blog.module.scss";

export default function Blog({ meta, posts }) {
  return (
    <BlogLayout meta={meta}>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className={styles["post-list-item"]}>
              <div className={styles.date}>
                {post.updated
                  ? `Updated at ${formatedPublishedAt(post.updated)}`
                  : `Created at ${formatedPublishedAt(post.date)}`}
              </div>
              <div className={styles.title}>{post.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </BlogLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
      meta: await getSiteMeta(),
    },
  };
}
