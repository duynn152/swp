import { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Input, Button, Typography, Checkbox, Divider, DatePicker, Select, message } from 'antd'
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  IdcardOutlined,
  ArrowLeftOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { loginUser, registerUser, storeTokens, storeUser, saveLoginCredentials, getSavedUsername } from '../services/authService'

const { Title, Text, Link } = Typography
const { Option } = Select

interface LoginPageProps {
  onNavigate?: (page: string) => void
}

export const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Auto-fill saved username when component mounts
  useEffect(() => {
    const savedUsername = getSavedUsername()
    console.log('🔍 Debug auto-fill:', { savedUsername, isLogin })
    
    if (savedUsername && isLogin) {
      console.log('✅ Setting form values:', { usernameOrEmail: savedUsername, rememberMe: true })
      loginForm.setFieldsValue({
        usernameOrEmail: savedUsername,
        rememberMe: true // Also set remember me to true if we have saved username
      })
    }
  }, [isLogin, loginForm])

  const onLoginFinish = async (values: { usernameOrEmail: string; password: string; rememberMe?: boolean }) => {
    setLoading(true)
    try {
      const response = await loginUser({
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
        rememberMe: values.rememberMe || false
      })
      
      // Lưu login credentials nếu remember me được chọn
      saveLoginCredentials(values.usernameOrEmail, values.rememberMe || false)
      
      // Lưu tokens và user info với remember me flag
      storeTokens(response.accessToken, response.refreshToken, values.rememberMe || false)
      storeUser(response.user, values.rememberMe || false)
      
      message.success('Đăng nhập thành công!')
      
      // Chuyển tới dashboard
      onNavigate?.('dashboard')
    } catch (error: any) {
      message.error(error.message || 'Đăng nhập thất bại!')
    } finally {
      setLoading(false)
    }
  }

  const onRegisterFinish = async (values: any) => {
    setLoading(true)
    try {
      const registerData = {
        username: values.username,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD'),
        gender: values.gender,
        role: 'PATIENT' as const // Mặc định là PATIENT
      }

      await registerUser(registerData)
      
      message.success('Đăng ký thành công! Vui lòng đăng nhập.')
      
      // Chuyển về form đăng nhập
      setIsLogin(true)
      registerForm.resetFields()
    } catch (error: any) {
      message.error(error.message || 'Đăng ký thất bại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12">
      {/* Back to Home Button */}
      {onNavigate && (
        <div className="fixed top-4 left-4 z-10">
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => onNavigate('home')}
            className="shadow-lg"
          >
            Về trang chủ
          </Button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 w-full">
        <Row gutter={[32, 32]} align="middle">
          {/* Left side - Forms */}
          <Col xs={24} md={12} lg={10}>
            <Card className="shadow-2xl border-none">
              <div className="text-center mb-8">
                {/* Logo - clickable to home */}
                <div 
                  className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={() => onNavigate?.('home')}
                >
                  <MedicineBoxOutlined className="text-white text-2xl" />
                </div>
                <Title level={2} className="text-blue-600 mb-2">
                  {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                </Title>
                <Text className="text-gray-500">
                  {isLogin ? 'Truy cập hệ thống MedCare Hospital' : 'Tạo tài khoản mới'}
                </Text>
              </div>

              {isLogin ? (
                // Login Form
                <Form
                  form={loginForm}
                  name="login"
                  onFinish={onLoginFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="usernameOrEmail"
                    label="Tên đăng nhập / Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập tên đăng nhập!' }
                    ]}
                  >
                    <Input 
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="Nhập tên đăng nhập hoặc email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu!' }
                    ]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder="Nhập mật khẩu"
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="flex justify-between items-center">
                      <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                      </Form.Item>
                      <Link className="text-blue-600">Quên mật khẩu?</Link>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block
                      className="bg-blue-600 hover:bg-blue-700 h-12"
                      loading={loading}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                // Register Form
                <Form
                  form={registerForm}
                  name="register"
                  onFinish={onRegisterFinish}
                  layout="vertical"
                  size="large"
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[
                          { required: true, message: 'Vui lòng nhập họ tên!' }
                        ]}
                      >
                        <Input 
                          prefix={<UserOutlined className="text-gray-400" />}
                          placeholder="Nhập họ và tên"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[
                          { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                          { min: 3, message: 'Tên đăng nhập tối thiểu 3 ký tự!' }
                        ]}
                      >
                        <Input 
                          prefix={<IdcardOutlined className="text-gray-400" />}
                          placeholder="Nhập tên đăng nhập"
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
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại!' },
                          { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
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
                        name="dateOfBirth"
                        label="Ngày sinh"
                        rules={[
                          { required: true, message: 'Vui lòng chọn ngày sinh!' }
                        ]}
                      >
                        <DatePicker 
                          placeholder="Chọn ngày sinh"
                          style={{ width: '100%' }}
                          format="DD/MM/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[
                          { required: true, message: 'Vui lòng chọn giới tính!' }
                        ]}
                      >
                        <Select placeholder="Chọn giới tính">
                          <Option value="MALE">Nam</Option>
                          <Option value="FEMALE">Nữ</Option>
                          <Option value="OTHER">Khác</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                          { required: true, message: 'Vui lòng nhập mật khẩu!' },
                          { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' }
                        ]}
                      >
                        <Input.Password 
                          prefix={<LockOutlined className="text-gray-400" />}
                          placeholder="Nhập mật khẩu"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        dependencies={['password']}
                        rules={[
                          { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                              }
                              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                            },
                          }),
                        ]}
                      >
                        <Input.Password 
                          prefix={<LockOutlined className="text-gray-400" />}
                          placeholder="Nhập lại mật khẩu"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      { 
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản!'))
                      }
                    ]}
                  >
                    <Checkbox>
                      Tôi đồng ý với <Link className="text-blue-600">Điều khoản sử dụng</Link> và{' '}
                      <Link className="text-blue-600">Chính sách bảo mật</Link>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      block
                      className="bg-blue-600 hover:bg-blue-700 h-12"
                      loading={loading}
                    >
                      Đăng ký tài khoản
                    </Button>
                  </Form.Item>
                </Form>
              )}

              <Divider />

              <div className="text-center">
                <Text className="text-gray-500">
                  {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                  <Link 
                    className="text-blue-600 ml-1"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                  </Link>
                </Text>
              </div>
            </Card>
          </Col>

          {/* Right side - Hospital Info */}
          <Col xs={24} md={12} lg={14}>
            <div className="text-center md:text-left">
              <Title level={1} className="text-blue-600 mb-4">
                Chào mừng đến với <br />
                <span className="text-blue-800">MedCare Hospital</span>
              </Title>
              
              <Text className="text-gray-600 text-lg block mb-8">
                {isLogin 
                  ? 'Hệ thống quản lý bệnh viện hiện đại với đầy đủ các tính năng hỗ trợ bác sĩ, điều dưỡng và quản trị viên.'
                  : 'Tạo tài khoản để trải nghiệm các dịch vụ y tế chất lượng cao tại MedCare Hospital.'
                }
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-blue-600 shadow-md">
                  <Title level={4} className="text-blue-600 mb-2">Bệnh nhân</Title>
                  <Text className="text-gray-600">
                    • Đặt lịch khám online<br />
                    • Xem kết quả xét nghiệm<br />
                    • Lịch sử khám bệnh<br />
                    • Thanh toán trực tuyến
                  </Text>
                </Card>

                <Card className="border-l-4 border-l-green-600 shadow-md">
                  <Title level={4} className="text-green-600 mb-2">Nhân viên y tế</Title>
                  <Text className="text-gray-600">
                    • Quản lý lịch khám<br />
                    • Hồ sơ bệnh án điện tử<br />
                    • Kê đơn thuốc<br />
                    • Báo cáo y tế
                  </Text>
                </Card>

                <Card className="border-l-4 border-l-orange-600 shadow-md">
                  <Title level={4} className="text-orange-600 mb-2">Dịch vụ 24/7</Title>
                  <Text className="text-gray-600">
                    • Cấp cứu 24/7<br />
                    • Tư vấn trực tuyến<br />
                    • Hỗ trợ kỹ thuật<br />
                    • Chăm sóc khách hàng
                  </Text>
                </Card>

                <Card className="border-l-4 border-l-purple-600 shadow-md">
                  <Title level={4} className="text-purple-600 mb-2">Chất lượng</Title>
                  <Text className="text-gray-600">
                    • Đội ngũ bác sĩ giàu kinh nghiệm<br />
                    • Trang thiết bị hiện đại<br />
                    • Tiêu chuẩn quốc tế<br />
                    • An toàn bệnh nhân
                  </Text>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl">
                <Title level={4} className="text-blue-600 mb-3">Liên hệ hỗ trợ</Title>
                <div className="space-y-2">
                  <Text>📞 Hotline: <strong>(028) 3999 8888</strong></Text>
                  <Text>💬 Email: <strong>support@medcare.vn</strong></Text>
                  <Text>🕒 Thời gian: <strong>24/7 - Cả tuần</strong></Text>
                  <Text>📍 Địa chỉ: <strong>123 Đường ABC, Quận 1, TP.HCM</strong></Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
} 