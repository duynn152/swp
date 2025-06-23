package com.swp.backend.controller;

import com.swp.backend.entity.User;
import com.swp.backend.entity.UserRole;
import com.swp.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {
    
    private final UserService userService;

    // Constructor for dependency injection
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    @Operation(summary = "Create a new user", description = "Creates a new user with unique username and email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "400", description = "Bad request - username or email already exists",
                content = @Content)
    })
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().build();
        }
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves a list of all users")
    @ApiResponse(responseCode = "200", description = "List of users retrieved successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/active")
    @Operation(summary = "Get all active users", description = "Retrieves a list of all active users")
    @ApiResponse(responseCode = "200", description = "List of active users retrieved successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> users = userService.getActiveUsers();
        return ResponseEntity.ok(users);
    }
    
    // Role-based endpoints
    @GetMapping("/role/{role}")
    @Operation(summary = "Get users by role", description = "Retrieves users by their role")
    @ApiResponse(responseCode = "200", description = "Users found",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)))
    public ResponseEntity<List<User>> getUsersByRole(@Parameter(description = "User role") @PathVariable UserRole role) {
        List<User> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/{id}/role")
    @Operation(summary = "Update user role", description = "Updates a user's role")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Role updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> updateUserRole(@Parameter(description = "User ID") @PathVariable Long id, 
                                             @RequestBody Map<String, String> roleData) {
        try {
            UserRole role = UserRole.valueOf(roleData.get("role"));
            User updatedUser = userService.updateUserRole(id, role);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // User status endpoints
    @PutMapping("/{id}/activate")
    @Operation(summary = "Activate user", description = "Activates a user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User activated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> activateUser(@Parameter(description = "User ID") @PathVariable Long id) {
        try {
            User activatedUser = userService.activateUser(id);
            return ResponseEntity.ok(activatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate user", description = "Deactivates a user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User deactivated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> deactivateUser(@Parameter(description = "User ID") @PathVariable Long id) {
        try {
            User deactivatedUser = userService.deactivateUser(id);
            return ResponseEntity.ok(deactivatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> getUserById(@Parameter(description = "User ID") @PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/username/{username}")
    @Operation(summary = "Get user by username", description = "Retrieves a user by their username")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> getUserByUsername(@Parameter(description = "Username") @PathVariable String username) {
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email", description = "Retrieves a user by their email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> getUserByEmail(@Parameter(description = "Email") @PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Updates an existing user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)
    })
    public ResponseEntity<User> updateUser(@Parameter(description = "User ID") @PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user", description = "Deletes a user by their ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "User deleted successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<Void> deleteUser(@Parameter(description = "User ID") @PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
} 