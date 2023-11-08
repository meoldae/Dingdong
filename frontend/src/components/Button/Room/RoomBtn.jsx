import styles from "./RoomBtn.module.css"
import { motion } from "framer-motion"

const urlPath = import.meta.env.VITE_APP_ROUTER_URL
const imagePath = `${urlPath}/assets/icons/`

const RoomBtn = ({ heartCount, img, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onHoverStart={e => {}}
      onHoverEnd={e => {}}
      onTap={e => {}}
      onTapStart={e => {}}
      onTapCancel={e => {}}
    >
      <div className={styles.circle} onClick={onClick}>
        {/* img버튼 상세 표기 */}
        {/* addUser / heart / post / postBox / roomEdit / share / worldMap / neighborList */}
        <img src={`${imagePath}${img}.png`} className={`${img.includes('crop') || img.includes('addUser') || img.includes('neighbor') ? styles.iconImageNeighbor : styles.iconImage}`} />
        {img.includes('Heart') && <span className={styles.textFullHeart}>{heartCount}</span>}
        {img.includes('heart') && <span className={styles.textEmptyHeart}>{heartCount}</span>}
      </div>
    </motion.div>
  )
}

export default RoomBtn
