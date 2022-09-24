import { formatedPublishedAt } from '../lib/dates_helper'
import styles from './PostHeader.module.scss'

export default function PostHeader({ title, date, updated }) {
  return (
    <div className={ styles['post-header'] }>
      <div className={ styles.date }>
        { updated ? `Updated at ${formatedPublishedAt(updated)}` : `Created at ${formatedPublishedAt(date)}` }
      </div>
      <div className={ styles.title }>{ title }</div>
    </div>
  )
}
