package com.flowhub.backend.service;

import com.flowhub.backend.dto.LoginRequest;
import com.flowhub.backend.dto.RegisterRequest;
import com.flowhub.backend.dto.JwtAuthResponse;
import com.flowhub.backend.entity.User;
import com.flowhub.backend.repository.UserRepository;
import com.flowhub.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public JwtAuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        return new JwtAuthResponse(jwt, loginRequest.getUsername());
    }

    public Map<String, Object> register(RegisterRequest registerRequest) {
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            throw new RuntimeException("Username is already taken!");
        }

        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Email is already taken!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);

        return Map.of(
                "message", "Account created successfully",
                "username", user.getUsername(),
                "email", user.getEmail(),
                "hashedPassword", hashedPassword
        );
    }
}
