import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from '../components/Responsive';
import { SiHeadspace } from 'react-icons/si';
import { FiBookmark } from "react-icons/fi";
import { RiFolderMusicLine, RiUserHeartLine } from "react-icons/ri";
import { TbPlaylist, TbUserHeart } from "react-icons/tb";
import ProfilePost from '../components/Profile/ProfilePost';
import ProfileSaved from '../components/Profile/ProfileSaved';
import ProfilePlayList from '../components/Profile/ProfilePlayList';
import { FaEdit } from 'react-icons/fa';
import '../style/css/Profile.css';
import axios from 'axios';
import { FollowButton, FollowingButton,SecondaryButton } from '../style/styled_components/Button_Style';


function Profile() {
    const userNickname = window.localStorage.getItem('nickName');   
    const { nickName } = useParams(); //상대 유저 닉네임
    const [activeTab, setActiveTab] = useState('post');
    const [postCount, setPostCount] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

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

            if (userNickname !== nickName) {
                axios.get(`http://localhost:8080/api/follow/followInfo`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'ngrok-skip-browser-warning': '69420',
                    },
                })
                    .then((response) => {
                        const followingNickNames = response.data.followingNickNames || [];
                        setIsFollowed(followingNickNames.includes(nickName));
                    })
                    .catch((error) => {
                        console.error('followINFO API 요청 중 오류 발생:', error);
                    });
            }
        })
        .catch((error) => {
            console.error('API 요청 중 오류 발생:', error);
        });

        setIsOwnProfile(userNickname === nickName);
    }, [nickName, userNickname, isFollowed]);


    const handleFollowToggle = () => {
        const apiUrl = isFollowed ? `http://localhost:8080/api/follow/unfollow?followerNickName=${nickName}` : `http://localhost:8080/api/follow/follow?followerNickName=${nickName}`;
    
        axios.post(apiUrl, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420',
            },
        })
        .then((response) => {
            if (isFollowed) {
                console.log('언팔로우 성공');
                setIsFollowed(false);
            } else {
                console.log('팔로우 성공');
                setIsFollowed(true);
            }
        })
        .catch((error) => {
            console.log('에러 발생:', error);
        });
    };

    const handlePostCount = (count) => {
        setPostCount(count);
    };


    return (
        <div>
            <PC>
                {isOwnProfile ? (
                    <div className='user-container d-flex align-items-center mb-3 '>
                        <div className=' col-md-2 offset-md-1 user-img mt-5 '>
                            <img className='userimg' src={userInfo.userImgSrc} alt="User Avatar" style={{ width: '9.375rem', height:'9.375rem', borderRadius:'50%', background:'#Fff'}} />
                        </div>
                        <div className=' col-md-6 user-info ml-auto 'style={{ marginLeft: '3rem' }}>
                            <div className="d-flex align-items-center"style={{gap: '3rem'}}>
                                <p style={{ fontSize: '1.5rem'}}> <b>{userInfo.nickName}</b> </p>
                                <Link to={`/profile/edit/${nickName}`}><SecondaryButton className='btn btn-outline-secondary' > <FaEdit /> 프로필 편집 </SecondaryButton></Link>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: '2rem', marginTop: '0.625rem',fontSize: '1rem', fontWeight: 500 }} >
                                <span className='me-4'> 게시글 <b >{postCount}</b> </span>
                                <span className='me-4' > 팔로우 <b > {userInfo.followingCnt} </b>  </span>
                                <span> 팔로워  <b> {userInfo.followerCnt} </b> </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='user-container d-flex align-items-center mb-3'>
                        <div className=' col-md-2 offset-md-1 mt-5 '>
                            <img className='userimg' src={userInfo.userImgSrc} alt="User Avatar" style={{ width: '9.375rem', height:'9.375rem', backgroundColor:'#Fff', borderRadius:'50%' }} />
                        </div>
                        <div className=' col-md-6 user-info ml-auto ' style={{ marginLeft: '3rem'  }}>
                            <div className="d-flex align-items-center">
                                <p style={{ fontSize: '1.5rem', marginRight: '3rem' }}> <b>{userInfo.nickName}</b> </p>
                                {isFollowed ?(
                                    <FollowingButton onClick={handleFollowToggle}><RiUserHeartLine style={{ marginRight: '6px',fontSize: '18px' }} />팔로잉</FollowingButton>
                                ):(
                                    <FollowButton onClick={handleFollowToggle}> <TbUserHeart style={{ marginRight: '6px',fontSize: '18px' }} /> 팔로우</FollowButton>
                                )}
                            </div>
                            <div className="d-flex align-items-center" style={{ marginLeft: 'auto', marginTop: '0.625rem',fontSize: '1rem' }} >
                                <span className='me-4' > 게시글 <b style={{  marginRight: '0.25rem'}}>{postCount}</b> </span>
                                <span className='me-4'> 팔로우 <b style={{  marginRight: '0.25rem'}}>{userInfo.followingCnt}</b> </span>
                                <span > 팔로워  <b style={{  marginRight: '0.25rem'}}>{userInfo.followerCnt}</b> </span>
                            </div>
                        </div>
                    </div>
                )}

                <hr className="tab-divider"/>      

                <div className='button-container'  >
                    <button onClick={() => handleTabChange('post')} className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}><RiFolderMusicLine className="icon" size={19} />게시물</button>
                    <button onClick={() => handleTabChange('playlist')} className={`tab-button ${activeTab === 'playlist' ? 'active' : ''}`}><TbPlaylist className="icon" size={19} />플레이리스트</button>
                    <button onClick={() => handleTabChange('saved')} className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`} ><FiBookmark className="icon" size={19} />저장됨</button>
                </div>
                <div className='contents' >
                    {activeTab === 'post' && <ProfilePost  userNickname={userInfo.nickName} postCount={handlePostCount}  />}
                    {activeTab === 'playlist' && <ProfilePlayList userNickname={userInfo.nickName}/>}
                    {activeTab === 'saved' && <ProfileSaved userNickname={userInfo.nickName}/>}
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