import React, { useEffect, useState } from 'react';
import { Mobile, PC } from '../components/Responsive';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/css/Search.css';
import PlaylistCard from '../components/Common/PlaylistCard';
import PostCard from '../components/Common/PostCard';
import FeedDetail from '../components/Modal/Feed/FeedDetail';
import TextInput from '../components/Common/TextInput';
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { TbMoodCry } from 'react-icons/tb';


//TODO:feedDetail 모달 열리도록
function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState(''); //검색
    const [searchResult, setSearchResult] = useState([]); //검색결과
    const [userDetails, setUserDetails] = useState(null);
    const [plByLikes, setPlByLikes]= useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedButton, setSelectedButton] = useState('all');
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);

    useEffect(() => {
        const { searchText } = location.state || {};
        setSearchText(typeof searchText === 'string' ? searchText.trim() : '');
    }, [location]);

    useEffect(()=>{
        const PlaylistByLikes = async ()=>{
            try{
                const res = await axios.get('http://localhost:8080/api/playlist/orderedByLikeCount',{
                    headers: {'ngrok-skip-browser-warning': '69420'}
                });
    
                setPlByLikes(res.data)
            } catch(error){
                console.log("플리 좋아요순 오류 발생", error)
            }
        };
        PlaylistByLikes();
    },[]);
    


    const fetchUserDetails = async (nick_name) => {
        try {
            const res = await axios.get('http://localhost:8080/api/search/users/nickname', {
                params: { nickname: nick_name },
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
    
            console.log("닉네임 검색 결과:", res.data);
    
            const userInfoResponses = await Promise.all(
                res.data.map(async (user) => {
                    const detailRes = await axios.get(`http://localhost:8080/api/v1/users/info/${user.nick_name}`);
                    return detailRes.data;
                })
            );
    
            console.log("추가 유저 정보:", userInfoResponses);
            setUserDetails(userInfoResponses); 
        } catch (error) {
            console.error("유저 정보 오류 발생", error);
        }
    };
    
    // FIXME:전체검색 검색결과오류
    useEffect(()=>{
        const SearchData = async ()=>{
            if (!searchText.trim()) {
                setSearchResult([]);
                return;
            }
            try{
                const res = await axios.get('http://localhost:8080/api/search/total/Keyword',{
                    params: {
                        keyword: searchText,
                    },
                    headers:{
                        'ngrok-skip-browser-warning': '69420' 
                    }
                });
                setSearchResult(res.data);
                console.log(res.data);

                const userResult = res.data.find(result => result.nick_name === searchText);
                if (userResult && userResult.nick_name) {
                    fetchUserDetails(userResult.nick_name);
                } else {
                    setUserDetails(null);
                }
            } catch(error){
                console.error("검색 중 오류 발생", error);
            }
        };
        if (searchText.trim() !== '') {
            SearchData();
        } else {
            setSearchResult([]);
        }

    }, [searchText]);



    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const transformMusicData = (result) => ({
        id: result.id,
        feedImgSrc: result.img_src, // 기본 이미지
        musicInfoList: [
            {
                musicTitle: result.f_music_title,
                musicArtist: result.music_artist,
                albumUrl: result.f_album_url, // 대체 이미지
                albumName: result.album_name,
                releaseDate: result.release_date
            }
        ]
    });
    

    const transformPlaylistData = (result) => ({
        id: result.id,
        imageFileUrl: result.img_src,
        plLike: result.likes ?? 0,  
        title: result.title,
        userImgSrc: result.user_img_src,
        nickName: result.nick_name,
        tagName: Array.isArray(result.tag_name) ? result.tag_name : [result.tag_name] 
    });
    
    const goSearchByFeed = () => {
        navigate('/search/feed', { state: { searchText, filter } });
        setSelectedButton('feed');
    };
    
    const goSearchByPlaylist = () => {
        navigate('/search/playlist', { state: { searchText, filter } });
        setSelectedButton('playlist');
    };

    const goSearchByTag = (searchText) =>{
        navigate('/search/tag', { state: { searchText, filter } })
        setSelectedButton('tag');
    };

    const openFeedDetail = (music) => {
        console.log("Selected music:", music);
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    const openPlaylistDetail = (result) => {
        navigate(`/playlistDetail/${result.nickName}/${result.id}`);
    }

    return (
        <div>
            <PC>
                <div className='search-filter-container'>
                    <div className='input-container d-flex ms-4 me-4' style={{ marginTop: '35px', marginBottom: '10px' }}>
                        <TextInput  value={searchText} onChange={handleInputChange} placeholder="검색어를 입력해보세요." size='large' searchIcon={IoIosSearch} closeIcon={searchText.length > 0 ? IoMdClose : null } onClose={() => setSearchText('')}  />
                    </div>
                    <div className='filter-buttons'>
                        <button className={`filterbtn ${selectedButton === 'all' ? 'selected' : ''}`}> 모두</button>
                        <button className={`filterbtn ${selectedButton === 'feed' ? 'selected' : ''}`}  onClick={() => goSearchByFeed({ searchText })}>게시글</button>
                        <button className={`filterbtn ${selectedButton === 'playlist' ? 'selected' : ''}`} onClick={() => goSearchByPlaylist({ searchText })}>플레이리스트</button>
                        <button className={`filterbtn ${selectedButton === 'tag' ? 'selected' : ''}`}  onClick={() => goSearchByTag({ searchText })} >태그</button>
                    </div>
                </div>

                <div className='result-container ms-4 me-4'>
                    <div>
                        {!searchText ?(
                            <div className="no-search-container">
                                <h3 className='mt-5 mb-2' style={{ textAlign: 'center' }}>인기 플레이리스트</h3>
                                <div className='row' >
                                    {plByLikes?.slice(0, 3).map((playlist) =>(
                                        <PlaylistCard key={playlist.id} playlist={playlist} onClick={openPlaylistDetail} />
                                    ) )}
                                </div>
                            </div>
                        ):(
                            
                        <>
                            <div className='user-container'>
                                <h3 style={{ textAlign: 'left' }}>사용자</h3>
                                    {userDetails?.length > 0 ? (
                                        <div className='row'>
                                            {userDetails.map((user, index) => (
                                                <div className='col-md-4' key={index}>
                                                    <Link to={`/profile/${user.nickName}`} className="profile-link" state={{ textDecorationLine: "none", color: "white" }}>
                                                        <div className="profile-card mb-2">
                                                            <div className="profile-img">
                                                                <img src={user.userImgSrc} alt={user.nick_name} className="profile-img-tag" />
                                                            </div>
                                                            <div className="profile-text">
                                                                <p className="profile-nickname">{user.nickName}</p>
                                                                <p className="profile-following"> 팔로워 {user.followerCnt}명 • 팔로잉 {user.followingCnt}명</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='no-results'>
                                            <div style={{ textAlign: 'center', color: '#aaa' }}>
                                                <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                                <p style={{ fontSize: '16px', marginBottom: '5px' }}>사용자 검색 결과가 없습니다.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            <hr/>


                                <div className='posts-container'>
                                    <h3 className='mt-4 mb-2' style={{ textAlign: 'left' }}>게시글</h3>
                                    {searchResult.filter(result => result.article_type === "FEED_TYPE").length > 0 ? (
                                        <div className='row'>
                                            {searchResult.filter(result => result.article_type === "FEED_TYPE").map((result) => (
                                                <PostCard key={result.id} music={transformMusicData(result)} onClick={() => openFeedDetail(result)} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-results">
                                            <div style={{ textAlign: 'center', color: '#aaa' }}>
                                                <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                                <p style={{ fontSize: '16px', marginBottom: '5px' }}>게시글 검색 결과가 없습니다.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            <hr />

                                <div className='playlists-container'>
                                    <h3 className='mt-4 mb-2' style={{ textAlign: 'left' }}>플레이리스트</h3>
                                    {searchResult.filter(result => result.article_type === "PLAYLIST_TYPE").length > 0 ? (
                                    <div className='row'>
                                        {searchResult.filter(result => result.article_type === "PLAYLIST_TYPE").slice(0, 6).map((result) => {
                                            const transformedData = transformPlaylistData(result);
                                            return (
                                                <PlaylistCard key={transformedData.id} playlist={transformedData} onClick={openPlaylistDetail} />
                                            );
                                        })}
                                    </div>
                                    ) : (
                                        <div className="no-results">
                                            <div style={{ textAlign: 'center', color: '#aaa' }}>
                                                <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                                <p style={{ fontSize: '16px', marginBottom: '5px' }}>플레이리스트 검색 결과가 없습니다.</p>
                                            </div>
                                            
                                        </div>
                                    )}
                                </div>
                            <hr />
                        </>
                    )}
                    </div>
                </div>

                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {setIsFeedDetailOpen(false);}}
                        music={selectedMusic}
                    />
                )}
            </PC>

            {/* <Mobile>
                <div>
                    <Navbar />
                    <div className='search-input d-flex' style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <input class="form-control me-2" type="text" placeholder="Search" value={searchText} onChange={handleInputChange} />
                        <button class="btn btn-outline-success" onClick={handleSearch}>Search</button>
                    </div>
                    <div>
                        <SearchResult searchText={searchText} searchResult={searchResult} />
                    </div>
                </div>
            </Mobile> */}
        </div>
    );
}

export default Search;