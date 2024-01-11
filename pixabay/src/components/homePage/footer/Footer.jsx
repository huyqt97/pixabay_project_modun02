import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <div className='footer'>
            <div className="footer_left">
                <h1>pixabay</h1>
                <p>Khám phá trên 4.2 triệu hình ảnh và video được chia sẻ bởi cộng đồng hào phóng của chúng tôi.</p>
                <div className="footer_icon">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-pinterest"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-facebook"></i>
                </div>
            </div>
            <div className="footer_rigth">
                <ul>
                    <li><b>Phát hiện</b></li>
                    <li>Lựa chọn của biên <br />tập viên</li>
                    <li>Bộ sưu tập được <br /> tuyển chọn</li>
                    <li>Hình ảnh phổ biến</li>
                    <li>Video phổ biến</li>
                    <li>Nhạc phổ biến</li>
                    <li>Các tìm kiếm phổ <br /> biến</li>
                </ul>
                <ul>
                    <li><b>Cộng đồng</b></li>
                    <li>Blog</li>
                    <li>Diễn đàn</li>
                    <li>người sáng tạo</li>
                    <li>Máy ảnh</li>
                </ul>
                <ul>
                    <li><b>Giới thiệu</b></li>
                    <li>Thông tin về chúng <br /> tôi</li>
                    <li>FAQ</li>
                    <li>Tóm tắt giấy phép</li>
                    <li>Điều khoản Dịch vụ</li>
                    <li>Chính sách bảo mật</li>
                    <li>Chính sách cookie</li>
                    <li>API</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer