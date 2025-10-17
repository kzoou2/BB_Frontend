import { useEffect, useRef, useState } from "react";
import ModalContainer from '../Config/ModalContainer';
import { Contents, TextInputModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import { CloseButton } from 'react-bootstrap';
import useOutSideClick from '../../../hooks/useOutSideClick';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import axios from "axios";
import "../../../style/css/TextInput.css";
import { PrimaryButton } from "../../../style/styled_components/Button_Style";


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
            contents: newplData.contents,
            musicInfoList: plData.musicInfoList,
            hashTags: newplData.tagName.map(tag => ({ id: 0, tagName: tag }))
        })], { type: 'application/json' }));

        console.log(newplData.contents);

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

                // setTimeout(()=>{
                //     window.location.reload();
                // },300);
                // fetchPlaylistAgain();
                // window.location.reload();
            })
            .catch(error => console.log('error', error));
    }
    
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
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '11px', right: '12px' }}></CloseButton>
                            <Contents>
                                <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', padding: '0 20px' }}>
                                    <div style={{flex: '1 1 auto',textAlign:"center"}}>
                                        <h3 className="modal-title">PlayList Edit</h3>
                                        <p className="subtitle">PlayListEdit</p>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <hr style={{ width: "90%", marginTop:'0' }} />
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <div className='mt-4'  style={{ width: "50%", position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        {newplData.imageFileUrl ? (
                                            <>
                                                <img className='playlist-img-preview' src={newplData.imageFileUrl} alt="Album cover"></img>
                                                <div className='playlist-overlay' onClick={() => inputFileRef.current.click()}>
                                                    <span className='playlist-overlay-text'>이미지 변경</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className='playlist-upload-img' src={plData.imageFileUrl} alt="Album cover"></img>
                                                <div className='playlist-overlay' onClick={() => inputFileRef.current.click()}>
                                                    <span className='playlist-overlay-text'>이미지 변경</span>
                                                </div>
                                            </>
                                        )}
                                        <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                    </div>
                                    <div style={{ width: "50%", height:'390px', marginTop:'10px' }}>
                                        <div className='d-flex flex-column align-items-center mb-3'>
                                            <input id='titleInput' type="text" name="title" className="titleInput mt-2 mb-2" onChange={handlePLChange} value={newplData.title} />
                                            <textarea id='contentInput' type="text" name="contents" className="contentInput mb-2" onChange={handlePLChange} value={newplData.contents} />
                                            <input id='hashtagInput' type="text" className="hashtagInput " value={newplData.tagName} />
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center mt-4'>
                                    <PrimaryButton style={{width:'10rem'}} onClick={(e)=> handlePlSubmit(e)}>작성</PrimaryButton>
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