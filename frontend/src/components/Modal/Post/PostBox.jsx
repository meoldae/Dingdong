// 라이브러리
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

// 컴포넌트
import Letter from "../../PostBox/Letter";
import PostDefaultModal from "./PostDefaultModal";

// 스타일
import styles from "./PostBox.module.css";

// Atom
import { isPostBoxVisibleAtom } from "@/atom/PostAtom";

// API
import { fetchLetterData } from "@/api/User";


const PostBox = (props) => {
  // 편지함 보여주기 여부
  const isPostBoxVisible = useRecoilValue(isPostBoxVisibleAtom);

  // 상태관리
  const [letters, setLetters] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const letterBoxRef = useRef();
  const observerRef = useRef();

  // API성공 시
  const onSuccess = (response) => {
    setLetters((prevLetters) => [
      ...prevLetters,
      ...response.data.data.content,
    ]);
    setHasMore(!response.data.data.last);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  // API실패 시
  const onError = (error) => {
    console.error("Error fetching letter data:", error);
    setLoading(false);
  };

  // 편지 가져오기 API함수
  const loadMoreLetters = () => {
    if (hasMore && !loading) {
      setLoading(true);
      fetchLetterData(page, onSuccess, onError);
    }
  };

  // 편지함 보여주기 변경에 따라 API작동
  useEffect(() => {
    if (isPostBoxVisible) {
      loadMoreLetters();
    }
  }, [isPostBoxVisible]);

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreLetters();
        }
      },
      { threshold: 0.9 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    isPostBoxVisible && (
      <div className={styles.MainContainer}>
        <PostDefaultModal
          className={styles.postBoxContainer}
          PostDefaultTitle={"편지함"}
          postCheck={false}
          cancelClick={props.cancelClick}
          checkStatus={"postbox"}
        >
          {letters.length?
          <div className={styles.letterBox} ref={letterBoxRef}>
            {letters.map((letter) => (
              <Letter
                key={letter.id}
                id={letter.id}
                stamp={letter.stampImgUrl}
                letterTitle={letter.nickName}
                checkRead={letter.isRead}
              />
            ))}
            <div ref={observerRef}></div>
          </div>
          :<>
          {/* 텅 넣을 것 */}
          </>}
        </PostDefaultModal>
      </div>
    )
  );
};

export default PostBox;
