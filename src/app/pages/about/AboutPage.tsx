import React from 'react';
import { Typography, Divider, Space, Card, Row, Col } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, TeamOutlined, SafetyOutlined, GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './aboutStyle.css';

const { Title, Paragraph, Text } = Typography;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Header */}
        <div className="about-header">
          <button
            onClick={handleGoBack}
            className="back-button"
          >
            <ArrowLeftOutlined className="mr-2" />
            Quay lại
          </button>
          <Title level={1}>
            Về WQI App
          </Title>
          <div className="subtitle">
            Ứng dụng theo dõi chất lượng nước thông minh
          </div>
        </div>

        <div className="about-body">
          <Space direction="vertical" size="large" className="w-full">
            
            {/* Introduction */}
            <div className="about-section">
              <Title level={2}>
                Giới thiệu
              </Title>
              <Paragraph>
                WQI (Water Quality Index) là ứng dụng tiên tiến được thiết kế để theo dõi và phân tích chất lượng nước 
                theo thời gian thực. Ứng dụng này cung cấp giải pháp toàn diện cho việc quản lý và giám sát chất lượng 
                nước tại các trạm quan trắc môi trường.
              </Paragraph>
            </div>

            <Divider />

            {/* Features */}
            <div className="about-section">
              <Title level={2}>
                Tính năng chính
              </Title>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={8}>
                  <Card className="feature-card">
                    <div className="feature-icon">
                      <EnvironmentOutlined />
                    </div>
                    <Title level={3}>Giám sát thời gian thực</Title>
                    <Paragraph>
                      Theo dõi các chỉ số chất lượng nước liên tục 24/7 với độ chính xác cao
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className="feature-card">
                    <div className="feature-icon">
                      <SafetyOutlined />
                    </div>
                    <Title level={3}>Cảnh báo thông minh</Title>
                    <Paragraph>
                      Hệ thống cảnh báo tự động khi phát hiện vấn đề về chất lượng nước
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className="feature-card">
                    <div className="feature-icon">
                      <GlobalOutlined />
                    </div>
                    <Title level={3}>Phân tích dữ liệu</Title>
                    <Paragraph>
                      Báo cáo chi tiết và biểu đồ phân tích xu hướng chất lượng nước
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className="feature-card">
                    <div className="feature-icon">
                      <TeamOutlined />
                    </div>
                    <Title level={3}>Quản lý trạm</Title>
                    <Paragraph>
                      Giao diện quản lý trạm giám sát và thiết bị IoT tích hợp
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Technology */}
            <div className="about-section">
              <Title level={2}>
                Công nghệ
              </Title>
              <Paragraph>
                WQI App được xây dựng trên nền tảng công nghệ hiện đại:
              </Paragraph>
              <ul>
                <li><strong>Frontend:</strong> React.js với TypeScript</li>
                <li><strong>UI Framework:</strong> Ant Design</li>
                <li><strong>Real-time:</strong> SignalR cho cập nhật dữ liệu thời gian thực</li>
                <li><strong>IoT Integration:</strong> Kafka cho xử lý dữ liệu từ cảm biến</li>
                <li><strong>Monitoring:</strong> Grafana cho dashboard và biểu đồ</li>
                <li><strong>Security:</strong> JWT authentication và HTTPS</li>
              </ul>
            </div>

            <Divider />

            {/* Mission */}
            <div className="about-section">
              <Title level={2}>
                Sứ mệnh
              </Title>
              <Paragraph>
                Chúng tôi cam kết cung cấp giải pháp công nghệ tiên tiến để bảo vệ nguồn nước và môi trường. 
                Thông qua việc giám sát liên tục và phân tích dữ liệu chính xác, chúng tôi góp phần nâng cao 
                nhận thức về tầm quan trọng của việc bảo vệ chất lượng nước.
              </Paragraph>
            </div>

            <Divider />

            {/* Team */}
            <div className="about-section">
              <Title level={2}>
                Đội ngũ
              </Title>
              <Paragraph>
                WQI App được phát triển bởi đội ngũ kỹ sư và chuyên gia môi trường giàu kinh nghiệm, 
                với mục tiêu tạo ra những sản phẩm công nghệ có ý nghĩa cho cộng đồng.
              </Paragraph>
            </div>

            <Divider />

            {/* Contact */}
            <div className="about-section">
              <Title level={2}>
                Liên hệ
              </Title>
              <Paragraph>
                Để biết thêm thông tin hoặc hỗ trợ, vui lòng liên hệ với chúng tôi:
              </Paragraph>
              <div className="contact-info">
                <Paragraph>
                  <strong>Email:</strong> info@wqi-app.com
                </Paragraph>
                <Paragraph>
                  <strong>Điện thoại:</strong> +84 XXX XXX XXX
                </Paragraph>
                <Paragraph>
                  <strong>Địa chỉ:</strong> [Địa chỉ công ty của bạn]
                </Paragraph>
                <Paragraph>
                  <strong>Website:</strong> www.wqi-app.com
                </Paragraph>
              </div>
            </div>

          </Space>
        </div>

        {/* Footer */}
        <div className="about-footer">
          <Paragraph>
            © {new Date().getFullYear()} WQI App. Tất cả quyền được bảo lưu.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
