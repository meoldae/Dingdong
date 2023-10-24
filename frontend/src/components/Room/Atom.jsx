import { atom } from "recoil";

export const buildModeState = atom({
  key: "buildModeState",
  default: false,
});

export const dragPositionState = atom({
  key: "dragPositionState",
  default: null,
});

export const draggedItemState = atom({
  key: "draggedItem",
  default: null,
});

const item = {
  sofa: {
    name: "sofa",
    size: [6, 0, 6],
  },
  carpet: {
    name: "carpet",
    size: [10, 0, 10],
  },
  vase: {
    name: "vase",
    size: [2, 0, 2],
  },
  bed: {
    name: "bed",
    size: [8, 0, 10],
  },
};

const map = {
  size: [4.8, 4.8],
  // gridDivision:2,
  item: [
    {
      ...item.sofa,
      gridPosition: [3, 0, 16],
      rotation: 1,
    },
    {
      ...item.bed,
      gridPosition: [4, 0, 6],
      rotation: 2,
    },
    {
      ...item.vase,
      gridPosition: [19, 0, 19],
      rotation: 1,
    },
    {
      ...item.carpet,
      gridPosition: [10, 0, 10],
      rotation: 1,
      walkable: true,
    },
  ],
};

export const ItemsState = atom({
  key: "ItemsState",
  default: map.item,
});

export const ItemRotateState = atom({
  key: "ItemRotateState",
  default: 0,
});
