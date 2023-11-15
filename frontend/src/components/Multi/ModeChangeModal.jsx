import styles from "./ModeChangeModal.module.css"

const ModeChangeModal = ({ content, ok, cancel, okClick, cancelClick }) => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  return (
    <div className={styles.Container}>
      <img
        src={`${urlPath}/assets/icons/x.png`}
        className={styles.xButton}
        onClick={cancelClick}
      />
      <div className={styles.ContentContainer}>{content}</div>
      <div className={styles.ButtonContainer}>
        <div
          className={styles.Button}
          style={{
            color: "#FFFFFF",
            background: "#02C26F",
            boxShadow: "0px 4px 0px #009152",
          }}
          onClick={okClick}
        >
          {ok}
        </div>
        <div
          className={styles.Button}
          style={{
            color: "#000000",
            background: "#ECECEC",
            boxShadow: "0px 4px 0px #858585",
          }}
          onClick={cancelClick}
        >
          {cancel}
        </div>
      </div>
    </div>
  )
}

export default ModeChangeModal
