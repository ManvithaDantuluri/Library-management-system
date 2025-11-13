// src/main/java/com/library/controller/ReviewController.java
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.entity.Review;
import com.library.repository.BookRepository;
import com.library.repository.ReviewRepository;
import com.library.repository.UserRepository;
import com.library.security.UserDetailsImpl;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5174")
public class ReviewController {

	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping
	@PreAuthorize("hasAnyRole('USER','LIBRARIAN')")
	public ResponseEntity<Review> create(@AuthenticationPrincipal UserDetailsImpl userDetails,
			@RequestBody Review review) {
		review.setUser(userRepository.findById(userDetails.getId()).get());
		review.setBook(bookRepository.findById(review.getBook().getId())
				.orElseThrow(() -> new RuntimeException("Book not found")));
		return ResponseEntity.ok(reviewRepository.save(review));
	}

	@GetMapping("/{bookId}")
	public List<Review> getByBook(@PathVariable Long bookId) {
		return reviewRepository.findByBookId(bookId);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('USER','LIBRARIAN')")
	public ResponseEntity<Review> update(@PathVariable Long id, @RequestBody Review update,
			@AuthenticationPrincipal UserDetailsImpl userDetails) {
		return reviewRepository.findById(id).filter(r -> r.getUser().getId().equals(userDetails.getId()))
				.map(review -> {
					review.setRating(update.getRating());
					review.setComment(update.getComment());
					return ResponseEntity.ok(reviewRepository.save(review));
				}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('USER','LIBRARIAN')")
	public ResponseEntity<?> delete(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
		return reviewRepository.findById(id).filter(r -> r.getUser().getId().equals(userDetails.getId()))
				.map(review -> {
					reviewRepository.delete(review);
					return ResponseEntity.ok().build();
				}).orElse(ResponseEntity.notFound().build());
	}
}
