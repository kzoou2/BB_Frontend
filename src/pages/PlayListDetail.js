import React, { useEffect, useRef, useState } from 'react';
import Navbar from './navbar';
import { PC, Mobile } from '../components/Responsive';
import ReactPlayer from 'react-player/lazy'
import { SiHeadspace } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';
import { FaPlay, FaPause } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

function PlayListDetail() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [playlistData, setPlaylistData] = useState([]);
    const [musicInfoList, setMusicInfoList] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useState(""); // 현재 재생 중인 동영상의 제목
    const [isVolume, setIsVolume] = useState(0.5);
    const [progress, setProgress] = useState(0.01);
    const playerRef = useRef(null);
    const { playlistId } = useParams([]);
    const [videoIdList, setVideoIdList] = useState();
    const token = process.env.REACT_APP_LOGIN_KEY;

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기

        axios.get(`https://94ed-121-190-220-40.ngrok-free.app/api/playlist/my/${playlistId}`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                console.log("서버에서 받아온 결과", response.data);
                const temp1 = response.data;
                setPlaylistData(temp1);

                const temp2 = response.data.musicInfoList;
                setMusicInfoList(temp2);

                const temp3 = response.data.musicInfoList.map(item => `https://www.youtube.com/watch?v=` + item.videoId);
                setVideoIdList(temp3);

                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [])

    const handleTitleClick = (index) => {
        setIsPlaying(true);
        setCurrentVideoIndex(index);
        setCurrentVideoTitle(musicInfoList[index].musicTitle);
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // 만약 재생 중이지 않다면 첫 번째 동영상을 재생
        if (!isPlaying && currentVideoIndex === null) {
            setCurrentVideoIndex(0);
            setCurrentVideoTitle(musicInfoList[0].musicTitle);
        }
    };

    const handleVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setIsVolume(newVolume);
    };

    const handleProgress = ({ played }) => {
        setProgress(played * 100);
    };

    const handleProgressBarClick = (e) => {
        if (playerRef.current) {
            const progressBar = e.target;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const newPosition = clickPosition / progressBar.clientWidth;
            const newTime = newPosition * playerRef.current.getDuration();
            playerRef.current.seekTo(newTime);
        }
    };

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-9'>
                        <div className='text-start mt-3'>
                            <p>playlist image</p>
                            <h2>{playlistData.title}</h2>
                        </div>
                        <div className='d-flex justify-content-center mt-3 mb-3'>
                            <div className='d-flex justify-content-center'>
                                {currentVideoIndex !== null && (
                                    <ReactPlayer
                                        ref={playerRef}
                                        // url={videoIdList}
                                        url={videoIdList[currentVideoIndex]} // 현재 재생 중인 동영상만을 전달
                                        width="0px"
                                        height="0px"
                                        sound="true" // sound prop을 true로 설정
                                        volume={isVolume}
                                        controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                                        playing={isPlaying} // playing prop을 통해 비디오의 재생 여부를 제어
                                        onProgress={handleProgress}
                                    />
                                )}
                            </div>
                            <button onClick={handlePlayPause} className='me-3'>
                                {isPlaying ? <FaPause size="20" /> : <FaPlay size="20" />} {/* 버튼 클릭으로 재생/일시정지를 토글합니다. */}
                            </button>
                            <progress
                                className='me-3 mt-2'
                                value={progress}
                                max='100'
                                onClick={handleProgressBarClick}
                                style={{ cursor: 'pointer', width: '300px' }}
                            ></progress>
                            <input
                                type="range"
                                className='form-range mt-1'
                                min="0"
                                max="1"
                                step="0.01"
                                value={isVolume}
                                onChange={handleVolume}
                                style={{ width: "100px" }}
                            />
                        </div>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">제목</th>
                                        <th scope="col"></th>
                                        <th scope="col">가수</th>
                                        <th scope="col">앨범</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? <tr><td><Loading /></td></tr> : null}
                                    {musicInfoList.map((music, index) => (
                                        <tr key={index}
                                            onClick={() => handleTitleClick(index)} // 클릭 이벤트 추가
                                            style={{ cursor: 'pointer' }} // 클릭 가능한 요소로 변경
                                        >
                                            <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={music.albumUrl}
                                                    alt="앨범 이미지"
                                                    style={{ verticalAlign: "middle", maxWidth: '50px', maxHeight: '50px' }}
                                                />
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicTitle }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicArtist }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.albumName }}></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-9'>
                        <div>
                            <p>playlist image</p>
                            <h2>playlist title</h2>
                        </div>
                        <div className='d-flex justify-content-center mt-3 mb-3'>
                            <div className='d-flex justify-content-center'>
                                {currentVideoIndex !== null && (
                                    <ReactPlayer
                                        ref={playerRef}
                                        // url={videoIdList}
                                        url={videoIdList[currentVideoIndex]} // 현재 재생 중인 동영상만을 전달
                                        width="0px"
                                        height="0px"
                                        sound="true" // sound prop을 true로 설정
                                        volume={isVolume}
                                        controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                                        playing={isPlaying} // playing prop을 통해 비디오의 재생 여부를 제어
                                        onProgress={handleProgress}
                                    />
                                )}
                            </div>
                            <button onClick={handlePlayPause} className='me-3'>
                                {isPlaying ? <FaPause size="20" /> : <FaPlay size="20" />} {/* 버튼 클릭으로 재생/일시정지를 토글합니다. */}
                            </button>
                            <progress
                                className='me-3 mt-2'
                                value={progress}
                                max='100'
                                onClick={handleProgressBarClick}
                                style={{ cursor: 'pointer', width: '300px' }}
                            ></progress>
                            <input
                                type="range"
                                className='form-range mt-1'
                                min="0"
                                max="1"
                                step="0.01"
                                value={isVolume}
                                onChange={handleVolume}
                                style={{ width: "100px" }}
                            />
                        </div>
                        <div className='ms-3 me-3'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">제목</th>
                                        <th scope="col"></th>
                                        <th scope="col">가수</th>
                                        <th scope="col">앨범</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? <tr><td><Loading /></td></tr> : null}
                                    {musicInfoList.map((music, index) => (
                                        <tr key={index}
                                            onClick={() => handleTitleClick(index)} // 클릭 이벤트 추가
                                            style={{ cursor: 'pointer' }} // 클릭 가능한 요소로 변경
                                        >
                                            <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={music.albumUrl}
                                                    alt="앨범 이미지"
                                                    style={{ verticalAlign: "middle", maxWidth: '50px', maxHeight: '50px' }}
                                                />
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicTitle }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicArtist }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.albumName }}></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default PlayListDetail;