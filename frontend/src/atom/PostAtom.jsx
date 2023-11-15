import { atom } from "recoil"

export const isPostBoxVisibleAtom = atom({
  key: "isPostBoxAtom",
  default: false,
})

export const isFinishPostBoxVisibleAtom = atom({
  key: "isFinishPostBoxAtom",
  default: false,
})

export const isReceiveLetterVisibleAtom = atom({
  key: "isReceiveLetterAtom",
  default: false,
})

export const isFinishReceiveLetterVisibleAtom = atom({
  key: "isFinishReceiveLetterAtom",
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

export const finishPostofficeSendLetterAtom = atom({
  key:"finishPostofficeSendLetterAtom",
  default: false,
})

export const selectedPostCardAtom = atom({
  key: "selectedPostCardAtom",
  default: null,
})

export const reportPostVisibleAtom = atom({
  key: "reportPostVisibleAtom",
  default: false,
})