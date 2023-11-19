import { atom } from "recoil"
import * as THREE from "three"
// 각 건물 도착 시 카메라 조정 및 움직임 제어
export const MultiUsers = atom({
  key: "MultiUsers",
  default: {},
})

export const actionState = atom({
  key: "actionState",
  default: false,
})

// Floating Button
export const isFloatingButtonVisibleAtom = atom({
  key: "isFloatingButtonAtom",
  default: false,
})

export const RoomModalOpen = atom({
  key: "RoomModalOpen",
  default: false,
})

export const otherRoomId = atom({
  key: "otherRoomId",
  default: null,
})

export const userPositionAtom = atom({
  key: "userPositionAtom",
  default: new THREE.Vector3(0, 0, 0),
})

export const chatLogVisibleAtom = atom({
  key: "chatLogAtom",
  default: false,
})
