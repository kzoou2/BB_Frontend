import styled from "styled-components";

export const Overlay = styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
left: 0;
right: 0;
background: rgba(0, 0, 0, 0.2);
z-index: 9999;
`;

export const ModalWrap = styled.div`
width: 600px;
height: 600px;
border-radius: 15px;
background-color: #fff;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

export const Contents = styled.div`
margin: 30px 30px;
`;

export const Button = styled.button`
font-size: 16px;
padding: 10px 20px;
border: none;
background-color: #ababab;
border-radius: 10px;
color: white;
cursor: pointer;
&:hover {
    background-color: #898989;
}
`;