package com.swp.backend.repository;

import com.swp.backend.entity.User;
import com.swp.backend.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    // Role-based queries
    List<User> findByRole(UserRole role);
    
    List<User> findByRoleAndIsActiveTrue(UserRole role);
    
    // Active status queries
    List<User> findByIsActiveTrue();
    
    List<User> findByIsActiveFalse();
    
    // Authentication queries
    @Query("SELECT u FROM User u WHERE (u.username = :usernameOrEmail OR u.email = :usernameOrEmail) AND u.isActive = true")
    Optional<User> findByUsernameOrEmailAndIsActiveTrue(@Param("usernameOrEmail") String usernameOrEmail);
    
    // Combined queries
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isActive = true")
    List<User> findActiveUsersByRole(@Param("role") UserRole role);
    
    // Count queries
    long countByRole(UserRole role);
    
    long countByIsActiveTrue();
} 