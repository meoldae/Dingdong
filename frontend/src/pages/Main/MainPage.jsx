import PostBox from "../../components/Modal/Post/PostBox"
import PostCardBox from "../../components/Modal/Post/PostCardBox"
import SendLetter from "../../components/Modal/Post/sendLetter"
import "./MainPage.css"
function MainPage() {
  return (
    <div id="main-container">
      {/* <PostCardBox /> */}
      {/* <PostBox /> */}
      <SendLetter />
    </div>
  )
}

export default MainPage
