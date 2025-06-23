import { useQuery } from '@tanstack/react-query'

interface User {
  id: number
  name: string
  username: string
  email: string
}

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
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