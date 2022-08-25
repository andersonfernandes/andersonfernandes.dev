import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import styles from './CodeBlock.module.scss'

const NO_COPY = '--no-copy'
const NO_LINES = '--no-lines'

const copyCode = (event, value) => {
  const selection = document.createElement('textarea')
  selection.value = value;
  document.body.appendChild(selection);
  selection.select();
  document.execCommand('copy');
  document.body.removeChild(selection);

  event.target.innerHTML = 'Copied!'

  setTimeout(() => {
    event.target.innerHTML = 'Copy'
  }, 1000)
}

const CopyButton = ({ value }) => {
  return (
    <div
      className={ styles.copy }
      onClick={ (event) => copyCode(event, value) }>
      Copy
    </div>
  )
}

export default function CodeBlock({ language, value, node }) {
  const meta = node.meta || ''
  const copyEnabled = !meta.includes(NO_COPY)
  const linesEnabled = !meta.includes(NO_LINES)

  return (
    <div className={ styles['code-container'] }>
      { copyEnabled && <CopyButton value={value} /> }

      <SyntaxHighlighter showLineNumbers={linesEnabled} language={language} style={ darcula }>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
