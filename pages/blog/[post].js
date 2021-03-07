import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language, value }) => {
  return (
    <div style={{ width: '650px'}}>
    <SyntaxHighlighter showLineNumbers={true} language={language} style={ darcula }>
      {value}
    </SyntaxHighlighter>
    </div>
  )
}

const Post = ({ content, data }) => {
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

export default Post

Post.getInitialProps = async (context) => {
  const { post } = context.query
  const content = await import(`../../_posts/${post}.md`)
  const data = matter(content.default)

  return { ...data }
}
