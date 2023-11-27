import React, { useState } from 'react';
import "../css/navbar.css";
import { Container, Outside } from "../style/navbar_Style";
import { PC, Mobile } from "../components/Responsive";
import { Ul } from '../style/navbar_Style';
import { IoHomeSharp } from 'react-icons/io5';
import { FaSearch } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaItunesNote, FaRegSquarePlus } from "react-icons/fa6";
import { SiHeadspace } from "react-icons/si";
import CreatePost from '../Modal/Post/CreatePost';

function Navbar() {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const openCreatePost = () => {
        setIsCreatePostOpen(true);
    };

    return (
        <div className='fixed-top'>
            <PC>
                <Container>
                    <Outside className={"in"}>
                        <div className="inside">
                            <Ul className={"in"}>
                                <h2 className='mt-3'>BeatBuddy</h2>
                                <li className='text-start'><a href='/BB_Frontend'><IoHomeSharp className='me-2' size='25' color='black' />Home</a></li>
                                <li className='text-start'><a href='/BB_Frontend/Search'><FaSearch className='me-2' size='25' color='black' />Search</a></li>
                                <li className='text-start'><a href='/BB_Frontend/DM'><LuMessageCircle className='me-2' size='25' color='black' />DM</a></li>
                                <li className='text-start'><a href='/BB_Frontend/Alarm'><FaItunesNote className='me-2' size='25' color='black' />Alarm</a></li>
                                <li className='text-start' onClick={() => openCreatePost()}><a><FaRegSquarePlus className='me-2' size='25' color='black' />Post</a></li>
                                <li className='text-start'><a href='/BB_Frontend/Profile'>Profile</a></li>
                                <li className='text-start'><a href='/BB_Frontend/Login'>Login</a></li>
                            </Ul>
                        </div>
                    </Outside>
                </Container>

                {isCreatePostOpen && (<CreatePost
                    open={isCreatePostOpen}
                    onClose={() => {
                        setIsCreatePostOpen(false);
                    }}
                />)}
            </PC>

            <Mobile>
                <div className="button-container border fixed-bottom">
                    <button className="button">
                        <IoHomeSharp className='me-2' size='25' color='black' />
                    </button>
                    <button className="button">
                        <FaSearch className='me-2' size='25' color='black' />
                    </button>
                    <button className="button">
                        <LuMessageCircle className='me-2' size='25' color='black' />
                    </button>
                    <button className='button'>
                        <FaItunesNote className='me-2' size='25' color='black' />
                    </button>
                    <button class="button" onClick={() => openCreatePost()}>
                        <FaRegSquarePlus className='me-2' size='40' color='black' />
                    </button>
                    <button class="button">
                        <SiHeadspace className='me-2' size='40' color='gray' />
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