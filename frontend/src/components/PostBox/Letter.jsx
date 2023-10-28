import styles from "./Letter.module.css"
import { useSetRecoilState } from "recoil"
import { isPostBoxVisibleAtom } from "../../atom/PostAtom"

const Letter = ({ letterTitle, checkRead }) => {
  const setIsPostBoxVisible = useSetRecoilState(isPostBoxVisibleAtom)

  const openReceiveLetter = () => {
    setIsPostBoxVisible(false)
  }

  return (
    <div className={styles.letterContainer} onClick={openReceiveLetter}>
      {checkRead ? (
        <></>
      ) : (
        <img src="assets/icons/redDot.svg" className={styles.noRead} />
      )}
      <img src="assets/icons/writingPad.svg" alt="" />
      <div className={styles.letterTitle}>{letterTitle}</div>
    </div>
  )
}

export default Letter
