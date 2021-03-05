import React from "react"
import Head from "next/head"
import Link from "next/link"

export default function Blog({ title, description, posts }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={ description }></meta>
        <title>{ title }</title>
      </Head>

      <h1>Hello I'm a Blog</h1>

      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export async function getStaticProps() {
  const siteData = await import(`../../config.json`)
  const matter = require('gray-matter')
  const fs = require("fs")

  const files = fs.readdirSync(`${process.cwd()}/blog_posts`, "utf-8")
  const posts = files.filter((fn) => fn.endsWith(".md")).map((filename) => {
    const path = `${process.cwd()}/blog_posts/${filename}`
    const rawPostContent = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    const postData = matter(rawPostContent).data
    const slug = filename.split('.').slice(0, -1).join('.')

    return Object.assign(postData, { slug: slug })
  })

  return {
    props: {
      posts: posts,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  }
}
