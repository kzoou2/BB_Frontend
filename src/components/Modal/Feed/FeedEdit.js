import React, { useEffect, useRef, useState } from "react";
import ModalContainer from "../Config/ModalContainer";
import useOutSideClick from "../../../hooks/useOutSideClick";
import Tagify from "@yaireo/tagify";
import '@yaireo/tagify/dist/tagify.css';
import '../../../style/css/Hashtag.css'
import { SiHeadspace } from "react-icons/si";
import { PC, Mobile } from "../../Responsive";
import { CloseButton } from 'react-bootstrap';
import { Overlay, Contents, TextInputModalWrap, Button } from "../../../style/styled_components/PostModal_Style";
import axios from "axios";

function FeedEdit({ onClose, feedId, musicInfoList }){
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    const [feedData, setFeedData]= useState([]);
    const [editFeedData, setEditFeedData] = useState({
        content: "",
        tagName: [],
        feedImgSrc: "",
    });
    

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/feeds/my/${feedId}`,{
            headers:{
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420',
            },
        })
        .then ((response) => {
            setFeedData(response.data);
            setEditFeedData({
                content: response.data.content,
                tagName: response.data.tagName,
            });
            console.log('Music Info List:', response.data.musicInfoList);
        })
        .catch((error) =>{
            console.error('api 요청 중 오류 발생:', error);
        })
    },[feedId]);

    const handleContentChange = (e) =>{
        const { name, value } = e.target;
        setEditFeedData((prevData) => ({ ...prevData, [name]: value }));
    }


    const hanleFeedSubmit = async (e) =>{
        e.preventDefault();

        // try{
            const formData = new FormData();

            // 파일이 선택된 경우에만 FormData에 추가
            if (inputFileRef.current?.files[0]) {
                formData.append('imageFile', inputFileRef.current.files[0]);
            }

            // 피드 데이터 추가
            formData.append('feedRequestDto', new Blob([JSON.stringify({
                content: editFeedData.content,
                videoId: 'string',
                musicInfo: {
                    musicArtist: `${feedData.musicInfoList[0].musicArtist}`,
                    releaseDate: `${feedData.musicInfoList[0].releaseDate}`,
                    musicTitle: `${feedData.musicInfoList[0].musicTitle}`,
                    albumName: `${feedData.musicInfoList[0].albumName}`,
                    videoId: `${feedData.musicInfoList[0].videoId}`,
                    albumUrl: `${feedData.musicInfoList[0]?.albumImage || ''}`
                },
                albumSrc: `${feedData.musicInfoList[0]?.albumImage || ''}`,
                hashTags: editFeedData.tagName.map(tag => ({ id: 0, tagName: tag }))
            })], { type: 'application/json' }));

            var requestOptions = {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
                },
                body: formData,
                redirect: 'follow'
            };

            fetch(`http://localhost:8080/api/feeds/${feedId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                onClose?.();
            })
            .catch(error => console.log('error', error));
    }
    
    const openFileInput = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setEditFeedData((prevData)=> ({
                ...prevData,
                feedImgSrc: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
            inputFileRef.current.files = e.target.files;
        }
    };


    useEffect(() => {
        const input = document.getElementById('hashtagInput');
        const tagify = new Tagify(input);

        // 태그가 추가되면 이벤트 발생
        tagify.on('add', function (e) {
            const tags = tagify.value.map(tag => tag.value); // 입력된 태그 정보 객체의 value만을 리스트로 저장
            console.log("태그", tags);
            setEditFeedData((prevData) => ({ ...prevData, tagName: tags }));
        });

        // 컴포넌트가 언마운트될 때에는 Tagify 인스턴스를 정리
        return () => {
            tagify.destroy();
        };
    }, []);

    const handleClose = () => {
        onClose?.();
    };
    useOutSideClick(modalRef, handleClose)


    return(
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <TextInputModalWrap ref={modalRef}>
                            <CloseButton class="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                            <Contents >
                                <div className="row" >
                                    <h3 className='col-10 text-center' style={{color:'white'}}>FeedEdit</h3>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <hr style={{ width: "80%", color: 'white'}} />
                                </div>
                                    
                                <div className="d-flex justify-content-center" >
                                    <div className="d-flex justify-content-center" style={{width:'55%'}}>
                                        {editFeedData.feedImgSrc ?(
                                            <img className="mt-5" style={{width:'80%', height:'80%'}} src={editFeedData.feedImgSrc} alt="feedImgSrc"/>
                                        ):(
                                            feedData.feedImgSrc !==  null ? (
                                                <img className="mt-5" style={{width:'80%', height:'80%'}} src={feedData.feedImgSrc} alt="Album cover"/>
                                            ) : (
                                                <img className="mt-5" style={{width:'80%', height:'80%'}} src={feedData.musicInfoList[0].albumUrl} alt="Album cover"/>
                                            )
                                        )}
                                    </div>
                                    
                                    <div style={{ width:"45%"}}>
                                        <div className="d-flex justify-content-start ms-4 mb-3">
                                            <SiHeadspace className='me-2' size='40' color='#242424' />
                                        </div>
                                        <div className='d-flex flex-column align-items-center mb-3' style={{color:'#242424'}}>
                                            <textarea id='contentInput' name='content' type="text" className="form-control mb-2" placeholder="" onChange={handleContentChange} value={editFeedData.content} style={{ width: "90%", height: "280px", resize: "none", color:'#242424' }} />
                                            <input id='hashtagInput' type="text" className="form-control" value={editFeedData.tagName} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-1'>
                                    <Button type="button" className="btn btn-primary me-3" onClick={() => inputFileRef.current.click()}>Change Image</Button>
                                    <input ref={inputFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => openFileInput(e)} />
                                    <Button className='btn btn-primary' onClick={(e) => hanleFeedSubmit(e)}>Edit</Button>
                                </div>
                            </Contents>
                        </TextInputModalWrap>
                    </Overlay>
                </ModalContainer>

                
            </PC>
            <Mobile></Mobile>
        </div>

    );
}

export default FeedEdit;