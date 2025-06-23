package com.swp.backend.entity;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User roles in the hospital system")
public enum UserRole {
    PATIENT("Bệnh nhân"),
    DOCTOR("Bác sĩ"),
    ADMIN("Quản trị viên"),
    STAFF("Nhân viên");
    
    private final String displayName;
    
    UserRole(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    @Override
    public String toString() {
        return displayName;
    }
} 