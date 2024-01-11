import React, { useEffect, useState } from 'react'
import './Edit.css'
import axios from 'axios'
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function Edit() {
    const [leftEdit, setLeftEdit] = useState(true)
    const [users, setUsers] = useState([])
    const [check, setcheck] = useState(true)
    const [checkImg, setcheckImg] = useState(true)
    const [checkImage, setcheckImage] = useState(true)
    const [xemImg, setxemImg] = useState("")
    let account = JSON.parse(localStorage.getItem("account"))
    const [editUser, setEditUser] = useState({
        id: account?.id,
        username: account?.username,
        fullname: account?.fullname,
        email: account?.email,
        nationality: account?.nationality,
        gender: account?.gender,
        birthday: account?.birthday,
        manage: account?.manage,
        password: account?.password,
    })

    useEffect(() => {
        axios.get("http://localhost:8000/user")
            .then(res => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                }
            })
            .catch(error =>
                console.error(error)
            )
    }, [check])

    const handleClickEdit = () => {
        let newLeftEdit = leftEdit;
        newLeftEdit = !newLeftEdit;
        setLeftEdit(newLeftEdit);
        setcheckImg(true)
    }

    const handleChangeEdit = (e) => {
        let newEditUser = { ...editUser }
        setEditUser({ ...newEditUser, [e.target.name]: e.target.value })
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        editUser.fullname !== "" && editUser.gender !== "" && editUser.email !== "" && editUser.nationality !== "" && editUser.birthday !== "" ?
            await axios.patch(`http://localhost:8000/user/${editUser.id}`, editUser)
                .then(res => {
                    console.log(res.data); // Dữ liệu sau khi cập nhật thành công
                    // Tiến hành cập nhật lại trạng thái users hoặc thực hiện các hành động khác
                    localStorage.setItem('account', JSON.stringify(editUser))
                    setLeftEdit(!leftEdit)
                    setcheck(!check)
                    alert("Cập nhập thành công !")
                })
                .catch(error => {
                    console.error(error);
                    // Xử lý lỗi nếu có
                }) :
            alert("Nhập thông tin cập nhập !")
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
                setImageUrls((prev) => [...prev, url])
                setcheckImage(false)
                setxemImg(url)
            });
        });
    };
    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    const handleSubmitEditImg = () => {
        axios.patch(`http://localhost:8000/user/${account.id}`, { img: xemImg })
    }
    return (
        <div className="main_edit">
            <button className='btn btn_edit' onClick={handleClickEdit}>Edit</button>
            <div className="profile_edit">
                <h2>Thông tin cá nhân</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Tên người dùng:</th>
                            <td><b>{account && users.find(element => element.id === account.id)?.fullname}</b></td>
                        </tr>
                        <tr>
                            <th>Avatar:</th>
                            <td>
                                <div className='profile_edit_img'>
                                    <img src={xemImg ? xemImg : account && users.find(element => element.id === account.id)?.img} alt="" />
                                    <div className="create_img">
                                        {
                                            checkImg ?
                                                <button className='create_img_btn' onClick={() => setcheckImg(false)}>Tải ảnh đại diện</button> :
                                                <form action="" onSubmit={handleSubmitEditImg}>
                                                    <input type="file"
                                                        onChange={(e) => {
                                                            setImageUpload(e.target.files[0]);
                                                        }} />
                                                    {checkImage ?
                                                        <p onClick={uploadFile}>xem trước</p> :
                                                        <button> Đăng ảnh</button>
                                                    }
                                                </form>
                                        }
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Giới tính:</th>
                            <td>{account && users.find(element => element.id === account.id)?.gender}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{account && users.find(element => element.id === account.id)?.email}</td>
                        </tr>
                        <tr>
                            <th>Quốc tịch</th>
                            <td>{account && users.find(element => element.id === account.id)?.nationality}</td>
                        </tr>
                        <tr>
                            <th>Ngày sinh:</th>
                            <td>{account && users.find(element => element.id === account.id)?.birthday}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={leftEdit ? 'edit_hiden' : 'edit'}>
                <div className="left_edit">
                    <form onSubmit={handleSubmitEdit}>
                        <h2>Chỉnh sửa thông tin cá nhân</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="fullname">Tên người dùng</label></td>
                                    <td><input type="text" onChange={handleChangeEdit} name="fullname" value={editUser.fullname} /><br /></td>
                                </tr>
                                <tr>
                                    <td>Hãy chọn</td>
                                    <td>
                                        <select onChange={handleChangeEdit} name="gender" value={editUser.gender}>
                                            <option value="">-Giới tính-</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="email">Email</label></td>
                                    <td><input type="email" onChange={handleChangeEdit} name='email' value={editUser.email} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="nationality">Quốc gia</label></td>
                                    <td><input type="text" onChange={handleChangeEdit} name='nationality' value={editUser.nationality} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="birthday">Ngày sinh</label></td>
                                    <td><input type="date" onChange={handleChangeEdit} name='birthday' value={editUser.birthday} /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><button type='submit'>Save</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit
