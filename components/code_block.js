import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CodeBlock({ language, value }) {
  return (
    <div style={{ width: '650px'}}>
    <SyntaxHighlighter showLineNumbers={true} language={language} style={ darcula }>
      {value}
    </SyntaxHighlighter>
    </div>
  )
}
