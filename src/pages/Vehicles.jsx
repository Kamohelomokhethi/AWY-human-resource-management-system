import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, Form, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSnackbar } from 'notistack';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get('https://hrms-server-euux.onrender.com/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setFilteredVehicles(response.data.data); // Initialize filtered data
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  }, []);

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios.delete(`https://hrms-server-euux.onrender.com/vehicles/${id}`)
      .then((response) => {
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
        setFilteredVehicles(filteredVehicles.filter(vehicle => vehicle._id !== id));
        enqueueSnackbar(response.data.message, { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
        enqueueSnackbar('Error deleting vehicle', { variant: 'error' });
      });
  };

  const handleUpdate = (values) => {
    const updatedVehicle = { ...selectedVehicle, ...values };

    axios.put(`https://hrms-server-euux.onrender.com/vehicles/${updatedVehicle._id}`, updatedVehicle)
      .then((response) => {
        setVehicles(vehicles.map(vehicle => vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle));
        setFilteredVehicles(filteredVehicles.map(vehicle => vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle));
        setIsEditing(false);
        setSelectedVehicle(null);
        enqueueSnackbar(response.data.message, { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error updating vehicle:', error);
        enqueueSnackbar('Error updating vehicle', { variant: 'error' });
      });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = vehicles.filter((vehicle) =>
      vehicle.model.toLowerCase().includes(value.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  const columns = [
    {
      title: 'VIN',
      dataIndex: 'vin',
      key: 'vin',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      key: 'mileage',
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
    <div className="vehicles-container">
      <h1>Vehicles List</h1>

      <Input.Search
        placeholder="Search by VIN or model"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20, width: '300px' }}
      />

      <Table 
        columns={columns} 
        dataSource={filteredVehicles} 
        rowKey="_id" 
        pagination={{ pageSize: 5 }} 
        scroll={{ x: 'max-content' }} 
        responsive 
      />

      <Modal
        title="Edit Vehicle"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          initialValues={selectedVehicle}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            label="VIN"
            name="vin"
            rules={[{ required: true, message: 'Please input the VIN!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please input the vehicle model!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mileage"
            name="mileage"
            rules={[{ required: true, message: 'Please input the mileage!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vehicles;
