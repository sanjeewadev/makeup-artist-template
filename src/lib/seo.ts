export const getSiteURL = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const absoluteURL = (value: string | null | undefined) => {
  if (!value) return undefined
  if (/^https?:\/\//i.test(value)) return value

  return getSiteURL() + (value.startsWith('/') ? value : '/' + value)
}
