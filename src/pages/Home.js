import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { SiHeadspace } from "react-icons/si";
import { IoMusicalNoteSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { PC, Mobile } from "../components/Responsive";
import FeedDetail from '../components/Modal/Feed/FeedDetail';
import '../style/css/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

function Home() {
    const navigate = useNavigate();
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`https://94ed-121-190-220-40.ngrok-free.app/api/feeds`, {
            headers: {
                'Content-Type': `application/json`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                console.log("서버에서 받아온 결과", response.data);
                const temp = response.data;
                setFeedData(temp);
                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [])

    const openFeedDetail = (music) => {
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    const clickNote = () => {
        setIsNoteClicked(!isNoteClicked);
    }

    const goDM = () => {
        navigate('/dm');
    }

    const onBookmark = () => {
        setIsBookmarked(!isBookmarked);
    }

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-2'>
                        <Navbar />
                    </div>
                    <div className='col-md-10'>
                        <div className='mt-5' style={{ maxHeight: "700px", overflow: "scroll" }}>
                            {isLoading ? <Loading /> : null}
                            {feedData.slice().reverse().map((music) => (
                                <div className='d-flex justify-content-center mb-4' key={music.id}>
                                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                                        <div>
                                            <div className='d-flex justify-content-center'>
                                                <div className='d-flex justify-content-start mb-3' style={{ width: "50%" }}>
                                                    <a href='/BB_Frontend/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                                </div>
                                                <div className='d-flex justify-content-end mb-3' style={{ width: "50%" }}>
                                                    <span className='mt-2'>
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
                                            <div className="">
                                                <img style={{ width: "70%", height: "70%" }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl} alt={music.musicInfoList[0].musicTitle}></img>
                                                <h5 className='mt-3'>{music.musicInfoList[0].musicTitle} · {music.musicInfoList[0].musicArtist}</h5>
                                                <p>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                                <p style={{ color: '#4887E5' }}>{music.tagName.map((tag, index) => `#${tag} ${index < music.tagName.length - 1 ? ' ' : ''}`)}</p>
                                                <p>{music.content}<span className='ms-2' style={{ color: "grey", cursor: "pointer" }} onClick={() => openFeedDetail(music)}>더보기</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        isNoteClicked={isNoteClicked}
                        isBookmarked={isBookmarked}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </PC>

            <Mobile>
                <Navbar />
                <h2 className='text-start ms-3 mt-3 mb-3'>BeatBuddy</h2>
                {isLoading ? <Loading /> : null}
                {feedData.slice().reverse().map((music) => (
                    <div className='d-flex justify-content-center mb-4 ms-3 me-3' key={music.id}>
                        <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                            <div>
                                <div className='d-flex justify-content-center'>
                                    <div className='d-flex justify-content-start mb-3' style={{ width: "50%" }}>
                                        <a href='/BB_Frontend/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                    </div>
                                    <div className='d-flex justify-content-end mb-3' style={{ width: "50%" }}>
                                        <span className='mt-2'>
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
                                <div className="">
                                    <img style={{ width: "80%", height: "80%" }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl} alt={music.musicInfoList[0].musicTitle}></img>
                                    <h5 className='mt-3'>{music.musicInfoList[0].musicTitle} · {music.musicInfoList[0].musicArtist}</h5>
                                    <p>{music.musicInfoList[0].albumName} · {music.musicInfoList[0].releaseDate}</p>
                                    <p style={{ color: '#4887E5' }}>{music.tagName.map((tag, index) => `#${tag} ${index < music.tagName.length - 1 ? ' ' : ''}`)}</p>
                                    <p>{music.content}<span className='ms-2' style={{ color: "grey", cursor: "pointer" }} onClick={() => openFeedDetail(music)}>더보기</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        isNoteClicked={isNoteClicked}
                        isBookmarked={isBookmarked}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </Mobile>
        </div>
    );
}

export default Home;