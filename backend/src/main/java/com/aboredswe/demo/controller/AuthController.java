package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.LoginPayload;
import com.aboredswe.demo.model.RegisterPayload;
import com.aboredswe.demo.model.Role;
import com.aboredswe.demo.model.User;
import com.aboredswe.demo.service.UserService;
import com.aboredswe.demo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    private String COOKIE_NAME = "AuthCookie";

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody RegisterPayload registerPayload){
        User user = User.builder()
                .email(registerPayload.getEmail())
                .name(registerPayload.getName())
                .password(passwordEncoder.encode(registerPayload.getPassword()))
                .role(Role.MEMBER)
                .build();
        ResponseEntity<Boolean> response = userService.addUser(user);
        if(response.getStatusCode().equals(HttpStatus.CREATED)){
            String token = jwtUtil.generateTokenFromUser(user);
            ResponseCookie cookie = ResponseCookie.from(COOKIE_NAME,token)
                    .path("/api")
                    .maxAge(24*60*60)
                    .httpOnly(true)
                    .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(response.getBody());
        }
        else{
            return response;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginPayload loginPayload){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginPayload.getEmail(),loginPayload.getPassword()));
        ResponseEntity<User> response = userService.findByEmail(loginPayload.getEmail());
        if(response.getStatusCode().equals(HttpStatus.NOT_FOUND)){
            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
        }
        else{
            String token = jwtUtil.generateTokenFromUser(response.getBody());
            ResponseCookie cookie = ResponseCookie.from(COOKIE_NAME,token)
                    .path("/api")
                    .maxAge(60*60*24)
                    .httpOnly(true)
                    .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(true);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout(){
        ResponseCookie cleanCookie = ResponseCookie.from(COOKIE_NAME,null)
                .path("/api")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cleanCookie.toString()).body(true);
    }

}
