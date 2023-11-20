import React from 'react';
import { useState } from "react";
import Bar from '../components/Bar';
import Menu from "../components/Menu";
import { Container, Close, Outside } from "../style/navbar_Style";

function Navbar() {
    const [isActive, setActive] = useState(true);

    const handleClick = () => {
        console.log("active!");
        setActive(!isActive);
    };

    return (
        <div className='fixed-top'>
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
        </div>
    );
}

export default Navbar;