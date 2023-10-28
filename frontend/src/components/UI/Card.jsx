import styles from "./Card.module.css"

const Card = (props) => {
  return (
    <>
      <div className={styles.overlay} onClick={props.cancelClick}></div>
      <div className={`${styles.CardContainer} ${props.className}`}>
        {props.children}
      </div>
    </>
  )
}

export default Card
