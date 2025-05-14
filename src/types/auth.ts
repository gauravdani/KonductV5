export type UserRole = 'ADMIN' | 'MANAGER' | 'USER'

export interface User {
  id: string
  email: string
  password: string // In a real app, this would be hashed
  fullName: string
  company: string
  role: UserRole
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  userId: string
  expiresAt: Date
  createdAt: Date
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  session: Session
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  fullName: string
  company: string
  role: UserRole
} 