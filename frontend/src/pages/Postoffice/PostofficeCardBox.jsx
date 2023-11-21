// 라이브러리
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

// 컴포넌트
import DefaultPostBtn from "../../components/Button/DefaultPost/DefaultPostBtn";
import PostofficeDefaultModal from "./PostofficeDefaultModal";

// 토스트
import toast from "react-hot-toast";

// 스타일
import styles from "./PostofficeCardBox.module.css";

// Atom
import { postofficeSendLetterAtom, selectedPostCardAtom, postofficeCardAtom } from "../../atom/PostAtom";

const PostofficeCardBox = () => {
  // 상태관리
  const [cardComment, setCardComment] = useState("");
  // 리코일 상태관리
  const [selectedPostCardItem, setSelectedPostCardItem] = useRecoilState(selectedPostCardAtom)
  const setOnPostofficeSendLetter = useSetRecoilState(postofficeSendLetterAtom);
  const setOnPostOfficeCard = useSetRecoilState(postofficeCardAtom)

  // 우표선택 함수
  const handleCardClick = (cardIdx, cardSrc, comment) => {
    setSelectedPostCardItem({ idx: cardIdx + 1, src: cardSrc, order: numberToString(cardIdx + 1) })
    setCardComment(comment);
  };

  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL;

  // 우표선택 완료 함수
  const handleSelectButtonClick = () => {
    if (selectedPostCardItem) {
      setOnPostOfficeCard(false)
      setOnPostofficeSendLetter(true)
    } else {
      toast.error("우표를 선택해주세요!");
    }
  };

  // 숫자 -> 문자열 변환 함수
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
  
  // 카드 내용 리스트
  const cards = [
    { src: "heart.png", comment: "두근거리는 사랑을 전달해보세요!" },
    { src: "thunder.png", comment: "에너지를 전달해보세요!" },
    { src: "star.png", comment: "반짝 빛나는 마음을 전달해보세요!" },
    { src: "puzzle.png", comment: "추억의 조각을 전달해보세요!" },
    { src: "dingdong.png", comment: "딩동! 특별한 마음을 전달해보세요!" },
    { src: "clover.png", comment: "행운의 마음을 전달해보세요!" },
    { src: "cloud.png", comment: "몽글몽글한 마음을 전달해보세요!" },
    { src: "flower.png", comment: "아름다운 기억을 전달해보세요!" },
    { src: "rocket.png", comment: "응원의 마음을 전달해보세요!" },
  ];

  return (
    <div className={styles.MainContainer}>
      <PostofficeDefaultModal PostDefaultTitle={"우표를 골라주세요"}>
      <div className={styles.greenLine}></div>
        <div className={styles.postCardContainer}>
          {cards.map((card, idx) => (
            <div className={styles.postCardCenter} key={card.src}>
              <img
                className={
                  selectedPostCardItem?.src === card.src
                  ? `${styles.postCard} ${styles.selected} ${styles[`${card.src.split(".")[0]}Selected`]}`
                  : ''
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
          <DefaultPostBtn btnName={"선택하기"} onClick={() => handleSelectButtonClick()} color='six'/>
        </div>
      </PostofficeDefaultModal>
    </div>
  );
};

export default PostofficeCardBox;
