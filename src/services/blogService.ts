export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: string
  categorySlug: string
  status: 'draft' | 'published'
  author: string
  createdAt: string
  updatedAt: string
  views: number
  isFeatured: boolean
  readTime: string
}

// Helper functions for status conversion
const toBackendStatus = (status: 'draft' | 'published'): 'DRAFT' | 'PUBLISHED' => {
  return status.toUpperCase() as 'DRAFT' | 'PUBLISHED'
}

const toFrontendStatus = (status: 'DRAFT' | 'PUBLISHED'): 'draft' | 'published' => {
  return status.toLowerCase() as 'draft' | 'published'
}

interface CreateBlogPostRequest {
  title: string
  content: string
  excerpt: string
  image: string
  category: string
  categorySlug: string
  status: 'DRAFT' | 'PUBLISHED'  // Backend format
  author: string
  readTime: string
  isFeatured: boolean
}

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api/blog'

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('accessToken')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// HTTP request helper
const apiRequest = async (url: string, options: RequestInit = {}) => {
  console.log(`🌐 API Request: ${options.method || 'GET'} ${API_BASE_URL}${url}`)
  if (options.body) {
    console.log('📤 Request body:', options.body)
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  })

  console.log(`📨 API Response: ${response.status} ${response.statusText}`)

  if (!response.ok) {
    // Try to get error details from response
    let errorMessage = `HTTP error! status: ${response.status}`
    try {
      const errorBody = await response.text()
      console.error('❌ Error response body:', errorBody)
      if (errorBody) {
        errorMessage += ` - ${errorBody}`
      }
    } catch (e) {
      console.error('Could not read error response body')
    }
    throw new Error(errorMessage)
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return null
  }

  const responseData = await response.json()
  console.log('✅ Response data:', responseData)
  return responseData
}

class BlogService {
  private static instance: BlogService
  private listeners: (() => void)[] = []

  static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService()
    }
    return BlogService.instance
  }

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Notify listeners of changes
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }

  // Get all posts (for management)
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const posts = await apiRequest('')
      return posts || []
    } catch (error) {
      console.error('Error fetching all posts:', error)
      return []
    }
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const posts = await apiRequest('/published')
      return posts || []
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return []
    }
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const posts = await apiRequest('/featured')
      return posts || []
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  }

  // Get recent posts
  async getRecentPosts(): Promise<BlogPost[]> {
    try {
      const posts = await apiRequest('/recent')
      return posts || []
    } catch (error) {
      console.error('Error fetching recent posts:', error)
      return []
    }
  }

  // Get post by ID
  async getPostById(id: string): Promise<BlogPost | undefined> {
    try {
      const post = await apiRequest(`/${id}`)
      return post
    } catch (error) {
      console.error('Error fetching post by ID:', error)
      return undefined
    }
  }

  // Add new post
  async addPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<BlogPost> {
    try {
      const requestData: CreateBlogPostRequest = {
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        image: postData.image,
        category: postData.category,
        categorySlug: postData.categorySlug,
        status: toBackendStatus(postData.status), // Convert to backend enum format
        author: postData.author,
        readTime: postData.readTime,
        isFeatured: postData.isFeatured
      }

      const newPost = await apiRequest('', {
        method: 'POST',
        body: JSON.stringify(requestData)
      })

      this.notifyListeners()
      return newPost
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  // Update post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      // Convert status to backend format if present
      const backendUpdates = {
        ...updates,
        ...(updates.status && { status: toBackendStatus(updates.status) })
      }

      const updatedPost = await apiRequest(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(backendUpdates)
      })

      this.notifyListeners()
      return updatedPost
    } catch (error) {
      console.error('Error updating post:', error)
      return null
    }
  }

  // Delete post
  async deletePost(id: string): Promise<boolean> {
    try {
      await apiRequest(`/${id}`, {
        method: 'DELETE'
      })

      this.notifyListeners()
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  }

  // Increment views
  async incrementViews(id: string): Promise<void> {
    try {
      await apiRequest(`/${id}/views`, {
        method: 'PUT'
      })
      // Don't notify listeners for view updates to avoid UI flickering
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }

  // Get categories with counts
  async getCategories(): Promise<Array<{ value: string, label: string, slug: string, count: number }>> {
    try {
      const response = await apiRequest('/categories')
      return response?.categories || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Search posts
  async searchPosts(searchTerm: string, categorySlug?: string): Promise<BlogPost[]> {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('q', searchTerm)
      if (categorySlug) params.append('category', categorySlug)

      const posts = await apiRequest(`/search?${params.toString()}`)
      return posts || []
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  }

  // Publish post
  async publishPost(id: string): Promise<BlogPost | null> {
    try {
      const post = await apiRequest(`/${id}/publish`, {
        method: 'PUT'
      })
      this.notifyListeners()
      return post
    } catch (error) {
      console.error('Error publishing post:', error)
      return null
    }
  }

  // Unpublish post
  async unpublishPost(id: string): Promise<BlogPost | null> {
    try {
      const post = await apiRequest(`/${id}/unpublish`, {
        method: 'PUT'
      })
      this.notifyListeners()
      return post
    } catch (error) {
      console.error('Error unpublishing post:', error)
      return null
    }
  }

  // Set featured status
  async setFeatured(id: string, featured: boolean): Promise<BlogPost | null> {
    try {
      const post = await apiRequest(`/${id}/featured`, {
        method: 'PUT',
        body: JSON.stringify({ featured })
      })
      this.notifyListeners()
      return post
    } catch (error) {
      console.error('Error setting featured status:', error)
      return null
    }
  }

  // Bulk operations
  async bulkDelete(ids: string[]): Promise<boolean> {
    try {
      await apiRequest('/bulk', {
        method: 'DELETE',
        body: JSON.stringify(ids.map(id => parseInt(id)))
      })
      this.notifyListeners()
      return true
    } catch (error) {
      console.error('Error bulk deleting posts:', error)
      return false
    }
  }

  async bulkPublish(ids: string[]): Promise<boolean> {
    try {
      await apiRequest('/bulk/publish', {
        method: 'PUT',
        body: JSON.stringify(ids.map(id => parseInt(id)))
      })
      this.notifyListeners()
      return true
    } catch (error) {
      console.error('Error bulk publishing posts:', error)
      return false
    }
  }

  async bulkUnpublish(ids: string[]): Promise<boolean> {
    try {
      await apiRequest('/bulk/unpublish', {
        method: 'PUT',
        body: JSON.stringify(ids.map(id => parseInt(id)))
      })
      this.notifyListeners()
      return true
    } catch (error) {
      console.error('Error bulk unpublishing posts:', error)
      return false
    }
  }

  async bulkSetFeatured(ids: string[], featured: boolean): Promise<boolean> {
    try {
      await apiRequest('/bulk/featured', {
        method: 'PUT',
        body: JSON.stringify({
          ids: ids.map(id => parseInt(id)),
          featured
        })
      })
      this.notifyListeners()
      return true
    } catch (error) {
      console.error('Error bulk setting featured:', error)
      return false
    }
  }
}

export const blogService = BlogService.getInstance() 