package com.suresh.productapi.security;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.suresh.productapi.dto.ProductDTO;
import com.suresh.productapi.dto.ProductResponseDTO;
import com.suresh.productapi.entity.Product;
import com.suresh.productapi.exception.ResourceNotFoundException;
import com.suresh.productapi.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Create Product
    public ProductResponseDTO createProduct(ProductDTO dto) {

        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());

        Product saved = productRepository.save(product);

        return mapToResponseDTO(saved);
    }

    // Get All Products (Pagination + Sorting)
    public Page<ProductResponseDTO> getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> products = productRepository.findAll(pageable);

        return products.map(this::mapToResponseDTO);
    }

    // Filter Products By Price
    public List<ProductResponseDTO> filterProductsByPrice(double minPrice, double maxPrice) {

        List<Product> products = productRepository.findByPriceBetween(minPrice, maxPrice);

        return products.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    // Get Product By ID
    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product with id " + id + " not found"));

        return mapToResponseDTO(product);
    }

    // Update Product
    public ProductResponseDTO updateProduct(Long id, ProductDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product with id " + id + " not found"));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());

        Product updated = productRepository.save(product);

        return mapToResponseDTO(updated);
    }

    // Delete Product
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Product with id " + id + " not found");
        }

        productRepository.deleteById(id);
    }

    // Search Products By Name
public List<ProductResponseDTO> searchProducts(String name) {

    List<Product> products =
            productRepository.findByNameContainingIgnoreCase(name);

    return products.stream()
            .map(this::mapToResponseDTO)
            .toList();
}


    // Mapper
    private ProductResponseDTO mapToResponseDTO(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());

        return dto;
    }
}