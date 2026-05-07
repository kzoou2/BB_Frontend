import { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents, Button } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PostText from './PostText';
import axios from 'axios';
import MusicSearch from './MusicSearch';
import { CloseButton } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { SecondaryButton} from '../../../style/styled_components/Button_Style';

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
                        <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <FaArrowLeftLong size={24} onClick={() => goMusicSearch()} style={{ color: "fff", cursor: "pointer" }} />
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">New Post</h3>
                                        <p className="subtitle">PostPic Select</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mb-3' >
                                    <hr style={{ width: "80%", marginTop:'0' }} />
                                </div>

                                <div className='d-flex justify-content-center mb-4 mt-5' style={{ position: 'relative' }}>
                                    <img style={{ width: "14vw", height: "auto", borderRadius:'12px', objectFit:'cover', boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }} src={albumImage} alt="Album cover"></img>
                                    
                                </div>

                                <div>
                                    <h5 className='d-flex justify-content-center' style={{fontSize:'20px', fontWeight:'700',marginBottom: '10px'}}>{musicTitle}</h5>
                                    <h5 className='d-flex justify-content-center' style={{ fontSize:'17px', marginBottom: '4px', color: '#ccc' }}>{musicArtist}</h5>
                                    <p className='d-flex justify-content-center' style={{fontSize:'14px', marginTop:'5px', color: '#aaa'}}>{albumName} · {releaseDate}</p>
                                </div>

                                <div className='d-flex justify-content-center mb-4'>
                                    {/* <Button className='btn btn-primary me-3' onClick={() => openYouTube()}>Open YouYube</Button> */}
                                    <SecondaryButton className='mt-5'onClick={() => goFeedText()}>다음</SecondaryButton>
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