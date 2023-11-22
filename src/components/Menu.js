import { Ul } from '../style/Menu_Style';
import { IoHomeSharp } from 'react-icons/io5';
import { FaSearch } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaItunesNote, FaRegSquarePlus } from "react-icons/fa6";


const Menu = ({ isActive }) => {
    return (
        <div>
            <Ul className={isActive ? "in" : null}>
                <h2 className='mt-3'>BeatBuddy</h2>
                <li className='text-start'><a href='/'><IoHomeSharp className='me-2' size='25' color='black'/>Home</a></li>
                <li className='text-start'><a href='/Search'><FaSearch className='me-2' size='25' color='black'/>Search</a></li>
                <li className='text-start'><a href='/DM'><LuMessageCircle className='me-2' size='25' color='black'/>DM</a></li>
                <li className='text-start'><a href='/Alarm'><FaItunesNote className='me-2' size='25' color='black'/>Alarm</a></li>
                <li className='text-start'><a href='/Post'><FaRegSquarePlus className='me-2' size='25' color='black'/>Post</a></li>
                <li className='text-start'><a href='/Profile'>Profile</a></li>
                <li className='text-start'><a href='/Login'>Login</a></li>
            </Ul>
        </div>
    );
};
export default Menu;
