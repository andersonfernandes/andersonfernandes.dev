import { formatPublishedAt } from '../lib/dates_helper'
import styles from './PostHeader.module.scss'

export default function PostHeader({ title, date }) {
  return (
    <div className={ styles['post-header'] }>
      <div className={ styles.title }>{ title }</div>
      <div className={ styles.date }>{ formatPublishedAt(date) }</div>
    </div>
  )
}
