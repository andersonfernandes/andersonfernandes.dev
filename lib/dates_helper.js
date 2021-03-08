import { parse, format } from 'date-fns'

export function formatPublishedAt(date) {
  return format(parse(date, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')
}
