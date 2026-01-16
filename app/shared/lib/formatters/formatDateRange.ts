export const formatDateRange = (
  start: Date | null,
  end: Date | null,
): string => {
  if (!start && !end) return 'Select a date range'
  if (start && !end)
    return `${start.getDate()} ${start.toLocaleString('en-US', { month: 'long' })} ${start.getFullYear()}`
  if (start && end) {
    const startMonth = start.toLocaleString('en-US', { month: 'long' })
    const endMonth = end.toLocaleString('en-US', { month: 'long' })
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    return `${start.getDate()}${startMonth === endMonth && startYear === endYear ? '' : ` ${startMonth}`} - ${end.getDate()} ${endMonth} ${endYear}`
  }
  return ''
}
