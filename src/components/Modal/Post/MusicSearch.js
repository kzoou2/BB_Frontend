import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PostPicSelect from './PostPicSelect';
import axios from 'axios';
import SpotifyAPI from '../../../api/SpotifyAPI';
import { FaArrowLeft } from "react-icons/fa";
import CreatePost from './CreatePost';

// TODO: 검색결과 없을 때 알림창 띄우기
function MusicSearch({ onClose }) {
    const modalRef = useRef(null);
    const [isPostPicSelectOpen, setIsPostPicSelectOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [albumImage, setAlbumImage] = useState('');
    const [musicTitle, setMusicTitle] = useState('');
    const [musicArtist, setMusicArtist] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [token, setToken] = useState('');

    const goPostPicSelect = ({ albumImage, musicTitle, musicArtist, albumName, releaseDate }) => {
        setAlbumImage(albumImage);
        setMusicTitle(musicTitle);
        setMusicArtist(musicArtist);
        setAlbumName(albumName);
        setReleaseDate(releaseDate);

        setIsPostPicSelectOpen(true);
    };

    const goCreatePost = () => {
        setIsCreatePostOpen(true); // MusicSearch 모달 닫기
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

    async function CreateSpotifyToken() {
        try {
            const spotifyAPI = new SpotifyAPI();
            setToken(await spotifyAPI.getToken());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 한 번만 실행
        CreateSpotifyToken();
    }, []); // 빈 배열을 두어 처음 마운트될 때만 실행되도록 함


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
                    Authorization: `Bearer ${token}`,

                },
            });
            const temp = response.data.tracks.items
            setSearchResults(temp)

        } catch (error) {
            console.error('Spotify API 요청 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        console.log("음악 검색 결과: ", searchResults)
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
            {isPostPicSelectOpen || isCreatePostOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <div className='row'>
                                    <FaArrowLeft className='col' size='36' onClick={() => goCreatePost()} style={{ color: "blue", cursor: "pointer" }} />
                                    <h3 className='col-10 text-center'>New Post (MusicSearch)</h3>
                                    <div className='col'></div>
                                </div>

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

            {isCreatePostOpen && (<CreatePost
                open={isCreatePostOpen}
                onClose={() => {
                    setIsCreatePostOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}

        </div>
    );
}

export default MusicSearch;