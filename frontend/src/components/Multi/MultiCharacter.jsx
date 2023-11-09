import React, { useEffect, useMemo, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber"
import { SkeletonUtils } from "three-stdlib"
import { useRecoilValue } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import { Html } from "@react-three/drei"

const MOVEMENT_SPEED = 0.032
const urlPath = import.meta.env.VITE_APP_ROUTER_URL

export function MultiCharacter({ id, avatarId, nickname, ...props }) {
  const position = useMemo(() => props.position, [])
  const group = useRef()
  const avatarKey = ["f", "f_1", "f_7", "f_12", "m_5", "m_11", "m_12"]

  const { scene, materials, animations } = useGLTF(
    `${urlPath}/assets/models/characters/${avatarId}.glb`
  )

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]) // 스켈레톤 유틸(npm i three-stdlib)을 통해 장면(scene)을 복제

  const { nodes } = useGraph(clone) // 복제한 장면을 node로 사용 (여러 개의 장면(캐릭터)을 쓸 수 있음)

  const { actions } = useAnimations(animations, group)

  const [animation, setAnimation] = useState("Idle")

  const user = useRecoilValue(userAtom)

  // 애니메이션 변경
  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play() // 변경된 애니메이션 재생
    return () => actions[animation]?.fadeOut(0.32) // 기존 애니메이션 정지
  }, [animation]) // 애니메이션 변경 시 실행

  useEffect(() => {})

  useFrame((state) => {
    // 이동 중
    if (group.current.position.distanceTo(props.position) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED)

      group.current.position.sub(direction)
      group.current.lookAt(props.position) // 클릭한 포지션의 방향을 바라보도록 설정

      setAnimation("Run")
      // console.log(group.current.position)

      // 정지
    } else {
      setAnimation("Idle")
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
      <Html position-y={1.7} center>
        <div
          style={{
            display: "flex",
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
