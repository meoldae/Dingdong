// 라이브러리
import { useSetRecoilState } from "recoil";

// 컴포넌트
import Card from "../../components/UI/Card";

// Atom
import { postofficeCardAtom } from "../../atom/PostAtom";

// 스타일
import styles from "./PostofficeDefaultModal.module.css"


const PostDefaultModal = (props) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const setOnPostOfficeCard = useSetRecoilState(postofficeCardAtom);
  
  return (
    <>
      <div className={styles.overlay} onClick={()=>{setOnPostOfficeCard(false)}}/>
        <Card className={styles.container}>
          <div className={styles.xmarkImg} onClick={()=>{setOnPostOfficeCard(false)}}>
            <img src={`${urlPath}/assets/icons/x.png`} />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
    </>
  )
}

export default PostDefaultModal
