import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { CharacterPositionAtom } from "../../../../atom/DefaultSettingAtom"
import { RoomPortalPositionAtom } from "../../../../atom/SinglePlayAtom"
import { RoomPortalVisibleAtom } from "../../../../atom/SinglePlayAtom"

const RoomPortalRing = () => {
  const characterPosition = useRecoilValue(CharacterPositionAtom)

  const roomPortalPosition = useRecoilValue(RoomPortalPositionAtom)
  const RoomPortalVisible = useSetRecoilState(RoomPortalVisibleAtom)

  // 포탈 링 속성
  const boundaryWidth = 1.5
  const boundaryHeight = 0.7

  useEffect(() => {
    // 포탈 링 영역 밖 있는지 확인
    const isOutSideX =
      Math.abs(characterPosition[0] - roomPortalPosition[0]) > boundaryWidth / 2
    const isOutSideZ =
      Math.abs(characterPosition[2] - roomPortalPosition[2]) >
      boundaryHeight / 2
    const isOutSide = isOutSideX || isOutSideZ

    if (isOutSide) {
      // 포탈 생성
      RoomPortalVisible(true)
    }
  }, [characterPosition])

  return (
    <mesh position={roomPortalPosition} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[boundaryHeight, boundaryWidth, 32]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export default RoomPortalRing
