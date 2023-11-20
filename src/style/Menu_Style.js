import styled from "styled-components";

export const Ul = styled.ul`
list-style: none;
margin: 0;
padding: 0;
line-height: 2;

> li {
    background: whitesmoke;
    opacity: 0;
    padding: 12px 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: gray;
    transition: all 0.25s linear;
}

&.in > li {
    transform: translateX(0%);
    opacity: 1;
}

&.in > li > a {
    text-decoration: none;
    color: #000;
}
`;
