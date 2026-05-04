package com.suresh.productapi.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.suresh.productapi.dto.ProductDTO;
import com.suresh.productapi.dto.ProductResponseDTO;

public interface ProductService {

    ProductResponseDTO createProduct(ProductDTO dto);

    ProductResponseDTO getProductById(Long id);

    Page<ProductResponseDTO> getAllProducts(int page, int size, String sortBy, String direction);

    List<ProductResponseDTO> filterProductsByPrice(double minPrice, double maxPrice);

    List<ProductResponseDTO> searchProducts(String name);

    ProductResponseDTO updateProduct(Long id, ProductDTO dto);

    void deleteProduct(Long id);
}