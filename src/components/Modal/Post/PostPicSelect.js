import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents, Button } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PostText from './PostText';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import MusicSearch from './MusicSearch';

function PostPicSelect({ onClose, albumImage, musicTitle, musicArtist, albumName, releaseDate }) {
    const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY_3;
    const modalRef = useRef(null)
    const [isPostTextOpen, setIsPostTextOpen] = useState(false);
    const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false);
    const [youTubeResults, setYouTubeResults] = useState([]);
    const youTubeQuery = (`${musicTitle} ${musicArtist}`);

    const goFeedText = () => {
        setIsPostTextOpen(true);
    }

    const goMusicSearch = () => {
        setIsMusicSearchOpen(true);
    }

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

    useEffect(() => {
        // YouTube API 요청 보내기
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=${youtubeApiKey}&q=${encodeURIComponent(youTubeQuery)}`)
            .then((response) => {
                const temp = response.data.items;
                setYouTubeResults(temp);
            })
            .catch((error) => {
                console.error('YouTube API 요청 중 오류 발생:', error);
            })
    }, []) // 빈 의존성 배열 꼭 있어야함. 안그러면 YouTube API 계속 호출되어 할당량 초과됨.

    // YouTube API 결과 확인
    useEffect(() => {
        console.log("유튜브 검색 결과: ", youTubeResults)
    }, [youTubeResults])

    // const openYouTube = () => {
    //     window.open(`https://www.youtube.com/watch?v=${youTubeResults[0].id.videoId}`)
    // };

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            {isMusicSearchOpen || isPostTextOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <div className='row'>
                                    <FaArrowLeft className='col' size='36' onClick={() => goMusicSearch()} style={{ color: "blue", cursor: "pointer" }} />
                                    <h3 className='col-10 text-center'>New Post (PostPicSelect)</h3>
                                    <div className='col'></div>
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <img style={{ width: "14vw", height: "auto" }} src={albumImage} alt="Album cover"></img>
                                </div>

                                <div>
                                    <h5 className='d-flex justify-content-center'>{musicTitle}</h5>
                                    <h5 className='d-flex justify-content-center'>{musicArtist}</h5>
                                    <p className='d-flex justify-content-center'>{albumName} · {releaseDate}</p>
                                </div>

                                <div className='d-flex justify-content-center mb-5'>
                                    {/* <Button className='btn btn-primary me-3' onClick={() => openYouTube()}>Open YouYube</Button> */}
                                    <Button className='btn btn-primary' onClick={() => goFeedText()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPostTextOpen && (<PostText
                albumImage={albumImage}
                videoId={youTubeResults[0].id.videoId}
                musicTitle={musicTitle}
                musicArtist={musicArtist}
                albumName={albumName}
                releaseDate={releaseDate}
                open={isPostTextOpen}
                onClose={() => {
                    setIsPostTextOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}

            {isMusicSearchOpen && (<MusicSearch
                open={isMusicSearchOpen}
                onClose={() => {
                    setIsMusicSearchOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}

        </div>
    );
}

export default PostPicSelect;