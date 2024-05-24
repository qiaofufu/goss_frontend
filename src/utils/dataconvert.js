export function convertTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

export function convertByteSize(size) {
  size = Number(size)
  if (size === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function convertRWPermission(permission) {
  let rwPolicy = permission
  console.log(rwPolicy)
  if (rwPolicy === 1) return 'R'
  if (rwPolicy === 2) return 'W'
  if (rwPolicy === 3) return 'R/W'
  return 'Unknown'
}
