package com.jarvistech.backend.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jarvistech.backend.dto.CommentRequestDTO;
import com.jarvistech.backend.dto.Message;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.Products.ProductComments;
import com.jarvistech.backend.service.ProductService;


@CrossOrigin
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add-product")
    public ResponseEntity<String> addProduct(
            @RequestParam String productName,
            @RequestParam String productPrice,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam MultipartFile image,
            @RequestParam Integer stock,
            @RequestParam Integer ownerId
            ) {
        Product product = new Product();
        product.setProductName(productName);
        product.setPrice(new BigDecimal(productPrice));
        product.setCategory(category);
        product.setDescription(description);
        product.setImageName(image.getOriginalFilename());
        try {
            product.setImage(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        product.setAddedTime(new Timestamp(System.currentTimeMillis()));
        product.setStock(stock);

        try {
            return productService.addProduct(product, ownerId)
                    .map(addedProduct -> ResponseEntity.ok().body("Product Added Successfully"))
                    .orElse(ResponseEntity.status(401).build());
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }


    @GetMapping("/get-products")
    public ResponseEntity<List<Product>> getProducts() {
        return productService.getProducts()
                .map(products -> ResponseEntity.ok(products))
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/get-product/{id}")
    public ResponseEntity<ProductComments> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(product -> ResponseEntity.ok(product))
                .orElse(ResponseEntity.status(401).build());
    }

    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(@RequestBody CommentRequestDTO comments) {
        try {
            return ResponseEntity.ok(productService.addComment(comments));
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(401).body(new Message(e.getMessage()));
        }catch (Exception e) {
            return ResponseEntity.status(401).body(new Message( "Something went wrong"));
        }
    }
}
