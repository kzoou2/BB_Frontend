import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Button, Contents, ModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PlayListText from './PlayListText';
import axios from 'axios';
import CreatePost from '../Post/CreatePost';
import TextInput from '../../Common/TextInput';
import { CloseButton } from 'react-bootstrap';
import { FaArrowLeftLong} from "react-icons/fa6";
import { IoIosSearch} from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { HiHashtag } from "react-icons/hi";
import { SecondaryButton } from '../../../style/styled_components/Button_Style';

function PlayListSearch({ onClose, searchKeyword }) {
    const modalRef = useRef(null);
    const currentUser = window.localStorage.getItem('nickName');
    const [isPlstListTextOpen, setIsPlayListTextOpen] = useState(false);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [originalResults, setOriginalResults] = useState([]);


    // TODO: db에 없는 해시태그 검색 시 알림창 띄우기
    console.log("검색어", searchKeyword);

    const goPlayListText = () => {
        if (searchResults.length === 0) {
            alert("플레이리스트를 구성하세요.")
        } else {
            setIsPlayListTextOpen(true);
        }
    }

    const goCreatePost = () => {
        setIsCreatePostOpen(true);
    }

    const handleClose = () => {
        onClose?.();
    }

    useEffect(() => {
        const $body = document.querySelector("body");
        const overflow = $body.style.overflow;
        $body.style.overflow = "hidden";
        return () => {
            $body.style.overflow = overflow
        };
    }, []);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        // 엔터 키를 눌렀을 때 검색 실행
        if (e.key === 'Enter') {
            searchHashtag();
        }
    };

    const searchHashtag = async () => {
        await axios.get(`http://localhost:8080/api/feeds/byTag/${searchQuery}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                const temp = response.data

                const filteredResult = temp.filter(item => item.nickName === currentUser);
                setSearchResults(filteredResult)
                setOriginalResults(temp)
            })
            .catch((error) => {
                console.log("해시태그 검색 API 호출 중 오류", error)
            })
    }

    const deleteMusic = (musicId) => {
        console.log(musicId);
        let updateResults = searchResults.filter(item => item.id !== musicId);
        setSearchResults(updateResults)
    }

    // FIXME:중복및다른유저게시글도포함됨 
    const returnPlayList = () => {
        setSearchResults(originalResults)
    }

    useOutSideClick(modalRef, handleClose)

    console.log(searchResults);

    return (
        <div>
            {isPlstListTextOpen || isCreatePostOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <FaArrowLeftLong  size={24} onClick={() => goCreatePost()} style={{ flex: '0 0 auto', color: "#fff", cursor: "pointer" }}/>
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">New PlayList</h3>
                                        <p className="subtitle">PlayList Search</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mb-1'>
                                    <hr style={{ width: "80%", marginTop:'0' }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <TextInput type="text" className="form-control" placeholder="해시태그 검색" size="small" searchIcon={IoIosSearch}
                                        value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyPress} style={{width:'450px'}} />
                                </div>

                                <div className='justify-content-center mt-2 ' style={{ width: "", height: "370px", overflow: "scroll" }}>
                                    <div className="playlistSearch-container">
                                        {(searchResults && searchResults.length > 0) ? (
                                            searchResults.map((music, index) => (
                                            <div key={index} className="playlist-card" style={{ cursor: 'pointer', marginBottom: '10px' }}>
                                                <img className="playlist-img" src={music.feedImgSrc || music.musicInfoList[0].albumUrl} alt={`Thumbnail ${index}`} />
                                                <div className="playlist-text-container">
                                                    <span className="playlist-title" dangerouslySetInnerHTML={{ __html: music.musicInfoList[0].musicTitle }} />
                                                    <p className="playlist-artist"  dangerouslySetInnerHTML={{ __html: music.musicInfoList[0].musicArtist }} />
                                                </div>
                                                <div className='playlist-tag'> 
                                                    {[...music.tagName.filter(tag => tag === searchQuery), ...music.tagName.filter(tag => tag !== searchQuery)]
                                                    .slice(0, 2).map((tag, tagIndex) => (
                                                        <span key={tagIndex} className="tag-item">#{tag}</span>
                                                    ))}
                                                </div>
                                                <button className="playlist-delete-btn" onClick={() => deleteMusic(music.id)}> <TiDelete  /> </button>
                                            </div>
                                            ))
                                        ) : (
                                            <div  className="d-flex flex-column align-items-center justify-content-center" style={{ height: "300px", textAlign: "center", color: "#ccc" }}>
                                                <div style={{ backgroundColor: "#2a2a2a",borderRadius: "50%",padding: "20px",boxShadow: "0 4px 20px rgba(0,0,0,0.2)",marginBottom: "16px"}}>
                                                    <HiHashtag size={50} color="#ccc" />
                                                </div>
                                                <h2 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>해시태그를 입력하세요.</h2>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <SecondaryButton className='me-3' onClick={() => returnPlayList()} style={{fontSize:'14px'}}>초기화</SecondaryButton>
                                    <SecondaryButton onClick={() => goPlayListText()} style={{fontSize:'14px'}}>다음</SecondaryButton>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPlstListTextOpen && (<PlayListText
                open={isPlstListTextOpen}
                playlist={searchResults}
                searchQuery={searchQuery}
                onClose={() => {
                    setIsPlayListTextOpen(false);
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

export default PlayListSearch;