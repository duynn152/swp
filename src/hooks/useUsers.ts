import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  activateUser,
  deactivateUser,
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
    mutationFn: (userData: CreateUserRequest) => createUser(userData),
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
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Hook to delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Hook to activate user
export const useActivateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: number) => {
      console.log('Calling activateUser API for userId:', userId)
      return activateUser(userId)
    },
    onSuccess: (data) => {
      console.log('Activate user API success:', data)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Activate user API error:', error)
    },
  })
}

// Hook to deactivate user
export const useDeactivateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: number) => {
      console.log('Calling deactivateUser API for userId:', userId)
      return deactivateUser(userId)
    },
    onSuccess: (data) => {
      console.log('Deactivate user API success:', data)
      console.log('User isActive after deactivation:', data.isActive)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      console.log('Query cache invalidated for users')
    },
    onError: (error) => {
      console.error('Deactivate user API error:', error)
    },
  })
} 