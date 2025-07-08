import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Contents, TextInputModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import { IoMdImages } from "react-icons/io";
import useOutSideClick from '../../../hooks/useOutSideClick';
import { useNavigate } from 'react-router-dom';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import '../../../style/css/Hashtag.css';
import { CloseButton } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import PlayListSearch from './PlayListSearch';
import { useRecoilState } from 'recoil';
import { postChkAtom } from '../../../state/PostAtom';
import "../../../style/css/TextInput.css";
import { PrimaryButton } from '../../../style/styled_components/Button_Style';

// 가수, 노래제목, 발매연도, 앨범이름, 사진, 플리 타이틀, 글, 해시태그, 작성자
function PlayListText({ onClose, playlist, searchQuery }) {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    const [isPlayListSearchOpen, SetIsPlayListSearchOpen] = useState(false);
    const [hashtagList, setHashtagList] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [content, setContent] = useState('');
    const [playlistTitle, setPlaylistTitle] = useState('');
    const musicInfoList = [];
    const [postChk, setPostChk] = useRecoilState(postChkAtom);

    // playlist 배열을 순회하면서 musicInfoList를 추출하여 새로운 배열에 저장
    playlist.forEach(playlist => {
        musicInfoList.push(...playlist.musicInfoList);
    });

    const postPlayList = () => {
        if (!imageSrc) {
            alert("사진을 업로드하세요.")
        } else if (!playlistTitle) {
            alert("타이틀을 입력하세요.")
        } else {
            console.log("플레이리스트 게시 완료")

            const formdata = new FormData();

            if (inputFileRef.current.files[0]) {
                formdata.append("imageFile", inputFileRef.current.files[0], "sample.jpeg");
            }

            formdata.append('playlistRequestDto', new Blob([JSON.stringify({
                title: `${playlistTitle}`,
                content: `${content}`,
                musicInfoList: musicInfoList,
                hashTags: hashtagList.map(tag => ({ tagName: tag.value }))
            })], { type: 'application/json' }));

            var requestOptions = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:8080/api/playlist", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    setPostChk(true);
                    onClose?.();

                    setTimeout(()=>{
                        window.location.reload();
                    },300);
                })
                .catch(error => console.log('error', error));
        }
    }

    const goPlayListSearch = () => {
        SetIsPlayListSearchOpen(true);
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
        const input = document.getElementById('hashtagInput');
        const tagify = new Tagify(input);

        // 태그가 추가되면 이벤트 발생
        tagify.on('add', function (e) {
            const tags = tagify.value.map(tag => tag.value); // 입력된 태그 정보 객체의 value만을 리스트로 저장
            console.log("태그", tags);
            setHashtagList(tagify.value);
        });

        // 컴포넌트가 언마운트될 때에는 Tagify 인스턴스를 정리
        return () => {
            tagify.destroy();
        };
    }, []);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handlePlaylistTitleChange = (event) => {
        setPlaylistTitle(event.target.value);
    }

    const goProfile = () => {
        navigate('/profile');
    }

    //FIXME: 사진 업로드하다가 취소하면 오류 발생
    const onUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setImageSrc(event.target.result);
        };
        reader.readAsDataURL(file);
        inputFileRef.current.files = e.target.files;
    }

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            {isPlayListSearchOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <TextInputModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <FaArrowLeftLong size={24} onClick={() => goPlayListSearch()} style={{ color: "fff", cursor: "pointer" }} />
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">New PlayList</h3>
                                        <p className="subtitle">PlayList Text</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <hr style={{ width: "90%", marginTop:'0' }} />
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <div className='mt-4'  style={{ width: "50%", position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        {(imageSrc === '') ? (
                                            <>
                                                <IoMdImages className='playlist-img-preview' size={350} color='lightblue' />
                                                <div className='playlist-overlay' onClick={() => inputFileRef.current.click()}>
                                                    <span className='playlist-overlay-text'>이미지 변경</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className='playlist-upload-img' src={imageSrc} alt="Album cover" />
                                                <div className='playlist-overlay' onClick={() => inputFileRef.current.click()}>
                                                    <span className='playlist-overlay-text'>이미지 변경</span>
                                                </div>
                                            </>
                                        )}
                                        <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                    </div>
                                    <div style={{ width: "50%", height:'390px', marginTop:'10px' }}>
                                        <div className='d-flex flex-column align-items-center mb-3'>
                                            <input id='titleInput' type="text" className="titleInput mt-2 mb-2" placeholder="플레이리스트 제목을 입력하세요" onChange={handlePlaylistTitleChange} value={playlistTitle} />
                                            <textarea id='contentInput' type="text" className="contentInput mb-2" placeholder="내용을 입력해주세요" onChange={handleContentChange} value={content}  />
                                            <input id='hashtagInput' type="text" className="hashtagInput " placeholder="해시태그를 추가하세요." />
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mt-4'>
                                    <PrimaryButton style={{width:'10rem'}} onClick={() => postPlayList()}>작성</PrimaryButton>
                                </div>
                            </Contents>
                        </TextInputModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPlayListSearchOpen && (<PlayListSearch
                open={isPlayListSearchOpen}
                searchKeyword={searchQuery}
                onClose={() => {
                    SetIsPlayListSearchOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}

        </div>
    );
}

export default PlayListText;