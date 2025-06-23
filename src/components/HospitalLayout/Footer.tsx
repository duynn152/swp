import { Layout, Row, Col, Space, Typography } from 'antd'
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  WomanOutlined,
  ManOutlined,
  ScheduleOutlined,
  DatabaseOutlined,
  SafetyOutlined
} from '@ant-design/icons'

const { Footer: AntFooter } = Layout
const { Title, Text } = Typography

export const HospitalFooter = () => {
  return (
    <AntFooter className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Row gutter={[32, 32]}>
          {/* Logo & Info */}
          <Col xs={24} md={8}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <HeartOutlined className="text-white text-2xl" />
              </div>
              <div>
                <Title level={4} className="text-white m-0 font-bold">GHSMS</Title>
                <Text className="text-purple-300 font-medium">Gender Healthcare Service Management</Text>
              </div>
            </div>
            <Text className="text-gray-300 leading-relaxed">
              Hệ thống quản lý dịch vụ y tế tiên tiến, được thiết kế đặc biệt để 
              cung cấp dịch vụ chăm sóc sức khỏe cá nhân hóa theo giới tính với 
              công nghệ hiện đại và đội ngũ chuyên gia giàu kinh nghiệm.
            </Text>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={8}>
            <Title level={5} className="text-white mb-6 font-semibold">Thông tin liên hệ</Title>
            <Space direction="vertical" className="w-full" size="middle">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <EnvironmentOutlined className="text-purple-400" />
                </div>
                <Text className="text-gray-300">
                  123 Đường ABC, Quận 1, TP.HCM
                </Text>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <PhoneOutlined className="text-green-400" />
                </div>
                <div>
                  <Text className="text-gray-300 block">
                    Phụ nữ: (028) 3999 1111
                  </Text>
                  <Text className="text-gray-300 block">
                    Nam giới: (028) 3999 2222
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <MailOutlined className="text-blue-400" />
                </div>
                <Text className="text-gray-300">
                  support@ghsms.vn
                </Text>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ClockCircleOutlined className="text-orange-400" />
                </div>
                <Text className="text-gray-300">
                  24/7 - Hỗ trợ liên tục
                </Text>
              </div>
            </Space>
          </Col>

          {/* Services */}
          <Col xs={24} md={8}>
            <Title level={5} className="text-white mb-6 font-semibold">Dịch vụ chuyên biệt</Title>
            <Space direction="vertical" className="w-full" size="small">
              <div className="flex items-center space-x-2">
                <WomanOutlined className="text-pink-400" />
                <Text className="text-gray-300">Chăm sóc sức khỏe phụ nữ</Text>
              </div>
              <div className="flex items-center space-x-2">
                <ManOutlined className="text-blue-400" />
                <Text className="text-gray-300">Chăm sóc sức khỏe nam giới</Text>
              </div>
              <div className="flex items-center space-x-2">
                <ScheduleOutlined className="text-green-400" />
                <Text className="text-gray-300">Quản lý lịch hẹn thông minh</Text>
              </div>
              <div className="flex items-center space-x-2">
                <DatabaseOutlined className="text-orange-400" />
                <Text className="text-gray-300">Hồ sơ sức khỏe điện tử</Text>
              </div>
              <div className="flex items-center space-x-2">
                <SafetyOutlined className="text-purple-400" />
                <Text className="text-gray-300">Bảo mật thông tin tuyệt đối</Text>
              </div>
              <div className="flex items-center space-x-2">
                <HeartOutlined className="text-red-400" />
                <Text className="text-gray-300">Tư vấn chuyên nghiệp</Text>
              </div>
            </Space>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <Text className="text-gray-400">
            © 2025 Gender Healthcare Service Management System. All rights reserved.
          </Text>
          <br />
          <Text className="text-gray-500 text-sm mt-2">
            Phát triển bởi SWP Team | Thiết kế hiện đại & Bảo mật cao
          </Text>
        </div>
      </div>
    </AntFooter>
  )
} 