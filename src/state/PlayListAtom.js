import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentPlayListIdAtom = atom({
    key: "currentPlayListIdAtom",
    default: "",
    effects_UNSTABLE: [persistAtom]
});