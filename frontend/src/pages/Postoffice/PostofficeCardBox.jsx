import { useRecoilState } from "recoil"
import DefaultBtn from "../../components/Button/Default/DefaultBtn"
import styles from "./PostofficeCardBox.module.css"
import PostofficeDefaultModal from "./PostofficeDefaultModal"
import { useState } from "react"
import { postofficeSendLetterAtom } from "../../atom/PostAtom"

const PostofficeCardBox = (props) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardComment, setCardComment] = useState()
  const [onPostofficeSendLetter,setOnPostofficeSendLetter] = useRecoilState(postofficeSendLetterAtom);
  const handleCardClick = (cardIdx, cardSrc, comment) => {
    setSelectedCard({ idx: cardIdx + 1, src: cardSrc })
    setCardComment(comment)
  }
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const handleSelectButtonClick = () => {
    if (selectedCard) {
      props.onSelectButtonClick(selectedCard)
      setOnPostofficeSendLetter(true);  
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
    <div className={styles.MainContainer}>
      <PostofficeDefaultModal
        PostDefaultTitle={"우표 선택"}
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
              src={`${urlPath}/assets/images/post/${card.src}`}
              onClick={() => handleCardClick(idx, card.src, card.comment)}
            />
          ))}
        </div>
        <div className={styles.postCardComment}>{cardComment}</div>
        <div className={styles.selectBtn}>
          <DefaultBtn
            btnName={"선택하기"}
            onClick={handleSelectButtonClick}
            color={"#F2CBE4"}
          />
        </div>
      </PostofficeDefaultModal>
    </div>
  )
}

export default PostofficeCardBox
