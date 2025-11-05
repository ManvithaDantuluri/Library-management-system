// src/main/java/com/library/controller/BorrowController.java
package com.library.controller;

import java.time.LocalDate;
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
import com.library.entity.BorrowRecord;
import com.library.entity.User;
import com.library.repository.BookRepository;
import com.library.repository.BorrowRecordRepository;
import com.library.repository.UserRepository;
import com.library.security.UserDetailsImpl;

@RestController
@RequestMapping("/api/borrow")
@CrossOrigin(origins = "http://localhost:5174")
public class BorrowController {

	@Autowired
	private BorrowRecordRepository borrowRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/{bookId}")
	public ResponseEntity<BorrowRecord> borrow(@AuthenticationPrincipal UserDetailsImpl userDetails,
			@PathVariable Long bookId) {
		Book book = bookRepository.findById(bookId).filter(Book::isAvailable)
				.orElseThrow(() -> new RuntimeException("Book not available"));

		User user = userRepository.findById(userDetails.getId()).get();

		BorrowRecord record = new BorrowRecord();
		record.setUser(user);
		record.setBook(book);
		record.setStatus(BorrowRecord.Status.BORROWED);

		book.setAvailable(false);
		bookRepository.save(book);

		return ResponseEntity.ok(borrowRepository.save(record));
	}

	@PutMapping("/return/{recordId}")
	public ResponseEntity<BorrowRecord> returnBook(@PathVariable Long recordId) {
		return borrowRepository.findById(recordId).map(record -> {
			if (record.getStatus() == BorrowRecord.Status.RETURNED) {
				throw new RuntimeException("Already returned");
			}
			record.setStatus(BorrowRecord.Status.RETURNED);
			record.setReturnDate(LocalDate.now());
			record.getBook().setAvailable(true);
			bookRepository.save(record.getBook());
			return ResponseEntity.ok(borrowRepository.save(record));
		}).orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("/history")
	public List<BorrowRecord> getMyHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
		return borrowRepository.findByUserId(userDetails.getId());
	}

	@GetMapping("/all")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public List<BorrowRecord> getAll() {
		return borrowRepository.findAll();
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<BorrowRecord> update(@PathVariable Long id, @RequestBody BorrowRecord update) {
		return borrowRepository.findById(id).map(record -> {
			record.setStatus(update.getStatus());
			if (update.getStatus() == BorrowRecord.Status.RETURNED) {
				record.getBook().setAvailable(true);
				bookRepository.save(record.getBook());
			}
			return ResponseEntity.ok(borrowRepository.save(record));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		return borrowRepository.findById(id).map(record -> {
			borrowRepository.delete(record);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}