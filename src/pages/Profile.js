import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { PC, Mobile } from '../components/Responsive';
import { SiHeadspace } from 'react-icons/si';
import { FiBookmark } from "react-icons/fi";
import { RiFolderMusicLine } from "react-icons/ri";
import { TbPlaylist } from "react-icons/tb";
import ProfilePost from '../components/Profile/ProfilePost';
import ProfileSaved from '../components/Profile/ProfileSaved';
import ProfilePlayList from '../components/Profile/ProfilePlayList';
import { FaEdit } from 'react-icons/fa';
import '../style/css/Profile.css';
import axios from 'axios';

function Profile() {
    const [activeTab, setActiveTab] = useState('post');
    const [postCount, setPostCount] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        axios.get(`https://94ed-121-190-220-40.ngrok-free.app/api/feeds`, {
            headers: {
                'Content-Type': `application/json`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                setPostCount(response.data.length)
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    }, [])

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
                        <div className='button-container' style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: '110px', marginBottom: '20px' }}>
                            <div className='button-container' style={{ display: 'inline-block', width: '300px', justifyContent: 'space-between' }} >
                                <button onClick={() => handleTabChange('post')} className={activeTab === 'post' ? 'active' : ''}><RiFolderMusicLine className='me-2' size='20' />게시물</button>
                                <button onClick={() => handleTabChange('saved')} className={activeTab === 'saved' ? 'active' : ''}><FiBookmark className='me-2' size='20' />저장됨</button>
                                <button onClick={() => handleTabChange('playlist')} className={activeTab === 'playlist' ? 'active' : ''}><TbPlaylist className='me-2' size='20' />플레이리스트</button>
                            </div>
                        </div>

                        {activeTab === 'post' && <ProfilePost />}
                        {activeTab === 'saved' && <ProfileSaved />}
                        {activeTab === 'playlist' && <ProfilePlayList />}
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
                                    <span style={{ marginRight: '24px' }}> 게시글 {postCount}</span>
                                    <span style={{ marginRight: '24px' }} > 팔로우 100 </span>
                                    <span> 팔로워 100 </span>
                                </div>
                            </div>
                        </div>

                        <div className='highlight' style={{ display: 'flex', marginLeft: '8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='lightgray' />
                            <SiHeadspace className='' size='60' color='lightgray' />
                        </div>

                        <hr />
                        <div className='button-container d-flex align-items-center justify-content-center' style={{ marginBottom: '20px' }}>
                            <div className='button-container' style={{ display: 'inline-block', width: '250px', justifyContent: 'space-between' }} >
                                <button onClick={() => handleTabChange('post')} className={activeTab === 'post' ? 'active' : ''}><RiFolderMusicLine className='ms-2 me-2' size='20' /></button>
                                <button onClick={() => handleTabChange('saved')} className={activeTab === 'saved' ? 'active' : ''}><FiBookmark className='ms-2 me-2' size='20' /></button>
                                <button onClick={() => handleTabChange('playlist')} className={activeTab === 'playlist' ? 'active' : ''}><TbPlaylist className='ms-2 me-2' size='20' /></button>
                            </div>
                        </div>

                        {activeTab === 'post' && <ProfilePost />}
                        {activeTab === 'saved' && <ProfileSaved />}
                        {activeTab === 'playlist' && <ProfilePlayList />}
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default Profile;