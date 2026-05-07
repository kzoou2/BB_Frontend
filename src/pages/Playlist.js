import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from "../components/Responsive";
import '../style/css/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import '../style/css/PlayList.css';
import PlaylistCard from '../components/Common/PlaylistCard';


function Playlist() {
    const navigate = useNavigate();
    const [playlistData, setPlaylistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState('latest');

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`http://localhost:8080/api/playlist`, {
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

    const handleTabChange = (type) => {
        setSortType(type);  // 탭 변경 시 해당 탭으로 정렬 상태 변경
    };

    // 데이터 정렬
    const sortedData = () => {
        if (sortType === 'popular') {
            return [...playlistData].sort((a, b) => b.plLike - a.plLike); 
        } else if (sortType === 'most_songs') {
            return [...playlistData].sort((a, b) => b.musicInfoList.length - a.musicInfoList.length); 
        }
        return playlistData;  
    };

    const openPlaylistDetail = (playlist) => {
        navigate(`/playlistDetail/${playlist.nickName}/${playlist.id}`);
    }

    return (
        <div>
            <PC>
                <div className='mt-5' >
                    <div className='tabs-container'>
                        <div className='tabs'>
                            <input type="radio" id="latest" name="playlist_sort" defaultChecked className="tabs" onClick={()=>handleTabChange('latest')}/>
                            <label htmlFor="latest" className="tab">최신순</label>

                            <input type="radio" id="popular" name="playlist_sort" className="tabs" onClick={()=>handleTabChange('popular')}/>
                            <label htmlFor="popular" className="tab">인기순</label>

                            <input type="radio" id="most_songs" name="playlist_sort" className="tabs" onClick={()=>handleTabChange('most_songs')}/>
                            <label htmlFor="most_songs" className="tab">곡 많은</label>
                            <span class="glider"></span>
                        </div>
                    </div>

                    {isLoading ? <Loading /> : null}
                    <div className='row ms-4 me-4'>
                        {sortedData().map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist} onClick={openPlaylistDetail}/>
                        ))}
                    </div>
                </div>



            </PC>

            <Mobile>
                <Navbar />
                <h2 className='text-start ms-3 mt-3 mb-3'>BeatBuddy</h2>
                <div className='row ms-2 me-2'>
                    {isLoading ? <Loading /> : null}
                    {playlistData.slice().reverse().map((playlist) => (
                        <div className='col-4' key={playlist.id}>
                            <div className="card mb-2" style={{ height: "auto", backgroundColor: "#f2f2f2" }}>
                                <div className="card-body">
                                    <img style={{ width: "80%", height: "80%" }} src={playlist.imageFileUrl} alt={playlist.title}></img>
                                    <p className='mt-2'><b>{playlist.title}</b></p>
                                    <p className='mt-0'>{`${playlist.musicInfoList.length} 곡`}</p>
                                
                                    <p>{playlist.content}<span style={{ color: "grey", cursor: "pointer" }} onClick={() => openPlaylistDetail(playlist)}>더보기</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Mobile>
        </div>
    );
}

export default Playlist;