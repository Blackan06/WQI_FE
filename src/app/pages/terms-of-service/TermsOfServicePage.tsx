import React from 'react';
import { Typography, Divider, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './termsOfServiceStyle.css';

const { Title, Paragraph, Text } = Typography;

const TermsOfServicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="terms-of-service-container">
      <div className="terms-of-service-content">
        {/* Header */}
        <div className="terms-of-service-header">
          <button
            onClick={handleGoBack}
            className="back-button"
          >
            <ArrowLeftOutlined className="mr-2" />
            Quay lại
          </button>
          <Title level={1}>
            Điều khoản Sử dụng
          </Title>
          <div className="last-updated">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </div>
        </div>

        <div className="terms-of-service-body">
          <Space direction="vertical" size="large" className="w-full">
            
            {/* Introduction */}
            <div className="terms-of-service-section">
              <Title level={2}>
                1. Chấp nhận điều khoản
              </Title>
              <Paragraph>
                Bằng việc truy cập và sử dụng ứng dụng WQI (Water Quality Index), bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện này. 
                Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép sử dụng dịch vụ của chúng tôi.
              </Paragraph>
            </div>

            <Divider />

            {/* Description of service */}
            <div className="terms-of-service-section">
              <Title level={2}>
                2. Mô tả dịch vụ
              </Title>
              <Paragraph>
                WQI là ứng dụng theo dõi và phân tích chất lượng nước, cung cấp:
              </Paragraph>
              <ul>
                <li>Dữ liệu thời gian thực về chất lượng nước</li>
                <li>Phân tích và báo cáo chi tiết</li>
                <li>Cảnh báo khi có vấn đề về chất lượng nước</li>
                <li>Giao diện quản lý trạm giám sát</li>
                <li>Tích hợp với các hệ thống IoT</li>
              </ul>
            </div>

            <Divider />

            {/* User accounts */}
            <div className="terms-of-service-section">
              <Title level={2}>
                3. Tài khoản người dùng
              </Title>
              <Paragraph>
                Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. 
                Bạn chịu trách nhiệm bảo vệ mật khẩu và tài khoản của mình.
              </Paragraph>
              <Paragraph>
                Bạn đồng ý không:
              </Paragraph>
              <ul>
                <li>Chia sẻ thông tin đăng nhập với người khác</li>
                <li>Sử dụng tài khoản cho mục đích bất hợp pháp</li>
                <li>Tạo nhiều tài khoản giả mạo</li>
                <li>Chuyển giao tài khoản cho người khác</li>
              </ul>
            </div>

            <Divider />

            {/* Acceptable use */}
            <div className="terms-of-service-section">
              <Title level={2}>
                4. Sử dụng chấp nhận được
              </Title>
              <Paragraph>
                Bạn đồng ý sử dụng dịch vụ chỉ cho các mục đích hợp pháp và phù hợp với các điều khoản này. 
                Bạn không được:
              </Paragraph>
              <ul>
                <li>Sử dụng dịch vụ để vi phạm pháp luật</li>
                <li>Gây hại hoặc làm gián đoạn dịch vụ</li>
                <li>Thu thập thông tin cá nhân của người khác</li>
                <li>Phát tán nội dung độc hại hoặc spam</li>
                <li>Thực hiện các hành vi tấn công mạng</li>
              </ul>
            </div>

            <Divider />

            {/* Intellectual property */}
            <div className="terms-of-service-section">
              <Title level={2}>
                5. Sở hữu trí tuệ
              </Title>
              <Paragraph>
                Dịch vụ và nội dung của nó (bao gồm nhưng không giới hạn ở văn bản, đồ họa, hình ảnh, logo, 
                biểu tượng, phần mềm) được bảo vệ bởi luật bản quyền và các quyền sở hữu trí tuệ khác.
              </Paragraph>
              <Paragraph>
                Bạn không được phép:
              </Paragraph>
              <ul>
                <li>Sao chép, phân phối hoặc tái tạo nội dung</li>
                <li>Tạo các sản phẩm phái sinh</li>
                <li>Đảo ngược kỹ thuật hoặc decompile phần mềm</li>
                <li>Sử dụng thương hiệu của chúng tôi mà không được phép</li>
              </ul>
            </div>

            <Divider />

            {/* Privacy */}
            <div className="terms-of-service-section">
              <Title level={2}>
                6. Quyền riêng tư
              </Title>
              <Paragraph>
                Việc sử dụng dịch vụ của chúng tôi cũng tuân theo Chính sách Bảo mật của chúng tôi, 
                được tích hợp vào các điều khoản này bằng tham chiếu. Vui lòng xem lại Chính sách Bảo mật 
                để hiểu cách chúng tôi thu thập và sử dụng thông tin của bạn.
              </Paragraph>
            </div>

            <Divider />

            {/* Disclaimers */}
            <div className="terms-of-service-section">
              <Title level={2}>
                7. Tuyên bố từ chối trách nhiệm
              </Title>
              <Paragraph>
                Dịch vụ được cung cấp "nguyên trạng" và "có sẵn". Chúng tôi không đảm bảo rằng:
              </Paragraph>
              <ul>
                <li>Dịch vụ sẽ không bị gián đoạn hoặc không có lỗi</li>
                <li>Lỗi sẽ được sửa chữa</li>
                <li>Dịch vụ hoặc máy chủ cung cấp dịch vụ không có vi-rút</li>
                <li>Thông tin thu được từ dịch vụ là chính xác hoặc đáng tin cậy</li>
              </ul>
            </div>

            <Divider />

            {/* Limitation of liability */}
            <div className="terms-of-service-section">
              <Title level={2}>
                8. Giới hạn trách nhiệm
              </Title>
              <Paragraph>
                Trong mọi trường hợp, chúng tôi sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, 
                ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt nào phát sinh từ việc sử dụng dịch vụ của chúng tôi.
              </Paragraph>
            </div>

            <Divider />

            {/* Indemnification */}
            <div className="terms-of-service-section">
              <Title level={2}>
                9. Bồi thường
              </Title>
              <Paragraph>
                Bạn đồng ý bảo vệ, bồi thường và giữ chúng tôi vô hại khỏi bất kỳ khiếu nại, thiệt hại, 
                nghĩa vụ, chi phí hoặc phí tổn nào phát sinh từ việc sử dụng dịch vụ của bạn hoặc vi phạm các điều khoản này.
              </Paragraph>
            </div>

            <Divider />

            {/* Termination */}
            <div className="terms-of-service-section">
              <Title level={2}>
                10. Chấm dứt
              </Title>
              <Paragraph>
                Chúng tôi có thể chấm dứt hoặc tạm ngưng tài khoản của bạn ngay lập tức, mà không cần thông báo trước, 
                vì bất kỳ lý do gì, bao gồm việc vi phạm các Điều khoản Sử dụng.
              </Paragraph>
              <Paragraph>
                Khi chấm dứt, quyền sử dụng dịch vụ của bạn sẽ ngay lập tức chấm dứt.
              </Paragraph>
            </div>

            <Divider />

            {/* Governing law */}
            <div className="terms-of-service-section">
              <Title level={2}>
                11. Luật điều chỉnh
              </Title>
              <Paragraph>
                Các điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam. 
                Bất kỳ tranh chấp nào phát sinh từ các điều khoản này sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
              </Paragraph>
            </div>

            <Divider />

            {/* Changes to terms */}
            <div className="terms-of-service-section">
              <Title level={2}>
                12. Thay đổi điều khoản
              </Title>
              <Paragraph>
                Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản này bất cứ lúc nào. 
                Nếu có sửa đổi, chúng tôi sẽ thông báo cho bạn thông qua ứng dụng hoặc email.
              </Paragraph>
              <Paragraph>
                Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi được coi là chấp nhận các điều khoản mới.
              </Paragraph>
            </div>

            <Divider />

            {/* Contact information */}
            <div className="terms-of-service-section">
              <Title level={2}>
                13. Liên hệ
              </Title>
              <Paragraph>
                Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản Sử dụng này, vui lòng liên hệ với chúng tôi:
              </Paragraph>
              <div className="contact-info">
                <Paragraph>
                  <strong>Email:</strong> legal@wqi-app.com
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
        <div className="terms-of-service-footer">
          <Paragraph>
            © {new Date().getFullYear()} WQI App. Tất cả quyền được bảo lưu.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
