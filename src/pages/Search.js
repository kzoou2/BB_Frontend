import React, { useState } from 'react';
import Navbar from './navbar';
import { Mobile, PC } from '../components/Responsive';
import sample_music from '../Data/sample_music.json';
import RecentSearch from '../components/Search/RecentSearch';
import SearchResult from '../components/Search/SearchResult';

function Search() {
    const data = sample_music;
    const [searchText, setSearchText] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [filter, setFilter] = useState("all");

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        // setSearchResult([searchText]);
        const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResult(filteredData);

        setRecentSearches((prevSearches) => [searchText, ...prevSearches.slice(0, 4)]);
    };

    const handleRecentSearchClick = (recentSearches) => {
        setSearchText(recentSearches);
        handleSearch();
    };

    const handleDeleteRecent = () => {
        setRecentSearches([]);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-1'>
                        {/* <Navbar/> */}
                    </div>
                    <div className='col-md-3' style={{ borderRight: '1px solid #ddd' }}>
                        <RecentSearch
                            recentSearches={recentSearches}
                            handleRecentSearchClick={handleRecentSearchClick}
                            handleDeleteRecent={handleDeleteRecent}
                        />
                    </div>
                    <div className='col-md-7'>
                        <div className='search-input d-flex' style={{ marginTop: '30px', marginBottom: '30px' }}>
                            <input class="form-control me-2" type="text" placeholder="Search" value={searchText} onChange={handleInputChange} />
                            <button class="btn btn-outline-success" onClick={handleSearch}>Search</button>
                        </div>
                        <div>
                            <div className='filter-buttons'>
                                <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('all')}>모두</button>
                                <button className={`btn ${filter === 'posts' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('posts')}>게시글</button>
                                <button className={`btn ${filter === 'playlists' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('playlists')}>플레이리스트</button>
                                <button className={`btn ${filter === 'tags' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('tags')}>태그</button>
                            </div>
                        </div>
                        <div>
                            <SearchResult searchText={searchText} searchResult={searchResult} filter={filter} />
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
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
            </Mobile>
        </div>
    );
}

export default Search;