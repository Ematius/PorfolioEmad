/** @format */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

type ActiveSection = "projects" | "journey" | "contact" | null;
type CelestialIdentity = Exclude<ActiveSection, null>;

type AiLabScene3DProps = {
  activeSection: ActiveSection;
  onReady: () => void;
  onSelectProjects: () => void;
  onSelectJourney: () => void;
  onSelectContact: () => void;
};

type SystemAnchorProps = {
  position: [number, number, number];
  rotationY?: number;
  identity: CelestialIdentity;
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
  children: ReactNode;
};

const COLORS: Record<CelestialIdentity, string> = {
  projects: "#4abaff",
  journey: "#89deff",
  contact: "#61bfff",
};

function CameraRig({
  activeSection,
}: Pick<AiLabScene3DProps, "activeSection">) {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.1, 0));
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (activeSection === "projects") {
      desiredPosition.set(-4.7, 1.62, 5.2);
      desiredLookAt.set(-4.7, 0.02, 0);
    } else if (activeSection === "journey") {
      desiredPosition.set(0, 1.86, 5.05);
      desiredLookAt.set(0, 0.1, -0.2);
    } else if (activeSection === "contact") {
      desiredPosition.set(4.7, 1.62, 5.2);
      desiredLookAt.set(4.7, 0.02, 0);
    } else {
      desiredPosition.set(pointer.x * 0.26, 2.35 + pointer.y * 0.14, 13.1);
      desiredLookAt.set(pointer.x * 0.1, 0.08 + pointer.y * 0.05, 0);
    }

    const positionDamping = 1 - Math.exp(-2.55 * delta);
    const lookDamping = 1 - Math.exp(-3.05 * delta);
    camera.position.lerp(desiredPosition, positionDamping);
    currentLookAt.current.lerp(desiredLookAt, lookDamping);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function SystemAnchor({
  position,
  rotationY = 0,
  identity,
  active,
  dimmed,
  onSelect,
  children,
}: SystemAnchorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<
    Array<{ material: THREE.Material; baseOpacity: number }>
  >([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const materials = new Map<THREE.Material, number>();
    group.traverse((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Line)) {
        return;
      }

      const objectMaterials =
        Array.isArray(object.material) ? object.material : [object.material];

      objectMaterials.forEach((material) => {
        const baseOpacity =
          (material.userData.aiLabBaseOpacity as number | undefined) ??
          material.opacity;
        material.userData.aiLabBaseOpacity = baseOpacity;
        materials.set(material, baseOpacity);
      });
    });

    materialsRef.current = Array.from(materials, ([material, baseOpacity]) => ({
      material,
      baseOpacity,
    }));
  }, [active, dimmed]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();
    const targetRotation =
      rotationY +
      (hovered && !active ?
        identity === "contact" ?
          -0.08
        : 0.08
      : 0);
    const targetHeight =
      position[1] +
      Math.sin(time * (active ? 1.25 : 0.55) + position[0]) *
        (active ? 0.06 : 0.018);
    const targetScale =
      active ? 1.12
      : dimmed ? 0.74
      : hovered ? 1.035
      : 1;

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      3.5,
      delta,
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      targetHeight,
      2.8,
      delta,
    );
    const nextScale = THREE.MathUtils.damp(
      group.scale.x,
      targetScale,
      3.2,
      delta,
    );
    group.scale.setScalar(nextScale);

    materialsRef.current.forEach(({ material, baseOpacity }) => {
      const targetOpacity = dimmed ? baseOpacity * 0.16 : baseOpacity;
      material.transparent = material.transparent || targetOpacity < 0.999;
      material.opacity = THREE.MathUtils.damp(
        material.opacity,
        targetOpacity,
        4.2,
        delta,
      );
    });
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}>
      {children}
    </group>
  );
}

