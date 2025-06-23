import { Row, Col, Card, Form, Input, Button, Typography, Select, Timeline } from 'antd'
import { 
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SendOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input
const { Option } = Select

export const Contact = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Liên hệ:', values)
    // Handle contact form submission
  }

  const departments = [
    "Khoa Tim mạch",
    "Khoa Nội tổng hợp", 
    "Khoa Ngoại tổng hợp",
    "Sản phụ khoa",
    "Nhi khoa",
    "Khoa Mắt",
    "Cấp cứu",
    "Xét nghiệm",
    "Khác"
  ]

  const workingHours = [
    {
      title: "Khám bệnh",
      time: "7:00 - 22:00",
      days: "Thứ 2 - Chủ nhật",
      icon: <ClockCircleOutlined className="text-blue-500" />
    },
    {
      title: "Cấp cứu",
      time: "24/7",
      days: "Tất cả các ngày",
      icon: <PhoneOutlined className="text-red-500" />
    },
    {
      title: "Xét nghiệm",
      time: "6:00 - 20:00", 
      days: "Thứ 2 - Chủ nhật",
      icon: <MessageOutlined className="text-green-500" />
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4">
            Liên hệ với chúng tôi
          </Title>
          <Paragraph className="text-blue-100 text-lg max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
            Hãy liên hệ với MedCare Hospital qua các kênh thông tin dưới đây
          </Paragraph>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={6}>
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <PhoneOutlined className="text-2xl text-red-500 mb-2" />
                <Text strong className="block">Cấp cứu</Text>
                <Text className="text-red-600">(028) 3999 8888</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <PhoneOutlined className="text-2xl text-blue-500 mb-2" />
                <Text strong className="block">Tổng đài</Text>
                <Text className="text-blue-600">(028) 3999 9999</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <MailOutlined className="text-2xl text-green-500 mb-2" />
                <Text strong className="block">Email</Text>
                <Text className="text-green-600">info@medcare.vn</Text>
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Card className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <EnvironmentOutlined className="text-2xl text-purple-500 mb-2" />
                <Text strong className="block">Địa chỉ</Text>
                <Text className="text-purple-600">123 Đường ABC</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            {/* Contact Form */}
            <Col xs={24} lg={14}>
              <Card className="shadow-lg border-none">
                <Title level={3} className="text-blue-600 mb-6">
                  Gửi tin nhắn cho chúng tôi
                </Title>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  size="large"
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                      >
                        <Input 
                          prefix={<UserOutlined className="text-gray-400" />}
                          placeholder="Nhập họ và tên"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                      >
                        <Input 
                          prefix={<PhoneOutlined className="text-gray-400" />}
                          placeholder="Nhập số điện thoại"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email!' },
                          { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                      >
                        <Input 
                          prefix={<MailOutlined className="text-gray-400" />}
                          placeholder="Nhập địa chỉ email"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="department"
                        label="Chuyên khoa quan tâm"
                        rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa!' }]}
                      >
                        <Select placeholder="Chọn chuyên khoa">
                          {departments.map((dept, index) => (
                            <Option key={index} value={dept}>{dept}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                  >
                    <Input placeholder="Nhập tiêu đề tin nhắn" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Nội dung"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                  >
                    <TextArea 
                      rows={5}
                      placeholder="Nhập nội dung chi tiết..."
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      icon={<SendOutlined />}
                      size="large"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Gửi tin nhắn
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Contact Info & Map */}
            <Col xs={24} lg={10}>
              <div className="space-y-6">
                {/* Contact Details */}
                <Card className="shadow-lg border-none">
                  <Title level={4} className="text-blue-600 mb-4">
                    Thông tin liên hệ
                  </Title>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <EnvironmentOutlined className="text-blue-500 text-xl mt-1" />
                      <div>
                        <Text strong className="block">Địa chỉ:</Text>
                        <Text className="text-gray-600">
                          123 Đường ABC, Phường XYZ<br />
                          Quận 1, TP. Hồ Chí Minh
                        </Text>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <PhoneOutlined className="text-green-500 text-xl mt-1" />
                      <div>
                        <Text strong className="block">Điện thoại:</Text>
                        <Text className="text-gray-600">
                          Cấp cứu: (028) 3999 8888<br />
                          Tổng đài: (028) 3999 9999
                        </Text>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MailOutlined className="text-orange-500 text-xl mt-1" />
                      <div>
                        <Text strong className="block">Email:</Text>
                        <Text className="text-gray-600">
                          Tổng hợp: info@medcare.vn<br />
                          Hỗ trợ: support@medcare.vn
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Working Hours */}
                <Card className="shadow-lg border-none">
                  <Title level={4} className="text-blue-600 mb-4">
                    Thời gian làm việc
                  </Title>
                  
                  <Timeline>
                    {workingHours.map((item, index) => (
                      <Timeline.Item key={index} dot={item.icon}>
                        <div>
                          <Text strong className="block">{item.title}</Text>
                          <Text className="text-gray-600 block">{item.days}</Text>
                          <Text strong className="text-blue-600">{item.time}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>

                {/* Map Placeholder */}
                <Card className="shadow-lg border-none">
                  <Title level={4} className="text-blue-600 mb-4">
                    Vị trí bệnh viện
                  </Title>
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <EnvironmentOutlined className="text-4xl text-blue-500 mb-2" />
                      <Text className="text-gray-600">Bản đồ Google Maps</Text>
                      <br />
                      <Text className="text-gray-500 text-sm">
                        123 Đường ABC, Quận 1, TP.HCM
                      </Text>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
} 