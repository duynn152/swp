package com.swp.backend.service;

import com.swp.backend.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    
    User createUser(User user);
    
    List<User> getAllUsers();
    
    Optional<User> getUserById(Long id);
    
    Optional<User> getUserByUsername(String username);
    
    User updateUser(Long id, User user);
    
    void deleteUser(Long id);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
} 