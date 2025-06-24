package com.swp.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request object for user authentication")
public class AuthenticationRequest {
    
    @NotBlank(message = "Username or email is required")
    @Schema(description = "Username or email address", example = "john_doe", required = true)
    private String usernameOrEmail;
    
    @NotBlank(message = "Password is required")
    @Schema(description = "User password", example = "password123", required = true)
    private String password;

    @Schema(description = "Remember me flag for extended session", example = "true", required = false)
    private boolean rememberMe = false;

    public AuthenticationRequest() {}

    public AuthenticationRequest(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }

    public AuthenticationRequest(String usernameOrEmail, String password, boolean rememberMe) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }
} 