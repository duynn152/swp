import { useState, useEffect } from 'react'
import { Layout, Typography, Button, Tag, Divider, BackTop } from 'antd'
import { 
  ArrowLeftOutlined,
  CalendarOutlined,
  EyeOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TagOutlined
} from '@ant-design/icons'
import { blogService, type BlogPost } from '../services/blogService'

const { Content } = Layout
const { Title, Text } = Typography

interface BlogDetailPageProps {
  postId: number
  onNavigate: (page: string) => void
}

export const BlogDetailPage = ({ postId, onNavigate }: BlogDetailPageProps) => {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        const postData = await blogService.getPostById(String(postId))
        if (postData) {
          setPost(postData)
          // Load related posts from the same category
          const related = await blogService.searchPosts('', postData.categorySlug)
          setRelatedPosts(related.filter(p => p.id !== postId).slice(0, 3))
        }
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Title level={3} className="text-gray-600 mb-4">Không tìm thấy bài viết</Title>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />}
            onClick={() => onNavigate('blog')}
          >
            Quay lại Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content>
        {/* Header with back button */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />}
              onClick={() => onNavigate('blog')}
              className="text-blue-600 hover:text-blue-700"
            >
              Quay lại Blog
            </Button>
          </div>
        </div>

        {/* Article content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            {/* Article header */}
            <header className="mb-8">
              <div className="mb-4">
                <Tag color="blue" className="mb-2">
                  <TagOutlined className="mr-1" />
                  {post.category}
                </Tag>
                {post.isFeatured && (
                  <Tag color="red" className="mb-2">
                    Nổi bật
                  </Tag>
                )}
              </div>
              
              <Title level={1} className="mb-4 leading-tight">
                {post.title}
              </Title>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <span className="flex items-center">
                  <UserOutlined className="mr-1" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <CalendarOutlined className="mr-1" />
                  {post.createdAt}
                </span>
                <span className="flex items-center">
                  <ClockCircleOutlined className="mr-1" />
                  {post.readTime}
                </span>
                <span className="flex items-center">
                  <EyeOutlined className="mr-1" />
                  {post.views} lượt xem
                </span>
              </div>

              {post.excerpt && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <Text className="text-gray-700 text-lg italic">
                    {post.excerpt}
                  </Text>
                </div>
              )}
            </header>

            {/* Featured image */}
            {post.image && (
              <div className="mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                  }}
                />
              </div>
            )}

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                style={{ lineHeight: '1.8' }}
              >
                {post.content}
              </div>
            </div>

            <Divider />

            {/* Article footer */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Text className="text-gray-600">
                  <TagOutlined className="mr-1" />
                  Danh mục: <strong>{post.category}</strong>
                </Text>
              </div>
              <div className="flex items-center space-x-4">
                <Text className="text-gray-600">
                  <EyeOutlined className="mr-1" />
                  {post.views} lượt xem
                </Text>
              </div>
            </div>
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <Title level={3} className="mb-6">Bài viết liên quan</Title>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onNavigate(`blog-detail-${relatedPost.id}`)}
                  >
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                      }}
                    />
                    <div className="p-4">
                      <Title level={5} className="mb-2 line-clamp-2">
                        {relatedPost.title}
                      </Title>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.createdAt}</span>
                        <span>
                          <EyeOutlined className="mr-1" />
                          {relatedPost.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <BackTop />
      </Content>
    </Layout>
  )
} 