import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import "./Detail.css";
import Modal from 'react-bootstrap/Modal';
import FooterFunction from '../functions/navFunctions/FooterFunction';
function Profile() {
    const [show, setShow] = useState(false);
    const [contents, setContents] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [check, setCheck] = useState(null)
    const [checkSetting, setCheckSetting] = useState(false)
    const [editContent, setEditContent] = useState(true)
    const [hiden, setHiden] = useState(true)
    const [likes, setLikes] = useState([]);
    const [comment, setComment] = useState({
        comment: "",
        idUser: null,
        idcontent: null
    });
    let account = JSON.parse(localStorage.getItem('account'))
    const handleLogOut = () => {
        localStorage.removeItem("account")
        window.location.href = '/'
    }

    useEffect(() => {
        axios.get('http://localhost:8000/likes')
            .then((response => {
                setLikes(response.data);
            }))
            .catch(error => {
                console.error(error);
            });
    }, [check])

    useEffect(() => {
        axios.get('http://localhost:8000/contents')
            .then(response => {
                setContents(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);
    console.log(contents);

    useEffect(() => {
        axios.get('http://localhost:8000/user')
            .then(response => {
                setUsers(response.data);
                console.log(users);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);

    useEffect(() => {
        axios.get('http://localhost:8000/comment')
            .then(response => {
                console.log(response.data)
                setComments(response.data);

            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);

    const handleShowModal = (i) => {
        setShow(true);
        let newContents = [...contents];
        setShowModal(newContents[i]);
    };

    const handleChangeComment = (e) => {
        setComment({ comment: e.target.value, idUser: account.id, idcontent: showModal.id });
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        console.log(comment)
        axios.post('http://localhost:8000/comment', comment)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setComment({
            comment: "",
            idUser: null,
            idcontent: null
        });
        setCheck(!check)
    };
    let length = 0
    let message = 0
    if (account) {
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].idUser === account.id) {
                length += 1;
            }
        }
    }
    const handleSetting = () => {
        setCheckSetting(!checkSetting)
    }
    const handleSetting2 = () => {
        setCheckSetting(false)
    }
    const handleClickDelete = (id) => {
        setCheck(!check);
        axios.delete(`http://localhost:8000/contents/${id}`)
            .then(response => {
                // Xử lý phản hồi thành công
                setShow(false);
                alert("xóa thành công !")
                setCheck(!check)
                setCheckSetting(false);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleChangeFormEditContent = (e) => {
        setShowModal({ ...showModal, content: e.target.value })
    }
    const handleSubmitFormEditContent = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/contents/${showModal.id}`, showModal)
            .then(res => {
                setEditContent(true)
                setHiden(true)
                alert("Cập nhập thành công !")
                setCheck(!check)
            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleClickLike = (showModal) => {
        const idLikeCheckUser = likes.findIndex((element) => element.idUsers === account.id && element.idcontent === showModal.id);

        console.log(idLikeCheckUser)
        if (idLikeCheckUser !== -1) {
            // Đã tồn tại like từ người dùng trên nội dung này, xóa like
            axios.delete(`http://localhost:8000/likes/${likes[idLikeCheckUser].id}`)
                .then(() => {
                    setCheck(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Chưa tồn tại like từ người dùng trên nội dung này, thêm like
            axios.post('http://localhost:8000/likes', {
                idUsers: account.id,
                idcontent: showModal.id
            })
                .then(() => {
                    setCheck(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div className='profile'>
            <div className="header_profile">
                <div className="infor">
                    <h2>{users.find(element => element.id === account.id)?.fullname}</h2>
                    <img src={users.find(element => element.id === account.id)?.img} alt="" />
                    <div className="profile_icon">
                        <span><i className="fa-regular fa-image"></i> <b>{length}</b></span>
                        <span><i className="fas fa-download"></i> <b>0</b></span>
                        <span><i className="fas fa-heart"></i> <b>{likes.filter(like => like.idUsers === account.id).length}</b></span>
                        <span><i className="fas fa-comment"></i> <b>{message}</b></span>
                        <span><i className="fas fa-user-friends"></i> <b>0</b></span>
                    </div>
                </div>
                <div className="update_profile"><button className='btn_logout' onClick={handleLogOut}>LogOut</button><NavLink to="/function/edit"><button>sửa hồ sơ cá nhân</button></NavLink></div>
                <button className='mess'>Tin nhắn</button>
            </div>
            <div className="moments">
                {contents.map((e, i) =>
                    account && (e.idUser === account.id &&
                        <div className="cards" key={i} variant="primary" onClick={() => handleShowModal(i)}>
                            <img src={e.img} alt="" />
                            <div className="hiden">
                                <div className="icon">
                                    <button><i className={!check ? "fas fa-heart" : "fas fa-heart redog"}></i></button>
                                    <span>{likes.filter(like => like.idcontent === e.id && like.idUsers === account.id
                                    ).length}</span>
                                </div>
                                <p>{e.content}</p>
                            </div>
                        </div>)
                )}
                {/* modal */}
                <>
                    <Modal
                        show={show}
                        onHide={() => (setShow(false), setEditContent(true))}
                        dialogClassName="height"
                        id="height"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton onClick={handleSetting2}>
                            <Modal.Title id="example-custom-modal-styling-title">
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="main_modal">
                            <div className="modal_left">
                                <img src={showModal.img} alt="" />
                            </div>
                            <div className="modal_right">
                                <div className="modal_poster">
                                    <div className="setting_edit">
                                        <div className="poster">
                                            <img src={users.find(element => element.id === showModal.idUser)?.img} alt="" />
                                            <strong>{users.find(element => element.id === showModal.idUser)?.fullname}</strong>
                                        </div>
                                        <div className="click_edit">
                                            <i class={hiden ? "fas fa-ellipsis-h" : "fas fa-ellipsis-h hiden"} onClick={handleSetting} style={{ marginBottom: "25px" }}></i>
                                            {checkSetting &&
                                                <ul>
                                                    <li onClick={() => (setEditContent(false), setCheckSetting(false), setHiden(false))}>sửa</li>
                                                    <li onClick={() => handleClickDelete(showModal.id)}>xóa</li>
                                                </ul>}
                                        </div>
                                    </div>
                                    <div className="content_moddal">
                                        {editContent ? <p>{showModal.content}</p> :
                                            <form onSubmit={handleSubmitFormEditContent}>
                                                <input type="text" onChange={handleChangeFormEditContent} value={showModal.content} />
                                                <button>Lưu</button>
                                            </form>}
                                        <div className="like">
                                            <i className={!check ? "fas fa-heart" : "fas fa-heart redog"} onClick={() => handleClickLike(showModal)}></i>
                                            <span><b>{likes.filter(like => like.idcontent === showModal.id && like.idUsers === account.id
                                            ).length}</b>thích</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal_reviewers">
                                    {JSON.parse(localStorage.getItem('account')) ? (
                                        <form className="write" onSubmit={handleSubmitComment}>
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                onChange={handleChangeComment}
                                                value={comment.comment}
                                            />
                                            <button>Send</button>
                                        </form>
                                    ) : (
                                        <p className="checkLogin">Đăng Nhập để comment</p>
                                    )}          <div className="list_comment">
                                        {comments.map((e, i) => (
                                            showModal.id === e.idcontent &&
                                            <div className="comment" >
                                                <div className="commenter">
                                                    <img src={users.find(element => element.id === e.idUser)?.img} alt="" />
                                                    <p>
                                                        <strong>{users.find(element => element.id === e.idUser)?.fullname}</strong>
                                                    </p>
                                                </div>
                                                <p>{e.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            </div>
            <FooterFunction />
        </div >
    )
}

export default Profile