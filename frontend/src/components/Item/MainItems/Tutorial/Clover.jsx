import useAnimatedModel from "./useAnimatedModel"

const Clover = () => {
  const { isVisible, meshRef, gltf, position } = useAnimatedModel(
    "assets/models/postCards/clover.glb",
    [0, 0, 3]
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

export default Clover
