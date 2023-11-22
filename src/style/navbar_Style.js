import styled from "styled-components";

export const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: #white;
`;

export const Close = styled.button`
position: absolute;
top: 0;
right: 0;
background-color: whitesmoke;
border: 0;
padding: 22px;
z-index: 10;
cursor: pointer;
`;

export const Outside = styled.div`
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
`;