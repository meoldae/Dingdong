import React, { useState, useRef, useEffect, useCallback } from "react"
import { useFrame, useThree, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  CharacterBoxAtom,
  CharacterPositionAtom,
} from "../../../atom/DefaultSettingAtom"
import { ArriveAtom } from "../../../atom/SinglePlayAtom"
import { isPickedAtom } from "../../../atom/TutorialAtom"
import { FenceBoxAtom } from "../../../atom/FenceAtom"
import { userAtom } from "../../../atom/UserAtom"

const Character = () => {
  // 회원의 캐릭터 ID
  const characterID = useRecoilValue(userAtom).avatarId
  console.log(characterID)
  // 마우스 및 터치 여부
  const [isPressed, setIsPressed] = useState(false)
  // Three.js 기본 설정
  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree()

  // 캐릭터
  const characterRef = useRef()
  const character = useLoader(
    GLTFLoader,
    `assets/models/characters/${characterID}.glb`
  )
  const [characterBox, setcharacterBox] = useRecoilState(CharacterBoxAtom)

  // 애니메이션
  const mixerRef = useRef()
  const actions = useRef([])
  useEffect(() => {
    if (character.animations && character.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(character.scene)
      actions.current = character.animations.map((clip) =>
        mixerRef.current.clipAction(clip)
      )
    }
  }, [character])

  // 그림자 생성
  character.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  // 공통
  const setCharacterPosition = useSetRecoilState(CharacterPositionAtom)
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [destination, setDestination] = useState(new THREE.Vector3(0, 0, 0))

  // 경계 박스
  const fenceBox = useRecoilValue(FenceBoxAtom)

  let min = new THREE.Vector3(
    position.x - 0.1, // x의 최소값
    position.y - 0.1, // y의 최소값
    position.z - 0.1 // z의 최소값
  )

  let max = new THREE.Vector3(
    position.x + 0.1, // x의 최대값
    position.y + 0.1, // y의 최대값
    position.z + 0.1 // z의 최대값
  )

  let customBox = new THREE.Box3(min, max)

  // 튜토리얼 우표 수집
  const isPicked = useRecoilValue(isPickedAtom)

  // 움직임 제어 및 카메라 선형 보간
  const isArrived = useRecoilValue(ArriveAtom)
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }

    if (characterRef.current) {
      const distance = position.distanceTo(destination)
      const previousPosition = position.clone()

      // 싱글 플레이
      if (isArrived) {
        setDestination(position)
      }

      // 튜토리얼
      if (isPicked) {
        actions.current[1].stop()
        actions.current[0].stop()
        actions.current[5].play()
        setDestination(position)
      } else {
        actions.current[5].stop()
      }

      // 캐릭터 이동
      if (!isArrived && distance > 0.05) {
        // 목적지까지의 거리가 0.05보다 크면 이동
        actions.current[1].play()
        actions.current[0].stop()

        // 이동 방향을 계산하여 캐릭터의 위치를 업데이트
        const angle = Math.atan2(
          destination.z - position.z,
          destination.x - position.x
        )
        const speed = 0.07 // 캐릭터의 이동 속도
        // position.x += Math.cos(angle) * speed
        // position.z += Math.sin(angle) * speed

        // 충돌로직 추가
        const dx = Math.cos(angle) * speed
        const dz = Math.sin(angle) * speed

        // 예상 위치 계산
        const nextPosition = position.clone().add(new THREE.Vector3(dx, 0, dz))

        // 예상 위치의 경계 박스 업데이트
        customBox.setFromCenterAndSize(
          nextPosition,
          new THREE.Vector3(1, 0.1, 1)
        )

        if (!customBox.intersectsBox(fenceBox)) {
          // 충돌이 발생하지 않으면, 움직임 적용
          position.add(new THREE.Vector3(dx, 0, dz))

          // 위치 이동
          setPosition(position.clone())

          // 카메라 트렉킹을 위해 현재 캐릭터 위치 정보 저장
          setCharacterPosition([
            position.clone().x,
            position.clone().y,
            position.clone().z,
          ])
        } else {
          actions.current[1].stop()
        }
        // 충돌로직 끝
      }
      // 캐릭터 정지
      else {
        actions.current[1].stop()
        actions.current[0].play()
      }
    }
  })

  // 마우스 및 터치 이벤트 처리
  const mouse = useRef(new THREE.Vector2())
  const raycaster = useRef(new THREE.Raycaster())

  // 마우스 및 터치 이벤트에 따른 목적지 업데이트
  const handlePositionChange = useCallback(
    (e) => {
      const event = e.type.startsWith("touch") ? e.touches[0] : e
      const rect = domElement.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      const vector = new THREE.Vector3(x, y, 0.5)
      vector.unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.y / dir.y
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))

      setDestination(pos)
      if (characterRef.current) {
        characterRef.current.lookAt(pos)
      }
    },
    [camera, domElement]
  )

  // 마우스 및 터치 이벤트 리스너를 추가
  useEffect(() => {
    const handleMouseDownOrTouchStart = (e) => {
      setIsPressed(true)
      handlePositionChange(e)
    }
    const handleMouseMoveOrTouchMove = (e) => {
      if (isPressed) {
        handlePositionChange(e)
      }
    }

    domElement.addEventListener("mousedown", handleMouseDownOrTouchStart)
    domElement.addEventListener("touchstart", handleMouseDownOrTouchStart)
    domElement.addEventListener("mousemove", handleMouseMoveOrTouchMove)
    domElement.addEventListener("touchmove", handleMouseMoveOrTouchMove)
    domElement.addEventListener("mouseup", () => setIsPressed(false))
    domElement.addEventListener("touchend", () => setIsPressed(false))

    return () => {
      domElement.removeEventListener("mousedown", handleMouseDownOrTouchStart)
      domElement.removeEventListener("touchstart", handleMouseDownOrTouchStart)
      domElement.removeEventListener("mousemove", handleMouseMoveOrTouchMove)
      domElement.removeEventListener("touchmove", handleMouseMoveOrTouchMove)
      domElement.removeEventListener("mouseup", () => setIsPressed(false))
      domElement.removeEventListener("touchend", () => setIsPressed(false))
    }
  }, [domElement, handlePositionChange, isPressed])

  return (
    <primitive
      ref={characterRef}
      object={character.scene}
      position={position.toArray()}
    />
  )
}

export default Character
