import { Card, Row, Col, Typography, Statistic, Table, Tag, Space, Button } from 'antd'
import { 
  CalendarOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  HeartOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

interface DashboardContentProps {
  user: any
  onNavigate?: (page: string) => void
}

export const DashboardContent = ({ user, onNavigate }: DashboardContentProps) => {
  // Mock data cho demo
  const recentActivities = [
    { key: 1, time: '10:30', action: 'Đăng nhập hệ thống', status: 'success' },
    { key: 2, time: '09:15', action: 'Cập nhật thông tin cá nhân', status: 'info' },
    { key: 3, time: '08:45', action: 'Xem lịch hẹn', status: 'default' },
    { key: 4, time: '07:30', action: 'Kiểm tra kết quả xét nghiệm', status: 'success' },
    { key: 5, time: '06:15', action: 'Đặt lịch tái khám', status: 'info' },
  ]

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 100,
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
      width: 120,
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : status === 'info' ? 'blue' : 'default'}>
          {status === 'success' ? 'Thành công' : status === 'info' ? 'Thông tin' : 'Mặc định'}
        </Tag>
      ),
    },
  ]

  const upcomingAppointments = [
    { key: 1, time: '14:00', doctor: 'Dr. Nguyễn Văn A', specialty: 'Tim mạch', date: 'Hôm nay' },
    { key: 2, time: '09:30', doctor: 'Dr. Trần Thị B', specialty: 'Nội khoa', date: 'Ngày mai' },
    { key: 3, time: '15:15', doctor: 'Dr. Lê Văn C', specialty: 'Da liễu', date: '25/12/2024' },
  ]

  const appointmentColumns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 100,
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: 'Bác sĩ',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Chuyên khoa',
      dataIndex: 'specialty',
      key: 'specialty',
    },
  ]

  return (
    <div className="p-6">
      <div className="max-w-full">
        {/* Welcome Section */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm">
          <div className="py-6">
            <Title level={2} className="mb-2">
              Chào mừng trở lại, {user.fullName || user.username}! 👋
            </Title>
            <Text className="text-lg text-gray-600">
              Hôm nay là một ngày tuyệt vời để chăm sóc sức khỏe. Bạn có {recentActivities.length} hoạt động mới.
            </Text>
          </div>
        </Card>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <Statistic
                title="Lịch hẹn hôm nay"
                value={3}
                prefix={<CalendarOutlined className="text-blue-500" />}
                valueStyle={{ color: '#1677ff' }}
                suffix="cuộc hẹn"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <Statistic
                title="Lịch hẹn sắp tới"
                value={7}
                prefix={<TeamOutlined className="text-green-500" />}
                valueStyle={{ color: '#52c41a' }}
                suffix="cuộc hẹn"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <Statistic
                title="Đã khám trong tháng"
                value={12}
                prefix={<HeartOutlined className="text-red-500" />}
                valueStyle={{ color: '#ff4d4f' }}
                suffix="lần"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <Statistic
                title="Báo cáo sức khỏe"
                value={95}
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
            <Card 
              title="Hoạt động gần đây" 
              className="h-full border-0 shadow-sm"
              extra={
                <Button type="link" onClick={() => onNavigate?.('notifications')}>
                  Xem tất cả
                </Button>
              }
            >
              <Table 
                dataSource={recentActivities} 
                columns={columns}
                pagination={false}
                size="small"
                className="mb-4"
              />
            </Card>
          </Col>

          {/* Upcoming Appointments & Quick Actions */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" className="w-full" size="large">
              {/* Upcoming Appointments */}
              <Card 
                title="Lịch hẹn sắp tới" 
                className="border-0 shadow-sm"
                extra={
                  <Button type="link" onClick={() => onNavigate?.('appointments')}>
                    Xem tất cả
                  </Button>
                }
              >
                <Table 
                  dataSource={upcomingAppointments} 
                  columns={appointmentColumns}
                  pagination={false}
                  size="small"
                />
              </Card>

              {/* Quick Actions */}
              <Card title="Thao tác nhanh" className="border-0 shadow-sm">
                <Space direction="vertical" className="w-full" size="middle">
                  <Button 
                    type="primary" 
                    block 
                    size="large"
                    icon={<CalendarOutlined />}
                    onClick={() => onNavigate?.('appointments')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Đặt lịch hẹn mới
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<UserOutlined />}
                    onClick={() => onNavigate?.('medical-records')}
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Xem hồ sơ y tế
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<MedicineBoxOutlined />}
                    onClick={() => onNavigate?.('medications')}
                    className="border-purple-500 text-purple-600 hover:bg-purple-50"
                  >
                    Quản lý thuốc
                  </Button>
                  
                  <Button 
                    block 
                    size="large"
                    icon={<TeamOutlined />}
                    onClick={() => onNavigate?.('patients')}
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    Quản lý bệnh nhân
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
} 