import { useState } from 'react'
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

const { Title, Paragraph, Text } = Typography
const { Search } = Input
const { Option } = Select

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: 'all', label: 'Tất cả', count: 24 },
    { value: 'tim-mach', label: 'Tim mạch', count: 8 },
    { value: 'noi-tiet', label: 'Nội tiết', count: 6 },
    { value: 'phong-ngua', label: 'Phòng ngừa', count: 5 },
    { value: 'dinh-duong', label: 'Dinh dưỡng', count: 5 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: "10 Thói quen tốt cho sức khỏe tim mạch",
      excerpt: "Tìm hiểu những thói quen đơn giản hàng ngày giúp bảo vệ tim mạch khỏe mạnh và phòng ngừa các bệnh lý nguy hiểm.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Tim mạch",
      categorySlug: "tim-mach",
      date: "15/12/2024",
      readTime: "5 phút đọc",
      views: 1250,
      author: "BS. Nguyễn Văn An",
      isFeatured: true
    },
    {
      id: 2,
      title: "Chế độ dinh dưỡng cho người tiểu đường",
      excerpt: "Hướng dẫn chi tiết về chế độ ăn uống khoa học, giúp kiểm soát đường huyết và duy trì sức khỏe ổn định.",
      image: "https://images.unsplash.com/photo-1542736667-069246bdbc6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Nội tiết",
      categorySlug: "noi-tiet",
      date: "12/12/2024",
      readTime: "7 phút đọc",
      views: 980,
      author: "BS. Trần Thị Bình",
      isFeatured: false
    },
    {
      id: 3,
      title: "Tầm quan trọng của việc khám sức khỏe định kỳ",
      excerpt: "Khám sức khỏe định kỳ giúp phát hiện sớm các bệnh lý, từ đó có phương pháp điều trị kịp thời và hiệu quả.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Phòng ngừa",
      categorySlug: "phong-ngua",
      date: "10/12/2024",
      readTime: "4 phút đọc",
      views: 1500,
      author: "BS. Lê Hoàng Cường",
      isFeatured: true
    },
    {
      id: 4,
      title: "Cách phòng ngừa cảm cúm mùa đông",
      excerpt: "Những biện pháp đơn giản và hiệu quả để bảo vệ bản thân và gia đình khỏi các bệnh cảm cúm phổ biến.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Phòng ngừa",
      categorySlug: "phong-ngua",
      date: "08/12/2024",
      readTime: "6 phút đọc",
      views: 875,
      author: "BS. Phạm Minh Đức",
      isFeatured: false
    },
    {
      id: 5,
      title: "Dinh dưỡng hợp lý cho người cao tuổi",
      excerpt: "Những nguyên tắc dinh dưỡng cần thiết để người cao tuổi duy trì sức khỏe và chất lượng cuộc sống tốt nhất.",
      image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Dinh dưỡng",
      categorySlug: "dinh-duong",
      date: "05/12/2024",
      readTime: "8 phút đọc",
      views: 1120,
      author: "BS. Võ Thị Hoa",
      isFeatured: false
    },
    {
      id: 6,
      title: "Stress và tác động đến sức khỏe tim mạch",
      excerpt: "Tìm hiểu về mối liên hệ giữa stress và các bệnh lý tim mạch, cùng các phương pháp quản lý stress hiệu quả.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "Tim mạch",
      categorySlug: "tim-mach",
      date: "03/12/2024",
      readTime: "6 phút đọc",
      views: 890,
      author: "BS. Nguyễn Văn An",
      isFeatured: false
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.categorySlug === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.isFeatured)

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
                        className="h-full hover:shadow-xl transition-all duration-300 border-none overflow-hidden"
                        hoverable
                        cover={
                          <div className="relative overflow-hidden h-56">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                              {post.date}
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
                {filteredPosts.map((post) => (
                  <Col xs={24} md={12} key={post.id}>
                    <Card 
                      className="h-full hover:shadow-lg transition-shadow duration-300 border-none"
                      hoverable
                    >
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <Badge color="blue" text={post.category} />
                            <span>{post.date}</span>
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
                pageSize={6}
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
                  <div key={post.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Title level={5} className="mb-1 line-clamp-2 text-sm">
                        {post.title}
                      </Title>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.date}</span>
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