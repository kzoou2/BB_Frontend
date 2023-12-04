import React from 'react';
import '../css/MusicPlayer.css';
import H5AudioPlayer from 'react-h5-audio-player';

function MusicPlayerTest() {
    return (
        <div>
            <h1>Music Player Test</h1>
            <div className='d-flex justify-content-center mt-5'>
                <div className="audio-player">
                    <div className="album-cover"></div>
                    <div className="player-controls">
                        <div className="song-info">
                            <div className="song-title">Song Title</div>
                            <p className="artist">Artist</p>
                        </div>
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>
                        <div className="buttons">
                            <button className="play-btn"><svg viewBox="0 0 16 16" className="bi bi-play-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }}> <path fill="white" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path> </svg></button>
                            <button className="pause-btn"><svg viewBox="0 0 16 16" className="bi bi-pause-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }}> <path fill="white" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path> </svg></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <audio
                    src='https://p.scdn.co/mp3-preview/8064eef0f1170380720c7c124eabf2d06b3f2170'
                    controls={true}
                    autoPlay={false} 
                />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <h1>React H5 Audio Player Example</h1>
                <H5AudioPlayer
                    // autoPlay
                    src='https://p.scdn.co/mp3-preview/8064eef0f1170380720c7c124eabf2d06b3f2170' // 실제 오디오 파일 경로로 변경해주세요
                    onPlay={(e) => console.log('onPlay')}
                    onPause={(e) => console.log('onPause')}
                    onEnded={(e) => console.log('onEnded')}
                />
            </div>
        </div>
    );
}

export default MusicPlayerTest;