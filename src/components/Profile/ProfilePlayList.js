import React, { useEffect, useState } from 'react';
import { PC, Mobile } from '../Responsive';
import Loading from '../Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePlayList() {
    const [isLoading, setIsLoading] = useState(true);
    const [playlistData, setPlaylistData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`https://34ae-39-124-165-135.ngrok-free.app/api/playlist`, {
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

    const openPlayListDetail = (playlistId) => {
        navigate(`/playlistDetail/${playlistId}`);
    }

    return (
        <div>
            <PC>
                <div className='row'>
                    {isLoading ? <Loading /> : null}
                    {playlistData ? (
                        playlistData.slice().reverse().map((playlist) => (
                            <div className='col-md-3' key={playlist.id} style={{ cursor: 'pointer' }} onClick={() => openPlayListDetail(playlist.id)}>
                                <div className='card mb-2' style={{ backgroundColor: "#242424", color: "white" }}>
                                    <div className='card-body'>
                                        <div>
                                            <img className='img-fluid rounded-start mb-3' style={{ width: '150px', height: '150px', cursor: 'pointer' }} src={playlist.imageFileUrl} alt={playlist.title} />
                                        </div>
                                        <p className='mb-0'><b>{playlist.title}</b></p>
                                        <p className='mb-0' style={{ fontSize: '12px', color: 'gray' }}>{`${playlist.musicInfoList.length} 곡`}</p>
                                        <p style={{ fontSize: '12px', color: 'gray' }}>Like : {playlist.feedLike}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>플레이리스트가 없습니다.</p>
                    )
                    }
                </div>
            </PC>
            <Mobile>
                <div className='row'>
                    {isLoading ? <Loading /> : null}
                    {playlistData ? (
                        playlistData.slice().reverse().map((playlist) => (
                            <div className='col-4' key={playlist.id} style={{ cursor: 'pointer' }} onClick={() => openPlayListDetail(playlist.id)}>
                                <div className='card mb-2' style={{ backgroundColor: "#f3f3f3" }}>
                                    <div className='card-body'>
                                        <div>
                                            <img className='img-fluid rounded-start mb-3' style={{ width: '110px', height: '110px', cursor: 'pointer' }} src={playlist.imageFileUrl} alt={playlist.title} />
                                        </div>
                                        <p className='mb-0'><b>{playlist.title}</b></p>
                                        <p className='mb-0' style={{ fontSize: '12px', color: 'gray' }}>{`${playlist.musicInfoList.length} 곡`}</p>
                                        <p style={{ fontSize: '12px', color: 'gray' }}>Like : {playlist.feedLike}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>플레이리스트가 없습니다.</p>
                    )
                    }
                </div>
            </Mobile>
        </div>


    );
}

export default ProfilePlayList;