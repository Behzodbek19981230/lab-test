export type IUserRole =
  | 'admin'
  | 'uzstandart'
  | 'akkreditatsiya'
  | 'korxona rahbari'
  | 'labaratoriya boshliq'
  | 'labaratoriya mutahasis'
  | 'menejer'
  | 'auditor'
  | 'byuro'

export interface IUser {
  id: number
  username: string
  avatar?: string
  role?: IUserRole
  password?: string
  email?: string
  fullName?: string
  phoneNumber?: string
  address?: string
  status?: string
}

export interface IMenuData {
  title: string
  icon?: string
  children?: IMenuData[]
  path?: string
  suffix?: number
  role?: IUserRole[]
  className?: string
}
