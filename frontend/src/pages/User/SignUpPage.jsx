import styles from "./SignUpPage.module.css"

const SignUpPage = () => {
  const query = new URLSearchParams(window.location.search)
  const memberId = query.get("memberId")

  return (
    <div className={styles.Container}>
      <div>
        <span>프로필</span>
        <span>선택</span>
      </div>
      <div>{memberId}</div>
    </div>
  )
}

export default SignUpPage
