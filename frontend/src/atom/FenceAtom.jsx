// Three.js 기본 세팅 요소
import { atom } from "recoil"
import * as THREE from "three"

export const FenceBoxAtom = atom({
  key: "FenceBoxAtom",
  default: new THREE.Box3(
    new THREE.Vector3(-0.1, -0.1, -0.1),
    new THREE.Vector3(0.1, 0.1, 0.1)
  ),
})
