import TitleHeader from "../components/TitleHeader";
import Chip from "../components/ui/Chip";
import { Timeline } from "../components/ui/Timeline";
import { experiences } from "../constants";

const Experience = () => {
  const data = experiences.map((exp) => ({
    title: exp.company,
    subtitle: exp.date,
    content: (
      <div className="card-border rounded-2xl p-6 md:p-8">
        <h4 className="text-xl md:text-2xl font-semibold">{exp.role}</h4>
        <p className="text-blue-50 mt-1 text-sm md:text-base">{exp.location}</p>
        <ul className="list-disc ms-5 mt-5 flex flex-col gap-3 text-white-50 md:text-lg">
          {exp.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-6">
          {exp.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section id="experience" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-0">
        <TitleHeader title="Professional Experience" sub="💼 4+ years across IoT, fintech and agritech" />
        <div className="mt-6">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
