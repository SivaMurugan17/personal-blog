package com.aboredswe.demo.controller;

import com.aboredswe.demo.error.AuthException;
import com.aboredswe.demo.model.LoginPayload;
import com.aboredswe.demo.model.RegisterPayload;
import com.aboredswe.demo.model.Role;
import com.aboredswe.demo.model.User;
import com.aboredswe.demo.service.AuthService;
import com.aboredswe.demo.utils.JWTUtil;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Value("${jwt.cookie.name}")
    private String COOKIE_NAME;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterPayload registerPayload) throws AuthException {
        User foundUser = authService.findByEmail(registerPayload.getEmail());
        if(foundUser != null){
            throw new AuthException("User already exists");
        }
        User user = User.builder()
                .email(registerPayload.getEmail())
                .name(registerPayload.getName())
                .password(passwordEncoder.encode(registerPayload.getPassword()))
                .role(Role.MEMBER)
                .build();
        User savedUser = authService.addUser(user);
        String token = jwtUtil.generateTokenFromUser(user);
        ResponseCookie cookie = ResponseCookie.from(COOKIE_NAME,token)
                .path("/api")
                .maxAge(24*60*60)
                .httpOnly(true)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@Valid @RequestBody LoginPayload loginPayload) throws AuthException {
        User foundUser = authService.findByEmail(loginPayload.getEmail());
        if(foundUser == null){
            throw new AuthException("Email not registered");
        }
        else if(!passwordEncoder.matches(loginPayload.getPassword(),foundUser.getPassword())){
            throw new AuthException("Wrong password");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginPayload.getEmail(),loginPayload.getPassword()));
        String token = jwtUtil.generateTokenFromUser(foundUser);
        ResponseCookie cookie = ResponseCookie.from(COOKIE_NAME,token)
                .path("/api")
                .maxAge(60*60*24)
                .httpOnly(true)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(foundUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        ResponseCookie cleanCookie = ResponseCookie.from(COOKIE_NAME,null)
                .path("/api")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cleanCookie.toString()).body("Successfully logged out");
    }

    @PostMapping("/refresh")
    public ResponseEntity<User> refresh(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.isAuthenticated()){
            String email = authentication.getName();
            User user = authService.findByEmail(email);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }
    }

}
