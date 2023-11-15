import useAnimatedModel from "./useAnimatedModel"

const Rocket = () => {
  const { isVisible, meshRef, gltf, position } = useAnimatedModel(
    `${urlPath}/assets/models/postCards/rocket.glb`,
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
