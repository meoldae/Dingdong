// React와 관련된 필수 훅들과 소켓 관련 라이브러리를 임포트합니다.
import { useRef, useState, useEffect } from "react"
import * as StompJs from "@stomp/stompjs"
import * as SockJS from "sockjs-client"
import { useRecoilState, useRecoilValue } from "recoil"
import { MultiUsers } from "../../atom/MultiAtom"
import { userAtom } from "../../atom/UserAtom"

// CreateMulti 컴포넌트를 정의합니다.
function CreateMulti() {
  // 컴포넌트의 상태로 userList를 관리합니다.
  // 이 상태는 소켓을 통해 받은 메시지들로 업데이트될 예정입니다.
  const [userList, setUserList] = useState([])

  // Recoil 상태 관리 라이브러리를 사용하여 전역 상태인 users를 가져오고 업데이트하는 함수를 가져옵니다.
  const [users, setUsers] = useRecoilState(MultiUsers)

  const hostUser = useRecoilValue(userAtom)

  console.log(hostUser.nickname)
  console.log(hostUser.roomId)
  console.log(hostUser.avatarId)

  // useRef를 사용하여 소켓 클라이언트 인스턴스를 참조합니다.
  // 이는 컴포넌트가 리렌더링될 때마다 유지되어야 하기 때문입니다.
  const client = useRef({})

  // 소켓 서버에 연결을 시도하는 함수를 정의합니다.
  const connect = () => {
    client.current = new StompJs.Client({
      // SockJS를 사용하여 웹소켓 연결을 생성하는 팩토리 함수를 정의합니다.
      webSocketFactory: () => new SockJS("/ws"),
      // 연결이 성공하면 호출될 콜백 함수입니다.
      onConnect: () => {
        console.log("Connected to the WS server")
        subscribe()
        publish2({
          channelId: 1,
          nickname: "jangho",
          roomId: 1,
          x: 0.0,
          y: 0.0,
          z: 0.0,
        })
      },
    })
    // 클라이언트를 활성화하여 실제로 연결을 시작합니다.
    client.current.activate()
  }

  // 소켓 서버에 메시지를 전송하는 함수를 정의합니다.
  const publish = (chat) => {
    // 클라이언트가 연결되어 있지 않으면 함수를 종료합니다.
    if (!client.current.connected) return

    // 클라이언트를 사용하여 소켓 서버에 메시지를 전송합니다.
    client.current.publish({
      // 목적지(엔드포인트)를 지정합니다.
      destination: "/pub/move/1",
      // 전송할 메시지의 본문입니다. 여기서는 JSON 문자열로 변환합니다.
      body: JSON.stringify({
        channelId: 1,
        uuid: "test1",
        actionId: 1,
        x: 1.0,
        y: 1.0,
        z: 1.0,
      }),
    })
  }

  const publish2 = (user) => {
    // 클라이언트가 연결되어 있지 않으면 함수를 종료합니다.
    if (!client.current.connected) return

    // 클라이언트를 사용하여 소켓 서버에 메시지를 전송합니다.
    client.current.publish({
      // 목적지(엔드포인트)를 지정합니다.
      destination: "/pub/join/1",
      // 전송할 메시지의 본문입니다. 여기서는 JSON 문자열로 변환합니다.
      body: JSON.stringify(user),
    })
  }

  // 메시지를 구독하는 함수를 정의합니다.
  const subscribe = () => {
    // 클라이언트를 사용하여 특정 토픽을 구독합니다.
    client.current.subscribe("/sub/move/1", (message) => {
      // 메시지에 본문이 존재하면 JSON으로 파싱합니다.
      if (message.body) {
        const jsonBody = JSON.parse(message.body)
        // 새로운 메시지를 기존의 userList에 추가합니다.
        setUserList((currentList) => [...currentList, jsonBody])
      }
    })
  }

  // 소켓 연결을 해제하는 함수를 정의합니다.
  const disconnect = () => {
    console.log("Disconnected from the WS server")
    // 클라이언트를 비활성화하여 연결을 종료합니다.
    client.current.deactivate()
  }

  // 폼 제출 이벤트를 처리하는 함수를 정의합니다.
  const handleSubmit = (event) => {
    // 기본 이벤트를 방지합니다(여기서는 페이지 새로고침을 방지합니다).
    event.preventDefault()
    // 메시지를 발행하는 함수를 호출합니다.
    publish()
  }

  // 컴포넌트가 마운트될 때 연결을 시작하고,
  // 언마운트될 때 연결을 해제하기 위한 useEffect 훅입니다.
  useEffect(() => {
    connect()
    // 클린업 함수를 통해 컴포넌트가 언마운트될 때 연결을 해제합니다.
    return () => disconnect()
  }, [])

  // JSX를 반환하여 UI를 렌더링합니다.
  return (
    <div>
      {/* 사용자 리스트를 나열하여 보여주는 부분입니다. */}
      <div className={"chat-list"}>
        {userList.map((user, index) => (
          <div key={index}>
            {user.uuid}: {user.x}, {user.y}, {user.z}
          </div>
        ))}
      </div>
      {/* 폼 제출 이벤트가 발생하면 handleSubmit 함수를 호출합니다. */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type={"submit"} value={"의견 보내기"} />
      </form>
    </div>
  )
}

// 컴포넌트를 내보냅니다.
export default CreateMulti
