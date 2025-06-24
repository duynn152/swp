import { getAccessToken } from './authService'

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR', 
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
}

export interface User {
  id: number
  username: string
  email: string
  fullName: string
  password?: string
  role: UserRole
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  username: string
  email: string
  fullName: string
  password: string
  role: UserRole
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  fullName?: string
  password?: string
  role?: UserRole
}

const API_BASE_URL = 'http://localhost:8080/api'

// Helper function to get authenticated headers
const getAuthHeaders = () => {
  const token = getAccessToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  }
}

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

// Get user by ID
export const getUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/username/${username}`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

// Create new user
export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to delete user')
  }
}

// Activate user
export const activateUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/activate`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  })
  if (!response.ok) {
    throw new Error('Failed to activate user')
  }
  return response.json()
}

// Deactivate user
export const deactivateUser = async (userId: number): Promise<User> => {
  console.log('userService.deactivateUser called with userId:', userId)
  const url = `${API_BASE_URL}/users/${userId}/deactivate`
  console.log('Making PUT request to:', url)
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
  })
  
  console.log('Response status:', response.status)
  console.log('Response ok:', response.ok)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error response:', errorText)
    throw new Error('Failed to deactivate user')
  }
  
  const result = await response.json()
  console.log('API Response data:', result)
  return result
} 