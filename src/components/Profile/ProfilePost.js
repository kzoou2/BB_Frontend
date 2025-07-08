import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PC, Mobile } from '../Responsive';
import FeedDetail from '../Modal/Feed/FeedDetail';
import axios from 'axios';
import Loading from '../Loading';
import PostCard from '../Common/PostCard';

function ProfilePost({ postCount }) {
    const { nickName } = useParams();
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

        axios.get(`http://localhost:8080/api/feeds/user/${nickName}`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                const temp = response.data;
                setFeedData(temp);
                postCount(temp.length);
                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [nickName, postCount])
    

    return (
        <div>
            <PC>
                <div className='profile-container' style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px"}}>
                    <div className='row' >
                        {isLoading ? <Loading /> : null}
                        {feedData && feedData.length > 0 ? (
                            feedData.slice().reverse().map((music) => (
                                <PostCard key={music.id} music={music} onClick={openFeedDetail} postListLength={feedData.length}/>
                                
                            ))
                        ) : (
                            <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>게시물이 아직 없어요.</p>
                        )}
                    </div>
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
                                <div className='col-md-3' >
                                    <div className='Post-card mb-2' >
                                        <div className="Post-img">
                                            {music.feedImgSrc !== null ? (
                                                    <img className='mb-3' style={{ width: '150px', height: 'auto' }} src={music.feedImgSrc}
                                                    alt={`Album cover for ${music.musicInfoList[0].musicTitle}`} />
                                                ):(
                                                    <img className='mb-3' style={{ width: '150px', height: 'auto' }} src={music.musicInfoList[0].albumUrl}
                                                    alt={`Album cover for ${music.musicInfoList[0].musicTitle}`} />
                                                )}
                                        </div>
                                        <div className='Post-content'>
                                            <span className="Post-title">{music.musicInfoList[0].musicTitle}</span>
                                            <span className="Post-Artist">{music.musicInfoList[0].musicArtist} </span>

                                            <p className='Post-albumName' style={{ fontSize: '12px', color: 'gray' }}>{music.musicInfoList[0].albumName}</p>
                                            <p className="Post-date">{music.musicInfoList[0].releaseDate}</p>

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