import React, { useState } from 'react';
import Navbar from './navbar';
import { SiHeadspace } from "react-icons/si";
import { PC, Mobile } from "../components/Responsive";

function Home() {
    const [hashtagList, setHashtagList] = useState(["Tag1", "Tag2", "Tag3"]);
    const [title, setTitle] = useState("헤어지자 말해요");
    const [artist, setArtist] = useState("박재정");
    const [year, setYear] = useState(2023);
    const [album, setAlbum] = useState("Alone");

    return (
        <div>
            <PC>
                <Navbar />

                <div className='mt-5'></div>
                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "70%", height: "70%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "70%", height: "70%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "70%", height: "70%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PC>


            <Mobile>
                <Navbar />
                <h2 className='text-start ms-3 mt-3 mb-3'>BeatBuddy</h2>
                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start ms-4 mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end me-4 mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "80%", height: "80%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start ms-4 mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end me-4 mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "80%", height: "80%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                    <div className="border-bottom" style={{ width: "40rem", height: "auto" }}>
                        <div>
                            <div className='d-flex justify-content-start ms-4 mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>
                            <div className='d-flex justify-content-end me-4 mb-3'>
                                <a>버튼그룹</a>
                            </div>
                            <div className="">
                                <img style={{ width: "80%", height: "80%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                <h5 className='mt-3'>{title} · {artist}</h5>
                                <p>{album} · {year}</p>
                                <p style={{color:'#4887E5'}}>{hashtagList.map((tag, index) => `#${tag} ${index < hashtagList.length - 1 ? ' ' : ''}`)}</p>
                                <p>이 노래 좋아요... 더보기</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Mobile>
        </div>
    );
}

export default Home;