function Planet({
  radius,
  color = "#071421",
  wireColor,
  emissive = "#061526",
  metalness = 0.48,
  surface = "satellite",
}: {
  radius: number;
  color?: string;
  wireColor?: string;
  emissive?: string;
  metalness?: number;
  surface?: "archive" | "orbital" | "signal" | "satellite";
}) {
  const isArchive = surface === "archive";
  const isOrbital = surface === "orbital";
  const isSignal = surface === "signal";

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[radius, isArchive ? 3 : 4]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={
            isSignal ? 0.62
            : isOrbital ?
              0.48
            : 0.35
          }
          metalness={metalness}
          roughness={
            isArchive ? 0.66
            : isOrbital ?
              0.32
            : 0.5
          }
          flatShading={isArchive}
        />
      </mesh>
      {isArchive ?
        <mesh scale={1.026} rotation={[0.2, 0.5, -0.18]}>
          <icosahedronGeometry args={[radius, 2]} />
          <meshBasicMaterial
            color="#5ac5ff"
            wireframe
            transparent
            opacity={0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      : null}
      {isOrbital ?
        <group rotation={[0.5, 0.15, -0.28]}>
          <mesh scale={[1.24, 0.64, 1]}>
            <torusGeometry args={[radius, radius * 0.028, 6, 72]} />
            <meshBasicMaterial
              color="#90e5ff"
              transparent
              opacity={0.42}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh scale={[1.48, 0.78, 1]}>
            <torusGeometry args={[radius, radius * 0.013, 5, 72]} />
            <meshBasicMaterial
              color="#348dca"
              transparent
              opacity={0.24}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      : null}
      {isSignal ?
        <mesh scale={1.1}>
          <icosahedronGeometry args={[radius, 2]} />
          <meshBasicMaterial
            color="#5dc7ff"
            wireframe
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      : null}
      {wireColor ?
        <mesh scale={1.008}>
          <icosahedronGeometry args={[radius, 3]} />
          <meshBasicMaterial
            color={wireColor}
            wireframe
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      : null}
    </group>
  );
}

type ModelAssetProps = {
  path: string;
  size: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  reduceBrightness?: boolean;
};

function ModelAsset({
  path,
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  reduceBrightness = false,
}: ModelAssetProps) {
  const { scene } = useGLTF(path);
  const normalizedModel = useMemo(() => {
    const object = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(object);
    const center = bounds.getCenter(new THREE.Vector3());
    const dimensions = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);

    object.position.sub(center);
    object.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = false;
      child.receiveShadow = false;

      if (!reduceBrightness) return;

      const softenEarthMaterial = (source: THREE.Material) => {
        const material = source.clone();

        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.multiplyScalar(1);
          material.emissive.multiplyScalar(0.22);
          material.emissiveIntensity *= 0.35;
          material.metalness = Math.min(material.metalness, 0.28);
          material.roughness = Math.max(material.roughness, 0.72);
          material.envMapIntensity = Math.min(material.envMapIntensity, 0.35);
        } else if (material instanceof THREE.MeshBasicMaterial) {
          material.color.multiplyScalar(0.72);
        }

        return material;
      };

      child.material =
        Array.isArray(child.material) ?
          child.material.map(softenEarthMaterial)
        : softenEarthMaterial(child.material);
    });

    return {
      object,
      scale: largestDimension > 0 ? size / largestDimension : 1,
    };
  }, [reduceBrightness, scene, size]);

  return (
    <group position={position} rotation={rotation}>
      <primitive
        object={normalizedModel.object}
        scale={normalizedModel.scale}
      />
    </group>
  );
}

function SpinningModelAsset({
  spinSpeed,
  ...modelProps
}: ModelAssetProps & { spinSpeed: number }) {
  const spinRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const model = spinRef.current;
    if (!model) return;
    model.rotation.y = clock.getElapsedTime() * spinSpeed;
  });

  return (
    <group ref={spinRef}>
      <ModelAsset {...modelProps} />
    </group>
  );
}

function ModelOrbiter({
  path,
  radiusX,
  radiusY,
  speed,
  phase,
  size,
  z = 0,
  rotation = [0, 0, 0],
  spinSpeed = 0.34,
}: {
  path: string;
  radiusX: number;
  radiusY: number;
  speed: number;
  phase: number;
  size: number;
  z?: number;
  rotation?: [number, number, number];
  spinSpeed?: number;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const orbit = orbitRef.current;
    const model = modelRef.current;
    if (!orbit || !model) return;

    const elapsed = clock.getElapsedTime();
    const angle = elapsed * speed + phase;
    orbit.position.set(
      Math.cos(angle) * radiusX,
      Math.sin(angle) * radiusY,
      z + Math.sin(angle * 1.35) * 0.1,
    );
    model.rotation.x = rotation[0];
    model.rotation.y = rotation[1] + elapsed * spinSpeed;
    model.rotation.z = rotation[2];
  });

  return (
    <group ref={orbitRef}>
      <group ref={modelRef}>
        <ModelAsset path={path} size={size} />
      </group>
    </group>
  );
}

