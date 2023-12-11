import styled from 'styled-components';

export const StyledButton = styled.button`
  background: rgb(0, 149, 246);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  padding: 5px 15px;
  cursor: pointer;

  &:hover {
    background: rgb(24, 119, 242);
  }

  &:active:not(:hover) {
    background: rgb(0, 149, 246);
    opacity: .7;
  }
`;