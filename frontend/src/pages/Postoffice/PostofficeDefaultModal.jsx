// 라이브러리
import { useState } from "react";
import { useSetRecoilState } from "recoil";

// 컴포넌트
import Card from "../../components/UI/Card";
import DefaultModal from "../../components/Modal/Default/DefaultModal";

// Atom
import { postofficeCardAtom } from "../../atom/PostAtom";

// 스타일
import styles from "./PostofficeDefaultModal.module.css"


const PostDefaultModal = (props) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const setOnPostOfficeCard = useSetRecoilState(postofficeCardAtom);

  // 우표함 종료확인 모달 상태관리
  const [isFinishPostCardBox, setIsFinishPostCardBox] = useState(false)
  
  return (
    <>
      <div className={styles.overlay} onClick={() => setIsFinishPostCardBox(true)}/>
      <Card className={styles.container}>
        <div className={styles.xmarkImg} onClick={() => setIsFinishPostCardBox(true)}>
          <img src={`${urlPath}/assets/icons/x.png`} />
        </div>
        <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
        <div className={styles.horizontalRule}></div>
        <div className={props.className}>{props.children}</div>
      </Card>

      {/* 우표함 종료확인 모달 */}
      {isFinishPostCardBox && (
        <>
          <div className={styles.finishOverlay} onClick={() => setIsFinishPostCardBox(false)} />
          <div className={styles.finishContainer}>
            <DefaultModal />
          </div>
        </>
      )}
    </>
  )
}

export default PostDefaultModal
