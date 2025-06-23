package com.swp.backend.service;

import com.swp.backend.entity.User;
import com.swp.backend.entity.UserRole;
import java.util.List;
import java.util.Optional;

public interface UserService {
    
    User createUser(User user);
    
    List<User> getAllUsers();
    
    Optional<User> getUserById(Long id);
    
    Optional<User> getUserByUsername(String username);
    
    Optional<User> getUserByEmail(String email);
    
    User updateUser(Long id, User user);
    
    void deleteUser(Long id);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    // Authentication methods
    User findByUsernameOrEmail(String usernameOrEmail);
    
    // Role-related methods
    List<User> getUsersByRole(UserRole role);
    
    User updateUserRole(Long userId, UserRole role);
    
    // Authentication methods
    Optional<User> authenticateUser(String usernameOrEmail, String password);
    
    User registerUser(User user);
    
    // Active status methods
    User activateUser(Long userId);
    
    User deactivateUser(Long userId);
    
    List<User> getActiveUsers();
} 