function ProjectsArchiveModel() {
  return (
    <SpinningModelAsset
      path="/models/ai-lab/projects.glb"
      size={1.52}
      rotation={[0.04, -0.3, 0.02]}
      spinSpeed={0.15}
      reduceBrightness
    />
  );
}

function ProjectsSystem({
  active,
  dimmed,
  onSelect,
}: {
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <SystemAnchor
      position={[-4.7, -0.05, 0]}
      rotationY={0.12}
      identity="projects"
      active={active}
      dimmed={dimmed}
      onSelect={onSelect}>
      <Suspense
        fallback={
          <Planet
            radius={0.74}
            color="#07131f"
            emissive="#092b46"
            metalness={0.72}
            wireColor="#317da9"
            surface="archive"
          />
        }>
        <ProjectsArchiveModel />
      </Suspense>
      <Suspense fallback={null}>
        <ModelOrbiter
          path="/models/ai-lab/project-asteroid-1.glb"
          radiusX={1.82}
          radiusY={1.04}
          speed={0.24}
          phase={0.4}
          size={0.34}
          z={0.1}
          rotation={[0.15, 0.4, -0.18]}
          spinSpeed={0.38}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ModelOrbiter
          path="/models/ai-lab/project-asteroid-2.glb"
          radiusX={1.82}
          radiusY={1.04}
          speed={0.24}
          phase={3.45}
          size={0.28}
          z={-0.06}
          rotation={[-0.12, 0.15, 0.28]}
          spinSpeed={-0.32}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ModelOrbiter
          path="/models/ai-lab/project-asteroid-3.glb"
          radiusX={2.28}
          radiusY={1.42}
          speed={-0.16}
          phase={1.3}
          size={0.31}
          z={-0.14}
          rotation={[0.22, -0.26, 0.08]}
          spinSpeed={0.29}
        />
      </Suspense>
      <pointLight
        position={[0, 0.15, 0.75]}
        intensity={active ? 11 : 6}
        distance={3.5}
        decay={2}
        color="#73cfff"
      />
    </SystemAnchor>
  );
}

const JOURNEY_STARS: Array<[number, number, number]> = [
  [-0.69, -0.66, 0.08],
  [-0.42, -0.28, 0.08],
  [-0.02, -0.08, 0.08],
  [0.14, 0.57, 0.08],
  [-0.02, 0.26, 0.08],
  [0.43, 0.22, 0.08],
  [0.82, 0.39, 0.08],
];

function ConstellationStar({
  position,
  phase,
  active,
}: {
  position: [number, number, number];
  phase: number;
  active: boolean;
}) {
  const starRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const star = starRef.current;
    if (!star) return;
    const pulse = Math.sin(clock.getElapsedTime() * 2.3 + phase);
    star.scale.setScalar(1 + pulse * (active ? 0.2 : 0.11));
  });

  return (
    <group ref={starRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.042, 16, 16]} />
        <meshBasicMaterial
          color="#e8fbff"
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.105, 16, 16]} />
        <meshBasicMaterial
          color="#61caff"
          transparent
          opacity={active ? 0.22 : 0.13}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function JourneyHologram({ active }: { active: boolean }) {
  const texture = useTexture("/models/ai-lab/journey-hologram.webp");
  const constellationGeometry = useMemo(() => {
    const values: number[] = [];
    const connections: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 4],
      [4, 3],
      [3, 5],
      [2, 5],
      [5, 6],
    ];

    connections.forEach(([from, to]) => {
      values.push(...JOURNEY_STARS[from], ...JOURNEY_STARS[to]);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(values, 3),
    );
    return geometry;
  }, []);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group>
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[2.3, 1.72]} />
        <meshBasicMaterial
          map={texture}
          color="#8edcff"
          transparent
          opacity={active ? 0.88 : 0.72}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <lineSegments geometry={constellationGeometry}>
        <lineBasicMaterial
          color="#8ee0ff"
          transparent
          opacity={active ? 0.55 : 0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {JOURNEY_STARS.map((position, index) => (
        <ConstellationStar
          key={index}
          position={position}
          phase={index * 0.83}
          active={active}
        />
      ))}
      <pointLight
        position={[0.05, 0.15, 0.65]}
        intensity={active ? 13 : 7}
        distance={3.5}
        decay={2}
        color="#76d8ff"
      />
    </group>
  );
}

