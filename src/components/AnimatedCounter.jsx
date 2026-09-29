import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Counts each stat up once when it scrolls into view. The suffix (+, M+, %, x)
// is always shown; only the number animates, and it's quick.
const AnimatedCounter = () => {
  const counterRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".counter-number").forEach((el, i) => {
        const target = counterItems[i].value;
        const state = { n: 0 };
        el.textContent = "0";
        gsap.to(state, {
          n: target,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: counterRef.current, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(state.n);
          },
        });
      });
    },
    { scope: counterRef }
  );

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item) => (
          <div key={item.label} className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
            <div className="text-white-50 text-5xl font-bold mb-2 tabular-nums">
              <span className="counter-number">{item.value}</span>
              {item.suffix}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
