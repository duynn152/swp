import { useState } from 'react'
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

const { Content } = Layout

export const HospitalApp = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
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