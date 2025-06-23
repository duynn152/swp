import { useState, useEffect } from 'react'
import { Layout, Card, Row, Col, Typography, Button, Avatar, Space, Statistic, Table, Tag } from 'antd'
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  HeartOutlined
} from '@ant-design/icons'
import { getStoredUser, clearTokens } from '../services/authService'

const { Content } = Layout
const { Title, Text } = Typography

interface DashboardPageProps {
  onNavigate?: (page: string) => void
}

export const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      // Nếu không có user, quay về trang login
      onNavigate?.('login')
    }
  }, [onNavigate])

  const handleLogout = () => {
    clearTokens()
    onNavigate?.('login')
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'red'
      case 'DOCTOR': return 'blue'
      case 'STAFF': return 'green'
      case 'PATIENT': return 'orange'
      default: return 'default'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Quản trị viên'
      case 'DOCTOR': return 'Bác sĩ'
      case 'STAFF': return 'Nhân viên'
      case 'PATIENT': return 'Bệnh nhân'
      default: return role
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock data cho demo
  const recentActivities = [
    { key: 1, time: '10:30', action: 'Đăng nhập hệ thống', status: 'success' },
    { key: 2, time: '09:15', action: 'Cập nhật thông tin cá nhân', status: 'info' },
    { key: 3, time: '08:45', action: 'Xem lịch hẹn', status: 'default' },
  ]

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : status === 'info' ? 'blue' : 'default'}>
          {status === 'success' ? 'Thành công' : status === 'info' ? 'Thông tin' : 'Mặc định'}
        </Tag>
      ),
    },
  ]

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <MedicineBoxOutlined className="text-blue-600 text-2xl" />
            <Title level={3} className="mb-0 text-blue-600">
              MedCare Hospital Dashboard
            </Title>
          </div>
          
          <div className="flex items-center space-x-4">
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
              <div>
                <Text strong className="block">{user.fullName || user.username}</Text>
                <Tag color={getRoleColor(user.role)}>{getRoleText(user.role)}</Tag>
              </div>
            </Space>
            
            <Button 
              icon={<SettingOutlined />}
              className="mr-2"
            >
              Cài đặt
            </Button>
            
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-6">
            <div className="text-center py-8">
              <Title level={2}>
                Chào mừng {user.fullName || user.username}! 👋
              </Title>
              <Text className="text-lg text-gray-600">
                Hôm nay là một ngày tuyệt vời để chăm sóc sức khỏe
              </Text>
            </div>
          </Card>

          {/* Stats Cards */}
          <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Lịch hẹn hôm nay"
                  value={5}
                  prefix={<CalendarOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1677ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tổng bệnh nhân"
                  value={1234}
                  prefix={<TeamOutlined className="text-green-500" />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Khám trong tuần"
                  value={89}
                  prefix={<HeartOutlined className="text-red-500" />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tỷ lệ hài lòng"
                  value={98.5}
                  suffix="%"
                  prefix={<MedicineBoxOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Recent Activities */}
            <Col xs={24} lg={14}>
              <Card title="Hoạt động gần đây" className="h-full">
                <Table 
                  dataSource={recentActivities} 
                  columns={columns}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>

            {/* Quick Actions */}
            <Col xs={24} lg={10}>
              <Card title="Thao tác nhanh" className="h-full">
                <Space direction="vertical" className="w-full" size="middle">
                  <Button 
                    type="primary" 
                    block 
                    size="large"
                    icon={<CalendarOutlined />}
                  >
                    Đặt lịch hẹn
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<UserOutlined />}
                  >
                    Quản lý hồ sơ
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<MedicineBoxOutlined />}
                  >
                    Xem kết quả khám
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<TeamOutlined />}
                    onClick={() => onNavigate?.('home')}
                  >
                    Về trang chủ
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  )
} 