import { useState } from 'react'
import { Layout, Menu, Button, Space, Drawer } from 'antd'
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  UserOutlined, 
  PhoneOutlined,
  MenuOutlined,
  MedicineBoxOutlined,
  EditOutlined,
  HeartOutlined
} from '@ant-design/icons'

const { Header: AntHeader } = Layout

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export const HospitalHeader = ({ currentPage, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: 'Giới thiệu',
    },
    {
      key: 'services',
      icon: <MedicineBoxOutlined />,
      label: 'Dịch vụ',
    },
    {
      key: 'blog',
      icon: <EditOutlined />,
      label: 'Blog',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    onNavigate(key)
    setMobileMenuOpen(false)
  }

  return (
    <AntHeader className="bg-white shadow-sm px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 border-b border-gray-200 h-20">
      {/* Logo - Professional */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-sm">
          <HeartOutlined className="text-white text-xl" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold text-gray-800 m-0 tracking-tight">
            GHSMS
          </h1>
          <p className="text-sm text-gray-500 m-0 font-medium -mt-1">
            Gender Healthcare Service Management
          </p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
        <Menu
          mode="horizontal"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none bg-transparent font-medium text-base"
          style={{ 
            lineHeight: '80px',
            minWidth: 'auto',
            flex: 'none'
          }}
        />
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center space-x-4">
        <Button 
          type={currentPage === 'contact' ? 'primary' : 'default'}
          icon={<PhoneOutlined />}
          onClick={() => onNavigate('contact')}
          className={
            currentPage === 'contact' 
              ? 'bg-green-600 border-green-600 shadow-sm hover:bg-green-700 font-medium' 
              : 'border border-green-600 text-green-600 hover:bg-green-50 font-medium'
          }
          size="middle"
        >
          Liên hệ
        </Button>
        
        <Button 
          type="primary" 
          icon={<UserOutlined />}
          onClick={() => onNavigate('login')}
          className="bg-purple-600 border-purple-600 shadow-sm hover:bg-purple-700 font-medium px-6"
          size="middle"
        >
          <span className="hidden xl:inline ml-1">Đăng nhập</span>
        </Button>
      </div>

      {/* Medium Screen Menu (md to lg) */}
      <div className="hidden md:flex lg:hidden items-center space-x-4">
        <Menu
          mode="horizontal"
          selectedKeys={[currentPage]}
          items={menuItems.map(item => ({
            ...item,
            label: item.icon
          }))}
          onClick={handleMenuClick}
          className="border-none bg-transparent"
          style={{ lineHeight: '80px' }}
        />
        
        <Button 
          type={currentPage === 'contact' ? 'primary' : 'default'}
          icon={<PhoneOutlined />}
          onClick={() => onNavigate('contact')}
          className={
            currentPage === 'contact' 
              ? 'bg-green-600 border-green-600 shadow-sm hover:bg-green-700' 
              : 'border border-green-600 text-green-600 hover:bg-green-50'
          }
          size="small"
          title="Liên hệ"
        />
        
        <Button 
          type="primary" 
          icon={<UserOutlined />}
          onClick={() => onNavigate('login')}
          className="bg-purple-600 border-purple-600 shadow-sm hover:bg-purple-700"
          size="small"
        />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center space-x-3">
        <Button 
          type={currentPage === 'contact' ? 'primary' : 'default'}
          icon={<PhoneOutlined />}
          onClick={() => onNavigate('contact')}
          className={
            currentPage === 'contact' 
              ? 'bg-green-600 border-green-600 hover:bg-green-700' 
              : 'border border-green-600 text-green-600'
          }
          size="small"
          title="Liên hệ"
        />
        
        <Button 
          type="text" 
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          className="text-gray-600 hover:text-purple-600 hover:bg-purple-50"
          size="large"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <HeartOutlined className="text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-800 text-lg">GHSMS</span>
              <p className="text-sm text-gray-500 m-0">Gender Healthcare</p>
            </div>
          </div>
        }
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={320}
        className="font-medium"
      >
        <div className="py-4">
          <Menu
            mode="vertical"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none mb-8"
          />
          
          <div className="space-y-3">
            <Button 
              type={currentPage === 'contact' ? 'primary' : 'default'}
              icon={<PhoneOutlined />}
              block
              onClick={() => {
                onNavigate('contact')
                setMobileMenuOpen(false)
              }}
              className={
                currentPage === 'contact' 
                  ? 'bg-green-600 border-green-600 shadow-sm hover:bg-green-700 h-12' 
                  : 'border border-green-600 text-green-600 hover:bg-green-50 h-12'
              }
              size="large"
            >
              Liên hệ tư vấn
            </Button>
            
            <Button 
              type="primary" 
              icon={<UserOutlined />}
              block
              onClick={() => {
                onNavigate('login')
                setMobileMenuOpen(false)
              }}
              className="bg-purple-600 border-purple-600 shadow-sm hover:bg-purple-700 h-12"
              size="large"
            >
              Đăng nhập hệ thống
            </Button>
          </div>
        </div>
      </Drawer>
    </AntHeader>
  )
} 