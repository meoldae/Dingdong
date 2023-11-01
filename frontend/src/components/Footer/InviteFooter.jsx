import { useEffect, useState } from "react"
import PostCardBox from "../Modal/Post/PostCardBox"
import RoomBtn from "../Button/Room/RoomBtn"
import SendLetter from "../Modal/Post/SendLetter"
import styles from "./Footer.module.css" 
import { useNavigate } from "react-router-dom" 

const OtherFooter = (props) => {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSendLetterModalVisible, setIsSendLetterModalVisible] =
    useState(false)
  const [selectedPostCard, setSelectedPostCard] = useState(null)
  const [isHeart, setIsHeart] = useState(false);

  const onHomeHandler = (e) => {
    navigate("/login")
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const openSendLetterModal = () => {
    setIsSendLetterModalVisible(true)
  }

  const closeSendLetterModal = () => {
    setIsSendLetterModalVisible(false)
  }

  const handleSelectButtonClick = (selectedCard) => {
    setSelectedPostCard(selectedCard)
    closeModal()
    openSendLetterModal()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inviteFooter}> 
        <div className={styles.background}>
          <div>
            <div className={styles.circle} onClick={onHomeHandler}>
              <div className={styles.button}>
                <img src={"/assets/icons/post.png"} className={styles.iconImage}/>
                <div className={styles.buttonContent}>딩동 즐기러 가기</div>
              </div>
            </div>
            <div className={styles.circle} onClick={openModal}>
              <div className={styles.button}>
                <img src={"/assets/icons/post.png"} className={styles.iconImage}/>
                <div className={styles.buttonContent}>편지 남기기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <PostCardBox
          cancelClick={closeModal}
          onSelectButtonClick={handleSelectButtonClick}
        />
      )}
      {isSendLetterModalVisible && (
        <SendLetter onClose={closeSendLetterModal} card={selectedPostCard} />
      )}
    </div>
  )
}

export default OtherFooter
