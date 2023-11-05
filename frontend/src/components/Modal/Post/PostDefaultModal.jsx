// 라이브러리
import { useState } from "react"

// 컴포넌트
import Card from "../../UI/Card"
import DefaultModal from "../Default/DefaultModal"

// 스타일
import styles from "./PostDefaultModal.module.css"

const PostDefaultModal = (props) => {
  // 이미지 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 우표선택 종료모달 상태관리
  const [isFinishSelectPostCard, setIsFinishSelectPostCard] = useState(false)
  // 편지함 종료모달 상태관리
  const [isFinishSelectPost, setIsFinishSelectPost] = useState(false)

  // 종료모달 함수
  const finishSelectHandler = () => {
    if (props.checkStatus === "postbox") {
      setIsFinishSelectPost(true)
    } else {
      setIsFinishSelectPostCard(true)
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => finishSelectHandler()} />
      {props.postCheck ? (
        <Card className={styles.containerOther}>
          <div className={styles.xmarkImg} onClick={props.cancelClick}>
            <img src={`${urlPath}/assets/icons/x.png`} />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      ) : (
        <Card className={styles.containerMy}>
          <div className={styles.xmarkImg} onClick={props.cancelClick}>
            <img src={`${urlPath}/assets/icons/x.png`} />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      )}

      {/* 우표선택 종료모달 */}
      {isFinishSelectPostCard && (
        <>
          <div className={styles.finishSelectOverlay} onClick={() => setIsFinishSelectPostCard(false)} />
          <div className={styles.finishSelectContainer}>
            <DefaultModal
              content={"우표 선택을 종료하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={props.cancelClick}
              cancelClick={() => setIsFinishSelectPostCard(false)}
            />
          </div>
        </>
      )}
    </>
  )
}

export default PostDefaultModal
