// HAMZA.OS terminal engine.
// Draws a phosphor-style terminal into an offscreen 2D canvas. The 3D monitor
// uses that canvas as its screen texture; `onChange` fires whenever it redraws.
import { profile, projects, experiences, skillGroups, research } from "../../constants";

export const W = 1024;
export const H = 768;
const PAD_X = 52;
const PAD_Y = 50;
const FONT_PX = 34;
const LINE_H = 44;
const MAX_LINES = Math.floor((H - PAD_Y * 2) / LINE_H);
const MAX_COLS = Math.floor((W - PAD_X * 2) / (FONT_PX * 0.6));
const PROMPT = "guest@hamza:~$ ";

// p = primary green, d = dim, a = amber, h = highlight, c = cyan link
const COLORS = {
  p: { fill: "#8df0b4", glow: "rgba(28,236,132,0.9)" },
  d: { fill: "#6fbf97", glow: "rgba(28,236,132,0.35)" },
  a: { fill: "#ffba5e", glow: "rgba(255,150,52,0.9)" },
  h: { fill: "#eafff3", glow: "rgba(120,255,190,0.95)" },
  c: { fill: "#7fe3ff", glow: "rgba(98,224,255,0.8)" },
};

const s = (t, c = "p") => ({ t, c });
const dots = (n) => "·".repeat(n);
const row = (label, status, width = 33, statusColor = "a") => [
  s(label, label.startsWith(" ") ? "d" : "p"),
  s(` ${dots(Math.max(2, width - label.length))} `, "d"),
  s(status, statusColor),
];

const BOOT = [
  [s("HAMZA.OS v4.0", "h"), s("       Chicago, IL", "d")],
  [s("full stack engineer · real-time & IoT", "d")],
  [],
  row("Booting TypeScript runtime", "OK"),
  row("Node.js + Express services", "ONLINE"),
  row("iot0  ingest 1M+ points/day", "READY"),
  row("rt0   websockets <100ms", "READY"),
  row("aws0  docker · nginx · ci/cd", "LINK"),
  row("perf  api 9s -> 1.5s", "READY"),
  row("EnviroSense paper (Springer)", "OK"),
  [],
  [s("type "), s("help", "h"), s(" or tap a command below")],
]

// Wrap a plain string to the terminal width.
const wrap = (text, color = "p", indent = "", hang = indent) => {
  const out = [];
  let line = "";
  for (const word of text.split(" ")) {
    const pad = out.length ? hang : indent;
    if (line && (pad + line + word).length > MAX_COLS) {
      out.push([s(pad + line.trimEnd(), color)]);
      line = "";
    }
    line += word + " ";
  }
  if (line.trim()) out.push([s((out.length ? hang : indent) + line.trimEnd(), color)]);
  return out;
};

const SECTIONS = ["work", "experience", "skills", "research", "contact"];

export const COMMANDS = ["help", "whoami", "projects", "experience", "stack", "contact", "resume", "clear"];

