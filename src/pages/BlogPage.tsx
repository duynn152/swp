import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Typography, Space, Badge, Input, Select, Pagination } from 'antd'
import { 
  EditOutlined,
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons'
import { blogService, type BlogPost } from '../services/blogService'

const { Title, Paragraph, Text } = Typography
const { Search } = Input
const { Option } = Select

interface BlogPageProps {
  onNavigate: (page: string) => void
}

export const BlogPage = ({ onNavigate }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Array<{ value: string, label: string, count: number }>>([])

  // Load data from service
  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, categories] = await Promise.all([
          blogService.getPublishedPosts(),
          blogService.getCategories()
        ])
        setBlogPosts(posts)
        setCategories(categories)
      } catch (error) {
        console.error('Error loading blog data:', error)
      }
    }

    loadData()

    // Subscribe to changes
    const unsubscribe = blogService.subscribe(() => {
      loadData()
    })

    return unsubscribe
  }, [])

  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])

  // Load filtered and featured posts
  useEffect(() => {
    const loadFilteredPosts = async () => {
      try {
        const posts = await blogService.searchPosts(searchTerm, selectedCategory)
        setFilteredPosts(posts)
      } catch (error) {
        console.error('Error loading filtered posts:', error)
        setFilteredPosts([])
      }
    }

    const loadFeaturedPosts = async () => {
      try {
        const posts = await blogService.getFeaturedPosts()
        setFeaturedPosts(posts)
      } catch (error) {
        console.error('Error loading featured posts:', error)
        setFeaturedPosts([])
      }
    }

    loadFilteredPosts()
    loadFeaturedPosts()
  }, [searchTerm, selectedCategory])

  // Paginate filtered posts
  const pageSize = 6
  const startIndex = (currentPage - 1) * pageSize
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize)

  const handlePostClick = async (post: BlogPost) => {
    // Increment views when post is clicked
    try {
      await blogService.incrementViews(post.id)
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
    // Navigate to detailed blog post view
    onNavigate(`blog-detail-${post.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            <EditOutlined className="mr-3" />
            Blog Sức Khỏe
          </Title>
          <Paragraph className="text-blue-100 text-lg mb-0">
            Chia sẻ kiến thức y tế hữu ích và các bài viết chăm sóc sức khỏe từ đội ngũ chuyên gia
          </Paragraph>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Row gutter={[32, 32]}>
          {/* Main Content */}
          <Col xs={24} lg={16}>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <Title level={3} className="mb-6">
                  <TagOutlined className="mr-2 text-blue-600" />
                  Bài viết nổi bật
                </Title>
                <Row gutter={[24, 24]}>
                  {featuredPosts.map((post) => (
                    <Col xs={24} md={12} key={post.id}>
                      <Card 
                        className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden cursor-pointer"
                        hoverable
                        onClick={() => handlePostClick(post)}
                        cover={
                          <div className="relative overflow-hidden h-56">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                              }}
                            />
                            <div className="absolute top-3 left-3">
                              <Badge 
                                color="red" 
                                text="Nổi bật"
                                className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full"
                              />
                            </div>
                            <div className="absolute top-3 right-3">
                              <Badge 
                                color="blue" 
                                text={post.category}
                                className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full"
                              />
                            </div>
                          </div>
                        }
                      >
                        <div className="p-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className="flex items-center">
                              <CalendarOutlined className="mr-1" />
                              {post.createdAt}
                            </span>
                            <span className="flex items-center">
                              <EyeOutlined className="mr-1" />
                              {post.views}
                            </span>
                          </div>
                          
                          <Title level={4} className="mb-3 line-clamp-2 leading-tight">
                            {post.title}
                          </Title>
                          
                          <Paragraph 
                            className="text-gray-600 text-sm mb-4 line-clamp-3" 
                            ellipsis={{ rows: 3 }}
                          >
                            {post.excerpt}
                          </Paragraph>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Text className="text-xs text-gray-500">
                                <UserOutlined className="mr-1" />
                                {post.author}
                              </Text>
                              <Text className="text-xs text-gray-500">
                                <ClockCircleOutlined className="mr-1" />
                                {post.readTime}
                              </Text>
                            </div>
                            <Button 
                              type="link" 
                              size="small"
                              className="text-blue-600 p-0 h-auto flex items-center"
                              icon={<ArrowRightOutlined />}
                            >
                              Đọc thêm
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* Search and Filter */}
            <div className="mb-8">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12}>
                  <Search
                    placeholder="Tìm kiếm bài viết..."
                    allowClear
                    size="large"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Select
                    size="large"
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    className="w-full"
                  >
                    {categories.map(cat => (
                      <Option key={cat.value} value={cat.value}>
                        {cat.label} ({cat.count})
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>

            {/* All Posts */}
            <div className="mb-8">
              <Title level={3} className="mb-6">
                Tất cả bài viết ({filteredPosts.length})
              </Title>
              <Row gutter={[24, 24]}>
                {paginatedPosts.map((post) => (
                  <Col xs={24} md={12} key={post.id}>
                    <Card 
                      className="h-full hover:shadow-lg transition-shadow duration-300 border-none cursor-pointer"
                      hoverable
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <Badge color="blue" text={post.category} />
                            <span>{post.createdAt}</span>
                          </div>
                          
                          <Title level={5} className="mb-2 line-clamp-2">
                            {post.title}
                          </Title>
                          
                          <Paragraph 
                            className="text-gray-600 text-sm mb-3 line-clamp-2" 
                            ellipsis={{ rows: 2 }}
                          >
                            {post.excerpt}
                          </Paragraph>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              <UserOutlined className="mr-1" />
                              {post.author}
                            </span>
                            <span>
                              <EyeOutlined className="mr-1" />
                              {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Pagination */}
            <div className="text-center">
              <Pagination
                current={currentPage}
                total={filteredPosts.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} của ${total} bài viết`
                }
              />
            </div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            {/* Categories */}
            <Card className="mb-6 border-none shadow-md">
              <Title level={4} className="mb-4">Danh mục</Title>
              <div className="space-y-3">
                {categories.map(cat => (
                  <div 
                    key={cat.value}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === cat.value 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    <span className="font-medium">{cat.label}</span>
                    <Badge count={cat.count} className="bg-gray-500" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Posts */}
            <Card className="mb-6 border-none shadow-md">
              <Title level={4} className="mb-4">Bài viết gần đây</Title>
              <div className="space-y-4">
                {blogPosts.slice(0, 5).map(post => (
                  <div 
                    key={post.id} 
                    className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handlePostClick(post)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <Title level={5} className="mb-1 line-clamp-2 text-sm">
                        {post.title}
                      </Title>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.createdAt}</span>
                        <span>
                          <EyeOutlined className="mr-1" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter */}
            <Card className="border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <Title level={4} className="text-blue-600 mb-3">
                  Đăng ký nhận tin
                </Title>
                <Paragraph className="text-gray-600 mb-4">
                  Nhận những bài viết mới nhất về sức khỏe qua email
                </Paragraph>
                <Input
                  placeholder="Email của bạn"
                  size="large"
                  className="mb-3"
                />
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Đăng ký
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
} 