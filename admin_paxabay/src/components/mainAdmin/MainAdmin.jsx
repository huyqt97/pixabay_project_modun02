import React from 'react'
import "./MainAdmin.css"
import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function MainAdmin() {
    const adminF = JSON.parse(localStorage.getItem('adminF'))
    const [show, setShow] = useState(false)
    const handleShow = () => {
        let newShow = show;
        newShow = !newShow;
        setShow(newShow)
    }
    const handleLogOut = () => {
        localStorage.setItem("adminF", JSON.stringify(false))
        window.location.href = "/"
    }
    const handleclick = () => {
        setShow(false)
    }
    return (
        adminF ?
            <div>
                <div className="nav_admin">
                    <h1>Admin</h1>
                    <div className="action">
                        <button onClick={handleShow}><i className="fas fa-bars"></i></button>
                        <ul className={show ? 'nav_show' : 'nav_hiden'}>
                            <li><NavLink to="/mainadmin/postmanagement" onClick={handleclick}>Quản lý bài viết</NavLink> </li>
                            <li><NavLink to="/mainadmin/usermanagement" onClick={handleclick}>Quản lý người dùng</NavLink> </li>
                            <li><a href="http://localhost:3000/">Về pixabay</a> </li>
                            <li onClick={handleLogOut}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <main>
                    <Outlet />
                </main>
                <div className="post_management">

                </div>
            </div> : window.location.href = '/'
    )
}

export default MainAdmin