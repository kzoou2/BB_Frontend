import React, { useState } from 'react';
import Navbar from './navbar';
import {PC,Mobile} from '../components/Responsive';
import { SiHeadspace } from 'react-icons/si';
import { FiBookmark } from "react-icons/fi";
import { RiFolderMusicLine } from "react-icons/ri";
import { TbPlaylist } from "react-icons/tb";
import ProfilePost from '../components/ProfilePost';
import ProfileSaved from '../components/ProfileSaved';
import ProfilePlayList from '../components/ProfilePlayList';
import { FaEdit } from 'react-icons/fa';


function Profile() {
    const [activeTab, setActiveTab ] = useState('post');
    const [postCount, setPostCount] = useState(0);

    const handleTabChange = (tab) =>{
        setActiveTab(tab);
    };

    return (
        <div>

            <PC>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-8'>
 
                        <div className='user-container d-flex align-items-center'>
                            <div className=' col-md-2 offset-md-1 user-img mb-5 mt-5 '>
                                <SiHeadspace className='' size='130' color='lightgray'/>
                            </div>
                            <div className=' col-md-6 user-info ml-auto ' style={{marginLeft:'100px'}}>
                                <div className="d-flex align-items-center">
                                    <p style={{ fontSize: '20px', marginRight: '50px' }}> <b> User Nickname </b> </p>
                                    <button className='btn btn-outline-primary'> <FaEdit /> 프로필 편집 </button>
                                </div>
                                <div  className="d-flex align-items-center" style={{ marginLeft: 'auto', marginTop:'10px'}} >
                                    <span style={{ marginRight: '24px' }}> 게시글{postCount}</span>
                                    <span style={{ marginRight: '24px' }} > 팔로우100 </span>
                                    <sapn> 팔로워100 </sapn>
                                </div>
                            </div>
                        </div>
                        
                        <div className='highlight' style={{ display: 'flex', marginLeft:'8%', alignItems: 'center', gap: '15px' }}>
                            <SiHeadspace className='' size='60' color='lightgray' />
                            <SiHeadspace className='' size='60' color='lightgray' />
                        </div>
                    
                        <hr/>
                        <div className='button-container' style={{ textAlign: 'center',alignItems: 'center', justifyContent: 'center', marginLeft:'60px', marginBottom:'20px'}}>
                            <div className='button-container' style={{ display: 'inline-block', width: '250px', justifyContent: 'space-between' }} >
                                <button onClick={() => handleTabChange('post')} className={activeTab === 'post' ? 'active' : ''}><RiFolderMusicLine className='me-2' size='20'/>게시물</button>
                                <button onClick={() => handleTabChange('saved')} className={activeTab === 'saved' ? 'active' : ''}><FiBookmark className='me-2' size='20' />저장됨 </button>
                                <button  onClick={() => handleTabChange('playlist')} className={activeTab === 'playlist' ? 'active' : ''}><TbPlaylist className='me-2' size='20'/>플리</button>
                            </div>
                        </div>

                        {activeTab === 'post' && <ProfilePost postCount={postCount} setPostCount={setPostCount} />}
                        {activeTab === 'saved' && <ProfileSaved />}
                        {activeTab === 'playlist' && <ProfilePlayList />}
                    </div>
                </div>
            </PC>

            <Mobile>
                <h1>Profile</h1>
            </Mobile>
        </div>
    );
}

export default Profile;