import { atom } from "recoil"

export const isGuestBookVisibleAtom = atom({
  key: "isGuestBookAtom",
  default: false,
})

export const isWriteGuestBookVisibleAtom = atom({
  key: "isWriteGuestBookAtom",
  default: false,
})

export const isFinishGuestBookVisibleAtom = atom({
  key: "isFinishGuestBookAtom",
  default: false,
})

export const isFinishWriteGuestBookVisibleAtom = atom({
  key: "isFinishWriteGuestBookAtom",
  default: false,
})