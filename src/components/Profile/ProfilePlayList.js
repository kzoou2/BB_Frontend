import React, { useEffect, useState } from 'react';
import { PC, Mobile } from '../Responsive';
import Loading from '../Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from '../Common/PlaylistCard';

function ProfilePlayList({userNickname}) {
    const [isLoading, setIsLoading] = useState(true);
    const [playlistData, setPlaylistData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`http://localhost:8080/api/playlist/user/${userNickname}`, {
            headers: {
                'Content-Type': `application/json`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                console.log("서버에서 받아온 결과", response.data);
                const temp = response.data;
                setPlaylistData(temp);
                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [])

    const openPlaylistDetail = (playlistId) => {
        navigate(`/playlistDetail/${userNickname}/${playlistId}`);
    }

    return (
        <div>
            {isLoading ? <Loading /> : null}
            <PC>
                {/* <div className='profile-container' style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px"}}> */}
                    <div className='row ms-4 me-4' >
                        {isLoading ? <Loading /> : null}
                        {playlistData && playlistData.length > 0 ? (
                            playlistData.reverse().map((playlist) => (
                                    <PlaylistCard key={playlist.id} playlist={playlist} onClick={openPlaylistDetail}/>
                                ))
                            ) : (
                                <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>아직 플레이리스트가 없어요.</p>
                            )
                        }
                    </div>
                {/* </div> */}
                
            </PC>
            <Mobile>
                <div className='row' >
                    {playlistData && playlistData.length > 0 ? (
                        playlistData.reverse().map((playlist) => (
                                <PlaylistCard key={playlist.id} playlist={playlist} onClick={openPlaylistDetail}/>
                            ))
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>아직 플레이리스트가 없어요.</p>
                        )
                    }
                </div>
            </Mobile>
        </div>


    );
}

export default ProfilePlayList;