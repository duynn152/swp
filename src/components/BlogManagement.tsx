import { useState, useEffect } from 'react'
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message,
  Popconfirm,
  Row,
  Col,
  Statistic,
  Upload,
  Image,
  DatePicker,
  Divider
} from 'antd'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FileTextOutlined,
  UserOutlined,
  UploadOutlined,
  InboxOutlined,
  SearchOutlined,
  ClearOutlined,
  FilterOutlined
} from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import dayjs from 'dayjs'
import { blogService, type BlogPost } from '../services/blogService'

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload
const { RangePicker } = DatePicker

// Search and Filter interfaces
interface SearchFilters {
  searchTerm: string
  category: string
  status: string
  isFeatured: string
  dateRange: [string, string] | null
}

export const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // Search and Filter states
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: '',
    status: '',
    isFeatured: '',
    dateRange: null
  })

  console.log('🎯 Current selectedRowKeys:', selectedRowKeys)
  console.log('🎯 blogPosts count:', blogPosts.length)
  console.log('🔍 Current filters:', filters)
  console.log('📊 Filtered posts count:', filteredPosts.length)

  const categories = [
    'Sức khỏe phụ nữ',
    'Sức khỏe nam giới', 
    'Phòng chống bệnh',
    'Dinh dưỡng',
    'Tâm lý sức khỏe',
    'Tin tức y tế',
    'Sức khỏe tim mạch'
  ]

  // Load data from service
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const posts = await blogService.getAllPosts()
        setBlogPosts(posts)
        setFilteredPosts(posts) // Initialize filtered posts
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Subscribe to changes
    const unsubscribe = blogService.subscribe(() => {
      loadData()
    })

    return unsubscribe
  }, [])

  // Apply filters whenever filters change or blogPosts change
  useEffect(() => {
    applyFilters()
  }, [filters, blogPosts])

  // Filter and search logic
  const applyFilters = async () => {
    let filtered = [...blogPosts]

    // Apply search term filter
    if (filters.searchTerm.trim()) {
      const searchTerm = filters.searchTerm.toLowerCase().trim()
      
      // If we have a search term, use the backend search API for better results
      try {
        const searchResults = await blogService.searchPosts(
          filters.searchTerm, 
          filters.category || undefined
        )
        filtered = searchResults
      } catch (error) {
        console.error('Search API failed, falling back to local search:', error)
        // Fallback to local search
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.author.toLowerCase().includes(searchTerm)
        )
      }
    }

    // Apply category filter (if not using backend search)
    if (filters.category && !filters.searchTerm.trim()) {
      filtered = filtered.filter(post => post.category === filters.category)
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(post => post.status === filters.status)
    }

    // Apply featured filter
    if (filters.isFeatured) {
      const isFeatured = filters.isFeatured === 'true'
      filtered = filtered.filter(post => post.isFeatured === isFeatured)
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const [startDate, endDate] = filters.dateRange
      filtered = filtered.filter(post => {
        const postDate = new Date(post.createdAt)
        const start = new Date(startDate)
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999) // Include the entire end date
        return postDate >= start && postDate <= end
      })
    }

    setFilteredPosts(filtered)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value
    }))
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      category: '',
      status: '',
      isFeatured: '',
      dateRange: null
    })
  }

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.searchTerm.trim() !== '' ||
           filters.category !== '' ||
           filters.status !== '' ||
           filters.isFeatured !== '' ||
           filters.dateRange !== null
  }

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log('🔥 Row selection changed:', newSelectedRowKeys)
      setSelectedRowKeys(newSelectedRowKeys)
    },
    onSelectAll: (selected: boolean, selectedRows: BlogPost[], changeRows: BlogPost[]) => {
      console.log('🔥 Select all:', selected, selectedRows, changeRows)
    },
    onSelect: (record: BlogPost, selected: boolean, selectedRows: BlogPost[]) => {
      console.log('🔥 Select single:', record.id, selected, selectedRows)
    },
  }

  // Bulk operations
  const handleBulkDelete = () => {
    console.log('🗑️ Bulk delete called with:', selectedRowKeys)
    
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết để xóa')
      return
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc muốn xóa ${selectedRowKeys.length} bài viết đã chọn?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        console.log('🗑️ Confirming delete for:', selectedRowKeys)
        console.log('🗑️ Converting to strings:', selectedRowKeys.map(key => String(key)))
        try {
          const result = await blogService.bulkDelete(selectedRowKeys.map(key => String(key)))
          console.log('🗑️ Delete result:', result)
          if (result) {
            setSelectedRowKeys([])
            message.success(`Đã xóa ${selectedRowKeys.length} bài viết`)
          } else {
            console.error('🗑️ Delete returned false')
            message.error('Có lỗi xảy ra khi xóa bài viết')
          }
        } catch (error) {
          console.error('🗑️ Error in bulk delete:', error)
          message.error('Có lỗi xảy ra khi xóa bài viết: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
      }
    })
  }

  const handleBulkPublish = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết')
      return
    }

    try {
      const result = await blogService.bulkPublish(selectedRowKeys.map(key => String(key)))
      if (result) {
        setSelectedRowKeys([])
        message.success(`Đã xuất bản ${selectedRowKeys.length} bài viết`)
      } else {
        message.error('Có lỗi xảy ra khi xuất bản bài viết')
      }
    } catch (error) {
      console.error('Error in bulk publish:', error)
      message.error('Có lỗi xảy ra khi xuất bản bài viết')
    }
  }

  const handleBulkUnpublish = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết')
      return
    }

    try {
      const result = await blogService.bulkUnpublish(selectedRowKeys.map(key => String(key)))
      if (result) {
        setSelectedRowKeys([])
        message.success(`Đã chuyển ${selectedRowKeys.length} bài viết về bản nháp`)
      } else {
        message.error('Có lỗi xảy ra khi chuyển bài viết về nháp')
      }
    } catch (error) {
      console.error('Error in bulk unpublish:', error)
      message.error('Có lỗi xảy ra khi chuyển bài viết về nháp')
    }
  }

  const handleBulkFeature = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết')
      return
    }

    try {
      const result = await blogService.bulkSetFeatured(selectedRowKeys.map(key => String(key)), true)
      if (result) {
        setSelectedRowKeys([])
        message.success(`Đã đặt ${selectedRowKeys.length} bài viết làm nổi bật`)
      } else {
        message.error('Có lỗi xảy ra khi đặt bài viết nổi bật')
      }
    } catch (error) {
      console.error('Error in bulk feature:', error)
      message.error('Có lỗi xảy ra khi đặt bài viết nổi bật')
    }
  }

  const handleBulkUnfeature = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết')
      return
    }

    try {
      const result = await blogService.bulkSetFeatured(selectedRowKeys.map(key => String(key)), false)
      if (result) {
        setSelectedRowKeys([])
        message.success(`Đã bỏ nổi bật ${selectedRowKeys.length} bài viết`)
      } else {
        message.error('Có lỗi xảy ra khi bỏ nổi bật bài viết')
      }
    } catch (error) {
      console.error('Error in bulk unfeature:', error)
      message.error('Có lỗi xảy ra khi bỏ nổi bật bài viết')
    }
  }

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        <Image
          width={60}
          height={40}
          src={image}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN4BMghZFiIvUHKLFOU4Q2cO06WWhsSHw1ZA4BaOEiez/qJ7n7////7////7//f7h////////7////////7//f8A"
        />
      )
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <Text strong className="text-blue-600">{text}</Text>
      )
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
        </Tag>
      )
    },
    {
      title: 'Nổi bật',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured: boolean) => (
        <Tag color={isFeatured ? 'red' : 'default'}>
          {isFeatured ? 'Có' : 'Không'}
        </Tag>
      )
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      render: (views: number) => (
        <span className="text-gray-600">{views}</span>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (record: BlogPost) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            title="Xem trước"
          />
          <Button 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa bài viết này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              title="Xóa"
            />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    setEditingPost(null)
    setFileList([])
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    form.setFieldsValue({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      readTime: post.readTime,
      isFeatured: post.isFeatured
    })
    
    // Set current image to fileList for preview
    if (post.image) {
      setFileList([{
        uid: '-1',
        name: 'current-image.jpg',
        status: 'done',
        url: post.image,
      }])
    } else {
      setFileList([])
    }
    
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    console.log('🗑️ Individual delete called for ID:', id)
    try {
      const result = await blogService.deletePost(String(id))
      console.log('🗑️ Individual delete result:', result)
      if (result) {
        message.success('Đã xóa bài viết')
      } else {
        console.error('🗑️ Individual delete returned false')
        message.error('Không thể xóa bài viết')
      }
    } catch (error) {
      console.error('🗑️ Error deleting post:', error)
      message.error('Không thể xóa bài viết: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Handle file upload
  const handleUpload: UploadProps['customRequest'] = (options) => {
    const { file, onSuccess } = options
    
    // Simulate upload - In real app, you would upload to server
    setTimeout(() => {
      if (onSuccess) {
        onSuccess('ok')
      }
    }, 1000)
  }

  const handleFileChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList]
    
    // Limit to 1 file
    newFileList = newFileList.slice(-1)
    
    // Read file as base64 for preview
    newFileList = newFileList.map(file => {
      if (file.originFileObj && !file.url && !file.preview) {
        const reader = new FileReader()
        reader.onload = () => {
          file.preview = reader.result as string
        }
        reader.readAsDataURL(file.originFileObj)
      }
      return file
    })
    
    setFileList(newFileList)
  }

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('Chỉ có thể tải lên file hình ảnh!')
      return false
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Hình ảnh phải nhỏ hơn 5MB!')
      return false
    }
    
    return true
  }

  const handleModalOk = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields()
      
      console.log('Form values after validation:', values)
      
      // Ensure required fields are present
      if (!values.title || !values.content || !values.category) {
        message.error('Vui lòng điền đầy đủ thông tin bắt buộc')
        return
      }
      
      // Create category slug
      const categorySlug = values.category
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      // Get image URL - either from upload or keep existing
      let imageUrl = editingPost?.image || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      
      if (fileList.length > 0 && fileList[0].preview) {
        // In real app, you would get the uploaded image URL from server
        imageUrl = fileList[0].preview
      } else if (fileList.length > 0 && fileList[0].url) {
        imageUrl = fileList[0].url
      }

      // Prepare data for API
      const postData = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt || values.content.substring(0, 200) + '...',
        image: imageUrl,
        category: values.category,
        categorySlug,
        status: values.status,
        author: 'Nhân viên hiện tại',
        readTime: values.readTime || '5 phút đọc',
        isFeatured: values.isFeatured || false
      }

      console.log('Data to be sent to API:', postData)

      if (editingPost) {
        // Update existing post
        try {
          const updated = await blogService.updatePost(String(editingPost.id), postData)
          if (updated) {
            message.success('Đã cập nhật bài viết')
            setIsModalOpen(false)
            setFileList([])
            form.resetFields()
          } else {
            message.error('Không thể cập nhật bài viết')
          }
        } catch (error) {
          console.error('Error updating post:', error)
          message.error('Không thể cập nhật bài viết: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
      } else {
        // Add new post
        try {
          await blogService.addPost(postData)
          message.success('Đã thêm bài viết mới')
          setIsModalOpen(false)
          setFileList([])
          form.resetFields()
        } catch (error) {
          console.error('Error adding post:', error)
          message.error('Không thể thêm bài viết mới: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
      }
      
    } catch (error) {
      console.error('Form validation failed:', error)
      message.error('Vui lòng kiểm tra lại thông tin trong form')
    }
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
    setFileList([])
    form.resetFields()
  }

  const stats = {
    total: filteredPosts.length,
    published: filteredPosts.filter(post => post.status === 'published').length,
    draft: filteredPosts.filter(post => post.status === 'draft').length,
    totalViews: filteredPosts.reduce((sum, post) => sum + post.views, 0)
  }

  // Calculate original stats for display when filters are active
  const originalStats = hasActiveFilters() ? {
    total: blogPosts.length,
    published: blogPosts.filter(post => post.status === 'published').length,
    draft: blogPosts.filter(post => post.status === 'draft').length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0)
  } : stats

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} className="mb-2">
            <FileTextOutlined className="mr-3 text-blue-600" />
            Quản lý Blog
          </Title>
          <Text className="text-gray-600">
            Quản lý các bài viết blog và nội dung trên website
            {hasActiveFilters() && (
              <span className="ml-2 text-blue-600">
                • Đang hiển thị {filteredPosts.length}/{blogPosts.length} bài viết
              </span>
            )}
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700"
          size="large"
        >
          Thêm bài viết
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="border-0 shadow-sm">
        <Row gutter={[16, 16]}>
          {/* Search Box */}
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm bài viết..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={filters.searchTerm}
              onChange={handleSearchChange}
              allowClear
              className="w-full"
            />
          </Col>
          
          {/* Category Filter */}
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="Danh mục"
              value={filters.category || undefined}
              onChange={(value) => handleFilterChange('category', value || '')}
              allowClear
              className="w-full"
            >
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Col>

          {/* Status Filter */}
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="Trạng thái"
              value={filters.status || undefined}
              onChange={(value) => handleFilterChange('status', value || '')}
              allowClear
              className="w-full"
            >
              <Option value="published">Đã xuất bản</Option>
              <Option value="draft">Bản nháp</Option>
            </Select>
          </Col>

          {/* Featured Filter */}
          <Col xs={12} sm={6} md={4}>
            <Select
              placeholder="Nổi bật"
              value={filters.isFeatured || undefined}
              onChange={(value) => handleFilterChange('isFeatured', value || '')}
              allowClear
              className="w-full"
            >
              <Option value="true">Có</Option>
              <Option value="false">Không</Option>
            </Select>
          </Col>

          {/* Date Range Filter */}
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              value={filters.dateRange ? [
                filters.dateRange[0] ? dayjs(filters.dateRange[0]) : null,
                filters.dateRange[1] ? dayjs(filters.dateRange[1]) : null
              ] : null}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  handleFilterChange('dateRange', [
                    dates[0].format('YYYY-MM-DD'),
                    dates[1].format('YYYY-MM-DD')
                  ])
                } else {
                  handleFilterChange('dateRange', null)
                }
              }}
              className="w-full"
              format="DD/MM/YYYY"
            />
          </Col>

          {/* Clear Filters Button */}
          {hasActiveFilters() && (
            <Col xs={24} sm={12} md={2}>
              <Button
                icon={<ClearOutlined />}
                onClick={clearAllFilters}
                className="w-full border-gray-300 text-gray-600 hover:border-gray-400"
              >
                Xóa bộ lọc
              </Button>
            </Col>
          )}
        </Row>

        {/* Filter Summary */}
        {hasActiveFilters() && (
          <>
            <Divider className="my-4" />
            <div className="flex flex-wrap gap-2">
              <Text className="text-gray-600 mr-2">
                <FilterOutlined className="mr-1" />
                Bộ lọc đang áp dụng:
              </Text>
              {filters.searchTerm.trim() && (
                <Tag closable onClose={() => handleFilterChange('searchTerm', '')}>
                  Từ khóa: "{filters.searchTerm}"
                </Tag>
              )}
              {filters.category && (
                <Tag closable onClose={() => handleFilterChange('category', '')}>
                  Danh mục: {filters.category}
                </Tag>
              )}
              {filters.status && (
                <Tag closable onClose={() => handleFilterChange('status', '')}>
                  Trạng thái: {filters.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                </Tag>
              )}
              {filters.isFeatured && (
                <Tag closable onClose={() => handleFilterChange('isFeatured', '')}>
                  Nổi bật: {filters.isFeatured === 'true' ? 'Có' : 'Không'}
                </Tag>
              )}
              {filters.dateRange && (
                <Tag closable onClose={() => handleFilterChange('dateRange', null)}>
                  Ngày: {filters.dateRange[0]} → {filters.dateRange[1]}
                </Tag>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title={hasActiveFilters() ? "Hiển thị / Tổng" : "Tổng bài viết"}
              value={hasActiveFilters() ? `${stats.total}/${originalStats.total}` : stats.total}
              prefix={<FileTextOutlined className="text-blue-600" />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title={hasActiveFilters() ? "Xuất bản (lọc)" : "Đã xuất bản"}
              value={stats.published}
              prefix={<EyeOutlined className="text-green-600" />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title={hasActiveFilters() ? "Nháp (lọc)" : "Bản nháp"}
              value={stats.draft}
              prefix={<EditOutlined className="text-orange-600" />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="text-center border-0 shadow-sm">
            <Statistic
              title={hasActiveFilters() ? "Lượt xem (lọc)" : "Tổng lượt xem"}
              value={stats.totalViews}
              prefix={<UserOutlined className="text-purple-600" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Bulk Actions */}
      {selectedRowKeys.length > 0 && (
        <Card className="border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <Text strong className="text-blue-600">
              Đã chọn {selectedRowKeys.length} bài viết
            </Text>
            <Space>
              <Button 
                onClick={handleBulkPublish}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Xuất bản
              </Button>
              <Button 
                onClick={handleBulkUnpublish}
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Chuyển về nháp
              </Button>
              <Button 
                onClick={handleBulkFeature}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Đặt nổi bật
              </Button>
              <Button 
                onClick={handleBulkUnfeature}
                className="border-gray-500 text-gray-600 hover:bg-gray-50"
              >
                Bỏ nổi bật
              </Button>
              <Button 
                danger
                onClick={handleBulkDelete}
                icon={<DeleteOutlined />}
              >
                Xóa
              </Button>
            </Space>
          </div>
        </Card>
      )}

      {/* Blog Posts Table */}
      <Card className="border-0 shadow-sm">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredPosts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} bài viết${hasActiveFilters() ? ' (đã lọc)' : ''}`
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={900}
        okText={editingPost ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'draft', isFeatured: false }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item
            label="Hình ảnh đại diện"
            extra="Hỗ trợ định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB"
          >
            <Dragger
              fileList={fileList}
              onChange={handleFileChange}
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
              accept="image/*"
              maxCount={1}
              listType="picture"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click hoặc kéo thả file vào khu vực này để tải lên</p>
              <p className="ant-upload-hint">
                Chọn hình ảnh đại diện cho bài viết của bạn
              </p>
            </Dragger>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map(cat => (
                    <Option key={cat} value={cat}>{cat}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="draft">Bản nháp</Option>
                  <Option value="published">Xuất bản</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="readTime"
                label="Thời gian đọc"
              >
                <Input placeholder="VD: 5 phút đọc" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isFeatured"
                label="Bài viết nổi bật"
                valuePropName="checked"
              >
                <Select>
                  <Option value={false}>Không</Option>
                  <Option value={true}>Có</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="excerpt"
            label="Mô tả ngắn"
          >
            <TextArea 
              rows={3} 
              placeholder="Mô tả ngắn về bài viết (nếu để trống sẽ tự động lấy từ nội dung)"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea 
              rows={10} 
              placeholder="Nhập nội dung bài viết"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 