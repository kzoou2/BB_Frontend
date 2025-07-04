import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {PC,Mobile} from '../Responsive';
import axios from 'axios';
import Loading from '../Loading';
import FeedDetail from '../Modal/Feed/FeedDetail';
import PostCard from '../Common/PostCard';
import "../../style/css/PostCard.css";

function ProfileSaved({userNickname}){

    const [isLoading, setIsLoading]= useState(true);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [feedData, setFeedData] = useState([]);

    const openFeedDetail = (music) =>{
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    };

    useEffect(()=>{
        const bookmarkedFeeds = async ()=> {
            setIsLoading(true);
            try{
                const res = await axios.get(`http://localhost:8080/api/feeds/bookmarked`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
                    },
                });
                setFeedData(res.data);
            } catch(error) {
                console.error('API 요청 중 오류 발생:', error)
            } finally {
                setIsLoading(false);
            }
        }
        bookmarkedFeeds();    
    },[])

    return(
        <div>
            <PC>
                <div className='row'>
                    {isLoading ? <Loading /> : null}
                    {feedData ? (
                        feedData.slice().reverse().map((music) => (
                            <PostCard key={music.id} music={music} onClick={openFeedDetail} />
                            
                        ))
                    ) : (
                        <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }} >아직 저장한 포스트가 없어요.</p>
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
                <p>savved!</p>
            </Mobile>
        </div>

    );
}

export default ProfileSaved;