import React, { useState } from 'react';
import Navbar from './navbar';
import { SiHeadspace } from "react-icons/si";
import { PC, Mobile } from "../components/Responsive";
import sample_music from '../data/sample_music.json';
import FeedDetail from '../components/Modal/Feed/FeedDetail'

function Home() {
    // const [title, setTitle] = useState("헤어지자 말해요");
    // const [artist, setArtist] = useState("박재정");
    // const [year, setYear] = useState(2023);
    // const [album, setAlbum] = useState("Alone");
    const [hashtagList, setHashtagList] = useState(["Tag1", "Tag2", "Tag3"]);
    const data = sample_music.slice(0, 20);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);
    const openFeedDetail = (music) => {
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-9'>
                        <div className='mt-5' style={{maxHeight: "700px", overflow: "scroll"}}>
                            {data.map((music) => (
                                <div className='d-flex justify-content-center mb-4' key={music.id}>
                                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                                        <div>
                                            <div className='d-flex justify-content-start mb-3'>
                                                <a href='/BB_Frontend/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                            </div>
                                            <div className='d-flex justify-content-end mb-3'>
                                                <p>버튼그룹</p>
                                            </div>
                                            <div className="">
                                                <img style={{ width: "70%", height: "70%" }} src={music.album_cover} alt={music.title}></img>
                                                <h5 className='mt-3'>{music.title} · {music.artist}</h5>
                                                <p>{music.album} · {music.release_year}</p>
                                                <p style={{ color: '#4887E5' }}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                                <p>이 노래 좋아요... <span style={{ color: "red", cursor: "pointer" }} onClick={() => openFeedDetail(music)}>더보기</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </PC>

            <Mobile>
                <Navbar />
                <h2 className='text-start ms-3 mt-3 mb-3'>BeatBuddy</h2>

                {data.map((music) => (
                    <div className='d-flex justify-content-center mb-4'>
                        <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                            <div>
                                <div className='d-flex justify-content-start ms-4 mb-3'>
                                    <a href='/BB_Frontend/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                </div>
                                <div className='d-flex justify-content-end me-4 mb-3'>
                                    <p>버튼그룹</p>
                                </div>
                                <div className="">
                                    <img style={{ width: "80%", height: "80%" }} src={music.album_cover} alt={music.title}></img>
                                    <h5 className='mt-3'>{music.title} · {music.artist}</h5>
                                    <p>{music.album} · {music.release_year}</p>
                                    <p style={{ color: '#4887E5' }}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                    <p>이 노래 좋아요... <span style={{ color: "red", cursor: "pointer" }} onClick={() => openFeedDetail(music)}>더보기</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </Mobile>
        </div>
    );
}

export default Home;