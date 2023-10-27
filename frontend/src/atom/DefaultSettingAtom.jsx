// Three.js 기본 세팅 요소
import { atom } from "recoil"

// 카메라
export const DefaultPosition = atom({
  key: "DefaultPosition",
  default: [1, 5, 5],
})
export const DefaultZoom = atom({
  key: "DefaultZoom",
  default: 0.17,
})

// 캐릭터
export const CharacterPositionAtom = atom({
  key: "CharacterPositionAtom",
  default: [0, 0, 0],
})
