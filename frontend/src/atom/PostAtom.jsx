import { atom } from "recoil"

export const isPostBoxVisibleAtom = atom({
  key: "isPostBoxAtom",
  default: false,
})

export const isReceiveLetterVisibleAtom = atom({
  key: "isReceiveLetterAtom",
  default: false,
})

export const isCancelVisibleAtom = atom({
  key: "isCancelAtom",
  default: false,
})