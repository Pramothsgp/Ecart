package com.jarvistech.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.dto.CommentRequestDTO;
import com.jarvistech.backend.model.Products.Comments;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.Products.ProductComments;
import com.jarvistech.backend.model.Store.StoreAndProduct;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.repository.AuthRepository;
import com.jarvistech.backend.repository.CommentRepository;
import com.jarvistech.backend.repository.ProductCommentRepository;
import com.jarvistech.backend.repository.ProductRepository;
import com.jarvistech.backend.repository.StoreRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private ProductCommentRepository productCommentRepository;

    public Optional<Product> addProduct(Product product, Integer ownerId) {
        System.out.println(ownerId);
        StoreAndProduct store = storeRepository.findStoreById(ownerId).orElseThrow(() -> new IllegalArgumentException("Store not found"));
        product.setOwner(store);
        Product res = productRepository.save(product);
        return Optional.of(res);
    }

    public Optional<List<Product>> getProducts() {
        return Optional.of(productRepository.findAll());
    }

    public Optional<ProductComments> getProductById(Long id) {
        return productCommentRepository.findById(id);
    }

    public Comments addComment(CommentRequestDTO comment) {
        User user = authRepository.findById(comment.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Product product = productRepository.findById(comment.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        Comments comment1 = new Comments();
        comment1.setProduct(product);
        comment1.setUser(user);
        comment1.setRating(comment.getRating());
        comment1.setComment(comment.getComment());
        comment1.setComment(comment.getComment());
        return commentRepository.save(comment1);
    }


    public List<Product> getPages(int pageNumber , int pageSize){
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return productRepository.findAll(page).getContent();
    }


    public List<Product> searchProducts(String key) {
        return productRepository.findByProductNameContainingIgnoreCase(key);
    }
}
