/** @format */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type AiLabScene3DProps = {
  activeSection: "projects" | "journey" | null;
  onReady: () => void;
  onSelectProjects: () => void;
  onSelectJourney: () => void;
};

type MonolithProps = {
  dimensions: [number, number, number];
  position: [number, number, number];
  rotationY?: number;
  interactive?: boolean;
  active?: boolean;
  onSelect?: () => void;
};

function CameraRig({
  activeSection,
}: Pick<AiLabScene3DProps, "activeSection">) {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.35, 0));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (activeSection === "projects") {
      desiredPosition.set(-3.45, 2.15, 5.5);
      desiredLookAt.set(-3.45, 0.15, 0);
    } else if (activeSection === "journey") {
        desiredPosition.set(0, 2.35, 5.25);
        desiredLookAt.set(0, 0.55, -0.35);
    } else {
      desiredPosition.set(pointer.x * 0.32, 2.65 + pointer.y * 0.14, 10.8);
      desiredLookAt.set(pointer.x * 0.12, 0.35 + pointer.y * 0.06, 0);
    }

    const positionDamping = 1 - Math.exp(-2.65 * delta);
    const lookDamping = 1 - Math.exp(-3.2 * delta);
    camera.position.lerp(desiredPosition, positionDamping);
    currentLookAt.current.lerp(desiredLookAt, lookDamping);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function Monolith({
  dimensions,
  position,
  rotationY = 0,
  interactive = false,
  active = false,
  onSelect,
}: MonolithProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!interactive) return;
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered, interactive]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;
    if (!group || !material) return;

    const targetRotation = rotationY + (hovered && !active ? 0.055 : 0);
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      4.5,
      delta,
    );
    material.emissiveIntensity = THREE.MathUtils.damp(
      material.emissiveIntensity,
      active ? 1.25
      : hovered ? 0.72
      : 0.2,
      5,
      delta,
    );
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    setHovered(false);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!interactive || !onSelect) return;
    event.stopPropagation();
    onSelect();
  };

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox
        args={dimensions}
        radius={0.07}
        smoothness={3}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}>
        <meshStandardMaterial
          ref={materialRef}
          color="#02070d"
          emissive="#00447c"
          emissiveIntensity={0.2}
          metalness={0.82}
          roughness={0.32}
        />
        <Edges
          threshold={16}
          scale={1.002}
          color={active || hovered ? "#42b9ff" : "#0b4365"}
        />
      </RoundedBox>
    </group>
  );
}

function Scene({
  activeSection,
  onSelectProjects,
  onSelectJourney,
}: Omit<AiLabScene3DProps, "onReady">) {
  return (
    <>
      <fogExp2 attach="fog" args={["#00030a", 0.062]} />
      <ambientLight intensity={0.08} color="#5abaff" />
      <pointLight
        position={[0, 5.5, 3]}
        intensity={32}
        distance={18}
        decay={2}
        color="#168bda"
      />
      <pointLight
        position={[-4.3, 1.3, 2.8]}
        intensity={activeSection === "projects" ? 38 : 11}
        distance={9}
        decay={2}
        color="#38afff"
      />

      <CameraRig activeSection={activeSection} />

      <Monolith
        dimensions={[2.35, 4.25, 1.25]}
        position={[-3.45, 0.12, 0]}
        rotationY={0.08}
        interactive
        active={activeSection === "projects"}
        onSelect={onSelectProjects}
      />
      <Monolith
        dimensions={[2.5, 5.15, 1.35]}
        position={[0, 0.57, -0.35]}
        interactive
        active={activeSection === "journey"}
        onSelect={onSelectJourney}
      />
      <Monolith
        dimensions={[2.35, 4.25, 1.25]}
        position={[3.45, 0.12, 0]}
        rotationY={-0.08}
      />

      <mesh position={[0, -2.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[38, 38]} />
        <meshStandardMaterial
          color="#000205"
          metalness={0.25}
          roughness={0.92}
        />
      </mesh>
    </>
  );
}

export default function AiLabScene3D({
  activeSection,
  onReady,
  onSelectProjects,
  onSelectJourney,
}: AiLabScene3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.65, 10.8], fov: 42, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        window.requestAnimationFrame(onReady);
      }}>
      <Scene
        activeSection={activeSection}
        onSelectProjects={onSelectProjects}
        onSelectJourney={onSelectJourney}
      />
    </Canvas>
  );
}
