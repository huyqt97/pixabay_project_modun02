import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./LoginAdmin.css";

function LoginAdmin() {
    const [admin, setAdmin] = useState({});
    const [checkAdmin, setCheckAdmin] = useState({
        tk: "",
        password: ""
    });

    useEffect(() => {
        axios.get('http://localhost:8000/admin')
            .then((response) => {
                setAdmin(response.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = (e) => {
        setCheckAdmin({ ...checkAdmin, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkAdmin.tk === admin.tk && checkAdmin.password === admin.password) {
            alert("Chào xếp!");
            localStorage.setItem("adminF", JSON.stringify(true));
            window.location.href = '/mainadmin';
        } else {
            alert("Đăng nhập thất bại!");
        }
    };
    const handleBack = () => {
        window.location.href = 'http://localhost:3000'
    }
    return (
        JSON.parse(localStorage.getItem("adminF")) ? window.location.href = '/mainadmin' :
            <div div className='login' >
                <h2>Admin</h2>
                <form action="" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th><label htmlFor="tk">ID:</label></th>
                                <td><input type="text" onChange={handleChange} name='tk' value={checkAdmin.tk} /></td>
                            </tr>
                            <tr>
                                <th><label htmlFor="password">Mật khẩu:</label></th>
                                <td><input type="password" onChange={handleChange} name='password' value={checkAdmin.password} /></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button type="submit">Đăng nhập</button> <button type='button' className='back' onClick={handleBack}>Quay lại</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div >
    );
}

export default LoginAdmin;