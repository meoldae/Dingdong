import styles from "./SignUpPage.module.css"

const SignUpPage = () => {
  const query = new URLSearchParams(window.location.search)
  const memberId = query.get("memberId") // 멤버ID

  return (
    <div className={styles.Container}>
      <div className={styles.TitleContainer}>
        <span style={{ color: "#049463" }}>프로필 </span>
        <span style={{ color: "#2C2C2C" }}>선택</span>
      </div>
    </div>
  )
}

export default SignUpPage
