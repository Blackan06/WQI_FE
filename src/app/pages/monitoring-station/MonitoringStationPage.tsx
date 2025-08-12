import React, { useEffect, useState } from "react";
import { 
  Table, 
  Input, 
  Space, 
  Card, 
  Typography, 
  Spin, 
  message, 
  Button, 
  Modal, 
  Form, 
  InputNumber, 
  Switch,
  Popconfirm,
  Select,
  Tag
} from "antd";
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import useMonitoringStation from "../../hooks/use-monitoring-station";
import { MonitoringStation, CreateStationRequest, UpdateStationRequest } from "../../models/station";
import ApiTestComponent from "../../components/debug/ApiTestComponent";

const { Title } = Typography;
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

const MonitoringStationPage: React.FC = () => {
  const { 
    stations, 
    loading, 
    error, 
    selectedStation,
    fetchAllStations, 
    searchStationsByName,
    searchStationsByLocation,
    searchStationsByDescription,
    fetchActiveStations,
    fetchInactiveStations,
    createStation,
    updateStation,
    deleteStation,
    setSelectedStation
  } = useMonitoringStation();

  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState<"name" | "location" | "description">("name");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingStationId, setEditingStationId] = useState<number | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllStations();
  }, [fetchAllStations]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      switch (searchType) {
        case "name":
          searchStationsByName(value);
          break;
        case "location":
          searchStationsByLocation(value);
          break;
        case "description":
          searchStationsByDescription(value);
          break;
      }
    } else {
      fetchAllStations();
    }
  };

  const handleCreate = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: MonitoringStation) => {
    console.log('Editing station:', record);
    setIsEditMode(true);
    setEditingStationId(record.station_id);
    setSelectedStation(record);
    
    // Set form values with proper data types
    form.setFieldsValue({
      station_name: record.station_name,
      location: record.location,
      latitude: Number(record.latitude),
      longitude: Number(record.longitude),
      description: record.description || '',
      is_active: record.is_active,
    });
    
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStation(id);
      message.success("Xóa trạm thành công!");
    } catch (error) {
      message.error("Xóa trạm thất bại!");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingStationId(null);
    setSelectedStation(null);
    setIsEditMode(false);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
    
      console.log('Is edit mode:', isEditMode);
      console.log('Editing station ID:', editingStationId);
      console.log('Form values:', values);
      
      if (isEditMode && editingStationId) {
        console.log('Updating station with ID:', editingStationId);
        
        // Ensure all required fields are present and properly typed
        const updateData = {
          station_name: values.station_name,
          location: values.location,
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          description: values.description || '',
          is_active: Boolean(values.is_active),
        };
        
        console.log('Final update data:', updateData);
        await updateStation(editingStationId, updateData);
        message.success("Cập nhật trạm thành công!");
      } else if (!isEditMode) {
        console.log('Creating new station');
        
        // Ensure all required fields are present and properly typed
        const createData = {
          station_name: values.station_name,
          location: values.location,
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          description: values.description || '',
          is_active: Boolean(values.is_active),
        };
        
        console.log('Final create data:', createData);
        await createStation(createData);
        message.success("Tạo trạm thành công!");
      } else {
        throw new Error('Missing station ID for update');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setEditingStationId(null);
      setSelectedStation(null);
      setIsEditMode(false);
      
      // Refresh the data
      await fetchAllStations();
      
    } catch (error) {
      console.error('Error in handleModalOk:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Missing station ID')) {
          message.error('Lỗi: Thiếu ID trạm để cập nhật');
        } else if (error.message.includes('Network Error')) {
          message.error('Lỗi kết nối mạng. Vui lòng kiểm tra lại kết nối.');
        } else if (error.message.includes('500')) {
          message.error('Lỗi server. Vui lòng thử lại sau.');
        } else if (error.message.includes('400')) {
          message.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
        } else if (error.message.includes('404')) {
          message.error('Không tìm thấy trạm. Vui lòng thử lại.');
        } else {
          message.error(`Thao tác thất bại: ${error.message}`);
        }
      } else {
        message.error('Thao tác thất bại: Lỗi không xác định');
      }
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên Trạm",
      dataIndex: "station_name",
      key: "station_name",
      width: 200,
    },
    {
      title: "Vị Trí",
      dataIndex: "location",
      key: "location",
      width: 200,
    },
    {
      title: "Tọa Độ",
      key: "coordinates",
      width: 150,
      render: (record: MonitoringStation) => (
        <div>
          <div>Lat: {record.latitude}</div>
          <div>Lng: {record.longitude}</div>
        </div>
      ),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Trạng Thái",
      dataIndex: "is_active",
      key: "is_active",
      width: 100,
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      width: 150,
      render: (record: MonitoringStation) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa trạm này?"
            onConfirm={() => handleDelete(record.station_id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    message.error(`Lỗi: ${error}`);
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2} style={{ marginBottom: "24px", color: "#1890ff" }}>
          Quản Lý Trạm Quan Trắc
        </Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <Select
                value={searchType}
                onChange={setSearchType}
                style={{ width: 150 }}
              >
                <Option value="name">Tên trạm</Option>
                <Option value="location">Vị trí</Option>
                <Option value="description">Mô tả</Option>
              </Select>
              <Search
                placeholder={`Tìm kiếm theo ${searchType === "name" ? "tên" : searchType === "location" ? "vị trí" : "mô tả"}...`}
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                style={{ width: 300 }}
              />
            </Space>
            <Space>
              <Button onClick={() => fetchAllStations()}>
                Tất cả
              </Button>
              <Button onClick={() => fetchActiveStations()}>
                Hoạt động
              </Button>
              <Button onClick={() => fetchInactiveStations()}>
                Không hoạt động
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleCreate}
              >
                Thêm Trạm
              </Button>
            </Space>
          </div>

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={stations}
              rowKey="station_id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} trạm`,
              }}
              scroll={{ x: 1200 }}
              size="middle"
            />
          </Spin>
        </Space>
      </Card>

      <Modal
        title={isEditMode ? "Cập Nhật Trạm" : "Thêm Trạm Mới"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText={isEditMode ? "Cập nhật" : "Tạo"}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="station_name"
            label="Tên Trạm"
            rules={[{ required: true, message: "Vui lòng nhập tên trạm!" }]}
          >
            <Input placeholder="Nhập tên trạm" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Vị Trí"
            rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
          >
            <Input placeholder="Nhập vị trí" />
          </Form.Item>

          <Form.Item
            name="latitude"
            label="Vĩ Độ"
            rules={[
              { required: true, message: "Vui lòng nhập vĩ độ!" },
              { type: 'number', min: -90, max: 90, message: "Vĩ độ phải từ -90 đến 90!" }
            ]}
          >
            <InputNumber
              placeholder="Nhập vĩ độ"
              style={{ width: "100%" }}
              min={-90}
              max={90}
              step={0.000001}
              precision={6}
            />
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Kinh Độ"
            rules={[
              { required: true, message: "Vui lòng nhập kinh độ!" },
              { type: 'number', min: -180, max: 180, message: "Kinh độ phải từ -180 đến 180!" }
            ]}
          >
            <InputNumber
              placeholder="Nhập kinh độ"
              style={{ width: "100%" }}
              min={-180}
              max={180}
              step={0.000001}
              precision={6}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô Tả"
          >
            <TextArea
              placeholder="Nhập mô tả"
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="is_active"
            label="Trạng Thái"
            valuePropName="checked"
          >
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Debug Component - Remove in production */}
      <ApiTestComponent />
    </div>
  );
};

export default MonitoringStationPage; 