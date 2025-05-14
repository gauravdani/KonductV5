import { User, Session, AuthResponse, LoginCredentials, SignupData } from '@/types/auth'
import { v4 as uuidv4 } from 'uuid'

// In-memory stores
const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'Admin123!',
    fullName: 'Admin User',
    company: 'Test Company',
    role: 'ADMIN',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'Manager123!',
    fullName: 'Manager User',
    company: 'Test Company',
    role: 'MANAGER',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'User123!',
    fullName: 'Regular User',
    company: 'Test Company',
    role: 'USER',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const sessions: Session[] = []

// Helper functions
const createSession = (userId: string): Session => {
  const session: Session = {
    id: uuidv4(),
    userId,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    createdAt: new Date(),
  }
  sessions.push(session)
  return session
}

const getUserWithoutPassword = (user: User): Omit<User, 'password'> => {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Auth functions
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const user = users.find(u => u.email === credentials.email)
  
  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid email or password')
  }

  const session = createSession(user.id)
  
  return {
    user: getUserWithoutPassword(user),
    session,
  }
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const existingUser = users.find(u => u.email === data.email)
  
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const user: User = {
    id: uuidv4(),
    ...data,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  users.push(user)
  const session = createSession(user.id)

  return {
    user: getUserWithoutPassword(user),
    session,
  }
}

export const logout = async (sessionId: string): Promise<void> => {
  const sessionIndex = sessions.findIndex(s => s.id === sessionId)
  if (sessionIndex !== -1) {
    sessions.splice(sessionIndex, 1)
  }
}

export const getSession = async (sessionId: string): Promise<Session | null> => {
  const session = sessions.find(s => s.id === sessionId)
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  return session
}

export const getUser = async (userId: string): Promise<Omit<User, 'password'> | null> => {
  const user = users.find(u => u.id === userId)
  if (!user) {
    return null
  }
  return getUserWithoutPassword(user)
}

export const verifyEmail = async (email: string): Promise<void> => {
  const user = users.find(u => u.email === email)
  if (!user) {
    throw new Error('User not found')
  }
  user.emailVerified = true
  user.updatedAt = new Date()
}

export const resetPassword = async (email: string, newPassword: string): Promise<void> => {
  const user = users.find(u => u.email === email)
  if (!user) {
    throw new Error('User not found')
  }
  user.password = newPassword
  user.updatedAt = new Date()
}

// Test helper functions
export const getTestUsers = () => {
  return users.map(getUserWithoutPassword)
}

export const clearSessions = () => {
  sessions.length = 0
} 