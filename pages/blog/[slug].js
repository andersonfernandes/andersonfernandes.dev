import ReactMarkdown from "react-markdown"

import BlogLayout from "../../components/BlogLayout"
import CodeBlock from '../../components/CodeBlock'
import PostHeader from "../../components/PostHeader"

import { getAllPostSlugs, getPostBySlug } from "../../lib/posts_loader"
import getSiteMeta from "../../lib/site_metadata"

export default function Post({ meta, data, content }) { 
  return (
    <BlogLayout meta={ meta }>
      <PostHeader title={ data.title } date={ data.date } />

      <ReactMarkdown
        escapeHtml={true}
        source={content}
        renderers={{ code: CodeBlock }}
      />
    </BlogLayout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  return {
    props: {
      data: post.data,
      content: post.content,
      meta: await getSiteMeta(),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllPostSlugs().map((slug) => {
      return {
        params: { slug },
      }
    }),
    fallback: false
  };
}
