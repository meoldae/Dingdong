import React from "react"
import SharingModalListItem from "./SharingModalListItem"
import { kakao, twitter, urlCopy, save } from "./sharingIcon"
import { useRecoilValue } from "recoil"
import { textareaAtom } from "../../../atom/TextareaAtom"
import { kakaoUrlAtom } from "../../../atom/KakaoUrlAtom"
import styles from "./Share.module.css"
import html2canvas from "html2canvas"
import { userAtom } from "../../../atom/UserAtom"

function SharingModalList(props) {
  const recoilText = useRecoilValue(textareaAtom)
  const kakaoUrl = useRecoilValue(kakaoUrlAtom)
  const userInfo = useRecoilValue(userAtom)
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const url = encodeURI(window.location.href)
  const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1
  }

  const shareUrl = (e) => {
    let currentUrl = window.location.href

    // shareMode가 "room"일 때 URL 수정
    if (props.shareMode === "room") {
      currentUrl = currentUrl.replace("/room/", "/invite/")
    }

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl) // 수정된 currentUrl을 클립보드에 복사
        .then(() => {
          if (props.shareMode === "room") {
            alert(`나의 방 주소가 복사되었습니다.\n친구들에게 공유해보세요!`)
          } else if (props.shareMode === "start") {
            alert(
              `우표 테스트 주소가 복사되었습니다.\n친구들에게 공유해보세요!`
            )
          } else if (props.shareMode === "result") {
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
      textarea.value = currentUrl // 수정된 currentUrl을 사용

      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      if (props.shareMode === "room") {
        alert(`나의 방 주소가 복사되었습니다.\n친구들에게 공유해보세요!`)
      } else if (props.shareMode === "start") {
        alert(`우표 테스트 주소가 복사되었습니다.\n친구들에게 공유해보세요!`)
      } else {
        alert(`우표 테스트 결과가 복사되었습니다.\n친구들에게 공유해보세요!`)
      }
    }
  }

  const shareTwitter = (e) => {
    if (props.shareMode === "room") {
      const text = `딩동! ${userInfo.nickname}님의 방을 방문해보세요!`
      window.open(
        "https://twitter.com/intent/tweet?text=" +
          text +
          "&url=" +
          url.replace("/room/", "/invite/") +
          "&media=" +
          kakaoUrl
      )
      // props.setSharingAtom(false)
    } else if (props.shareMode === "start") {
      const text = "딩동! 나에게 어울리는 우표는?"
      window.open(
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url
      )
    } else if (props.shareMode === "result") {
      const text = "딩동! 나에게 어울리는 우표는?"
      window.open(
        "https://twitter.com/intent/tweet?text=" + text + "&url=" + url
      )
    }
  }

  

  const shareKakao = (e) => {  
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(JS_KEY)
    }
    
    let currentUrl = window.location.href

    // shareMode가 "room"일 때 URL 수정
    if (props.shareMode === "room") {
      currentUrl = currentUrl.replace("/room/", "/invite/")
    }

    if (props.shareMode === "room") {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          THU: kakaoUrl,
          TITLE: `딩동! ${userInfo.nickname}님의 방에 편지를 보내주세요.`,
          DESC: recoilText,
          MOBILE_LINK: currentUrl,
          WEB_LINK: currentUrl,
        }, 
      })
    } else if (props.shareMode === "start") {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          THU: "https://ding-dong.s3.ap-northeast-2.amazonaws.com/StampTestLogo.png",
          TITLE: "나에게 어울리는 우표는?",
          DESC: "어울리는 우표를 찾아 친구에게 편지를 보내보세요.",
          MOBILE_LINK: currentUrl,
          WEB_LINK: currentUrl,
        }
      })
    } else if (props.shareMode === "result") {
      window.Kakao.Share.sendCustom({
        templateId: 100120,
        templateArgs: {
          THU: `https://ding-dong.s3.ap-northeast-2.amazonaws.com/Stamp${props.resultSrcUrl.replace(
            `${urlPath}/assets/StampTest/`,
            ""
          )}`,
          TITLE: "나에게 어울리는 우표 확인하기",
          DESC: "우표 테스트 결과를 확인해보세요!",
          MOBILE_LINK: currentUrl,
          WEB_LINK: currentUrl,
        },
      })
    }
  }
  const saveImg = (e) => {
    const element = document.getElementById("shareModal")

    html2canvas(element).then((canvas) => {
      const saveImg = (uri, filename) => {
        let link = document.createElement("a")

        document.body.appendChild(link)

        link.href = uri
        link.download = filename
        link.click()

        document.body.removeChild(link)
      }
      saveImg(canvas.toDataURL("image/png"), "ding_dong.png")
    })
  }

  const saveImgTest = (e) => {
    const downloadImage = (uri, filename) => {
      let link = document.createElement("a")
      document.body.appendChild(link)
      link.href = uri
      link.download = filename
      link.click()
      document.body.removeChild(link)
    }
    downloadImage(props.resultSrcUrl, "StampResult.png")
  }

  let sharetype = []
  if (props.shareMode === "start") {
    sharetype = [
      { icon: urlCopy, name: "URL복사", click: shareUrl },
      { icon: kakao, name: "카카오톡", click: shareKakao },
      { icon: twitter, name: "트위터", click: shareTwitter },
    ]
  } else if (props.shareMode === "result") {
    sharetype = [
      { icon: urlCopy, name: "URL복사", click: shareUrl },
      { icon: save, name: "저장하기", click: saveImgTest },
      { icon: kakao, name: "카카오톡", click: shareKakao },
      { icon: twitter, name: "트위터", click: shareTwitter },
    ]
  } else {
    sharetype = [
      { icon: urlCopy, name: "URL복사", click: shareUrl },
      { icon: save, name: "저장하기", click: saveImg },
      { icon: kakao, name: "카카오톡", click: shareKakao },
      { icon: twitter, name: "트위터", click: shareTwitter },
    ]
  }

  if (isSafari()) {
    sharetype = [
      { icon: urlCopy, name: "URL복사", click: shareUrl },
      { icon: kakao, name: "카카오톡", click: shareKakao },
      { icon: twitter, name: "트위터", click: shareTwitter },
    ]
  }

  if (props.shareMode === "start" || props.shareMode === "result") {
    return (
      <div className={styles.share}>
        {sharetype.map((share) => (
          <SharingModalListItem
            key={share.name}
            icon={share.icon}
            name={share.name}
            click={share.click}
            className={styles.shareItem}
            color={"black"}
          />
        ))}
      </div>
    )
  } else if (isSafari()) {
    return (
      <div className={styles.shareRoomSafari}>
        {sharetype.map((share) => (
          <SharingModalListItem
            key={share.name}
            icon={share.icon}
            name={share.name}
            click={share.click}
            className={styles.shareItem}
            color={"black"}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div className={styles.shareRoom}>
        {sharetype.map((share) => (
          <SharingModalListItem
            key={share.name}
            icon={share.icon}
            name={share.name}
            click={share.click}
            className={styles.shareItem}
            color={"black"}
          />
        ))}
      </div>
    )
  }
}

export default SharingModalList
