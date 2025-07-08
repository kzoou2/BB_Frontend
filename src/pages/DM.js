import React, { useState, useEffect} from 'react';
import DmList from '../components/DM/DmList';
import DmRoom from '../components/DM/DmRoom';
import NewDm from '../components/Modal/DM/NewDm';
import { Mobile, PC } from '../components/Responsive';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { DmRoomIdAtom } from '../state/DmAtom';
import MiniNavbar from '../components/Navigation/MiniNavbar';
import MiniPlayer from '../components/Player/MiniPlayer';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../components/WebSocketConnection';
import { AiOutlineMessage } from "react-icons/ai";
import '../style/css/DmRoom.css';
import { SoftButton } from '../style/styled_components/Button_Style';


function DM() {
    const { connected } = useWebSocket();
    const dmRoomId  = useRecoilValue(DmRoomIdAtom);
    const resetDmRoomId = useResetRecoilState(DmRoomIdAtom);
    const [selectedChatInfo, setSelectedChatInfo] = useState(null);
    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (dmRoomId && dmRoomId !== "0") {
            navigate(`/dm/${dmRoomId}`);
        }
    }, [dmRoomId, navigate]);

    useEffect(()=>{
        return() =>{
            resetDmRoomId();
        };
    },[resetDmRoomId]);

    const openNewCaht = () => {
        setIsNewChatOpen(true);
    };

    return (
            <div>
                <PC>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0px', }}>
                        <div className='col-md-1'><MiniNavbar/></div>
                        <div className='col-md-2' >
                            <DmList setSelectedChatInfo={setSelectedChatInfo}  selectedChatInfo={selectedChatInfo} />
                        </div>
                        <div className='col-md-7'>
                        {connected ? (
                            dmRoomId && dmRoomId !== "0" ? (
                                <DmRoom selectedChatInfo={selectedChatInfo} />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                    <AiOutlineMessage size='100' color='white' style={{ marginBottom: '20px'}} />
                                    <div style={{ fontSize: '28px', fontWeight: '600', color: 'white' }}> 내 메시지</div>
                                    <p style={{ fontSize: '14px', color: '#888',marginTop:'5px' }}> 새로운 메시지를 시작해보세요 </p>
                                    <SoftButton onClick={openNewCaht}>메세지 보내기</SoftButton>
                                </div>
                            )
                        ) : (
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: '600', color: 'white' }}>내 메시지</div>
                                <p style={{ fontSize: '14px', color: '#888', marginTop: '5px' }}>채팅방을 여는 중이에요...</p>
                            </div>
                        )}
                        </div>

                        <div className='col-md-2'>
                            <MiniPlayer />
                        </div>

                    {isNewChatOpen && (<NewDm
                        open={isNewChatOpen}
                        onClose={() => {
                            setIsNewChatOpen(false);
                        }}
                    />)}    
                    </div>
                </PC>
                <Mobile>
                <MiniNavbar/>
                    <div>
                    <DmList setSelectedChatInfo={setSelectedChatInfo}  selectedChatInfo={selectedChatInfo} />
                    </div>
                </Mobile>
            </div>
    );
}

export default DM;