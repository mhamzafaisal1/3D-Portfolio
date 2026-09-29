// React wrapper for ThreeUI's Warp Field (MIT, Meng To). Ported from
// WarpFieldBackground.tsx: pauses when off-screen or the tab is hidden.
import { useEffect, useRef } from "react";
import { createWarpFieldRenderer, WARP_FIELD_DEFAULTS } from "./warpFieldRenderer";

const WarpField = ({ className = "", ...props }) => {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({ ...WARP_FIELD_DEFAULTS, ...props });
  optionsRef.current = { ...WARP_FIELD_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = createWarpFieldRenderer(canvas, () => optionsRef.current);
    let frame = 0;
    let visible = true;

    const resize = () => {
      const b = host.getBoundingClientRect();
      renderer.resize(b.width, b.height);
      renderer.render();
    };
    const tick = () => {
      renderer.render();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const onVisibility = () => {
      if (!document.hidden && visible && !frame) frame = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    ro.observe(host);
    io.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
    };
  }, []);

  const o = optionsRef.current;
  return (
    <div ref={hostRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ filter: `hue-rotate(${o.hue}deg) saturate(${o.saturation}) brightness(${o.brightness})` }}
      />
    </div>
  );
};

export default WarpField;
