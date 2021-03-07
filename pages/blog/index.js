import Link from "next/link"

import BlogLayout from '../../components/blog_layout'
import { getAllPosts } from "../../lib/posts_loader"
import getSiteMeta from "../../lib/site_metadata"

export default function Blog({ meta, posts }) {
  return (
    <BlogLayout meta={ meta }>
      <h1>Hello I'm a Blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </BlogLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
      meta: await getSiteMeta(),
    },
  }
}
