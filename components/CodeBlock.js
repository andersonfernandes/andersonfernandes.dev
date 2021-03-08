import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import styles from './CodeBlock.module.scss'

export default function CodeBlock({ language, value }) {
  const copyCode = (event) => {
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

  return (
    <div className={ styles['code-container'] }>
      <div
        className={ styles.copy }
        onClick={ (event) => copyCode(event) }>
        Copy
      </div>

      <SyntaxHighlighter showLineNumbers={true} language={language} style={ darcula }>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
