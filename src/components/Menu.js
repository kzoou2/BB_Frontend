import styled from "styled-components";

const Ul = styled.ul`
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
    /* -webkit-transition: all 0.25s linear; */
    transition: all 0.25s linear;
  }
  &.in > li {
    /* -webkit-transform: translateX(0%); */
    transform: translateX(0%);
    opacity: 1;
  }

  &.in > li:nth-child(1) {
    transition-delay: 1s;
  }
  &.in > li:nth-child(2) {
    transition-delay: 1.15s;
  }
  &.in > li:nth-child(3) {
    transition-delay: 1.25s;
  }
  &.in > li:nth-child(4) {
    transition-delay: 1.35s;
  }
  &.in > li:nth-child(5) {
    transition-delay: 1.45s;
  }
  &.in > li:nth-child(6) {
    transition-delay: 1.55s;
  }
  &.in > li:nth-child(7) {
    transition-delay: 1.65s;
  }
`;
const Menu = ({ isActive }) => {
    return (
        <div>
            <Ul className={isActive ? "in" : null}>
                <h2>BeatBuddy</h2>
                <li>Home</li>
                <li>Search</li>
                <li>DM</li>
                <li>Alarm</li>
                <li>Post</li>
                <li>Profile</li>
            </Ul>
        </div>
    );
};
export default Menu;
