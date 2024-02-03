import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { Mobile, PC } from '../components/Responsive';
import RecentSearch from '../components/Search/RecentSearch';
import SearchResult from '../components/Search/SearchResult';
import axios from 'axios';
import MiniPlayer from '../components/Player/MiniPlayer';

function Search() {
    const [searchText, setSearchText] = useState(''); //검색
    // const [searchResult, setSearchResult] = useState([]); //검색결과
    const [isLoading, setIsLoading] = useState(true);
    // const [recentSearches, setRecentSearches] = useState([]);  //최근검색기록
    const [filter, setFilter] = useState("all");


    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        setSearchText(searchText);
    }; 
    
    // const handleSearch = async ()=>{
    //     try{
    //         console.log("User input:", searchText);
    //         const res = await axios.get('http://localhost:8080/api/search/total/Keyword',{
    //             params: {
    //                 // Keyword: encodeURIComponent(searchText),
    //                 keyword: searchText,
    //             },
    //             headers:{
    //                 'ngrok-skip-browser-warning': '69420' 
    //             }
    //         });
    //         console.log("데이터", res.data);
    //         setSearchResult(res.data.results);
    //     } catch(error){
    //         console.error("검색 중 오류 발생", error);
    //     }
    // };


    
    // const handleRecentSearchClick = (recentSearches) => {
    //     setSearchText(recentSearches);
    //     handleSearch();
    // };

    // const handleDeleteRecent = () => {
    //     setRecentSearches([]);
    // };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }


    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-2'>
                        <Navbar/>
                    </div>

                    <div className='col-md-8'>
                        <div className='search-input d-flex' style={{ marginTop: '30px', marginBottom: '30px' }}>
                            <input class="form-control me-2" type="text" placeholder="Search" value={searchText} onChange={handleInputChange} />
                            {/* <button class="btn btn-outline-success" onClick={handleSearch}>Search</button> */}
                        </div>
                        <div>
                            {/* <div className='filter-buttons'>
                                <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('all')}>모두</button>
                                <button className={`btn ${filter === 'posts' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('posts')}>게시글</button>
                                <button className={`btn ${filter === 'playlists' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('playlists')}>플레이리스트</button>
                                <button className={`btn ${filter === 'tags' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('tags')}>태그</button>
                            </div> */}
                        </div>
                        <div>
                            <SearchResult searchText={searchText} filter={filter} />

                            {/* <ul>
                                {searchResult && 
                                    searchResult.map((result) => (
                                    <div key={result.id}>
                                        <p>{result.music_title}</p>
                                        <p>{result.album_name}</p>
                                        <p>{result.music_artist}</p>
                                        <img src={result.album_url} alt={result.music_title} />
                                    </div>
                                ))}
                            </ul> */}
                        </div>
                    </div>

                    <div className='col-md-2'>
                        <MiniPlayer/>
                    </div>

                </div>
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