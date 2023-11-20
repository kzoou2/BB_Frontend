import React from 'react';
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Bar from '../components/Bar';
import Menu from "../components/Menu";

const bounce = keyframes`
 0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  27.68% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  27.78% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -100, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -100, 0, 0, 1); }
  29.73% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.785, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -49.785, 0, 0, 1); }
  31.61% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.659, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.659, 0, 0, 1); }
  33.06% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -23.527, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -23.527, 0, 0, 1); }
  34.43% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -30.089, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -30.089, 0, 0, 1); }
  36.81% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -18.067, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -18.067, 0, 0, 1); }
  39.2% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.115, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.115, 0, 0, 1); }
  42.09% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -8.347, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -8.347, 0, 0, 1); }
  46.79% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.013, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.013, 0, 0, 1); }
  49.68% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.316, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.316, 0, 0, 1); }
  54.38% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.002, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.002, 0, 0, 1); }
  57.27% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.643, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.643, 0, 0, 1); }
  62.05% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.007, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.007, 0, 0, 1); }
  64.86% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.178, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.178, 0, 0, 1); }
  69.64% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.002, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.002, 0, 0, 1); }
  72.53% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.049, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.049, 0, 0, 1); }
  77.23% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  80.12% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.014, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.014, 0, 0, 1); }
  84.82% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  87.71% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.004, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.004, 0, 0, 1); }
  92.48% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  95.3% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.001, 0, 0, 1); }
  100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
 /* 0% {
   background:black;
 }
 50%{background:blue}
 100%{background:pink} */
    `;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #white;
`;

const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: whitesmoke;
  border: 0;
  padding: 22px;
  z-index: 10;
  cursor: pointer;
`;

const Outside = styled.div`
  width: 25vw;
  min-width: 200px;
  max-width: 250px;
  height: 100vh;
  transform: translateX(-101%);
  transition: all 0.5s cubic-bezier(0, 0.05, 0, 1.3);
  overflow: hidden;

  &.in {
    transform: translateX(0);
    transition: 0;
  }

  > div {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: 100%;
    height: 100%;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0 100% 100% 0;
    transition: all 0.25s cubic-bezier(1, 0.05, 1, 1.5);
    transition-delay: 0.5s;
    background-color: whitesmoke;
  }

  &.in > div {
    border-radius: 0;
    transition-delay: 0s;
  }

  /* material animation*/
  > div:before {
    content: "";
    width: 2100px;
    height: 2100px;
    display: block;
    background-color: white;
    position: absolute;
    top: -50%;
    left: -100%;
    z-index: -1;
    transition: all 0.75s linear;
    transition-delay: 0.15s;
    transform: scale(0);
    transform-origin: top right;
    border-radius: 1000px;
  }
  &.in > div:before {
    transform: scale(1);
  }

  &.in > div {
    animation: ${bounce} 1s both;
  }
`;

function Navbar() {
    const [isActive, setActive] = useState(false);

    const handleClick = () => {
        console.log("active!");
        setActive(!isActive);
    };

    return (
        <div>
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