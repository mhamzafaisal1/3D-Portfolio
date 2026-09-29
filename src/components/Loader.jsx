import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { heroReady, revealed } from "../reveal";

const MIN_MS = 1000; // always on screen at least 1s
const MAX_MS = 2500; // never make a recruiter wait longer than this
// Boot overlay: waits for the font, 3D assets and the hero's first frame, then
// fades into the page. Shown on every load; capped at 2.5 s.
const Loader = () => {
  const [phase, setPhase] = useState("loading");
  const [fontsReady, setFontsReady] = useState(false);
  const [frameReady, setFrameReady] = useState(heroReady.done);
  const { progress } = useProgress();
  const start = useRef(performance.now());
  const [shown, setShown] = useState(0);

  // React is up: remove the static HTML splash (the overlay below replaces it).
  useEffect(() => {
    document.getElementById("boot-splash")?.remove();
  }, []);

  useEffect(() => {
    if (phase !== "loading") return undefined;
    document.documentElement.style.overflow = "hidden";
    if (document.fonts?.ready) document.fonts.ready.then(() => setFontsReady(true));
    else setFontsReady(true);
    const off = heroReady.on(() => setFrameReady(true));

    const finish = () => {
      setPhase((p) => (p === "loading" ? "fading" : p));
    };
    const cap = setTimeout(finish, MAX_MS);
    return () => {
      off();
      clearTimeout(cap);
    };
  }, [phase]);

  // Real progress: font 20%, assets 60%, first frame 20%.
  const target = (fontsReady ? 20 : 0) + progress * 0.6 + (frameReady ? 20 : 0);

  useEffect(() => {
    if (phase !== "loading") return undefined;
    let raf;
    const tick = () => {
      setShown((v) => v + (Math.max(v, target) - v) * 0.18 + 0.15);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, target]);

  // Everything ready: respect the minimum display time, then fade.
  useEffect(() => {
    if (phase !== "loading" || !fontsReady || !frameReady) return undefined;
    const wait = Math.max(0, MIN_MS - (performance.now() - start.current));
    const t = setTimeout(() => setPhase("fading"), wait);
    return () => clearTimeout(t);
  }, [phase, fontsReady, frameReady]);

  useEffect(() => {
    if (phase !== "fading") return undefined;
    document.documentElement.style.overflow = "";
    revealed.fire();
    const t = setTimeout(() => setPhase("gone"), 550);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  const pct = Math.min(100, phase === "fading" ? 100 : shown);
  return (
    <div
      className={`fixed inset-0 z-[300] bg-black flex items-center justify-center transition-opacity duration-500 motion-reduce:duration-200 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="w-[min(320px,70vw)] font-mono">
        <p className="text-[#8df0b4] text-lg tracking-widest [text-shadow:0_0_12px_rgba(28,236,132,0.6)]">
          HAMZA.OS
        </p>
        <div className="mt-4 h-[3px] w-full bg-[#0c2a1c] overflow-hidden rounded">
          <div
            className="h-full bg-[#1cec84] shadow-[0_0_12px_#1cec84]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-[#4f9a76]">
          <span>{pct < 100 ? "booting" : "ready"}</span>
          <span>{Math.floor(pct)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
