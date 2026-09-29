import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words, profile } from "../constants";
import { FileIcon } from "../components/ui/Icons";
import Safe3D from "../components/Safe3D";
import WarpField from "../components/warp/WarpField";

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
      {/* Full-bleed animated background (ThreeUI Warp Field, "letters" variant) */}
      <div className="absolute inset-x-0 top-0 h-dvh min-h-[640px]" aria-hidden>
        <Safe3D>
          <WarpField variant="letters" speed={12} hue={40} saturation={1.1} brightness={0.9} />
        </Safe3D>
        {/* legibility: darken behind the text, fade into the page below */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
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
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
