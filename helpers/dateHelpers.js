import { format } from 'date-fns'

export function formatDate(date) {
  return format(new Date(date), 'LLLL do, y')
}