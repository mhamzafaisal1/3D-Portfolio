// HAMZA.OS: an interactive retro computer in the hero.
// three.js (React Three Fiber) monitor built from primitives; its screen is a
// live 2D-canvas terminal (terminal.js) rendered through a CRT shader.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, MeshReflectorMaterial, PresentationControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

import { createTerminal, COMMANDS } from "./terminal";
import Safe3D from "../Safe3D";
import useWebGLRecovery from "../useWebGLRecovery";
import { createCrtMaterial } from "./crtMaterial";

const CASE = "#cfc8b8";
const CASE_DARK = "#8f887a";

function Keyboard() {
  const keys = useMemo(() => {
    const out = [];
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 13; c++) out.push([-1.56 + c * 0.26 + (r % 2) * 0.06, 0.13, -0.33 + r * 0.22]);
    return out;
  }, []);
  const ref = useRef();
  useEffect(() => {
    const m = new THREE.Matrix4();
    keys.forEach((p, i) => {
      m.makeTranslation(p[0], p[1], p[2]);
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [keys]);
  return (
    <group position={[0, -1.72, 1.9]} rotation={[0.08, 0, 0]}>
      <RoundedBox args={[3.8, 0.18, 1.25]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color={CASE} roughness={0.6} />
      </RoundedBox>
      <instancedMesh ref={ref} args={[null, null, keys.length]}>
        <boxGeometry args={[0.21, 0.1, 0.18]} />
        <meshStandardMaterial color="#e9e4d8" roughness={0.5} />
      </instancedMesh>
    </group>
  );
}

function Monitor({ term, onScreenClick }) {
  const group = useRef();
  const led = useRef();
  const glow = useRef();
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(term.canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [term]);
  const material = useMemo(() => createCrtMaterial(texture), [texture]);

  useEffect(() => {
    term.onChange = () => (texture.needsUpdate = true);
    texture.needsUpdate = true;
    return () => {
      term.onChange = null;
      texture.dispose();
      material.dispose();
    };
  }, [term, texture, material]);

  useFrame((state, dt) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uPower.value = Math.min(1, material.uniforms.uPower.value + dt * 1.6);
    // gentle idle sway + lean toward the pointer
    const g = group.current;
    const tx = state.pointer.y * -0.05 + Math.sin(state.clock.elapsedTime * 0.6) * 0.01;
    const ty = state.pointer.x * 0.12;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.y += (ty - g.rotation.y) * 0.05;
    if (led.current) led.current.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 3) * 0.6;
    // screen light brightens while the terminal is typing, settles when idle
    if (glow.current) {
      const target = term.busy ? 11 + Math.sin(state.clock.elapsedTime * 18) * 1.5 : 6;
      glow.current.intensity += (target - glow.current.intensity) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* casing: front shell + tapered tube housing */}
      <RoundedBox args={[4.3, 3.45, 1.4]} radius={0.18} smoothness={4} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={CASE} roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[3.4, 2.7, 1.9]} radius={0.3} smoothness={4} position={[0, 0.2, -1.3]}>
        <meshStandardMaterial color={CASE} roughness={0.6} />
      </RoundedBox>
      {/* bezel */}
      <RoundedBox args={[3.72, 2.86, 0.08]} radius={0.08} smoothness={3} position={[0, 0.22, 0.7]}>
        <meshStandardMaterial color="#1a1d1b" roughness={0.35} />
      </RoundedBox>
      {/* screen */}
      <mesh position={[0, 0.22, 0.72]} material={material} onClick={onScreenClick}>
        <planeGeometry args={[3.44, 2.58, 40, 30]} />
      </mesh>
      {/* chin: brand + power LED */}
      <mesh position={[-1.55, -1.42, 0.71]}>
        <boxGeometry args={[0.55, 0.08, 0.02]} />
        <meshStandardMaterial color={CASE_DARK} />
      </mesh>
      <mesh position={[1.75, -1.42, 0.72]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial ref={led} color="#1cec84" emissive="#1cec84" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      {/* stand */}
      <mesh position={[0, -1.78, -0.4]}>
        <cylinderGeometry args={[0.5, 0.75, 0.25, 32]} />
        <meshStandardMaterial color={CASE_DARK} roughness={0.6} />
      </mesh>
      <Keyboard />
      {/* screen glow spilling onto the keyboard */}
      <pointLight ref={glow} position={[0, 0, 2.2]} color="#39f59a" intensity={6} distance={7} />
    </group>
  );
}

// No-WebGL fallback: the same live terminal, shown flat with CSS scanlines.
// Used if the GPU keeps dropping the 3D context or WebGL isn't available.
function FlatScreen({ term }) {
  const holder = useRef(null);
  useEffect(() => {
    const el = holder.current;
    const c = term.canvas;
    c.style.width = "100%";
    c.style.height = "100%";
    c.style.display = "block";
    el.appendChild(c);
    return () => {
      if (c.parentNode === el) el.removeChild(c);
    };
  }, [term]);
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-[28px] bg-[#cfc8b8] p-[5%] shadow-[0_30px_80px_-20px_#1cec8440]">
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#03100a] shadow-[inset_0_0_40px_#000]">
          <div ref={holder} className="w-full h-full" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
        </div>
      </div>
    </div>
  );
}

// Pull the camera back on narrow canvases so the whole computer stays in frame.
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    // fit the computer (about 6.6 wide x 5.5 tall world units) to the canvas
    const aspect = size.width / Math.max(size.height, 1);
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitH = 5.5 / (2 * half);
    const fitW = 6.6 / (2 * half * aspect);
    camera.position.z = Math.max(fitH, fitW);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export default function HamzaOS() {
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const [term, setTerm] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [inView, setInView] = useState(true);
  const [focused, setFocused] = useState(false);
  const gl = useWebGLRecovery();

  useEffect(() => {
    const t = createTerminal({
      scrollTo: (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      openUrl: (url) => window.open(url, "_blank", "noopener"),
      onTranscript: setTranscript,
    });
    setTerm(t);
    return () => t.dispose();
  }, []);

  // Only render while the hero is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const focus = () => inputRef.current?.focus({ preventScroll: true });

  return (
    <div ref={wrapRef} className="relative w-full h-full flex flex-col">
      <div
        className="relative flex-1 min-h-[340px] cursor-text"
        onClick={focus}
        style={{
          maskImage:
            "linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
        }}
      >
        {term && gl.failed && <FlatScreen term={term} />}
        {term && !gl.failed && (
          <Safe3D fallback={<FlatScreen term={term} />}>
          <Canvas
            key={gl.key}
            onCreated={gl.onCreated}
            dpr={[1, 1.75]}
            frameloop={inView ? "always" : "never"}
            camera={{ position: [0, 0.25, 8], fov: 34 }}
            gl={{ antialias: true }}
          >
            <ResponsiveCamera />
            <ambientLight intensity={0.35} />
            <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff1dc" />
            <pointLight position={[-6, 3, -3]} intensity={30} color="#62e0ff" distance={14} />
            <Environment files="/hdr/city.hdr" environmentIntensity={0.35} />
            <PresentationControls
              global={false}
              cursor={false}
              snap
              speed={1.2}
              polar={[-0.15, 0.25]}
              azimuth={[-0.6, 0.6]}
            >
              <group position={[0, 0.3, 0]} rotation={[0, -0.05, 0]}>
                <Monitor term={term} onScreenClick={focus} />
              </group>
            </PresentationControls>
            {/* ground: glossy dark desk reflecting the screen, retro grid fading into fog */}
            <fog attach="fog" args={["#000000", 11, 24]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.63, 0]}>
              <planeGeometry args={[60, 60]} />
              <MeshReflectorMaterial
                resolution={512}
                blur={[300, 80]}
                mixBlur={1}
                mixStrength={1.6}
                roughness={0.9}
                depthScale={1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#000000"
                metalness={0.3}
                envMapIntensity={0}
              />
            </mesh>
            <Grid
              position={[0, -1.62, 0]}
              infiniteGrid
              cellSize={0.6}
              cellThickness={0.5}
              cellColor="#103a26"
              sectionSize={3}
              sectionThickness={0.9}
              sectionColor="#1cc873"
              fadeDistance={26}
              fadeStrength={2.2}
            />
            <ContactShadows position={[0, -1.615, 0]} opacity={0.7} scale={12} blur={2.4} far={3} />
          </Canvas>
          </Safe3D>
        )}
      </div>

      <p
        className={`text-center text-xs text-blue-50/80 transition-opacity ${focused ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        {gl.failed ? "click the screen and type" : "click the screen and type, or drag to rotate"}
      </p>

      {/* real input so desktop and mobile keyboards both work */}
      <input
        ref={inputRef}
        aria-label="Terminal input. Type a command like help, then press Enter."
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className="absolute opacity-0 pointer-events-none w-px h-px"
        style={{ fontSize: 16, left: 0, bottom: 0 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          e.target.value = term?.setInput(e.target.value) ?? "";
        }}
        onKeyDown={(e) => {
          if (!term) return;
          const v = term.key(e);
          e.currentTarget.value = v;
        }}
      />

      <div className="flex flex-wrap justify-center gap-2 pt-3 relative z-10">
        {COMMANDS.filter((c) => c !== "clear").map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              term?.type(c);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="font-mono text-xs md:text-sm rounded-md border border-[#1cec84]/30 bg-[#03100a] px-3 py-1.5 text-[#8df0b4] hover:border-[#1cec84]/70 hover:text-white transition-colors"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        {transcript}
      </div>
    </div>
  );
}
