import { useRef, useEffect } from "react"

const DirectionalLight = () => {
  // 조명 참조
  const lightRef = useRef()

  useEffect(() => {
    if (lightRef.current) {
      const light = lightRef.current

      // 그림자 카메라 설정
      light.shadow.camera.left = -100
      light.shadow.camera.right = 100
      light.shadow.camera.top = 100
      light.shadow.camera.bottom = -100
      light.shadow.camera.near = -100
      light.shadow.camera.far = 100
    }
  }, [])

  return (
    <directionalLight
      ref={lightRef}
      color="white"
      intensity={3}
      visible={true}
      castShadow={true}
      position={[1, 2, 1]}
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0001}
    />
  )
}

export default DirectionalLight
