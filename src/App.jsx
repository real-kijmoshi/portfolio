import { useEffect, useState } from "react";
import { motion as Motion, MotionConfig } from "framer-motion";
import { Github, Twitter, Mail, ExternalLink, ArrowDown } from "lucide-react";

/* ---------------------------------- data --------------------------------- */

const projects = [
  {
    slug: "cotozanuta",
    name: "cotozanuta.pl",
    board: "COTOZANUTA.PL",
    type: "web",
    typeTag: "WWW",
    status: "LIVE",
    description:
      "A music quiz where you guess Otsochodzi songs from random lyrics. Endless, daily and 60-second ranked modes, with player stats and global leaderboards.",
    hardPart:
      "Scraping and cleaning Genius lyrics, one shared daily game state for every player, and convincing social media to care.",
    github: "https://github.com/real-kijmoshi/cotozanuta.pl",
    live: "https://cotsozanuta.pl/",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/portfolio/refs/heads/main/screenshots/cotsozanuta/1.png",
      "https://raw.githubusercontent.com/real-kijmoshi/portfolio/refs/heads/main/screenshots/cotsozanuta/2.png",
    ],
    techStack: ["Express.js", "Genius lyrics (scraped)"],
  },
  {
    slug: "wrocmap",
    name: "WrocMap",
    board: "WROCMAP",
    type: "mobile",
    typeTag: "APP",
    status: "LIVE",
    description:
      "Real-time tracker for Wrocław's public transport — a React Native app plus a web map with live vehicle positions, routes, and delay notifications.",
    hardPart:
      "Hundreds of markers moving in real time, an MPK API that's barely documented, and an ongoing fight with Apple about whether I'm old enough for the App Store.",
    github: "https://github.com/real-kijmoshi/wroclaw-mpk-map",
    live: "https://wroclive.kijmoshi.xyz/map",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen1.jpg",
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen2.jpg",
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen3.jpg",
    ],
    techStack: ["React Native", "Expo", "Express.js", "Twitter API", "Wrocław MPK API (sadly)"],
  },
  {
    slug: "discord-wrapped",
    name: "discord-wrapped",
    board: "DISCORD-WRAPPED",
    type: "web",
    typeTag: "WWW",
    status: "LIVE",
    description:
      "Spotify Wrapped, but for your Discord life. Upload your data export and get a shareable yearly recap of your messages, servers, and habits.",
    hardPart:
      "Parsing Discord exports up to 3 GB in the browser, without ever sending anyone's messages to a server.",
    github: "https://github.com/real-kijmoshi/discord-wrapped",
    live: "https://discordwrapped.netlify.app/",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/discord-wrapped/refs/heads/main/screenshots/1.png",
      "https://raw.githubusercontent.com/real-kijmoshi/discord-wrapped/refs/heads/main/screenshots/2.png",
      "https://raw.githubusercontent.com/real-kijmoshi/discord-wrapped/refs/heads/main/screenshots/3.png",
    ],
    techStack: ["React"],
  },
  {
    slug: "tic-tac-toe",
    name: "Tic Tac Toe Multiplayer",
    board: "TIC-TAC-TOE",
    type: "mobile",
    typeTag: "APP",
    status: "REPO",
    description:
      "Real-time multiplayer Tic Tac Toe for iOS and Android, with game rooms and live updates over WebSockets.",
    hardPart: "Keeping game state perfectly in sync between two phones over Socket.IO.",
    github: "https://github.com/real-kijmoshi/tic-tac-toe-react-native",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/tic-tac-toe-react-native/main/screenshots/1.PNG",
      "https://raw.githubusercontent.com/real-kijmoshi/tic-tac-toe-react-native/main/screenshots/2.PNG",
      "https://raw.githubusercontent.com/real-kijmoshi/tic-tac-toe-react-native/main/screenshots/3.PNG",
      "https://raw.githubusercontent.com/real-kijmoshi/tic-tac-toe-react-native/main/screenshots/4.PNG",
    ],
    techStack: ["React Native", "Expo", "Socket.IO", "Node.js", "Express.js"],
  },
  {
    slug: "zypher",
    name: "zypher",
    board: "ZYPHER",
    type: "web",
    typeTag: "TTY",
    status: "LIVE",
    description:
      "End-to-end encrypted chat that lives in your terminal. X25519 key exchange, AES-256-GCM, forward secrecy, group chats, offline queues, self-hosting — and a ghost mode that deletes everything.",
    hardPart: "Getting forward secrecy right, and trusting no server — including my own.",
    github: "https://github.com/real-kijmoshi/zypher",
    live: "https://zypher.kijmoshi.xyz",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/portfolio/refs/heads/main/screenshots/other/zypher.png",
    ],
    techStack: ["Node.js", "X25519", "AES-256-GCM", "bcrypt"],
  },
  {
    slug: "dreembook",
    name: "DreemBook",
    board: "DREEMBOOK",
    type: "mobile",
    typeTag: "APP",
    status: "REPO",
    description:
      "A dream journal in your pocket — record, tag, and analyze dreams, track moods, and spot patterns over time.",
    hardPart: "Building a rich text editor with custom formatting from scratch in React Native.",
    github: "https://github.com/real-kijmoshi/dream-book",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/1.png",
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/2.png",
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/3.png",
    ],
    techStack: ["React Native", "Expo"],
  },
  {
    slug: "portfolio",
    name: "portfolio",
    board: "PORTFOLIO",
    type: "here",
    typeTag: "WWW",
    status: "HERE",
    description:
      "This site. A Polish bus stop for my projects: printed timetable, amber departure board, no delays expected.",
    hardPart: "Resisting the urge to redesign it every month. (Ongoing.)",
    github: "https://github.com/real-kijmoshi/portfolio",
    live: "https://kijmoshi.xyz",
    images: [],
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
];

