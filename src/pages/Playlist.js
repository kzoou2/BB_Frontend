import React, { useRef, useState } from 'react';
import '../style/css/MusicPlayer.css';
import ReactPlayer from 'react-player/lazy'
import { FaPlay, FaPause } from "react-icons/fa6";
import Navbar from './navbar';
import { PC, Mobile } from '../components/Responsive';
import sampleResult from '../data/youtube_result.json';

function Playlist() {
    const [isPlaying, setIsPlaying] = useState(false);
    // 유튜브 영상 url : https://www.youtube.com/watch?v={videoId}
    // 유튜브 썸네일 이미지 url : https://i.ytimg.com/vi/{videoId}/hqdefault.jpgß
    const videoIdList = sampleResult.items.map(item => `https://www.youtube.com/watch?v=` + item.id.videoId);
    const [isVolume, setIsVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useState(""); // 현재 재생 중인 동영상의 제목

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
                    <div className='col-md-9'>
                        <h1 className='mt-3'>Playlist Title</h1>
                        <h5 className='mt-3' dangerouslySetInnerHTML={{ __html: currentVideoTitle }} />
                        <div className='d-flex justify-content-center mt-3'>
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
                        <div className='d-flex justify-content-center mt-5'>
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
                        </div>
                        <div className='' style={{ width: "95%", maxHeight: "580px", overflow: "scroll" }}>
                            {sampleResult.items.map((data, index) => (
                                <div key={index}
                                    onClick={() => handleTitleClick(index)} // 클릭 이벤트 추가
                                    style={{ cursor: 'pointer' }} // 클릭 가능한 요소로 변경
                                >
                                    <div className='border-bottom mb-1 d-flex' style={{ height: "70px", alignItems: "center"}}>
                                        <img className='float-start' src={data.snippet.thumbnails.high.url} alt={`Thumbnail ${index}`} style={{ width: "80px", height: "60px" }} />
                                        <p className='align-middle ms-3 mt-2' dangerouslySetInnerHTML={{ __html: data.snippet.title }} />
                                        {/* 추가적으로 필요한 정보를 여기에 표시할 수 있습니다. */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>

            </Mobile>
        </div>
    );
}

export default Playlist;