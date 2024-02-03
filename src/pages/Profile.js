import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
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
import MiniPlayer from '../components/Player/MiniPlayer';

function Profile() {
    const { nickName } = useParams();
    const [activeTab, setActiveTab] = useState('post');
    const [postCount, setPostCount] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/info/${nickName}`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420',
            },
        })
        .then((response) => {
            setUserInfo(response.data);
            setIsOwnProfile(response.data.nickName === nickName);

            // 사용자의 게시글 개수를 가져옵니다.
            axios.get(`http://localhost:8080/api/feeds/user/${nickName}`, {
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            })
            .then((response) => {
                setPostCount(response.data.length);
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
        })
        .catch((error) => {
            console.error('API 요청 중 오류 발생:', error);
        });
    }, [nickName]);
    

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-2'>
                        <Navbar />
                    </div>
                    <div className='col-md-8'>
                        <div className='user-container d-flex align-items-center mb-3'>
                            <div className=' col-md-2 offset-md-1 user-img mt-5 '>
                                <img className='userimg' src={userInfo.userImgSrc} alt="User Avatar" style={{ width: '150px', height:'150px'}} />
                            </div>
                            <div className=' col-md-6 user-info ml-auto ' style={{ marginLeft: '100px' }}>
                                <div className="d-flex align-items-center">
                                    <p style={{ fontSize: '20px', marginRight: '50px' }}> <b>{userInfo.nickName}</b> </p>
                                    <button className='btn btn-outline-primary'> <FaEdit /> 프로필 편집 </button>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginLeft: 'auto', marginTop: '10px' }} >
                                    <span className='me-4'> 게시글 {postCount}</span>
                                    <span className='me-4'> 팔로우 {userInfo.followingCnt} </span>
                                    <span> 팔로워 {userInfo.followerCnt}</span>
                                </div>
                            </div>
                        </div>

                        {/* <div className='highlight' style={{ display: 'flex', marginLeft: '8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='black' />
                            <SiHeadspace className='' size='60' color='black' />
                        </div> */}

                        <hr />                                          
                        <div className='button-container' style={{  textAlign: 'center', alignItems: 'center', justifyContent: 'center',  marginBottom: '20px', display: 'inline-block', width: '500px', justifyContent: 'space-between' }} >
                            <button onClick={() => handleTabChange('post')} className={activeTab === 'post' ? 'active' : ''} style={{ color: "white", marginRight:'20px' }}><RiFolderMusicLine className='me-2' size='20' />게시물</button>
                            <button onClick={() => handleTabChange('playlist')} className={activeTab === 'playlist' ? 'active' : ''} style={{ color: "white", marginRight:'20px' }}><TbPlaylist className='me-2' size='20' />플레이리스트</button>
                            <button onClick={() => handleTabChange('saved')} className={activeTab === 'saved' ? 'active' : ''} style={{ color: "white" }}><FiBookmark className='me-2' size='20' />저장됨</button>
                        </div>
                        <div className='contents' style={{overflow: "scroll" , maxHeight: '450px', scrollbarColor:'black' }}>
                            {activeTab === 'post' && <ProfilePost  userNickname={userInfo.nickName}/>}
                            {activeTab === 'saved' && <ProfileSaved userNickname={userInfo.nickName}/>}
                            {activeTab === 'playlist' && <ProfilePlayList userNickname={userInfo.nickName}/>}
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <MiniPlayer />
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='row'>
                    <div className='col-md-2'>
                        <Navbar />
                    </div>
                    <div className='col-md-10'>
                        <div className='user-container d-flex align-items-center mb-3'>
                            <div className='col-md-2 user-img mt-5'>
                            <img className='userimg' src={userInfo.imgSrc} alt="User Avatar" style={{ width: '90px', height:'90px'}} />
                            </div>
                            <div className='user-info' style={{ marginLeft: '100px' }}>
                                <div className="d-flex align-items-center">
                                    <p style={{ fontSize: '20px', marginRight: '20px' }}> <b>{userInfo.nickName}</b> </p>
                                    <button className='btn btn-outline-primary'> <FaEdit /> 프로필 편집 </button>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginTop: '10px' }} >
                                    <span className='me-4'> 게시글 {postCount}</span>
                                    <span className='me-4'> 팔로우 {userInfo.followingCnt} </span>
                                    <span> 팔로워 {userInfo.followerCnt}</span>
                                </div>
                            </div>
                        </div>

                        <div className='highlight' style={{ display: 'flex', marginLeft: '8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='black' />
                            <SiHeadspace className='' size='60' color='black' />
                        </div>

                        <hr />
                        <div className='button-container d-flex align-items-center justify-content-center' style={{ marginBottom: '20px' }}>
                            <div className='button-container' style={{ display: 'inline-block', width: '250px', justifyContent: 'space-between' }} >
                                <button onClick={() => handleTabChange('post')} className={activeTab === 'post' ? 'active' : ''}><RiFolderMusicLine className='ms-2 me-2' size='20' /></button>
                                <button onClick={() => handleTabChange('playlist')} className={activeTab === 'playlist' ? 'active' : ''}><TbPlaylist className='ms-2 me-2' size='20' /></button>
                                <button onClick={() => handleTabChange('saved')} className={activeTab === 'saved' ? 'active' : ''}><FiBookmark className='ms-2 me-2' size='20' /></button>
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