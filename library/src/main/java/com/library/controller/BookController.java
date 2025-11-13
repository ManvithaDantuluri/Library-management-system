// src/main/java/com/library/controller/BookController.java
package com.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.library.entity.Category;
import com.library.repository.BookRepository;
import com.library.repository.CategoryRepository;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5174")
public class BookController {

	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private CategoryRepository categoryRepository;

	@PostMapping
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<Book> create(@RequestBody Book book) {
		Category category = categoryRepository.findById(book.getCategory().getId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		book.setCategory(category);
		return ResponseEntity.ok(bookRepository.save(book));
	}

	@GetMapping
	public List<Book> getAll() {
		return bookRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Book> getById(@PathVariable Long id) {
		return bookRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody Book update) {
		return bookRepository.findById(id).map(book -> {
			book.setTitle(update.getTitle());
			book.setAuthor(update.getAuthor());
			book.setIsbn(update.getIsbn());
			if (update.getCategory() != null && update.getCategory().getId() != null) {
				Category cat = categoryRepository.findById(update.getCategory().getId())
						.orElseThrow(() -> new RuntimeException("Category not found"));
				book.setCategory(cat);
			}
			book.setAvailable(update.isAvailable());
			return ResponseEntity.ok(bookRepository.save(book));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('LIBRARIAN')")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		return bookRepository.findById(id).map(book -> {
			bookRepository.delete(book);
			return ResponseEntity.ok().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
