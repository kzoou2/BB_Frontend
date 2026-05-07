import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalContainer from '../Config/ModalContainer';
import { PCContents, MobileContents, PCModalWrap, MobileModalWrap, Overlay } from '../../../style/styled_components/FeedDetailModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { Mobile, PC } from '../../Responsive';
import { IoMusicalNoteSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { LuMoreHorizontal, LuMoreVertical  } from "react-icons/lu";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { CloseButton } from 'react-bootstrap';
import FeedEdit from './FeedEdit';
import FeedDelete from './FeedDelete';
import TextInput from '../../Common/TextInput';
import { VscSend } from "react-icons/vsc";
import { IoMusicalNotes } from "react-icons/io5";
import '../../../style/css/Hashtag.css'
import '../../../style/css/FeedDetail.css'


// Home에서 좋아요, 북마크 변수 값 받아야함. 디테일에서 변경한 값도 Home으로 보내서 공유해야함.
// TODO: 모바일 미작업, 디테일 클릭할 때 다시 서버에서 통신해야할 듯
function FeedDetail({ onClose, music, musicId }) { 
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState(music.comments);
    const [isToggled, setIsToggled] = useState(false);
    const [isFeedEdit, setIsFeedEdit] = useState(false);
    const [isFeedDelete, setIsFeedDelete] = useState(false);


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

    const handleLikeToggle = async() => {
        try{
            const url = `http://localhost:8080/api/feeds/${music.id}/${isLiked ? 'unlike' : 'like'}`;
            
            const response = await axios.post(url, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            if (response.status === 200) {
                setIsLiked(prev => !prev); 
                console.log(isLiked ? '좋아요 취소 성공' : '좋아요 성공');
            }
        } catch (error) {
            console.error('좋아요 토글 중 오류 발생:', error);
        }
    };

    const goDM = () => {
        navigate('/dm');
    }

    const handleBookmark = async() => {
        try{
            const res = await axios.post(`http://localhost:8080/api/feeds/${music.id}/${isBookmarked ? 'unbookmark' : 'bookmark'}`, null,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            if (res.status === 200){
                setIsBookmarked(prev => !prev);
                console.log(isBookmarked? '북마크 취소 성공':'북마크 성공');
            }
        } catch(error){
            console.log('북마크 토글 중 오류 발생', error);
        }
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const goFeedEdit = () =>{
        setIsFeedEdit(true);
    }

    const goFeedDelete = () =>{
        setIsFeedDelete(true);
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


    const handleClick = ()=> {
        setIsToggled(!isToggled);
    }

    useOutSideClick(modalRef, handleClose)

    const getRelativeTime = (dateString) => {
        const now = new Date();
        const createdAt = new Date(dateString);
        const diffInMs = now - createdAt; // 밀리초 차이
        const diffInSeconds = diffInMs / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        const diffInWeeks = diffInDays / 7;

        if (diffInDays < 7) {
            if (diffInDays < 1) {
                if (diffInHours < 1) {
                    return `${Math.round(diffInMinutes)}분 전`;
                }
                return `${Math.round(diffInHours)}시간 전`;
            }
            return `${Math.round(diffInDays)}일 전`;
        } else {
            return `${Math.round(diffInWeeks)}주 전`;
        }
    };

    return (
        <div>
            <PC>
            {isFeedEdit || isFeedDelete ? null : (
                <ModalContainer>
                    <Overlay>
                        <PCModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <PCContents >
                                <div style={{ display: 'flex', height: '100%' }}>
                                    <div className="musicdetail-left">
                                        <img src={music.feedImgSrc || music.musicInfoList[0].albumUrl} alt="앨범 커버" className="musicimg" />
                                    </div>

                                    <div className="musicdetail-right">
                                        <div className="music-header">
                                            <div className="user-music-info">
                                                <Link to={`/profile/${music.nickName}`} className="musicuser">
                                                    <img src={music.userImgSrc} alt="유저" className="musicuserimg" />
                                                    <span className="musicusername">{music.nickName}</span>
                                                </Link>
                                            </div>

                                            <div className="icon-group">
                                                <IoMusicalNoteSharp id={`${isLiked ? 'liked' : 'unliked'}`} size={20} onClick={handleLikeToggle} style={{ cursor: "pointer", color: isLiked ? '#FEF164' : '' }} />
                                                <IoPaperPlaneOutline size={20} onClick={goDM} style={{ cursor: "pointer" }} />
                                                {isBookmarked ? (
                                                    <FaBookmark size={20} onClick={handleBookmark} style={{ cursor: "pointer" }} />
                                                ) : (
                                                    <FaRegBookmark size={20} onClick={handleBookmark} style={{ cursor: "pointer" }} />
                                                )}
                                                {music.nickName === localStorage.getItem("nickName") && (
                                                    <div className="dropdown-wrapper">
                                                        <button onClick={handleClick} className="toggle-btn">
                                                            {isToggled ? (
                                                            <LuMoreVertical size={20} style={{ color: 'white' }} />
                                                            ) : (
                                                            <LuMoreHorizontal size={20} style={{ color: 'white' }} />
                                                            )}
                                                        </button>

                                                        <div className={`dropdown ${isToggled ? 'show' : ''}`}>
                                                            <button className="editbtn" onClick={goFeedEdit}>
                                                                <GrEdit size={18} /><span  style={{fontSize:'14px'}}>수정</span>
                                                            </button>
                                                            <button className="delbtn" onClick={goFeedDelete}>
                                                                <RiDeleteBinLine size={18} /><span style={{fontSize:'14px'}}>삭제</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* 음악정보 */}
                                        <div style={{display:'flex', justifyContent:'center'}}>
                                            <div className='musiccard'>
                                                <div className="musicInfoWrapper">
                                                    <div className="musicIcon"><IoMusicalNotes/></div>
                                                </div>
                                                
                                                <div className='musicContent'>
                                                    <div className='titleRow'>
                                                        <span className="musictitle">{music.musicInfoList[0].musicTitle} </span>
                                                    </div>
                                                    <span className="Artist">{music.musicInfoList[0].musicArtist}</span>
                                                    <p className='albumInfo'>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="feedcontent">{music.content}</div>
                                            {/* 해시태그 */}
                                            <div className="musictag">
                                                {music.tagName.map((tag, i) => (
                                                    <span key={i} className="hashtag">#{tag}</span>
                                                ))}
                                            </div>
                                        <hr style={{marginTop:'1px'}}/>

                                        {/* 댓글 리스트 */}
                                        <div className="musiccommentlist">
                                            {commentList?.length === 0 ?(
                                                <div className="no-comments">첫 댓글을 남겨보세요!</div>
                                            ):(
                                                commentList.map((data) => (
                                                <div key={data.id} className="comment-item">
                                                    <Link to={`/profile/${data.nickName}`} className="comment-user">
                                                        <img className='comment-avatar' src={data.userImgSrc} alt="User Avatar" />
                                                        <span className="comment-nickname">{data.nickName}</span>
                                                    </Link>
                                                    <div className='comment-content'>
                                                        <span className="comment-text">{data.comment}</span>
                                                        <span className='comment-time'>{getRelativeTime(data.createdAt)}</span>
                                                    </div>
                                                </div>
                                            )))}
                                        </div>
                                        <div className="comment-input-wrap" style={{marginLeft:'-10px'}}>
                                            <TextInput value={comment} onChange={handleCommentChange} placeholder="댓글을 입력하세요." size="small" icon={VscSend} onKeyDown={(e) => { if (e.key === 'Enter'){ inputComment(music.id) };}} />
                                        </div>
                                    </div>
                                </div>
                            </PCContents>


                        </PCModalWrap>
                    </Overlay>
                </ModalContainer>
                )}
                

                {isFeedEdit &&(<FeedEdit
                    feedId={music.id}
                    musicInfoList={music}
                    open={isFeedEdit}
                    onClose={() => {
                        setIsFeedEdit(false);
                        if(onClose){
                            onClose();
                        }
                    }}
                />)}

                {isFeedDelete &&(<FeedDelete
                    feedId={music.id}
                    open={isFeedDelete}
                    onClose={() => {
                        setIsFeedDelete(false);
                        if(onClose){
                            onClose();
                        }
                    }}
                />)}
            </PC>

            {/* <Mobile>
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
                                            { music.comments.map((data) => (
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
            </Mobile> */}
        </div>
    );
}

export default FeedDetail;