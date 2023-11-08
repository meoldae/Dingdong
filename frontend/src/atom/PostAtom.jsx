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

export const postofficeCardAtom = atom({
  key:"postofficeCardAtom",
  default: false,
})

export const finishPostofficeCardAtom = atom({
  key:"finishpPostofficeCardAtom",
  default: false,
})

export const postofficeSendLetterAtom = atom({
  key:"postofficeSendLetterAtom",
  default: false,
})