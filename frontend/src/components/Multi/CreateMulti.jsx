import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from "sockjs-client";

function CreateMulti() {
  const [chatList, userList] = useState([]);

  const { apply_id } = useParams();
  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws"),
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: '/pub/move',
      body: JSON.stringify({
        applyId: apply_id,
        chat: chat,
      }),
    });

    setChat('');
  };

  const subscribe = () => {
    client.current.subscribe('/sub/move/' + apply_id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [
        ..._chat_list, json_body
      ]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };
  
  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <div>
      <div className={'chat-list'}>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <input type={'submit'} value={'의견 보내기'} />
      </form>
    </div>
  );
}

export default CreateMulti;