function run(input, api) {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const arg = args.join(" ");
  const lower = (cmd || "").toLowerCase();

  switch (lower) {
    case "":
      return [];
    case "help":
      return [
        [s("available commands:", "h")],
        [s("  whoami      ", "c"), s("who I am")],
        [s("  projects    ", "c"), s("things I've built")],
        [s("  experience  ", "c"), s("where I've worked")],
        [s("  stack       ", "c"), s("tools I use")],
        [s("  contact     ", "c"), s("how to reach me")],
        [s("  resume      ", "c"), s("open my resume (PDF)")],
        [s("  open <sec>  ", "c"), s("jump to a section:")],
        [s("              work experience skills", "d")],
        [s("              research contact", "d")],
        [s("  clear       ", "c"), s("clear the screen")],
        [s("  ...and a few you'll have to find.", "d")],
      ];
    case "whoami":
      return [
        [s(profile.name, "h"), s(` · ${profile.location}`, "d")],
        [s(profile.title, "p")],
        ...wrap(
          "4+ years building real-time, data-heavy web apps across IoT, fintech and precision agriculture. TypeScript, Node.js, React/Next.js, MongoDB/SQL, AWS. Published researcher (Springer, 2025)."
        ),
      ];
    case "projects":
    case "ls":
      if (lower === "ls" && !arg)
        return [[s("projects/  experience/  stack.txt", "c")], [s("resume.pdf  ", "c"), s(".secrets/", "d")]];
      if (lower === "ls" && arg.includes("secret")) return [[s("permission denied. try asking nicely (sudo).", "a")]];
      return [
        [s("> " + projects.iot.title, "h")],
        ...wrap("1M+ datapoints/day, diagnostics 70% faster, processing 4x via microservices.", "p", "  "),
        [s("> " + projects.envirosense.title, "h"), s("  (Springer 2025)", "d")],
        ...wrap("AI microclimate control w/ edge computing; React Native app, 30% better yield predictions.", "p", "  "),
        [s("> " + projects.realtime.title, "h")],
        ...wrap("WebSockets + GraphQL trading UI, Socket.io signaling for WebRTC calls.", "p", "  "),
        [s("tip: ", "d"), s("open work", "c"), s(" to see them in detail", "d")],
      ];
    case "experience":
      return experiences.flatMap((e) => [
        [s(e.company, "h")],
        [s("  " + e.role, "p"), s(`  ${e.date}`, "d")],
      ]);
    case "stack":
    case "cat":
      if (lower === "cat" && !arg.includes("stack")) {
        if (arg.includes("secret")) return [[s("nice try.", "a")]];
        if (arg.includes("resume")) return [[s("binary file. try ", "d"), s("resume", "c")]];
        return [[s(`cat: ${arg || "?"}: no such file`, "a")]];
      }
      return skillGroups.flatMap((g) => wrap(`${g.label.toLowerCase().padEnd(10)} ${g.items.join(", ")}`, "p", "", " ".repeat(11)));
    case "contact":
      return [
        [s("mail  ", "d"), s(profile.email, "c")],
        [s("in    ", "d"), s(profile.linkedin.replace("https://www.", ""), "c")],
        [s("gh    ", "d"), s(profile.github.replace("https://", ""), "c")],
        [s("or ", "d"), s("open contact", "c"), s(" for the form", "d")],
      ];
    case "resume":
      api.openUrl(profile.resume);
      return [[s("opening resume.pdf in a new tab ...", "p"), s(" OK", "a")]];
    case "open":
    case "cd": {
      const target = SECTIONS.find((x) => arg.toLowerCase().startsWith(x.slice(0, 3)));
      if (!target) return [[s(`usage: open <${SECTIONS.join("|")}>`, "a")]];
      api.scrollTo(target === "skills" ? "skills" : target);
      return [[s(`jumping to #${target} ...`, "p")]];
    }
    case "paper":
      api.openUrl(research.link);
      return [[s("opening the EnviroSense paper ...", "p")]];
    case "clear":
      api.clear();
      return [];
    case "sudo":
      if (/hire/i.test(arg)) {
        api.later(() => api.scrollTo("contact"), 1400);
        return [
          [s("[sudo] password for recruiter: ", "d"), s("********", "p")],
          [s("access granted.", "a"), s(" great choice.", "p")],
          [s("taking you to contact ...", "p")],
        ];
      }
      return [[s("guest is not in the sudoers file.", "d")], [s("try ", "d"), s("sudo hire hamza", "c")]];
    case "hire":
      return [[s("permission denied. did you mean", "d")], [s("sudo hire hamza", "c"), s("?", "d")]];
    case "date":
      return [[s(new Date().toString().slice(0, 24), "p")]];
    case "echo":
      return [[s(arg, "p")]];
    case "coffee":
      return [[s("brewing ... ", "p"), s("error 418: I'm a teapot", "a")]];
    case "exit":
      return [[s("there is no escape. but there is ", "d"), s("contact", "c")]];
    case "rm":
      return [[s("rm: nope. this portfolio has backups.", "a")]];
    default:
      return [[s(`command not found: ${cmd}. type `, "a"), s("help", "h")]];
  }
}

