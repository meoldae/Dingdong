import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modelPositionAtom } from "../../../atom/PlayerAtom";
import { isPickedAtom } from "../../../atom/TutorialAtom";

function Model() {
  const isPicked = useRecoilValue(isPickedAtom);
  const setModelPosition = useSetRecoilState(modelPositionAtom);
  // 캐릭터 모델 참조
  const modelRef = useRef();

  // 애니메이션 컨트롤
  const mixerRef = useRef();

  // 애니메이션 액션 리스트
  const actions = useRef([]);

  // 모델 로드
  const gltf = useLoader(GLTFLoader, "assets/models/f_7.glb");

  // 로드된 모델의 각 객체에 대하여 그림자 생성
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  // 모델 애니메이션 저장
  useEffect(() => {
    if (gltf.animations && gltf.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(gltf.scene);
      actions.current = gltf.animations.map((clip) =>
        mixerRef.current.clipAction(clip)
      );
    }
  }, [gltf]);

  // 기본 설정
  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree();

  // 모델의 현재 위치
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  // 목적지 위치(마우스 클릭)
  const [destination, setDestination] = useState(new THREE.Vector3(0, 0, 0));
  // 모델의 위치 및 애니메이션 업데이트
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (modelRef.current) {
      const distance = position.distanceTo(destination);

      if (isPicked) {
        actions.current[1].stop();
        actions.current[0].stop();
        actions.current[5].play();
        setDestination(position);
      } else {
        actions.current[5].stop();
      }

      // 모델 이동
      if (!isPicked && distance > 0.05) {
        // 목적지까지의 거리가 0.05보다 크면 이동
        actions.current[1].play();
        actions.current[0].stop();

        // 이동 방향을 계산하여 모델의 위치를 업데이트
        const angle = Math.atan2(
          destination.z - position.z,
          destination.x - position.x
        );
        const speed = 0.07; // 모델의 이동 속도
        position.x += Math.cos(angle) * speed;
        position.z += Math.sin(angle) * speed;
        setPosition(position.clone());

        // 카메라 트렉킹을 위해 현재 모델 위치 정보 저장
        setModelPosition([
          position.clone().x,
          position.clone().y,
          position.clone().z,
        ]);
      }
      // 모델 정지
      else {
        actions.current[1].stop();
        actions.current[0].play();
      }
    }
  });

  // 마우스 및 터치 이벤트 처리
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());

  // 마우스 및 터치 이벤트에 따른 목적지 업데이트
  const handlePositionChange = useCallback(
    (e) => {
      const event = e.type.startsWith("touch") ? e.touches[0] : e;

      // 마우스나 터치 위치를 NDC (Normalized Device Coordinates)로 변환
      mouse.current.x = (event.clientX / domElement.clientWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / domElement.clientHeight) * 2 + 1;

      // 카메라와 마우스 및 터치 위치를 기반으로 레이캐스터를 설정
      raycaster.current.setFromCamera(mouse.current, camera);

      // 바닥(Map)과 교차점을 계산
      const floorMeshes = scene.children.filter(
        (child) => child.name === "floor"
      );
      const intersects = raycaster.current.intersectObjects(floorMeshes, true);

      // 교차점이 있다면, 그 위치를 목적지로 설정
      if (intersects.length > 0) {
        setDestination(intersects[0].point); // 가장 가까운 교차점을 선택
        if (modelRef.current) {
          // 모델이 마우스 및 터치 위치를 정면으로 바라보도록 설정
          modelRef.current.lookAt(intersects[0].point);
        }
      }
    },
    [camera, domElement, scene]
  );

  // 마우스 및 터치 여부
  const [isPressed, setIsPressed] = useState(false);

  // 마우스 및 터치 이벤트 리스너를 추가
  useEffect(() => {
    const handleMouseDownOrTouchStart = (e) => {
      setIsPressed(true);
      handlePositionChange(e);
    };
    const handleMouseMoveOrTouchMove = (e) => {
      if (isPressed) {
        handlePositionChange(e);
      }
    };

    domElement.addEventListener("mousedown", handleMouseDownOrTouchStart);
    domElement.addEventListener("touchstart", handleMouseDownOrTouchStart);
    domElement.addEventListener("mousemove", handleMouseMoveOrTouchMove);
    domElement.addEventListener("touchmove", handleMouseMoveOrTouchMove);
    domElement.addEventListener("mouseup", () => setIsPressed(false));
    domElement.addEventListener("touchend", () => setIsPressed(false));

    return () => {
      // 이벤트 리스너 제거
      domElement.removeEventListener("mousedown", handleMouseDownOrTouchStart);
      domElement.removeEventListener("touchstart", handleMouseDownOrTouchStart);
      domElement.removeEventListener("mousemove", handleMouseMoveOrTouchMove);
      domElement.removeEventListener("touchmove", handleMouseMoveOrTouchMove);
      domElement.removeEventListener("mouseup", () => setIsPressed(false));
      domElement.removeEventListener("touchend", () => setIsPressed(false));
    };
  }, [domElement, handlePositionChange, isPressed]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={position.toArray()}
    />
  );
}

export default Model;
