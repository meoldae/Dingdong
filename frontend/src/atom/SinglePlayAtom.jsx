import { atom } from "recoil";

// 각 건물 도착 시 카메라 조정 및 움직임 제어
export const ArriveAtom = atom({
  key: "ArriveAtom",
  default: false,
});

// 입장 여부
export const ConfirmEnteringRoomAtom = atom({
  key: "ConfirmEnteringHouseAtom",
  default: false,
});
export const ConfirmEnteringPostOfficeAtom = atom({
  key: "ConfirmEnteringPostOfficeAtom",
  default: false,
});
export const ConfirmEnteringStoreAtom = atom({
  key: "ConfirmEnteringStoreAtom",
  default: false,
});
export const ConfirmEnteringOtherRoomAtom = atom({
  key: "ConfirmEnteringOtherRoomAtom",
  default: false,
});
export const ConfirmEnteringWorldAtom = atom({
  key: "ConfirmEnteringWorldAtom",
  default: false,
});
export const ConfirmEnteringRankAtom = atom({
  key: "ConfirmEnteringRankAtom",
  default: false,
});
export const ConfirmEnteringTestAtom = atom({
  key: "ConfirmEnteringTestAtom",
  default: false,
});
export const ConfirmEnteringInstaAtom = atom({
  key: "ConfirmEnteringInstaAtom",
  default: false,
});
export const ConfirmEnteringTwitterAtom = atom({
  key: "ConfirmEnteringTwitterAtom",
  default: false,
});
export const ConfirmEnteringPostBoxAtom = atom({
  key: "ConfirmEnteringPostBoxAtom",
  default: false,
});

// 포탈
export const RoomPortalVisibleAtom = atom({
  key: "HousePortalVisibleAtom",
  default: true,
});
export const RoomPortalPositionAtom = atom({
  key: "RoomPortalPositionAtom",
  default: [0, 0.03, -2],
});

export const PostOfficePortalVisibleAtom = atom({
  key: "PostOfficePortalVisibleAtom",
  default: true,
});
export const PostOfficePortalPositionAtom = atom({
  key: "PostOfficePortalPositionAtom",
  default: [9.85, 0.03, -1.5],
});

export const StorePortalVisibleAtom = atom({
  key: "StorePortalVisibleAtom",
  default: true,
});
export const StorePortalPositionAtom = atom({
  key: "StorePortalPositionAtom",
  default: [8.3, 0.03, 19],
});

export const OtherRoomPortalVisibleAtom = atom({
  key: "OtherRoomPortalVisibleAtom",
  default: true,
});
export const OtherRoomPortalPositionAtom = atom({
  key: "OtherRoomPortalPositionAtom",
  default: [-8, 0.03, 6.4],
});

export const WorldPortalVisibleAtom = atom({
  key: "WorldPortalVisibleAtom",
  default: true,
});
export const WorldPortalPositionAtom = atom({
  key: "WorldPortalPositionAtom",
  default: [0, 0.03, 26],
});

export const RankPortalVisibleAtom = atom({
  key: "RankPortalVisibleAtom",
  default: true,
});
export const RankPortalPositionAtom = atom({
  key: "RankPortalPositionAtom",
  default: [-8, 0.03, 16.3],
});

export const TestPortalVisibleAtom = atom({
  key: "TestPortalVisibleAtom",
  default: true,
});
export const TestPortalPositionAtom = atom({
  key: "TestPortalPositionAtom",
  default: [3.3, 0.03, 10],
});

export const InstaPortalVisibleAtom = atom({
  key: "InstaPortalVisibleAtom",
  default: true,
});
export const InstaPortalPositionAtom = atom({
  key: "InstaPortalPositionAtom",
  default: [5.1, 0.03, 10],
});

export const TwitterPortalVisibleAtom = atom({
  key: "TwitterPortalVisibleAtom",
  default: true,
});
export const TwitterPortalPositionAtom = atom({
  key: "TwitterPortalPositionAtom",
  default: [6.9, 0.03, 10],
});

export const PostBoxPortalVisibleAtom = atom({
  key: "PostBoxPortalVisibleAtom",
  default: true,
});
export const PostBoxPortalPositionAtom = atom({
  key: "PostBoxPortalPositionAtom",
  default: [1.3, 0.03, 0],
});
