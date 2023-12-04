import React from 'react';
import '../css/MusicPlayer.css';
import H5AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player/lazy'

function MusicPlayerTest() {
    return (
        <div>
            <h1>Music Player Test</h1>
            <div className='d-flex justify-content-center mt-5'>
                <audio
                    // src='https://p.scdn.co/mp3-preview/8064eef0f1170380720c7c124eabf2d06b3f2170'
                    src='https://www.youtube.com/watch?v=oUFJJNQGwhk'
                    controls={true}
                    autoPlay={false}
                />
            </div>
            <div className='d-flex justify-content-center mt-5'>
                {/* <h1 className='d-flex justify-content-center'>React H5 Audio Player Example</h1> */}
                <div className='justify-content-center'>
                    {/* <H5AudioPlayer
                        // autoPlay
                        src='https://p.scdn.co/mp3-preview/8064eef0f1170380720c7c124eabf2d06b3f2170' // 실제 오디오 파일 경로로 변경해주세요
                        onPlay={(e) => console.log('onPlay')}
                        onPause={(e) => console.log('onPause')}
                        onEnded={(e) => console.log('onEnded')}
                    /> */}
                </div>
                <div>
                    {/* <ReactPlayer
                        url={[
                            'https://www.youtube.com/watch?v=oUFJJNQGwhk',
                            'https://www.youtube.com/watch?v=jNgP6d9HraI'
                        ]}
                    /> */}
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=pSUydWEqKwE"
                        muted
                        controls
                        // playing={isPlaying}
                        width={"1000px"}
                        height={"500px"}
                        // className={styles.player}
                    />
                </div>
            </div>
        </div>
    );
}

export default MusicPlayerTest;