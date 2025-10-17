import { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from '../components/Responsive';
import axios from 'axios';
import Loading from '../components/Loading';
import { useRecoilState } from 'recoil';
import { currentVideoIndexAtom, currentVideoTitleAtom, playStateAtom, videoIdListAtom, videoPlaylistAtom } from '../state/MusicPlayerAtom';
import { currentPlayListIdAtom } from '../state/PlayListAtom';
import { useParams, Link } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMusicalNoteSharp} from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa6";
import PlayListEdit from '../components/Modal/PlayList/PlayListEdit';
import PlayListDelete from '../components/Modal/PlayList/PlayListDelete';
import '../style/css/PlayListDetail.css';
import '../style/css/Hashtag.css';

function PlayListDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const {nickName,playlistId } = useParams([]);
    const [videoIdList, setVideoIdList] = useRecoilState(videoIdListAtom);
    const [videoPlayList, setVideoPlayList] = useRecoilState(videoPlaylistAtom);
    const [playState, setPlayState] = useRecoilState(playStateAtom);
    const [currentVideoIndex, setCurrentVideoIndex] = useRecoilState(currentVideoIndexAtom); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useRecoilState(currentVideoTitleAtom); // 현재 재생 중인 동영상의 제목
    const [currentPlayListId, setCurrentPlayListId] = useRecoilState(currentPlayListIdAtom);
    const isThisPlayListPlaying = currentPlayListId === playlistId && playState;

    const [playlistData, setPlaylistData] = useState([]);
    const [musicInfoList, setMusicInfoList] = useState([]);
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ plLike, setPlLike] = useState(0);

    const [isPlayListEdit, setIsPlayListEdit] = useState(false);
    const [isPlayListDelete, setIsPlayListDelete] = useState(false);
    const [isMyPlaylist, setIsMyPlaylist]= useState(false);
    const userNickname = localStorage.getItem("nickName");
    const [animate, setAnimate] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기
        axios.get(`http://localhost:8080/api/playlist/user/${nickName}/${playlistId}`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ngrok-skip-browser-warning': '69420', // ngrok ERR_NGROK_6024 오류 관련 헤더
            },
        })
            .then((response) => {
                // console.log("서버에서 받아온 결과", response.data);
                const temp1 = response.data;
                setPlaylistData(temp1);

                const temp2 = response.data.musicInfoList;
                setMusicInfoList(temp2);

                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
            
            setIsMyPlaylist(userNickname === nickName);
    }, [nickName,userNickname, isLiked])

    // FIXME: 동작 로직 수정 필요 (두번째 클릭 시에 어떻게 동작할 지 수정해야함.)
    const addPlayList = () => {
        if (currentPlayListId !== playlistId) {
            setVideoIdList([]);
            setVideoPlayList([]);
            setCurrentPlayListId(playlistId); 
        }
        
        if (currentPlayListId === playlistId && playState) {
            setPlayState(false);
            return;
        }

        setVideoIdList((prev) => [...prev, ...musicInfoList.map(item => `https://www.youtube.com/watch?v=` + item.videoId)])
        setVideoPlayList((prev) => [...prev, ...musicInfoList])

        setCurrentVideoIndex(0);
        setCurrentVideoTitle(musicInfoList[0]?.musicTitle || '');
        setCurrentPlayListId(playlistId); 
        setPlayState(true);

        setAnimate(true);
        setTimeout(() => setAnimate(false), 700); // 애니메이션 지속 시간 후 제거
    }


    const clickNote =()=>{
        setIsNoteClicked(!isNoteClicked);
    }

    const handleLikeToggle = async () => {
        try {
            const url = `http://localhost:8080/api/playlist/${playlistId}/${isLiked ? 'unlike' : 'like'}`;
            const res = await axios.post(url, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
    
            if (res.status === 200) {
                setIsLiked(prev => !prev);
                setPlLike(prev => prev + (isLiked ? -1 : 1));
                console.log(isLiked ? '좋아요 취소 성공' : '좋아요 성공');
            }
        } catch (error) {
            console.error('좋아요 토글 실패:', error);
        }
    };
    

    const goPlayListEdit = ()=>{
        setIsPlayListEdit(true);
    };
    const goPlayListDelete = ()=>{
        setIsPlayListDelete(true);
    };
    
    const handleClick = ()=> {
        setIsToggled(!isToggled);
    }
    return (
        <div>
            <PC>
                <div >
                    {isMyPlaylist ? (
                        <div className='text-start mt-3' style={{ backgroundColor: 'rgba(0, 0, 0, 6)' }}>
                            <div className="pl-details">
                                <img className="plimg" src={playlistData.imageFileUrl} alt="cover" />

                                <div className="pltextbox">
                                    <div className='btn-group' style={{ width:""}}>
                                        <button className='editbtn' onClick={()=> goPlayListEdit()}><GrEdit className="icon"  /></button>
                                        <button className='delbtn' onClick={()=> goPlayListDelete()}><RiDeleteBinLine className="icon"/></button>
                                    </div>
                                    <span className="pltitle">{playlistData.title}</span>
                                    <div className='tags-container'>
                                        {playlistData.tagName?.map((tag, index) =>(
                                            <span key= {index} className='hashtag'>#{tag} </span>
                                        ))}
                                    </div>
                                    <span className="plcontents">{playlistData.contents}</span>
                                    <div className="plUserInfo">
                                        <Link to={`/profile/${playlistData.nickName}`} className="profile-link" style={{textDecorationLine: "none", color: "white"}}>
                                            <img src={playlistData.userImgSrc} style={{width:'25px', height:'25px', borderRadius:'50%', marginRight:'5px', background:'white'}}/>
                                            <span className='usernickname'> {playlistData.nickName} </span> 
                                        </Link> 
                                        <span>• {playlistData.musicInfoList?.length}곡 •</span>
                                        <div className='LikesTooltip' >
                                            <div className='tooltip-target'onClick={() => handleLikeToggle()}>
                                                <IoMusicalNoteSharp id={isLiked ? 'liked' : 'unliked'} size={22} style={{color: isLiked ? '#FEF164' : ''}}/>
                                                <span>{playlistData.plLike}</span>
                                                <span className='tooltip-text'>좋아요</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="plbtn-container">
                                        <button onClick={() => addPlayList()}>
                                            {isThisPlayListPlaying ? <FaPause /> : <FaPlay />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className='text-start mt-3' style={{ backgroundColor: 'rgba(0, 0, 0, 6)' }}>
                            <div className='pl-details'>
                                <img className='plimg' src={playlistData.imageFileUrl} alt='Playlist Image' />
                                
                                <div className='pltextbox'>
                                    <div className='pltextcontent'>
                                        <span className='pltitle'>{playlistData.title}</span>
                                            <div className='tags-container'>
                                                {playlistData.tagName?.map((tag, index) =>(
                                                    <span key= {index} className='hashtag'>#{tag} </span>
                                                ))}
                                            </div>
                                        <div className='plInfo'>
                                            <span className='plcontents'>{playlistData.contents}</span>
                                            <div className='plUserInfo'>
                                                <Link to={`/profile/${playlistData.nickName}`} className="profile-link" style={{textDecorationLine: "none", color: "white"}}>
                                                    <img src={playlistData.userImgSrc} style={{width:'25px', height:'25px', borderRadius:'50%', marginRight:'5px', background:'white'}}/>
                                                    <span className='usernickname'> {playlistData.nickName} </span> 
                                                </Link> 
                                                <span className='SongCount'>• {playlistData.musicInfoList? playlistData.musicInfoList.length : 0}곡 •</span>
                                                <div className='LikesTooltip' >
                                                    <div className='tooltip-target'onClick={() => handleLikeToggle()}>
                                                        <IoMusicalNoteSharp id={isLiked ? 'liked' : 'unliked'} size={22} style={{color: isLiked ? '#FEF164' : ''}}/>
                                                        <span>{playlistData.plLike}</span>
                                                        <span className='tooltip-text'>좋아요</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='plbtn-container d-flex justify-content-center mt-3 mb-3'>
                                    <button className={animate ? 'clicked' : ''} type="checkbox" checked={playState}  onClick={() => addPlayList()}>
                                        {isThisPlayListPlaying ? <FaPause /> : <FaPlay />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">  </th>
                                    <th scope="col">제목</th>
                                    <th scope="col">가수</th>
                                    <th scope="col">앨범</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <tr><td><Loading /></td></tr> : null}
                                {musicInfoList.map((music, index) => (
                                    <tr key={index}>
                                        <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                        <td >
                                            <img
                                                src={music.albumUrl}
                                                alt="앨범 이미지"
                                                style={{ verticalAlign: "middle", maxWidth: '50px', maxHeight: '50px' }}
                                            />
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicTitle }}></td>
                                        <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicArtist }}></td>
                                        <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.albumName }}></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>



                {isPlayListEdit&&(<PlayListEdit
                    playlistId={playlistId}
                    open={isPlayListEdit}
                    onClose={()=>{
                        setIsPlayListEdit(false);
                    }}
                />)}
                {isPlayListDelete&&(<PlayListDelete
                    playlistId={playlistId}
                    open={isPlayListDelete}
                    onClose={()=>{
                        setIsPlayListDelete(false);
                    }}
                />)}
            </PC>

            <Mobile>
                <div className='row'>
                    <div className='col-md-3'>
                        <Navbar />
                    </div>
                    <div className='col-md-9'>
                        <div>
                            <p>playlist image</p>
                            <h2>{playlistData.title}</h2>
                        </div>
                        <div className='d-flex justify-content-center mt-3 mb-3'>
                            <button className='btn btn-primary btn-sm' onClick={() => addPlayList()}>재생</button>
                        </div>
                        <div className='ms-3 me-3'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">제목</th>
                                        <th scope="col"></th>
                                        <th scope="col">가수</th>
                                        <th scope="col">앨범</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? <tr><td><Loading /></td></tr> : null}
                                    {musicInfoList.map((music, index) => (
                                        <tr key={index}>
                                            <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={music.albumUrl}
                                                    alt="앨범 이미지"
                                                    style={{ verticalAlign: "middle", maxWidth: '50px', maxHeight: '50px' }}
                                                />
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicTitle }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.musicArtist }}></td>
                                            <td style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: music.albumName }}></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default PlayListDetail;