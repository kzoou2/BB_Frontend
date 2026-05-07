import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { PC, Mobile } from "../Responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../style/css/Search.css';
import PlaylistCard from "../Common/PlaylistCard";
import TextInput from "../Common/TextInput";
import { IoIosSearch,IoMdClose } from "react-icons/io";
import { TbMoodCry} from "react-icons/tb"

function SearchByPlaylist ({searchText: initialSearchText, filter}){
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState(initialSearchText || '');
    const [playlistResult, setPlaylistResult] = useState([]);
    const [selectedButton, setSelectedButton] = useState('playlist');

    useEffect(() => {
        // location에서 searchText와 filter 값을 추출하여 state 업데이트
        const { searchText } = location.state || {};
        setSearchText(typeof searchText === 'string' ? searchText.trim() : '');
    }, [location]);


    const handleInputChange = (e) => {
        // setPlSearch(e.target.value);
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const SearchPlaylist = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/search/playlist/Keyword', {
                    params: {
                        keyword: searchText,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });
                setPlaylistResult(res.data);
            } catch (error) {
                console.error("검색 중 오류 발생", error);
            }
        };

        if (searchText.trim() !== '') {
            SearchPlaylist();
        } else {
            setPlaylistResult([]);
        }
    }, [searchText]);

    const transformPlaylistData = (result) => ({
        id: result.playlist_id,
        imageFileUrl: result.img_src,
        plLike: result.likes ?? 0,  
        title: result.title,
        userImgSrc: result.user_img_src,
        nickName: result.nick_name,
        tagName: Array.isArray(result.tag_name) ? result.tag_name : [result.tag_name] 
    });

    const goSearchByAll = (searchText) => {
        navigate('/search', { state: { searchText, filter } })
        setSelectedButton('all');
    };
    const goSearchByFeed = (searchText) => {
        navigate('/search/feed', { state: { searchText, filter } })
        setSelectedButton('feed');
    };

    const goSearchByPlaylist = (searchText) => {
        navigate('/search/playlist', { state: { searchText, filter } })
        setSelectedButton('playlist');
    };

    const goSearchByTag = (searchText) => {
        navigate('/search/tag', { state: { searchText, filter } })
        setSelectedButton('tag');
    };

    const openPlaylistDetail = (result) => {;
        navigate(`/playlistDetail/${result.nickName}/${result.id}`);
    }

    return(
        <div>
            <PC>
                <div className="search-filter-container">
                    <div className='search-input d-flex ms-4 me-4' style={{ marginTop: '35px', marginBottom: '10px' }}>
                        <TextInput  value={searchText} onChange={handleInputChange} placeholder="검색어를 입력해보세요." size='large' searchIcon={IoIosSearch} closeIcon={searchText.length > 0 ? IoMdClose : null } onClose={() => setSearchText('')}  />
                    </div>
                    <div className='filter-buttons' >
                        <button className={`filterbtn ${selectedButton === 'all' ? 'selected' : ''}`}  onClick={() => goSearchByAll(searchText)}>모두</button>
                        <button className={`filterbtn ${selectedButton === 'feed' ? 'selected' : ''}`}  onClick={() => goSearchByFeed(searchText)}>게시글</button>
                        <button className={`filterbtn ${selectedButton === 'playlist' ? 'selected' : ''}`} onClick={() => goSearchByPlaylist(searchText)}>플레이리스트</button>
                        <button className={`filterbtn ${selectedButton === 'tag' ? 'selected' : ''}`} onClick={() => goSearchByTag(searchText)}>태그</button>
                    </div>
                </div>
                

                <div className="Playlist-result ms-4 me-4">
                    <h3 style={{textAlign:'left'}}> 플레이리스트 </h3>
                        <hr />
                    <div className="result-container">
                        <div className="row">
                            {playlistResult.length > 0 ? (
                                playlistResult?.map((result) => (
                                    <PlaylistCard key={result.id} playlist={transformPlaylistData(result)} onClick={openPlaylistDetail} />
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', width: '100%', padding: '40px 20px', color: '#aaa' }}>
                                    <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                    <p style={{ fontSize: '16px', marginBottom: '5px' }}>검색 결과가 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </PC>
            <Mobile></Mobile>
        </div>
    );
}

export default SearchByPlaylist;