package com.suresh.productapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.suresh.productapi.dto.ProductDTO;
import com.suresh.productapi.dto.ProductResponseDTO;
import com.suresh.productapi.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

private final ProductService productService;

public ProductController(ProductService productService) {
    this.productService = productService;
}

// CREATE PRODUCT (ADMIN)
@PreAuthorize("hasAuthority('ADMIN')")
@PostMapping
public ProductResponseDTO createProduct(@Valid @RequestBody ProductDTO dto) {
    return productService.createProduct(dto);
}

// GET PRODUCT BY ID
@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
@GetMapping("/{id}")
public ProductResponseDTO getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
}

// GET ALL PRODUCTS WITH PAGINATION + SORTING
@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
@GetMapping
public Page<ProductResponseDTO> getAllProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction) {

    return productService.getAllProducts(page, size, sortBy, direction);
}

// FILTER PRODUCTS BY PRICE
@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
@GetMapping("/filter")
public List<ProductResponseDTO> filterProductsByPrice(
        @RequestParam double minPrice,
        @RequestParam double maxPrice) {

    return productService.filterProductsByPrice(minPrice, maxPrice);
}

// SEARCH PRODUCTS BY NAME
@PreAuthorize("hasAnyAuthority('ADMIN','USER')")
@GetMapping("/search")
public List<ProductResponseDTO> searchProducts(@RequestParam String name) {
    return productService.searchProducts(name);
}

// UPDATE PRODUCT
@PreAuthorize("hasAuthority('ADMIN')")
@PutMapping("/{id}")
public ProductResponseDTO updateProduct(
        @PathVariable Long id,
        @Valid @RequestBody ProductDTO dto) {

    return productService.updateProduct(id, dto);
}

// DELETE PRODUCT
@PreAuthorize("hasAuthority('ADMIN')")
@DeleteMapping("/{id}")
public String deleteProduct(@PathVariable Long id) {

    productService.deleteProduct(id);
    return "Product deleted successfully";
}

}
