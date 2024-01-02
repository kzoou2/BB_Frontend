import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { PCContents, MobileContents, PCModalWrap, MobileModalWrap, Overlay } from '../../../style/styled_components/FeedModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { Mobile, PC } from '../../Responsive';
import { SiHeadspace } from "react-icons/si";
import { IoMusicalNoteSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import '../../../style/css/FeedDetail.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Home에서 좋아요, 북마크 변수 값 받아야함. 디테일에서 변경한 값도 Home으로 보내서 공유해야함.
function FeedDetail({ onClose, music }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");

    const handleClose = () => {
        onClose?.();
    };

    useEffect(() => {
        const $body = document.querySelector("body");
        const overflow = $body.style.overflow;
        $body.style.overflow = "hidden";
        return () => {
            $body.style.overflow = overflow
        };
    }, []);

    const clickNote = () => {
        setIsNoteClicked(!isNoteClicked);
    }

    const goDM = () => {
        navigate('/dm');
    }

    const onBookmark = () => {
        setIsBookmarked(!isBookmarked);
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const inputComment = async (feedId) => {
        await axios.post(
            `https://9d71-121-143-39-62.ngrok-free.app/api/comments/save/${feedId}`,
            {
                comment: `${comment}`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log("댓글 작성 API 호출 중 오류", error);
            });
    };

    useOutSideClick(modalRef, handleClose)

    return (
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <PCModalWrap ref={modalRef}>
                            <PCContents>
                                <div className='d-flex justify-content-center'>
                                    <div className='justify-content-center' style={{ width: "50%", backgroundColor: "white" }}>
                                        <div className='d-flex justify-content-end me-4' style={{}}>
                                            <span className=''>
                                                <IoMusicalNoteSharp id={`${isNoteClicked ? 'clicked' : ''}`} className='me-4' size='26' onClick={() => clickNote()} style={{ cursor: "pointer" }} />
                                                <IoPaperPlaneOutline className='me-4' size='26' onClick={() => goDM()} style={{ cursor: "pointer" }} />
                                                {isBookmarked ? (
                                                    <FaBookmark className='' size='26' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                ) : (
                                                    <FaRegBookmark className='' size='26' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                )}
                                            </span>
                                        </div>
                                        <img className='mt-3' style={{ width: "95%", height: "95%" }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl} alt={music.musicInfoList[0].musicTitle}></img>
                                    </div>
                                    <div className='ms-2' style={{ width: "50%", backgroundColor: "white" }}>
                                        <div className='d-flex justify-content-start'>
                                            <a href='/BB_Frontend/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                        </div>
                                        <hr />
                                        <div className='justify-content-center text-center'>
                                            <h5>{music.musicInfoList[0].musicTitle} · {music.musicInfoList[0].musicArtist}</h5>
                                            <p>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                        </div>
                                        <div className='justify-content-start text-start'>
                                            <p>{music.content}</p>
                                            {music.tagName.map((tag, index) => (
                                                <p key={index} className='btn btn-outline-primary btn-sm me-2 rounded-pill disabled'>#{tag}</p>
                                            ))}
                                        </div>
                                        <hr />
                                        <div className='justify-content-start text-start'>
                                            {music.comments.map((data) => (
                                                <p key={data.id}>{data.nickName} : {data.comment}</p>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-center" id='search'>
                                            <input type="text" className="search_input" placeholder="댓글을 입력하세요." onChange={handleCommentChange} value={comment} />
                                            <button className="search_button" onClick={() => inputComment(music.id)}>입력</button>
                                        </div>
                                    </div>
                                </div>
                            </PCContents>
                        </PCModalWrap>
                    </Overlay>
                </ModalContainer>
            </PC>

            <Mobile>
                <ModalContainer>
                    <Overlay>
                        <MobileModalWrap ref={modalRef}>
                            <MobileContents>
                                <div>
                                    <div className='d-flex justify-content-center'>
                                        <div className='d-flex justify-content-start mb-3' style={{ width: "50%" }}>
                                            <a href='/BB_Frontend/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                        </div>
                                        <div className='d-flex justify-content-end mt-2 me-1' style={{ width: "50%" }}>
                                            <span className=''>
                                                <IoMusicalNoteSharp id={`${isNoteClicked ? 'clicked' : ''}`} className='me-4' size='26' onClick={() => clickNote()} style={{ cursor: "pointer" }} />
                                                <IoPaperPlaneOutline className='me-4' size='26' onClick={() => goDM()} style={{ cursor: "pointer" }} />
                                                {isBookmarked ? (
                                                    <FaBookmark className='' size='26' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                ) : (
                                                    <FaRegBookmark className='' size='26' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center mb-1'>
                                        <img style={{ width: "40%", height: "40%" }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl} alt={music.musicInfoList[0].musicTitle}></img>
                                    </div>
                                    <div className='justify-content-center mt-3'>
                                        <div className='text-center'>
                                            <h5>{music.musicInfoList[0].musicTitle} · {music.musicInfoList[0].musicArtist}</h5>
                                            <p>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                        </div>
                                        <div className='text-start'>
                                            <p>{music.content}</p>
                                            {music.tagName.map((tag, index) => (
                                                <p key={index} className='btn btn-outline-primary btn-sm me-2 rounded-pill disabled'>#{tag}</p>
                                            ))}
                                        </div>
                                        <hr />
                                        <div className='text-start'>
                                            {music.comments.map((data) => (
                                                <p key={data.id}>{data.nickName} : {data.comment}</p>
                                            ))}
                                        </div>
                                        <div className="search" id='search'>
                                            <input type="text" className="search_input" placeholder="댓글을 입력하세요." />
                                            <button className="search_button">입력</button>
                                        </div>
                                    </div>
                                </div>
                            </MobileContents>
                        </MobileModalWrap>
                    </Overlay>
                </ModalContainer>
            </Mobile>
        </div>
    );
}

export default FeedDetail;