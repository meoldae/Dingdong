import styles from "./DefaultModal.module.css"

const DefaultModal = ({ content, ok, cancel, okClick, cancelClick }) => {
  // 모달 외부의 배경이 어둡게 변하는건 모달을 사용하는 page에서 작성해야할듯 합니다.
  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>{content}</div>
      <div className={styles.ButtonContainer}>
        <div
          className={styles.Button}
          style={{ color: "#FFFFFF", background: "#02C26F", boxShadow: "0px 4px 0px #009152" }}
          onClick={okClick}
        >
          {ok}
        </div>
        <div
          className={styles.Button}
          style={{ color: "#000000", background: "#ECECEC", boxShadow: "0px 4px 0px #858585" }}
          onClick={cancelClick}
        >
          {cancel}
        </div>
      </div>
    </div>
  )
}

export default DefaultModal
