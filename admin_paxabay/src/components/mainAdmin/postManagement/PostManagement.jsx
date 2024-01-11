import React, { useState, useEffect } from 'react';
import './PostManagement.css';
import axios from 'axios';

function PostManagement() {
    const [content, setContent] = useState([]);
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(true);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/contents')
            .then((response) => {
                setContent(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/user')
            .then((response) => {
                setUsers(response.data);
                console.log(users);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);

    const handleBlock = (i) => {
        let newContent = [...content];
        newContent[i].browser = false;
        // console.log(i)
        axios.patch(`http://localhost:8000/contents/${newContent[i].id}`, { browser: false })
            .then(response => {
                console.log(response.data);
                setCheck(!check);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUnlock = (i) => {
        let newContent = [...content];
        newContent[i].browser = true;
        axios.patch(`http://localhost:8000/contents/${newContent[i].id}`, { browser: true })
            .then(response => {
                console.log(response.data);
                setCheck(!check);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        axios.get('http://localhost:8000/likes')
            .then((response => {
                debugger
                setLikes(response.data);
            }))
            .catch(error => {
                console.error(error);
            });
    }, [check])
    useEffect(() => {
        axios.get('http://localhost:8000/comment')
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);
    let displayedIndex = 1;
    return (
        <div className='postManagement'>
            <h2>Quản lý bài viết</h2>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh</th>
                        <th>Content</th>
                        <th>Thích</th>
                        <th>Bình Luận</th>
                        <th>Người đăng</th>
                        <th>Quản lý bài viết</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((e, i) =>
                    (
                        content[i].browser &&
                        <tr key={i} >
                            <td className='th1'>{displayedIndex++}</td>
                            <td className='th2'><img src={e.img} alt="" /></td>
                            <td className='th3'>{e.content}</td>
                            <td className='th4'>{likes.filter(like => like.idcontent === e.id).length}</td>
                            <td className='th5'>{comments.filter(comments => comments.idcontent === e.id).length}</td>
                            <td className='th6'>{users.find(element => element.id === e.idUser)?.fullname}</td>
                            <td className='th7'>
                                <button className='btn_lock' onClick={() => handleBlock(i)}>Chặn</button>
                            </td>
                        </tr>
                    ))}
                    {content.map((e, i) => (
                        !content[i].browser &&
                        <tr key={i} >
                            <td className='th1'>{displayedIndex++}</td>
                            <td className='th2'><img src={e.img} alt="" /></td>
                            <td className='th3'>{e.content}</td>
                            <td className='th4'>{e.like}</td>
                            <td className='th5'>{e.numbercomment}</td>
                            <td className='th6'>{users.find(element => element.id === e.idUser)?.fullname}</td>
                            <td className='th7'>
                                <button className='btn_open' onClick={() => handleUnlock(i)}>Bỏ chặn</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default PostManagement;