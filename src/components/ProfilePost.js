import React, { useEffect, useState } from 'react';
import {PC,Mobile} from '../components/Responsive';
import sample_music from "../Data/sample_music.json";
import FeedDetail from '../Modal/Feed/FeedDetail';


function ProfilePost({postCount, setPostCount}) {
    const data = sample_music.slice(0,15);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isFeedDetailOpen, setIsFeedDetailOpen] = useState(false);


    const openFeedDetail = (music) => {
        setSelectedMusic(music);
        setIsFeedDetailOpen(true);
    }

    useEffect(()=> {
        setPostCount(data.length);
    },[data, setPostCount]);

    return(
        <div>
            <PC>
                <div className='row'>
                    {data.map((music) => (
                        <div className='col-md-4' key={music.id}>
                            <div className='card-header'>
                                <img className=''style={{width:'150px', height:'150px', cursor: 'pointer'}} src={music.album_cover} 
                                onClick={() => openFeedDetail(music)} alt={`Album cover for ${music.title}`}>
                                </img>
                            </div>
                            <div className='card-body'>
                                <div>
                                    <b>{music.title}</b>
                                </div>
                                <b> · </b>
                                <div>
                                    <b>{music.artist}</b>
                                </div>
                                <p style={{ fontSize: '12px', color: 'gray' }}>{music.album} · {music.release_year}</p>
                            </div> 

                        </div>
                    ))}
                </div>
                {isFeedDetailOpen && (
                    <FeedDetail
                        open={isFeedDetailOpen}
                        onClose={() => {
                            setIsFeedDetailOpen(false);
                        }}
                        music={selectedMusic}
                    />
                )}
            </PC>

            <Mobile>
                <h1>ProfilePost</h1>
            </Mobile>
        </div>



    );
}

export default ProfilePost;