import React, { useEffect } from "react"
import SharingModalListItem from "./SharingModalListItem"
import {
  kakao,
  twitter,
  urlCopy,
} from "../../../assets/images/sharing/sharingIcon"
// import { useRecoilValue } from 'recoil';
// import { userNicknameAtom } from '../../atoms/userAtoms';
import styles from "./SharingModalList.module.css"

function SharingModalList(props) {
  // const userNickname = useRecoilValue(userNicknameAtom);
  const url = encodeURI(window.location.href)
  const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

  const shareUrl = (e) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          if (props.shareMode === "board") {
            alert()
            // `${userNickname}님의 편지 수신함이 복사되었습니다.\n친구들에게 공유해보세요!`
          } else if (props.shareMode === "start") {
            alert(
              `우표 테스트 주소가 복사되었습니다.\n친구들에게 공유해보세요!`
            )
          } else {
            alert(
              `우표 테스트 결과가 복사되었습니다.\n친구들에게 공유해보세요!`
            )
          }
        })
        .catch(() => {
          alert(`지원하지 않는 브라우저입니다.\n다른 브라우저로 접속해주세요.`)
        })
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.")
      }

      const textarea = document.createElement("textarea")
      textarea.value = window.location.href

      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      if (props.shareMode === "board") {
        alert()
        // `${userNickname}님의 편지 수신함이 복사되었습니다.\n친구들에게 공유해보세요!`
      } else if (props.shareMode === "start") {
        alert(`테스트 주소가 복사되었습니다.\n친구들에게 공유해보세요!`)
      } else {
        alert(`테스트 결과가 복사되었습니다.\n친구들에게 공유해보세요!`)
      }
    }
    if (props.shareMode === "board") {
      props.setSharingAtom(false)
    }
  }

  const shareTwitter = (e) => {
    if (props.shareMode === "board") {
      const text = "우리집에 편지를 보내주세요!"
      window.open(
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url
      )
      props.setSharingAtom(false)
    } else if (props.shareMode === "start") {
      const text = "우표 유형 테스트"
      window.open(
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url
      )
    } else {
      const text = "나에게 어울리는 우표 유형은?"
      window.open(
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url
      )
    }
  }

  const shareKakao = (e) => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JS_KEY);
    } 

    if (props.shareMode === "board") {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          TITLE : "딩동! ~~이네를 방문해보세요.",
          DESC : "~~이네를 방문해서 편지를 남겨보세요.",
          MOBILE_LINK: window.location.href,
          WEB_LINK: window.location.href,
        },
      });   
    } else if (props.shareMode === "start") {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          TITLE : "당신에게 어울리는 우표는?",
          DESC : "당신에게 어울리는 우표를 찾아 친구에게 편지를 보내보세요.",
          MOBILE_LINK: window.location.href,
          WEB_LINK: window.location.href,
        },
      });   
    } else {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          TITLE : "당신에게 어울리는 우표는?",
          DESC : "~~님의 우표 테스트 결과를 확인해보세요!",
          MOBILE_LINK: window.location.href,
          WEB_LINK: window.location.href,
        },
      });   
    }
  }

  const sharetype = [
    { icon: urlCopy, name: "URL복사", click: shareUrl },
    { icon: kakao, name: "카카오톡", click: shareKakao },
    { icon: twitter, name: "트위터", click: shareTwitter },
  ]

  return (
    <div className={styles.Container}>
      {sharetype.map((share) => (
        <SharingModalListItem
          key={share.name}
          icon={share.icon}
          click={share.click}
        />
      ))}
    </div>
  )
}

export default SharingModalList
