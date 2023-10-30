// Three.js 기본 세팅 요소
import { atom } from "recoil"
import * as THREE from "three"

// 카메라
export const DefaultPosition = atom({
  key: "DefaultPosition",
  default: [2, 10, 10],
})
export const DefaultZoom = atom({
  key: "DefaultZoom",
  default: 0.18,
})

// 캐릭터
export const CharacterPositionAtom = atom({
  key: "CharacterPositionAtom",
  default: [0, 0, 0],
})

export const CharacterBoxAtom = atom({
  key: "CharacterBoxAtom",
  default: new THREE.Box3(
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(1, 1, 1)
  ),
})
