export interface User {
  id: number
  username: string
  email: string
  fullName: string
  password?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  username: string
  email: string
  fullName: string
  password: string
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  fullName?: string
  password?: string
}

const API_BASE_URL = 'http://localhost:8080/api'

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

// Get user by ID
export const getUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/username/${username}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

// Create new user
export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}

// Update user
export const updateUser = async (userId: number, userData: UpdateUserRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

// Delete user
export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
} 