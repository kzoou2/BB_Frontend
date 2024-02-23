import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { PC, Mobile } from '../components/Responsive';
import axios from 'axios';
import Loading from '../components/Loading';
import { useRecoilState } from 'recoil';
import { currentVideoIndexAtom, currentVideoTitleAtom, playStateAtom, videoIdListAtom, videoPlaylistAtom } from '../state/MusicPlayerAtom';
import { useParams } from 'react-router-dom';
import MiniPlayer from '../components/Player/MiniPlayer';
import '../style/css/PlayListDetail.css';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import PlayListSearchEdit from '../components/Modal/PlayList/PlayListSearchEdit';
import PlayListEdit from '../components/Modal/PlayList/PlayListEdit';
import PlayListDelete from '../components/Modal/PlayList/PlayListDelete';

function PlayListDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const {nickName,playlistId } = useParams([]);
    const [videoIdList, setVideoIdList] = useRecoilState(videoIdListAtom);
    const [videoPlayList, setVideoPlayList] = useRecoilState(videoPlaylistAtom);
    const [playState, setPlayState] = useRecoilState(playStateAtom);
    const [currentVideoIndex, setCurrentVideoIndex] = useRecoilState(currentVideoIndexAtom); // 현재 재생 중인 동영상의 인덱스
    const [currentVideoTitle, setCurrentVideoTitle] = useRecoilState(currentVideoTitleAtom); // 현재 재생 중인 동영상의 제목

    const [playlistData, setPlaylistData] = useState([]);
    const [musicInfoList, setMusicInfoList] = useState([]);
    const [isNoteClicked, setIsNoteClicked] = useState(false);
    const [isPlayListEdit, setIsPlayListEdit] = useState(false);
    const [isPlayListDelete, setIsPlayListDelete] = useState(false);
    const [isMyPlaylist, setIsMyPlaylist]= useState(false);
    const userNickname = localStorage.getItem("nickName");

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
                console.log("서버에서 받아온 결과", response.data);
                const temp1 = response.data;
                setPlaylistData(temp1);

                const temp2 = response.data.musicInfoList;
                setMusicInfoList(temp2);
                console.log(temp2)

                setIsLoading(false); // API 호출이 완료되면 false로 변경하여 로딩화면 숨김처리
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
            
            setIsMyPlaylist(userNickname === nickName);
    }, [nickName,userNickname])

    // FIXME: 동작 로직 수정 필요 (두번째 클릭 시에 어떻게 동작할 지 수정해야함.)
    const addPlayList = () => {
        if (videoIdList.length !== 0) {
            setVideoIdList([])
            setVideoPlayList([])
        }

        setVideoIdList((prev) => [...prev, ...musicInfoList.map(item => `https://www.youtube.com/watch?v=` + item.videoId)])
        setVideoPlayList((prev) => [...prev, ...musicInfoList])
        setPlayState(!playState);

        // 만약 재생 중이지 않다면 첫 번째 동영상을 재생
        if (!playState && currentVideoIndex === null) {
            setCurrentVideoIndex(0);
            setCurrentVideoTitle(videoPlayList[0].musicTitle);
        }
    }

    const goPlayListEdit = ()=>{
        setIsPlayListEdit(true);
    };
    const goPlayListDelete = ()=>{
        setIsPlayListDelete(true);
    };

    return (
        <div>
            <PC>
                <div className='row'>
                    <div className='col-md-2'>
                        <Navbar />
                    </div>
                    <div className='col-md-8' style={{maxHeight: "100vh", overflow: "scroll"}}>
                        {isMyPlaylist ? (
                            <div className='text-start mt-3' style={{ backgroundColor: 'rgba(0, 0, 0, 6)' }}>
                                <div className='plcard'>
                                    <img className='plimg' src={playlistData.imageFileUrl} alt='Playlist Image' />
                                    
                                    <div className='pltextbox'>
                                        <div className='edbtn' style={{ width:""}}>
                                            <button className='editbtn' onClick={()=> goPlayListEdit()}><GrEdit id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer" }} /></button>
                                            <button className='delbtn' onClick={()=> goPlayListDelete()}><RiDeleteBinLine id={`${isNoteClicked ? 'clicked' : 'unclicked'}`} style={{ cursor: "pointer" }} /></button>
                                        </div>
                                        <div className='pltextcontent'>
                                            <h2>{playlistData.title}</h2>
                                            <div className='plInfo'>
                                                <div className='contents'>{playlistData.contents}</div>
                                                <div className='userInfo'><img src={playlistData.userImgSrc} style={{width:'25px', height:'25px', borderRadius:'50%', marginRight:'10px', background:'white'}}/>
                                                {playlistData.nickName} ·  좋아요 {playlistData.plLike} · 총 {playlistData.musicInfoList? playlistData.musicInfoList.length : 0}곡</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TODO: 플리 설명, 작성자, 종아요 수(해보고), 총 곡 수*/}

                                    <div className='d-flex justify-content-center mt-3 mb-3'>
                                        <div className="plbtn-container">
                                            <label className="play-btn play-icon-label">
                                                <input className="play-btn" type="checkbox"  onClick={() => addPlayList()}/>
                                                <div className="play-icon"></div>
                                                <div className="pause-icon"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className='text-start mt-3' style={{ backgroundColor: 'rgba(0, 0, 0, 6)' }}>
                                <div className='plcard'>
                                    <img className='plimg' src={playlistData.imageFileUrl} alt='Playlist Image' />
                                    
                                    <div className='pltextbox'>
                                        <div className='pltextcontent'>
                                            <h2>{playlistData.title}</h2>
                                            <div className='plInfo'>
                                                <div className='contents'>{playlistData.contents}</div>
                                                <div className='userInfo'><img src={playlistData.userImgSrc} style={{width:'25px', height:'25px', borderRadius:'50%', marginRight:'10px'}}/>
                                                {playlistData.nickName} ·  좋아요 {playlistData.plLike} · 총 {playlistData.musicInfoList? playlistData.musicInfoList.length : 0}곡</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TODO: 플리 설명, 작성자, 종아요 수(해보고), 총 곡 수*/}

                                    <div className='d-flex justify-content-center mt-3 mb-3'>
                                        <div className="plbtn-container">
                                            <label className="play-btn play-icon-label">
                                                <input className="play-btn" type="checkbox"  onClick={() => addPlayList()}/>
                                                <div className="play-icon"></div>
                                                <div className="pause-icon"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div>
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
                    <div className='col-md-2'>
                        <MiniPlayer />
                    </div>
                </div>

                {isPlayListEdit&&(<PlayListEdit
                    playlistId={playlistId}
                    open={isPlayListEdit}
                    onClose={()=>{
                        setIsPlayListEdit(false);
                    }}
                />)}
                {/* {isPlayListEdit&&(<PlayListSearchEdit
                    playlistId={playlistId}
                    open={isPlayListEdit}
                    onClose={() => {
                        setIsPlayListEdit(false);
                    }}
                />)} */}
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
                            <table className='table'>
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