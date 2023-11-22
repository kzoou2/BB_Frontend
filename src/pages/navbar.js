import React from 'react';
import { useState } from "react";
import Bar from '../components/Bar';
import Menu from "../components/Menu";
import { Container, Close, Outside } from "../style/navbar_Style";
import { PC, Mobile } from "../components/Responsive";
import "../css/navbar.css";
import { IoHomeSharp } from 'react-icons/io5';
import { FaSearch } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaItunesNote } from "react-icons/fa6";
import { SiHeadspace } from "react-icons/si";

function Navbar() {
    const [isActive, setActive] = useState(true);

    const handleClick = () => {
        console.log("active!");
        setActive(!isActive);
    };

    return (
        <div className='fixed-top'>
            <PC>
                <Container>
                    <Close onClick={handleClick}>
                        <Bar isActive={isActive} />
                    </Close>
                    <Outside className={isActive ? "in" : null}>
                        <div className="inside">
                            <Menu isActive={isActive} />
                        </div>
                    </Outside>
                </Container>
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
                    <button class="button">
                        <SiHeadspace className='me-2' size='40' color='gray' />
                    </button>
                </div>
            </Mobile>

        </div>
    );
}

export default Navbar;