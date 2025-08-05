import React, { useEffect, useState } from "react";
import { Table, Input, Space, Card, Typography, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useStation from "../../hooks/use-station";

const { Title } = Typography;
const { Search } = Input;

const StationPage: React.FC = () => {
  const { stations, loading, error, fetchStations, searchStationsByName } = useStation();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      searchStationsByName(value);
    } else {
      fetchStations();
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 80,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên Trạm",
      dataIndex: "station_name",
      key: "station_name",
      width: 250,
    },
    {
      title: "Ngày Đo",
      dataIndex: "measurement_date",
      key: "measurement_date",
      width: 120,
      render: (text: string) => text ? new Date(text).toLocaleDateString('vi-VN') : '-',
    },
    {
      title: "Nhiệt Độ (°C)",
      dataIndex: "temperature",
      key: "temperature",
      width: 120,
      render: (value: number) => value ? value.toFixed(2) : '-',
    },
    {
      title: "pH",
      dataIndex: "ph",
      key: "ph",
      width: 100,
      render: (value: number) => value ? value.toFixed(2) : '-',
    },
    {
      title: "Oxy Hòa Tan (mg/L)",
      dataIndex: "do",
      key: "do",
      width: 150,
      render: (value: number) => value ? value.toFixed(2) : '-',
    },
    {
      title: "WQI",
      dataIndex: "wqi",
      key: "wqi",
      width: 100,
      render: (value: number) => value ? value.toFixed(2) : '-',
    },
  ];

  if (error) {
    message.error(`Lỗi: ${error}`);
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2} style={{ marginBottom: "24px", color: "#1890ff" }}>
          Dữ Liệu WQI Theo Trạm
        </Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Search
            placeholder="Tìm kiếm dữ liệu theo tên trạm..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            style={{ maxWidth: "400px" }}
          />

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={stations}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} bản ghi`,
              }}
              scroll={{ x: 1200 }}
              size="middle"
            />
          </Spin>
        </Space>
      </Card>
    </div>
  );
};

export default StationPage; 