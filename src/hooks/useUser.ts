import { useQuery } from '@tanstack/react-query'
import { getUserById, type User } from '../services/userService'

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  })
}