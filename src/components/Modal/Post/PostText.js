import React, { useEffect, useRef, useState } from 'react';
import { SiHeadspace } from "react-icons/si";
import { Overlay, TextInputModalWrap, Contents, Button } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../../../hooks/useOutSideClick';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import '../../../style/css/Hashtag.css';
import { useNavigate } from 'react-router-dom';

// 가수, 노래제목, 발매연도, 앨범이름, 사진, 글, 해시태그, 작성자, 비디오아이디
function PostText({ onClose, videoId, albumImage, musicTitle, musicArtist, albumName, releaseDate }) {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    const [hashtagList, setHashtagList] = useState([]);
    const [content, setContent] = useState('');
    const [imageSrc, setImageSrc] = useState(albumImage);
    const token = "";

    const postFeed = () => {
        console.log("글 작성 완료")
        console.log(
            "제목: ", musicTitle, "\n",
            "가수: ", musicArtist, "\n",
            "앨범명 : ", albumName, "\n",
            "발매연도 : ", releaseDate, "\n",
            "비디오아이디 : ", videoId, "\n",
            "이미지: ", { albumImage }, "\n",
            "내용: ", content, "\n",
            "해시태그 리스트: ", hashtagList
        )
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
            console.log("태그", tagify.value); // 입력된 태그 정보 객체
        });

        setHashtagList(tagify.value);

        // 컴포넌트가 언마운트될 때에는 Tagify 인스턴스를 정리
        return () => {
            tagify.destroy();
        };
    }, []);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        console.log(content);
    }, [content])

    const goProfile = () => {
        navigate('/profile');
    }

    const onUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setImageSrc(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            <ModalContainer>
                <Overlay>
                    <TextInputModalWrap ref={modalRef}>
                        <Contents>
                            <h3 className='d-flex justify-content-center'>New Post (PostText)</h3>
                            <div className='d-flex justify-content-center'>
                                <hr style={{ width: "80%" }} />
                            </div>

                            <div className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{ width: "55%" }}>
                                    <img className='mt-5' style={{ width: "80%", height: "80%" }} src={imageSrc} alt="Album cover" />
                                </div>
                                <div style={{ width: "45%" }}>
                                    <div className='d-flex justify-content-start ms-4 mb-3'>
                                        <a href='/profile' style={{ textDecorationLine: "none" }}><SiHeadspace className='me-2' size='40' color='gray' onClick={() => { goProfile() }} />User Nickname</a>
                                    </div>
                                    <div className='d-flex flex-column align-items-center mb-3'>
                                        <textarea id='contentInput' type="text" className="form-control mb-2" placeholder="" onChange={handleContentChange} value={content} style={{ width: "90%", height: "280px", resize: "none" }} />
                                        <input id='hashtagInput' type="text" className="form-control" placeholder="해시태그를 추가하세요." />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center mt-1'>
                                <Button type="button" className="btn btn-primary me-3" onClick={() => inputFileRef.current.click()}>Change Image</Button>
                                <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                <Button className='btn btn-primary' onClick={() => postFeed()}>Post</Button>
                            </div>
                        </Contents>
                    </TextInputModalWrap>
                </Overlay>
            </ModalContainer>
        </div>
    );
}

export default PostText;
