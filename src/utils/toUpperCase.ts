// but it works with latin letters only
export const toUpperCase = (str: string) =>
  str
    .split('')
    .map((letter) => {
      const charCode = letter.charCodeAt(0)

      return charCode >= 97 && charCode <= 122 ? String.fromCharCode(charCode - 32) : letter
    })
    .join('')
