import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const DmRoomIdAtom = atom({
    key: "DmRoomIdAtom",
    default: 0,
    // effects_UNSTABLE: [persistAtom]
});