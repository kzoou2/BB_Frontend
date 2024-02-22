// import React, { useEffect, useRef, useState } from "react";
// import ModalContainer from "../Config/ModalContainer";
// import { Button, Contents, ModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
// import useOutSideClick from '../../../hooks/useOutSideClick';
// import PlayListEdit from "./PlayListEdit";
// import axios from "axios";
// import { Mobile, PC } from "../../Responsive";


// function PlayListSearchEdit({ onClose, playlistId }){
//     const modalRef = useRef(null);
//     const [ isPlayListEdit, setIsPlayListEdit ] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [ musicData, setMusicData ] = useState([]);
//     // const [ originalMusic, setOriginalMusic ] = useState([]); 
//     // const [ newMusic, setNewMusic] = useState([]);


//     useEffect(()=> {
//         axios.get(`http://localhost:8080/api/playlist/my/${playlistId}`,{
//             headers:{
//                 'Content-Type': `application/json`,
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//                 'ngrok-skip-browser-warning': '69420',
//             },
//         })
//         .then((response) => {
//             // setOriginalMusic(response.data.musicInfoList);
//             setMusicData(response.data.musicInfoList);
//             console.log(response.data.musicInfoList)
//         })
//         .catch((error) =>{
//             console.error("PL API 요청 중 오류 발생:", error);
//         })

//     },[playlistId])

//     const deleteMusic = (videoId) => {
//         console.log('Deleting music with id:', videoId);
//         setMusicData(prevMusicData => prevMusicData.filter(item => item.videoId !== videoId));
        

//     }

//     const handleInputChange = (e) =>{
//         setSearchQuery(e.target.value);
//     }

//     const handleKeyPress = (e)=>{
//         if (e.key === 'Enter'){
//             searchHashtag();
//         }
//     };
//     const searchHashtag = async ()=>{
//         await axios.get(`http://localhost:8080/api/feeds/byTag/${searchQuery}`, {
//             headers: {
//                 'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
//             },
//         })
//             .then((response) => {
//                 const temp = response.data
//                 console.log(temp)
//                 setMusicData(temp);
//                 // setNewMusic(temp);
//                 // setMusicData((prevMusicData) => [...prevMusicData, ...temp]);
//             })
//             .catch((error) => {
//                 console.log("해시태그 검색 API 호출 중 오류", error)
//             })
//     }

//     // const saveMusicData = () => {
//     //     const finalMusicData = originalMusic.length > 0 ? originalMusic : newMusic;
//     //     setMusicData(finalMusicData);
//     // }

//     const goPlayListEdit = ()=>{
//         setIsPlayListEdit(true);
//     }
//     const handleClose = ()=>{
//         onClose?.();
//     }  

//     useOutSideClick(modalRef, handleClose)

//     return(
//         <div>
//             <PC>
//                 {isPlayListEdit ? null : (
//                     <ModalContainer>
//                         <Overlay>
//                             <ModalWrap ref={modalRef}>
//                                 <Contents>
//                                     <div className='row'>
//                                         <h3 className='col-10 text-center'>PL Edit-Music (PlayListSearchEdit)</h3>
//                                         <div className='col'></div>
//                                     </div>

//                                     <div className='d-flex justify-content-center mb-1'>
//                                         <hr style={{ width: "80%" }} />
//                                     </div>

//                                     <div className='d-flex justify-content-center mb-3'>
//                                         <input type="text" className="form-control" placeholder="해시태그 검색" style={{ width: "60%" }}
//                                             value={setMusicData.tagName} onChange={handleInputChange} onKeyDown={handleKeyPress}
//                                         />
//                                     </div>

//                                     <div className='mt-2 mb-1' style={{ width: "", height: "350px", overflow: "scroll" }}>
//                                         <table className='table'>
//                                             <tbody>
//                                                 {(musicData && musicData.length > 0) ? (
//                                                     musicData.map((music, index) => (
//                                                         <tr key={index}>
//                                                         <td><img className='float-start' src={music.albumUrl || music.musicInfoList[0].albumUrl} alt={`Thumbnail ${index}`} style={{ width: "80px", height: "60px" }} /></td>
//                                                         <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicTitle || music.musicInfoList[0].musicTitle}}></td>
//                                                         <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicArtist || music.musicInfoList[0].musicArtist}}></td>
//                                                         <td style={{ verticalAlign: 'middle' }}>
//                                                             <button className='btn btn-danger btn-sm' onClick={() => deleteMusic(music.videoId || music.musicInfoList[0].videoId)}>DELETE</button>
//                                                         </td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="4" className="text-center">음악 데이터가 없습니다.</td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     <div className='d-flex justify-content-center'>
//                                         <Button onClick={() => goPlayListEdit()}>Next</Button>
//                                     </div>
//                                 </Contents>
//                             </ModalWrap>
//                         </Overlay>
//                     </ModalContainer>
//                 )}
//                 {isPlayListEdit && (<PlayListEdit
//                     open={isPlayListEdit}
//                     playlist={musicData}
//                     playlistId={playlistId}
//                     onClose={()=>{
//                         setIsPlayListEdit(false);
//                         if(onClose){
//                             onClose();
//                         }
//                     }}
//                 />)}
//             </PC>

//             <Mobile></Mobile>
//         </div>

//     )
// };

// export default PlayListSearchEdit;