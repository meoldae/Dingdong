import NeighborListModal from "../../components/Modal/Neighbor/NeighborListModal"
import PostBox from "../../components/Modal/Post/PostBox"
import PostDefaultModal from "../../components/Modal/Post/PostDefaultModal"
import Letter from "../../components/PostBox/Letter"
import "./MainPage.css"
function MainPage() {
  return (
    <div id="main-container">
      {/* <PostDefaultModal /> */}
      {/* <Letter /> */}
      <PostBox />
    </div>
  )
}

export default MainPage
