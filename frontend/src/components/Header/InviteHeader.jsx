// 스타일
import { useRecoilValue } from "recoil"
import styles from "./Header.module.css"
import { roomInfoAtom } from "../../atom/RoomInfoAtom"

const Header = () => {
  const nickname = useRecoilValue(roomInfoAtom)

  return (
    <div className={styles.wrap}>
      <div className={styles.userName}>{nickname}의 방</div>
    </div>
  )
}
export default Header
