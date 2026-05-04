package com.suresh.productapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.suresh.productapi.dto.ProductDTO;
import com.suresh.productapi.dto.ProductResponseDTO;
import com.suresh.productapi.service.ProductService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")  // ✅ FIXED
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponseDTO createProduct(@Valid @RequestBody ProductDTO dto) {
        return productService.createProduct(dto);
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping
    public Page<ProductResponseDTO> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return productService.getAllProducts(page, size, sortBy, direction);
    }

    @GetMapping("/filter")
    public List<ProductResponseDTO> filterProductsByPrice(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {

        return productService.filterProductsByPrice(minPrice, maxPrice);
    }

    @GetMapping("/search")
    public List<ProductResponseDTO> searchProducts(@RequestParam String name) {
        return productService.searchProducts(name);
    }

    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO dto) {

        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}