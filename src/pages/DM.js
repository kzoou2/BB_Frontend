import React, { useState, useEffect} from 'react';
import DmList from '../components/DM/DmList';
import DmRoom from '../components/DM/DmRoom';
import { Mobile, PC } from '../components/Responsive';
import { useRecoilValue } from 'recoil';
import { DmRoomIdAtom } from '../state/DmAtom';
import '../style/css/DmRoom.css';
import MiniPlayer from '../components/Player/MiniPlayer';


function DM() {

    const dmRoomId = useRecoilValue(DmRoomIdAtom);
    const [selectedChatInfo, setSelectedChatInfo] = useState(null);

    return (
        <div>
            <PC>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px' }}>
                    <div className='col-md-2' >

                        <DmList 
                        selectedChatInfo={selectedChatInfo}
                        setSelectedChatInfo={setSelectedChatInfo}
                        />
                    </div>
                    <div className='col-md-8'>
                        {/* {dmRoomId !== 0 && (
                            <div className="dm-header">
                                <div className="img-avatar"></div>
                                <div className="text-chat">{dmRoomId}</div>
                                <div className='text-chat'></div>
                            </div>
                        )} */}
                        <DmRoom  selectedChatInfo={selectedChatInfo} />
                    </div>

                    <div className='col-md-2'>
                        <MiniPlayer />
                    </div>

                </div>
            </PC>
            <Mobile></Mobile>
        </div>
    );
}

export default DM;