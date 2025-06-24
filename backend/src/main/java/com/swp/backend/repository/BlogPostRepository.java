package com.swp.backend.repository;

import com.swp.backend.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    // Find by status
    List<BlogPost> findByStatus(BlogPost.PostStatus status);
    
    // Find published posts
    List<BlogPost> findByStatusOrderByCreatedAtDesc(BlogPost.PostStatus status);
    
    // Find featured posts
    List<BlogPost> findByIsFeaturedTrueAndStatus(BlogPost.PostStatus status);
    
    // Find by category
    List<BlogPost> findByCategorySlugAndStatus(String categorySlug, BlogPost.PostStatus status);
    
    // Search posts by title or content
    @Query("SELECT p FROM BlogPost p WHERE " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.excerpt) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "AND p.status = :status " +
           "ORDER BY p.createdAt DESC")
    List<BlogPost> searchPublishedPosts(@Param("searchTerm") String searchTerm, 
                                       @Param("status") BlogPost.PostStatus status);
    
    // Get category counts
    @Query("SELECT p.category as category, p.categorySlug as categorySlug, COUNT(p) as count " +
           "FROM BlogPost p WHERE p.status = :status " +
           "GROUP BY p.category, p.categorySlug " +
           "ORDER BY COUNT(p) DESC")
    List<Object[]> getCategoryCounts(@Param("status") BlogPost.PostStatus status);
    
    // Get posts by author
    List<BlogPost> findByAuthorOrderByCreatedAtDesc(String author);
    
    // Get recent posts
    List<BlogPost> findTop5ByStatusOrderByCreatedAtDesc(BlogPost.PostStatus status);
} 