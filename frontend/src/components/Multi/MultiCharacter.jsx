import React, { useEffect, useMemo, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { SkeletonUtils } from "three-stdlib"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import { Html } from "@react-three/drei"
import {
  MultiUsers,
  RoomModalOpen,
  otherRoomId,
  userPositionAtom,
} from "../../atom/MultiAtom"
import styles from "./MultiCharacter.module.css"
import Dice from "../Item/MainItems/tempItems/Dice"

const MOVEMENT_SPEED = 0.06
const urlPath = import.meta.env.VITE_APP_ROUTER_URL

export function MultiCharacter({
  id,
  avatarId,
  nickname,
  actionId,
  closeCharacters,
  chat,
  publishCurrentPosition,
  diceNumber,

  ...props
}) {
  const position = useMemo(() => props.position, [])
  const group = useRef()
  const avatarKey = ["f", "f_1", "f_7", "f_12", "m_5", "m_11", "m_12"]

  const { scene, materials, animations } = useGLTF(
    `${urlPath}/assets/models/characters/${avatarId}.glb`
  )

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { nodes } = useGraph(clone)

  const { actions } = useAnimations(animations, group)

  const user = useRecoilValue(userAtom)

  const [users, setUsers] = useRecoilState(MultiUsers)

  const setUserPosition = useSetRecoilState(userPositionAtom)

  const [isMoving, setIsMoving] = useState(true)

  const [isPlay, setIsPlay] = useState(false)

  const setRoomModal = useSetRecoilState(RoomModalOpen)

  const setOtherRoomId = useSetRecoilState(otherRoomId)

  const actionList = [
    0,
    { Win: 2800 },
    { Sad: 5700 },
    { "Song Jump": 6500 },
    { dice: 5000 },
  ]

  const actionName = Object.keys(actionList[actionId])[0]
  const actionTime = Object.values(actionList[actionId])[0]

  useEffect(() => {
    if (actionId != 0 && !isPlay) {
      setIsPlay(true)
      setIsMoving(false)
      setTimeout(() => {
        setIsMoving(true)
        setIsPlay(false)
        setUsers((prevUsers) => {
          const newUsers = { ...prevUsers }
          if (newUsers[id]) {
            newUsers[id] = { ...newUsers[id], actionId: "0" }
          }
          return newUsers
        })
      }, actionTime)
    } else {
      setIsPlay(false)
    }
  }, [actionId])

  useEffect(() => {
    if (chat) {
      // 2초 후에 채팅을 숨기기 위한 타이머 설정
      const hideChatTimer = setTimeout(() => {
        setUsers((prevUsers) => {
          const newUsers = { ...prevUsers }
          if (newUsers[id]) {
            newUsers[id] = { ...newUsers[id], chat: "" }
          }
          return newUsers
        })
      }, 2000) // 2000 밀리초 = 2초 (필요에 따라 조절)

      // 컴포넌트가 언마운트되거나 채팅이 변경될 때 타이머를 취소하기 위해 사용
      return () => clearTimeout(hideChatTimer)
    }
  }, [chat])

  useFrame((state) => {
    if (actionName == undefined) {
      actions["Win"].stop()
      actions["Song Jump"].stop()
      actions["Sad"].stop()
    }
    // 이동 중

    if (isMoving && group.current.position.distanceTo(props.position) > 0.1) {
      if (nickname == user.nickname) {
        const newPosition = group.current.position.clone()
        setUserPosition(newPosition)
      }
      setIsPlay(false)
      actions.Idle.stop()
      actions.Run.play()
      const direction = group.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED)

      group.current.position.sub(direction)
      group.current.lookAt(props.position)

      // 정지
    } else {
      if (isPlay) {
        if (actionId == 4) {
          actions.Run.stop()
        } else {
          actions[actionName].play()
          actions.Run.stop()
          actions.Idle.stop()
        }
      } else {
        actions.Run.stop()
        actions.Idle.play()
      }
    }

    if (user.roomId == id) {
      state.camera.position.x = group.current.position.x + 2
      state.camera.position.y = group.current.position.y + 10
      state.camera.position.z = group.current.position.z + 10

      state.camera.lookAt(group.current.position)
    }
  })

  return (
    <group ref={group} {...props} dispose={null} position={position}>
      <Dice actionId={actionId} rollResult={diceNumber} />
      <Html position-y={1.7} center style={{ pointerEvents: "none" }}>
        <div className={styles.characterContainer}>
          {chat && (
            <div
              className={styles.chatBox}
              style={{ maxWidth: "200px", pointerEvents: "none" }}
            >
              {chat}
            </div>
          )}
          <div className={styles.bottomBox}>
            <div
              className={styles.nicknameBox}
              style={{
                width: `${nickname.length * 20}px`,
                pointerEvents: "none",
              }}
            >
              {nickname}
            </div>
            <div className={styles.roomImgBox}>
              {closeCharacters[id] && (
                <img
                  style={{ pointerEvents: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setRoomModal(true)
                    setOtherRoomId(id)
                  }}
                  src={`${urlPath}/assets/icons/location.png`}
                  alt=""
                  className={styles.roomImg}
                />
              )}
            </div>
          </div>
        </div>
      </Html>

      <group name="Scene">
        <group name="rig">
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-torsoparent"]} />
          <skinnedMesh
            name={avatarKey[avatarId]}
            geometry={nodes[avatarKey[avatarId]].geometry}
            material={materials.characters}
            skeleton={nodes[avatarKey[avatarId]].skeleton}
          />
        </group>
      </group>
    </group>
  )
}

MultiCharacter.__isStatic = true
