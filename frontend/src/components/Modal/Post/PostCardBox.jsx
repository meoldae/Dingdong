import DefaultBtn from "../../Button/Default/DefaultBtn"
import styles from "./PostCardBox.module.css"
import PostDefaultModal from "./PostDefaultModal"
import { useState } from "react"

const PostCardBox = (props) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardComment, setCardComment] = useState()

  const handleCardClick = (cardIdx, cardSrc, comment) => {
    setSelectedCard({ idx: cardIdx + 1, src: cardSrc })
    setCardComment(comment)
  }

  const handleSelectButtonClick = () => {
    if (selectedCard) {
      props.onSelectButtonClick(selectedCard)
    } else {
      alert("우표를 선택해주세요!")
    }
  }

  const cards = [
    { src: "cloud.png", comment: "몽글몽글한 마음을 전달해보세요!" },
    { src: "clover.png", comment: "행운의 마음을 전달해보세요!" },
    { src: "flower.png", comment: "아름다운 기억을 전달해보세요!" },
    { src: "heart.png", comment: "사랑을 담아 전달해보세요!" },
    { src: "puzzle.png", comment: "추억의 조각을 전달해보세요!" },
    { src: "rocket.png", comment: "응원의 마음을 담아 전달해보세요!" },
    { src: "star.png", comment: "특별한 마음을 전달해요!" },
    { src: "thunder.png", comment: "에너지를 전달해보세요!" },
  ]

  return (
    <PostDefaultModal
      PostDefaultTitle={"우표 선택"}
      cancelClick={props.cancelClick}
      postCheck={true}
    >
      <div className={styles.postCardContainer}>
        {cards.map((card, idx) => (
          <img
            key={card.src}
            className={
              selectedCard?.src === card.src
                ? `${styles.postCard} ${styles.selected}`
                : styles.postCard
            }
            src={`assets/images/post/${card.src}`}
            onClick={() => handleCardClick(idx, card.src, card.comment)}
          />
        ))}
      </div>
      <div className={styles.postCardComment}>{cardComment}</div>
      <div className={styles.selectBtn}>
        <DefaultBtn btnName={"선택하기"} onClick={handleSelectButtonClick} />
      </div>
    </PostDefaultModal>
  )
}

export default PostCardBox
