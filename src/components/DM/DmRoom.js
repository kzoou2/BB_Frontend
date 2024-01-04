import React,{useState, useEffect, useRef} from "react";
import { IoMdSend } from "react-icons/io";
import "../../style/css/DmRoom.css";
import * as StompJs from "@stomp/stompjs";

const DmRoom= ({ roomId, userImage, username, messages }) => {
    // const [messages, setMessages ] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () =>{
        if (inputMessage.trim() !== ''){

            const newMessage = {
                type: "outgoing",
                content: inputMessage,
                timestamp: new Date().toLocaleDateString(),
            };

            setInputMessage('');
        }
    };
    console.log(roomId);

    // const client = useRef({});
    // const [message, setMessage] = useState(''); 
    // const [chatList, setChatList] = useState([]);   // 채팅기록
    // const [connected, setConnected]= useState(false);

    // useEffect(() =>{
    //     connect();

    //     return()=>disconnect();
    // },[]);
    
    // const connect =()=>{
    //     client.current = new StompJs.Client({
    //         // brokerURL: 'ws://ec2-13-125-0-53.ap-northeast-2.compute.amazonaws.com:8080/ws-chat',
    //         brokerURL: 'ws://9d71-121-143-39-62.ngrok-free.app/ws-chat',
    //         connectHeaders:{
    //             Authorization: localStorage.getItem('token')
    //         },
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
    //     const headers = {
    //         Authorization: window.localStorage.getItem('token')
    //       };

    //     client.current.subscribe( "/chatting/topic/room/2", ({ body }) => {
    //       setChatList((_chatList) => [..._chatList, JSON.parse(body)]);
    //     }, headers);
    //   };


    //   const publish = (message) => {
    //     if (!client.current.connected) {
    //       return;
    //     }
    
    //     client.current.publish({
    //       destination: "/chatting/pub/message",
    //       headers:{ Authorization:  window.localStorage.getItem('token')},
    //       body: JSON.stringify({ message, roomId:2 }),
    //     });
      
    //     setMessage(""); // 채팅 메시지를 보낸 후에는 입력 폼을 초기화합니다.
    //   };


    return(

        <div className="dm-card">
            <div className="dm-header">
                <img src={userImage} alt={`${username}`} style={{width: '50px', height: '50px' }}/>
                <div className="username"> {username} </div>
            </div>

            <hr/>   
            <div className="dm-body">
                {messages.map((message, index) =>(
                    <div key={index} className={`message ${message.type}`}
                    >
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>

            <div className="dm-input">
                <input type="text" placeholder="메시지 입력..." style={{ width: '90%', padding: '10px' }}
                value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} style={{ background: "white" }} >
                    <IoMdSend size='30' color='black' />
                </button>
            </div>

        </div>

        // <div className="dm-card">
        //     <div className="dm-header">
        //         <button onClick={connect} disabled={connected}>
        //             {connected ? 'Connected' : 'Connect'}
        //         </button>
        //         <button onClick={() => disconnect()} disabled={!connected}>
        //             Disconnect
        //         </button>
        //     </div>
            
        //     {/* <div className="dm-body">
        //         <ul>
        //             {chatList.map((_chatList, index) => (
        //             <li key={index}>{_chatList.message}</li>
        //             ))}
        //         </ul>
        //     </div> */}
        //     <div className="dm-body">
        //         <ul>
        //             {chatList.map((chat, index) => (
        //                 <li key={index}
        //                 // style={{
        //                 //     textAlign: chat.sender === currentUser ? 'right' : 'left',
        //                 //     paddingRight: chat.sender === currentUser ? '10px' : '0',
        //                 //     paddingLeft: chat.sender === currentUser ? '0' : '10px',
        //                 // }}
        //                 >
        //                     <div>{chat.sender}</div>
        //                     <div>
        //                         <strong>Message:</strong> {chat.message}
        //                     </div>
        //                     <div>
        //                         <strong>Created Time:</strong> {chat.createdTime}
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        //     <div className="dm-input">
        //         <input type="text" placeholder="메시지 입력.." style={{ width: '90%', padding: '10px' }}
        //         value={message} onChange={(e) => setMessage(e.target.value)}/>
        //         <button onClick={()=> publish(message)}  style={{ background: "white" }} >send</button>
        //     </div>
        // </div>

    );
}

export default DmRoom;