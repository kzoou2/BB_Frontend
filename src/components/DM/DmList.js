import React, { useState, useEffect } from 'react';
import { BiMessageEdit } from "react-icons/bi";
import { PC, Mobile } from '../Responsive';
import { ListContainer, StyledChatButton } from '../../style/styled_components/DmList_Style';
import NewDm from '../Modal/DM/NewDm';
import axios from 'axios';
import DmRoom from './DmRoom';
import { useRecoilState } from 'recoil';
import { DmRoomIdAtom } from '../../state/DmAtom';

const DmList = ({ selectedChat, currentUser }) => {
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const [chatRooms, setChatRooms] = useState([]);
    const [roomId, setRoomId] = useRecoilState(DmRoomIdAtom);
 
    useEffect(() => {
        ChatRoomList();
    }, []);

    const ChatRoomList = async () => {
        try {
            const res = await axios.get('https://9d71-121-143-39-62.ngrok-free.app/rooms', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
                }
            });
            console.log("result", res)
            const allChatRooms = res.data;
            const currentUser = "lkj";

            const userChatRooms = allChatRooms.filter(room =>
                room.participantNames.includes(currentUser));

            setChatRooms(userChatRooms);
            console.log(userChatRooms);
        } catch (error) {
            console.error('Error chat rooms', error)
        }
    }

    const openNewCaht = () => {
        setIsNewChatOpen(true);
    };

    const onSelectChat = (roomId) => {
        setRoomId(roomId);
        console.log(roomId)
    }


    return (
        <div>
            <PC>
                <div className='' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }} >
                    <h3> {currentUser}</h3>
                    <button className='button' onClick={() => openNewCaht()} >
                        <BiMessageEdit className='' size='27' color='black' />
                    </button>
                </div>

                <div>
                    <p> 메시지</p>
                </div>

                <ListContainer as='ul'>
                    {chatRooms.map((room) => (
                        <StyledChatButton
                            key={room.id}
                            onClick={() => onSelectChat(room.id)}
                            // onClick={()=> handleChatRoomClick(room.id)}
                            selected={selectedChat === room.id}
                            as="li"
                        >
                            <div className='chat'>
                                <img
                                    src={room.userImage}
                                    alt={`${room.username}`}
                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                />
                                <div> {room.id}</div>
                                {/* <div></div> 받는 사람 넣어줄것  */}
                                <div> {room.lastMessage}</div>

                            </div>
                        </StyledChatButton>
                    ))}
                </ListContainer>

                {isNewChatOpen && (<NewDm
                    open={isNewChatOpen}
                    onClose={() => {
                        setIsNewChatOpen(false);
                        ChatRoomList();
                    }}
                />)}
            </PC>

            <Mobile>
                <div className='' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }} >
                    <button className='button' onClick={() => openNewCaht()} >
                        <BiMessageEdit className='' size='27' color='black' />
                    </button>
                </div>

                <ListContainer as='ul'>
                    {chatRooms.map((room) => (
                        <StyledChatButton
                            key={room.id}
                            onClick={() => onSelectChat(room.id)}
                            selected={selectedChat === room.id}
                            as="li"
                        >
                            <div className='chat' >
                                <img
                                    src={room.userImage}
                                    alt={`${room.username}`}
                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                />
                            </div>
                        </StyledChatButton>
                    ))}
                </ListContainer>

                {isNewChatOpen && (<NewDm
                    open={isNewChatOpen}
                    onClose={() => {
                        setIsNewChatOpen(false);
                    }}
                />)}

            </Mobile>
        </div>

    );
};

export default DmList;