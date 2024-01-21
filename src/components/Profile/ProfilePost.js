import React, { useEffect, useState } from 'react';
import { PC, Mobile } from '../Responsive';
import FeedDetail from '../Modal/Feed/FeedDetail';
import axios from 'axios';
import Loading from '../Loading';

function ProfilePost() {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const openFeedDetail = (music) => {
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`https://34ae-39-124-165-135.ngrok-free.app/api/feeds`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                console.log("서버에서 받아온 결과", response.data);
                const temp = response.data;
                setFeedData(temp);
                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [])

    return (
        <div>
            <PC>
                <div className='row'>
                    {isLoading ? <Loading /> : null}
                    {feedData ? (
                        feedData.slice().reverse().map((music) => (
                            <div className='col-md-3' key={music.id} onClick={() => openFeedDetail(music)} style={{ cursor: 'pointer' }}>
                                <div className='card mb-2' style={{ backgroundColor: "#242424", color: "white"}}>
                                    <div className='card-body'>
                                        <div>
                                            <img className='mb-3' style={{ width: '150px', height: 'auto' }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl}
                                                alt={`Album cover for ${music.musicInfoList[0].musicTitle}`} />
                                        </div>
                                        <p className='mb-0'><b>{music.musicInfoList[0].musicTitle}</b></p>
                                        <b>{music.musicInfoList[0].musicArtist}</b>
                                        <div className='mt-2 mb-0'>
                                            <p className='mt-0 mb-0' style={{ fontSize: '12px', color: 'gray' }}>{music.musicInfoList[0].albumName}</p>
                                            <p style={{ fontSize: '12px', color: 'gray' }}>{music.musicInfoList[0].releaseDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>게시글이 없습니다.</p>
                    )}
                </div>

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </PC>

            <Mobile>
                <div className='row'>
                    {isLoading ? <Loading /> : null}
                    {feedData ? (
                        feedData.slice().reverse().map((music) => (
                            <div className='col-4' key={music.id} onClick={() => openFeedDetail(music)} style={{ cursor: 'pointer' }}>
                                <div className='card mb-2' style={{ backgroundColor: "#f3f3f3" }}>
                                    <div className='card-body'>
                                        <div>
                                            <img className='mb-3' style={{ width: '110px', height: 'auto' }} src={music.imageFileUrl || music.musicInfoList[0].albumUrl}
                                                alt={`Album cover for ${music.musicInfoList[0].musicTitle}`} />
                                        </div>
                                        <p className='mb-0'><b>{music.musicInfoList[0].musicTitle}</b></p>
                                        <b>{music.musicInfoList[0].musicArtist}</b>
                                        <div className='mt-2 mb-0'>
                                            <p className='mt-0 mb-0' style={{ fontSize: '12px', color: 'gray' }}>{music.musicInfoList[0].albumName}</p>
                                            <p style={{ fontSize: '12px', color: 'gray' }}>{music.musicInfoList[0].releaseDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>게시글이 없습니다.</p>
                    )}
                </div>

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </Mobile>
        </div>
    );
}

export default ProfilePost;