import { HttpJson } from "./Http"
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging"

// 토큰생성 API
const createToken = async (param, success, fail) => {
    await HttpJson.post(`/fcm/login`, JSON.stringify(param)).then(success).catch(fail)
}

const deleteToken = async (success, fail) => {
    await HttpJson.delete(`/fcm/logout`).then(success).catch(fail)
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID
}

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const deleteFCMTokenAtServer = () => {
    // API 요청 FCM 로그아웃
    deleteFCMTokenAtServer(
        (response) => {
            
        },
        (error) => {
            console.log("Error With Delete FCM Token ...", error);
        }
    )
    localStorage.removeItem("FCMToken")
}

const setFCMTokenAtServer = (token) => {
    // API 요청 FCM 로그인
    createToken(token, 
        (response) => {
            localStorage.setItem("FCMToken", token);
        },
        (error) => {
            console.log("Error With Set FCM Token ...", error);
        }
    )
}

const getFirebaseToken = async () => {
    const token =  await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID
    })

    if (token) {
        setFCMTokenAtServer(token);
    } else {
        setPushEnabled(false);
        return null;
    }
}

export { app, messaging, createToken, deleteToken, firebaseConfig, getFirebaseToken, setFCMTokenAtServer, deleteFCMTokenAtServer };