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

        axios.get(`https://94ed-121-190-220-40.ngrok-free.app/api/playlist`, {
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
                            <div className='col-md-6 mb-4' key={playlist.id} style={{ cursor: 'pointer' }} onClick={() => openPlayListDetail(playlist.id)}>
                                <div className='card'>
                                    <div className='row g-0'>
                                        <div className='col-md-4'>
                                            <img className='img-fluid rounded-start' style={{ width: '150px', height: '150px', cursor: 'pointer' }} src={playlist.imageFileUrl} alt={playlist.title} >
                                            </img>
                                        </div>
                                        <div className='col-md-8'>
                                            <div className='card-body'>
                                                <div className='card-title'>
                                                    <h4>{playlist.title}</h4>
                                                    {playlist.tagName.map((tag, index) => (
                                                        <p className='btn btn-outline-primary btn-sm me-2 rounded-pill disabled' key={index}>#{tag}</p>
                                                    ))}
                                                    <p>Like : {playlist.feedLike}</p>
                                                </div>
                                            </div>

                                        </div>
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
                            <div className='col-6 mb-2' key={playlist.id} style={{ cursor: 'pointer' }} onClick={() => openPlayListDetail(playlist.id)}>
                                <div className='card'>
                                    <div className='row g-0'>
                                        <div className='col-4'>
                                            <img className='img-fluid rounded-start' style={{ width: '110px', height: '110px', cursor: 'pointer' }} src={playlist.imageFileUrl} alt={playlist.title} >
                                            </img>
                                        </div>
                                        <div className='col-8'>
                                            <div className='card-body'>
                                                <div className='card-title'>
                                                    <h4>{playlist.title}</h4>
                                                    {playlist.tagName.map((tag, index) => (
                                                        <p className='btn btn-outline-primary btn-sm me-2 rounded-pill disabled' key={index}>#{tag}</p>
                                                    ))}
                                                    <p>Like : {playlist.feedLike}</p>
                                                </div>
                                            </div>

                                        </div>
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