function JourneySystem({
  active,
  dimmed,
  onSelect,
}: {
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <SystemAnchor
      position={[0, 0.1, -0.25]}
      identity="journey"
      active={active}
      dimmed={dimmed}
      onSelect={onSelect}>
      <Suspense fallback={null}>
        <JourneyHologram active={active} />
      </Suspense>
    </SystemAnchor>
  );
}

function ContactSystem({
  active,
  dimmed,
  onSelect,
}: {
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <SystemAnchor
      position={[4.7, -0.02, 0]}
      rotationY={-0.1}
      identity="contact"
      active={active}
      dimmed={dimmed}
      onSelect={onSelect}>
      <Suspense
        fallback={
          <Planet
            radius={0.65}
            color="#06101c"
            wireColor="#277bb0"
            emissive="#0a3557"
            metalness={0.78}
            surface="signal"
          />
        }>
        <SpinningModelAsset
          path="/models/ai-lab/contact.glb"
          size={1.4}
          rotation={[0.02, -0.28, 0]}
          spinSpeed={0.12}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ModelOrbiter
          path="/models/ai-lab/contact-satellite.glb"
          radiusX={1.3}
          radiusY={0.88}
          speed={0.29}
          phase={2.35}
          size={0.48}
          z={-0.5}
          rotation={[0.08, 0.35, -0.1]}
          spinSpeed={0.26}
        />
      </Suspense>
      <pointLight
        position={[0, 0.15, 0.9]}
        intensity={active ? 3 : 3}
        distance={4}
        decay={2}
        color="#8cddff"
      />
    </SystemAnchor>
  );
}

function CircularPointsMaterial({
  size,
  opacity,
}: {
  size: number;
  opacity: number;
}) {
  const circularTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const textureSize = 64;
    canvas.width = textureSize;
    canvas.height = textureSize;

    const context = canvas.getContext("2d");
    if (context) {
      const center = textureSize / 2;
      const gradient = context.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        center,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.58, "rgba(255, 255, 255, 0.96)");
      gradient.addColorStop(0.82, "rgba(255, 255, 255, 0.46)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, textureSize, textureSize);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <pointsMaterial
      size={size}
      sizeAttenuation
      map={circularTexture}
      alphaTest={0.02}
      transparent
      opacity={opacity}
      vertexColors
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}

function AmbientStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(340 * 3);
    const colors = new Float32Array(340 * 3);

    for (let index = 0; index < 340; index += 1) {
      const offset = index * 3;
      const seed = Math.sin(index * 142.71) * 43758.5453;
      const random = seed - Math.floor(seed);
      const seedY = Math.sin((index + 11) * 83.13) * 31517.113;
      const randomY = seedY - Math.floor(seedY);

      const coolStar = index % 5 !== 0;
      values[offset] = (random - 0.5) * 28;
      values[offset + 1] = (randomY - 0.34) * 12;
      values[offset + 2] = -4.8 - (index % 11) * 0.86;
      colors[offset] = coolStar ? 0.38 : 0.78;
      colors[offset + 1] = coolStar ? 0.74 : 0.9;
      colors[offset + 2] = 1;
    }

    return { colors, values };
  }, []);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y = clock.getElapsedTime() * 0.007;
    points.position.y = Math.sin(clock.getElapsedTime() * 0.16) * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.values, 3]}
          count={positions.values.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[positions.colors, 3]}
          count={positions.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <CircularPointsMaterial size={0.031} opacity={0.78} />
    </points>
  );
}

