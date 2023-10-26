import { atom } from "recoil"

export const DefaultPosition = atom({
  key: "DefaultPosition",
  default: [1, 5, 5],
})

export const DefaultZoom = atom({
  key: "DefaultZoom",
  default: 0.17,
})
