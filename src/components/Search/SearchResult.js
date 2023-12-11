import React from "react";
import { PC, Mobile } from "../Responsive";

const SearchResult = ({ searchText, searchResult, filter }) =>{
    const filteredResult = searchResult.filter(result => {
        if (filter ===  'all') return true;
        if (filter === 'posts') return result.type === 'post';
        if (filter === 'playlists') return result.type === 'playlist';
        if (filter === 'tags') return result.type ==='tags';
        return true;
    })
    return(
        <div>
            <PC>
                <div className='search-result mt-5'>
                    <div className='searchText-'>
                        <p>{searchText && `검색어: ${searchText}`}</p>
                        <p>{searchResult.length > 0 && `검색 결과: ${searchResult.length}개`}</p>
                    </div>
                    <div className='result-container'>
                        {filter === 'all' && (
                            <>
                                <div className='posts-container'>
                                    <h3>게시글</h3>
                                    <div className='posts'>
                                        <ul>
                                            {filteredResult
                                                .filter(result => result.type === 'post')
                                                .map((result, index) => (
                                                    <li key={index}>{result.title}</li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <hr />

                                <div className='playlists-container'>
                                    <h3>플레이리스트</h3>
                                    <div className='playlists'>
                                        <ul>
                                            {filteredResult
                                                .filter(result => result.type === 'playlist')
                                                .map((result, index) => (
                                                    <li key={index}>{result.title}</li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <hr />

                                <div className='tags-container'>
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

            <Mobile>
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
            </Mobile>
        </div>
    );
};

export default SearchResult;