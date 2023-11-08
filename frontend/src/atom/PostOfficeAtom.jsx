import { atom } from "recoil"

export const selectedUserListAtom = atom({
  key: "selectedUserAtom",
  default: [],
})

export const isPostOfficeVisibleAtom = atom({
  key: "isPostOfficeVisible",
  default: false,
})