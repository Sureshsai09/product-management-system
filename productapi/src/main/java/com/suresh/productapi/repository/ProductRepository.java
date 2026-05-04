package com.suresh.productapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.suresh.productapi.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search products by name
    List<Product> findByNameContainingIgnoreCase(String name);

    // Search with pagination
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Filter by price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}