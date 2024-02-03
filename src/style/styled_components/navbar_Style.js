import styled from "styled-components";

export const NavContainer = styled.div`
width: 100vw;
height: 100vh;
background-color: #black;
`;

export const Outside = styled.div`
width: 16vw;
min-width: 16vw;
max-width: 16vw;
height: 100vh;
transform: translateX(-101%);
transition: all 0.5s cubic-bezier(0, 0.05, 0, 1.3);
overflow: hidden;
transform: translateX(0);
transition: 0;

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
    background-color: #121212;
}

&.in > div {
    border-radius: 0;
    transition-delay: 0s;
}
`;

export const Ul = styled.ul`
list-style: none;
margin: 0;
padding: 0;
line-height: 2;

> li {
    background: #121212;
    opacity: 0;
    padding: 12px 22px;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: #white;
    transition: all 0.25s linear;

    &:hover {
        background-color: #333; /* Change the background color on hover */
    }
}

&.in > li {
    transform: translateX(0%);
    opacity: 1;
}

&.in > li > a {
    text-decoration: none;
    color: #fff;
}
`;