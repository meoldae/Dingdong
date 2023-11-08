import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const roomInfoAtom = atom({
    key: "roomInfoAtom",
    default: ""
});

export const roomAvatarAtom = atom({
    key: "roomAvatarAtom",
    default: ""
});

export const roomHeartAtom = atom({
    key: "roomHeartAtom",
    default: ""
});
 