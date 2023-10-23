import { atom } from "recoil";

export const buildModeState = atom({
  key:"buildModeState",
  default:false,
})

export const dragPositionState = atom({
  key:"dragPositionState",
  default:null,
})

export const draggedItemState = atom({
  key:"draggedItem",
  default:null,
})

const item = {
  sofa: {
    name: "sofa",
    size: [1.44, 1.44],
  },
  carpet: {
    name: "carpet",
    size: [2.4, 2.4],
  },
  vase: {
    name: "vase",
    size: [0.48, 0.48],
  },
  bed: {
    name: "bed",
    size: [1.92, 2.4],
  },
};

const map = {
  size: [4.8, 4.8],
  // gridDivision:2,
  item: [
    {
      ...item.sofa,
      gridPosition: [item.sofa.size[0], item.sofa.size[1]],
      rotation: 1,
    },
    {
      ...item.bed,
      gridPosition: [item.bed.size[0], item.bed.size[1]],
      rotation: 2,
    },
    {
      ...item.vase,
      gridPosition: [item.vase.size[0], item.vase.size[1]],
      rotation: 1,
    },
    {
      ...item.carpet,
      gridPosition: [item.carpet.size[0], item.carpet.size[1]],
      rotation: 1,
      walkable: true,
      wall: true,
    },
  ],
};

export const ItemsState = atom({
  key:"ItemsState",
  default : map.item,
})
