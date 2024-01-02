import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const feedCommentAtom = atom({
    key: "feedCommentAtom",
    default: [],
    effects_UNSTABLE: [persistAtom]
});