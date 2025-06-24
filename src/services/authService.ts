export interface LoginRequest {
  usernameOrEmail: string
  password: string
  rememberMe?: boolean
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

// Storage helpers with remember me support
export const storeTokens = (accessToken: string, refreshToken: string, rememberMe: boolean = false) => {
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem('accessToken', accessToken)
  storage.setItem('refreshToken', refreshToken)
  storage.setItem('rememberMe', rememberMe.toString())
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
}

export const getRememberMe = () => {
  const rememberMe = localStorage.getItem('rememberMe') || sessionStorage.getItem('rememberMe')
  return rememberMe === 'true'
}

export const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  localStorage.removeItem('rememberMe')
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('rememberMe')
}

export const storeUser = (user: any, rememberMe: boolean = false) => {
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem('user', JSON.stringify(user))
}

export const getStoredUser = () => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Check if token is valid (not expired)
export const isTokenValid = (token: string): boolean => {
  if (!token) return false
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp > currentTime
  } catch (error) {
    return false
  }
}

// Check if user is currently logged in
export const isLoggedIn = (): boolean => {
  const token = getAccessToken()
  return token ? isTokenValid(token) : false
}

// Remember login credentials (only username/email for security)
export const saveLoginCredentials = (usernameOrEmail: string, rememberMe: boolean) => {
  console.log('💾 Saving login credentials:', { usernameOrEmail, rememberMe })
  
  if (rememberMe) {
    localStorage.setItem('savedUsername', usernameOrEmail)
    console.log('✅ Saved username to localStorage:', usernameOrEmail)
  } else {
    localStorage.removeItem('savedUsername')
    console.log('🗑️ Removed saved username from localStorage')
  }
}

export const getSavedUsername = (): string | null => {
  const saved = localStorage.getItem('savedUsername')
  console.log('📖 Getting saved username:', saved)
  return saved
}

export const clearSavedCredentials = () => {
  localStorage.removeItem('savedUsername')
}

// Clear everything including saved credentials (for complete logout)
export const clearAllData = () => {
  clearTokens()
  clearSavedCredentials()
} 