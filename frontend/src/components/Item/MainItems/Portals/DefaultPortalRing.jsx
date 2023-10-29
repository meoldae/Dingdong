import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"

const DefaultPortalRing = ({ portalPosition, portalVisible }) => {
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  // 포탈 링 속성
  const boundaryWidth = 1.5
  const boundaryHeight = 0.7

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
