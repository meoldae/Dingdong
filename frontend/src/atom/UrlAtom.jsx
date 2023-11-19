import { atom } from "recoil"

export const lastUrlPathAtom = atom({
  key: "lastUrlPathAtom",
  default: "/",
})