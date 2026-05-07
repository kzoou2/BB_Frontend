import styled from "styled-components";

export const ListContainer = styled.ul`
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 5%;
  max-width: 100%;
  box-sizing: border-box;
`

export const StyledChatButton = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%; 
  box-sizing: border-box; 

  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  border: none;
  background: ${({ selected }) => (selected ? '#EAEAEA' : 'gray')};
  transition: background 0.3s;

  border-radius: 0.45rem; 
  margin-bottom: 0.625rem;  
  padding: 0.625rem 0.925rem;
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
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 12px;
      background-color: white;
    }

    .chat-meta {
      display: flex;
      flex-direction: column;
      justify-content: center;

      strong {
        color: white;
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
      }

      .chat-preview {
        font-size: 0.9rem;
        color: #b0b0b0;
        margin-top: 0.2rem;
        margin-left: 0.9rem
      }
    }
`;