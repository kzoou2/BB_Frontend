import React, { useEffect, useRef, useState } from "react";
import ModalContainer from '../Config/ModalContainer';
import { Button, Contents, TextInputModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import { SiHeadspace } from "react-icons/si";
import { CloseButton } from 'react-bootstrap';
import useOutSideClick from '../../../hooks/useOutSideClick';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import axios from "axios";

function PlayListEdit({ onClose, playlistId, playlist }){
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    const [isPLSearchEditOpen , setIsPLSearchEditOpen] = useState(false);
    const [plData, setPlData] = useState([]);
    const [newplData, setNewplData]= useState({
        title:"",
        contents:"",
        tagName:[],
        // musicInfoList: playlist,
    });

    const handleClose = () => {
        onClose?.();
    };

    useEffect(()=> {
        axios.get(`http://localhost:8080/api/playlist/my/${playlistId}`,{
            headers:{
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420',
            },
        })
        .then((response) => {
            setPlData(response.data);
            setNewplData({
                title: response.data.title,
                contents: response.data.contents,
                tagName: response.data.tagName,
                // musicInfoList: response.data.musicInfoList,
                // musicInfoList: playlist,
            });
            console.log('musicInfoList', response.data.musicInfoList);
        })
        .catch((error) =>{
            console.error("PL API 요청 중 오류 발생:", error);
        })

    },[playlistId])
    
    const handlePLChange = (e) => {
        const { name, value } = e.target;
        setNewplData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handlePlSubmit = async (e) => {
        e.preventDefault();
        
        const formdata = new FormData();
        
        if(inputFileRef.current.files[0]){
            formdata.append("imageFile", inputFileRef.current.files[0]);
        }
        // console.log("musicInfoList before fetch", newplData.musicInfoList);

        formdata.append('playlistRequestDto', new Blob([JSON.stringify({
            title: newplData.title,
            content: newplData.contents,
            // musicInfoList: newplData.musicInfoList,
            musicInfoList: plData.musicInfoList,
            hashTags: newplData.tagName.map(tag => ({ id: 0, tagName: tag }))
        })], { type: 'application/json' }));


        var requestOptions = {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
            body: formdata,
            redirect: 'follow'
        };
    
        fetch(`http://localhost:8080/api/playlist/${playlistId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                onClose?.();
            })
            .catch(error => console.log('error', error));
    }

    // const handlePlSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const formData = new FormData();
    
    //     if (inputFileRef.current.files[0]) {
    //         formData.append("imageFile", inputFileRef.current.files[0]);
    //     }
    
    //     console.log("musicInfoList before axios", newplData.musicInfoList);
    
    //     const requestData = {
    //         title: newplData.title,
    //         content: newplData.contents,
    //         albumSrc: newplData.albumUrl,
    //         // musicInfoList: newplData.musicInfoList,
    //         hashTags: newplData.tagName.map(tag => ({ id: 0, tagName: tag }))
    //     };
    
    //     formData.append('playlistRequestDto', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    
    //     try {
    //         const response = await axios.put(`http://localhost:8080/api/playlist/${playlistId}`, formData, {
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
    //                 'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         });
    
    //         console.log(response.data);
    //         onClose?.();
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // }

    
    const onUpload = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setNewplData((prevData)=> ({
                ...prevData,
                imageFileUrl: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
            inputFileRef.current.files = e.target.files;
        }
    }
    useEffect(() => {
        const input = document.getElementById('hashtagInput');
        const tagify = new Tagify(input);
    
        // 태그가 추가되면 이벤트 발생
        tagify.on('add', function (e) {
            const tags = tagify.value.map(tag => tag.value); // 입력된 태그 정보 객체의 value만을 리스트로 저장
            console.log("태그", tags);
            setNewplData((prevData) => ({ ...prevData, tagName: tags }));
        });
    
        // 컴포넌트가 언마운트될 때에는 Tagify 인스턴스를 정리
        return () => {
            tagify.destroy();
        };
    }, []);


    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            {isPLSearchEditOpen ? null :(
                <ModalContainer>
                    <Overlay>
                        <TextInputModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                            <Contents>
                                <div className='row'>
                                    <h3 className='col-10 text-center'>PlayList Edit (PlayListEdit)</h3>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center" style={{ width: "55%" }}>
                                        {newplData.imageFileUrl ?(
                                            <img className='mt-5' style={{ width: "80%", height: "80%" }} src={newplData.imageFileUrl} alt="Album cover"></img>
                                        ):(
                                            <img className='mt-5' style={{ width: "80%", height: "80%" }} src={plData.imageFileUrl} alt="Album cover"></img>
                                        )}
                                    </div>

                                    <div style={{ width: "45%" }}>
                                        <div className='d-flex justify-content-start ms-4 mb-3'>
                                            <SiHeadspace className='me-2' size='40' color='black' />
                                        </div>
                                        <div className='d-flex flex-column align-items-center mb-3'>
                                            <input id='titleInput' name='title' type="text" className="form-control mb-2" onChange={handlePLChange} value={newplData.title}  style={{ width: "90%" }} />
                                            <textarea id='contentInput' name="contents" type="text" className="form-control mb-2" onChange={handlePLChange} value={newplData.contents} style={{ width: "90%", height: "250px", resize: "none" }} />
                                            <input id='hashtagInput' type="text" className="form-control" value={newplData.tagName} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-1'>
                                    <Button type="button" className="btn btn-primary me-3" onClick={() => inputFileRef.current.click()}>Change Image</Button>
                                    <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                    <Button className='btn btn-primary' onClick={(e)=> handlePlSubmit(e)}>Edit</Button>
                                </div>
                            </Contents>
                        </TextInputModalWrap>
                    </Overlay>
                </ModalContainer>
            )}
            
        </div>


    );
}

export default PlayListEdit;