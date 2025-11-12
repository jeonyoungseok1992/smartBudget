package com.jys.smartbudget.controller;

import com.jys.smartbudget.dto.UserDTO;
import com.jys.smartbudget.service.UserService;
import com.jys.smartbudget.config.JwtUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDTO userDTO) {
        UserDTO user = userService.login(userDTO.getUserId(), userDTO.getPassword());
        Map<String, Object> response = new HashMap<>();
        
        if (user != null) {
            String token = JwtUtil.generateToken(user.getUserId());
            response.put("message", "로그인 성공");
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("name", user.getName());
            return ResponseEntity.ok(response); // 200 OK
        } else {
            response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return ResponseEntity.status(401).body(response); // 401 Unauthorized
        }
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody UserDTO userDTO) {
        userService.register(userDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원가입 성공");
        return response;
    }
}
