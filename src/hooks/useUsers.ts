import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  type User,
  type CreateUserRequest,
  type UpdateUserRequest 
} from '../services/userService'

// Hook to get all users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })
}

// Hook to create user
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Hook to update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: number; userData: UpdateUserRequest }) =>
      updateUser(userId, userData),
    onSuccess: (updatedUser) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] })
    },
  })
}

// Hook to delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
} 