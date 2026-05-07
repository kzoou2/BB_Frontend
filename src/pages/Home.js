import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from "../components/Responsive";
import '../style/css/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import Feed from './Feed';
import { postChkAtom } from '../state/PostAtom';
import { useRecoilValue } from 'recoil';
import { SoftButton } from '../style/styled_components/Button_Style';

function Home() {
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const postChk = useRecoilValue(postChkAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`http://localhost:8080/api/feeds/followings`, {
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
                {isLoading ? <Loading /> : null}
                <div className='mt-4' >
                    {feedData && feedData.length > 0 ? (
                        feedData.map((music) => (
                            <Feed key={music.id} feedData={music} />
                        ))
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                            <div style={{ fontSize: '28px', fontWeight: '600', color: 'white' }}>피드가 비어있어요</div>
                            <p style={{ fontSize: '14px', color: '#888', marginTop: '5px' }}>인기 플레이리스트를 둘러보고<br />팔로우를 통해 나만의 피드를 만들어보세요</p>
                            <SoftButton onClick={() => navigate('/playlist')}>🔥 인기 플레이리스트 보기</SoftButton>
                        </div>
                    )}
                </div>

            </PC>

            <Mobile>
                <Navbar />
                <h2 className='text-start ms-3 mt-3 mb-3'>BeatBuddy</h2>
                {isLoading ? <Loading /> : null}
                    {feedData.map((music) => (
                        <Feed feedData={music} />
                    ))}
            </Mobile>
        </div>
    );
}

export default Home;