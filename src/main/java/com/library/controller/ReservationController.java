// src/main/java/com/library/controller/ReservationController.java
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

import com.library.entity.Book;
import com.library.entity.Reservation;
import com.library.repository.BookRepository;
import com.library.repository.ReservationRepository;
import com.library.repository.UserRepository;
import com.library.security.UserDetailsImpl;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5174")
public class ReservationController {

	@Autowired
	private ReservationRepository reservationRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping
	public ResponseEntity<Reservation> create(@AuthenticationPrincipal UserDetailsImpl userDetails,
			@RequestBody Reservation reservation) {
		Book book = bookRepository.findById(reservation.getBook().getId())
				.orElseThrow(() -> new RuntimeException("Book not found"));

		if (book.isAvailable()) {
			throw new RuntimeException("Book is available, no need to reserve");
		}

		reservation.setUser(userRepository.findById(userDetails.getId()).get());
		reservation.setBook(book);
		reservation.setStatus(Reservation.Status.PENDING);

		return ResponseEntity.ok(reservationRepository.save(reservation));
	}

	@GetMapping
	@PreAuthorize("hasRole('LIBRARIAN')")
	public List<Reservation> getAll() {
		return reservationRepository.findAll();
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<Reservation> update(@PathVariable Long id, @RequestBody Reservation update) {
		return reservationRepository.findById(id).map(res -> {
			res.setStatus(update.getStatus());
			return ResponseEntity.ok(reservationRepository.save(res));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> cancel(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
		return reservationRepository.findById(id).filter(r -> r.getUser().getId().equals(userDetails.getId()))
				.map(res -> {
					reservationRepository.delete(res);
					return ResponseEntity.ok().build();
				}).orElse(ResponseEntity.notFound().build());
	}
}