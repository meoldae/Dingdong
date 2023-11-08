// React와 관련된 필수 훅들과 소켓 관련 라이브러리를 임포트합니다.
import { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { MultiUsers } from "../../atom/MultiAtom";
import { userAtom } from "../../atom/UserAtom";
import { fetchMultiUser } from "../../api/User";
import axios from "axios";

// CreateMulti 컴포넌트를 정의합니다.
function CreateMulti() {
  // 컴포넌트의 상태로 userList를 관리합니다.
  // 이 상태는 소켓을 통해 받은 메시지들로 업데이트될 예정입니다.
  const [userList, setUserList] = useState({});
  const [moveList, setMoveList] = useState([]);

  // Recoil 상태 관리 라이브러리를 사용하여 전역 상태인 users를 가져오고 업데이트하는 함수를 가져옵니다.
  const [users, setUsers] = useRecoilState(MultiUsers)

  const hostUser = useRecoilValue(userAtom)

  console.log(hostUser.nickname)
  console.log(hostUser.roomId)
  console.log(hostUser.avatarId)

  const userInfo = useRecoilValue(userAtom);
  const userParam = {
    channelId: 1,
    nickname: userInfo.nickname,
    roomId: userInfo.roomId,
    x: 1.0,
    y: 1.0,
    z: 1.0
  }

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`http://192.168.31.26:8080/multi/${userParam.channelId}`);
      setUserList(response.data.data); 
      console.log(response.data.data);
      
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // useRef를 사용하여 소켓 클라이언트 인스턴스를 참조합니다.
  // 이는 컴포넌트가 리렌더링될 때마다 유지되어야 하기 때문입니다.
  const client = useRef({})

  const updateUserPosition = () => {
    const updatedUserParam = {
      ...userParam,
      x: userParam.x,
      y: userParam.y,
      z: userParam.z,
    };

    client.current.publish({
      destination: "/pub/move/1",
      body: JSON.stringify(updatedUserParam),
    });
  };

  // 첫 연결 하는 순간
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        console.log("Connected to the WS server");
        subscribe();
        publishJoin(userParam);
      },

    });

    client.current.activate();
  };


  // 사용자 입장
  const publishJoin = (user) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/join/1",
      body: JSON.stringify(user),
    })
  }

  // 사용자 퇴장
  const publishOut = (user) => {
    client.current.publish({
      destination: "/pub/out/1",
      body: JSON.stringify(user),
    });
  };

  const subscribe = () => {

    // 이동 채널 구독
    client.current.subscribe("/sub/move/1", (message) => {
      if (message.body) {
        const jsonBody = JSON.parse(message.body);
        setMoveList((currentList) => [...currentList, jsonBody]);
      }
    });

    // 사용자 채널 구독
    client.current.subscribe("/sub/channel/1", (message) => {
      if (message.body) {
        const newUser = JSON.parse(message.body);
        setUserList((currentList) => {
          return {
            ...currentList,
            [newUser.id]: newUser
          };
        });
      }
    }); 
  };

  const disconnect = () => {
    console.log("Disconnected from the WS server");
    publishOut(userParam);

    client.current.deactivate();
  };

  // 컴포넌트가 마운트될 때 연결을 시작하고,
  // 언마운트될 때 연결을 해제하기 위한 useEffect 훅입니다.
  useEffect(() => {
    connect();
    fetchUserList();
    return () => disconnect();
  }, []);

  const handleSubmit = (event) => {
    console.log(userList[1]);
  }


  return (
    <div>
      {/* 사용자 리스트를 나열하여 보여주는 부분입니다. */}
      <div className={"chat-list"}>
      </div>
      <button onClick={handleSubmit}>의견 보내기</button>
    </div>
  )
}

export default CreateMulti;
