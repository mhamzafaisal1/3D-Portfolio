import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import useWebGLRecovery from "../../useWebGLRecovery";

// One fixed, transparent, full-viewport canvas that draws every <View> on the
// page into its own DOM rectangle. One GPU context instead of one per card,
// which is what was getting the tech cards' contexts killed on some GPUs.
const TechIconsCanvas = () => {
  const gl = useWebGLRecovery();
  if (gl.failed) return null;
  return (
  <Canvas
    key={gl.key}
    onCreated={gl.onCreated}
    eventSource={document.getElementById("root")}
    eventPrefix="client"
    dpr={[1, 1.75]}
    style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 20 }}
  >
    <Suspense fallback={null}>
      <View.Port />
    </Suspense>
  </Canvas>
  );
};

export default TechIconsCanvas;
