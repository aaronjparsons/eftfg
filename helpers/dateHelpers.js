import { format, formatDistance } from 'date-fns'

export function formatDate(date) {
  return format(new Date(date), 'LLLL do, y')
}

export function distance(date) {
  return formatDistance(Date.now(), new Date(date))
}