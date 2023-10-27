import { atom } from "recoil";

export const buildModeState = atom({
  key: "buildModeState",
  default: false,
});


// 클릭한 녀석 포지션
export const dragPositionState = atom({
  key: "dragPositionState",
  default: null,
});

// 클릭한 녀석이 누군지
export const draggedItemState = atom({
  key: "draggedItem",
  default: null,
});

const item = {
  sofa: {
    name: "sofa",
    size: [6, 5, 6],
  },
  carpet: {
    name: "carpet",
    size: [10, 0, 10],
  },
  vase: {
    name: "vase",
    size: [2, 1, 2],
  },
  bed: {
    name: "bed",
    size: [8, 4, 10],
  },
  clock: {
    name: "clock",
    size:[3,3,0],
  }
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
      gridPosition: [6, 0, 8],
      rotation: 1,
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
    {
      ...item.clock,
      gridPosition: [10, 5, 10],
      rotation: 1,
      walkable: true,
      wall:true,
    },
    {
      ...item.clock,
      gridPosition: [10, 5, 10],
      rotation: 1,
      walkable: true,
      wall:true,
    }
  ],
};


// 그냥 Item 전체
export const ItemsState = atom({
  key: "ItemsState",
  default: map.item,
});


// 클릭한 녀석 회전 상태
export const ItemRotateState = atom({
  key: "ItemRotateState",
  default: null,
});
