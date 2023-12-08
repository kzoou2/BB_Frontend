import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../Config/useOutSideClick';
import PostPicSelect from './PostPicSelect';
import axios from 'axios';

function MusicSearch({ onClose }) {
    const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const modalRef = useRef(null);
    const [isPostPicSelectOpen, setIsPostPicSelectOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const goPostPicSelect = () => {
        console.log("음악 검색 완료")
        setIsPostPicSelectOpen(true);
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

    useOutSideClick(modalRef, handleClose);

    const searchMusic = async () => {
        try {
            // API 요청 보내기
            // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=성시경 희재&type=video&key=AIzaSyDcj9hLbUKY9Yga4KPFBsnmG5anWzaQsjU
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=${youtubeApiKey}&q=${encodeURIComponent(searchQuery)}`);
            const temp = response.data.items

            setSearchResults(temp)
        } catch (error) {
            console.error('YouTube API 요청 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        // 엔터 키를 눌렀을 때 검색 실행
        if (e.key === 'Enter') {
            searchMusic();
        }
    };

    return (
        <div>
            {isPostPicSelectOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <h3 className='d-flex justify-content-center'>New Post (MusicSearch)</h3>
                                <div className='d-flex justify-content-center mb-1'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <input type="text" className="form-control" placeholder="노래, 앨범, 아티스트 검색" style={{ width: "60%" }}
                                        value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyPress}
                                    />
                                </div>

                                <div className='justify-content-center mt-2 mb-1' style={{ width: "", height: "400px", overflow: "scroll" }}>
                                    {(searchResults && searchResults.length > 0) ? (
                                        searchResults.map((data, index) => (
                                            <div key={index} onClick={() => goPostPicSelect()} style={{ cursor: 'pointer' }}>
                                                <div className='border-bottom mb-1' style={{ height: "70px", alignItems: "center" }}>
                                                    <img className='float-start me-3' src={data.snippet.thumbnails.high.url} alt={`Thumbnail ${index}`} style={{ width: "80px", height: "60px" }} />
                                                    <p className='align-middle mt-3' dangerouslySetInnerHTML={{ __html: data.snippet.title }} />
                                                </div>
                                            </div>
                                        )))
                                        : (
                                            <div className='d-flex align-items-center justify-content-center' style={{ height: "300px" }}>
                                                <h2 className='text-center align-middle'>검색어를 입력하세요.</h2>
                                            </div>
                                        )
                                    }
                                </div>

                                {/* <div className='d-flex justify-content-center'>
                                <Button onClick={() => goMusicChoose()}>Next</Button>
                            </div> */}
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPostPicSelectOpen && (<PostPicSelect
                open={isPostPicSelectOpen}
                onClose={() => {
                    setIsPostPicSelectOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default MusicSearch;