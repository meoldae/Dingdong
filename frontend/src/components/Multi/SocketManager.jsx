import { useRef, useEffect, useState } from "react"
import { Environment, OrbitControls, useCursor } from "@react-three/drei"
import { MultiCharacter } from "./MultiCharacter"
import * as StompJs from "@stomp/stompjs"
import * as SockJS from "sockjs-client"
import * as THREE from "three"
import { useRecoilState } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import { MultiUsers } from "../../atom/MultiAtom"
import axios from "axios"

export const MultiRender = () => {
  // 맵 클릭 함수
  const [onFloor, setOnFloor] = useState(false)
  useCursor(onFloor)

  // Socket 통신
  const client = useRef({})

  const [users, setUsers] = useRecoilState(MultiUsers)
  const [me, setMe] = useRecoilState(userAtom)

  const userParam = {
    channelId: 1,
    nickname: me.nickname,
    roomId: me.roomId,
    avatarId: me.avatarId,
    x: Math.random() * 3,
    y: 0,
    z: Math.random() * 3,
  }

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `https://ding-dong.kr/dev/api/multi/${userParam.channelId}`
      )
      setUsers(response.data.data)
    } catch (error) {
      console.error("There was an error fetching users!", error)
    }
  }

  // 연결
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("https://ding-dong.kr/dev/ws"),
      onConnect: () => {
        console.log("Connected to the WS server")
        subscribe()
        publishJoin(userParam)
      },
      onDisconnect: () => {
        console.log("Disconnected from the WS server")
      },
    })

    client.current.activate()
  }

  // 연결 끊기
  const disconnect = () => {
    publishOut({
      ...userParam,
      status: 0,
    })

    client.current.deactivate()
  }

  // 사용자 입장
  const publishJoin = (user) => {
    if (!client.current.connected) return
    const param = { ...user, status: 1 }
    client.current.publish({
      destination: "/pub/join/1",
      body: JSON.stringify(param),
    })
  }

  // 사용자 퇴장
  const publishOut = (user) => {
    const param = { ...user, status: 0 }
    client.current.publish({
      destination: "/pub/out/1",
      body: JSON.stringify(param),
    })
  }

  const subscribe = () => {
    client.current.subscribe("/sub/move/1", (message) => {
      if (message.body) {
        const jsonBody = JSON.parse(message.body)
        setUsers((currentList) => {
          const user = currentList[jsonBody.roomId]
          if (user) {
            return {
              ...currentList,
              [jsonBody.roomId]: {
                ...user,
                x: jsonBody.x,
                y: jsonBody.y,
                z: jsonBody.z,
              },
            }
          }
          return currentList
        })
      }
    })

    client.current.subscribe("/sub/channel/1", (message) => {
      if (message.body) {
        const newUser = JSON.parse(message.body)

        setUsers((currentList) => {
          const updatedList = { ...currentList }

          if (newUser.status === 1) {
            const { status, ...userInfoWithoutStatus } = newUser
            updatedList[newUser.roomId] = userInfoWithoutStatus
          } else if (newUser.status === 0) {
            delete updatedList[newUser.roomId]
          }

          return updatedList
        })
      }
    })
  }

  useEffect(() => {
    connect()
    fetchUserList()

    return () => disconnect()
  }, [])

  // 위치 정보를 서버로 전송하는 함수
  const publishMove = (x, y, z) => {
    if (!client.current.connected) {
      console.error("STOMP client is not connected.")
      return
    }
    const data = {
      channelId: 1,
      nickname: me.nickname,
      roomId: me.roomId,
      avatarId: me.avatarId,
      x: x,
      y: y,
      z: z,
    }

    client.current.publish({
      destination: "/pub/move/1",
      body: JSON.stringify(data),
    })
  }

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls enabled={false} />

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
        <group key={idx}>
          <MultiCharacter
            id={idx}
            avatarId={users[idx].avatarId}
            position={
              new THREE.Vector3(users[idx].x, users[idx].y, users[idx].z)
            }
          />
          <Html
            position={[users[idx].x, users[idx].y + 2, users[idx].z]}
            center
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100px",
                height: "40px",
                color: "white",
                fontWeight: "bold",
                borderRadius: "30px",
              }}
            >
              {users[idx].nickname}
            </div>
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100px",
                height: "40px",
                color: "white",
                fontWeight: "bold",
                // background: "white",
                borderRadius: "30px",
              }}
            >
              {users[idx].nickname}
            </div> */}
          </Html>
        </group>
      ))}
    </>
  )
}