function NebulaCloud() {
  const cloudRef = useRef<THREE.Points>(null);
  const cloud = useMemo(() => {
    const values = new Float32Array(680 * 3);
    const colors = new Float32Array(680 * 3);

    for (let index = 0; index < 680; index += 1) {
      const offset = index * 3;
      const randomA = (Math.sin(index * 48.17) * 9281.33) % 1;
      const randomB = (Math.sin(index * 97.31) * 7142.81) % 1;
      const angle = Math.abs(randomA) * Math.PI * 2;
      const radius = Math.sqrt(Math.abs(randomB));
      const band = 0.52 + ((index % 13) / 13) * 0.52;

      values[offset] = Math.cos(angle) * radius * 8.2;
      values[offset + 1] = Math.sin(angle) * radius * 1.65 * band + 0.35;
      values[offset + 2] = -5.4 - (index % 7) * 0.35;
      colors[offset] = 0.035 + (index % 3) * 0.015;
      colors[offset + 1] = 0.16 + (index % 5) * 0.025;
      colors[offset + 2] = 0.3 + (index % 4) * 0.045;
    }

    return { colors, values };
  }, []);

  useFrame(({ clock }) => {
    const cloudPoints = cloudRef.current;
    if (!cloudPoints) return;
    cloudPoints.rotation.z = Math.sin(clock.getElapsedTime() * 0.035) * 0.045;
    cloudPoints.position.x = Math.sin(clock.getElapsedTime() * 0.06) * 0.18;
  });

  return (
    <points ref={cloudRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[cloud.values, 3]}
          count={cloud.values.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[cloud.colors, 3]}
          count={cloud.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <CircularPointsMaterial size={0.095} opacity={0.24} />
    </points>
  );
}

function Scene({
  activeSection,
  onSelectProjects,
  onSelectJourney,
  onSelectContact,
}: Omit<AiLabScene3DProps, "onReady">) {
  return (
    <>
      <fogExp2 attach="fog" args={["#00030a", 0.026]} />
      <ambientLight intensity={0.3} color="#8ed8ff" />
      <hemisphereLight args={["#79d6ff", "#000207", 0.46]} />
      <directionalLight
        position={[-3.5, 5, 5]}
        intensity={1.9}
        color="#b6ecff"
      />
      <pointLight
        position={[0, 4.2, 4.5]}
        intensity={29}
        distance={19}
        decay={2}
        color="#79d5ff"
      />
      <pointLight
        position={[-4.2, 0.4, 3.2]}
        intensity={activeSection === "projects" ? 23 : 9}
        distance={7}
        decay={2}
        color={COLORS.projects}
      />
      <pointLight
        position={[0, 0.6, 3.2]}
        intensity={activeSection === "journey" ? 27 : 11}
        distance={7}
        decay={2}
        color={COLORS.journey}
      />
      <pointLight
        position={[4.2, 0.4, 3.2]}
        intensity={activeSection === "contact" ? 25 : 10}
        distance={7}
        decay={2}
        color={COLORS.contact}
      />

      <CameraRig activeSection={activeSection} />
      <NebulaCloud />
      <AmbientStars />
      <ProjectsSystem
        active={activeSection === "projects"}
        dimmed={activeSection !== null && activeSection !== "projects"}
        onSelect={onSelectProjects}
      />
      <JourneySystem
        active={activeSection === "journey"}
        dimmed={activeSection !== null && activeSection !== "journey"}
        onSelect={onSelectJourney}
      />
      <ContactSystem
        active={activeSection === "contact"}
        dimmed={activeSection !== null && activeSection !== "contact"}
        onSelect={onSelectContact}
      />
    </>
  );
}

export default function AiLabScene3D({
  activeSection,
  onReady,
  onSelectProjects,
  onSelectJourney,
  onSelectContact,
}: AiLabScene3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.35, 13.1], fov: 40, near: 0.1, far: 70 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.22;
        window.requestAnimationFrame(onReady);
      }}>
      <Scene
        activeSection={activeSection}
        onSelectProjects={onSelectProjects}
        onSelectJourney={onSelectJourney}
        onSelectContact={onSelectContact}
      />
    </Canvas>
  );
}
