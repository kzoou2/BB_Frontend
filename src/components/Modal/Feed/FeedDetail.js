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

// Home에서 좋아요, 북마크 변수 값 받아야함. 디테일에서 변경한 값도 Home으로 보내서 공유해야함.
function FeedDetail({ onClose, music }) {
    const modalRef = useRef(null)
    const navigate = useNavigate();
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

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
                                        <img className='mt-3' style={{ width: "95%", height: "95%" }} src={music.album_cover} alt={music.title}></img>
                                    </div>
                                    <div className='ms-2' style={{ width: "50%", backgroundColor: "white" }}>
                                        <div className='d-flex justify-content-start'>
                                            <a href='/BB_Frontend/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                        </div>
                                        <hr />
                                        <div className='justify-content-center text-center'>
                                            <h5>{music.title} · {music.artist}</h5>
                                            <p>{music.album} · {music.release_year}</p>
                                        </div>
                                        <div className='justify-content-start text-start'>
                                            <p>글 내용</p>
                                            <p>해시태그</p>
                                        </div>
                                        <hr />
                                        <div className='justify-content-start text-start'>
                                            <p>댓글 1</p>
                                            <p>댓글 2</p>
                                            <p>댓글 3</p>
                                            <p>댓글 4</p>
                                            <p>댓글 5</p>
                                        </div>
                                        <div className="d-flex justify-content-center" id='search'>
                                            <input type="text" className="search_input" placeholder="댓글을 입력하세요." />
                                            <button className="search_button">입력</button>
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
                                        <img style={{ width: "40%", height: "40%" }} src={music.album_cover} alt={music.title}></img>
                                    </div>
                                    <div className='justify-content-center mt-3'>
                                        <div className='text-center'>
                                            <h5>{music.title} · {music.artist}</h5>
                                            <p>{music.album} · {music.release_year}</p>
                                        </div>
                                        <div className='text-start'>
                                            <p>글 내용</p>
                                            <p>해시태그</p>
                                        </div>
                                        <hr />
                                        <div className='text-start'>
                                            <p>댓글 1</p>
                                            <p>댓글 2</p>
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