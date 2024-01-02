import React, { useEffect, useRef } from 'react';
import '../../style/css/MusicPlayer.css';
import ReactPlayer from 'react-player/lazy'
import { FaPlay, FaPause } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentVideoIndexAtom, currentVideoTitleAtom, playStateAtom, videoIdListAtom, videoPlaylistAtom, videoProgressAtom, videoVolumeAtom } from '../../state/MusicPlayerAtom';

function MiniPlayer() {
    const playerRef = useRef(null);
    const [playState, setPlayState] = useRecoilState(playStateAtom);
    const [videoVolume, setVideoVolume] = useRecoilState(videoVolumeAtom);
    const [videoProgress, setVideoProgress] = useRecoilState(videoProgressAtom);
    const [currentVideoIndex, setCurrentVideoIndex] = useRecoilState(currentVideoIndexAtom); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useRecoilState(currentVideoTitleAtom); // 현재 재생 중인 동영상의 제목
    
    const videoIdList = useRecoilValue(videoIdListAtom);
    const videoPlayList = useRecoilValue(videoPlaylistAtom);

    useEffect(() => {
        console.log(videoIdList)
        console.log(videoPlayList)
    })

    const handlePlayPause = () => {
        setPlayState(!playState);

        // 만약 재생 중이지 않다면 첫 번째 동영상을 재생
        if (!playState && currentVideoIndex === null) {
            alert("플레이리스트에 노래가 없습니다.")
        }
    };

    const handleVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVideoVolume(newVolume);
    };

    const handleProgress = ({ played }) => {
        setVideoProgress(played * 100);
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
        <>
            <div>
                <p className='mt-3' dangerouslySetInnerHTML={{ __html: currentVideoTitle }} />
            </div>
            <div>
                <button onClick={handlePlayPause} className='me-3'>
                    {playState ? <FaPause size="20" /> : <FaPlay size="20" />} {/* 버튼 클릭으로 재생/일시정지를 토글합니다. */}
                </button>
            </div>
            <div>
                <progress
                    className='me-3 mt-2'
                    value={videoProgress}
                    max='100'
                    onClick={handleProgressBarClick}
                    style={{ cursor: 'pointer', width: '160px' }}
                ></progress>
            </div>
            <div>
                <input
                    type="range"
                    className='form-range mt-1'
                    min="0"
                    max="1"
                    step="0.01"
                    value={videoVolume}
                    onChange={handleVolume}
                    style={{ width: "100px" }}
                />
            </div>
            {videoPlayList.map((music) => (
                <p className='text-start'>{music.musicTitle}</p>
            ))}

            {currentVideoIndex !== null && (
                <ReactPlayer
                    ref={playerRef}
                    // url={videoIdList}
                    url={videoIdList[currentVideoIndex]} // 현재 재생 중인 동영상만을 전달
                    width="0px"
                    height="0px"
                    sound // sound prop을 true로 설정
                    volume={videoVolume}
                    controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                    playing={playState} // playing prop을 통해 비디오의 재생 여부를 제어
                    onProgress={handleProgress}
                />
            )}
        </>
    );
}

export default MiniPlayer;