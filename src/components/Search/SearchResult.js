import React, { useEffect, useState } from "react";
import { PC, Mobile } from "../Responsive";
import FeedDetail from "../Modal/Feed/FeedDetail";
import axios from "axios";

const SearchResult = ({ searchText, filter }) =>{
    const [searchResult, setSearchResult] = useState([]); //검색결과
    const [userDetails, setUserDetails] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);

    const filteredResult = () => {
        if (filter === 'all') {
            return searchResult;
        } else if (filter === 'post') {
            return searchResult.filter(result => result.article_type === 'FEED_TYPE');
        } else if (filter === 'playlist') {
            return searchResult.filter(result => result.article_type === 'PLAYLIST_TYPE');
        } else if (filter === 'user') {
            return userDetails;
        } else {
            // 다른 필터 추가 가능
            return [];
        }
    };

    const fetchUserDetails = async (nick_name) => {
        console.log("요청 보내는 nick_name 값:", nick_name);
        try {
            const res= await axios.get('http://localhost:8080/api/search/users/nickname',{
                params:{
                    nickname: nick_name,
                },
                headers:{
                    'ngrok-skip-browser-warning': '69420' 
                }
            });
            console.log("유저정보", res.data);
            setUserDetails(res.data);
        } catch (error) {
            console.error("유저 정보 오류 발생", error);
        }
    };
    
    
    useEffect(()=>{
        const SearchData = async ()=>{
            if (!searchText.trim()) {
                setSearchResult([]);
                return;
            }
            try{
                console.log("User input:", searchText);
                const res = await axios.get('http://localhost:8080/api/search/total/Keyword',{
                    params: {
                        keyword: searchText,
                    },
                    headers:{
                        'ngrok-skip-browser-warning': '69420' 
                    }
                });
                setSearchResult(res.data);
                console.log("데이터", res.data);
                
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
            // searchText 값이 없을 때 빈 배열로 설정
            setSearchResult([]);
        }

    }, [searchText]);

    // const openFeedDetail ()=>{
    //     setIs
    // }
    
    return(
        <div>
            <PC>
                <div className='search-result mt-5'>
                    <div className='searchText-'>
                        <p>{searchText && `검색어: ${searchText}`}</p>
                        {/* <p>{searchResult.length > 0 && `검색 결과: ${searchResult.length}개`}</p> */}
                    </div>
                    <div className='result-container'>

                        {filter === 'all' && (
                            <>
                            <div>
                                <div className='users-container'>
                                    <h3>사용자</h3>
                                    {userDetails?.map((user, index) => (
                                        <div key={index}>
                                            <p><img src={user.user_img_src} alt={user.nick_name} style={{width: '30px', height: '30px',borderRadius:'50%', marginRight:'10px'  }} />
                                            {` ${user.nick_name}`}</p>
                                        </div>
                                    ))}
                                </div>
                                <hr />

                                <div className='posts-container'>
                                    <h3>게시글</h3>
                                    <div className='row'>
                                        {filteredResult().map((result) => {
                                            if(result.article_type === 'FEED_TYPE'){
                                                return(
                                                    <div className="col-md-3" key={result.id}>
                                                        <div className="card mb-2"  style={{backgroundColor: "#242424", color: "white"}}>

                                                            <div className="card-body"  style={{backgroundColor: "#242424", color: "white"}}>
                                                                <div>
                                                                    {result.img_src !== null ? (
                                                                        <img
                                                                            className="mb-3"
                                                                            src={result.img_src}
                                                                            alt={result.album_name}
                                                                            style={{ width: '150px', height: 'auto' }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            className="mb-3"
                                                                            src={result.f_album_url}
                                                                            alt={result.album_name}
                                                                            style={{ width: '150px', height: 'auto' }}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="musicInfo">
                                                                    <p>{result.f_music_title}</p>
                                                                    <p>{result.music_artist}</p>
                                                                </div>
                                                                <div className="UserInfo">
                                                                    <p><img className="" src={result.user_img_src} alt={result.nick_name} style={{width: '30px', height: '30px',borderRadius:'50%', marginRight:'10px'  }}/>{result.nick_name}</p>
                                                                </div>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                                <hr />

                                <div className='playlists-container'>
                                    <h3>플레이리스트</h3>
                                    <div className='row'>
                                        {filteredResult().map((result) => {
                                            if (result.article_type === "PLAYLIST_TYPE") {
                                                return (
                                                <div className="col-md-3" key={result.id}>
                                                    <div className="card mb-2" style={{backgroundColor: "#242424", color: "white"}}>
                                                        <div className="card-body">
                                                            <div>
                                                                <img className="mb-3" src={result.img_src} alt={result.title} style={{ width: '150px', height: 'auto' }} />
                                                            </div>
                                                            <p>{result.title}</p>
                                                            <div className="UserInfo">
                                                                <p><img className="" src={result.user_img_src} alt={result.nick_name} style={{width: '30px', height: '30px',borderRadius:'50%', marginRight:'10px'  }}/>{result.nick_name}</p>
                                                            </div>  
                                                            <p style={{backgroundColor:'#fedc00ff', color:'black', width:'50px', borderRadius:'30px', fontSize:'12px'}}>{result.tag_name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                );
                                            }
                                            return null; 
                                        })}
                                    </div>
                                </div>
                                <hr />

                                {/* <div className='tags-container'>
                                    <h3>태그</h3>
                                    <div className='tags'>
                                        <ul>
                                            {filteredResult
                                                .filter(result => result.type === 'tags')
                                                .map((result, index) => (
                                                    <li key={index}>{result.title}</li>
                                                ))}
                                        </ul>   
                                    </div>
                                    
                                </div> */}
                            </div>
                            </>
                        )}
                        {filter !== 'all' && (
                            <div>
                                <ul>
                                    {filteredResult.map((result, index) => (
                                        <li key={index}>{result.title}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </PC>

            {/* <Mobile>
                <div className='search-result mt-5'>
                    <div className='searchText-'>
                        <p>{searchText && `검색어: ${searchText}`}</p>
                        <p>{searchResult.length > 0 && `검색 결과: ${searchResult.length}개`}</p>
                    </div>
                    <div>
                        <ul>
                        {searchResult.map((result, index) => (
                            <li key={index}>{result.title}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </Mobile> */}
        </div>
    );
};

export default SearchResult;