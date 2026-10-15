package com.example.library_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_api.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}