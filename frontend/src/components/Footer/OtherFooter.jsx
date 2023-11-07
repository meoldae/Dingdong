// 라이브러리
import { useEffect, useState } from "react"

// 컴포넌트
import PostCardBox from "../Modal/Post/PostCardBox"
import RoomBtn from "../Button/Room/RoomBtn"
import SendLetter from "../Modal/Post/SendLetter"

// 스타일
import styles from "./Footer.module.css"

// API
import { isHeartCheck, updateHeart } from "@/api/Room"


const OtherFooter = (props) => {
  // url경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 상태관리
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSendLetterModalVisible, setIsSendLetterModalVisible] =
    useState(false)
  const [selectedPostCard, setSelectedPostCard] = useState(null)
  const [isHeart, setIsHeart] = useState(false)

  // 하트 표시 함수
  useEffect(() => {
    isHeartCheck(
      props.props,
      (response) => {
        setIsHeart(response.data.data == "Y")
      },
      (error) => {
        console.log("Error with HeartFlag... ", error)
      }
    )
  }, [isHeart])

  // 편지 들어내면 삭제할 함수 ---
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
  // ---

  const handleSelectButtonClick = (selectedCard) => {
    setSelectedPostCard(selectedCard)
    closeModal()
    openSendLetterModal()
  }

  const updateHeartStatus = () => {
    updateHeart(
      props.props,
      (response) => {
        setIsHeart(response.data.data == "Y")
      },
      (error) => {
        console.log("Error with Room Heart... ", error)
      }
    )
  }

  const goSingleMap= () =>{
    window.location.replace(`${urlPath}/`)
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.secondFooter}>
        <div className={styles.background}>
          <RoomBtn
            img={isHeart ? "fullHeart" : "emptyheart"}
            onClick={updateHeartStatus}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.background}>
          <RoomBtn img={"worldMap"} onClick={goSingleMap} />
        </div>
        <div className={styles.background}>
          <RoomBtn img={"post"} onClick={openModal} />
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
