import { Row, Col, Card, Typography, Button, Tag, Space, Timeline } from 'antd'
import { 
  HeartOutlined,
  MedicineBoxOutlined,
  EyeOutlined,
  BugOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
  WomanOutlined,
  ManOutlined,
  DatabaseOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
  RobotOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export const Services = () => {
  const genderServices = [
    {
      icon: <WomanOutlined className="text-4xl text-pink-500" />,
      name: "Chăm sóc sức khỏe phụ nữ",
      description: "Dịch vụ y tế chuyên biệt được thiết kế riêng cho nhu cầu sức khỏe phụ nữ",
      services: ["Khám phụ khoa", "Sàng lọc ung thư", "Chăm sóc thai kỳ", "Tư vấn dinh dưỡng"],
      specialists: "25 chuyên gia phụ nữ",
      hotline: "(028) 3999 1111"
    },
    {
      icon: <ManOutlined className="text-4xl text-blue-500" />,
      name: "Chăm sóc sức khỏe nam giới",
      description: "Hệ thống chăm sóc y tế tối ưu hóa cho đặc thù sinh lý và tâm lý nam giới",
      services: ["Khám nam khoa", "Sàng lọc tuyến tiền liệt", "Tư vấn sinh sản", "Khám định kỳ"],
      specialists: "20 chuyên gia nam khoa",
      hotline: "(028) 3999 2222"
    },
    {
      icon: <DatabaseOutlined className="text-4xl text-green-500" />,
      name: "Quản lý hồ sơ sức khỏe",
      description: "Hệ thống lưu trữ và quản lý hồ sơ sức khỏe điện tử an toàn, bảo mật",
      services: ["Hồ sơ điện tử", "Lịch sử khám bệnh", "Kết quả xét nghiệm", "Đơn thuốc điện tử"],
      specialists: "Hệ thống AI hỗ trợ",
      hotline: "(028) 3999 8888"
    },
    {
      icon: <ScheduleOutlined className="text-4xl text-purple-500" />,
      name: "Đặt lịch thông minh",
      description: "AI hỗ trợ đặt lịch tối ưu dựa trên giới tính và nhu cầu cá nhân",
      services: ["Đặt lịch AI", "Nhắc nhở thông minh", "Tối ưu thời gian", "Phân tích xu hướng"],
      specialists: "Hệ thống tự động",
      hotline: "(028) 3999 3333"
    },
    {
      icon: <SecurityScanOutlined className="text-4xl text-orange-500" />,
      name: "Bảo mật thông tin",
      description: "Hệ thống bảo mật đa lớp đảm bảo an toàn thông tin y tế cá nhân",
      services: ["Mã hóa dữ liệu", "Xác thực 2 lớp", "Kiểm soát truy cập", "Sao lưu an toàn"],
      specialists: "Đội ngũ bảo mật chuyên nghiệp",
      hotline: "(028) 3999 4444"
    },
    {
      icon: <RobotOutlined className="text-4xl text-cyan-500" />,
      name: "Tư vấn AI",
      description: "Trí tuệ nhân tạo hỗ trợ tư vấn sức khỏe theo giới tính 24/7",
      services: ["Chatbot y tế", "Phân tích triệu chứng", "Gợi ý khám bệnh", "Tư vấn trực tuyến"],
      specialists: "AI Engine v3.0",
      hotline: "(028) 3999 5555"
    }
  ]

  const systemFeatures = [
    "Quản lý dữ liệu theo giới tính",
    "AI phân tích xu hướng sức khỏe",
    "Bảo mật chuẩn ISO 27001",
    "Tích hợp đa nền tảng",
    "Báo cáo thống kê thông minh"
  ]

  const technicalServices = [
    "API Gateway bảo mật",
    "Cloud Storage đa vùng", 
    "Machine Learning Pipeline",
    "Real-time Analytics",
    "Mobile App Integration",
    "Telemedicine Platform"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            Dịch vụ quản lý y tế chuyên biệt
          </Title>
          <Paragraph className="text-purple-100 text-lg max-w-3xl mx-auto">
            GHSMS cung cấp hệ thống quản lý dịch vụ y tế tiên tiến, được thiết kế riêng 
            cho nhu cầu chăm sóc sức khỏe theo giới tính với công nghệ AI và bảo mật cao
          </Paragraph>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={8} md={6}>
              <Button 
                type="primary" 
                block 
                icon={<CalendarOutlined />}
                size="large"
                className="bg-purple-600 border-purple-600 h-12"
              >
                Đặt lịch thông minh
              </Button>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Button 
                block 
                icon={<PhoneOutlined />}
                size="large"
                className="border-purple-600 text-purple-600 h-12"
              >
                Tư vấn AI 24/7
              </Button>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Button 
                block 
                icon={<DatabaseOutlined />}
                size="large"
                className="border-green-600 text-green-600 h-12"
              >
                Truy cập hồ sơ
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      {/* Gender-Specific Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Dịch vụ chuyên biệt theo giới tính</Title>
            <Paragraph className="text-gray-600 text-lg">
              Hệ thống AI và chuyên gia y tế hàng đầu tối ưu hóa cho nhu cầu từng giới tính
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {genderServices.map((service, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 border-none"
                  hoverable
                >
                  <div className="text-center mb-4">{service.icon}</div>
                  <Title level={4} className="text-center mb-3">{service.name}</Title>
                  <Paragraph className="text-gray-600 text-center mb-4">
                    {service.description}
                  </Paragraph>
                  
                  <div className="mb-4">
                    <Text strong className="text-gray-700 block mb-2">Tính năng chính:</Text>
                    <div className="flex flex-wrap gap-1">
                      {service.services.map((feature, idx) => (
                        <Tag key={idx} color="purple">{feature}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-600">Hỗ trợ bởi:</Text>
                      <Text strong>{service.specialists}</Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-600">Hotline:</Text>
                      <Text strong className="text-purple-600">{service.hotline}</Text>
                    </div>
                  </div>

                  <Button type="primary" block className="bg-purple-600 border-purple-600">
                    Trải nghiệm ngay
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* System Features & Technical Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card className="h-full border-none shadow-lg">
                <div className="text-center mb-6">
                  <DatabaseOutlined className="text-6xl text-purple-600 mb-4" />
                  <Title level={3} className="text-purple-600">Tính năng hệ thống</Title>
                </div>
                
                <Timeline>
                  {systemFeatures.map((feature, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<SafetyOutlined className="text-purple-500" />}
                    >
                      <Text strong>{feature}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <Button 
                  type="primary" 
                  block 
                  className="bg-purple-600 border-purple-600 mt-6"
                  icon={<DatabaseOutlined />}
                >
                  Khám phá tính năng
                </Button>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="h-full border-none shadow-lg">
                <div className="text-center mb-6">
                  <RobotOutlined className="text-6xl text-green-600 mb-4" />
                  <Title level={3} className="text-green-600">Công nghệ & API</Title>
                </div>
                
                <Timeline>
                  {technicalServices.map((service, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<ExperimentOutlined className="text-green-500" />}
                    >
                      <Text strong>{service}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <Button 
                  type="primary" 
                  block 
                  className="bg-green-600 border-green-600 mt-6"
                  icon={<RobotOutlined />}
                >
                  Xem tài liệu API
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">
            Bắt đầu với GHSMS ngay hôm nay
          </Title>
          <Paragraph className="text-purple-100 text-lg mb-8">
            Trải nghiệm hệ thống quản lý y tế theo giới tính tiên tiến nhất
          </Paragraph>
          
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={8}>
              <Button 
                size="large" 
                icon={<WomanOutlined />}
                className="bg-pink-600 border-pink-600 text-white w-full"
              >
                Dành cho phụ nữ
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button 
                size="large" 
                icon={<ManOutlined />}
                className="bg-blue-600 border-blue-600 text-white w-full"
              >
                Dành cho nam giới
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button 
                size="large" 
                icon={<PhoneOutlined />}
                className="border-white text-white w-full"
                ghost
              >
                Tư vấn ngay
              </Button>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
} 