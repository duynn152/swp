package com.swp.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "admin123";
        String hashedPassword = encoder.encode(password);
        System.out.println("Plain password: " + password);
        System.out.println("Hashed password: " + hashedPassword);
        
        // Verify the hash works
        boolean matches = encoder.matches(password, hashedPassword);
        System.out.println("Password matches: " + matches);
    }
} 