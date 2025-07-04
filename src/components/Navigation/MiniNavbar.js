import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavContainer, Outside, Ul } from "../../style/styled_components/MiniNavbar_Style";
import { PC, Mobile } from "../Responsive";
import { FiSearch, FiHome, FiPlusSquare,FiLogIn,FiLogOut} from 'react-icons/fi';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { HiOutlineMail } from "react-icons/hi";
import CreatePost from '../Modal/Post/CreatePost';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SlPlaylist } from "react-icons/sl";



function MiniNavbar() {
    const [userNickname, setUserNickname] = useState("");
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const openCreatePost = () => {
        setIsCreatePostOpen(true);
    };

    const [userInfo, setUserInfo] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const Data = async () =>{
            const loggedin = localStorage.getItem('isLogin')
            setIsLogin(loggedin);
    
            if (loggedin) {
                const storedNickname = localStorage.getItem('nickName');
                setUserNickname(storedNickname);
    
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
    }
    


    return (
        <div>
            <PC>
                <NavContainer>
                    <Outside className={"in"}>
                        <div className="inside">
                            <Ul className={"in"}>
                                <SlPlaylist   size={40} style={{margin: '20px auto', color: '#FEF164' }} />
                                <Link to='/'>
                                    <img  />
                                </Link>
                                <li className='text-start'>
                                    <Link to='/'><FiHome  size={26} style={{ marginRight: '10px' }} /></Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/playlist'><MdOutlineQueueMusic size={26} style={{ marginRight: '10px' }} /></Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/Search'><FiSearch  size={26} style={{ marginRight: '10px' }} /></Link>
                                </li>
                                <li className='text-start'>
                                    <Link to='/DM'><HiOutlineMail size={26} style={{ marginRight: '10px' }} /></Link>
                                </li>
                                <li className='text-start' onClick={() => openCreatePost()}>
                                    <span style={{ color: "white", cursor: "pointer" }}/><FiPlusSquare size={26} style={{ marginRight: '10px' }}/>
                                </li>
                                {isLogin ? (
                                    <>
                                    <li className='text-start'>
                                        <Link to={`/profile/${userNickname}`}>
                                            <img src={userInfo.userImgSrc} alt={userInfo.nickName}  style={{ width:'30px', height:'30px', borderRadius:'50%', marginRight:'15px'}}/>
                                        </Link>
                                    </li>
                                    <li className='text-start'>
                                        <span style={{ color: "white", cursor: "pointer" }} onClick={() => logout()}><FiLogOut   size={26} style={{ marginRight: '10px' }}/></span>
                                    </li>
                                    </>
                                ) : (
                                    <li className='text-start'>
                                        <Link to='/Login'><FiLogIn size={26} style={{ marginRight: '10px' }} /> </Link>
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
        </div>
    );
}

export default MiniNavbar;