const stackGroups = [
  { en: "FRONTEND", items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { en: "BACKEND", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
  { en: "MOBILE", items: ["React Native", "Expo"] },
  { en: "TOOLS", items: ["Git", "Docker"] },
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/real-kijmoshi", icon: Github },
  { name: "Twitter", url: "https://twitter.com/kijmoshi_dev", icon: Twitter },
  { name: "Email", url: "mailto:dev@kijmoshi.xyz", icon: Mail },
];

/* --------------------------------- motion -------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ledRow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
};

/* --------------------------------- helpers ------------------------------- */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function getWarsawTime() {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Warsaw",
  }).format(new Date());
  const [hh, mm] = formatted.split(":");
  return { hh, mm };
}

function useWarsawTime() {
  const [time, setTime] = useState(getWarsawTime);
  useEffect(() => {
    const timer = setInterval(() => setTime(getWarsawTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

/* ------------------------------- components ------------------------------ */

function SectionHeader({ en, title }) {
  return (
    <Motion.div variants={fadeUp} className="mb-10">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
        <span className="h-2.5 w-2.5 border border-ink bg-amber" aria-hidden="true" />
        <span>{en}</span>
        <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      </div>
      <h2 className="mt-3 font-stretch-expanded text-4xl font-black uppercase tracking-tight md:text-5xl">
        {title}
      </h2>
    </Motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    LIVE: "bg-amber text-ink",
    REPO: "bg-transparent text-ink",
    HERE: "bg-cobalt text-paper",
  };
  return (
    <span
      className={`border-2 border-ink px-2 py-0.5 font-mono text-[11px] font-semibold tracking-widest ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function DepartureBoard() {
  const { hh, mm } = useWarsawTime();

  return (
    <Motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-lg border-4 border-ink bg-board shadow-[8px_8px_0_0_var(--color-ink)]"
    >
      <div className="relative p-4 sm:p-5">
        {/* header */}
        <div className="flex items-baseline justify-between gap-4 border-b border-board-edge pb-3 font-led text-amber led-glow">
          <span className="text-sm tracking-widest sm:text-base">DEPARTURES</span>
          <span className="text-sm tracking-widest sm:text-base" aria-label={`Local time in Wrocław ${hh}:${mm}`}>
            {hh}
            <span className="animate-blink">:</span>
            {mm}
          </span>
        </div>

        {/* column labels */}
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem_3.5rem] gap-2 py-2 font-led text-[10px] tracking-widest text-amber/40 sm:text-xs">
          <span>NO</span>
          <span>DESTINATION</span>
          <span>TYPE</span>
          <span className="text-right">STATUS</span>
        </div>

        {/* rows */}
        <Motion.ul variants={stagger} initial="hidden" animate="visible" className="flex flex-col">
          {projects.map((project, i) => (
            <Motion.li key={project.slug} variants={ledRow}>
              <button
                type="button"
                onClick={() => scrollToId(project.slug)}
                aria-label={`Go to project ${project.name}`}
                className="group grid w-full grid-cols-[2.75rem_1fr_2.75rem_3.5rem] items-center gap-2 py-1.5 text-left font-led text-sm text-amber led-glow transition-colors hover:bg-amber/10 focus-visible:bg-amber/10 sm:text-base"
              >
                <span className="text-amber/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate group-hover:underline group-hover:underline-offset-4">
                  {project.board}
                </span>
                <span className="text-amber/60">{project.typeTag}</span>
                <span className="flex items-center justify-end gap-1.5 text-right">
                  {project.status === "LIVE" && (
                    <span className="h-1.5 w-1.5 animate-blink rounded-full bg-amber" aria-hidden="true" />
                  )}
                  {project.status}
                </span>
              </button>
            </Motion.li>
          ))}
        </Motion.ul>

        {/* marquee footer */}
        <div className="mt-3 overflow-hidden border-t border-board-edge pt-3" aria-hidden="true">
          <div className="animate-marquee flex w-max whitespace-nowrap font-led text-xs tracking-widest text-amber/70">
            {[0, 1].map((n) => (
              <span key={n} className="pr-4">
                WELCOME · ALL PROJECTS DEPART ON TIME · BUILT IN WROCŁAW · NEXT DEPARTURE: IN
                DEVELOPMENT ·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
    </Motion.div>
  );
}

function PhoneFrame({ image, alt }) {
  return (
    <div className="relative mx-auto w-44 rounded-[2.2rem] border-[6px] border-ink bg-ink shadow-[6px_6px_0_0_var(--color-rule)] sm:w-52">
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      <div className="aspect-[9/19] overflow-hidden rounded-[1.7rem] bg-board">
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

function YouAreHere() {
  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 border-2 border-ink bg-panel shadow-[6px_6px_0_0_var(--color-ink)]">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink bg-amber">
        <span className="h-3 w-3 rounded-full bg-ink" />
      </span>
      <p className="font-stretch-expanded text-2xl font-black uppercase tracking-tight sm:text-3xl">
        You are here
      </p>
    </div>
  );
}

function ProjectMedia({ project }) {
  const [active, setActive] = useState(0);
  const { images, name, type } = project;

  if (type === "here") return <YouAreHere />;

  return (
    <div>
      {type === "mobile" ? (
        <PhoneFrame image={images[active]} alt={`${name} screenshot ${active + 1}`} />
      ) : (
        <div className="overflow-hidden border-2 border-ink bg-panel shadow-[6px_6px_0_0_var(--color-ink)]">
          <img
            src={images[active]}
            alt={`${name} screenshot ${active + 1}`}
            className="aspect-[16/10] w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      )}

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 md:justify-start">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1} of ${name}`}
              className={`h-11 w-14 overflow-hidden border-2 transition-colors ${
                active === i ? "border-cobalt" : "border-rule hover:border-ink"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectStop({ project, index }) {
  return (
    <Motion.li
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      id={project.slug}
      className="relative scroll-mt-28 pb-16 pl-10 last:pb-0 sm:pl-14"
    >
      {/* stop dot on the route line */}
      <span
        className="absolute left-0 top-1.5 h-4 w-4 -translate-x-[7px] rounded-full border-[3px] border-ink bg-amber sm:-translate-x-[7px]"
        aria-hidden="true"
      />

      {/* stop header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="border-2 border-ink px-1.5 py-0.5 font-mono text-sm font-semibold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-stretch-expanded text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          {project.name}
        </h3>
        <span className="font-mono text-xs tracking-[0.25em] text-ink-soft">{project.typeTag}</span>
        <StatusBadge status={project.status} />
      </div>

      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
        <ProjectMedia project={project} />

        <div>
          <p className="leading-relaxed text-ink">{project.description}</p>

          {project.hardPart && (
            <div className="mt-5 border-l-4 border-amber pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
                The hard part
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{project.hardPart}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-ink-soft/40 px-2.5 py-1 font-mono text-xs text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-cobalt hover:border-cobalt"
            >
              <Github size={15} />
              Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-amber"
              >
                <ExternalLink size={15} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </Motion.li>
  );
}

function TicketStat({ big, label }) {
  return (
    <div className="border-2 border-dashed border-ink px-5 py-4">
      <p className="font-stretch-expanded text-2xl font-black uppercase">{big}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">{label}</p>
    </div>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function App() {
  const year = new Date().getFullYear();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper font-sans text-ink">
        {/* top bar */}
        <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 border-2 border-ink bg-amber" aria-hidden="true" />
              <span className="font-stretch-expanded text-lg font-black uppercase tracking-tight">
                kijmoshi.xyz
              </span>
            </a>
            <nav className="hidden gap-6 font-mono text-xs uppercase tracking-[0.2em] sm:flex">
              {[
                ["projects", "Projects"],
                ["stack", "Stack"],
                ["about", "About"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="text-ink-soft transition-colors hover:text-cobalt">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* hero */}
          <Motion.section
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="py-14 md:py-20"
          >
            <Motion.p
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft"
            >
              Stop · Wrocław, Poland
            </Motion.p>

            <Motion.h1
              variants={fadeUp}
              className="mt-4 font-stretch-expanded text-6xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]"
            >
              Kij&shy;moshi
            </Motion.h1>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <div>
                <Motion.p variants={fadeUp} className="max-w-xl text-lg font-medium">
                  Full-stack developer. Building live things with JavaScript since age 9.
                </Motion.p>

                <Motion.p variants={fadeUp} className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                  Transit trackers, music quizzes, encrypted terminal chat — I like software that's
                  moving while you look at it. Currently arguing with Apple about whether I'm old enough
                  for the App Store. When I'm not shipping, I'm bouldering.
                </Motion.p>

                <Motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToId("projects")}
                    className="flex items-center gap-2 border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-amber transition-colors hover:bg-cobalt hover:text-paper hover:border-cobalt"
                  >
                    <ArrowDown size={15} />
                    View route
                  </button>

                  <div className="flex gap-1">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-10 w-10 items-center justify-center border-2 border-transparent text-ink-soft transition-colors hover:border-ink hover:text-ink"
                        >
                          <Icon size={19} />
                        </a>
                      );
                    })}
                  </div>
                </Motion.div>
              </div>

              <DepartureBoard />
            </div>
          </Motion.section>

          {/* projects */}
          <Motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="scroll-mt-24 border-t-2 border-ink py-16 md:py-20"
          >
            <SectionHeader en="Route" title="Projects" />

            <ol className="relative ml-2 border-l-2 border-ink sm:ml-4">
              {projects.map((project, index) => (
                <ProjectStop key={project.slug} project={project} index={index} />
              ))}
            </ol>
          </Motion.section>

          {/* stack */}
          <Motion.section
            id="stack"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="scroll-mt-24 border-t-2 border-ink py-16 md:py-20"
          >
            <SectionHeader en="Fleet" title="Tech stack" />

            <div className="border-t border-rule">
              {stackGroups.map((group) => (
                <Motion.div
                  key={group.en}
                  variants={fadeUp}
                  className="flex flex-col gap-3 border-b border-rule py-5 sm:flex-row sm:items-baseline"
                >
                  <p className="w-44 shrink-0 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
                    {group.en}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {group.items.map((item) => (
                      <span key={item} className="font-stretch-expanded font-bold uppercase tracking-tight">
                        {item}
                      </span>
                    ))}
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.section>

          {/* about */}
          <Motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="scroll-mt-24 border-t-2 border-ink py-16 md:py-20"
          >
            <SectionHeader en="Driver" title="About me" />

            <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
              <Motion.div variants={fadeUp} className="mx-auto md:mx-0">
                <div className="w-52 overflow-hidden border-2 border-ink shadow-[6px_6px_0_0_var(--color-amber)] sm:w-60">
                  <img src="/image.jpg" alt="kijmoshi" className="aspect-square w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft md:text-left">
                  kijmoshi · full-stack
                </p>
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <p className="max-w-2xl leading-relaxed">
                  I wrote my first line of code at 9 and never really stopped. What keeps me hooked is
                  turning messy real-world problems — a chaotic transit API, a 3&nbsp;GB chat export —
                  into things people actually use. I care about clean, maintainable code, but I care more
                  about shipping it.
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                  Away from the keyboard I'm at the climbing gym. Bouldering is basically debugging:
                  patience, persistence, and the occasional fall.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <TicketStat big="8 years" label="coding" />
                  <TicketStat big="Age 9" label="first line of code" />
                  <TicketStat big="10+" label="projects shipped" />
                </div>
              </Motion.div>
            </div>
          </Motion.section>

          {/* contact */}
          <Motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="scroll-mt-24 border-t-2 border-ink py-16 md:py-20"
          >
            <SectionHeader en="Contact" title="Get in touch" />

            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <Motion.div variants={fadeUp}>
                <p className="max-w-md leading-relaxed">
                  Have a project in mind, or just want to talk shop? My inbox is open — I usually reply
                  faster than the night bus arrives.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "dev@kijmoshi.xyz", href: "mailto:dev@kijmoshi.xyz" },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "github.com/real-kijmoshi",
                      href: "https://github.com/real-kijmoshi",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      value: "@kijmoshi_dev",
                      href: "https://twitter.com/kijmoshi_dev",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center border-2 border-ink">
                          <Icon size={18} />
                        </span>
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
                            {item.label}
                          </p>
                          <a
                            href={item.href}
                            target={item.href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            className="font-medium underline-offset-4 hover:text-cobalt hover:underline"
                          >
                            {item.value}
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Motion.div>

              <Motion.form
                variants={fadeUp}
                method="POST"
                action="https://formspree.io/f/xyzjwnog"
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full border-2 border-ink bg-paper px-4 py-2.5 outline-none transition-colors placeholder:text-ink-soft/50 focus:border-cobalt"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full border-2 border-ink bg-paper px-4 py-2.5 outline-none transition-colors placeholder:text-ink-soft/50 focus:border-cobalt"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Your message here..."
                    className="w-full resize-y border-2 border-ink bg-paper px-4 py-2.5 outline-none transition-colors placeholder:text-ink-soft/50 focus:border-cobalt"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-amber transition-colors hover:bg-cobalt hover:text-paper hover:border-cobalt"
                >
                  Send message
                </button>
              </Motion.form>
            </div>
          </Motion.section>
        </main>

        {/* footer */}
        <footer className="border-t-2 border-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              © {year} kijmoshi · built in Wrocław
            </p>
            <p>React · Tailwind · Framer Motion — no delays expected</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
