import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { BiMessageEdit } from "react-icons/bi";
// import { PC, Mobile } from './Responsive';

const DmList = ({ onSelectChat, selectedChat, currentUser, chatRooms, onNewMessage }) => {

    
    return(
        <div>
            {/* <PC> */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'10px'}} >
                    <h3> {currentUser}</h3>
                    <button className='button' onClick={onNewMessage}>
                        <BiMessageEdit className='' size='27' color='black'/>
                    </button>
                </div>

                <p> 메시지 </p>

                <div>
                    {chatRooms.map((room) => (
                        <button
                            key={room.id}
                            onClick={() => onSelectChat(room.id)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                fontWeight: selectedChat === room.id ? 'bold' : 'normal', 
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <img
                                    // src={room.userImage}
                                    src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                                    alt={`${room.user}`}
                                    style={{width: '50px', height: '50px', marginRight: '10px' }}
                                />
                                <div>
                                    <div> {room.username}</div>
                                    <div> {room.lastMessage}</div>
                                </div>
                            </div>    
                        </button>
                    ))}
                </div>
            {/* </PC>
            
            <Mobile>

            </Mobile> */}

            {/* <ul>
                {users.map((user) => (
                    <li key={user.UserId} onClick={() => onUserSelect(user)}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                            <img src={user.profilePicture} alt={user.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div>
                            <h4> {user.username}</h4>
                            <p>{user.lastMessage}</p>
                            <span>{user.lastMessageTime}</span>
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>

    );
};


export default DmList;