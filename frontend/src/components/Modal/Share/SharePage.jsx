import html2canvas from "html2canvas";
import styles from "./SharePage.module.css";

const SharePage = ({ imageSrc }) => {
  const day = "23.10.19";
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={imageSrc} alt="Shared Content" />
        <h3>{day}</h3>
        <div>
          <textarea className={styles.text} spellCheck="false"></textarea>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
