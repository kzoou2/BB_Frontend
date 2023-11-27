import React,{useState} from "react";
import { IoMdSend } from "react-icons/io";

// const DmRoom = ({ selectedUser }) => {
//     const [ messages, setMessages ] = useState([]);
//     const [ inputMessage, setInputMessage ] =useState('');

//     const handleSendMessage = () => {
//         if(inputMessage.trim () !== ''){
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 {text: inputMessage, timestamp: new Date().toLocaleDateString() },
//             ]);
//             setInputMessage('');
//         }
//     };

//     return(
//         <div className="dm-room">
//             <div className="messages">
//                 {messages.map((message, index) => (
//                     <div key={index} className="message">
//                         <span className="timestamp">{message.timestamp}</span>
//                         <p>{message.text}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="input-container">
//                 <input
//                 type="text"
//                 placeholder="메시지 입력..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 />
//                 <button></button>
//             </div>

//         </div>

//     );
// };



const DmRoom= ({ userImage, username}) => {
    const [message, setMessages ] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () =>{
        if (inputMessage.trim() !== ''){
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: inputMessage, timestamp: new Date(). toLocaleDateString() },
            ]);
            setInputMessage('');
        }
    };

    return(

        <div className="dm-room">
            <div className="dm-room-user">
                <img
                    src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                    style={{width: '50px', height: '50px', marginRight: '10px' }}
                />
                <h3> {username}</h3>
            </div>

            <hr/>   
            <div className="messages">
            </div>

            <div className="message-input">
                <input type="text" placeholder="메시지 입력..." style={{ width: '90%', padding: '10px' }}/>
                <button onClick={handleSendMessage}>
                    <IoMdSend size='30' color='black' />
                </button>
            </div>
        </div>

    );
}

export default DmRoom;