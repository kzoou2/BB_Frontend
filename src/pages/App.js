import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Alarm from './Alarm';
import DM from './DM';
import Search from './Search';
import Profile from './Profile';
import MusicSearch from '../Modal/MusicSearch';
import MusicChoose from '../Modal/MusicChoose';
import FeedPicChoose from '../Modal/FeedPicChoose';
import FeedTextInput from '../Modal/FeedText';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/alarm" element={<Alarm />} />
                    <Route path="/dm" element={<DM />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/post" element={<MusicSearch />} /> {/* Post Test Link */}
                    <Route path="/post/1" element={<MusicChoose />} /> {/* Post Test Link */}
                    <Route path="/post/2" element={<FeedPicChoose />} /> {/* Post Test Link */}
                    <Route path="/post/3" element={<FeedTextInput />} /> {/* Post Test Link */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
