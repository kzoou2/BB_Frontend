import React, { useRef, useState } from 'react';
import Navbar from './navbar';
import { PC, Mobile } from '../components/Responsive';
import ReactPlayer from 'react-player/lazy'
import { SiHeadspace } from 'react-icons/si';
import { FaEdit } from 'react-icons/fa';
import { FaPlay, FaPause } from "react-icons/fa6";
import sampleResult from '../data/youtube_result.json';

function PlayListDetail() {
    const [postCount, setPostCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useState(""); // 현재 재생 중인 동영상의 제목
    const [isVolume, setIsVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const videoIdList = sampleResult.items.map(item => `https://www.youtube.com/watch?v=` + item.id.videoId);

    const handleTitleClick = (index) => {
        setIsPlaying(true);
        setCurrentVideoIndex(index);
        setCurrentVideoTitle(sampleResult.items[index].snippet.title);
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // 만약 재생 중이지 않다면 첫 번째 동영상을 재생
        if (!isPlaying && currentVideoIndex === null) {
            setCurrentVideoIndex(0);
            setCurrentVideoTitle(sampleResult.items[0].snippet.title);
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
                    <div className='col-md-8'>
                        <div className='user-container d-flex align-items-center mb-3'>
                            <div className=' col-md-2 offset-md-1 user-img mt-5 '>
                                <SiHeadspace className='' size='130' color='lightgray' />
                            </div>
                            <div className=' col-md-6 user-info ml-auto ' style={{ marginLeft: '100px' }}>
                                <div className="d-flex align-items-center">
                                    <p style={{ fontSize: '20px', marginRight: '50px' }}> <b> User Nickname </b> </p>
                                    <button className='btn btn-outline-primary'> <FaEdit /> 프로필 편집 </button>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginLeft: 'auto', marginTop: '10px' }} >
                                    <span className='me-4'> 게시글 {postCount}</span>
                                    <span className='me-4'> 팔로우 100 </span>
                                    <span> 팔로워 100 </span>
                                </div>
                            </div>
                        </div>

                        <div className='highlight' style={{ display: 'flex', marginLeft: '8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='lightgray' />
                            <SiHeadspace className='' size='60' color='lightgray' />
                        </div>

                        <hr />
                        <div>
                            <p>playlist image</p>
                            <p>playlist title</p>
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
                                        sound // sound prop을 true로 설정
                                        volume={isVolume}
                                        controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                                        playing={isPlaying} // playing prop을 통해 비디오의 재생 여부를 제어
                                        onProgress={handleProgress}
                                    />
                                )}
                                {/* <p dangerouslySetInnerHTML={{ __html: currentVideoTitle }} /> */}
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
                            {sampleResult.items.map((data, index) => (
                                <div key={index}
                                    onClick={() => handleTitleClick(index)} // 클릭 이벤트 추가
                                    style={{ cursor: 'pointer' }} // 클릭 가능한 요소로 변경
                                >
                                    {/* <img src={data.snippet.thumbnails.high.url} alt={`Thumbnail ${index}`} /> */}
                                    <p className='text-start border-bottom mb-1' dangerouslySetInnerHTML={{ __html: data.snippet.title }} />
                                    {/* 추가적으로 필요한 정보를 여기에 표시할 수 있습니다. */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-8'>
                        <div className='user-container d-flex align-items-center mb-3'>
                            <div className='col-md-2 user-img mt-5'>
                                <SiHeadspace className='' size='90' color='lightgray' />
                            </div>
                            <div className='user-info' style={{ marginLeft: '100px' }}>
                                <div className="d-flex align-items-center">
                                    <p style={{ fontSize: '20px', marginRight: '20px' }}> <b> User Nickname </b> </p>
                                    <button className='btn btn-outline-primary'> <FaEdit /> 프로필 편집 </button>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginTop: '10px' }} >
                                    <span style={{ marginRight: '24px' }}> 게시글{postCount}</span>
                                    <span style={{ marginRight: '24px' }} > 팔로우100 </span>
                                    <sapn> 팔로워100 </sapn>
                                </div>
                            </div>
                        </div>

                        <div className='highlight' style={{ display: 'flex', marginLeft: '8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='lightgray' />
                            <SiHeadspace className='' size='60' color='lightgray' />
                        </div>

                        <hr />
                        <div>
                            <p>playlist image</p>
                            <p>playlist title</p>
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
                                        sound // sound prop을 true로 설정
                                        volume={isVolume}
                                        controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                                        playing={isPlaying} // playing prop을 통해 비디오의 재생 여부를 제어
                                        onProgress={handleProgress}
                                    />
                                )}
                                {/* <p dangerouslySetInnerHTML={{ __html: currentVideoTitle }} /> */}
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
                            {sampleResult.items.map((data, index) => (
                                <div key={index}
                                    onClick={() => handleTitleClick(index)} // 클릭 이벤트 추가
                                    style={{ cursor: 'pointer' }} // 클릭 가능한 요소로 변경
                                >
                                    {/* <img src={data.snippet.thumbnails.high.url} alt={`Thumbnail ${index}`} /> */}
                                    <p className='text-start border-bottom mb-1' dangerouslySetInnerHTML={{ __html: data.snippet.title }} />
                                    {/* 추가적으로 필요한 정보를 여기에 표시할 수 있습니다. */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default PlayListDetail;