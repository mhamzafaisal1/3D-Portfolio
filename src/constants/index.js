// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to update the portfolio.
// Source of truth: Hamza's resume.
// ---------------------------------------------------------------------------

const profile = {
  name: "Hamza Faisal",
  title: "Full Stack Engineer",
  tagline: "Real-time systems & IoT analytics",
  location: "Chicago, IL",
  email: "hamza.faisal@valpo.edu",
  linkedin: "https://www.linkedin.com/in/muhammadhamzafaisal",
  github: "https://github.com/mhamzafaisal1",
  resume: "/Hamza-Faisal-Resume.pdf",
};

const navLinks = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Research", link: "#research" },
];

const words = [
  { text: "Data", imgPath: "/images/ideas.svg" },
  { text: "Signals", imgPath: "/images/concepts.svg" },
  { text: "Systems", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Data", imgPath: "/images/ideas.svg" },
  { text: "Signals", imgPath: "/images/concepts.svg" },
  { text: "Systems", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years shipping production web apps" },
  { value: 1, suffix: "M+", label: "IoT datapoints handled daily" },
  { value: 70, suffix: "%", label: "Faster machine diagnostics" },
  { value: 6, suffix: "x", label: "Faster analytics APIs (9s → <1.5s)" },
];

// Scrolling tech marquee under the hero
const techMarquee = [
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Nginx",
  "GraphQL",
  "WebSockets",
  "WebRTC",
  "Kafka",
  "Express",
  "React Native",
  "Tailwind CSS",
  "D3.js",
  "GitHub Actions",
];

const abilities = [
  {
    imgPath: "/images/time.png",
    title: "Real-time by default",
    desc: "WebSockets, WebRTC, Kafka and event-driven pipelines. I build UIs and services that stay live under load.",
  },
  {
    imgPath: "/images/seo.png",
    title: "Performance obsessed",
    desc: "Cut analytics APIs from 9s to under 1.5s, 4x'd data processing, and lifted Lighthouse scores 30%.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Own it to production",
    desc: "Dockerized services on AWS, Nginx, CI/CD with GitHub Actions. I ship, monitor, and fix what I build.",
  },
];

// Bento grid – selected work
const projects = {
  iot: {
    eyebrow: "Chicago Dryer Company · 2025 – Present",
    title: "Industrial IoT Analytics Platform",
    desc: "Real-time tracking of machine states, operator performance and production metrics across industrial laundry lines. Monolith refactored into machine-specific ingestion microservices with simulation interfaces.",
    stats: [
      { value: "1M+", label: "datapoints / day" },
      { value: "70%", label: "faster diagnostics" },
      { value: "4x", label: "processing speed" },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Next.js", "Docker", "AWS", "Nginx"],
  },
  envirosense: {
    eyebrow: "Published · Springer 2025",
    title: "EnviroSense",
    desc: "AI crop recommendations from soil and climate data. React Native field-monitoring app, a FastAPI model service, and a live in-browser demo.",
    stats: [
      { value: "99.5%", label: "hold-out accuracy" },
      { value: "22", label: "crops" },
    ],
    stack: ["React Native", "Expo", "Firebase", "Python", "scikit-learn", "FastAPI", "Next.js"],
    link: "https://link.springer.com/chapter/10.1007/978-3-031-92608-2_19",
    demo: "https://envirosense-site.vercel.app/#app",
  },
  realtime: {
    eyebrow: "MarketWise",
    title: "Sub-100ms Real-time UI + WebRTC Calling",
    desc: "Low-latency trading UI over WebSockets and GraphQL, plus a Socket.io signaling layer for peer-to-peer browser video and audio calls.",
    stack: ["Next.js", "Apollo", "GraphQL", "Socket.io", "WebRTC"],
  },
  perf: {
    eyebrow: "Performance wins",
    title: "Making slow things fast",
    items: [
      { from: "9s", to: "<1.5s", label: "MongoDB analytics routes: killed N+1 queries, aggregation refactors, indexing" },
      { from: "1x", to: "4x", label: "Data processing after monolith → microservices split" },
      { from: "—", to: "+30%", label: "Lighthouse via tree shaking, transpilation and minification" },
      { from: "1x", to: "2x+", label: "Critical PostgreSQL queries via indexing and refactors" },
    ],
  },
};

// Timeline – experience
const experiences = [
  {
    date: "Mar 2025 – Present",
    company: "Chicago Dryer Company",
    role: "Full Stack Engineer",
    location: "Chicago, IL · On-site",
    points: [
      "Built an industrial IoT analytics platform (Node.js, MongoDB, Next.js) tracking real-time machine states, operator performance and production metrics: 1M+ datapoints daily, diagnostics time down 70%.",
      "Refactored a monolithic backend into machine-specific ingestion microservices with simulation interfaces in Express. Processing 4x faster and independently testable.",
      "Run Dockerized Node.js services on AWS Linux with Nginx reverse proxying, environment configs, logging and CI/CD releases.",
      "Rewrote MongoDB analytics pipelines, removing N+1 queries and adding indexes: response times from 9s to under 1.5s.",
    ],
    stack: ["TypeScript", "Node.js", "MongoDB", "Next.js", "AWS", "Docker", "Nginx"],
  },
  {
    date: "Nov 2023 – Jan 2025",
    company: "MarketWise",
    role: "Frontend Engineer",
    location: "Dubai, UAE · Remote",
    points: [
      "Engineered a low-latency real-time UI with WebSockets, Next.js and Apollo Client, hitting sub-100ms response times, with GraphQL APIs via Express.",
      "Built a secure Socket.io signaling layer and integrated WebRTC for peer-to-peer browser video and audio calling.",
      "Built Angular apps in TypeScript with reusable components, reactive forms and REST integrations.",
      "Automated build, test and deploy workflows with GitHub Actions on every PR and release.",
    ],
    stack: ["Next.js", "Angular", "GraphQL", "WebSockets", "WebRTC", "GitHub Actions"],
  },
  {
    date: "Dec 2022 – Jul 2023",
    company: "Adson As",
    role: "Frontend Developer",
    location: "London, UK · Remote",
    points: [
      "Designed a modular UI component system in React, Next.js, TypeScript and Tailwind across web and mobile.",
      "Built animation-rich components with Framer Motion alongside the Design Lead: custom sliders, selectors and dynamic elements.",
      "Implemented secure payment UI flows on REST APIs and webhooks with robust error handling.",
      "Wrote Kafka producers and consumers in Node.js for async telemetry and state pipelines.",
    ],
    stack: ["React", "Next.js", "Tailwind", "Framer Motion", "Kafka"],
  },
  {
    date: "Mar 2021 – Jul 2022",
    company: "Lyftyfy",
    role: "Frontend Developer",
    location: "Hamburg, Germany · Remote",
    points: [
      "Migrated legacy jQuery and AngularJS to React with Hooks, Redux and Webpack.",
      "Built real-time analytics dashboards with D3.js and Victory.",
      "Raised Lighthouse scores 30% and doubled critical PostgreSQL query speed with indexing and refactors.",
    ],
    stack: ["React", "Redux", "D3.js", "PostgreSQL", "Webpack"],
  },
];

const research = {
  title:
    "EnviroSense: AI-Driven Microclimate Control for Sustainable Agriculture Using Edge Computing",
  venue:
    "Lecture Notes in Networks and Systems (Springer) · SAI Computing Conference 2025, London",
  link: "https://link.springer.com/chapter/10.1007/978-3-031-92608-2_19",
  site: "https://envirosense-site.vercel.app",
  role: "Frontend Engineer & Researcher · Valparaiso University · Aug – Dec 2024",
};

const education = {
  school: "Valparaiso University",
  degree: "B.S. Computer Science",
  date: "Dec 2024",
  honors: [
    "College of Arts and Sciences Dean's List",
    "International Presidential Scholarship",
  ],
};

const techStackIcons = [
  {
    name: "React & Next.js",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js & Express",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Interactive UI & 3D",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & CI/CD",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const skillGroups = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Angular", "React Native", "Redux", "Tailwind CSS", "D3.js"] },
  { label: "Backend", items: ["Node.js", "Express", "GraphQL", "REST", "Kafka", "WebSockets", "WebRTC"] },
  { label: "Data", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"] },
  { label: "Infra", items: ["AWS", "Docker", "Nginx", "Linux", "GitHub Actions", "Jenkins"] },
  { label: "Testing", items: ["Jest", "Cypress", "Mocha"] },
];

export {
  profile,
  navLinks,
  words,
  counterItems,
  techMarquee,
  abilities,
  projects,
  experiences,
  research,
  education,
  techStackIcons,
  skillGroups,
};
