import { Row, Col, Card, Typography, Timeline, Avatar, Space } from 'antd'
import { 
  MedicineBoxOutlined,
  TeamOutlined,
  SafetyOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
  HeartOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export const About = () => {
  const achievements = [
    {
      year: "1999",
      title: "Thành lập bệnh viện",
      description: "Bệnh viện MedCare được thành lập với 50 giường bệnh đầu tiên"
    },
    {
      year: "2005", 
      title: "Mở rộng quy mô",
      description: "Xây dựng thêm tòa nhà mới, nâng công suất lên 200 giường"
    },
    {
      year: "2012",
      title: "Đạt chứng nhận ISO",
      description: "Đạt chứng nhận ISO 9001:2008 về chất lượng dịch vụ y tế"
    },
    {
      year: "2018",
      title: "Công nghệ hiện đại",
      description: "Đầu tư hệ thống máy móc hiện đại từ Đức và Nhật Bản"
    },
    {
      year: "2022",
      title: "Mở rộng 500 giường",
      description: "Hoàn thành tòa nhà C với 500 giường bệnh tiêu chuẩn quốc tế"
    }
  ]

  const doctors = [
    {
      name: "BS.CKI Nguyễn Văn An",
      position: "Giám đốc bệnh viện - Chuyên khoa Tim mạch",
      experience: "25 năm kinh nghiệm",
      education: "Tiến sĩ Y học - Đại học Y Hà Nội"
    },
    {
      name: "BS.CKII Trần Thị Bình", 
      position: "Phó giám đốc - Chuyên khoa Nội tổng hợp",
      experience: "20 năm kinh nghiệm",
      education: "Thạc sĩ Y học - Đại học Y Dược TPHCM"
    },
    {
      name: "BS.CKI Lê Minh Cường",
      position: "Trưởng khoa Ngoại - Chuyên khoa Phẫu thuật",
      experience: "22 năm kinh nghiệm", 
      education: "Tiến sĩ Y học - Đại học Y Tokyo"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            Về Bệnh viện MedCare
          </Title>
          <Paragraph className="text-blue-100 text-lg max-w-3xl mx-auto">
            Hơn 25 năm đồng hành cùng sức khỏe cộng đồng với sứ mệnh mang đến 
            dịch vụ y tế chất lượng cao và chăm sóc tận tâm
          </Paragraph>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card className="h-full text-center border-none shadow-lg">
                <HeartOutlined className="text-5xl text-red-500 mb-4" />
                <Title level={3} className="text-blue-600">Sứ mệnh</Title>
                <Paragraph className="text-gray-600">
                  Cung cấp dịch vụ y tế chất lượng cao, an toàn và hiệu quả, 
                  góp phần bảo vệ và nâng cao sức khỏe cộng đồng
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full text-center border-none shadow-lg">
                <TrophyOutlined className="text-5xl text-yellow-500 mb-4" />
                <Title level={3} className="text-blue-600">Tầm nhìn</Title>
                <Paragraph className="text-gray-600">
                  Trở thành bệnh viện hàng đầu khu vực với tiêu chuẩn quốc tế, 
                  là nơi tin cậy cho mọi gia đình Việt Nam
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full text-center border-none shadow-lg">
                <SafetyOutlined className="text-5xl text-green-500 mb-4" />
                <Title level={3} className="text-blue-600">Giá trị cốt lõi</Title>
                <Paragraph className="text-gray-600">
                  Tận tâm - Chuyên nghiệp - An toàn - Hiệu quả. 
                  Luôn đặt bệnh nhân là trung tâm trong mọi hoạt động
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Lịch sử phát triển</Title>
            <Paragraph className="text-gray-600 text-lg">
              Hành trình 25 năm xây dựng và phát triển của MedCare Hospital
            </Paragraph>
          </div>
          
          <Timeline mode="alternate">
            {achievements.map((item, index) => (
              <Timeline.Item 
                key={index}
                dot={<MedicineBoxOutlined className="text-blue-600" />}
              >
                <Card className="shadow-md border-none">
                  <Title level={4} className="text-blue-600 mb-2">{item.year}</Title>
                  <Title level={5} className="mb-2">{item.title}</Title>
                  <Text className="text-gray-600">{item.description}</Text>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2}>Đội ngũ lãnh đạo</Title>
            <Paragraph className="text-gray-600 text-lg">
              Những chuyên gia y tế hàng đầu với nhiều năm kinh nghiệm
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {doctors.map((doctor, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="text-center border-none shadow-lg">
                  <Avatar 
                    size={100} 
                    icon={<TeamOutlined />}
                    className="bg-blue-600 mb-4"
                  />
                  <Title level={4} className="mb-2">{doctor.name}</Title>
                  <Text className="text-blue-600 block mb-2">{doctor.position}</Text>
                  <Text className="text-gray-600 block mb-1">{doctor.experience}</Text>
                  <Text className="text-gray-500 text-sm">{doctor.education}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2}>Cơ sở vật chất</Title>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <EnvironmentOutlined className="text-blue-600" />
                  </div>
                  <Text>Tổng diện tích: 15.000m² với 3 tòa nhà chính</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MedicineBoxOutlined className="text-blue-600" />
                  </div>
                  <Text>500 giường bệnh tiêu chuẩn quốc tế</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <SafetyOutlined className="text-blue-600" />
                  </div>
                  <Text>20 phòng phẫu thuật với công nghệ hiện đại</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <TeamOutlined className="text-blue-600" />
                  </div>
                  <Text>Hệ thống xét nghiệm và chẩn đoán hình ảnh tối tân</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-blue-600 mb-1">500</Title>
                  <Text>Giường bệnh</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-blue-600 mb-1">20</Title>
                  <Text>Phòng phẫu thuật</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-blue-600 mb-1">15</Title>
                  <Text>Chuyên khoa</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-blue-600 mb-1">24/7</Title>
                  <Text>Phục vụ</Text>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">
            Liên hệ với chúng tôi
          </Title>
          <Paragraph className="text-blue-100 text-lg mb-6">
            Để được tư vấn và hỗ trợ tốt nhất về các dịch vụ y tế
          </Paragraph>
          <Space size="large" className="flex justify-center">
            <Card className="p-4 border-none">
              <Text strong>📍 Địa chỉ:</Text>
              <br />
              <Text>123 Đường ABC, Quận 1, TP.HCM</Text>
            </Card>
            <Card className="p-4 border-none">
              <Text strong>📞 Hotline:</Text>
              <br />
              <Text>(028) 3999 8888</Text>
            </Card>
            <Card className="p-4 border-none">
              <Text strong>✉️ Email:</Text>
              <br />
              <Text>info@medcare.vn</Text>
            </Card>
          </Space>
        </div>
      </section>
    </div>
  )
} 