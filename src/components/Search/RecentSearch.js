import React, { useState } from "react";
import { Mobile, PC } from "../Responsive";

const RecentSearch =({ recentSearches, handleRecentSearchClick, handleDeleteRecent}) =>{
    
    return(
        <div>
            <PC>
                <div className="RecentSeach-container" style={{ marginTop:'10%'}}>
                    <div className="RS-Header" style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <b>최근 검색 항목</b>
                        <button style={{ color: "blue"}} onClick={handleDeleteRecent}> 모두지우기 </button>
                    </div>
                    <hr/>
                    <div className='recentSearch-result'>
                        <ul>
                            {recentSearches.map((search, index) => (
                            <li key={index} onClick={() => handleRecentSearchClick(search)}>
                                {search}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className="RecentSeach-container" style={{ marginTop:'10%'}}>
                    <div className="RS-Header" style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <b>최근 검색 항목</b>
                        <button style={{ color: "blue"}} onClick={handleDeleteRecent}> 모두지우기 </button>
                    </div>
                    <hr/>
                    <div className='recentSearch-result'>
                        <ul>
                            {recentSearches.map((search, index) => (
                            <li key={index} onClick={() => handleRecentSearchClick(search)}>
                                {search}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Mobile>
        </div>

    );
};


export default RecentSearch;


