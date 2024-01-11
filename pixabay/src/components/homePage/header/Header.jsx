import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className='header'>
            <div className="text">
                <div className="upfix">
                    <h1>Kho hình ảnh đẹp miễn phí chất lượng cao</h1>
                    <p>Kho hình ảnh đẹp miễn phí với hơn 1 triệu hình ảnh và video được chia sẻ bởi cộng đồng tài năng của chúng tôi.</p>
                </div>
            </div>
            <span className='note'>Read more about the <a style={{ textDecoration: "underline" }}>Giấy phép nội dung</a></span>
            <span className='book'>Hình ảnh miễn phí của <a style={{ textDecoration: "underline" }}>Nennieinszweidrei</a></span>
            <img src="https://dubaothoitiet.info/Uploads/images/bao-ve-thien-nhien.jpg" alt="" />
        </div>
    )
}

export default Header