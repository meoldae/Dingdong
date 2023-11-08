import { useRef, useEffect, useState } from "react"
import { Environment, OrbitControls, useCursor } from "@react-three/drei"
import { MultiCharacter } from "./MultiPlayer"
import * as StompJs from "@stomp/stompjs"
import * as SockJS from "sockjs-client"
import * as THREE from "three"
import { useRecoilState } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import { MultiUsers } from "../../atom/MultiAtom"

export const Experience = () => {
  const [onFloor, setOnFloor] = useState(false)
  useCursor(onFloor)
  const client = useRef({})
  const [position, setPosition] = useState([0, 0, 0])

  const [users, setUsers] = useRecoilState(MultiUsers)
  const [me, setMe] = useRecoilState(userAtom)

  // STOMP 소켓 연결을 설정합니다.
  useEffect(() => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        console.log("Connected to the WS server")
      },
      onDisconnect: () => {
        console.log("Disconnected from the WS server")
      },
    })

    client.current.activate()

    return () => {
      client.current.deactivate()
    }
  }, [])

  // 위치 정보를 서버로 전송하는 함수
  const publishMove = (x, y, z) => {
    setPosition([x, y, z])
    if (!client.current.connected) {
      console.error("STOMP client is not connected.")
      return
    }
    const data = {
      channelId: 1,
      nickname: me.nickname,
      roomId: me.roomId,
      x: x,
      y: y,
      z: z,
    }

    client.current.publish({
      destination: "/pub/move/1",
      body: JSON.stringify(data),
    })
  }

  console.log(users)

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => publishMove(e.point.x, 0, e.point.z)}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        position-x={8 / 2}
        position-z={8 / 2}
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="F0F0F0" />
      </mesh>
      {Object.keys(users).map((idx) => (
        <MultiCharacter
          key={idx}
          id={idx}
          position={new THREE.Vector3(users[idx].x, users[idx].y, users[idx].z)}
        />
      ))}
    </>
  )
}
