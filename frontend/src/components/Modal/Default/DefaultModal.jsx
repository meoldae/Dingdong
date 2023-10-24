import styles from "./DefaultModal.module.css"

const DefaultModal = ({ content, ok, cancel, okClick, cancelClick }) => {
  // 모달 외부의 배경이 어둡게 변하는건 모달을 사용하는 page에서 작성해야할듯 합니다.
  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>{content}</div>
      <div className={styles.HorizontalLine} />
      <div className={styles.VerticalLine} />
      <div className={styles.ButtonContainer}>
        <div
          className={styles.Button}
          style={{ color: "#049463" }}
          onClick={okClick}
        >
          {ok}
        </div>
        <div
          className={styles.Button}
          style={{ color: "#2C2C2C" }}
          onClick={cancelClick}
        >
          {cancel}
        </div>
      </div>
    </div>
  )
}

export default DefaultModal
