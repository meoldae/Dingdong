import React, { useRef, useEffect, useState, useImperativeHandle } from "react"
import { Environment, OrbitControls, useCursor } from "@react-three/drei"
import { MultiCharacter } from "./MultiCharacter"
import * as StompJs from "@stomp/stompjs"
import SockJS from "sockjs-client"
import * as THREE from "three"
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "../../atom/UserAtom"
import {
  MultiUsers,
  RoomModalOpen,
  userPositionAtom,
} from "../../atom/MultiAtom"
import axios from "axios"
import { useFrame } from "@react-three/fiber"
import { useNavigate } from "react-router-dom"

export const MultiRender = React.forwardRef((props, ref) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  // 맵 클릭 함수
  const [onFloor, setOnFloor] = useState(false)
  useCursor(onFloor)

  // Socket 통신
  const client = useRef({})

  const [users, setUsers] = useRecoilState(MultiUsers)
  const [me, setMe] = useRecoilState(userAtom)

  let userParam = {
    channelId: 1,
    nickname: me.nickname,
    roomId: me.roomId,
    avatarId: me.avatarId,
    // x: 0,
    // y: 0,
    // z: 0,
    x: Math.random() * 2,
    y: 0,
    z: Math.random() * 2,
    actionId: 0,
    chat: "",
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

    client.current.subscribe("/sub/action/1", (message) => {
      if (message.body) {
        const jsonBody = JSON.parse(message.body)
        setUsers((currentList) => {
          const user = currentList[jsonBody.roomId]
          if (user) {
            return {
              ...currentList,
              [jsonBody.roomId]: {
                ...user,
                actionId: jsonBody.actionId,
              },
            }
          }
          return currentList
        })
      }
    })

    client.current.subscribe("/sub/chat/1", (message) => {
      if (message.body) {
        const jsonBody = JSON.parse(message.body)
        setUsers((currentList) => {
          const user = currentList[jsonBody.roomId]
          if (user) {
            return {
              ...currentList,
              [jsonBody.roomId]: {
                ...user,
                chat: jsonBody.message,
              },
            }
          }
          return currentList
        })
      }
    })
  }

  const navigate = useNavigate()

  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnect()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    // 페이지 전환 감지
    const unlisten = navigate(() => {
      disconnect()
    })

    connect()
    fetchUserList()

    return () => {
      disconnect()
      window.removeEventListener("beforeunload", handleBeforeUnload)
      unlisten() // 페이지 전환 리스너 해제
    }
  }, [])

  // 위치 정보를 서버로 전송하는 함수
  const publishMove = (x, y, z) => {
    userParam = {
      ...userParam,
      x: x,
      y: y,
      z: z,
    }
    if (!client.current.connected) {
      console.error("STOMP client is not connected.")
      return
    }

    client.current.publish({
      destination: "/pub/move/1",
      body: JSON.stringify(userParam),
    })
  }

  useImperativeHandle(ref, () => ({
    publishActions: (action) => publishActions(action),
    publishChat: (chatInput) => publishChat(chatInput),
  }))

  const publishActions = (action) => {
    userParam = {
      ...userParam,
      actionId: action,
    }
    if (!client.current.connected) {
      console.error("STOMP client is not connected.")
      return
    }

    client.current.publish({
      destination: "/pub/action/1",
      body: JSON.stringify(userParam),
    })
  }

  const publishChat = (chatInput) => {
    userParam = {
      ...userParam,
      chat: chatInput,
    }
    if (!client.current.connected) {
      console.error("STOMP client is not connected.")
      return
    }

    client.current.publish({
      destination: "/pub/chat/1",
      body: JSON.stringify(userParam),
    })
  }

  const [closeCharacters, setCloseCharacters] = useState({})

  // 처음 포지션 다시 설정해야함
  const [userPosition, setUserPosition] = useRecoilState(userPositionAtom)

  useFrame(() => {
    const newCloseCharacters = {}

    // 모든 사용자를 순회하며 거리를 체크합니다.
    Object.values(users).forEach((user) => {
      if (user.roomId !== me.roomId) {
        const otherUserPosition = new THREE.Vector3(user.x, user.y, user.z)
        const distance = userPosition.distanceTo(otherUserPosition)

        // 가까운 경우에만 newCloseCharacters에 추가합니다.
        if (distance < 4) {
          newCloseCharacters[user.roomId] = user.roomId
        }
      }
    })

    // 상태를 업데이트합니다.
    setCloseCharacters(newCloseCharacters)
  })

  const handleFloorClick = (e) => {
    if (isMouseDown) {
      // console.log(e)

      publishMove(e.point.x, 0, e.point.z)
    }
  }
  const handleFloorClick2 = (e) => {
    publishMove(e.point.x, 0, e.point.z)
  }

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls enabled={false} />

      <mesh
        name="floor"
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onPointerMove={(e) => handleFloorClick(e)}
        onPointerLeave={() => setOnFloor(false)}
        position-x={8 / 2}
        position-z={8 / 2}
        onClick={(e) => {
          handleFloorClick2(e)
        }}
        onPointerDown={() => {
          setIsMouseDown(true)
        }}
        onPointerUp={() => {
          setIsMouseDown(false)
        }}
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
            nickname={users[idx].nickname}
            actionId={users[idx].actionId}
            closeCharacters={closeCharacters}
            chat={users[idx].chat}
          />
        </group>
      ))}
    </>
  )
})
