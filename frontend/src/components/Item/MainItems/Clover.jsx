import { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modelPositionAtom } from "../../../atom/PlayerAtom";
import { gsap } from "gsap";
import { isPickedAtom } from "../../../atom/TutorialAtom";

function Clover() {
  const modelPosition = useRecoilValue(modelPositionAtom);
  const setIsPicked = useSetRecoilState(isPickedAtom);
  const meshRef = useRef();
  const cloverPosition = [0, 0, 3];
  const [startTime] = useState(Date.now());
  const [isVisible, setIsVisible] = useState(true);

  const gltf = useLoader(GLTFLoader, "assets/models/clover.glb");

  console.log(gltf);

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -0.3;
      meshRef.current.rotation.y = 0.3;
    }
  }, [meshRef]);

  useFrame(() => {
    if (meshRef.current && isVisible) {
      const elapsedTime = (Date.now() - startTime) / 500;
      meshRef.current.position.y =
        cloverPosition[1] + Math.sin(elapsedTime) * 0.3; // 움직일 높이

      const distance = Math.sqrt(
        (modelPosition[0] - cloverPosition[0]) ** 2 +
          (modelPosition[1] - cloverPosition[1]) ** 2 +
          (modelPosition[2] - cloverPosition[2]) ** 2
      );

      if (distance < 1) {
        // 클로버를 확대
        setIsPicked(true);
        meshRef.current.position.y = cloverPosition[1] + 1.2;
        // 클로버의 그림자 효과를 제거
        meshRef.current.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
        gsap.to(meshRef.current.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 1,
          onComplete: () => {
            if (meshRef.current) {
              meshRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                  child.material.transparent = true;
                  gsap.to(child.material, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                      gsap.delayedCall(1.3, () => {
                        setIsPicked(false);
                        setIsVisible(false);
                      });
                    },
                  });
                }
              });
            }
          },
        });
      }
    }
  });

  return isVisible ? (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={cloverPosition}
      castShadow
    />
  ) : null;
}

export default Clover;
