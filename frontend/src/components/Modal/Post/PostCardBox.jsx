import toast from "react-hot-toast";
import DefaultPostBtn from "../../Button/DefaultPost/DefaultPostBtn";
import styles from "./PostCardBox.module.css";
import PostDefaultModal from "./PostDefaultModal";
import { useState } from "react";

const PostCardBox = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardComment, setCardComment] = useState();
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  const handleCardClick = (cardIdx, cardSrc, comment) => {
    setSelectedCard({ idx: cardIdx + 1, src: cardSrc, order: numberToString(cardIdx + 1) });
    setCardComment(comment);
  };

  const handleSelectButtonClick = () => {
    if (selectedCard) {
      props.onSelectButtonClick(selectedCard);
    } else {
      toast.error("우표를 선택해주세요!");
    }
  };

  const numberToString = (num) => {
    switch (num) {
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      default: return "";
    }
  };

  const cards = [
    { src: "heart.png", comment: "두근거리는 사랑을 전달해보세요!" },
    { src: "thunder.png", comment: "에너지를 전달해보세요!" },
    { src: "star.png", comment: "반짝 빛나는 마음을 전달해해보세요!" },
    { src: "puzzle.png", comment: "추억의 조각을 전달해보세요!" },
    { src: "dingdong.png", comment: "딩동! 특별한 마음을 전달해보세요!" },
    { src: "clover.png", comment: "행운의 마음을 전달해보세요!" },
    { src: "cloud.png", comment: "몽글몽글한 마음을 전달해보세요!" },
    { src: "flower.png", comment: "아름다운 기억을 전달해보세요!" },
    { src: "rocket.png", comment: "응원의 마음을 전달해보세요!" },
  ];

  return (
    <div className={styles.MainContainer}>
      <PostDefaultModal
        PostDefaultTitle={"우표를 골라주세요"}
        cancelClick={props.cancelClick}
        postCheck={true}
        checkStatus={"postcardbox"}
      >
        {/* <div className={styles.greenLine}></div> */}
        <div className={styles.postCardContainer}>
          {cards.map((card, idx) => (
            <div className={styles.postCardCenter} key={card.src}>
              <img
                className={
                  selectedCard?.src === card.src
                    ? `${styles.postCard} ${styles.selected} ${styles[`${card.src.split(".")[0]}Selected`]}`
                    : styles.postCard
                }
                src={`${urlPath}/assets/images/post/${card.src}`}
                onClick={() => handleCardClick(idx, card.src, card.comment)}
              />
            </div>
          ))}
        </div>
        {cardComment ? (
          <div className={styles.postCardComment}>{cardComment}</div>
        ) : (
          <div className={styles.postCardComment}>우표를 선택해보세요!</div>
        )}
        <div className={styles.selectBtn}>
          <DefaultPostBtn btnName={"선택하기"} onClick={handleSelectButtonClick} color='six' />
        </div>
      </PostDefaultModal>
    </div>
  );
};

export default PostCardBox;
