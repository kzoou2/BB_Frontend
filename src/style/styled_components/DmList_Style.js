import styled from "styled-components";

export const ListContainer = styled.ul`
    overflow-y: auto;
    height: 70vh;
    list-style: none;
    padding: 0;
    margin: 0;
`

export const StyledChatButton = styled.li`
display: flex;
align-items: center;
// font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
border: none;
background: ${({ selected }) => (selected ? '#EAEAEA' : 'white')};
transition: background 0.3s;

&:not(:hover) {
    background: ${({ selected }) => (selected ? '#EAEAEA' : 'white')};
}

&:hover {
    background: ${({ selected }) => (selected ? '#EAEAEA' : '#F6F6F6')}; 
}

div {
    display: flex;
    align-items: center;
    padding: 8px;

    img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
}
`;