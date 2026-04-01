export const getLocale = (key: string) => localStorage.getItem(key)
export const setLocale = (key: string, value: string) => localStorage.setItem(key, value)

export function slugify(str: string): string {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export function isUrlValid(string: string): boolean {
  try {
    new URL(string)
    return true
  }
  catch (err) {
    return false
  }
}