package com.swp.backend.dto;

import com.swp.backend.entity.User;
import com.swp.backend.entity.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Schema(description = "User response object without sensitive information")
public class UserResponse {
    
    @Schema(description = "User ID", example = "1")
    private Long id;
    
    @Schema(description = "Username", example = "john_doe")
    private String username;
    
    @Schema(description = "Email address", example = "john.doe@example.com")
    private String email;
    
    @Schema(description = "Full name", example = "John Doe")
    private String fullName;
    
    @Schema(description = "Phone number", example = "0123456789")
    private String phone;
    
    @Schema(description = "Date of birth")
    private LocalDate dateOfBirth;
    
    @Schema(description = "Gender", example = "MALE")
    private User.Gender gender;
    
    @Schema(description = "User role", example = "PATIENT")
    private UserRole role;
    
    @Schema(description = "Account status", example = "true")
    private Boolean isActive;
    
    @Schema(description = "Created timestamp")
    private LocalDateTime createdAt;

    public UserResponse() {}

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.phone = user.getPhone();
        this.dateOfBirth = user.getDateOfBirth();
        this.gender = user.getGender();
        this.role = user.getRole();
        this.isActive = user.getIsActive();
        this.createdAt = user.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public User.Gender getGender() {
        return gender;
    }

    public void setGender(User.Gender gender) {
        this.gender = gender;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 