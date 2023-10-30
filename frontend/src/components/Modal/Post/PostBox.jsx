import { useState, useEffect, useRef } from "react";
import Letter from "../../PostBox/Letter";
import styles from "./PostBox.module.css";
import PostDefaultModal from "./PostDefaultModal";
import { useRecoilValue } from "recoil";
import { isPostBoxVisibleAtom } from "@/atom/PostAtom";
import { fetchLetterData } from "@/api/User";

const PostBox = (props) => {
  const isPostBoxVisible = useRecoilValue(isPostBoxVisibleAtom);
  const [letters, setLetters] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const letterBoxRef = useRef();
  const observerRef = useRef();

  const onSuccess = (response) => {
    setLetters(prevLetters => [...prevLetters, ...response.data.data.content]);
    setHasMore(!response.data.data.last);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  const onError = (error) => {
    console.error("Error fetching letter data:", error);
    setLoading(false);
  };

  const loadMoreLetters = () => {
    if (hasMore && !loading) {
      setLoading(true);
      fetchLetterData(page, onSuccess, onError);
    }
  };

  useEffect(() => {
    if (isPostBoxVisible) {
      loadMoreLetters();
    }
  }, [isPostBoxVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreLetters();
      }
    }, { threshold: 0.9 });
  
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
      <PostDefaultModal className={styles.postBoxContainer} PostDefaultTitle={"편지함"} postCheck={false} cancelClick={props.cancelClick}>
        <div className={styles.letterBox} ref={letterBoxRef}>
          {letters.map((letter, index) => (
            <Letter key={letter.id} id={letter.id} stamp={letter.stampImgUrl} letterTitle={letter.nickName} checkRead={letter.isRead} />
          ))}
          <div ref={observerRef}></div>
        </div>
      </PostDefaultModal>
    )
  )
}

export default PostBox;
