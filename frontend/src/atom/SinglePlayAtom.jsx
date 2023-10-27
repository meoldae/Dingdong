import { atom } from "recoil"

// 각 건물 도착 시 카메라 조정 및 움직임 제어
export const ArriveAtom = atom({
  key: "ArriveAtom",
  default: false,
})

// 입장 여부
export const ConfirmEnteringRoomAtom = atom({
  key: "ConfirmEnteringHouseAtom",
  default: false,
})

// 포탈
export const RoomPortalVisibleAtom = atom({
  key: "HousePortalVisibleAtom",
  default: true,
})
export const RoomPortalPositionAtom = atom({
  key: "RoomPortalPositionAtom",
  default: [-5.5, 0.03, 8.5],
})
