import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { NavContainer, Outside, Ul } from "../../style/styled_components/navbar_Style";
import { PC, Mobile } from "../Responsive";
import { FiSearch, FiHome, FiPlusSquare,FiLogIn,FiLogOut} from 'react-icons/fi';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { HiOutlineMail } from "react-icons/hi";
import CreatePost from '../Modal/Post/CreatePost';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue  } from "recoil";
import { userNicknameAtom } from '../../state/UserAtom';
import { useLocation } from 'react-router-dom';
import { SlPlaylist } from "react-icons/sl";

function Navbar() {
    const userNickname = useRecoilValue(userNicknameAtom); 
    const [userInfo, setUserInfo] = useState('');
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const location = useLocation();
    // const isDMPage = /^\/DM(\/.*)?$/.test(location.pathname); 
    const isDMPage = location.pathname.toLowerCase().startsWith('/dm');

    const openCreatePost = () => {
        setIsCreatePostOpen(true);
    };

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const Data = async () =>{
            const loggedin = localStorage.getItem('isLogin')
            setIsLogin(loggedin);
    
            if (loggedin) {
    
                try{
                    const res = await axios.get(`http://localhost:8080/api/v1/users/info`,{
                        headers:{
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
                        },
                    });
                    setUserInfo(res.data);
                } catch(error){
                    console.error(error)
                }
            }
        }
        Data();
    }, []);

    const logout = async () => {
        localStorage.removeItem('email');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('nickName');
        localStorage.removeItem('token');
        setIsLogin(false);

        await axios.post(
            `http://localhost:8080/api/v1/users/logout`,
            {
                accessToken: `${window.localStorage.accessToken}`,
                refreshToken: `${window.localStorage.refreshToken}`
            }
        )
        .then((response) => {
            console.log("로그아웃 성공", response);
        })
        .catch((error) => {
            console.log("로그아웃 API 호출 중 오류", error);
        });

        navigate("/login");
        window.location.reload();
    }


    return (
        <div>
            <PC>
                <NavContainer isMini={isDMPage}>
                    <Outside className={`in ${isDMPage ? 'mini' : ''}`}>
                        <div className="inside">
                            <Ul className={`in ${isDMPage ? 'mini' : ''}`}>
                                {isDMPage ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                        <SlPlaylist size={40} style={{ color: '#FEF164' }} />
                                    </div>
                                ):(
                                    <Link to='/'>
                                        <img src='https://github.com/eeeeeddy/eeeeeddy/assets/71869717/ba3957b2-2b3c-4f55-8426-008dfc56e00b' alt='BeatBuddy' width={'100%'} />
                                    </Link>
                                )}
                                <li className='text-start'>
                                    <Link to='/' ><FiHome size={26} style={{ marginRight: '10px' }} />{!isDMPage && "Home"}</Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/playlist'><MdOutlineQueueMusic size={26} style={{ marginRight: '10px' }} />{!isDMPage && "PlayList"}</Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/Search'><FiSearch size={26} style={{ marginRight: '10px' }} />{!isDMPage && "Search"}</Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/DM'><HiOutlineMail size={26} style={{ marginRight: '10px' }}/>{!isDMPage && "DM"}</Link>
                                </li>
                                <li className='text-start' onClick={() => openCreatePost()}>
                                    <span style={{ color: "white", cursor: "pointer" }}><FiPlusSquare size={26} style={{ marginRight: '10px' }} />{!isDMPage && "Post"}</span>
                                </li>
                                {isLogin ? (
                                    <>
                                    <li className='text-start'>
                                        <Link to={`/profile/${userInfo.nickName}`}>
                                            <img src={userInfo.userImgSrc} alt={userInfo.nickName}  style={{ width:'30px', height:'30px', borderRadius:'50%', marginRight:'15px',background:'#fff'}}/>
                                            {!isDMPage && <b style={{ fontSize: '17px' }}>{userInfo.nickName}</b>}
                                        </Link>
                                    </li>
                                    <li className='text-start'>
                                        <span style={{ color: "white", cursor: "pointer" }} onClick={() => logout()}><FiLogOut  size={26} style={{ marginRight: '10px' }}/>{!isDMPage && "Logout"}</span>
                                    </li>
                                    </>
                                ) : (
                                    <li className='text-start'>
                                        <Link to='/Login'><FiLogIn size={26} style={{ marginRight: '10px' }} /> {!isDMPage && "Login"}</Link>
                                    </li>
                                )}
                            </Ul>
                        </div>
                    </Outside>
                </NavContainer>

                {isCreatePostOpen && (<CreatePost
                    open={isCreatePostOpen}
                    onClose={() => {
                        setIsCreatePostOpen(false);
                    }}
                />)}
            </PC>

            {/* TODO: 플레이리스트 부분 추가하기 */}
            <Mobile>
                <div className="button-container border fixed-bottom">
                    <button className="button">
                        <FiHome size={26} style={{ marginRight: '10px' }}/>
                    </button>
                    <button className="button">
                        <FiSearch size={26} style={{ marginRight: '10px' }}/>
                    </button>
                    <button className="button">
                        <HiOutlineMail csize={26} style={{ marginRight: '10px' }} />
                    </button>
                    <button className='button'>
                        <MdOutlineQueueMusic size={26} style={{ marginRight: '10px' }} />
                    </button>
                    <button className="button" onClick={() => openCreatePost()}>
                        <FiPlusSquare size={26} style={{ marginRight: '10px' }} />
                    </button>
                    <button className="button">
                        {isLogin ? (
                            <img src={userInfo.userImgSrc} alt={userInfo.nickName}  style={{ width:'25px', height:'25px', borderRadius:'50%', marginRight:'15px'}}/>
                        ) : (   
                            <FiLogIn size={26} style={{ marginRight: '10px' }} /> 
                        )}
                    </button>
                </div>

                {isCreatePostOpen && (<CreatePost
                    open={isCreatePostOpen}
                    onClose={() => {
                        setIsCreatePostOpen(false);
                    }}
                />)}
            </Mobile>

        </div>
    );
}

export default Navbar;