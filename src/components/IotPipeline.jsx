// Live architecture diagram of the Chicago Dryer IoT analytics pipeline, drawn with AnimatedBeam.
import { forwardRef, useRef } from "react";
import { AnimatedBeam } from "./ui/AnimatedBeam";
import { MachineIcon, FlaskIcon, ServerIcon, DatabaseIcon, ChartIcon } from "./ui/Icons";

const Node = forwardRef(({ icon, label, size = "md", accent = false }, ref) => {
  const Icon = icon;
  const dims = size === "lg" ? "size-14 md:size-16" : "size-10 md:size-12";
  const iconSize = size === "lg" ? "size-6 md:size-7" : "size-5";
  return (
    <div className="flex flex-col items-center gap-1.5 z-10">
      <div
        ref={ref}
        className={`${dims} rounded-full flex items-center justify-center border bg-black-100 ${
          accent ? "border-[#52aeff]/60 shadow-[0_0_24px_-4px_#52aeff80]" : "border-black-200"
        }`}
      >
        <Icon className={`${iconSize} text-white-50`} />
      </div>
      <span className="text-[10px] md:text-xs text-blue-50 text-center leading-tight whitespace-nowrap">{label}</span>
    </div>
  );
});
Node.displayName = "Node";

const IotPipeline = () => {
  const container = useRef(null);
  const feeders = useRef(null);
  const ironers = useRef(null);
  const folders = useRef(null);
  const sim = useRef(null);
  const ingest = useRef(null);
  const db = useRef(null);
  const dash = useRef(null);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-between w-full h-[300px] md:h-[340px] px-4 md:px-12 pt-6"
      aria-label="Architecture: machines and simulator stream into ingestion microservices, stored in MongoDB, served to a Next.js dashboard"
      role="img"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <Node ref={feeders} icon={MachineIcon} label="Feeders" />
        <Node ref={ironers} icon={MachineIcon} label="Ironers" />
        <Node ref={folders} icon={MachineIcon} label="Folders" />
        <Node ref={sim} icon={FlaskIcon} label="Simulator" />
      </div>
      <Node ref={ingest} icon={ServerIcon} label="Ingestion services" size="lg" accent />
      <Node ref={db} icon={DatabaseIcon} label="MongoDB" size="lg" />
      <Node ref={dash} icon={ChartIcon} label="Next.js dashboard" size="lg" accent />

      <AnimatedBeam containerRef={container} fromRef={feeders} toRef={ingest} curvature={-40} duration={3.2} />
      <AnimatedBeam containerRef={container} fromRef={ironers} toRef={ingest} curvature={-10} duration={3.6} delay={0.4} />
      <AnimatedBeam containerRef={container} fromRef={folders} toRef={ingest} curvature={10} duration={3.4} delay={0.8} />
      <AnimatedBeam containerRef={container} fromRef={sim} toRef={ingest} curvature={40} duration={4} delay={1.2} gradientStartColor="#fd5c79" gradientStopColor="#6d45ce" />
      <AnimatedBeam containerRef={container} fromRef={ingest} toRef={db} duration={2.6} delay={0.2} />
      <AnimatedBeam containerRef={container} fromRef={db} toRef={dash} duration={2.6} delay={1} />
    </div>
  );
};

export default IotPipeline;
