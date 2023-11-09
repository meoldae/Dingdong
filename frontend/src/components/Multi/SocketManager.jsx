import { useRef, useState, useEffect } from "react"
import * as StompJs from "@stomp/stompjs"
import * as SockJS from "sockjs-client"
import { useRecoilState, useRecoilValue } from "recoil"
import { MultiUsers } from "../../atom/MultiAtom"
import { userAtom } from "../../atom/UserAtom"
import { fetchMultiUser } from "../../api/User"
import axios from "axios"

function CreateMulti() {
  const [users, setUsers] = useRecoilState(MultiUsers)

  const userInfo = useRecoilValue(userAtom)

  const userParam = {
    channelId: 1,
    nickname: userInfo.nickname,
    roomId: userInfo.roomId,
    avatarId: userInfo.avatarId,
    x: Math.random() * 3,
    y: 0,
    z: Math.random() * 3,
  }

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `http://ding-dong/dev/api/multi/${userParam.channelId}`
      )
      setUsers(response.data.data)
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  const client = useRef({})

  // 첫 연결 하는 순간
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        console.log("Connected to the WS server")
        subscribe()
        publishJoin(userParam)
      },
    })

    client.current.activate()
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
    // 캐릭터 이동 채널
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
        })
      }
    })

    // 유저 리스트 채널
    client.current.subscribe("/sub/channel/1", (message) => {
      if (message.body) {
        const newUser = JSON.parse(message.body)

        setUsers((currentList) => {
          const updatedList = { ...currentList }

          // 상태가 1인 경우, 새로운 유저를 추가합니다.
          if (newUser.status == 1) {
            const { status, ...userInfoWithoutStatus } = newUser
            updatedList[newUser.roomId] = userInfoWithoutStatus
          }
          // 상태가 0인 경우, 해당 유저를 리스트에서 삭제합니다.
          else if (newUser.status == 0) {
            delete updatedList[newUser.roomId]
          }

          return updatedList
        })
      }
    })
  }

  const disconnect = () => {
    console.log("Disconnected from the WS server")
    publishOut(userParam)

    client.current.deactivate()
  }

  // 페이지 접속 시 실행
  useEffect(() => {
    connect()
    fetchUserList()
    return () => disconnect()
  }, [])
}

export default CreateMulti
