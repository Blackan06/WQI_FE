import React, { useState } from "react";
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Space, 
  InputNumber, 
  DatePicker, 
  message, 
  Spin,
  Table,
  Divider
} from "antd";
import { PlusOutlined, SendOutlined, DeleteOutlined } from "@ant-design/icons";
import useKafka from "../../hooks/use-kafka";
import { DataItem } from "../../models/kafka";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;

const KafkaPage: React.FC = () => {
  const { loading, error, lastResponse, sendBatch } = useKafka();
  const [messages, setMessages] = useState<DataItem[]>([
    {
      station_id: 1,
      measurement_time: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
      ph: 7.2,
      temperature: 25.5,
      do: 8.1,
    }
  ]);

  const handleAddMessage = () => {
    setMessages([
      ...messages,
      {
        station_id: 1,
        measurement_time: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
        ph: 7.0,
        temperature: 25.0,
        do: 8.0,
      }
    ]);
  };

  const handleRemoveMessage = (index: number) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  const handleUpdateMessage = (index: number, field: keyof DataItem, value: any) => {
    const newMessages = [...messages];
    newMessages[index] = { ...newMessages[index], [field]: value };
    setMessages(newMessages);
  };

  const handleSendBatch = async () => {
    try {
      await sendBatch({ messages });
      message.success("Gửi Kafka messages thành công!");
    } catch (error) {
      message.error("Gửi Kafka messages thất bại!");
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
      title: "ID Trạm",
      dataIndex: "station_id",
      key: "station_id",
      width: 100,
      render: (value: number, record: DataItem, index: number) => (
        <InputNumber
          value={value}
          onChange={(val) => handleUpdateMessage(index, "station_id", val)}
          min={0}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Thời Gian",
      dataIndex: "measurement_time",
      key: "measurement_time",
      width: 200,
      render: (value: string, record: DataItem, index: number) => (
        <DatePicker
          showTime
          value={dayjs(value)}
          onChange={(date) => handleUpdateMessage(index, "measurement_time", date?.format("YYYY-MM-DDTHH:mm:ssZ"))}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "pH",
      dataIndex: "ph",
      key: "ph",
      width: 100,
      render: (value: number, record: DataItem, index: number) => (
        <InputNumber
          value={value}
          onChange={(val) => handleUpdateMessage(index, "ph", val)}
          min={0}
          max={14}
          step={0.1}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Nhiệt Độ (°C)",
      dataIndex: "temperature",
      key: "temperature",
      width: 120,
      render: (value: number, record: DataItem, index: number) => (
        <InputNumber
          value={value}
          onChange={(val) => handleUpdateMessage(index, "temperature", val)}
          min={-50}
          max={100}
          step={0.1}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Oxy Hòa Tan (mg/L)",
      dataIndex: "do",
      key: "do",
      width: 150,
      render: (value: number, record: DataItem, index: number) => (
        <InputNumber
          value={value}
          onChange={(val) => handleUpdateMessage(index, "do", val)}
          min={0}
          max={20}
          step={0.1}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      width: 100,
      render: (_: any, __: any, index: number) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveMessage(index)}
          disabled={messages.length === 1}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2} style={{ marginBottom: "24px", color: "#1890ff" }}>
          Gửi Kafka Messages
        </Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Text strong>
              Danh sách messages ({messages.length} items)
            </Typography.Text>
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              onClick={handleAddMessage}
            >
              Thêm Message
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={messages}
            rowKey={(record, index) => index?.toString() || "0"}
            pagination={false}
            size="small"
            scroll={{ x: 800 }}
          />

          <Divider />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Text>
              Tổng cộng: {messages.length} messages
            </Typography.Text>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendBatch}
              loading={loading}
              size="large"
            >
              Gửi Batch Messages
            </Button>
          </div>

          {error && (
            <Card style={{ backgroundColor: "#fff2f0", borderColor: "#ffccc7" }}>
              <Typography.Text type="danger">
                Lỗi: {error}
              </Typography.Text>
            </Card>
          )}

          {lastResponse && (
            <Card style={{ backgroundColor: "#f6ffed", borderColor: "#b7eb8f" }}>
              <Typography.Text type="success">
                Thành công! Đã gửi {lastResponse.sent_count} messages.
                {lastResponse.message && ` - ${lastResponse.message}`}
              </Typography.Text>
            </Card>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default KafkaPage; 