import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words, profile } from "../constants";
import { FileIcon } from "../components/ui/Icons";
import Safe3D from "../components/Safe3D";
import HamzaOS from "../components/hamzaos/HamzaOS";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* ambient backdrop: dot grid + soft phosphor glow behind the monitor */}
      <div className="absolute inset-x-0 top-0 h-[110vh] pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle,#1c1c21_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_70%)]" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center w-full xl:w-[44%] md:px-20 xl:pr-0 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt=""
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real-time Products</h1>
              <h1>that Ship to Production</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none max-w-xl">
              Hi, I’m Hamza, a full stack engineer in Chicago building
              real-time IoT analytics and data-heavy web apps with TypeScript,
              Node.js and React.
            </p>

            <div className="flex flex-wrap items-center gap-4 relative z-20">
              <Button
                text="See My Work"
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
              />
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="md:h-16 h-12 px-6 rounded-lg border border-black-200 flex items-center gap-2 text-white-50 hover:bg-black-50 transition-colors"
              >
                <FileIcon className="size-5" />
                Resume
              </a>
            </div>
          </div>
        </header>

        {/* RIGHT: HAMZA.OS, an interactive three.js computer */}
        <div className="w-full xl:w-[56%] h-[520px] md:h-[680px] xl:h-[min(74vh,780px)] xl:min-h-[600px] xl:mt-16 px-2 md:px-8 xl:px-0 xl:pr-6">
          <Safe3D>
            <HamzaOS />
          </Safe3D>
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
