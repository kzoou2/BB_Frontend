import axios from 'axios';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const videoIdListAtom = atom({
    key: "videoIdListAtom",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const videoPlaylistAtom = atom({
    key: "videoPlaylistAtom",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const videoVolumeAtom = atom({
    key: "videoVolumeAtom",
    default: 0.5,
    effects_UNSTABLE: [persistAtom]
});

export const videoProgressAtom = atom({
    key: "videoProgressAtom",
    default: 0,
    effects_UNSTABLE: [persistAtom]
});

export const playStateAtom = atom({
    key: "playStateAtom",
    default: false,
    effects_UNSTABLE: [persistAtom]
});

export const currentVideoIndexAtom = atom({
    key: "currentVideoIndexAtom",
    default: null,
    effects_UNSTABLE: [persistAtom]
})

export const currentVideoTitleAtom = atom({
    key: "currentVideoTitleAtom",
    default: "",
    effects_UNSTABLE: [persistAtom]
});

// 참고
// export const miniPlayerStateAtom = atom({
//     key : "miniplayerState",
//     default : true
// });

// export const currentSongNum = atom({
//     key : "currentSong",
//     default : 0
// });

// export const playlistId = atom({
//     key : "playlistID",
//     default : ""
// });

// export const getPlaylistSongs = selector({
//     key : "playlinstSongs",
//     get : async ({get}) => {
        
//         const id = get(playlistId)
//         if(id !== ""){ 
//             return (await axios.get(`http://150.230.250.122:8081/search/tracks/${id}`)).data
//         }else{
//             return false
//         }

//     }
// });

// export const currentSongSelector = selector({
//     key : "currentSongSelector" ,
//     get : ({get}) => {
//         const currentSongNums = get(currentSongNum)
//         const playlistSongs = get(getPlaylistSongs)
//         if(playlistSongs){
//             return playlistSongs[currentSongNums]
//         }else{
//             return false
//         }
//     }
// });