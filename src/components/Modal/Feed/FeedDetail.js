import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalContainer from '../Config/ModalContainer';
import { PCContents, MobileContents, PCModalWrap, MobileModalWrap, Overlay } from '../../../style/styled_components/FeedDetailModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { Mobile, PC } from '../../Responsive';
import { SiHeadspace } from "react-icons/si";
import { IoMusicalNoteSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { LuMoreHorizontal, LuMoreVertical  } from "react-icons/lu";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { CloseButton } from 'react-bootstrap';
import '../../../style/css/FeedDetail.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Home에서 좋아요, 북마크 변수 값 받아야함. 디테일에서 변경한 값도 Home으로 보내서 공유해야함.
// TODO: 모바일 미작업, 디테일 클릭할 때 다시 서버에서 통신해야할 듯
function FeedDetail({ onClose, music }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState(music.comments);
    const [isToggled, setIsToggled] = useState(false);


    console.log(music)

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
            `http://localhost:8080/api/comments/save/${feedId}`,
            {
                comment: `${comment}`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        )
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCommentList(prev => [...prev, response.data]);
                setComment("");
            })
            .catch((error) => {
                console.log("댓글 작성 API 호출 중 오류", error);
            });
    };

    // useEffect(()=>{
    //     axios.get(`http://localhost:8080/api/v1/users/search/${music.nickName}`,{
    //         headers:{
    //             'Content-Type': `application/json`,
    //             'ngrok-skip-browser-warning': '69420',
    //         },
    //     })
    //         .then((response) => {
    //             console.log("result", response.data);
    //         })
    //         .catch((error) =>{
    //             console.error("오류", error)
    //         })
    // },[music.nickName]);

    const handleClick = ()=> {
        setIsToggled(!isToggled);
    }

    useOutSideClick(modalRef, handleClose)

    return (
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <PCModalWrap ref={modalRef}>
                            <CloseButton class="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                            <PCContents>
                                <div className='d-flex justify-content-center'>
                                    <div className='justify-content-center' style={{ width: "50%", backgroundColor: "#242424" }}>
                                        <div className='d-flex justify-content-end me-4' style={{}}>
                                            <span className=''>
                                                <IoMusicalNoteSharp id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} className='me-4' size='26' onClick={() => clickNote()} style={{ cursor: "pointer" }} />
                                                <IoPaperPlaneOutline className='me-4' size='26' color='white' onClick={() => goDM()} style={{ cursor: "pointer" }} />
                                                {isBookmarked ? (
                                                    <FaBookmark className='' size='26' color='white' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                ) : (
                                                    <FaRegBookmark className='' size='26' color='white' onClick={() => onBookmark()} style={{ cursor: "pointer" }} />
                                                )}
                                            </span>
                                        </div>
                                        <img className='mt-3' style={{ width: "95%", height: "90%" }} src={music.feedImgSrc || music.musicInfoList[0].albumUrl} alt={music.musicInfoList[0].musicTitle}></img>
                                    </div>
                                    <div className='ms-2' style={{ width: "50%", backgroundColor: "#242424", color: "white" }}>
                                        <div className='d-flex justify-content-start'>
                                            <Link to={`/profile/${music.nickName}`} style={{ textDecorationLine: "none", color: "white" }}>
                                            <img className='userimg' src={music.userImgSrc} alt="User Avatar" style={{ width: '40px', height:'40px'}} /> {music.nickName}</Link>
                                            <div className='edbtn' >
                                                <button onClick={handleClick}>
                                                    {isToggled ? 
                                                    <>
                                                        <LuMoreVertical style={{color:'white', margin: '10px'}} />
                                                            <GrEdit id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer", margin:'5px' }} />
                                                            <RiDeleteBinLine id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer", margin:'5px' }} />
                                                        {/* <button className='editbtn'><GrEdit id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer" }} /></button>
                                                        <button className='delbtn'><RiDeleteBinLine id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer" }} /></button> */}
                                                            {/* <button class="edit-button" onClick={() => console.log('삭제')}>
                                                                <svg class="edit-svgIcon" viewBox="0 0 512 512">
                                                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                                                </svg>
                                                            </button>
                                                            <button class="delete-button" onClick={() => console.log('수정')}>
                                                                <svg class="delete-svgIcon" viewBox="0 0 448 512">
                                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                                                </svg>
                                                            </button> */}
                                                        </> : 
                                                        
                                                        <LuMoreHorizontal style={{color:'white', margin: '10px'}} />}
                                                </button>
                                            </div>

                                        </div>
                                        <hr />
                                        {/* 뮤직정보표시  */}
                                        <div className='musiccard' style={{}}>
                                            <div className='musicContent'>
                                                <p className='musictitle'>{music.musicInfoList[0].musicTitle}</p>
                                                <p className='Artist' >{music.musicInfoList[0].musicArtist}</p>
                                                <p className='albumInfo'>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                            </div>
                                        </div>

                                        <div className='feedcontent'>
                                            <div className='justify-content-start text-start'>
                                                <p style={{fontSize:'16px', color:'white'}} className='feedtext'>{music.content}</p>
                                                {music.tagName.map((tag, index) => (
                                                    <p key={index} className='btn btn-warning btn-sm me-2 rounded-pill' style={{fontSize:'13px'}}>#{tag}</p>
                                                ))}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='justify-content-start text-start' style={{ height: "20vh", overflow: "scroll" }}>
                                            {commentList.map((data) => (
                                                <p key={data.id}> <img className='userimg' src={music.userimgSrc} alt="User Avatar" style={{ width: '30px', height:'30px'}} /> {data.nickName} : {data.comment}</p>
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
                                            <Link to='/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</Link>
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