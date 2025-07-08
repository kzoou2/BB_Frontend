import "../../style/css/PostCard.css"

function PostCard({ music, onClick, postListLength }){
    if (!music || !music.musicInfoList || music.musicInfoList.length === 0) {
        return null; // 데이터가 없을 경우 안전 처리
    }

    const { musicInfoList, feedImgSrc } = music;
    const { musicTitle, musicArtist, albumName, albumUrl, releaseDate } = musicInfoList[0];
const isOnlyOne = postListLength === 1;

    return (
        <div className={isOnlyOne ? "col-md-5" : "col-md-3"}  style={{ cursor: "pointer" }}>
            <div className="Post-card mb-3" onClick={() => onClick(music)}>
                <div className="Post-img">
                    <img 
                        className="Post-feedImgSrc"
                        src={feedImgSrc || albumUrl} // feedImgSrc가 없으면 albumUrl 사용
                        alt={`Album cover for ${musicTitle}`} 
                    />
                </div>
                <div className="Post-content">
                    <span className="Post-title">{musicTitle}</span>
                    <p className="Post-Artist">{musicArtist}</p>
                    <p className="Post-albumName">{albumName}</p>
                    <p className="Post-date">{releaseDate}</p>
                </div>
            </div>
        </div>

    );
};

export default PostCard;