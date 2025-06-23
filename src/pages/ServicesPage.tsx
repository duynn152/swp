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
  PhoneOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export const ServicesPage = () => {
  const departments = [
    {
      icon: <HeartOutlined className="text-4xl text-red-500" />,
      name: "Khoa Tim mạch",
      description: "Chuyên điều trị các bệnh lý về tim mạch, mạch máu với công nghệ tiên tiến",
      services: ["Siêu âm tim", "Điện tâm đồ", "Thông tim", "Phẫu thuật tim hở"],
      doctors: "15 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8801"
    },
    {
      icon: <MedicineBoxOutlined className="text-4xl text-blue-500" />,
      name: "Khoa Nội tổng hợp",
      description: "Khám và điều trị các bệnh lý nội khoa từ cơ bản đến phức tạp",
      services: ["Khám tổng quát", "Điều trị tiểu đường", "Cao huyết áp", "Bệnh lý gan"],
      doctors: "20 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8802"
    },
    {
      icon: <UserOutlined className="text-4xl text-green-500" />,
      name: "Khoa Ngoại tổng hợp",
      description: "Phẫu thuật với công nghệ nội soi, robot hỗ trợ hiện đại",
      services: ["Phẫu thuật nội soi", "Phẫu thuật robot", "Ghép tạng", "Phẫu thuật thẩm mỹ"],
      doctors: "18 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8803"
    },
    {
      icon: <TeamOutlined className="text-4xl text-purple-500" />,
      name: "Sản phụ khoa",
      description: "Chăm sóc toàn diện cho mẹ và bé từ thai kỳ đến sinh nở",
      services: ["Khám thai", "Sinh thường", "Mổ đẻ", "Chăm sóc sau sinh"],
      doctors: "12 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8804"
    },
    {
      icon: <BugOutlined className="text-4xl text-orange-500" />,
      name: "Nhi khoa",
      description: "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 16 tuổi",
      services: ["Khám nhi", "Tiêm chủng", "Dinh dưỡng", "Tư vấn phát triển"],
      doctors: "10 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8805"
    },
    {
      icon: <EyeOutlined className="text-4xl text-cyan-500" />,
      name: "Mắt",
      description: "Điều trị các bệnh lý về mắt với thiết bị laser hiện đại",
      services: ["Khám mắt", "Mổ cận thị", "Điều trị glaucoma", "Phẫu thuật võng mạc"],
      doctors: "8 bác sĩ chuyên khoa",
      hotline: "(028) 3999 8806"
    }
  ]

  const emergencyServices = [
    "Cấp cứu 24/7",
    "Hồi sức tích cực",
    "Cấp cứu ngoại khoa",
    "Cấp cứu nội khoa",
    "Cấp cứu sản khoa"
  ]

  const diagnosticServices = [
    "X-quang kỹ thuật số",
    "CT Scanner 64 lát cắt", 
    "MRI 1.5 Tesla",
    "Siêu âm Doppler",
    "Nội soi tiêu hóa",
    "Xét nghiệm máu 24/7"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            Dịch vụ y tế chuyên nghiệp
          </Title>
          <Paragraph className="text-blue-100 text-lg max-w-3xl mx-auto">
            MedCare Hospital cung cấp đầy đủ các dịch vụ y tế từ khám bệnh tổng quát 
            đến các chuyên khoa sâu với đội ngũ bác sĩ giàu kinh nghiệm
          </Paragraph>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={8} md={6}>
              <Button 
                type="primary" 
                block 
                icon={<CalendarOutlined />}
                size="large"
                className="bg-blue-600 h-12"
              >
                Đặt lịch khám
              </Button>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Button 
                block 
                icon={<PhoneOutlined />}
                size="large"
                className="border-blue-600 text-blue-600 h-12"
              >
                Tư vấn trực tuyến
              </Button>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Button 
                block 
                icon={<SafetyOutlined />}
                size="large"
                className="border-red-600 text-red-600 h-12"
              >
                Cấp cứu: 115
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Các chuyên khoa</Title>
            <Paragraph className="text-gray-600 text-lg">
              Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm với trang thiết bị hiện đại
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {departments.map((dept, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 border-none"
                  hoverable
                >
                  <div className="text-center mb-4">{dept.icon}</div>
                  <Title level={4} className="text-center mb-3">{dept.name}</Title>
                  <Paragraph className="text-gray-600 text-center mb-4">
                    {dept.description}
                  </Paragraph>
                  
                  <div className="mb-4">
                    <Text strong className="text-gray-700 block mb-2">Dịch vụ chính:</Text>
                    <div className="flex flex-wrap gap-1">
                      {dept.services.map((service, idx) => (
                        <Tag key={idx} color="blue">{service}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-600">Đội ngũ:</Text>
                      <Text strong>{dept.doctors}</Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-600">Hotline:</Text>
                      <Text strong className="text-blue-600">{dept.hotline}</Text>
                    </div>
                  </div>

                  <Button type="primary" block className="bg-blue-600">
                    Đặt lịch khám
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Emergency & Diagnostic Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card className="h-full border-none shadow-lg">
                <div className="text-center mb-6">
                  <SafetyOutlined className="text-5xl text-red-500 mb-4" />
                  <Title level={3} className="text-red-600">Dịch vụ cấp cứu</Title>
                </div>
                
                <Timeline>
                  {emergencyServices.map((service, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<ClockCircleOutlined className="text-red-500" />}
                    >
                      <Text strong>{service}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <Text strong className="text-red-600 block text-center">
                    🚨 Hotline cấp cứu: (028) 3999 8888
                  </Text>
                  <Text className="text-red-500 text-center block">
                    Hoạt động 24/7 - Cả tuần
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="h-full border-none shadow-lg">
                <div className="text-center mb-6">
                  <ExperimentOutlined className="text-5xl text-green-500 mb-4" />
                  <Title level={3} className="text-green-600">Chẩn đoán hình ảnh</Title>
                </div>
                
                <Timeline>
                  {diagnosticServices.map((service, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<ExperimentOutlined className="text-green-500" />}
                    >
                      <Text strong>{service}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <Text strong className="text-green-600 block text-center">
                    📋 Đặt lịch xét nghiệm: (028) 3999 8890
                  </Text>
                  <Text className="text-green-500 text-center block">
                    Kết quả nhanh - Chính xác
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Service Hours */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Title level={2}>Thời gian phục vụ</Title>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="text-center border-none shadow-md">
                <ClockCircleOutlined className="text-3xl text-blue-600 mb-3" />
                <Title level={4} className="text-blue-600">Khám bệnh</Title>
                <Text className="block">Thứ 2 - Chủ nhật</Text>
                <Text className="block font-semibold">7:00 - 22:00</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center border-none shadow-md">
                <SafetyOutlined className="text-3xl text-red-600 mb-3" />
                <Title level={4} className="text-red-600">Cấp cứu</Title>
                <Text className="block">Tất cả các ngày</Text>
                <Text className="block font-semibold">24/7</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center border-none shadow-md">
                <ExperimentOutlined className="text-3xl text-green-600 mb-3" />
                <Title level={4} className="text-green-600">Xét nghiệm</Title>
                <Text className="block">Thứ 2 - Chủ nhật</Text>
                <Text className="block font-semibold">6:00 - 20:00</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">
            Cần tư vấn về dịch vụ?
          </Title>
          <Paragraph className="text-blue-100 text-lg mb-6">
            Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn 24/7
          </Paragraph>
          <Space size="large" className="flex justify-center">
            <Button 
              type="primary" 
              size="large" 
              icon={<PhoneOutlined />}
              className="bg-white text-blue-600 border-white hover:bg-blue-50"
            >
              Gọi ngay: (028) 3999 8888
            </Button>
            <Button 
              size="large" 
              icon={<CalendarOutlined />}
              className="border-white text-white hover:bg-white hover:text-blue-600"
              ghost
            >
              Đặt lịch trực tuyến
            </Button>
          </Space>
        </div>
      </section>
    </div>
  )
} 