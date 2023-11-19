//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyB5eBZtGAmShRKylzvR0NJDZxc9zfWuJe4",
//   authDomain: "dingdong-b8c54.firebaseapp.com",
//   projectId: "dingdong-b8c54",
//   storageBucket: "dingdong-b8c54.appspot.com",
//   messagingSenderId: "121655847297",
//   appId: "1:121655847297:web:eb5bec5168566e9d2b2080"
// };

// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyB5eBZtGAmShRKylzvR0NJDZxc9zfWuJe4",
  authDomain: "dingdong-b8c54.firebaseapp.com",
  projectId: "dingdong-b8c54",
  storageBucket: "dingdong-b8c54.appspot.com",
  messagingSenderId: "121655847297",
  appId: "1:121655847297:web:eb5bec5168566e9d2b2080"
});

const messaging = firebase.messaging(app);

// 백그라운드 서비스워커 설정
// react firebase가 자체 작동
messaging.onBackgroundMessage(messaging, (payload) => {
  
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});