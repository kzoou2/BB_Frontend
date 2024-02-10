import React, { useEffect, useRef, useState } from "react";
import ModalContainer from "../Config/ModalContainer";
// import { Overlay } from "../../../style/styled_components/FeedDetailModal_Style";
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
    // const inputFileRef = useRef(null);
    // const [fileImg, setFileImg] = useState(null);
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
                // feedImgSrc: response.data.feedImgSrc,
            });
        })
        .catch((error) =>{
            console.error('api 요청 중 오류 발생:', error);
        })
    },[feedId]);

    const handleContentChange = (e) =>{
        const { name, value } = e.target;
        setEditFeedData((prevData) => ({ ...prevData, [name]: value }));
    }

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFileImg(selectedFile);
    // };

    const hanleFeedSubmit = async (e) =>{
        e.preventDefault();

        try{
            const formData = new FormData();

            // 파일이 선택된 경우에만 FormData에 추가
            // if (inputFileRef.current.files[0]) {
            //     formData.append('imageFile', inputFileRef.current.files[0]);
            // }

            // 피드 데이터 추가
            // formData.append('feedRequestDto', JSON.stringify({
            //     content: editFeedData.content,
            //     videoId: 'string', // 여기에 실제 videoId 값을 설정해야 함
            //     musicInfo: {
            //         musicArtist: `${musicInfoList.musicArtist}`,
            //         releaseDate: `${musicInfoList.releaseDate}`,
            //         musicTitle: `${musicInfoList.musicTitle}`,
            //         albumName: `${musicInfoList.albumName}`,
            //         videoId: `${musicInfoList.videoId}`,
            //         albumUrl: `${musicInfoList.albumImage}`
            //     },
            //     albumSrc: `${musicInfoList.albumImage}`, // 여기에 실제 albumSrc 값을 설정해야 함
            //     hashTags: editFeedData.tagName.map(tag => ({ id: 0, tagName: tag }))
            // }));
            
            const res = await axios.put(`http://localhost:8080/api/feeds/${feedId}`,
            editFeedData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log('피드 수정 성공', res.data);

            // PostFeed(feedId);
        } catch(error){
            console.log('피드 수정 중 오류 발생', error);
        }
    }
    // const openFileInput = () => {
    //     inputFileRef.current.click();
    // };



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
        onClose?.(true);
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
                                        {feedData.feedImgSrc !==  null ? (
                                            <img className="mt-5" style={{width:'80%', height:'80%'}} src={feedData.feedImgSrc} alt="Album cover"/>
                                        ):(
                                            <img className="mt-5" style={{width:'80%', height:'80%'}} src={feedData.musicInfoList[0].albumUrl} alt="Album cover"/>
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
                                    {/* <Button type="button" className="btn btn-primary me-3" onClick={openFileInput}>Change Image</Button>
                                    <input ref={inputFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} /> */}
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