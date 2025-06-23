import { Row, Col, Card, Button, Typography, Space, Statistic } from 'antd'
import { 
  HeartOutlined, 
  MedicineBoxOutlined, 
  UserOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  TeamOutlined,
  CalendarOutlined,
  PhoneOutlined,
  WomanOutlined,
  ManOutlined,
  ScheduleOutlined,
  DatabaseOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export const HomePage = () => {
  const services = [
    {
      icon: <WomanOutlined className="text-4xl text-pink-500" />,
      title: "Chăm sóc sức khỏe phụ nữ",
      description: "Dịch vụ chăm sóc sức khỏe toàn diện dành riêng cho phụ nữ ở mọi độ tuổi"
    },
    {
      icon: <ManOutlined className="text-4xl text-blue-500" />,
      title: "Chăm sóc sức khỏe nam giới", 
      description: "Các dịch vụ y tế chuyên biệt được thiết kế cho nhu cầu sức khỏe nam giới"
    },
    {
      icon: <ScheduleOutlined className="text-4xl text-green-500" />,
      title: "Quản lý lịch hẹn thông minh",
      description: "Hệ thống đặt lịch và quản lý cuộc hẹn tự động, tối ưu hóa thời gian"
    },
    {
      icon: <DatabaseOutlined className="text-4xl text-orange-500" />,
      title: "Hồ sơ sức khỏe điện tử",
      description: "Lưu trữ và quản lý hồ sơ sức khỏe an toàn, bảo mật theo giới tính"
    }
  ]

  const stats = [
    { title: "Bệnh nhân được phục vụ", value: 15000, suffix: "+" },
    { title: "Chuyên gia y tế", value: 85, suffix: "+" },
    { title: "Dịch vụ chuyên biệt", value: 12, suffix: "+" },
    { title: "Độ hài lòng", value: 98, suffix: "%" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={1} className="text-white mb-4">
                Hệ thống quản lý <br />
                <span className="text-purple-200">Dịch vụ Y tế theo Giới tính</span>
              </Title>
              <Paragraph className="text-purple-100 text-lg mb-6">
                Gender Healthcare Service Management System - Nền tảng quản lý dịch vụ y tế 
                chuyên biệt theo giới tính, mang đến trải nghiệm chăm sóc sức khỏe cá nhân hóa và hiệu quả.
              </Paragraph>
              <Space size="large">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<CalendarOutlined />}
                  className="bg-white text-purple-600 border-white hover:bg-purple-50"
                >
                  Đặt lịch khám
                </Button>
                <Button 
                  size="large" 
                  icon={<PhoneOutlined />}
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  ghost
                >
                  Tư vấn ngay
                </Button>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <Title level={3} className="text-white text-center mb-6">
                  Dịch vụ 24/7
                </Title>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="flex items-center space-x-2">
                      <WomanOutlined className="text-pink-200" />
                      <span>Tư vấn phụ nữ</span>
                    </span>
                    <strong>(028) 3999 1111</strong>
                  </div>
                  <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="flex items-center space-x-2">
                      <ManOutlined className="text-blue-200" />
                      <span>Tư vấn nam giới</span>
                    </span>
                    <strong>(028) 3999 2222</strong>
                  </div>
                  <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="flex items-center space-x-2">
                      <PhoneOutlined className="text-green-200" />
                      <span>Hỗ trợ hệ thống</span>
                    </span>
                    <strong>(028) 3999 8888</strong>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <Card className="text-center border-none shadow-md">
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Dịch vụ chăm sóc sức khỏe theo giới tính</Title>
            <Paragraph className="text-gray-600 text-lg">
              Hệ thống quản lý dịch vụ y tế chuyên biệt, được thiết kế riêng cho nhu cầu sức khỏe của từng giới tính
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card 
                  className="h-full hover:shadow-lg transition-shadow duration-300 border-none"
                  hoverable
                >
                  <div className="text-center">
                    <div className="mb-4">{service.icon}</div>
                    <Title level={4} className="mb-3">{service.title}</Title>
                    <Paragraph className="text-gray-600">
                      {service.description}
                    </Paragraph>
                    <Button type="link" className="text-purple-600 p-0">
                      Tìm hiểu thêm →
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2}>Tại sao chọn hệ thống của chúng tôi?</Title>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <TeamOutlined className="text-purple-600" />
                  </div>
                  <div>
                    <Title level={5} className="mb-2">Chuyên gia theo giới tính</Title>
                    <Text className="text-gray-600">
                      Đội ngũ chuyên gia y tế được đào tạo chuyên sâu về đặc thù sức khỏe nam và nữ
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <SafetyOutlined className="text-purple-600" />
                  </div>
                  <div>
                    <Title level={5} className="mb-2">Bảo mật thông tin tuyệt đối</Title>
                    <Text className="text-gray-600">
                      Hệ thống bảo mật đa lớp, đảm bảo thông tin sức khỏe cá nhân được bảo vệ an toàn
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <ClockCircleOutlined className="text-purple-600" />
                  </div>
                  <div>
                    <Title level={5} className="mb-2">Dịch vụ tối ưu 24/7</Title>
                    <Text className="text-gray-600">
                      Hệ thống hoạt động liên tục với AI hỗ trợ, đảm bảo phản hồi nhanh chóng mọi lúc
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Title level={3} className="text-center mb-6">Trải nghiệm dịch vụ ngay</Title>
                <div className="space-y-4">
                  <Button 
                    block 
                    size="large" 
                    type="primary" 
                    className="bg-pink-600 hover:bg-pink-700 border-pink-600"
                    icon={<WomanOutlined />}
                  >
                    Dịch vụ cho phụ nữ
                  </Button>
                  <Button 
                    block 
                    size="large" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    icon={<ManOutlined />}
                  >
                    Dịch vụ cho nam giới
                  </Button>
                  <Button 
                    block 
                    size="large" 
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    icon={<DatabaseOutlined />}
                  >
                    Quản lý hồ sơ sức khỏe
                  </Button>
                  <Button 
                    block 
                    size="large" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    icon={<ScheduleOutlined />}
                  >
                    Đặt lịch thông minh
                  </Button>
                </div>
                <div className="text-center mt-6">
                  <Text className="text-gray-500">Hotline hỗ trợ: </Text>
                  <Text strong className="text-purple-600">(028) 3999 8888</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
} 