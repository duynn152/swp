package com.swp.backend.service.impl;

import com.swp.backend.entity.BlogPost;
import com.swp.backend.repository.BlogPostRepository;
import com.swp.backend.service.BlogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {
    
    private final BlogPostRepository blogPostRepository;
    
    public BlogServiceImpl(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }
    
    @Override
    public BlogPost createPost(BlogPost blogPost) {
        // Set default values if not provided
        if (blogPost.getStatus() == null) {
            blogPost.setStatus(BlogPost.PostStatus.DRAFT);
        }
        if (blogPost.getViews() == null) {
            blogPost.setViews(0);
        }
        if (blogPost.getIsFeatured() == null) {
            blogPost.setIsFeatured(false);
        }
        
        return blogPostRepository.save(blogPost);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<BlogPost> getPostById(Long id) {
        return blogPostRepository.findById(id);
    }
    
    @Override
    public BlogPost updatePost(Long id, BlogPost blogPost) {
        BlogPost existingPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        // Update fields
        existingPost.setTitle(blogPost.getTitle());
        existingPost.setContent(blogPost.getContent());
        existingPost.setExcerpt(blogPost.getExcerpt());
        existingPost.setImage(blogPost.getImage());
        existingPost.setCategory(blogPost.getCategory());
        existingPost.setCategorySlug(blogPost.getCategorySlug());
        existingPost.setReadTime(blogPost.getReadTime());
        
        if (blogPost.getStatus() != null) {
            existingPost.setStatus(blogPost.getStatus());
        }
        if (blogPost.getIsFeatured() != null) {
            existingPost.setIsFeatured(blogPost.getIsFeatured());
        }
        if (blogPost.getAuthor() != null) {
            existingPost.setAuthor(blogPost.getAuthor());
        }
        
        existingPost.setUpdatedAt(LocalDateTime.now());
        
        return blogPostRepository.save(existingPost);
    }
    
    @Override
    public void deletePost(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new RuntimeException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getPublishedPosts() {
        return blogPostRepository.findByStatusOrderByCreatedAtDesc(BlogPost.PostStatus.PUBLISHED);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getDraftPosts() {
        return blogPostRepository.findByStatusOrderByCreatedAtDesc(BlogPost.PostStatus.DRAFT);
    }
    
    @Override
    public BlogPost publishPost(Long id) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        post.setStatus(BlogPost.PostStatus.PUBLISHED);
        post.setUpdatedAt(LocalDateTime.now());
        
        return blogPostRepository.save(post);
    }
    
    @Override
    public BlogPost unpublishPost(Long id) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        post.setStatus(BlogPost.PostStatus.DRAFT);
        post.setUpdatedAt(LocalDateTime.now());
        
        return blogPostRepository.save(post);
    }
    
    @Override
    public BlogPost setFeatured(Long id, boolean featured) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        post.setIsFeatured(featured);
        post.setUpdatedAt(LocalDateTime.now());
        
        return blogPostRepository.save(post);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getFeaturedPosts() {
        return blogPostRepository.findByIsFeaturedTrueAndStatus(BlogPost.PostStatus.PUBLISHED);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getPostsByCategory(String categorySlug) {
        return blogPostRepository.findByCategorySlugAndStatus(categorySlug, BlogPost.PostStatus.PUBLISHED);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getCategoryCounts() {
        List<Object[]> results = blogPostRepository.getCategoryCounts(BlogPost.PostStatus.PUBLISHED);
        
        List<Map<String, Object>> categories = new ArrayList<>();
        int totalCount = 0;
        
        for (Object[] result : results) {
            Map<String, Object> category = new HashMap<>();
            category.put("label", result[0]);
            category.put("slug", result[1]);
            category.put("count", ((Number) result[2]).intValue());
            categories.add(category);
            totalCount += ((Number) result[2]).intValue();
        }
        
        // Add "all" category
        Map<String, Object> allCategory = new HashMap<>();
        allCategory.put("value", "all");
        allCategory.put("label", "Tất cả");
        allCategory.put("slug", "all");
        allCategory.put("count", totalCount);
        
        categories.add(0, allCategory); // Add at beginning
        
        Map<String, Object> response = new HashMap<>();
        response.put("categories", categories);
        response.put("total", totalCount);
        
        return response;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> searchPosts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getPublishedPosts();
        }
        return blogPostRepository.searchPublishedPosts(searchTerm.trim(), BlogPost.PostStatus.PUBLISHED);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> searchPostsByCategory(String searchTerm, String categorySlug) {
        List<BlogPost> posts;
        
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            if ("all".equals(categorySlug)) {
                posts = getPublishedPosts();
            } else {
                posts = getPostsByCategory(categorySlug);
            }
        } else {
            posts = searchPosts(searchTerm);
            if (!"all".equals(categorySlug)) {
                posts = posts.stream()
                        .filter(post -> categorySlug.equals(post.getCategorySlug()))
                        .collect(Collectors.toList());
            }
        }
        
        return posts;
    }
    
    @Override
    public BlogPost incrementViews(Long id) {
        BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found with id: " + id));
        
        post.setViews(post.getViews() + 1);
        
        return blogPostRepository.save(post);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getPostsByAuthor(String author) {
        return blogPostRepository.findByAuthorOrderByCreatedAtDesc(author);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<BlogPost> getRecentPosts() {
        return blogPostRepository.findTop5ByStatusOrderByCreatedAtDesc(BlogPost.PostStatus.PUBLISHED);
    }
    
    @Override
    public void bulkDelete(List<Long> ids) {
        for (Long id : ids) {
            if (blogPostRepository.existsById(id)) {
                blogPostRepository.deleteById(id);
            }
        }
    }
    
    @Override
    public void bulkPublish(List<Long> ids) {
        for (Long id : ids) {
            try {
                publishPost(id);
            } catch (RuntimeException e) {
                // Log error but continue with other posts
                System.err.println("Failed to publish post with id: " + id + ", error: " + e.getMessage());
            }
        }
    }
    
    @Override
    public void bulkUnpublish(List<Long> ids) {
        for (Long id : ids) {
            try {
                unpublishPost(id);
            } catch (RuntimeException e) {
                // Log error but continue with other posts
                System.err.println("Failed to unpublish post with id: " + id + ", error: " + e.getMessage());
            }
        }
    }
    
    @Override
    public void bulkSetFeatured(List<Long> ids, boolean featured) {
        for (Long id : ids) {
            try {
                setFeatured(id, featured);
            } catch (RuntimeException e) {
                // Log error but continue with other posts
                System.err.println("Failed to set featured for post with id: " + id + ", error: " + e.getMessage());
            }
        }
    }
} 