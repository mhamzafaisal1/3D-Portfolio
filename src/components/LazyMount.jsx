import { useEffect, useRef, useState } from "react";

// Mounts children only once the wrapper is near the viewport, so 3D scenes
// further down the page don't grab a GPU context on first load.
const LazyMount = ({ children, rootMargin = "300px", className = "w-full h-full" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
};

export default LazyMount;
