import TitleHeader from "../components/TitleHeader";
import { ArrowUpRightIcon } from "../components/ui/Icons";
import { research, education } from "../constants";

const Research = () => (
  <section id="research" className="flex-center section-padding">
    <div className="w-full h-full md:px-10 px-0 max-w-7xl mx-auto">
      <TitleHeader title="Research & Education" sub="📄 Published work" />

      <div className="grid-12-cols mt-16 !gap-4">
        <div className="card xl:col-span-8 card-border rounded-2xl p-8 md:p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-white text-black text-xs md:text-sm font-semibold px-3 py-1">
              Springer · 2025
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold leading-snug">{research.title}</h3>
          <p className="text-white-50">{research.venue}</p>
          <p className="text-blue-50 text-sm">{research.role}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
            <a
              href={research.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-black font-semibold px-4 py-2 hover:bg-[#62e0ff] transition-colors"
            >
              Read on Springer <ArrowUpRightIcon className="size-4" />
            </a>
            <a
              href={research.site}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#62e0ff] transition-colors"
            >
              Project site &amp; live demo <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="xl:col-span-4 card-border rounded-2xl p-8 md:p-10 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-[#62e0ff]">Education</p>
          <h3 className="text-2xl font-bold">{education.degree}</h3>
          <p className="text-white-50">
            {education.school} · {education.date}
          </p>
          <ul className="flex flex-col gap-2 mt-2">
            {education.honors.map((h) => (
              <li key={h} className="text-white-50 flex gap-2">
                <span className="text-[#62e0ff]">✦</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Research;
