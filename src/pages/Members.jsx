import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, Form, notification, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    axios.get('https://hrms-server-euux.onrender.com/members')
      .then((response) => {
        setMembers(response.data.data);
        setFilteredMembers(response.data.data); // Initialize filtered data
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
      });
  }, []);

  // Edit member function
  const handleEdit = (member) => {
    setSelectedMember(member);
    setIsEditing(true);
  };

  // Handle deleting member
  const handleDelete = (id) => {
    axios.delete(`https://hrms-server-euux.onrender.com/members/${id}`)
      .then(() => {
        setMembers(members.filter(member => member._id !== id));
        setFilteredMembers(filteredMembers.filter(member => member._id !== id));
        notification.success({ message: 'Member deleted successfully' });
      })
      .catch((error) => {
        console.error('Error deleting member:', error);
        notification.error({ message: 'Error deleting member' });
      });
  };

  // Submit the update form
  const handleUpdate = (values) => {
    const updatedMember = { ...selectedMember, ...values };

    axios.put(`https://hrms-server-euux.onrender.com/members/${updatedMember._id}`, updatedMember)
      .then(() => {
        setMembers(members.map(member => member._id === updatedMember._id ? updatedMember : member));
        setFilteredMembers(filteredMembers.map(member => member._id === updatedMember._id ? updatedMember : member));
        setIsEditing(false);
        setSelectedMember(null);
        notification.success({ message: 'Member updated successfully' });
      })
      .catch((error) => {
        console.error('Error updating member:', error);
        notification.error({ message: 'Error updating member' });
      });
  };

  // Handle search functionality
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = members.filter((member) =>
      member.fullNames.toLowerCase().includes(value.toLowerCase()) ||
      member.position.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  // Columns for the Table
  const columns = [
    {
      title: 'Staff Number',
      dataIndex: 'staffNumber',
      key: 'staffNumber',
      render: (text) => <span data-label="Staff Number">{text}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullNames',
      key: 'fullNames',
      render: (text) => <span data-label="Full Name">{text}</span>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <span data-label="Position">{text}</span>,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (text) => <span data-label="Salary">{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            style={{ marginRight: 8 }}
          />
          <Button 
            type="danger" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="members-container">
      <h1>Members List</h1>

      {/* Search Box */}
      <Input.Search
        placeholder="Search by name or position"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20, width: '300px' }}
      />

      {/* Table for Members */}
      <Table 
        columns={columns} 
        dataSource={filteredMembers} 
        rowKey="_id" 
        pagination={{ pageSize: 5 }} // Pagination configuration
        responsive // Makes the table responsive
        scroll={{ x: 'max-content' }} // Ensure it scrolls horizontally if the content is wider than the screen
      />

      {/* Edit Member Modal */}
      <Modal
        title="Edit Member"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          initialValues={selectedMember}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
            name="fullNames"
            rules={[{ required: true, message: 'Please input the full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input the position!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input the salary!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Member
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Members;
