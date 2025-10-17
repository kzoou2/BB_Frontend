import React, {useEffect, useState} from 'react';
import axios from "axios";
import { PC,Mobile } from '../Responsive';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import '../../style/css/Search.css';
import TextInput from '../Common/TextInput';
import PostCard from '../Common/PostCard';
import PlaylistCard from '../Common/PlaylistCard';
import FeedDetail from '../Modal/Feed/FeedDetail';
import { IoIosSearch,IoMdClose } from "react-icons/io";
import { TbMoodCry } from 'react-icons/tb';

function SearchByTag({searchText: initialSearchText, filter}){
    const navigate = useNavigate();
    const location = useLocation();
    const [searchText, setSearchText] = useState(initialSearchText || '');
    const [tagResult, setTagResult] = useState([]);
    const [selectedButton, setSelectedButton] = useState('tag');

    useEffect(() => {
        const SearchTag = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/search/total/Keyword', {
                    params: {
                        keyword: searchText,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });
                setTagResult(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("검색 중 오류 발생", error);
            }
        };

        if (searchText.trim() !== '') {
            SearchTag();
        } else {
            setTagResult([]);
        }
    }, [searchText]);

    useEffect(() => {
        // location에서 searchText와 filter 값을 추출하여 state 업데이트
        const { searchText } = location.state || {};
        setSearchText(typeof searchText === 'string' ? searchText.trim() : '');
    }, [location]);

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
    

    const handleInputChange = (e)=>{
        setSearchText(e.target.value);
    }

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

    const openPlaylistDetail = (result) => {
        navigate(`/playlistDetail/${result.nickName}/${result.id}`);
    }


    return(
        <div>
            <PC>
                <div className='search-filter-container'>
                    <div className='search-input d-flex ms-4 me-4' style={{ marginTop: '35px', marginBottom: '10px' }}>
                        <TextInput  value={searchText} onChange={handleInputChange} placeholder="검색어를 입력해보세요." size='large' searchIcon={IoIosSearch} closeIcon={searchText.length > 0 ? IoMdClose : null } onClose={() => setSearchText('')}  />
                    </div>
                    <div className='filter-buttons' >
                        <button className={`filterbtn ${selectedButton === 'all' ? 'selected' : ''}`}  onClick={() => goSearchByAll(searchText)}>모두</button>
                        <button className={`filterbtn ${selectedButton === 'feed' ? 'selected' : ''}`}  onClick={() => goSearchByFeed(searchText)}>게시글</button>
                        <button className={`filterbtn ${selectedButton === 'playlist' ? 'selected' : ''}`}  onClick={() => goSearchByPlaylist(searchText)}>플레이리스트</button>
                        <button className={`filterbtn ${selectedButton === 'tag' ? 'selected' : ''}`} onClick={() => goSearchByTag(searchText)}>태그</button>
                    </div>
                </div>
                


                <div className="result-container ms-4 me-4">
                    <div className='posts-container'>
                        <h3 style={{textAlign:'left'}}>게시글</h3>
                        <div className='row'>
                            {tagResult.filter(result => result.article_type === "FEED_TYPE").length > 0 ? (
                                tagResult.map((result) =>{
                                if(result.article_type === "FEED_TYPE"){
                                    return(
                                        <PostCard key={result.id} music={transformMusicData(result)} />)
                                }
                                return null;
                            })
                        ):(
                            <div className="no-results">
                                <div style={{ textAlign: 'center', color: '#aaa' }}>
                                <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                <p style={{ fontSize: '16px', marginBottom: '5px' }}>게시글 검색 결과가 없습니다.</p>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <hr />

                    <div className='playlists-container'>
                        <h3 className='mt-4 mb-2' style={{textAlign:'left'}}>플레이리스트</h3>
                        <div className='row'>
                            {tagResult.filter(result => result.article_type === "PLAYLIST_TYPE").length > 0 ? (
                                tagResult.map((result) => {
                                const transformedData = transformPlaylistData(result);
                                if (result.article_type === "PLAYLIST_TYPE") {
                                    return (
                                        <PlaylistCard key={transformedData.id} playlist={transformedData} onClick={openPlaylistDetail}/>);
                                }
                                return null; 
                            })
                        ):(
                            <div className="no-results">
                                <div style={{ textAlign: 'center', color: '#aaa' }}>
                                <TbMoodCry size={40} style={{ marginBottom: '10px', color: '#888' }} />
                                <p style={{ fontSize: '16px', marginBottom: '5px' }}>플레이리스트 검색 결과가 없습니다.</p>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <hr />
                    
                </div>
                
            </PC>
            <Mobile></Mobile>
        </div>
    );
}

export default SearchByTag;