import { Environment, Float, OrbitControls, PerspectiveCamera, View, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

// The 3D content for one tech card. Rendered inside a drei <View>, so all
// five cards share ONE WebGL context (see TechIconsCanvas) instead of five.
const TechIconModel = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.modelPath.includes("three.js")) {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }
  }, [scene, model.modelPath]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => (
  <View className="size-full">
    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
    <Environment files="/hdr/city.hdr" />
    <TechIconModel model={model} />
    <OrbitControls makeDefault enableZoom={false} enablePan={false} />
  </View>
);

export default TechIconCardExperience;
