import { BarContainer } from '../style/Bar_Style';

const Bar = ({ isActive }) => {
    return (
        <>
            <BarContainer className={isActive ? "active" : "bar"} />
        </>
    );
};

export default Bar;
