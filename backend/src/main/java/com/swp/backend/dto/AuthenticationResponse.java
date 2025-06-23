package com.swp.backend.dto;

import com.swp.backend.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object for successful authentication")
public class AuthenticationResponse {
    
    @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String accessToken;
    
    @Schema(description = "JWT refresh token", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String refreshToken;
    
    @Schema(description = "Token type", example = "Bearer")
    private String tokenType = "Bearer";
    
    @Schema(description = "User information")
    private UserResponse user;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String accessToken, String refreshToken, User user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = new UserResponse(user);
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
} 