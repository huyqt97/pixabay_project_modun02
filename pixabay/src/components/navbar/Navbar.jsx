import React, { useEffect } from 'react'
import "./Navbar.css"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

function Navbar({ handleChangeSearch }) {
    const [lgShow, setLgShow] = useState(false);
    const [checklogin, setCheckLogin] = useState(true);
    const [checkPassWord, setCheckPassWord] = useState(true);
    const [checkNav, setCheckNav] = useState(true)
    const [users, setUsers] = useState([])
    const [check, setCheck] = useState(true)
    let account = JSON.parse(localStorage.getItem('account'))
    const [textSearch, setTextSearch] = useState("")
    const [checkUser, setCheckUser] = useState({
        username: "",
        password: "",
    })
    useEffect(() => {
        axios.get('http://localhost:8000/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);
    const handleLogin = () => {
        setCheckLogin(true);
    }
    const handleSignUp = () => {
        setCheckLogin(false)
    }
    const handleCheckPassword = () => {
        let newCheckPassword = checkPassWord;
        newCheckPassword = !newCheckPassword;
        setCheckPassWord(newCheckPassword)
    }
    const [formUser, setFormUser] = useState({
        username: "",
        img: "",
        fullname: "",
        email: "",
        nationality: "",
        gender: "",
        birthday: "",
        manage: true,
        password: ""
    })
    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormUser({
            ...formUser, [name]: value
        })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        let comparison = users.findIndex(element => element.username === formUser.username)
        console.log(comparison)
        if (users.findIndex(element => element.username === formUser.username)) {
            if (formUser.email !== "" && formUser.username.length >= 6 && formUser.password.length >= 6) {
                axios.post("http://localhost:8000/user", formUser)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                alert("Đăng ký thành công!")
                setCheckLogin(true)
                setCheck(!check)
                setFormUser({
                    username: "",
                    img: "",
                    fullname: "",
                    email: "",
                    nationality: "",
                    gender: "",
                    manage: true,
                    birthday: "",
                    password: ""
                }
                )
            } else {
                alert("mời nhập đủ thông tin")
            }
        } else {
            alert("tài khoản đã tồn tại!")
            setFormUser({
                username: "",
            }
            )
        }
    }
    const handleChangeLogin = (e) => {
        setCheckUser({ ...checkUser, [e.target.name]: e.target.value })
    }
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const foundUser = users.find(user => user.username === checkUser.username && user.password === checkUser.password);
        if (foundUser) {
            if (foundUser.manage) {
                let index = -1
                for (let i = 0; i < users.length; i++) {
                    if (users[i].username === foundUser.username) {
                        index = i
                    }
                }
                if (index !== -1) {
                    alert("Đăng nhập thành công!");
                    localStorage.setItem("account", JSON.stringify(users[index]))
                    window.location.href = '/'
                }
            } else {
                alert("Tài khoản đã bị khóa!")
            }
        } else {
            alert("Đăng nhập thất bại!");
            alert("Sai tên Tài khoản hoặc mật khẩu!");
        }
    }
    return (
        <>
            {checkNav ? <div className='navbar'>
                <a href="#"><h1>Pixabay</h1></a>
                <div className='search'>
                    <button><i className="fas fa-search"></i></button>
                    <input type="text" placeholder='Tìm kiếm trên pixabay' onChange={handleChangeSearch} />
                </div>
                {JSON.parse(localStorage.getItem("account")) ? <div className="rigth">
                    <i className="fa-solid fa-bell"></i>
                    <NavLink to='/profile'><img src={users.find(element => element.id === account.id)?.img} alt="" onClick={() => setCheckNav(false)} /></NavLink>
                    <NavLink to='/function/createimage'><button onClick={() => setCheckNav(false)}><i className="fas fa-upload"></i> Tải lên</button></NavLink>
                </div> : <div className="rigth">
                    <button onClick={() => setLgShow(true)}>Đăng nhập</button>
                    <button><a href="http://localhost:4000/"><i className="fas fa-user-cog"></i> Admin</a></button>
                </div>
                }
                {/* modal */}
                <>
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                        className='modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Sign up to download unlimited full resolution media
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='login'>
                            <div className="nav_modal">
                                <button onClick={handleSignUp} style={{ backgroundColor: checklogin ? "transparent" : "#f1e8e8", borderBottom: checklogin ? "3px solid transparent" : "3px solid #14bc7d" }}>Sign Up</button>
                                <button onClick={handleLogin} style={{ backgroundColor: checklogin ? "#f1e8e8" : "transparent", borderBottom: checklogin ? "3px solid #14bc7d" : "3px solid transparent" }}>Đăng nhập</button>
                            </div>
                            {checklogin ? <form action="" onSubmit={handleSubmitLogin}>
                                <label htmlFor="">Tên đăng nhập hoặc email</label><br />
                                <input type="text" onChange={handleChangeLogin} name='username' value={checkUser.username} /><br />
                                <div className="validate"></div>
                                <label htmlFor="">Mật khẩu</label><br />
                                <div className='pass'><input type={checkPassWord ? "password" : "text"} onChange={handleChangeLogin} name='password' value={checkUser.password} /><br /><i className="fa-solid fa-eye" onClick={handleCheckPassword}></i></div>
                                <div className="validate"></div>
                                <button>Đăng nhập</button>
                            </form> :
                                <form action="" onSubmit={handleRegister}>
                                    <label htmlFor="">*Tài khoản</label><br />
                                    <input type="text" name='username' onChange={handleChangeInput} value={formUser.username} /><br />
                                    <div className="validate"></div>
                                    <label htmlFor="">*Tên người dùng</label><br />
                                    <input type="text" name='fullname' onChange={handleChangeInput} value={formUser.fullname} /><br />
                                    <div className="validate"></div>
                                    <label htmlFor="">*Email</label><br />
                                    <input type="email" name='email' onChange={handleChangeInput} value={formUser.email} /><br />
                                    <div className="validate"></div>
                                    <label htmlFor="">Mật khẩu</label><br />
                                    <div className='pass'><input type={checkPassWord ? "password" : "text"} onChange={handleChangeInput} name='password' value={formUser.password} /><br /><i className="fa-solid fa-eye" onClick={handleCheckPassword}></i></div>
                                    <div className="validate"></div>
                                    <button type='submit'>Đăng ký</button>
                                </form>}
                            <div className="footer_modal">
                                <dic><h5>Forgot password?</h5></dic>
                                <p>This site is protected by reCAPTCHA and the Google <b>Privacy Policy</b> and <b>Terms of Service</b> apply.</p>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            </div> : <div className='navfunctions'>
                <div className="left">
                    <NavLink to="/"><h1 onClick={() => setCheckNav(true)}>Pixabay</h1></NavLink>
                </div>
                <div className="rigth">
                    <i className="fa-solid fa-bell"></i>
                    <NavLink to='/profile'><img src={users.find(element => element.id === account.id)?.img} alt="" /></NavLink>
                    <NavLink to='/function/createimage'><button><i className="fas fa-upload"></i> Tải lên</button></NavLink>
                </div>
            </div>}

        </>
    )
}

export default Navbar