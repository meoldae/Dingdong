import { atom } from "recoil"

export const HouseCamAtom = atom({
  key: "HouseCamAtom",
  default: [-6, 0.03, 8.5],
})

export const ArriveAtom = atom({
  key: "ArriveAtom",
  default: false,
})
