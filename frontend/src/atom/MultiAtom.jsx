import { atom } from "recoil"

// 각 건물 도착 시 카메라 조정 및 움직임 제어
export const MultiUsers = atom({
  key: "MultiUsers",
  default: {},
})

export const actionState = atom({
  key: "actionState",
  default: false,
})

export const RoomModalOpen = atom({
  key: "RoomModalOpen",
  default: false,
})
