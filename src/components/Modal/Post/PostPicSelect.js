import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents, Button } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PostText from './PostText';
import axios from 'axios';

function PostPicSelect({ onClose, albumImage, musicTitle, musicArtist, albumName, releaseDate }) {
    const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY_2;
    const modalRef = useRef(null)
    const [isFeedTextOpen, setIsFeedTextOpen] = useState(false);
    const [youTubeResults, setYouTubeResults] = useState([]);
    const youTubeQuery = (`${musicTitle} ${musicArtist}`);

    const goFeedText = () => {
        setIsFeedTextOpen(true);
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
    }, [])

    // YouTube API 결과 확인
    useEffect(() => {
        console.log("유튜브 검색 결과: ", youTubeResults)
    }, [youTubeResults])

    const openYouTube = () => {
        window.open(`https://www.youtube.com/watch?v=${youTubeResults[0].id.videoId}`)
    };

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            {isFeedTextOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <h3 className='d-flex justify-content-center'>New Post (PostPicSelect)</h3>
                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <img style={{ width: "50%", height: "50%" }} src={albumImage} alt="Album cover"></img>
                                </div>

                                <div>
                                    <h3 className='d-flex justify-content-center'>{musicTitle}</h3>
                                    <h5 className='d-flex justify-content-center'>{musicArtist}</h5>
                                    <p className='d-flex justify-content-center'>{albumName} · {releaseDate}</p>
                                </div>

                                <div className='d-flex justify-content-center mb-5'>
                                    <Button className='btn btn-primary me-3' onClick={() => openYouTube()}>Open YouYube</Button>
                                    <Button className='btn btn-primary' onClick={() => goFeedText()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isFeedTextOpen && (<PostText
                albumImage={albumImage}
                videoId={youTubeResults[0].id.videoId}
                musicTitle={musicTitle}
                musicArtist={musicArtist}
                albumName={albumName}
                releaseDate={releaseDate}
                open={isFeedTextOpen}
                onClose={() => {
                    setIsFeedTextOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default PostPicSelect;