import React, { useState } from 'react';
import Navbar from './navbar';
import DmList from '../components/DmList';
import DmRoom from '../components/DmRoom';
import styled from 'styled-components';
import { AiOutlineMessage } from "react-icons/ai";

function DM() {
    const [selectedChat, setSelectedChat ] = useState(null);
    const currentUser = 'bb_uddy'
    
    const chatRooms = [
        { id: 1, user: 'user1', messages: ['안녕', '안녕하세요'] },
        { id: 2, user: 'user22', messages: ['반가워', '잘 지내니?'] },
    ];

    const selectedRoom = chatRooms.find((room) => room.id === selectedChat);

    const onSelectChat = (chatId) => {
        setSelectedChat(chatId);
    };



    return (
        // <div>
        //     <Navbar />
        //     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        //         <div style={{ width: '30%' , borderRight: '1px solid #ccc', paddingRight: '20px'}}>
        //             <DmList users={users} onUserSelect={handleUserSelect} />
        //         </div>
        //         {/* <div style={{ width: '60%' }}>
        //         {selectedUser ? (
        //             <DmRoom selectedUser={selectedUser} />
        //         ) : (
        //             <p>채팅을 시작하려면 사용자를 선택하세요.</p>
        //         )}
        //         </div> */}
        //     </div>
        // </div>

        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px'  }}>
                <div  style={{ width: '25%' , borderRight: '1px solid #ccc', paddingRight: '10px'}} >
                    {/* DmList */}
                    <DmList
                    onSelectChat={onSelectChat}
                    selectedChat={selectedChat}
                    currentUser={currentUser}s
                    chatRooms={chatRooms}
                    />
                </div>
            
            {/* 채팅방 내용 */}

                {/* <div style={{ width:'60%' }} >
                    {selectedRoom && (
                        <div>
                            <h2>{selectedRoom.user}와의 채팅</h2>
                            <ul>
                                {selectedRoom.messages.map((message, index) => (
                                <li key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div> */}

                <div style={{ width:'65%' }}>
                    {selectedRoom ? (
                        <DmRoom
                            userImage="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                            username={selectedRoom.user}
                        />
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <AiOutlineMessage size='100' color='black'  style={{ marginBottom: '20px' }} />
                            <StyledButton><b> 메시지 보내기 </b></StyledButton>
                        </div>
                    )}
                </div>
            </div>

                
        </div>
    );
}

export default DM;


const StyledButton = styled.button`
  background: rgb(0, 149, 246);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  padding: 5px 15px;
  cursor: pointer;

  &:hover {
    background: rgb(24, 119, 242);
  }

  &:active:not(:hover) {
    background: rgb(0, 149, 246);
    opacity: .7;
  }
`;