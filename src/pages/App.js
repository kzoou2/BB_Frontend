import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/css/App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Alarm from './Alarm';
import DM from './DM';
import Search from './Search';
import Profile from './Profile';
import CreatePost from '../components/Modal/Post/CreatePost';
import MusicSearch from '../components/Modal/Post/MusicSearch';
import PostPicSelect from '../components/Modal/Post/PostPicSelect';
import FeedTextInput from '../components/Modal/Post/PostText';
import PlayListSearch from '../components/Modal/PlayList/PlayListSearch';
import PlayListText from '../components/Modal/PlayList/PlayListText';
import FeedDetail from '../components/Modal/Feed/FeedDetail';
import Playlist from './Playlist';
import PlayListDetail from './PlayListDetail';

// Test
import MusicPlayerTest from '../test/MusicPlayerTest';
import MusicSearchTest from '../test/MusicSearchTest';
import HomeTest from '../test/HomeTest';

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
                    <Route path="/detail" element={<FeedDetail />} />
                    <Route path="/playlist" element={<Playlist />} />
                    {/* <Route path="/playlistDetail" element={<PlayListDetail />} /> */}
                    <Route path="/playlistDetail/:playlistId" element={<PlayListDetail />} />
                    
                    {/* Test */}
                    <Route path="/create" element={<CreatePost />} /> {/* Post Test Link */}
                    <Route path="/post" element={<MusicSearch />} /> {/* Post Test Link */}
                    <Route path="/post/1" element={<PostPicSelect />} /> {/* Post Test Link */}
                    <Route path="/post/2" element={<FeedTextInput />} /> {/* Post Test Link */}
                    <Route path="/pl" element={<PlayListSearch />} /> {/* Post Test Link */}
                    <Route path="/pl/1" element={<PlayListText />} /> {/* Post Test Link */}
                    <Route path="/test" element={<MusicPlayerTest />} />
                    <Route path='/test/1' element={<MusicSearchTest />} />
                    <Route path='/test/2' element={<HomeTest />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
