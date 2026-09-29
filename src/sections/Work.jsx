import TitleHeader from "../components/TitleHeader";
import IotPipeline from "../components/IotPipeline";
import Chip from "../components/ui/Chip";
import { BentoGrid, BentoCard } from "../components/ui/BentoGrid";
import { ArrowUpRightIcon } from "../components/ui/Icons";
import { projects } from "../constants";

const Stats = ({ stats }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-3">
    {stats.map((s) => (
      <div key={s.label}>
        <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
        <p className="text-sm text-blue-50">{s.label}</p>
      </div>
    ))}
  </div>
);

const Stack = ({ items }) => (
  <div className="flex flex-wrap gap-2 pt-1">
    {items.map((t) => (
      <Chip key={t}>{t}</Chip>
    ))}
  </div>
);

const Eyebrow = ({ children }) => (
  <p className="text-xs md:text-sm uppercase tracking-widest text-[#62e0ff]">{children}</p>
);

// Decorative visual for the EnviroSense card: a field grid of sensor nodes.
const FieldGrid = () => (
  <div className="relative h-40 md:h-48 overflow-hidden" aria-hidden>
    <div className="absolute inset-0 bg-[radial-gradient(circle,#2d2d38_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
    {[
      [18, 30], [42, 55], [66, 25], [80, 62], [30, 72], [55, 38],
    ].map(([x, y], i) => (
      <span
        key={i}
        className="absolute size-2.5 rounded-full bg-[#45dec4] shadow-[0_0_14px_2px_#45dec480] animate-pulse"
        style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }}
      />
    ))}
    <span className="absolute right-5 top-5 rounded-full bg-white text-black text-xs font-semibold px-3 py-1">
      Springer LNNS
    </span>
  </div>
);

// Decorative visual for the realtime card: a live latency sparkline.
const Sparkline = () => (
  <div className="relative h-32 px-6 pt-6" aria-hidden>
    <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0%" stopColor="#62e0ff" />
          <stop offset="100%" stopColor="#6d45ce" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 L20,52 L40,58 L60,40 L80,46 L100,30 L120,38 L140,22 L160,34 L180,18 L200,28 L220,14 L240,24 L260,12 L280,20 L300,10"
        fill="none"
        stroke="url(#spark)"
        strokeWidth="2.5"
      />
    </svg>
    <span className="absolute right-6 top-4 text-xs text-[#62e0ff] font-mono">p50 &lt; 100ms</span>
  </div>
);

const Work = () => {
  const { iot, envirosense, realtime, perf } = projects;

  return (
    <section id="work" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-0 max-w-7xl mx-auto">
        <TitleHeader title="Selected Work" sub="🛠️ Systems I've built and shipped" />

        <BentoGrid className="mt-16">
          {/* Flagship: IoT platform with live architecture diagram */}
          <BentoCard className="lg:col-span-2 lg:row-span-2" background={<IotPipeline />}>
            <Eyebrow>{iot.eyebrow}</Eyebrow>
            <h3 className="text-2xl md:text-4xl font-bold">{iot.title}</h3>
            <p className="text-white-50 md:text-lg max-w-2xl">{iot.desc}</p>
            <Stats stats={iot.stats} />
            <Stack items={iot.stack} />
          </BentoCard>

          {/* EnviroSense research */}
          <BentoCard className="lg:row-span-2" background={<FieldGrid />}>
            <Eyebrow>{envirosense.eyebrow}</Eyebrow>
            <h3 className="text-2xl md:text-3xl font-bold">{envirosense.title}</h3>
            <p className="text-white-50">{envirosense.desc}</p>
            <Stats stats={envirosense.stats} />
            <Stack items={envirosense.stack} />
            <a
              href={envirosense.link}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#62e0ff] transition-colors w-fit"
            >
              Read the paper <ArrowUpRightIcon className="size-4" />
            </a>
          </BentoCard>

          {/* Realtime + WebRTC */}
          <BentoCard background={<Sparkline />}>
            <Eyebrow>{realtime.eyebrow}</Eyebrow>
            <h3 className="text-xl md:text-2xl font-bold">{realtime.title}</h3>
            <p className="text-white-50">{realtime.desc}</p>
            <Stack items={realtime.stack} />
          </BentoCard>

          {/* Performance wins */}
          <BentoCard className="lg:col-span-2">
            <Eyebrow>{perf.eyebrow}</Eyebrow>
            <h3 className="text-xl md:text-2xl font-bold">{perf.title}</h3>
            <ul className="grid md:grid-cols-2 gap-4 mt-2">
              {perf.items.map((item) => (
                <li key={item.label} className="rounded-xl bg-black-50 border border-black-200 p-4">
                  <p className="font-mono text-lg">
                    <span className="text-blue-50 line-through decoration-1">{item.from}</span>
                    <span className="text-blue-50 mx-2">→</span>
                    <span className="text-white font-bold">{item.to}</span>
                  </p>
                  <p className="text-sm text-white-50 mt-1">{item.label}</p>
                </li>
              ))}
            </ul>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
};

export default Work;
