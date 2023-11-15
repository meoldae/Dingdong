import { atom } from "recoil"

export const selectedUserListAtom = atom({
  key: "selectedUserAtom",
  default: [],
})

export const selectedUserNicknameListAtom = atom({
  key: "selectedUserNicknameAtom",
  default: [],
})

export const isPostOfficeVisibleAtom = atom({
  key: "isPostOfficeVisible",
  default: false,
})

export const isFinishPostOfficeVisibleAtom = atom({
  key: "isFinishPostOfficeVisible",
  default: false,
})