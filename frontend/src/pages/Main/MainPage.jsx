import PostBox from "../../components/Modal/Post/PostBox"
import PostCardBox from "../../components/Modal/Post/PostCardBox"
import RecevieLetter from "../../components/Modal/Post/RecevieLetter"
import "./MainPage.css"
function MainPage() {
  return (
    <div id="main-container">
      {/* <PostCardBox /> */}
      {/* <PostBox /> */}
      <RecevieLetter />
    </div>
  )
}

export default MainPage
