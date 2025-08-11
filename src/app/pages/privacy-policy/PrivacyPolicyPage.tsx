import React from 'react';
import { Typography, Divider, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './privacyPolicyStyle.css';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        {/* Header */}
        <div className="privacy-policy-header">
          <button
            onClick={handleGoBack}
            className="back-button"
          >
            <ArrowLeftOutlined className="mr-2" />
            Quay lại
          </button>
          <Title level={1}>
            Chính sách Bảo mật
          </Title>
          <div className="last-updated">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </div>
        </div>

        <div className="privacy-policy-body">
          <Space direction="vertical" size="large" className="w-full">
            
            {/* Introduction */}
            <div className="privacy-policy-section">
              <Title level={2}>
                1. Giới thiệu
              </Title>
              <Paragraph>
                Chào mừng bạn đến với ứng dụng WQI (Water Quality Index). Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. 
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng ứng dụng của chúng tôi.
              </Paragraph>
            </div>

            <Divider />

            {/* Information Collection */}
            <div className="privacy-policy-section">
              <Title level={2}>
                2. Thông tin chúng tôi thu thập
              </Title>
              <div>
                <Title level={3}>
                  2.1. Thông tin cá nhân
                </Title>
                <Paragraph>
                  Chúng tôi có thể thu thập các thông tin cá nhân sau đây:
                </Paragraph>
                <ul>
                  <li>Tên đăng nhập và mật khẩu</li>
                  <li>Thông tin liên hệ (email, số điện thoại)</li>
                  <li>Thông tin hồ sơ người dùng</li>
                  <li>Dữ liệu sử dụng ứng dụng</li>
                </ul>
              </div>
              
              <div>
                <Title level={3}>
                  2.2. Thông tin thiết bị
                </Title>
                <Paragraph>
                  Chúng tôi có thể thu thập thông tin về thiết bị của bạn:
                </Paragraph>
                <ul>
                  <li>Loại thiết bị và hệ điều hành</li>
                  <li>Địa chỉ IP</li>
                  <li>Thông tin trình duyệt</li>
                  <li>Dữ liệu vị trí (nếu được cấp quyền)</li>
                </ul>
              </div>
            </div>

            <Divider />

            {/* How we use information */}
            <div className="privacy-policy-section">
              <Title level={2}>
                3. Cách chúng tôi sử dụng thông tin
              </Title>
              <Paragraph>
                Chúng tôi sử dụng thông tin thu thập được để:
              </Paragraph>
              <ul>
                <li>Cung cấp và duy trì dịch vụ của chúng tôi</li>
                <li>Cải thiện trải nghiệm người dùng</li>
                <li>Gửi thông báo và cập nhật quan trọng</li>
                <li>Phân tích xu hướng sử dụng và tối ưu hóa hiệu suất</li>
                <li>Đảm bảo an ninh và ngăn chặn gian lận</li>
                <li>Tuân thủ các nghĩa vụ pháp lý</li>
              </ul>
            </div>

            <Divider />

            {/* Information sharing */}
            <div className="privacy-policy-section">
              <Title level={2}>
                4. Chia sẻ thông tin
              </Title>
              <Paragraph>
                Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba mà không có sự đồng ý của bạn, 
                trừ khi:
              </Paragraph>
              <ul>
                <li>Được yêu cầu bởi pháp luật</li>
                <li>Để bảo vệ quyền và tài sản của chúng tôi</li>
                <li>Với các đối tác tin cậy để cung cấp dịch vụ</li>
                <li>Trong trường hợp khẩn cấp để bảo vệ sự an toàn</li>
              </ul>
            </div>

            <Divider />

            {/* Data security */}
            <div className="privacy-policy-section">
              <Title level={2}>
                5. Bảo mật dữ liệu
              </Title>
              <Paragraph>
                Chúng tôi thực hiện các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, 
                thay đổi, tiết lộ hoặc phá hủy. Các biện pháp này bao gồm:
              </Paragraph>
              <ul>
                <li>Mã hóa dữ liệu trong quá trình truyền tải</li>
                <li>Kiểm soát truy cập nghiêm ngặt</li>
                <li>Giám sát hệ thống liên tục</li>
                <li>Cập nhật bảo mật thường xuyên</li>
              </ul>
            </div>

            <Divider />

            {/* User rights */}
            <div className="privacy-policy-section">
              <Title level={2}>
                6. Quyền của người dùng
              </Title>
              <Paragraph>
                Bạn có các quyền sau đây đối với thông tin cá nhân của mình:
              </Paragraph>
              <ul>
                <li>Quyền truy cập và xem thông tin cá nhân</li>
                <li>Quyền chỉnh sửa và cập nhật thông tin</li>
                <li>Quyền xóa thông tin cá nhân</li>
                <li>Quyền rút lại sự đồng ý</li>
                <li>Quyền khiếu nại về việc xử lý dữ liệu</li>
              </ul>
            </div>

            <Divider />

            {/* Cookies */}
            <div className="privacy-policy-section">
              <Title level={2}>
                7. Cookies và công nghệ theo dõi
              </Title>
              <Paragraph>
                Chúng tôi có thể sử dụng cookies và các công nghệ tương tự để cải thiện trải nghiệm người dùng, 
                phân tích lưu lượng truy cập và tùy chỉnh nội dung. Bạn có thể kiểm soát việc sử dụng cookies 
                thông qua cài đặt trình duyệt của mình.
              </Paragraph>
            </div>

            <Divider />

            {/* Children privacy */}
            <div className="privacy-policy-section">
              <Title level={2}>
                8. Bảo mật trẻ em
              </Title>
              <Paragraph>
                Ứng dụng của chúng tôi không nhắm mục tiêu đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập 
                thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn là cha mẹ hoặc người giám hộ và tin rằng con bạn 
                đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi.
              </Paragraph>
            </div>

            <Divider />

            {/* Changes to policy */}
            <div className="privacy-policy-section">
              <Title level={2}>
                9. Thay đổi chính sách
              </Title>
              <Paragraph>
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Khi có thay đổi quan trọng, 
                chúng tôi sẽ thông báo cho bạn thông qua ứng dụng hoặc email. Việc tiếp tục sử dụng ứng dụng 
                sau khi thay đổi có hiệu lực được coi là chấp nhận chính sách mới.
              </Paragraph>
            </div>

            <Divider />

            {/* Contact information */}
            <div className="privacy-policy-section">
              <Title level={2}>
                10. Liên hệ
              </Title>
              <Paragraph>
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin cá nhân của bạn, 
                vui lòng liên hệ với chúng tôi:
              </Paragraph>
              <div className="contact-info">
                <Paragraph>
                  <strong>Email:</strong> privacy@wqi-app.com
                </Paragraph>
                <Paragraph>
                  <strong>Điện thoại:</strong> +84 XXX XXX XXX
                </Paragraph>
                <Paragraph>
                  <strong>Địa chỉ:</strong> [Địa chỉ công ty của bạn]
                </Paragraph>
              </div>
            </div>

          </Space>
        </div>

        {/* Footer */}
        <div className="privacy-policy-footer">
          <Paragraph>
            © {new Date().getFullYear()} WQI App. Tất cả quyền được bảo lưu.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
