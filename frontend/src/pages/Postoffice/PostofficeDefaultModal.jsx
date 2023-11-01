import Card from "../../components/UI/Card";
import { postofficeCardAtom } from "../../atom/PostAtom";
import styles from "./PostofficeDefaultModal.module.css"
import { useRecoilState } from "recoil";
const PostDefaultModal = (props) => {
  const [onPostofficeCard, setOnPostOfficeCard] =
    useRecoilState(postofficeCardAtom); 
     return (
    <>
      <div className={styles.overlay} onClick={()=>{setOnPostOfficeCard(false)}}/>
      {onPostofficeCard ? (
        <Card className={styles.containerOther}>
          <div className={styles.xmarkImg} onClick={()=>{setOnPostOfficeCard(false)}}>
            <img src="/assets/icons/Pink_X-mark.png" />
          </div>
          <div className={styles.containerTitle}>{props.PostDefaultTitle}</div>
          <div className={styles.horizontalRule}></div>
          <div className={props.className}>{props.children}</div>
        </Card>
      ) : (
        <Card className={styles.containerMy}>
          <div className={styles.xmarkImg} onClick={()=>{setOnPostOfficeCard(false)}}>
            <img src="/assets/icons/Pink_X-mark.png" />
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
