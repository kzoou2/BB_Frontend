import styled from "styled-components";

const BarContainer = styled.span`
  position: relative;
  width: 24px;
  height: 3px;
  margin: 3px 0;
  display: block;

  &:before,
  &:after {
    content: "";
    position: absolute;
  }

  &:before,
  &:after,
  &.bar {
    width: 24px;
    height: 3px;
    margin: 3px 0;
    display: block;
    background: black;
    transition: all 0.25s linear;
  }

  &:before {
    bottom: 100%;
  }
  &:after {
    top: 100%;
  }

  &.active:before {
    bottom: -200%;
  }

  &.active:after {
    top: 0;
  }

  &.active {
    /* background-color: transparent; */
  }

  &.active:before {
    transform: rotate(45deg);
    background: pink;
  }
  &.active:after {
    transform: rotate(-45deg);
    background: pink;
  }
`;

const Bar = ({ isActive }) => {
    return (
        <>
            <BarContainer className={isActive ? "active" : "bar"} />
        </>
    );
};

export default Bar;