export function createTerminal({ onChange, scrollTo, openUrl, onTranscript }) {
  const hooks = { onChange };
  const canvas = document.createElement("canvas");
  const SCALE = 1.5; // render at 1.5x so the text stays crisp on big screens
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d");
  ctx.scale(SCALE, SCALE);

  let lines = [];
  let input = "";
  let booting = true;
  let bootQueue = BOOT.map((l) => l);
  let typing = null; // { segs, shown }
  const history = [];
  let histIdx = -1;
  let blink = true;
  let queue = [];
  const timers = new Set();

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  };

  const draw = () => {
    ctx.fillStyle = "#03100a";
    ctx.fillRect(0, 0, W, H);
    ctx.font = `600 ${FONT_PX}px ui-monospace, "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    const charW = ctx.measureText("M").width;

    const view = [...lines];
    if (typing) {
      let left = typing.shown;
      const partial = [];
      for (const seg of typing.segs) {
        if (left <= 0) break;
        partial.push({ ...seg, t: seg.t.slice(0, left) });
        left -= seg.t.length;
      }
      view.push(partial);
    }
    const promptLine = !booting && !typing && queue.length === 0;
    if (promptLine) view.push([s(PROMPT, "c"), s(input, "h")]);

    const visible = view.slice(-MAX_LINES);
    let caret = null;
    visible.forEach((line, i) => {
      let x = PAD_X;
      const y = PAD_Y + i * LINE_H;
      for (const seg of line) {
        if (!seg.t) continue;
        const col = COLORS[seg.c] || COLORS.p;
        ctx.fillStyle = col.fill; // glow comes from the CRT shader's halo pass
        ctx.fillText(seg.t, x, y);
        x += charW * seg.t.length;
      }
      caret = { x, y };
    });
    if (blink && caret) {
      ctx.fillStyle = "#bdf8d2";
      ctx.shadowColor = COLORS.p.glow;
      ctx.shadowBlur = 12;
      ctx.fillRect(caret.x + 2, caret.y + 2, charW * 0.9, FONT_PX);
      ctx.shadowBlur = 0;
    }
    hooks.onChange?.();
  };

  const plain = (segs) => segs.map((x) => x.t).join("");

  // Print queued lines one by one (fast), then return to the prompt.
  const pump = () => {
    if (typing || queue.length === 0) return;
    const next = queue.shift();
    if (booting && next.length) {
      typing = { segs: next, shown: 0, start: performance.now() };
      const total = plain(next).length;
      const step = () => {
        // time-based so slow devices finish on schedule (~260 chars/sec)
        typing.shown = Math.min(total, Math.ceil((performance.now() - typing.start) * 0.26));
        draw();
        if (typing.shown >= total) {
          lines.push(next);
          typing = null;
          later(pump, 60);
        } else later(step, 16);
      };
      step();
    } else {
      lines.push(next);
      draw();
      later(pump, booting ? 90 : 22);
    }
    if (queue.length === 0 && booting) {
      later(() => {
        booting = false;
        draw();
      }, 300);
    }
  };

  const api = {
    scrollTo: (id) => scrollTo?.(id),
    openUrl: (url) => openUrl?.(url),
    clear: () => {
      lines = [];
    },
    later,
  };

  const exec = (cmdline) => {
    if (booting) return;
    lines.push([s(PROMPT, "c"), s(cmdline, "h")]);
    if (cmdline.trim()) history.unshift(cmdline);
    histIdx = -1;
    const out = run(cmdline, api);
    onTranscript?.(`$ ${cmdline}\n${out.map(plain).join("\n")}`);
    queue.push(...out, []);
    if (cmdline.trim().toLowerCase() === "clear") queue = [];
    draw();
    pump();
  };

  const blinkId = setInterval(() => {
    blink = !blink;
    draw();
  }, 530);

  queue = bootQueue;
  bootQueue = null;
  draw();
  later(pump, 400);

  const self = {
    canvas,
    get onChange() {
      return hooks.onChange;
    },
    set onChange(fn) {
      hooks.onChange = fn;
    },
    get booting() {
      return booting;
    },
    get ready() {
      return !booting && !typing && queue.length === 0;
    },
    // Text comes from a real (visually hidden) <input> so mobile keyboards work.
    setInput(value) {
      input = value.replace(/[\r\n]/g, "").slice(0, MAX_COLS - PROMPT.length - 2);
      blink = true;
      draw();
      return input;
    },
    // Enter / history / tab-complete. Returns the (possibly changed) input text.
    key(e) {
      if (booting || typing || queue.length) return input;
      if (e.key === "Enter") {
        const cmd = input;
        input = "";
        exec(cmd);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        histIdx = Math.min(history.length - 1, histIdx + 1);
        input = history[histIdx] ?? input;
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        histIdx = Math.max(-1, histIdx - 1);
        input = histIdx === -1 ? "" : history[histIdx];
        e.preventDefault();
      } else if (e.key === "Tab") {
        const match = input && COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
        if (match) input = match;
        e.preventDefault();
      } else return input;
      blink = true;
      draw();
      return input;
    },
    // Run a command as if typed (used by the chips)
    type(cmd) {
      if (booting || typing || queue.length) return;
      input = "";
      exec(cmd);
    },
    dispose() {
      clearInterval(blinkId);
      timers.forEach(clearTimeout);
    },
  };
  return self;
}
