// 라이브러리
import { useSetRecoilState } from "recoil"

// 컴포넌트
import Card from "../../UI/Card"

// 스타일
import styles from "./PostDefaultModal.module.css"

// Atom
import { isFinishPostBoxVisibleAtom } from "../../../atom/PostAtom"

const PostDefaultModal = (props) => {
  // 이미지 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // X버튼 클릭 시, 상태관리
  const setIsFinishPostBoxVisible = useSetRecoilState(isFinishPostBoxVisibleAtom)

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
      {props.postCheck ? (
        <Card className={styles.containerOther}>
          <div className={styles.xmarkImg} onClick={() => setIsFinishPostBoxVisible(true)}>
            <img src={`${urlPath}/assets/icons/x.png`} />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      ) : (
        <Card className={styles.containerMy}>
          <div className={styles.xmarkImg} onClick={() => setIsFinishPostBoxVisible(true)}>
            <img src={`${urlPath}/assets/icons/x.png`} />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      )}
    </>
  )
}

export default PostDefaultModal
