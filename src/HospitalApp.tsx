import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { HospitalHeader } from './components/HospitalLayout/Header'
import { HospitalFooter } from './components/HospitalLayout/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import { BlogPage } from './pages/BlogPage'
import { getStoredUser, isLoggedIn, clearTokens } from './services/authService'

const { Content } = Layout

export const HospitalApp = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập trước đó hay chưa
    const checkAuthStatus = () => {
      const user = getStoredUser()
      const loggedIn = isLoggedIn()
      
      if (user && loggedIn) {
        // Tự động chuyển đến dashboard nếu đã đăng nhập
        setCurrentPage('dashboard')
      } else if (user && !loggedIn) {
        // Nếu có user nhưng token hết hạn, xóa thông tin và về trang chủ
        clearTokens()
      }
      
      setLoading(false)
    }
    
    checkAuthStatus()
  }, [])

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  // Hiển thị loading trong khi kiểm tra auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'about':
        return <AboutPage />
      case 'services':
        return <Services />
      case 'blog':
        return <BlogPage />
      case 'contact':
        return <Contact />
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />
      default:
        return <HomePage />
    }
  }

  // Trang login và dashboard có layout riêng
  if (currentPage === 'login' || currentPage === 'dashboard') {
    return renderPage()
  }

  return (
    <Layout className="min-h-screen">
      <HospitalHeader currentPage={currentPage} onNavigate={handleNavigate} />
      <Content>
        {renderPage()}
      </Content>
      <HospitalFooter />
    </Layout>
  )
} 