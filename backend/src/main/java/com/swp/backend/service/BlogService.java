package com.swp.backend.service;

import com.swp.backend.entity.BlogPost;
import java.util.List;
import java.util.Optional;
import java.util.Map;

public interface BlogService {
    
    // CRUD operations
    BlogPost createPost(BlogPost blogPost);
    
    List<BlogPost> getAllPosts();
    
    Optional<BlogPost> getPostById(Long id);
    
    BlogPost updatePost(Long id, BlogPost blogPost);
    
    void deletePost(Long id);
    
    // Status operations
    List<BlogPost> getPublishedPosts();
    
    List<BlogPost> getDraftPosts();
    
    BlogPost publishPost(Long id);
    
    BlogPost unpublishPost(Long id);
    
    // Feature operations
    BlogPost setFeatured(Long id, boolean featured);
    
    List<BlogPost> getFeaturedPosts();
    
    // Category operations
    List<BlogPost> getPostsByCategory(String categorySlug);
    
    Map<String, Object> getCategoryCounts();
    
    // Search operations
    List<BlogPost> searchPosts(String searchTerm);
    
    List<BlogPost> searchPostsByCategory(String searchTerm, String categorySlug);
    
    // View operations
    BlogPost incrementViews(Long id);
    
    // Author operations
    List<BlogPost> getPostsByAuthor(String author);
    
    // Recent posts
    List<BlogPost> getRecentPosts();
    
    // Bulk operations
    void bulkDelete(List<Long> ids);
    
    void bulkPublish(List<Long> ids);
    
    void bulkUnpublish(List<Long> ids);
    
    void bulkSetFeatured(List<Long> ids, boolean featured);
} 