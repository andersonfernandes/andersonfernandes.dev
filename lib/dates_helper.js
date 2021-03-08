import { parse, format } from 'date-fns'

export function formatedPublishedAt(date) {
  return format(publishedAt(date), 'MMMM dd, yyyy')
}

export function publishedAt(date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}
