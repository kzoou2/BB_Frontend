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
import Feed from './Feed';
import FeedDetail from '../components/Modal/Feed/FeedDetail';
import Playlist from './Playlist';
import PlayListDetail from './PlayListDetail';
import MiniPlayer from '../components/Player/MiniPlayer';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App" style={{backgroundColor: "black", color: "white"}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/alarm" element={<Alarm />} />
                    <Route path="/dm" element={<DM />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile/:nickName" element={<Profile />} />
                    <Route path='/feed/:feedId' element={<Feed />} />
                    <Route path="/detail" element={<FeedDetail />} />
                    <Route path="/playlist" element={<Playlist />} />
                    {/* <Route path="/playlistDetail" element={<PlayListDetail />} /> */}
                    <Route path="/playlistDetail/:nickName/:playlistId" element={<PlayListDetail />} />
                    <Route path="/miniplayer" element={<MiniPlayer />} />

                    {/* Test */}
                    <Route path="/create" element={<CreatePost />} /> {/* Post Test Link */}
                    <Route path="/post" element={<MusicSearch />} /> {/* Post Test Link */}
                    <Route path="/post/1" element={<PostPicSelect />} /> {/* Post Test Link */}
                    <Route path="/post/2" element={<FeedTextInput />} /> {/* Post Test Link */}
                    <Route path="/pl" element={<PlayListSearch />} /> {/* Post Test Link */}
                    <Route path="/pl/1" element={<PlayListText />} /> {/* Post Test Link */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
