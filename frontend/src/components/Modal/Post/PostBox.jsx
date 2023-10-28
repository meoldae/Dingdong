import { useEffect } from "react"
import Letter from "../../PostBox/Letter"
import styles from "./PostBox.module.css"
import PostDefaultModal from "./PostDefaultModal"
import { useRecoilValue } from "recoil"
import { isPostBoxVisibleAtom } from "../../../atom/PostAtom"

const PostBox = (props) => {
  const isPostBoxVisible = useRecoilValue(isPostBoxVisibleAtom)

  return (
    isPostBoxVisible && (
      <PostDefaultModal
        className={styles.postBoxContainer}
        PostDefaultTitle={"편지함"}
        postCheck={false}
        cancelClick={props.cancelClick}
      >
        <div className={styles.letterBox}>
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={true} />
          <Letter letterTitle={"유저"} checkRead={false} />
        </div>
      </PostDefaultModal>
    )
  )
}

export default PostBox
