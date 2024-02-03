import React, { useEffect, useRef } from 'react';
import '../../style/css/MiniPlayer.css';
import ReactPlayer from 'react-player/lazy'
import { FaPlay, FaPause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentVideoIndexAtom, currentVideoTitleAtom, playStateAtom, videoIdListAtom, videoPlaylistAtom, videoProgressAtom, videoVolumeAtom } from '../../state/MusicPlayerAtom';

// FIXME: 페이지 이동 시 노래 끊기는 이슈 있음
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
        setVideoProgress(videoProgress);
        setVideoVolume(videoVolume);
        setCurrentVideoIndex(currentVideoIndex);
        setCurrentVideoTitle(currentVideoTitle);
    }, [videoProgress, setVideoProgress, videoVolume, setVideoVolume, currentVideoIndex, setCurrentVideoIndex, currentVideoTitle, setCurrentVideoTitle]);

    useEffect(() => {
        // 페이지 이동 시 ReactPlayer의 progress prop을 통해 played 값을 설정
        if (playerRef.current) {
            playerRef.current.seekTo(videoProgress / 100, 'fraction');
        }
    }, []);

    const handlePlayPause = () => {
        setPlayState(!playState);

        // 만약 재생 중이지 않다면 첫 번째 동영상을 재생
        if (!playState && currentVideoIndex === null) {
            setCurrentVideoIndex(0);
            setCurrentVideoTitle(videoPlayList[0].musicTitle);
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

    const playSelectedMusic = (index) => {
        // 현재 재생 중이라면 바로 다른 노래로 전환
        if (playState) {
            setCurrentVideoIndex(index);
            setCurrentVideoTitle(videoPlayList[index].musicTitle);
        } else {
            // 재생 중이 아니라면 재생 상태를 true로 설정하고 선택한 노래 재생
            setPlayState(true);
            setCurrentVideoIndex(index);
            setCurrentVideoTitle(videoPlayList[index].musicTitle);
        }
    }

    const playNextVideo = (videoIdList, currentVideoIndex) => {
        if (currentVideoIndex === videoIdList.length - 1) {
            setCurrentVideoIndex(0);
            setCurrentVideoTitle(videoPlayList[0].musicTitle);
        } else {
            setCurrentVideoIndex(currentVideoIndex + 1);
            setCurrentVideoTitle(videoPlayList[currentVideoIndex + 1].musicTitle);
        }
    }

    const playNextMusic = () => {
        if (currentVideoIndex !== null) {
            const nextIndex = (currentVideoIndex + 1) % videoIdList.length;
            setCurrentVideoIndex(nextIndex);
            setCurrentVideoTitle(videoPlayList[nextIndex].musicTitle);
        }
    }

    const playPreviousMusic = () => {
        if (currentVideoIndex !== null) {
            const previousIndex = (currentVideoIndex - 1 + videoIdList.length) % videoIdList.length;
            setCurrentVideoIndex(previousIndex);
            setCurrentVideoTitle(videoPlayList[previousIndex].musicTitle);
        }
    }

    return (
        <div className='rounded-5' style={{ height: "96vh", margin: "10px", backgroundColor: "#121212" }}>
            <div>
                <div>
                    <p style={{ height: "10px"}}></p>
                    <h5 className='mt-3' style={{ color: "#27A8FC" }}dangerouslySetInnerHTML={{ __html: currentVideoTitle }} />
                </div>
                <div className='ms-4 mt-4'>
                    <button onClick={playPreviousMusic} className='me-3' disabled={currentVideoIndex === 0}>
                        <TbPlayerTrackPrevFilled size="20" color='white' />
                    </button>
                    <button onClick={handlePlayPause} className='me-3'>
                        {playState ? <FaPause size="20" color='white' /> : <FaPlay size="20" color='white' />} {/* 버튼 클릭으로 재생/일시정지를 토글합니다. */}
                    </button>
                    <button onClick={playNextMusic} className='me-3' disabled={currentVideoIndex === videoIdList.length - 1}>
                        <TbPlayerTrackNextFilled size="20" color='white' />
                    </button>
                </div>
                <div className='mt-3 d-flex flex-column align-items-center'>
                    <div>
                        <progress
                            className='custom-progress mt-2'
                            value={videoProgress}
                            max='100'
                            onClick={handleProgressBarClick}
                            style={{ cursor: 'pointer', width: '160px' }}
                        ></progress>
                    </div>
                    <div>
                        <input
                            type="range"
                            className='custom-range mt-1'
                            min="0"
                            max="1"
                            step="0.01"
                            value={videoVolume}
                            onChange={handleVolume}
                            style={{ width: "160px" }}
                        />
                    </div>
                </div>
            </div>
            <div className='ms-3 mt-3'>
                {videoPlayList.map((music, index) => (
                    <p key={index} className='text-start' style={{ cursor: 'pointer' }} onClick={() => playSelectedMusic(index)}>{music.musicTitle} </p>
                ))}
            </div>

            {currentVideoIndex !== null && (
                <ReactPlayer
                    ref={playerRef}
                    url={videoIdList[currentVideoIndex]}
                    width="0px"
                    height="0px"
                    sound // sound prop을 true로 설정
                    volume={videoVolume}
                    controls={false} // 기본 컨트롤러를 숨기고 직접 컨트롤할 것임
                    playing={playState} // playing prop을 통해 비디오의 재생 여부를 제어
                    onProgress={handleProgress}
                    onEnded={() => { playNextVideo(videoIdList, currentVideoIndex) }}
                    config={{ file: { forceAudio: true } }}
                // onSeek={videoProgress}
                />
            )}
        </div>
    );
}

export default MiniPlayer;