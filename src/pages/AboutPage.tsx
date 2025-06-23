import { Row, Col, Card, Typography, Timeline, Avatar, Space } from 'antd'
import { 
  MedicineBoxOutlined,
  TeamOutlined,
  SafetyOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  WomanOutlined,
  ManOutlined,
  DatabaseOutlined,
  ScheduleOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export const AboutPage = () => {
  const achievements = [
    {
      year: "2018",
      title: "Khởi tạo dự án GHSMS",
      description: "Bắt đầu nghiên cứu và phát triển hệ thống quản lý y tế theo giới tính"
    },
    {
      year: "2020", 
      title: "Phiên bản thử nghiệm",
      description: "Ra mắt phiên bản beta với 2 cơ sở y tế tham gia thử nghiệm"
    },
    {
      year: "2021",
      title: "Mở rộng dịch vụ",
      description: "Tích hợp AI và machine learning để cá nhân hóa dịch vụ chăm sóc"
    },
    {
      year: "2023",
      title: "Chuẩn hóa quốc tế",
      description: "Đạt chứng nhận ISO 27001 về bảo mật thông tin y tế"
    },
    {
      year: "2025",
      title: "Hệ thống hoàn chỉnh",
      description: "Triển khai toàn diện với 50+ cơ sở y tế và 100,000+ người dùng"
    }
  ]

  const experts = [
    {
      name: "TS. Nguyễn Thị Hương",
      position: "Trưởng nhóm phát triển - Chuyên gia Sức khỏe Phụ nữ",
      experience: "15 năm kinh nghiệm",
      education: "Tiến sĩ Y học - Đại học Harvard"
    },
    {
      name: "TS. Lê Văn Minh", 
      position: "Giám đốc Công nghệ - Chuyên gia AI trong Y tế",
      experience: "12 năm kinh nghiệm",
      education: "Tiến sĩ Tin học Y tế - Stanford University"
    },
    {
      name: "BS.CKI Trần Hồng Sơn",
      position: "Chuyên gia Sức khỏe Nam giới",
      experience: "18 năm kinh nghiệm", 
      education: "Thạc sĩ Y học - Đại học Y Dược TPHCM"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            Về GHSMS
          </Title>
          <Paragraph className="text-purple-100 text-lg max-w-3xl mx-auto">
            Gender Healthcare Service Management System - Nền tảng tiên tiến trong quản lý 
            dịch vụ y tế theo giới tính với công nghệ AI và bảo mật thông tin hàng đầu
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
                <Title level={3} className="text-purple-600">Sứ mệnh</Title>
                <Paragraph className="text-gray-600">
                  Cung cấp hệ thống quản lý y tế chuyên biệt theo giới tính, 
                  đảm bảo chăm sóc sức khỏe cá nhân hóa và hiệu quả cao
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full text-center border-none shadow-lg">
                <TrophyOutlined className="text-5xl text-yellow-500 mb-4" />
                <Title level={3} className="text-purple-600">Tầm nhìn</Title>
                <Paragraph className="text-gray-600">
                  Trở thành hệ thống quản lý y tế hàng đầu thế giới trong lĩnh vực 
                  chăm sóc sức khỏe phân biệt theo giới tính
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full text-center border-none shadow-lg">
                <SafetyOutlined className="text-5xl text-green-500 mb-4" />
                <Title level={3} className="text-purple-600">Giá trị cốt lõi</Title>
                <Paragraph className="text-gray-600">
                  Bảo mật - Chính xác - Cá nhân hóa - Hiệu quả. 
                  Luôn ưu tiên quyền riêng tư và nhu cầu đặc thù của từng giới tính
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
              Hành trình 7 năm nghiên cứu và phát triển hệ thống quản lý y tế theo giới tính
            </Paragraph>
          </div>
          
          <Timeline mode="alternate">
            {achievements.map((item, index) => (
              <Timeline.Item 
                key={index}
                dot={<DatabaseOutlined className="text-purple-600" />}
              >
                <Card className="shadow-md border-none">
                  <Title level={4} className="text-purple-600 mb-2">{item.year}</Title>
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
            <Title level={2}>Đội ngũ chuyên gia</Title>
            <Paragraph className="text-gray-600 text-lg">
              Những chuyên gia hàng đầu trong lĩnh vực y tế theo giới tính và công nghệ
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {experts.map((expert, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="text-center border-none shadow-lg">
                  <Avatar 
                    size={100} 
                    icon={index === 0 ? <WomanOutlined /> : index === 1 ? <UserOutlined /> : <ManOutlined />}
                    className={`mb-4 ${index === 0 ? 'bg-pink-600' : index === 1 ? 'bg-purple-600' : 'bg-blue-600'}`}
                  />
                  <Title level={4} className="mb-2">{expert.name}</Title>
                  <Text className="text-purple-600 block mb-2">{expert.position}</Text>
                  <Text className="text-gray-600 block mb-1">{expert.experience}</Text>
                  <Text className="text-gray-500 text-sm">{expert.education}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* System Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2}>Tính năng hệ thống</Title>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <WomanOutlined className="text-purple-600" />
                  </div>
                  <Text>Quản lý chuyên biệt cho sức khỏe phụ nữ</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <ManOutlined className="text-purple-600" />
                  </div>
                  <Text>Dịch vụ tối ưu cho nam giới</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <DatabaseOutlined className="text-purple-600" />
                  </div>
                  <Text>Hồ sơ sức khỏe điện tử an toàn</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <ScheduleOutlined className="text-purple-600" />
                  </div>
                  <Text>AI hỗ trợ đặt lịch thông minh</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <SafetyOutlined className="text-purple-600" />
                  </div>
                  <Text>Bảo mật dữ liệu chuẩn quốc tế</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-purple-600 mb-1">100K+</Title>
                  <Text>Người dùng</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-purple-600 mb-1">50+</Title>
                  <Text>Cơ sở y tế</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-purple-600 mb-1">12</Title>
                  <Text>Dịch vụ chuyên biệt</Text>
                </Card>
                <Card className="text-center border-none shadow-md">
                  <Title level={3} className="text-purple-600 mb-1">24/7</Title>
                  <Text>Hỗ trợ</Text>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-4">
            Liên hệ với chúng tôi
          </Title>
          <Paragraph className="text-purple-100 text-lg mb-6">
            Để được tư vấn và hỗ trợ tốt nhất về hệ thống quản lý y tế
          </Paragraph>
          <Space size="large" className="flex justify-center">
            <Card className="p-4 border-none">
              <Text strong>Địa chỉ:</Text>
              <br />
              <Text>123 Đường ABC, Quận 1, TP.HCM</Text>
            </Card>
            <Card className="p-4 border-none">
              <Text strong>Hotline:</Text>
              <br />
              <Text>(028) 3999 8888</Text>
            </Card>
            <Card className="p-4 border-none">
              <Text strong>Email:</Text>
              <br />
              <Text>support@ghsms.vn</Text>
            </Card>
          </Space>
        </div>
      </section>
    </div>
  )
} 