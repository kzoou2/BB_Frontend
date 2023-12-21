import React, { useState, useEffect, useRef } from 'react';
import DmList from '../components/DM/DmList';
import DmRoom from '../components/DM/DmRoom';
import NewDm from '../components/Modal/DM/NewDm';
import { AiOutlineMessage } from "react-icons/ai";
import { Mobile, PC } from '../components/Responsive';
import { StyledButton } from '../style/styled_components/DM_Style';
// import { Client as StompJS } from '@stomp/stompjs';
// import SockJS from 'sockjs-client'; 
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

function DM () {
    const [selectedChat, setSelectedChat] = useState(null);
    const currentUser = 'bb_uddy'
    // const [chatRooms, setChatRooms] = useState([])
    // const selectedRoom = chatRooms.find((room) => room.id === selectedChat);

    const chatRooms=[];
    const onSelectChat = (chatId) => {
        setSelectedChat(chatId);
    };

    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const openNewCaht = () => {
        setIsNewChatOpen(true);
    };

    const client = useRef({});
    const [message, setMessage] = useState(''); 
    const [chatList, setChatList] = useState([]);  
    const [connected, setConnected]= useState(false);



    useEffect(() =>{
        connect();

        return()=>disconnect();
    },[]);

    const connect =()=>{
        client.current = new StompJs.Client({
            // brokerURL: 'ws://ec2-13-125-0-53.ap-northeast-2.compute.amazonaws.com:8080/ws-chat',
            brokerURL: 'ws://94ed-121-190-220-40.ngrok-free.app/ws-chat',
            // connectHeaders:{
                
            // },
            debug: function (str) {
                console.log(str);
              },
            // reconnectDelay: 5000,
            // heartbeatIncoming: 4000,
            // heartbeatOutgoing: 4000,
            // onConnect: () => {
            //   subscribe();
            // },
            onStompError: (frame) => {
              console.error(frame);
            },
            onConnect: () => {
                setConnected(true);
                subscribe();
            },
        });
        const connect = () => {
            if (!client.current.connected) {
                client.current.activate();
                setConnected(true);
            }
        };
        client.current.activate();
    };


    const disconnect = () => {
        if (client.current.connected) {
          client.current.deactivate();
          setConnected(false);
          console.log('Disconnected');
        }
      };

    const subscribe = () => {
        // const destination = "/chatting/topic/room/1"; // 변경된 부분
      
        client.current.subscribe( "/chatting/topic/room/1", ({ body }) => {
          setChatList((_chatList) => [..._chatList, JSON.parse(body)]);
        });
      };

    // const subscribe = () => {
    //     client.current.subscribe("/chatting/topic/room/1", ({ body }) => {
    //       setChatList((_chatList) => [..._chatList, JSON.parse(body)]);
    //     });
    //   };

      const publish = (message) => {
        if (!client.current.connected) {
          return;
        }
    
        client.current.publish({
          destination: "/chatting/pub/message",
          body: JSON.stringify({ message, roomId:1}),
        });
      
        setMessage(""); // 채팅 메시지를 보낸 후에는 입력 폼을 초기화합니다.
      };

    const showChatlist = (message) => {

        if (message) {
            try {
                const parsedMessage = JSON.parse(message);
                const content = parsedMessage.message;
                setChatList((prevChatList) => [...prevChatList, content]);
                console.log('content', content)
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        }
    };

    // const client = useRef({});
    // const [message, setMessage] = useState('');  //message
    // const [chatList, setChatList] = useState([]);  ///chatmessages
    // const [connected, setConnected]= useState(false);

    // useEffect(() =>{
    //     connect();

    //     return()=>disconnect();
    // },[]);

    // const connect =()=>{
    //     client.current = new StompJs.Client({
    //         // brokerURL: 'ws://ec2-13-125-0-53.ap-northeast-2.compute.amazonaws.com:8080/ws-chat',
    //         brokerURL: 'ws://94ed-121-190-220-40.ngrok-free.app/ws-chat',
    //         // connectHeaders:{
                
    //         // },
    //         debug: function (str) {
    //             console.log(str);
    //           },
    //         // reconnectDelay: 5000,
    //         // heartbeatIncoming: 4000,
    //         // heartbeatOutgoing: 4000,
    //         // onConnect: () => {
    //         //   subscribe();
    //         // },
    //         onStompError: (frame) => {
    //           console.error(frame);
    //         },
    //         onConnect: () => {
    //             setConnected(true);
    //             subscribe();
    //         },
    //     });
    //     const connect = () => {
    //         if (!client.current.connected) {
    //             client.current.activate();
    //             setConnected(true);
    //         }
    //     };
    //     client.current.activate();
    // };


    // const disconnect = () => {
    //     if (client.current.connected) {
    //       client.current.deactivate();
    //       setConnected(false);
    //       console.log('Disconnected');
    //     }
    //   };

    // const subscribe = () => {
    //     // const destination = "/chatting/topic/room/1"; // 변경된 부분
      
    //     client.current.subscribe( "/chatting/topic/room/1", ({ body }) => {
    //       setChatList((_chatList) => [..._chatList, JSON.parse(body)]);
    //     });
    //   };

    // // const subscribe = () => {
    // //     client.current.subscribe("/chatting/topic/room/1", ({ body }) => {
    // //       setChatList((_chatList) => [..._chatList, JSON.parse(body)]);
    // //     });
    // //   };

    //   const publish = (message) => {
    //     if (!client.current.connected) {
    //       return;
    //     }
    
    //     client.current.publish({
    //       destination: "/chatting/pub/message",
    //       body: JSON.stringify({ message, roomId: 1 }),
    //     });
      
    //     setMessage(""); // 채팅 메시지를 보낸 후에는 입력 폼을 초기화합니다.
    //   };

    // const showChatlist = (message) => {

    //     if (message) {
    //         try {
    //             const parsedMessage = JSON.parse(message);
    //             const content = parsedMessage.message;
    //             setChatList((prevChatList) => [...prevChatList, content]);
    //             console.log('content', content)
    //         } catch (error) {
    //             console.error('Error parsing WebSocket message:', error);
    //         }
    //     }
    // };





    return (
        <div>
            <PC>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px' }}>
                    {/* <div style={{ width: '25%', borderRight: '1px solid #ccc', paddingRight: '10px' }} >

                        <DmList
                            onSelectChat={onSelectChat}
                            selectedChat={selectedChat}
                            currentUser={currentUser}
                            chatRooms={chatRooms}
                        />
                    </div>


                    <div style={{ width: '60%' }}>
                        {selectedRoom ? (
                            <DmRoom
                                // userImage={selectedRoom.userImage}
                                // username={selectedRoom.username}
                                // messages={selectedRoom.messages}
                                userImage={selectedRoom.userImage}
                                username={selectedRoom.username}
                                messages={selectedRoom.messages}
                                selectedRoom={{ id: 1, name: 'Your Room Name' }} // 수정된 부분
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AiOutlineMessage size='100' color='black' style={{ marginBottom: '20px' }} />
                                <StyledButton onClick={() => openNewCaht()} > <b> 메시지 보내기 </b> </StyledButton>
                            </div>
                        )}
                    </div> */}
                    <div className="dm-card">
                        <div className="dm-header">
                            <button onClick={connect} disabled={connected}>
                                {connected ? 'Connected' : 'Connect'}
                            </button>
                            <button onClick={() => disconnect()} disabled={!connected}>
                                Disconnect
                            </button>
                        </div>
                        
                        <div className="dm-body">
                            <ul>
                                {chatList.map((_chatList, index) => (
                                <li key={index}>{_chatList.message}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="dm-input">
                            <input type="text" placeholder="메시지 입력.." style={{ width: '90%', padding: '10px' }}
                            value={message} onChange={(e) => setMessage(e.target.value)}/>
                            <button onClick={()=> publish(message)}  style={{ background: "white" }} >send</button>
                        </div>
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

        // <div>
        //     <div>
        //         <button onClick={connect} disabled={connected}>
        //             {connected ? 'Connected' : 'Connect'}
        //         </button>
        //         <button onClick={() => disconnect()} disabled={!connected}>
        //             Disconnect
        //         </button>
        //     </div>
        //     <div>
        //         <input
        //             type="text"
        //             value={message}
        //             onChange={(e) => setMessage(e.target.value)}
        //         />
        //         <button onClick={() => publish(message)}>send</button>
        //     </div>
        //     <div>
        //         <ul>
        //             {chatList.map((_chatList, index) => (
        //             <li key={index}>{_chatList.message}</li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>
    );
}

export default DM;