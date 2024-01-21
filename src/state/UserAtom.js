import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userNicknameAtom = atom({
    key: "userNicknameAtom",
    default: '',
    effects_UNSTABLE: [persistAtom]
});