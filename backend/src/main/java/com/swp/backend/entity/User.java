package com.swp.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User entity representing a system user")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the user", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @Schema(description = "Unique username for the user", example = "john_doe", required = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    @Schema(description = "User's email address", example = "john.doe@example.com", required = true)
    private String email;
    
    @Column(nullable = false)
    @Schema(description = "User's password", example = "secretPassword123", required = true)
    private String password;
    
    @Column(name = "full_name")
    @Schema(description = "User's full name", example = "John Doe")
    private String fullName;
    
    @Column(name = "phone")
    @Schema(description = "User's phone number", example = "0123456789")
    private String phone;
    
    @Column(name = "date_of_birth")
    @Schema(description = "User's date of birth")
    private LocalDate dateOfBirth;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @Schema(description = "User's gender", example = "MALE")
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @Schema(description = "User's role in the system", example = "PATIENT", required = true)
    private UserRole role = UserRole.PATIENT; // Default role
    
    @Column(name = "is_active")
    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    @Schema(description = "Timestamp when the user was created", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    @Schema(description = "Timestamp when the user was last updated", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Enum for Gender
    public enum Gender {
        MALE("Nam"), 
        FEMALE("Nữ"), 
        OTHER("Khác");
        
        private final String displayName;
        
        Gender(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }

    // Manual getters and setters to ensure they exist
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
} 