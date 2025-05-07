import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { bodyPartColors, symptomToOrganMap } from "../data/patientData";

function Organ({ name, position, highlight }) {
  const meshRef = useRef();
  const color = highlight ? bodyPartColors[name] || "#888888" : "#dddddd";

  useFrame((state) => {
    if (highlight && meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1; // Increased pulse strength
      meshRef.current.scale.set(pulse, pulse, pulse);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1); // Reset scale when not highlighted
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={highlight ? color : "#000000"}
        emissiveIntensity={highlight ? 0.5 : 0} // Increased emissive intensity
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}

function Limb({ name, position, rotation, scale, highlight }) {
  const meshRef = useRef();
  const color = highlight ? bodyPartColors[name] || "#888888" : "#dddddd";

  useFrame((state) => {
    if (highlight && meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale[0] * pulse, scale[1], scale[2] * pulse);
    } else if (meshRef.current) {
      meshRef.current.scale.set(scale[0], scale[1], scale[2]);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={highlight ? color : "#000000"}
        emissiveIntensity={highlight ? 0.5 : 0}
        metalness={0.2}
        roughness={0.7}
      />
    </mesh>
  );
}

function Glow({ position, color, size, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[size * 1.3, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.2}
        depthWrite={false}
      />
    </mesh>
  );
}

const organDefinitions = {
  heart: { position: [0, 1.2, 0.4], size: 0.3 },
  lungs: { position: [-0.4, 1.3, 0.4], size: 0.3 },
  intestine: { position: [0, 0.3, 0.2], size: 0.3 },
  liver: { position: [0.4, 0.8, 0.2], size: 0.3 },
};

const limbDefinitions = [
  {
    name: "arm",
    position: [0.8, 1.8, 0],
    rotation: [0, 0, -Math.PI / 2],
    scale: [0.1, 1, 0.1],
  },
  {
    name: "arm",
    position: [-0.8, 1.8, 0],
    rotation: [0, 0, Math.PI / 2],
    scale: [0.1, 1, 0.1],
  },
  {
    name: "leg",
    position: [0.4, -0.5, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [0.15, 1.5, 0.15],
  },
  {
    name: "leg",
    position: [-0.4, -0.5, 0],
    rotation: [0, -Math.PI / 4, 0],
    scale: [0.15, 1.5, 0.15],
  },
];

export default function BodyModel({ symptoms = [] }) {
  const highlightedOrgans = Array.from(
    new Set(
      symptomToOrganMap
        .filter(({ keyword }) =>
          symptoms.some((symptom) =>
            symptom.toLowerCase().includes(keyword.toLowerCase())
          )
        )
        .map(({ organ }) => organ)
    )
  );

  const highlightedLimbs = highlightedOrgans.filter(
    (organ) => organ === "arm" || organ === "leg"
  );

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 2, 32]} />
        <meshStandardMaterial color="#ffe0bd" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffcc99" />
      </mesh>
      {Object.entries(organDefinitions).map(([name, config]) => {
        const isHighlighted = highlightedOrgans.includes(name);
        return isHighlighted ? (
          <Glow
            key={`glow-${name}`}
            position={config.position}
            color={bodyPartColors[name]}
            size={config.size}
          />
        ) : null;
      })}
      {Object.entries(organDefinitions).map(([name, config]) => (
        <Organ
          key={name}
          name={name}
          position={config.position}
          highlight={highlightedOrgans.includes(name)}
        />
      ))}
      {limbDefinitions.map((limb, index) => {
        const isHighlighted = highlightedLimbs.includes(limb.name);
        return (
          <React.Fragment key={`${limb.name}-${index}`}>
            {isHighlighted && (
              <Glow
                position={limb.position}
                color={bodyPartColors[limb.name]}
                size={0.15}
                rotation={limb.rotation}
              />
            )}
            <Limb
              name={limb.name}
              position={limb.position}
              rotation={limb.rotation}
              scale={limb.scale}
              highlight={isHighlighted}
            />
          </React.Fragment>
        );
      })}
    </Canvas>
  );
}
