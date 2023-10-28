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

  const handlerChecker = () => {
    if (props.checker === "OtherFooter") {
      return true
    } else {
      return false
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

  const writingPadCards = [
    { id: 1, check: true },
    { id: 2, check: false },
    { id: 3, check: false },
    { id: 4, check: true },
    { id: 5, check: false },
    { id: 6, check: false },
    { id: 7, check: true },
    { id: 8, check: false },
    { id: 9, check: true },
  ]

  return (
    <>
      {handlerChecker() ? (
        <PostDefaultModal
          PostDefaultTitle={"우표 선택"}
          cancelClick={props.cancelClick}
          postCheck={handlerChecker()}
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
            <DefaultBtn
              btnName={"선택하기"}
              onClick={handleSelectButtonClick}
            />
          </div>
        </PostDefaultModal>
      ) : (
        <>
          <PostDefaultModal
            PostDefaultTitle={"편지함"}
            cancelClick={props.cancelClick}
            postCheck={handlerChecker()}
          >
            <div className={styles.postCardContainer}>
              {writingPadCards.map((card) => (
                <img
                  key={card.id}
                  className={styles.postCard}
                  src={"assets/icons/writingPad.svg"}
                  onClick={() =>
                    handleCardClick(card.id, "assets/icons/writingPad.svg")
                  }
                />
              ))}
            </div>
          </PostDefaultModal>
        </>
      )}
    </>
  )
}

export default PostCardBox
