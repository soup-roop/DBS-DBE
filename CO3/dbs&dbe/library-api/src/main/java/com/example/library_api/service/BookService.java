package com.example.library_api.service;

import com.example.library_api.model.Book;
import com.example.library_api.repository.BookRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book book) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    existingBook.setTitle(book.getTitle());
                    existingBook.setIsbn(book.getIsbn());
                    existingBook.setPrice(book.getPrice());
                    existingBook.setPublishedDate(book.getPublishedDate());

                    return bookRepository.save(existingBook);
                })
                .orElse(null);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}