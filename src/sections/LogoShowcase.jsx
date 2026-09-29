import { techMarquee } from "../constants";

// Infinite tech marquee (replaces the template's fake client-logo strip).
const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative" aria-label="Technologies I work with">
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-24">
      <div className="marquee-box md:gap-6 gap-4">
        {[...techMarquee, ...techMarquee].map((t, i) => (
          <span
            key={i}
            className="flex-none rounded-full border border-black-200 bg-black-100 px-5 py-2 md:text-lg text-white-50 whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
