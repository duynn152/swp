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
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers'
import type { User, CreateUserRequest, UpdateUserRequest } from '../services/userService'

const { Title } = Typography

export const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  // Queries and mutations
  const { data: users, isLoading } = useUsers()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const handleCreateUser = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
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

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        // Update user
        const updateData: UpdateUserRequest = {
          username: values.username,
          email: values.email,
          fullName: values.fullName,
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card className="shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>User Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateUser}
        >
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Create New User'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
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
    </Card>
  )
} 