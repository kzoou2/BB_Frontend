import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PostPicSelect from './PostPicSelect';
import axios from 'axios';
import SpotifyAPI from '../../../api/SpotifyAPI';
import CreatePost from './CreatePost';
import TextInput from '../../Common/TextInput';
import { CloseButton } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosSearch} from "react-icons/io";
import { TbMusicSearch } from "react-icons/tb";

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
                        <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <FaArrowLeftLong  size={24} onClick={() => goCreatePost()} style={{ flex: '0 0 auto', color: "#fff", cursor: "pointer" }}/>
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">New Post</h3>
                                        <p className="subtitle">Music Search</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mb-1'>
                                    <hr style={{ width: "80%", marginTop:'0' }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3' > 
                                    <TextInput  type="text" className="form-control" placeholder="노래, 앨범, 아티스트 검색" size="small" searchIcon={IoIosSearch}
                                        value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyPress} style={{width:'450px'}} />
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

                                                <div className="musicSearch-card-container">
                                                    <div className='musicSearch-card mb-1'>
                                                        {/* 앨범 이미지 */}
                                                        <img className='music-img me-3' src={data.album.images[0].url} alt={`Thumbnail ${index}`}  />

                                                        <div className='music-text-container'>
                                                            {/* 노래 제목 */}
                                                            <span className='music-title  ' dangerouslySetInnerHTML={{ __html: data.name }} />
                                                            {/* 가수 이름 */}
                                                            <p className='artist-name' dangerouslySetInnerHTML={{ __html: data.album.artists[0].name }} />
                                                            {/* 노래 시간 */}
                                                            <p className='song-duration'>
                                                                {Math.floor(data.duration_ms / 60000)}:{Math.floor((data.duration_ms % 60000) / 1000)}
                                                            </p>
                                                        </div>

                                                        {/* 앨범 이름 */}
                                                        {/* <p className='align-middle' dangerouslySetInnerHTML={{ __html: data.album.name }} /> */}

                                                        {/* 발매 연도 */}
                                                        {/* <p className='align-middle' dangerouslySetInnerHTML={{ __html: data.album.release_date }} /> */}
                                                    </div>
                                                </div>
                                                

                                            </div>
                                        )))
                                        : (
                                            <div  className="d-flex flex-column align-items-center justify-content-center" style={{ height: "300px", textAlign: "center", color: "#ccc" }}>
                                                <div style={{ backgroundColor: "#2a2a2a",borderRadius: "50%",padding: "20px",boxShadow: "0 4px 20px rgba(0,0,0,0.2)",marginBottom: "16px"}}>
                                                    <TbMusicSearch size={50} color="#ccc" />
                                                </div>
                                                <h2 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>검색어를 입력하세요.</h2>
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