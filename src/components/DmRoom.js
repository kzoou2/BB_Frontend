import React,{useState} from "react";
import { IoMdSend } from "react-icons/io";
import "../css/DmRoom.css";


const DmRoom= ({ userImage, username, messages }) => {
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

    );
}

export default DmRoom;