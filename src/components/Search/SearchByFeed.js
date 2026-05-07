import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PC, Mobile } from "../Responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../style/css/Search.css';
import PostCard from "../Common/PostCard";
import TextInput from "../Common/TextInput";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { TbMoodCry } from "react-icons/tb";

function SearchByFeed({ searchText: initialSearchText, filter }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState(initialSearchText || '');
    const [feedResult, setFeedResult] = useState([]);
    const [selectedButton, setSelectedButton] = useState('feed');
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);



    useEffect(() => {
        // location에서 searchText와 filter 값을 추출하여 state 업데이트
        const { searchText } = location.state || {};
        setSearchText(typeof searchText === 'string' ? searchText.trim() : '');
    }, [location]);

    useEffect(() => {
        const SearchFeed = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/search/feed/Keyword', {
                    params: {
                        keyword: searchText,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });
                console.log("피드검색", res.data)
                setFeedResult(res.data);
            } catch (error) {
                console.error("검색 중 오류 발생", error);
            }
        };
        if (searchText.trim() !== '') {
            SearchFeed();
        } else {
            setFeedResult([]);
        }
    }, [searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    //FIXME:feedDetail 연결 수정
    const openFeedDetail = (music)=>{
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    const transformFeedData = (result) => {
        return {
            id: result.id,
            feedImgSrc: result.img_src,
            musicInfoList: [
                {
                    musicTitle: result.music_title,
                    musicArtist: result.music_artist,
                    albumUrl: result.album_url,
                    albumName: result.album_name,
                    releaseDate: result.release_date
                }
            ]
        };
    };

    const goSearchByAll = (searchText) => {
        navigate('/search', { state: { searchText, filter } })
        setSelectedButton('all');
    };
    const goSearchByFeed = (searchText) => {
        navigate('/search/feed', { state: { searchText, filter } })

    };

    const goSearchByPlaylist = (searchText) => {
        navigate('/search/playlist', { state: { searchText, filter } })

    };

    const goSearchByTag = (searchText) => {
        navigate('/search/tag', { state: { searchText, filter } })

    };



    return (
        <div>
            <PC>
                <div className="search-filter-container">
                    <div className='search-input d-flex ms-4 me-4' style={{ marginTop: '35px', marginBottom: '10px' }}>
                        <TextInput  value={searchText} onChange={handleInputChange} placeholder="검색어를 입력해보세요." size='large' searchIcon={IoIosSearch} closeIcon={searchText.length > 0 ? IoMdClose : null } onClose={() => setSearchText('')}  />
                    </div>
                    <div className='filter-buttons'>
                        <button className={`filterbtn ${selectedButton === 'all' ? 'selected' : ''}`} onClick={() => goSearchByAll(searchText)}>모두</button>
                        <button className={`filterbtn ${selectedButton === 'feed' ? 'selected' : ''}`} onClick={() => goSearchByFeed(searchText)}>게시글</button>
                        <button className={`filterbtn ${selectedButton === 'playlist' ? 'selected' : ''}`} onClick={() => goSearchByPlaylist(searchText)}>플레이리스트</button>
                        <button className={`filterbtn ${selectedButton === 'tag' ? 'selected' : ''}`} onClick={() => goSearchByTag(searchText)}>태그</button>
                    </div>
                </div>
                

                <div className="Playlist-result ms-4 me-4" >
                    <h3 style={{textAlign:'left'}}> 게시글 </h3>
                    <hr />
                    <div className="result-container ">
                        <div className="row">
                            {feedResult.length > 0 ? (
                                feedResult?.map((result) => (
                                    <PostCard key={result.id} music={transformFeedData(result)} onClick={() =>  openFeedDetail(transformFeedData(result))} />
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
                
                {/* FIXME:feedDetail 연결 수정 */}
                {/* {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                        musicId={selectedMusic.id}
                    />
                )} */}
            </PC>
            <Mobile></Mobile>
        </div>
    );
}

export default SearchByFeed;