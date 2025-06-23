import { useQuery } from '@tanstack/react-query'

interface User {
  id: number
  username: string
  email: string
  fullName: string
  createdAt: string
  updatedAt: string
}

const API_BASE_URL = 'http://localhost:8080/api'

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  })
}