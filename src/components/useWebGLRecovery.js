import { useCallback, useEffect, useRef, useState } from "react";

// Recover from a lost WebGL context (GPU reset, too many contexts, driver
// hiccup). The first couple of losses remount the <Canvas> with a fresh
// context; after that we report `failed` so the caller can show a fallback.
export default function useWebGLRecovery(maxRetries = 2) {
  const [key, setKey] = useState(0);
  const [failed, setFailed] = useState(false);
  const losses = useRef(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCreated = useCallback(
    ({ gl }) => {
      const canvas = gl.domElement;
      canvas.addEventListener(
        "webglcontextlost",
        (e) => {
          e.preventDefault();
          losses.current += 1;
          if (losses.current > maxRetries) {
            setFailed(true);
            return;
          }
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setKey((k) => k + 1), 400);
        },
        { once: true }
      );
    },
    [maxRetries]
  );

  return { key, failed, onCreated, fail: () => setFailed(true) };
}
