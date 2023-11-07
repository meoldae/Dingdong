import { atom } from "recoil"

export const isGuestBookVisibleAtom = atom({
  key: "isGuestBookAtom",
  default: false,
})

export const isWriteGuestBookVisibleAtom = atom({
  key: "isWriteGuestBookAtom",
  default: false,
})