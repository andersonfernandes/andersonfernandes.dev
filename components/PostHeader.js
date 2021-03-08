import { formatedPublishedAt } from '../lib/dates_helper'
import styles from './PostHeader.module.scss'

export default function PostHeader({ title, date }) {
  return (
    <div className={ styles['post-header'] }>
      <div className={ styles.date }>{ formatedPublishedAt(date) }</div>
      <div className={ styles.title }>{ title }</div>
    </div>
  )
}
