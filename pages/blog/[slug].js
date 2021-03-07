import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'


import { getAllPostSlugs, getPostBySlug } from "../../lib/posts_loader"

const CodeBlock = ({ language, value }) => {
  return (
    <div style={{ width: '650px'}}>
    <SyntaxHighlighter showLineNumbers={true} language={language} style={ darcula }>
      {value}
    </SyntaxHighlighter>
    </div>
  )
}

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
