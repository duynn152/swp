export interface LoginRequest {
  usernameOrEmail: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  fullName: string
  password: string
  phone?: string
  dateOfBirth?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  role?: 'PATIENT' | 'DOCTOR' | 'ADMIN' | 'STAFF'
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: number
    username: string
    email: string
    fullName: string
    role: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}

const API_BASE_URL = 'http://localhost:8080/api/users/auth'

// Login user
export const loginUser = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Login failed')
  }
  
  return response.json()
}

// Register user
export const registerUser = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Registration failed')
  }
  
  return response.json()
}

// Get current user
export const getCurrentUser = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to get user info')
  }
  
  return response.json()
}

// Refresh token
export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${API_BASE_URL}/refresh?refreshToken=${refreshToken}`, {
    method: 'POST',
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to refresh token')
  }
  
  return response.json()
}

// Storage helpers
export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

export const storeUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getStoredUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
} 