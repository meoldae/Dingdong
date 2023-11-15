import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"

const DefaultPortalRing = ({ portalPosition, portalVisible, flag }) => {
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  // 포탈 링 속성

  let boundaryWidth = 1.5
  let boundaryHeight = 1.1
  if (flag === 1) {
    boundaryWidth = 3.0
    boundaryHeight = 2.2
  }

  useEffect(() => {
    // 포탈 링 영역 밖 있는지 확인
    const isOutSideX =
      Math.abs(characterPosition[0] - portalPosition[0]) > boundaryWidth / 2
    const isOutSideZ =
      Math.abs(characterPosition[2] - portalPosition[2]) > boundaryHeight / 2
    const isOutSide = isOutSideX || isOutSideZ

    if (isOutSide) {
      // 포탈 생성
      portalVisible(true)
    }
  }, [characterPosition])

  return (
    <mesh position={portalPosition} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[boundaryHeight, boundaryWidth, 32]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export default DefaultPortalRing
