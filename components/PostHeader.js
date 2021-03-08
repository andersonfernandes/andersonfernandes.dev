import styles from './PostHeader.module.scss'
import { parse, format } from 'date-fns'

export default function PostHeader({ title, date }) {
  return (
    <div className={ styles['post-header'] }>
      <div className={ styles.title }>{ title }</div>
      <div className={ styles.date }>{ format(parse(date, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy') }</div>
    </div>
  )
}
