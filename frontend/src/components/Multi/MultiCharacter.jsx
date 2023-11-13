import React, { useEffect, useMemo, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { SkeletonUtils } from "three-stdlib"
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import { Html } from "@react-three/drei"
import { MultiUsers } from "../../atom/MultiAtom"
import { useLoader } from "@react-three/fiber"
import { TextureLoader, PlaneGeometry, MeshBasicMaterial, Mesh } from "three"

const MOVEMENT_SPEED = 0.032
const urlPath = import.meta.env.VITE_APP_ROUTER_URL

export function MultiCharacter({
  id,
  avatarId,
  nickname,
  actionId,
  closeCharacters,
  setUserPosition,
  ...props
}) {
  const position = useMemo(() => props.position, [])
  const group = useRef()
  const avatarKey = ["f", "f_1", "f_7", "f_12", "m_5", "m_11", "m_12"]

  const { scene, materials, animations } = useGLTF(
    `${urlPath}/assets/models/characters/${avatarId}.glb`
  )

  const texture = useLoader(
    TextureLoader,
    `${urlPath}/assets/icons/location.png`
  )

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { nodes } = useGraph(clone)

  const { actions } = useAnimations(animations, group)

  const user = useRecoilValue(userAtom)

  const [users, setUsers] = useRecoilState(MultiUsers)

  const [isMoving, setIsMoving] = useState(true)

  const [isPlay, setIsPlay] = useState(false)

  const actionList = [0, { Win: 2800 }, { Sad: 5700 }, { "Song Jump": 6500 }]

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

  useFrame((state) => {
    if (actionName == undefined) {
      actions["Win"].stop()
      actions["Song Jump"].stop()
      actions["Sad"].stop()
    }
    // 이동 중

    if (isMoving && group.current.position.distanceTo(props.position) > 0.1) {
      if (nickname == user.nickname) {
        setUserPosition(group.current.position)
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
        actions[actionName].play()
        actions.Run.stop()
        actions.Idle.stop()
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
      {closeCharacters[id] && (
        <mesh position={[0, 2.3, 0]} scale={[1, 1, 1]}>
          <planeGeometry attach="geometry" args={[1, 1]} />
          <meshBasicMaterial
            attach="material"
            map={texture}
            transparent={true}
          />
        </mesh>
      )}
      <Html position-y={1.7} center>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "40px",
            color: "black",
            fontWeight: "bold",
            borderRadius: "30px",
            // background: "white",
          }}
        >
          {nickname}
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

useGLTF.preload(`${urlPath}/assets/models/characters/2.glb`)
