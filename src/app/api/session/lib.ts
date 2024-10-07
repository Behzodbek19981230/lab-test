import crypto from 'crypto'

import type { SessionOptions } from 'iron-session'

import type { IUser } from '@/utils/interfaces'
import { consts } from '@/utils/consts'

export interface SessionData {
  user: IUser | null
  isLoggedIn: boolean
  token?: string | null
  locale?: string
}

export const defaultSession: SessionData = {
  user: {
    id: 0,
    username: '',
    avatar: '',
    role: 'admin',
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    status: ''
  },
  isLoggedIn: false,
  token: '',
  locale: 'uz'
}

export const sessionOptions: SessionOptions = {
  password: consts.SECRET_COOKIE_PASSWORD as string,
  cookieName: consts.SECRET_COOKIE_NAME as string,
  cookieOptions: {
    secure: false
  }
}

export function encrypt(data: any): string {
  const algorithm = 'aes-256-cbc' // AES encryption algorithm
  const key = consts.SECRET_COOKIE_PASSWORD as string // 32-byte key
  const iv = crypto.randomBytes(16) // Initialization vector

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')

  encrypted += cipher.final('hex')

  // Combine the IV with the encrypted data
  return iv.toString('hex') + ':' + encrypted
}

export function decrypt(encryptedData: string): any {
  const algorithm = 'aes-256-cbc' // AES encryption algorithm
  const key = consts.SECRET_COOKIE_PASSWORD as string // 32-byte key

  console.log(encryptedData)

  // Split the IV and the encrypted data
  const [ivHex, encrypted] = encryptedData.split(':')
  const iv = Buffer.from(ivHex, 'hex')

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')

  decrypted += decipher.final('utf8')

  return JSON.parse(decrypted) // Convert back to original object
}
