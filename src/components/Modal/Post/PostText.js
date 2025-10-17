import React, { useEffect, useRef, useState } from 'react';
import { Overlay, TextInputModalWrap, Contents} from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import '../../../style/css/Hashtag.css';
import { useNavigate } from 'react-router-dom';
import PostPicSelect from './PostPicSelect';
import { postChkAtom } from '../../../state/PostAtom';
import { useRecoilState } from 'recoil';
import { CloseButton } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import MusicSearch from './MusicSearch';
import "../../../style/css/TextInput.css";
import { PrimaryButton } from '../../../style/styled_components/Button_Style';


// 가수, 노래제목, 발매연도, 앨범이름, 사진, 글, 해시태그, 작성자, 비디오아이디
function PostText({ onClose, videoId, albumImage, musicTitle, musicArtist, albumName, releaseDate }) {
    // const navigate = useNavigate();
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    // const [isPostPicSelectOpen, setIsPostPicSelectOpen] = useState(false);
    const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false);
    const [hashtagList, setHashtagList] = useState([]);
    const [content, setContent] = useState('');
    const [imageSrc, setImageSrc] = useState(albumImage);
    const [postChk, setPostChk] = useRecoilState(postChkAtom);

    const postFeed = () => {
        console.log(
            "글 작성 완료 \n",
            "제목: ", musicTitle, "\n",
            "가수: ", musicArtist, "\n",
            "앨범명 : ", albumName, "\n",
            "발매연도 : ", releaseDate, "\n",
            "비디오아이디 : ", videoId, "\n",
            "이미지: ", { albumImage }, "\n",
            "내용: ", content, "\n",
            "해시태그 리스트: ", hashtagList.map(tag => ({ tagName: tag }))
        )

        const formdata = new FormData();

        if (inputFileRef.current.files[0]) {
            formdata.append("imageFile", inputFileRef.current.files[0], "sample.jpeg");
        }

        formdata.append('feedRequestDto', new Blob([JSON.stringify({
            content: `${content}`,
            musicInfo: {
                musicArtist: `${musicArtist}`,
                releaseDate: `${releaseDate}`,
                musicTitle: `${musicTitle}`,
                albumName: `${albumName}`,
                videoId: `${videoId}`,
                albumUrl: `${albumImage}`
            },
            albumSrc: `${albumImage}`,
            hashTags: hashtagList.map(tag => ({ tagName: tag }))
        })], { type: 'application/json' }));

        var requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/feeds", requestOptions)
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
        const input = document.getElementById('hashtagInput');
        const tagify = new Tagify(input);

        // 태그가 추가되면 이벤트 발생
        tagify.on('add', function (e) {
            const tags = tagify.value.map(tag => tag.value); // 입력된 태그 정보 객체의 value만을 리스트로 저장
            console.log("태그", tags);
            setHashtagList(tags)
        });

        // 컴포넌트가 언마운트될 때에는 Tagify 인스턴스를 정리
        return () => {
            tagify.destroy();
        };
    }, []);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

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
            {/* {isPostPicSelectOpen ? null : ( */}
            {isMusicSearchOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <TextInputModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <FaArrowLeftLong size={24} onClick={() => goMusicSearch()} style={{ color: "fff", cursor: "pointer" }} />
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">New Post</h3>
                                        <p className="subtitle">Post Text</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <hr style={{ width: "90%", marginTop:'0',marginBottom:'35px' }} />
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <div className='d-flex justify-content-center' style={{ width: "50%", position: 'relative' }}>
                                        <img className='postimg '  src={imageSrc} alt="Album cover"/>
                                        <div className='img-overlay'  onClick={() => inputFileRef.current.click()} >
                                            <span className='overlay-text'>이미지 변경</span>
                                        </div>
                                        <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                    </div>
                                    <div style={{ width: "50%", height:'380px'}}>
                                        <div className='d-flex flex-column align-items-center mb-3'>
                                            <textarea id='contentInput' type="text" className="contentInput mb-2" placeholder="내용을 입력해주세요" onChange={handleContentChange} value={content}  />
                                            <input id='hashtagInput' type="text" className="hashtagInput" placeholder="해시태그를 추가하세요." />
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mt-1'>
                                    <PrimaryButton style={{ width: '10rem'}} onClick={() => postFeed()}>작성</PrimaryButton>
                                </div>
                            </Contents>
                        </TextInputModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {/* TODO: 이전으로 돌아갈 때 검색한 정보 유지되도록 */}
            {/* {isPostPicSelectOpen && (<PostPicSelect
                open={isPostPicSelectOpen}
                onClose={() => {
                    setIsPostPicSelectOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)} */}
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

export default PostText;
