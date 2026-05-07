import React, { useEffect, useState, useRef } from 'react';
import '../../style/css/MiniPlayer.css';
import ReactPlayer from 'react-player/lazy'
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentVideoIndexAtom, currentVideoTitleAtom, playStateAtom, videoIdListAtom, videoPlaylistAtom, videoProgressAtom, videoVolumeAtom } from '../../state/MusicPlayerAtom';
import { IoVolumeMedium } from "react-icons/io5";
import { FaRegCaretSquareUp, FaRegCaretSquareDown } from "react-icons/fa";


// FIXME: 페이지 이동 시 노래 끊기는 이슈 있음
function MiniPlayer() {
    const playerRef = useRef(null);
    const [playState, setPlayState] = useRecoilState(playStateAtom);
    const [videoVolume, setVideoVolume] = useRecoilState(videoVolumeAtom);
    const [videoProgress, setVideoProgress] = useRecoilState(videoProgressAtom);
    const [currentVideoIndex, setCurrentVideoIndex] = useRecoilState(currentVideoIndexAtom); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useRecoilState(currentVideoTitleAtom); // 현재 재생 중인 동영상의 제목
    const [isVolumeVisible, setIsVolumeVisible] = useState(false);  // 볼륨 슬라이더 상태
    const [isListOpen, setisListOpen] = useState(true);

    const videoIdList = useRecoilValue(videoIdListAtom);
    const videoPlayList = useRecoilValue(videoPlaylistAtom);

    const [videoDuration, setVideoDuration] = useState(0); // 곡의 총 길이
    const [currentTime, setCurrentTime] = useState(0); // 현재 진행 시간


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

    const handleProgress = ({ played, playedSeconds  }) => {
        setVideoProgress(played * 100);
        setCurrentTime(playedSeconds); // 진행 시간을 초 단위로 설정
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
    const toggleVolumeSlider = () => {
        setIsVolumeVisible(!isVolumeVisible);
    };

    const togglePlaylist =()=>{
        setisListOpen(!isListOpen);
    };

    const formatTime = (time) => {
        if (isNaN(time) || time < 0) return "00:00"; // 유효하지 않은 값이 들어오면 00:00으로 반환
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    const totalDuration = playerRef.current ? playerRef.current.getDuration() : 0;
    const currentProgressTime = videoProgress * totalDuration / 100;

    return (
        <div className='playlist-wrapper'>
            <div className='player-container'>
                {videoPlayList.length === 0 ? (
                    <div className='empty-playlist'>
                        <IoMusicalNotes className='empty-icon'/>
                        <p style={{fontSize: '13px'}}> 현재 재생목록이 비어있습니다.</p>
                    </div>
                ):(
                    <div className='player_info'>
                        <img className='player_album'src={videoPlayList[currentVideoIndex]?.albumUrl} alt="Album Cover" />
                        <h5 className='player_music mt-3' dangerouslySetInnerHTML={{ __html: currentVideoTitle }} />
                        <p className='player_artist mt-1' dangerouslySetInnerHTML={{ __html: videoPlayList[currentVideoIndex]?.musicArtist }} />
                    </div>
                )}

                <div className='player-controls'>
                    <button onClick={playPreviousMusic} disabled={currentVideoIndex === 0}> 
                        <TbPlayerTrackPrevFilled />
                    </button>

                    <button onClick={handlePlayPause}>
                        {playState ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={playNextMusic} disabled={currentVideoIndex === videoIdList.length - 1}>
                        <TbPlayerTrackNextFilled /> 
                    </button>
                </div>

                <div className='mt-1 flex-column'>
                    {videoPlayList.length !== 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px', color: '#b0b0b0' }}>
                            <span>{formatTime(currentProgressTime)}</span>
                            <span>{formatTime(totalDuration)}</span>
                        </div>
                    )}
                    <progress
                        className='custom-progress mt-2'
                        value={videoProgress}
                        max='100'
                        onClick={handleProgressBarClick}
                    ></progress>
                    


                    <div className='player-options'>
                        <div className={`player-volume-container ${isVolumeVisible ? 'show-volume-slider' : 'hide-volume-slider'}`}>
                            <IoVolumeMedium className='player-volume-icon' onClick={toggleVolumeSlider} />
                            <input
                                type="range"
                                className='player_volume mt-1'
                                min="0"
                                max="1"
                                step="0.01"
                                value={videoVolume}
                                onChange={handleVolume}
                            />
                        </div>
                        <button className='playlist-toggle' onClick={togglePlaylist}>
                            {isListOpen ? <FaRegCaretSquareUp /> : <FaRegCaretSquareDown />}
                        </button>
                    </div>
                </div>
            </div>
            

            <div className={`playlist-container ${isListOpen ? "open" : "closed"}`}>
                <div className='playlist'>
                    {videoPlayList.map((music, index) => (
                        <div 
                            key={index} 
                            className={`playlist-item ${index === currentVideoIndex ? "active" : ""}`} 
                            onClick={() => playSelectedMusic(index)}
                        >   
                            {index === currentVideoIndex && playState ? (
                                <div className="player_pfp">
                                    <div className="player_playing">
                                        <div className="player_line line-1"></div>
                                        <div className="player_line line-2"></div>
                                        <div className="player_line line-3"></div>
                                    </div>
                                </div>
                            ):(
                                <span className='music-number'>{index + 1} </span>
                            )}  
                            <div className='music-info'>
                                <span className="music-title">{music.musicTitle}</span> 
                                <span className="music-artist"> - {music.musicArtist}</span>
                            </div>
                        </div>

                    ))}
                </div>
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
                    onDuration={setVideoDuration}
                // onSeek={videoProgress}
                />
            )}
        </div>
    );
}

export default MiniPlayer;