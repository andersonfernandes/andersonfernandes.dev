import ReactMarkdown from "react-markdown"

import CodeBlock from '../../components/code_block'
import { getAllPostSlugs, getPostBySlug } from "../../lib/posts_loader"

export default function Post({ content, data }) { 
  return (
    <div>
      <h1>{ data.title }</h1>
      <h4>{ data.date }</h4>

      <ReactMarkdown
        escapeHtml={true}
        source={content}
        renderers={{ code: CodeBlock }}
      />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  return {
    props: {
      data: post.data,
      content: post.content
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
