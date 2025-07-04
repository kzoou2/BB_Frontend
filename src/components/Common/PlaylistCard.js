import React from "react";
import "../../style/css/PlayList.css"

function PlaylistCard ({ playlist, onClick }){
    
    return(
        <div className="col-md-4">
            <div className="PL-card mb-3" onClick={() => onClick(playlist)}>
                <div className="PL-img">
                    <img src={playlist.imageFileUrl} alt={playlist.title} />
                    <span className="PL-likes">{`${playlist.plLike} Likes `}</span>
                </div>
                
                <div className="PL-content">
                    <img className="PL-avatar" src={playlist.userImgSrc ?? playlist.img_src} alt="User" />
                    <div className="PL-text">
                        <span className="PL-title">{playlist.title}</span>
                        <div className="PL-user">
                            <span className="PL-username">{playlist.nickName}</span>
                        </div>
                    </div>
                </div>
                <div className="PL-hashtags">
                    <div className="tags-container">
                        {playlist.tagName.slice(0, 3).map((tag, index) => (
                            <span key={index} className="hashtag">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;