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
    if (props.shareMode === "board") {
      window.Kakao.Share.sendDefault({
        //... the rest of the function remains the same.
      })
    } else if (props.shareMode === "start") {
      window.Kakao.Share.sendDefault({
        //... the rest of the function remains the same.
      })
    } else {
      window.Kakao.Share.sendDefault({
        //... the rest of the function remains the same.
      })
    }
  }

  const sharetype = [
    { icon: urlCopy, name: "URL복사", click: shareUrl },
    { icon: twitter, name: "트위터", click: shareTwitter },
    { icon: kakao, name: "카카오톡", click: shareKakao },
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
