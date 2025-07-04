import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from "../components/Responsive";
import '../style/css/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import MiniPlayer from '../components/Player/MiniPlayer';
import Feed from './Feed';
import { postChkAtom } from '../state/PostAtom';
import { useRecoilValue } from 'recoil';

function Home() {
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const postChk = useRecoilValue(postChkAtom);

    // if (postChk) { // Post, Feed 작성 시 새로고침하기 위한 변수
    //     window.location.reload();
    // }

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
                <div className='row' >
                    <div className='col-md-2'>
                        <Navbar />
                    </div>
                    <div className='col-md-8'>
                        <div className='mt-4' style={{ maxHeight: '96vh', overflowY: 'auto' }}>
                            {feedData.map((music) => (
                                <Feed feedData={music} />
                            ))}
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <MiniPlayer />
                    </div>
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