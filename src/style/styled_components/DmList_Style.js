import styled from "styled-components";

export const ListContainer = styled.ul`
    overflow-y: auto;
    // height: 70vh;
    list-style: none;
    padding: 0;
    margin: 5%;
`

export const StyledChatButton = styled.li`
display: flex;
align-items: center;
justify-content: flex-start;



font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
border: none;
background: ${({ selected }) => (selected ? '#EAEAEA' : 'gray')};
transition: background 0.3s;

border-radius: 7px;
margin-bottom: 10px;
padding: 10px 15px;
cursor: pointer;


&:not(:hover) {
    background: ${({ selected }) => (selected ? '#EAEAEA' : '#1E1E1E')};
}

&:hover {
    background: ${({ selected }) => (selected ? '#EAEAEA' : '#333')}; 
}

  .chat {
    display: flex;
    align-items: center;
    

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 12px;
      background-color: white;
    }

    .chat-meta {
      display: flex;
      flex-direction: column;

      strong {
        color: white;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
      }

      .chat-preview {
        font-size: 13px;
        color: #b0b0b0;
        margin-top: 4px;
        margin-left: 12px
      }
    }
`;