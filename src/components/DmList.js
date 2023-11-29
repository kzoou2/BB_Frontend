import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { BiMessageEdit } from "react-icons/bi";
import { PC, Mobile } from './Responsive';
import styled from 'styled-components';
import NewDm from '../Modal/Dm/NewDm';

const DmList = ({ onSelectChat, selectedChat, currentUser, chatRooms }) => {
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const openNewCaht = () => {
        setIsNewChatOpen(true);
    };
    
    return(
        <div>
            <PC>
                <div className='' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'10px'}} >
                    <h3> {currentUser}</h3>
                    <button className='button' onClick={()=> openNewCaht() } >
                        <BiMessageEdit className='' size='27' color='black'/>
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
                            selected={selectedChat === room.id}
                            as="li"
                        >
                            <div className='chat'>
                                <img
                                    src={room.userImage}
                                    alt={`${room.username}`}
                                    style={{width: '50px', height: '50px', marginRight: '10px' }}
                                />
                                <div> {room.username}</div>
                                <div> {room.lastMessage}</div>

                            </div>    
                        </StyledChatButton>
                    ))}
                </ListContainer>

                {isNewChatOpen && (<NewDm
                    open= {isNewChatOpen}
                    onClose={()=>{
                        setIsNewChatOpen(false);
                    }}
                />)}
            </PC>
            
            <Mobile>
                <div className='' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'10px'}} >
                    <button className='button' onClick={()=> openNewCaht() } >
                        <BiMessageEdit className='' size='27' color='black'/>
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
                                    style={{width: '50px', height: '50px', marginRight: '10px' }}
                                />
                            </div>    
                        </StyledChatButton>
                    ))}
                </ListContainer>

                {isNewChatOpen && (<NewDm
                    open= {isNewChatOpen}
                    onClose={()=>{
                        setIsNewChatOpen(false);
                    }}
                />)}

            </Mobile>
        </div>

    );
};


export default DmList;



const ListContainer = styled.ul`
    overflow-y: auto;
    height: 70vh;
    list-style: none;
    padding: 0;
    margin: 0;
`

const StyledChatButton = styled.li`
display: flex;
align-items: center;
// font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
border: none;
background: ${({ selected }) => (selected ? '#EAEAEA' : 'white')};
transition: background 0.3s;

&:not(:hover) {
    background: ${({ selected }) => (selected ? '#EAEAEA' : 'white')};
}

&:hover {
    background: ${({ selected }) => (selected ? '#EAEAEA' : '#F6F6F6')}; 
}

div {
    display: flex;
    align-items: center;
    padding: 8px;

    img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
}
`;

