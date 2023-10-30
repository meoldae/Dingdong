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
export const ConfirmEnteringPostOfficeAtom = atom({
  key: "ConfirmEnteringPostOfficeAtom",
  default: false,
})
export const ConfirmEnteringStoreAtom = atom({
  key: "ConfirmEnteringStoreAtom",
  default: false,
})
export const ConfirmEnteringOtherRoomAtom = atom({
  key: "ConfirmEnteringOtherRoomAtom",
  default: false,
})
export const ConfirmEnteringWorldAtom = atom({
  key: "ConfirmEnteringWorldAtom",
  default: false,
})

// 포탈
export const RoomPortalVisibleAtom = atom({
  key: "HousePortalVisibleAtom",
  default: true,
})
export const RoomPortalPositionAtom = atom({
  key: "RoomPortalPositionAtom",
  default: [-6.5, 0.03, 8.5],
})

export const PostOfficePortalVisibleAtom = atom({
  key: "PostOfficePortalVisibleAtom",
  default: true,
})
export const PostOfficePortalPositionAtom = atom({
  key: "PostOfficePortalPositionAtom",
  default: [7.6, 0.03, 4],
})

export const StorePortalVisibleAtom = atom({
  key: "StorePortalVisibleAtom",
  default: true,
})
export const StorePortalPositionAtom = atom({
  key: "StorePortalPositionAtom",
  default: [8.3, 0.03, 19],
})

export const OtherRoomPortalVisibleAtom = atom({
  key: "OtherRoomPortalVisibleAtom",
  default: true,
})
export const OtherRoomPortalPositionAtom = atom({
  key: "OtherRoomPortalPositionAtom",
  default: [-8.3, 0.03, 18],
})

export const WorldPortalVisibleAtom = atom({
  key: "WorldPortalVisibleAtom",
  default: true,
})
export const WorldPortalPositionAtom = atom({
  key: "WorldPortalPositionAtom",
  default: [0, 0.03, 26],
})
