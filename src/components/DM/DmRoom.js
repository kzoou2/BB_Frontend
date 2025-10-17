import React,{useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import NewDm from '../Modal/DM/NewDm';
import "../../style/css/DmRoom.css";
import { Mobile,PC } from "../Responsive";
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { DmRoomIdAtom } from "../../state/DmAtom";
import {userNicknameAtom} from "../../state/UserAtom";
import { useWebSocket } from "../WebSocketConnection";
import TextInput from "../Common/TextInput";
import { VscSend } from "react-icons/vsc";

const DmRoom= ({ selectedChatInfo  }) => {
    const dmRoomId = useRecoilValue(DmRoomIdAtom);
    const { client, connected } = useWebSocket();
    const [message, setMessage] = useState('');     
    const [chatList, setChatList] = useState([]);   // 채팅기록
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const currentUserNickname = useRecoilValue(userNicknameAtom);

    const otherImgSrc = selectedChatInfo?.participantImgSrc;
    const otherName = selectedChatInfo?.participantName;
    const subscriptionRef =  useRef(null);
    const bottomRef = useRef(null);

    const handleKeyDown =(e) =>{
        if(e.key === 'Enter' && !e.shiftKey ){
            e.preventDefault();
            handleSendMessage();
        }
    }
    const handleSendMessage = () =>{
        publish(message);
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
        }
    }, [chatList]);

    useEffect(() => {
        if (!connected || !client.current || !dmRoomId) return;

        unsubscribe();
        subscribe(dmRoomId);

        return () => {
            unsubscribe();
        };
    }, [dmRoomId, connected]);

    const subscribe =(dmRoomId) =>{
        const headers={ Authorization: localStorage.getItem('accessToken')};

        const subscriptionId = `sub-${dmRoomId}`;
        const stompClient = client.current;
        
        if(!stompClient || !stompClient.connected){
            console.log("웹소켓연결안됨")
        }

        const subscription = stompClient.subscribe(`/chatting/topic/room/${dmRoomId}`,({body}) =>{
            const parsedMessage = JSON.parse(body);

            if (!parsedMessage.createdTime) {
                parsedMessage.createdTime = new Date().toISOString(); 
            }
            if (parsedMessage.chatType === "MESSAGE") {
                setChatList(prevChatList => [...prevChatList, parsedMessage]);
            }

        },
        {
            id: subscriptionId,
            ...headers,
        }
    );
    subscriptionRef.current = subscription;
    console.log(`🟢 Subscribed to room ${dmRoomId} with id ${subscriptionId}`);

    axios.get(`http://localhost:8080/room/${dmRoomId}/messages`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'ngrok-skip-browser-warning': '69420',
        },
    })
    .then(res=> setChatList(res.data))
    .catch(err => console.error('채팅내역 불러오기 실패 '))
    };


    const unsubscribe = () => {
        const headers = {
            Authorization: window.localStorage.getItem('accessToken')
        };

        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe(headers);
            console.log(`🔴 Unsubscribed from ${JSON.stringify(subscriptionRef.current)}`);
            subscriptionRef.current = null;
        }
    };


    const publish = (message) => {
    if (!client.current|| !connected || message.trim()== '') {
        return;
    }

    client.current?.publish({
        destination: "/chatting/pub/message",
        headers: { Authorization: window.localStorage.getItem('accessToken') },
        body: JSON.stringify({ message, roomId:`${dmRoomId}` , chatType: "MESSAGE",sender: currentUserNickname, }),
    });

    setMessage("");
};



    const isDifferentDate = (prevMessage, currentMessage) => {
        const prevDate = new Date(prevMessage.createdTime).toLocaleDateString();
        const currentDate = new Date(currentMessage.createdTime).toLocaleDateString();
        return prevDate !== currentDate;
    };

    const isDifferentTime = (prevMessage, currentMessage) => {
        if (!prevMessage || !currentMessage) return true;
        const prevTime = formatTime(prevMessage.createdTime);
        const currentTime = formatTime(currentMessage.createdTime);
        return prevTime !== currentTime;
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}년 ${month}월 ${day}일`;
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours() % 12 || 12; // 12시간 형식으로 변경
        const ampm = date.getHours() < 12 ? 'AM' : 'PM';
        return `${ampm} ${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };


    return(
        <div>
            <PC>
                <div className="dm-card" >
                    <div className="dm-header">
                        <Link to={`/profile/${otherName}`} style={{ textDecorationLine: "none", color: "white" }} >
                            <img className="img-avatar" src={otherImgSrc} alt="Participant Avatar" />
                            <div className='text-chat'><b> {otherName} </b></div>
                        </Link>
                    </div>

                    <div className="dm-body" >
                        {chatList.map((chat, index) => (
                            <div key={index}>
                                {(index === 0 || isDifferentDate(chatList[index - 1], chat)) && (
                                        <>
                                        {index !== 0 && <hr />}
                                        <div className="message-date">
                                            <div>{formatDate(chat.createdTime)}</div>
                                        </div>
                                    </>
                                )}

                                <div className={`message-box ${chat.sender === currentUserNickname ? 'outgoing' : 'incoming'}`}>
                                    {(chat.sender === otherName && (index === 0 || isDifferentTime(chat, chatList[index + 1], chat))) ? (
                                        <img className="userimg" src={otherImgSrc} alt="User Avatar" />
                                    ):(
                                        <div className="userimg-placeholder" />
                                    )}
                                    <div className="message-container">
                                        <div className='message'>{chat.message}</div>
                                        {(index === chatList.length - 1 || isDifferentTime(chat, chatList[index + 1])) && (
                                            <div className={`count ${chat.sender === currentUserNickname ? 'outgoing' : 'incoming'}`}>
                                                {chat.sender === currentUserNickname && chat.readCount === 0 && <div className="read-status">읽음</div>}
                                                <div className="message-time">{formatTime(chat.createdTime)}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <TextInput value={message} onChange={(e) => setMessage(e.target.value)} onClick={handleSendMessage} placeholder="메시지 입력.." size="large" icon={VscSend} onKeyDown={handleKeyDown}  />
                    </div>
                </div>

            {isNewChatOpen && (<NewDm
                open={isNewChatOpen}
                onClose={() => {
                    setIsNewChatOpen(false);
                }}
            />)}
            
            </PC>
            <Mobile></Mobile>
        </div>
    );
}

export default DmRoom;

