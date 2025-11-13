package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.User;
import com.library.repository.UserRepository;
import com.library.security.UserDetailsImpl;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('LIBRARIAN')")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('LIBRARIAN')")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('LIBRARIAN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(u -> {
                    userRepository.delete(u);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public User me(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return userRepository.findById(userDetails.getId()).orElseThrow();
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateMe(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                         @RequestBody User update) {
        return userRepository.findById(userDetails.getId())
                .map(u -> {
                    u.setName(update.getName());
                    u.setEmail(update.getEmail());
                    return ResponseEntity.ok(userRepository.save(u));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
