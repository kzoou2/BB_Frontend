import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents } from '../style/styled_components/PostModal_Style';
import ModalContainer from '../components/Modal/Config/ModalContainer';
import axios from 'axios';
import PostPicSelect from '../components/Modal/Post/PostPicSelect';

function MusicSearchTest({ onClose }) {
    const modalRef = useRef(null);
    const [isPostPicSelectOpen, setIsPostPicSelectOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [albumImage, setAlbumImage] = useState('');
    const [musicTitle, setMusicTitle] = useState('');
    const [musicArtist, setMusicArtist] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const goPostPicSelect = ({ albumImage, musicTitle, musicArtist, albumName, releaseDate }) => {
        setAlbumImage(albumImage);
        setMusicTitle(musicTitle);
        setMusicArtist(musicArtist);
        setAlbumName(albumName);
        setReleaseDate(releaseDate);

        setIsPostPicSelectOpen(true);
    };

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

    const searchMusic = async () => {
        try {
            // Spotify API 요청 보내기
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: searchQuery,
                    type: 'track',
                    market: 'KR',
                },
                headers: {
                    Authorization: `Bearer ${'BQAZvYKF6efameTxpa_NprR1iEneTA3R8suEJO7hYYJnmBGvGJJxSS5mBT_ARQoE1qtQH-Noi4OQtVHnWBowBMOJKdVeemwkTLWxVhI-I-NPtk_iHwE'}`,
                },
            });
            const temp = response.data.tracks.items
            setSearchResults(temp)

        } catch (error) {
            console.error('Spotify API 요청 중 오류 발생:', error);
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
                                            <div key={index}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    goPostPicSelect({
                                                        albumImage: data.album.images[0].url,
                                                        musicTitle: data.name,
                                                        musicArtist: data.album.artists[0].name,
                                                        albumName: data.album.name,
                                                        releaseDate: data.album.release_date
                                                    })
                                                }>
                                                <div className='border-bottom mb-1' style={{ height: "70px", alignItems: "center" }}>
                                                    {/* 앨범 이미지 */}
                                                    <img className='float-start me-3' src={data.album.images[0].url} alt={`Thumbnail ${index}`} style={{ width: "80px", height: "60px" }} />

                                                    {/* 노래 제목 */}
                                                    <span className='align-middle mt-1' dangerouslySetInnerHTML={{ __html: data.name }} />

                                                    {/* 가수 이름 */}
                                                    <p className='align-middle mt-1' dangerouslySetInnerHTML={{ __html: data.album.artists[0].name }} />

                                                    {/* 앨범 이름 */}
                                                    {/* <p className='align-middle' dangerouslySetInnerHTML={{ __html: data.album.name }} /> */}

                                                    {/* 발매 연도 */}
                                                    {/* <p className='align-middle' dangerouslySetInnerHTML={{ __html: data.album.release_date }} /> */}

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
                albumImage={albumImage}
                musicTitle={musicTitle}
                musicArtist={musicArtist} 
                albumName={albumName}
                releaseDate={releaseDate}
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

export default MusicSearchTest;