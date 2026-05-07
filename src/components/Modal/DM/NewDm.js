import React, { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../Config/ModalContainer';
import { PC,Mobile } from '../../Responsive';
import { Contents, ModalWrap, Overlay, Button } from '../../../style/styled_components/PostModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { CloseButton } from 'react-bootstrap';
import axios from 'axios';
import TextInput from '../../Common/TextInput';
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { MdOutlineCircle, MdCheckCircle  } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";


function NewDm({ onClose }){
    const currentUser = window.localStorage.getItem('nickName');
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [nickname, setNickname] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [selectedUser,setSelectedUser]= useState(null);
    const [ followingUser, setFollowingUser] = useState()
    const [dmRoomId , setDmroomId]= useState('');
    const [dmListRoomId, setDmListRoomdId]= useState('');
    
    const handleClose = () => {
        onClose?.();
    }

    const handleSearch = async ()=>{
        try{
            const res= await axios.get('http://localhost:8080/api/search/users/nickname',{
                params: {
                    nickname: nickname,
                },
                headers:{
                    'ngrok-skip-browser-warning': '69420' 
                }
            });
            setUserInfo(res.data);
        }catch(error){
            console.error("검색 중 오류 발생", error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleNewChatRoom = async () => {
        try {
            const existingRooms = await axios.get('http://localhost:8080/rooms', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });

            const existingRoom = existingRooms.data.find(room => {
                return room.participants.some(participant => participant.participantName === selectedUser.nick_name);
            });
    
            if (existingRoom) {
                console.log("이미 있는 방:", existingRoom);
                setDmroomId(existingRoom.id);
                handleClose();
                navigate(`/dm/${existingRoom.id}`)
                // setDmListRoomdId(roomId);
            } else {

                const newRoom = await axios.post('http://localhost:8080/create-room', null, {
                    params: {
                        nickname: selectedUser.nick_name
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'ngrok-skip-browser-warning': '69420',
                    }
                });
    
                console.log("새로운 채팅방 생성 결과:", newRoom.data);
                setDmroomId(newRoom.data.id);
                handleClose();
                navigate(`/dm/${newRoom.data.id}`)
            }
        } catch (error) {
            console.error("채팅방 확인 또는 생성 중 오류 발생:", error);
        }
    };
    useEffect(() => {
        if (dmRoomId) {
            navigate(`/dm/${dmRoomId}`);
        }
    }, [dmRoomId, navigate]);


    const handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            handleSearch();
        }
    };

    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <div className='d-flex justify-content-center align-items-center'>
                                <CloseButton className="btn-close btn-close-white" aria-label="Close"  onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', color: '#333' }}></CloseButton>
                                    <span style={{fontSize:'26px',fontWeight:600}}>새로운 메시지</span>
                                </div>
                                <hr style={{width:'95%' ,marginBottom:'1.5rem'}}/>
                                
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span style={{margin:'5px'}}><b> 받는사람:  </b></span>
                                    <TextInput type="text" value={nickname} onChange={(e) => {setNickname(e.target.value); setUserInfo([]);} } onKeyDown={handleKeyPress} placeholder="검색.. " size="small" searchIcon={IoIosSearch} style={{width:'420px'}}/>

                                </div>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginTop: '10px', marginLeft:'5%' }}>
                                    {selectedUser && (
                                        <div style={{padding: '6px', color:'#fff',backgroundColor: '#ffffff15',border: '1px solid #555', borderRadius: '8px' }}>
                                            <img src={selectedUser.user_img_src} alt={selectedUser.nick_name} style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px', backgroundColor:'white' }} />
                                            <span>{selectedUser.nick_name}</span>
                                        </div>
                                    )}
                                </div>

                                
                                <div className='justify-content-center mt-2 mb-1' style={{ width: '85%', margin: '0 auto', marginTop:'10px',maxHeight: '350px',  overflow: "scroll"}}>
                                    {!nickname.trim() ? (
                                        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)',display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <AiOutlineMessage size='100' color='white' style={{ marginBottom: '20px' }} />
                                            <p style={{ fontSize: '16px', color: '#888',marginTop:'5px' }}> 대화를 시작할 사용자를 검색해보세요. </p>
                                        </div>
                                    ):(
                                        <>
                                        {userInfo && userInfo.map((user) => (
                                            <div key={user.id} onClick={() => handleUserClick(user)} style={{
                                                cursor: 'pointer',marginBottom: '9px',alignItems: 'center',padding: '8px',borderRadius: '8px',
                                                backgroundColor: selectedUser === user ? '#ffffff15' : 'transparent',
                                                transition: 'background-color 0.3s ease', }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                            }}
                                                onMouseLeave={(e) => {
                                                if (selectedUser !== user) {
                                                    e.currentTarget.style.backgroundColor = 'transparent'; 
                                                }
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', width:'95%'}}>
                                                    <img src={user.user_img_src} alt={user.nick_name} style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '5%', backgroundColor:'white' }} />
                                                    <span style={{ fontSize: '18px', marginRight: '0' }}>{user.nick_name}</span>
                                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                                        {selectedUser === user ? (
                                                            <MdCheckCircle size={24} color="#FEF164" />
                                                        ) : (
                                                            <MdOutlineCircle size={24} color="#333" />
                                                        )}
                                                    </div>
                                                </div>
    
                                            </div>
                                        ))}
                                        </>
                                        
                                    )}
                                    
                                </div>
                                
                                <div className='d-flex justify-content-center'  style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '25%' }}>
                                    <Button onClick={handleNewChatRoom} style={{ width: '80%', marginTop: '15px' }}>채팅 시작</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            </PC>

        </div>
    );
}

export default NewDm;



// const userContainerStyle = {
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
// };

// const userImageStyle = {
//     width: '8%',
//     height: '8%',
//     borderRadius: '50%',
//     margin: '5%',
//     backgroundColor: 'white'

// };
