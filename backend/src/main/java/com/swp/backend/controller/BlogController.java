package com.swp.backend.controller;

import com.swp.backend.entity.BlogPost;
import com.swp.backend.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blog")
@Tag(name = "Blog Management", description = "APIs for managing blog posts")
@CrossOrigin(origins = "*")
public class BlogController {
    
    private final BlogService blogService;
    
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }
    
    @GetMapping
    @Operation(summary = "Get all blog posts", description = "Retrieves all blog posts for management")
    @ApiResponse(responseCode = "200", description = "Posts retrieved successfully")
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = blogService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/published")
    @Operation(summary = "Get published posts", description = "Retrieves only published blog posts")
    @ApiResponse(responseCode = "200", description = "Published posts retrieved successfully")
    public ResponseEntity<List<BlogPost>> getPublishedPosts() {
        List<BlogPost> posts = blogService.getPublishedPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/featured")
    @Operation(summary = "Get featured posts", description = "Retrieves featured blog posts")
    @ApiResponse(responseCode = "200", description = "Featured posts retrieved successfully")
    public ResponseEntity<List<BlogPost>> getFeaturedPosts() {
        List<BlogPost> posts = blogService.getFeaturedPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/recent")
    @Operation(summary = "Get recent posts", description = "Retrieves recent blog posts")
    @ApiResponse(responseCode = "200", description = "Recent posts retrieved successfully")
    public ResponseEntity<List<BlogPost>> getRecentPosts() {
        List<BlogPost> posts = blogService.getRecentPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/categories")
    @Operation(summary = "Get category counts", description = "Retrieves blog categories with post counts")
    @ApiResponse(responseCode = "200", description = "Categories retrieved successfully")
    public ResponseEntity<Map<String, Object>> getCategories() {
        Map<String, Object> categories = blogService.getCategoryCounts();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search posts", description = "Search blog posts by term and category")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Search completed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid search parameters")
    })
    public ResponseEntity<List<BlogPost>> searchPosts(
            @Parameter(description = "Search term") @RequestParam(required = false) String q,
            @Parameter(description = "Category slug") @RequestParam(required = false) String category) {
        
        List<BlogPost> posts;
        if (category != null && !category.isEmpty()) {
            posts = blogService.searchPostsByCategory(q, category);
        } else {
            posts = blogService.searchPosts(q);
        }
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get post by ID", description = "Retrieves a blog post by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Post found"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<BlogPost> getPostById(@Parameter(description = "Post ID") @PathVariable Long id) {
        return blogService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create blog post", description = "Creates a new blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Post created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid post data")
    })
    public ResponseEntity<BlogPost> createPost(@RequestBody BlogPost blogPost) {
        try {
            BlogPost createdPost = blogService.createPost(blogPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update blog post", description = "Updates an existing blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Post updated successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found"),
        @ApiResponse(responseCode = "400", description = "Invalid post data")
    })
    public ResponseEntity<BlogPost> updatePost(
            @Parameter(description = "Post ID") @PathVariable Long id,
            @RequestBody BlogPost blogPost) {
        try {
            BlogPost updatedPost = blogService.updatePost(id, blogPost);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete blog post", description = "Deletes a blog post by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Post deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<Void> deletePost(@Parameter(description = "Post ID") @PathVariable Long id) {
        try {
            blogService.deletePost(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/publish")
    @Operation(summary = "Publish post", description = "Publishes a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Post published successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<BlogPost> publishPost(@Parameter(description = "Post ID") @PathVariable Long id) {
        try {
            BlogPost publishedPost = blogService.publishPost(id);
            return ResponseEntity.ok(publishedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/unpublish")
    @Operation(summary = "Unpublish post", description = "Unpublishes a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Post unpublished successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<BlogPost> unpublishPost(@Parameter(description = "Post ID") @PathVariable Long id) {
        try {
            BlogPost unpublishedPost = blogService.unpublishPost(id);
            return ResponseEntity.ok(unpublishedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/featured")
    @Operation(summary = "Set featured status", description = "Sets the featured status of a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Featured status updated successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<BlogPost> setFeatured(
            @Parameter(description = "Post ID") @PathVariable Long id,
            @RequestBody Map<String, Boolean> request) {
        try {
            boolean featured = request.getOrDefault("featured", false);
            BlogPost updatedPost = blogService.setFeatured(id, featured);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/views")
    @Operation(summary = "Increment views", description = "Increments the view count of a blog post")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Views incremented successfully"),
        @ApiResponse(responseCode = "404", description = "Post not found")
    })
    public ResponseEntity<BlogPost> incrementViews(@Parameter(description = "Post ID") @PathVariable Long id) {
        try {
            BlogPost updatedPost = blogService.incrementViews(id);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Bulk operations
    @DeleteMapping("/bulk")
    @Operation(summary = "Bulk delete posts", description = "Deletes multiple blog posts")
    @ApiResponse(responseCode = "204", description = "Posts deleted successfully")
    public ResponseEntity<Void> bulkDelete(@RequestBody List<Integer> intIds) {
        // Convert Integer IDs to Long IDs
        List<Long> ids = intIds.stream()
                .map(Integer::longValue)
                .collect(java.util.stream.Collectors.toList());
        
        blogService.bulkDelete(ids);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/bulk/publish")
    @Operation(summary = "Bulk publish posts", description = "Publishes multiple blog posts")
    @ApiResponse(responseCode = "200", description = "Posts published successfully")
    public ResponseEntity<String> bulkPublish(@RequestBody List<Integer> intIds) {
        // Convert Integer IDs to Long IDs
        List<Long> ids = intIds.stream()
                .map(Integer::longValue)
                .collect(java.util.stream.Collectors.toList());
        
        blogService.bulkPublish(ids);
        return ResponseEntity.ok("Posts published successfully");
    }
    
    @PutMapping("/bulk/unpublish")
    @Operation(summary = "Bulk unpublish posts", description = "Unpublishes multiple blog posts")
    @ApiResponse(responseCode = "200", description = "Posts unpublished successfully")
    public ResponseEntity<String> bulkUnpublish(@RequestBody List<Integer> intIds) {
        // Convert Integer IDs to Long IDs
        List<Long> ids = intIds.stream()
                .map(Integer::longValue)
                .collect(java.util.stream.Collectors.toList());
        
        blogService.bulkUnpublish(ids);
        return ResponseEntity.ok("Posts unpublished successfully");
    }
    
    @PutMapping("/bulk/featured")
    @Operation(summary = "Bulk set featured", description = "Sets featured status for multiple blog posts")
    @ApiResponse(responseCode = "200", description = "Featured status updated successfully")
    public ResponseEntity<String> bulkSetFeatured(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<Integer> intIds = (List<Integer>) request.get("ids");
        Boolean featured = (Boolean) request.getOrDefault("featured", false);
        
        // Convert Integer IDs to Long IDs
        List<Long> ids = intIds.stream()
                .map(Integer::longValue)
                .collect(java.util.stream.Collectors.toList());
        
        blogService.bulkSetFeatured(ids, featured);
        return ResponseEntity.ok("Featured status updated successfully");
    }
} 