import React, { useEffect } from 'react';
import "./MainPage.css";
import { useState } from 'react';
import axios from 'axios';
import "./Detail.css";
import Modal from 'react-bootstrap/Modal';

function Mainpage({ search, data, rev }) {
    const [show, setShow] = useState(false);
    const [contents, setContents] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [check, setCheck] = useState();
    const [likes, setLikes] = useState([]);
    const account = JSON.parse(localStorage.getItem('account'));
    const [comment, setComment] = useState({
        comment: "",
        idUser: null,
        idcontent: null
    });

    console.log("==>", data)

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
        let url = 'http://localhost:8000/contents';
        if (search) {
            url += `?q=${search}`;
        }
        if (data) {
            url += `?topic_like=${data}`;
            console.log(url)
        }
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setContents(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [check, data, search, rev]);
    useEffect(() => {
        axios.get(`http://localhost:8000/user`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [check]);

    useEffect(() => {
        axios.get('http://localhost:8000/comment')
            .then(response => {
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
    console.log(rev)
    const getSortedContentsByCommentCount = () => {
        // Sắp xếp các nội dung theo số lượng comment giảm dần
        const sortedContents = [...contents].sort((a, b) => {
            const commentCountA = comments.filter(comment => comment.idcontent === a.id).length;
            const commentCountB = comments.filter(comment => comment.idcontent === b.id).length;
            return commentCountB - commentCountA;
        })
    };
    return (
        <div className='main'>
            {contents.map((e, i) =>
                rev ?
                    (e.browser &&
                        <div className="cards" key={i} variant="primary" onClick={() => handleShowModal(i)}>
                            <img src={e.img} alt="" />
                            <div className="hiden">
                                <div className="icon">
                                    <button><i className={!check ? "fas fa-heart" : "fas fa-heart redog"}></i></button>
                                    <span>{likes.filter(like => like.idcontent === e.id).length}</span>
                                </div>
                                <p>{e.content}</p>
                            </div>
                        </div>) :
                    (
                        // phần này
                        getSortedContentsByCommentCount().map((content, index) => (
                            <div className="cards" key={index} variant="primary" onClick={() => handleShowModal(i)}>
                                <img src={content.img} alt="" />
                                <div className="hiden">
                                    <div className="icon">
                                        <button><i className={!check ? "fas fa-heart" : "fas fa-heart redog"}></i></button>
                                        <span>{likes.filter(like => like.idcontent === content.id).length}</span>
                                    </div>
                                    <p>{content.content}</p>
                                </div>
                            </div>
                        ))
                    )
            )}
            {/* modal */}
            <>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="height"
                    id="height"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="main_modal">
                        <div className="modal_left">
                            <img src={showModal.img} alt="" />
                        </div>
                        <div className="modal_right">
                            <div className="modal_poster">
                                <div className="poster">
                                    <img src={users.find(element => element.id === showModal.idUser)?.img} alt="" />
                                    <strong>{users.find(element => element.id === showModal.idUser)?.fullname}</strong>
                                </div>
                                <p>{showModal.content}</p>
                                <div className="like">
                                    <i className={!check ? "fas fa-heart" : "fas fa-heart redog"} onClick={() => handleClickLike(showModal)}></i>
                                    <span><b>{likes.filter(like => like.idcontent === showModal.id).length}</b> thích</span>
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
                                        <div key={i} className="comment" >
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
        </div >
    )
}

export default Mainpage