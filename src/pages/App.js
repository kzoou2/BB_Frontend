import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/css/App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import DM from './DM';
import Search from './Search';
import Profile from './Profile';
import ProfileEdit from '../components/Profile/ProfileEdit';
import CreatePost from '../components/Modal/Post/CreatePost';
import MusicSearch from '../components/Modal/Post/MusicSearch';
import PostPicSelect from '../components/Modal/Post/PostPicSelect';
import FeedTextInput from '../components/Modal/Post/PostText';
import PlayListSearch from '../components/Modal/PlayList/PlayListSearch';
import PlayListText from '../components/Modal/PlayList/PlayListText';
import Feed from './Feed';
import FeedDetail from '../components/Modal/Feed/FeedDetail';
import FeedEdit from '../components/Modal/Feed/FeedEdit';
import Playlist from './Playlist';
import PlayListDetail from './PlayListDetail';
import MiniPlayer from '../components/Player/MiniPlayer';
import DmRoom from '../components/DM/DmRoom';
import SearchByPlaylist from '../components/Search/SearchByPlaylist';
import SearchByFeed from '../components/Search/SearchByFeed';
import SearchByTag from '../components/Search/SearchByTag';
import { WebSocketConnection } from '../components/WebSocketConnection';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';


function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // let loginChk = false;

    // if (window.localStorage.getItem("isLogin")) {
    //     loginChk = true
    // }

    // useEffect(() => {
    //     if (loginChk) {
    //         setIsLogin(true)
    //     }
    // }, []);
    useEffect(() => {
    const isLoginStored = localStorage.getItem("isLogin");

    if (isLoginStored === "true") {
        setIsLogin(true);
    } else {
        setIsLogin(false);
    }
    }, []);


    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        },)
    },[])

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App" style={{backgroundColor: "#111111", color: "white"}}>
                {isLoading && <Loading />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={isLogin ? <Home /> : <Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/dm/*" element={ <WebSocketConnection> <DM /> </WebSocketConnection> }/>
                        <Route path=":dmRoomId" element={<DmRoom />} />
                    <Route path="/search" element={<Search />} />
                    <Route path='/search/playlist' element={<SearchByPlaylist />}/>
                    <Route path='/search/feed' element={<SearchByFeed />} />
                    <Route path='/search/tag' element={<SearchByTag />} />
                    <Route path="/profile/:nickName" element={<Profile />} />
                    <Route path="/Profile/edit/:nickName" element={<ProfileEdit />} />
                    <Route path="/feed/:feedId" element={<Feed />} />
                    <Route path="/detail" element={<FeedDetail />} />
                    <Route path="/playlist" element={<Playlist />} />
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
