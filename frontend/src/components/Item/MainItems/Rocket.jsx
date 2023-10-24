import useAnimatedModel from "./useAnimatedModel"

function Rocket() {
  const { isVisible, meshRef, gltf, position } = useAnimatedModel(
    "assets/models/rocket.glb",
    [1, 0, 10],
    [0.3, 0.3, 0.3] // 초기 스케일 값 지정
  )

  return isVisible ? (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      castShadow
    />
  ) : null
}

export default Rocket
