import React, { useState } from 'react';
import DmList from '../components/DM/DmList';
import DmRoom from '../components/DM/DmRoom';
import NewDm from '../components/Modal/DM/NewDm';
import { AiOutlineMessage } from "react-icons/ai";
import { Mobile, PC } from '../components/Responsive';
import { StyledButton } from '../style/styled_components/DM_Style';

const DM = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const currentUser = 'bb_uddy'
    // const [chatRooms, setChatRooms] = useState([]);

    // useEffect(() => {
    //     fetch('sample_dm.json')
    //         .then((response) => response.json())
    //         .then((data) => setChatRooms(data.chatRooms))
    //         .catch((error) => console.error('Error fetching data:', error));
    // }, []);

    const chatRooms = [
        {
            id: 1, username: 'user1', userImage: "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
            messages: [
                { "type": "outgoing", "content": "노래추천 해줘", "timestamp": "2023-11-27" },
                { "type": "incoming", "content": "For you - 이하이", "timestamp": "2023-11-27" },
                { "type": "incoming", "content": "Home by Midnight - Jamie Miller", "timestamp": "2023-11-27" },
                { "type": "incoming", "content": "It Ain't Up To Me - Dylan Bernard", "timestamp": "2023-11-27" },
                { "type": "incoming", "content": "Versace on the Floor - Bruno Mars", "timestamp": "2023-11-27" },
                { "type": "outgoing", "content": "지극히 사적인 얘기 - 다비치", "timestamp": "2023-11-28" },
                { "type": "incoming", "content": "PINK! - 권진아", "timestamp": "2023-11-28" },
                { "type": "outgoing", "content": "INVU - 태연", "timestamp": "2023-11-28" },
                { "type": "outgoing", "content": "노래 더줘", "timestamp": "2023-11-29" },
                { "type": "incoming", "content": "@j_tunes", "timestamp": "2023-11-29" },
                { "type": "incoming", "content": "이사람 팔로우해서 들어봐", "timestamp": "2023-11-29" }

            ]
        },
        {
            id: 2, username: 'user22', userImage: "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
            messages: [
                { "type": "outgoing", "content": "달콤팝콘", "timestamp": "2023-02-14" },
                { "type": "outgoing", "content": "먹고싶다", "timestamp": "2023-02-14" },
                { "type": "incoming", "content": "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", "timestamp": "2023-02-14" },
                { "type": "incoming", "content": "달콤에달자도싫어!", "timestamp": "2023-02-14" },
                { "type": "outgoing", "content": "맛있게먹을거면서...", "timestamp": "2023-02-14" }
            ]
        },

    ];

    const selectedRoom = chatRooms.find((room) => room.id === selectedChat);

    const onSelectChat = (chatId) => {
        setSelectedChat(chatId);
    };

    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const openNewCaht = () => {
        setIsNewChatOpen(true);
    };

    return (
        <div>
            <PC>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px' }}>
                    <div style={{ width: '25%', borderRight: '1px solid #ccc', paddingRight: '10px' }} >
                        {/* DmList */}
                        <DmList
                            onSelectChat={onSelectChat}
                            selectedChat={selectedChat}
                            currentUser={currentUser}
                            chatRooms={chatRooms}
                        />
                    </div>

                    {/* 채팅방 내용 */}

                    <div style={{ width: '60%' }}>
                        {selectedRoom ? (
                            <DmRoom
                                userImage={selectedRoom.userImage}
                                username={selectedRoom.username}
                                messages={selectedRoom.messages}
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AiOutlineMessage size='100' color='black' style={{ marginBottom: '20px' }} />
                                <StyledButton onClick={() => openNewCaht()} > <b> 메시지 보내기 </b> </StyledButton>
                            </div>
                        )}
                    </div>
                </div>

                {isNewChatOpen && (<NewDm
                    open={isNewChatOpen}
                    onClose={() => {
                        setIsNewChatOpen(false);
                    }}
                />)}
            </PC>

            <Mobile>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px' }}>
                    <div style={{ width: '25%', borderRight: '1px solid #ccc', paddingRight: '10px' }} >
                        {/* DmList */}
                        <DmList
                            onSelectChat={onSelectChat}
                            selectedChat={selectedChat}
                            currentUser={currentUser}
                            chatRooms={chatRooms}
                        />
                    </div>

                    {/* 채팅방 내용 */}

                    <div style={{ width: '60%' }}>
                        {selectedRoom ? (
                            <DmRoom
                                userImage={selectedRoom.userImage}
                                username={selectedRoom.username}
                                messages={selectedRoom.messages}
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <AiOutlineMessage size='100' color='black' style={{ marginBottom: '20px' }} />
                                <StyledButton onClick={() => openNewCaht()} > <b> 메시지 보내기 </b> </StyledButton>
                            </div>
                        )}
                    </div>
                </div>

                {isNewChatOpen && (<NewDm
                    open={isNewChatOpen}
                    onClose={() => {
                        setIsNewChatOpen(false);
                    }}
                />)}

            </Mobile>



        </div>
    );
}

export default DM;


