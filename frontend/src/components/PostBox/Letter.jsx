import styles from "./Letter.module.css"
import { useSetRecoilState } from "recoil"
import { isPostBoxVisibleAtom, isReceiveLetterVisibleAtom } from "@/atom/PostAtom"
import { letterIdAtom } from "@/atom/LetterAtom";

const Letter = ({ id, stamp, letterTitle, checkRead }) => {
  const setIsPostBoxVisible = useSetRecoilState(isPostBoxVisibleAtom)
  const setIsReceiveLetterVisible = useSetRecoilState(isReceiveLetterVisibleAtom)
  const setLetterId = useSetRecoilState(letterIdAtom)

  const getBaseNameFromUrl = (url) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const fileBaseName = fileName.split('.')[0];
    return fileBaseName;
  }
  
  const path = getBaseNameFromUrl(stamp);

  const openReceiveLetter = () => {
    setLetterId(id); 
    setIsPostBoxVisible(false)
    setIsReceiveLetterVisible(true)
  }

  return (
    <div className={styles.letterContainer} onClick={openReceiveLetter}>
      {checkRead ? (
        <></>
      ) : (
        <img
          src="/assets/icons/redDot.png"
          className={styles.noRead}
        />
      )}
      <img src={`/assets/images/letter/${path}.png`} alt="" style={{ width: '84px', height: '51px' }}/>
      <div className={styles.letterTitle}>{letterTitle}</div>
    </div>
  )
}

export default Letter
