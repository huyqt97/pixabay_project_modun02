import React, { useEffect, useState } from 'react'
import './CreateImage.css'
import axios from 'axios';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function CreateImage() {
    const navigate = useNavigate()
    let account = JSON.parse(localStorage.getItem("account"));
    const [check, setCheck] = useState(true)
    const [newContent, setNewContent] = useState({
        img: "",
        content: "",
        topic: "",
        browser: true,
        like: [],
        idUser: null
    })
    const [contents, setContents] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/contents')
            .then(response => {
                setContents(response.data);
                console.log(contents);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);
    const handleChange = (e) => {
        setNewContent({
            ...newContent, [e.target.name]: e.target.value, idUser: account.id, browser: true,
            like: [],
        });
        console.log(newContent)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newContent.img !== "" && newContent.content !== "") {
            await axios.post('http://localhost:8000/contents', newContent)
                .then(response => {
                    setContents(response.data);
                    console.log(contents);
                    alert("Đăng ảnh thành công!")
                    navigate("/profile")
                    setCheck(!check)
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Chưa điền đủ thông tin !")
        }
        console.log(contents)
    }

    // State upload ảnh lên
    const [imageUpload, setImageUpload] = useState(null);
    // State lấy url ảnh về
    const [imageUrls, setImageUrls] = useState([]);


    // Bước 1: Upload ảnh
    // Bước 2: Lấy ảnh về
    // Bước 3: Hiển thị ảnh


    // Tạo storage lưu trữ từ dịch vụ của firebase
    const imagesListRef = ref(storage, "images/");

    // Viết hàm upload
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
                setNewContent({ ...newContent, img: url })
            });
        });
    };
    // Lấy dữ liệu trả về từ firebase
    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    console.log(url);
                });
            });
        });
    }, []);
    return (
        <div className='createImage'>
            <div className="left">
                <ul>
                    <li><h4>Các loại tệp được hỗ trợ</h4></li>
                    <li>
                        <p><strong>Photos/Vectors</strong></p>
                        <p>JPG, PNG, PSD, AI, và SVG hình ảnh lên đến 40 MB với ít nhất 3000 điểm ảnh dọc theo một bên. <span>Image Quality Guidelines...</span></p>
                    </li>
                    <li>
                        <p><strong>Video</strong></p>
                        <p>MPEG, MOV, and AVI videos up to 300 MB and a minimum resolution of 1920x800 pixels. Clips should be no longer than 60 seconds. <span> Video Quality Guidelines....</span></p>
                    </li>
                    <li>
                        <p><strong>Photos/Vectors</strong></p>
                        <p>Giới hạn kích thước tệp nhạc MP3, WAV, AAC, FLAC, AIF và M4A tối đa là 100 MB. Thời lượng không được dài quá 15 phút.  <span> Music Quality Guidelines....</span></p>
                    </li>
                    <li>
                        <p><strong>GIF</strong></p>
                        <p>Tệp GIF lên đến 25 MB với ít nhất 64 điểm ảnh trên một cạnh. Thời lượng không được dài quá 20 giây. <span>Hướng dẫn về chất lượng GIF....</span></p>
                    </li>
                </ul>
            </div>
            <div className="rigth">
                <h2>Update Image</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Chủ đề</label><br />
                    <select onChange={handleChange} name="topic" value={newContent.topic}>
                        <option value="">-chọn-</option>
                        <option value="thiên nhiên">Thiên Nhiên</option>
                        <option value="anime">Anime</option>
                        <option value="girl">Girl</option>
                        <option value="việt nam">Việt Nam</option>
                        <option value="biển">Biển</option>
                        <option value="background">background</option>
                        <option value="động vật">động vật</option>
                        <option value="Chủ đề khác">Chủ đề khác</option>
                    </select><br />
                    <label htmlFor="">File</label><br />
                    <input type="file"
                        onChange={(e) => {
                            setImageUpload(e.target.files[0]);
                        }} /><br />
                    <p onClick={uploadFile} className='btn_fake'> check</p>
                    <div className="check_img">
                        <img src={newContent.img} alt="" />
                    </div>
                    <label htmlFor="">Nột dung</label><br />
                    <textarea onChange={handleChange} name="content" value={newContent.content}></textarea><br />
                    <div className="btn1">
                        <button> Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateImage