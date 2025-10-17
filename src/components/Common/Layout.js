
import MiniPlayer from "../Player/MiniPlayer";
import Navbar from "../Navigation/Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) =>{
    const location = useLocation(); 
    const isDMPage = location.pathname.toLowerCase().startsWith('/dm');
    const noLayoutPaths = ["/login", "/signUp"];

    if (noLayoutPaths.includes(location.pathname)) {
        return <>{children}</>; 
    }

    return(
        <div className="row">
            <div className={isDMPage ? "col-md-1" : "col-md-2"}><Navbar isDMPage={isDMPage} /></div>
            <div className={isDMPage ? "col-md-9" : "col-md-8"} style={{ height: '100vh', overflowY: isDMPage ? 'hidden' : 'auto' }} >{children}</div>
            <dic className='col-md-2'><MiniPlayer/> </dic>
        </div>
    )
};

export default Layout;