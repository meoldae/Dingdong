//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

importScripts('swenv.js'); 

const firebaseConfig = {
  // apiKey: 'AIzaSyB5eBZtGAmShRKylzvR0NJDZxc9zfWuJe4',
  apiKey: process.env.VITE_APP_FCM_API_KEY,
  authDomain: process.env.VITE_APP_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_PROJECT_ID,
  storageBucket: process.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_APP_ID
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(app);

// 백그라운드 서비스워커 설정
// react firebase가 자체 작동
// messaging.onBackgroundMessage(messaging, (payload) => {
  
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: payload,
//   };
  
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("push", function (e) {
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image,
//     tag: resultData.tag,
//     ...resultData,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });