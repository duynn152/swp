import { useState } from 'react'
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Typography,
  Select,
  Tag,
  Upload,
  Divider,
  Alert,
  Progress,
  Badge,
  Row,
  Col,
} from 'antd'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons'
import { 
  useUsers, 
  useCreateUser, 
  useUpdateUser, 
  useDeleteUser,
  useActivateUser,
  useDeactivateUser
} from '../hooks/useUsers'
import type { User, CreateUserRequest, UpdateUserRequest, UserRole } from '../services/userService'
import { getAccessToken } from '../services/authService'
import * as XLSX from 'xlsx'

const { Title, Text } = Typography
const { Option } = Select
const { confirm } = Modal
const { Dragger } = Upload

interface ExcelUser {
  username: string
  email: string
  fullName: string
  password: string
  role: UserRole
  isValid: boolean
  errors: string[]
}

export const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [excelData, setExcelData] = useState<ExcelUser[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [form] = Form.useForm()

  // New states for search and filter functionality
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')

  // Queries and mutations
  const { data: users, isLoading, refetch: refetchUsers } = useUsers()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()
  const activateUserMutation = useActivateUser()
  const deactivateUserMutation = useDeactivateUser()

  // Role options for the select dropdown
  const roleOptions = [
    { value: 'PATIENT', label: 'Bệnh nhân', color: 'orange' },
    { value: 'DOCTOR', label: 'Bác sĩ', color: 'blue' },
    { value: 'STAFF', label: 'Nhân viên', color: 'green' },
    { value: 'ADMIN', label: 'Quản trị viên', color: 'red' },
  ]

  const getRoleLabel = (role: UserRole) => {
    const roleOption = roleOptions.find(option => option.value === role)
    return roleOption?.label || role
  }

  const getRoleColor = (role: UserRole) => {
    const roleOption = roleOptions.find(option => option.value === role)
    return roleOption?.color || 'default'
  }

  // Search and filter functions
  const getFilteredUsers = () => {
    if (!users) return []

    return users.filter(user => {
      // Search filter
      const searchLower = searchText.toLowerCase()
      const matchesSearch = !searchText || 
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.fullName.toLowerCase().includes(searchLower)

      // Role filter
      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter

      // Status filter
      const matchesStatus = statusFilter === 'ALL' || 
        (statusFilter === 'ACTIVE' && user.isActive) ||
        (statusFilter === 'INACTIVE' && !user.isActive)

      return matchesSearch && matchesRole && matchesStatus
    })
  }

  const handleClearFilters = () => {
    setSearchText('')
    setRoleFilter('ALL')
    setStatusFilter('ALL')
    message.success('Filters cleared!')
  }

  const handleActivateUser = async (userId: number) => {
    try {
      await activateUserMutation.mutateAsync(userId)
      message.success('User activated successfully!')
    } catch (error) {
      message.error('Failed to activate user')
    }
  }

  const handleDeactivateUser = async (userId: number, userRole: UserRole) => {
    // Prevent deactivating admin accounts
    if (userRole === 'ADMIN') {
      message.error('Admin accounts cannot be deactivated!')
      return
    }

    try {
      await deactivateUserMutation.mutateAsync(userId)
      message.success('User deactivated successfully!')
    } catch (error) {
      message.error('Failed to deactivate user')
    }
  }

  const validateExcelUser = (userData: any): ExcelUser => {
    const errors: string[] = []
    
    // Validate required fields
    if (!userData.username || typeof userData.username !== 'string') {
      errors.push('Username is required')
    }
    if (!userData.email || typeof userData.email !== 'string') {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Invalid email format')
    }
    if (!userData.fullName || typeof userData.fullName !== 'string') {
      errors.push('Full name is required')
    }
    if (!userData.password || typeof userData.password !== 'string') {
      errors.push('Password is required')
    }
    if (!userData.role || !['PATIENT', 'DOCTOR', 'STAFF', 'ADMIN'].includes(userData.role)) {
      errors.push('Valid role is required (PATIENT, DOCTOR, STAFF, ADMIN)')
    }

    return {
      username: userData.username || '',
      email: userData.email || '',
      fullName: userData.fullName || '',
      password: userData.password || '',
      role: userData.role || 'PATIENT',
      isValid: errors.length === 0,
      errors
    }
  }

  const handleExcelUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        const validatedData = jsonData.map((row: any) => validateExcelUser(row))
        setExcelData(validatedData)
        setIsExcelModalOpen(true)
      } catch (error) {
        message.error('Failed to parse Excel file. Please check the format.')
      }
    }
    reader.readAsBinaryString(file)
    return false // Prevent default upload
  }

  const handleBulkImport = async () => {
    const validUsers = excelData.filter(user => user.isValid)
    if (validUsers.length === 0) {
      message.error('No valid users to import')
      return
    }

    setIsImporting(true)
    setImportProgress(0)

    try {
      let successCount = 0
      for (let i = 0; i < validUsers.length; i++) {
        const user = validUsers[i]
        try {
          await createUserMutation.mutateAsync({
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            password: user.password,
            role: user.role,
          })
          successCount++
        } catch (error) {
          console.error(`Failed to create user ${user.username}:`, error)
        }
        setImportProgress(((i + 1) / validUsers.length) * 100)
      }

      message.success(`Successfully imported ${successCount} of ${validUsers.length} users`)
      setIsExcelModalOpen(false)
      setExcelData([])
    } catch (error) {
      message.error('Import failed')
    } finally {
      setIsImporting(false)
      setImportProgress(0)
    }
  }

  const downloadTemplate = () => {
    const template = [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        fullName: 'John Doe',
        password: 'password123',
        role: 'PATIENT'
      },
      {
        username: 'jane_doctor',
        email: 'jane.doctor@hospital.com',
        fullName: 'Dr. Jane Smith',
        password: 'doctorpass',
        role: 'DOCTOR'
      }
    ]

    const ws = XLSX.utils.json_to_sheet(template)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Users')
    XLSX.writeFile(wb, 'user_import_template.xlsx')
    message.success('Template downloaded successfully')
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    form.resetFields()
    // Set default role to PATIENT
    form.setFieldsValue({ role: 'PATIENT' })
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })
    setIsModalOpen(true)
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserMutation.mutateAsync(userId)
      message.success('User deleted successfully!')
    } catch (error) {
      message.error('Failed to delete user')
    }
  }

  const handleBulkDelete = () => {
    console.log('handleBulkDelete called with selectedUserIds:', selectedUserIds)
    
    if (selectedUserIds.length === 0) {
      message.warning('Please select users to delete')
      return
    }

    console.log('About to show delete confirm dialog')
    
    // Use native browser confirm instead of Modal.confirm
    const userConfirmed = window.confirm(
      `Delete Selected Users\n\nAre you sure you want to delete ${selectedUserIds.length} selected user(s)? This action cannot be undone.\n\nClick OK to delete, Cancel to abort.`
    )
    
    if (userConfirmed) {
      console.log('✅ User confirmed deletion! Starting delete process...')
      
      const executeDelete = async () => {
        try {
          let successCount = 0
          for (const userId of selectedUserIds) {
            try {
              console.log('Deleting user:', userId)
              await deleteUserMutation.mutateAsync(userId)
              successCount++
            } catch (error) {
              console.error(`Failed to delete user ${userId}:`, error)
            }
          }
          message.success(`${successCount} user(s) deleted successfully!`)
          setSelectedUserIds([])
          
          // Force refresh the user list
          console.log('Force refreshing user list after delete...')
          await refetchUsers()
          console.log('User list refreshed successfully after delete')
        } catch (error) {
          console.error('Bulk delete error:', error)
          message.error('Failed to delete some users')
        }
      }
      
      executeDelete()
    } else {
      console.log('❌ User cancelled deletion')
    }
    
    console.log('Delete confirm process completed')
  }

  const handleBulkActivate = async () => {
    console.log('handleBulkActivate called with selectedUserIds:', selectedUserIds)
    
    if (selectedUserIds.length === 0) {
      message.warning('Please select users to activate')
      return
    }

    const selectedUsers = users?.filter(user => selectedUserIds.includes(user.id)) || []
    console.log('Selected users:', selectedUsers)
    
    const inactiveUsers = selectedUsers.filter(user => !user.isActive)
    console.log('Inactive users to activate:', inactiveUsers)

    if (inactiveUsers.length === 0) {
      message.warning('No inactive users selected')
      return
    }

    try {
      let successCount = 0
      for (const user of inactiveUsers) {
        try {
          console.log('Activating user:', user.id, user.username)
          await activateUserMutation.mutateAsync(user.id)
          successCount++
        } catch (error) {
          console.error(`Failed to activate user ${user.username}:`, error)
        }
      }
      message.success(`${successCount} user(s) activated successfully!`)
      setSelectedUserIds([])
    } catch (error) {
      console.error('Bulk activate error:', error)
      message.error('Failed to activate some users')
    }
  }

  const handleBulkDeactivate = () => {
    console.log('handleBulkDeactivate called with selectedUserIds:', selectedUserIds)
    
    if (selectedUserIds.length === 0) {
      message.warning('Please select users to deactivate')
      return
    }

    const selectedUsers = users?.filter(user => selectedUserIds.includes(user.id)) || []
    console.log('Selected users:', selectedUsers)
    
    const activeUsers = selectedUsers.filter(user => user.isActive)
    const adminUsers = activeUsers.filter(user => user.role === 'ADMIN')
    const nonAdminActiveUsers = activeUsers.filter(user => user.role !== 'ADMIN')

    console.log('Active users:', activeUsers)
    console.log('Admin users:', adminUsers)
    console.log('Non-admin active users:', nonAdminActiveUsers)

    if (activeUsers.length === 0) {
      message.warning('No active users selected')
      return
    }

    if (adminUsers.length > 0 && nonAdminActiveUsers.length === 0) {
      message.error('Cannot deactivate admin accounts!')
      return
    }

    const confirmContent = adminUsers.length > 0 
      ? `${nonAdminActiveUsers.length} user(s) will be deactivated. ${adminUsers.length} admin account(s) will be skipped.`
      : `Are you sure you want to deactivate ${nonAdminActiveUsers.length} selected user(s)?`

    console.log('About to show confirm modal with content:', confirmContent)
    
    // Test with native browser confirm instead of Modal.confirm
    const userConfirmed = window.confirm(
      `Deactivate Selected Users\n\n${confirmContent}\n\nClick OK to deactivate, Cancel to abort.`
    )
    
    if (userConfirmed) {
      console.log('✅ User confirmed! Starting deactivation process...')
      // Execute deactivation
      const executeDeactivation = async () => {
        try {
          let successCount = 0
          for (const user of nonAdminActiveUsers) {
            try {
              console.log('Deactivating user:', user.id, user.username)
              const result = await deactivateUserMutation.mutateAsync(user.id)
              console.log('Deactivation result:', result)
              successCount++
            } catch (error) {
              console.error(`Failed to deactivate user ${user.username}:`, error)
            }
          }
          
          let resultMessage = `${successCount} user(s) deactivated successfully!`
          if (adminUsers.length > 0) {
            resultMessage += ` ${adminUsers.length} admin account(s) were skipped.`
          }
          
          message.success(resultMessage)
          setSelectedUserIds([])
          
          // Force refresh the user list
          console.log('Force refreshing user list...')
          await refetchUsers()
          console.log('User list refreshed successfully')
        } catch (error) {
          console.error('Bulk deactivate error:', error)
          message.error('Failed to deactivate some users')
        }
      }
      
      executeDeactivation()
    } else {
      console.log('❌ User cancelled deactivation')
    }
    
    console.log('Confirm process completed')
  }

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        // Update user
        const updateData: UpdateUserRequest = {
          username: values.username,
          email: values.email,
          fullName: values.fullName,
          role: values.role,
        }
        if (values.password) {
          updateData.password = values.password
        }
        await updateUserMutation.mutateAsync({
          userId: editingUser.id,
          userData: updateData,
        })
        message.success('User updated successfully!')
      } else {
        // Create user
        const createData: CreateUserRequest = {
          username: values.username,
          email: values.email,
          fullName: values.fullName,
          password: values.password,
          role: values.role,
        }
        await createUserMutation.mutateAsync(createData)
        message.success('User created successfully!')
      }
      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      message.error(editingUser ? 'Failed to update user' : 'Failed to create user')
    }
  }

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys: selectedUserIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      const newSelectedIds = selectedRowKeys.map(key => Number(key))
      console.log('Selected row keys:', selectedRowKeys)
      console.log('Converted to numbers:', newSelectedIds)
      setSelectedUserIds(newSelectedIds)
    },
    onSelectAll: (selected: boolean, selectedRows: User[], changeRows: User[]) => {
      console.log('Select all triggered:', selected, selectedRows)
      if (selected) {
        const allIds = users?.map(user => user.id) || []
        console.log('Setting all IDs:', allIds)
        setSelectedUserIds(allIds)
      } else {
        console.log('Clearing all selections')
        setSelectedUserIds([])
      }
    },
    onSelect: (record: User, selected: boolean, selectedRows: User[]) => {
      console.log('Individual select:', record.id, selected)
    },
  }

  // Excel preview table columns
  const excelColumns = [
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (_: any, record: ExcelUser) => (
        record.isValid ? 
          <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
          <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>
          {getRoleLabel(role)}
        </Tag>
      ),
    },
    {
      title: 'Errors',
      key: 'errors',
      render: (_: any, record: ExcelUser) => (
        record.errors.length > 0 ? (
          <div>
            {record.errors.map((error, index) => (
              <div key={index} className="text-red-500 text-xs">{error}</div>
            ))}
          </div>
        ) : (
          <span className="text-green-500 text-xs">Valid</span>
        )
      ),
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a: User, b: User) => a.id - b.id,
      defaultSortOrder: 'ascend' as const,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: User, b: User) => a.username.localeCompare(b.username),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a: User, b: User) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a: User, b: User) => a.role.localeCompare(b.role),
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>
          {getRoleLabel(role)}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      sorter: (a: User, b: User) => Number(a.isActive) - Number(b.isActive),
      render: (isActive: boolean) => (
        <Badge 
          status={isActive ? 'success' : 'error'} 
          text={isActive ? 'Active' : 'Inactive'} 
        />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: User, b: User) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: User) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEditUser(record)}
          size="small"
        >
          Edit
        </Button>
      ),
    },
  ]

  const validUsersCount = excelData.filter(user => user.isValid).length
  const invalidUsersCount = excelData.length - validUsersCount

  // Debug authentication
  const handleDebugAuth = () => {
    const token = getAccessToken()
    console.log('Current JWT token:', token ? 'EXISTS' : 'MISSING')
    console.log('Token value:', token)
    console.log('Selected users:', selectedUserIds)
    console.log('Users data:', users)
    
    // Test API connectivity
    fetch('http://localhost:8080/api/users', {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      }
    })
    .then(response => {
      console.log('API Test Response Status:', response.status)
      console.log('API Test Response Headers:', response.headers)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log('API Test Success:', data.length, 'users fetched')
    })
    .catch(error => {
      console.error('API Test Failed:', error)
    })
  }

  const handleManualRefresh = async () => {
    console.log('Manual refresh triggered')
    try {
      await refetchUsers()
      message.success('Data refreshed successfully!')
    } catch (error) {
      console.error('Refresh error:', error)
      message.error('Failed to refresh data')
    }
  }

  return (
    <Card className="shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>User Management</Title>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleManualRefresh}
            size="small"
          >
            Refresh
          </Button>
          <Button
            onClick={handleDebugAuth}
            size="small"
            type="dashed"
          >
            Debug
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadTemplate}
          >
            Download Template
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
          >
            Import Excel
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Add User
          </Button>
        </Space>
      </div>

      {/* Debug Info */}
      {!getAccessToken() && (
        <Alert
          message="Authentication Warning"
          description="No JWT token found. API calls may fail."
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      {/* Search and Filter Controls */}
      <Card className="mb-4 bg-gray-50">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={6} lg={8}>
            <Input
              placeholder="Search by username, email, or name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Select
              placeholder="Filter by Role"
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: '100%' }}
            >
              <Option value="ALL">All Roles</Option>
              {roleOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  <Tag color={option.color} className="mr-1">
                    {option.label}
                  </Tag>
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
            >
              <Option value="ALL">All Status</Option>
              <Option value="ACTIVE">
                <Badge status="success" text="Active" />
              </Option>
              <Option value="INACTIVE">
                <Badge status="error" text="Inactive" />
              </Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6} lg={8}>
            <Space>
              <Button
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                disabled={searchText === '' && roleFilter === 'ALL' && statusFilter === 'ALL'}
              >
                Clear Filters
              </Button>
              <Text type="secondary">
                {getFilteredUsers().length} of {users?.length || 0} users
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Bulk Actions */}
      {selectedUserIds.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <Space wrap>
            <span className="text-blue-700 font-medium">
              {selectedUserIds.length} user(s) selected
            </span>
            <Divider type="vertical" />
            <Button
              icon={<PlayCircleOutlined />}
              onClick={handleBulkActivate}
              size="small"
              style={{ color: '#52c41a', borderColor: '#52c41a' }}
            >
              Activate Selected
            </Button>
            <Button
              icon={<PauseCircleOutlined />}
              onClick={handleBulkDeactivate}
              size="small"
              style={{ color: '#faad14', borderColor: '#faad14' }}
            >
              Deactivate Selected
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleBulkDelete}
              size="small"
            >
              Delete Selected
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => setSelectedUserIds([])}
            >
              Clear Selection
            </Button>
          </Space>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={getFilteredUsers()}
        rowKey="id"
        loading={isLoading}
        scroll={{ x: 1000 }}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} users`,
        }}
      />

      {/* Create/Edit User Modal */}
      <Modal
        title={editingUser ? 'Edit User' : 'Create New User'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please input full name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select user role">
              {roleOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  <Tag color={option.color} className="mr-2">
                    {option.label}
                  </Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { 
                required: !editingUser, 
                message: 'Please input password!' 
              },
            ]}
          >
            <Input.Password placeholder={editingUser ? 'Leave empty to keep current password' : ''} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Excel Import Modal */}
      <Modal
        title="Import Users from Excel"
        open={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelData([])
        }}
        width={1000}
        footer={
          excelData.length > 0 ? (
            <Space>
              <Text>
                {validUsersCount} valid, {invalidUsersCount} invalid
              </Text>
              <Button 
                onClick={() => {
                  setIsExcelModalOpen(false)
                  setExcelData([])
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                disabled={validUsersCount === 0 || isImporting}
                loading={isImporting}
                onClick={handleBulkImport}
              >
                Import {validUsersCount} Users
              </Button>
            </Space>
          ) : null
        }
      >
        {excelData.length === 0 ? (
          <div>
            <Alert
              message="Excel Import Instructions"
              description={
                <div>
                  <p>Please upload an Excel file with the following columns:</p>
                  <ul>
                    <li><strong>username</strong> - Unique username</li>
                    <li><strong>email</strong> - User's email address</li>
                    <li><strong>fullName</strong> - User's full name</li>
                    <li><strong>password</strong> - User's password</li>
                    <li><strong>role</strong> - One of: PATIENT, DOCTOR, STAFF, ADMIN</li>
                  </ul>
                </div>
              }
              type="info"
              className="mb-4"
            />
            
            <Dragger
              accept=".xlsx,.xls"
              beforeUpload={handleExcelUpload}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <FileExcelOutlined />
              </p>
              <p className="ant-upload-text">Click or drag Excel file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for .xlsx and .xls files. Download template first if needed.
              </p>
            </Dragger>
          </div>
        ) : (
          <div>
            {isImporting && (
              <div className="mb-4">
                <Text>Importing users...</Text>
                <Progress percent={Math.round(importProgress)} />
              </div>
            )}
            
            <Alert
              message={`Preview: ${excelData.length} users found`}
              description={`${validUsersCount} valid users will be imported. ${invalidUsersCount} users have validation errors.`}
              type={invalidUsersCount > 0 ? "warning" : "success"}
              className="mb-4"
            />
            
            <Table
              columns={excelColumns}
              dataSource={excelData}
              rowKey={(record, index) => index?.toString() || ''}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </div>
        )}
      </Modal>
    </Card>
  )
} 