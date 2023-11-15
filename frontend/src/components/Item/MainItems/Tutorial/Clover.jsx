import useAnimatedModel from "./useAnimatedModel"

const Clover = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const { isVisible, meshRef, gltf, position } = useAnimatedModel(
    `${urlPath}/assets/models/postCards/clover.glb`,
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
