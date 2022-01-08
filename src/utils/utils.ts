import { sha256 } from 'js-sha256'

const encryptPassword = (password: string): string => {
  return sha256(password)
}

export {
  encryptPassword
}
