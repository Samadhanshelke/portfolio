"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { portfolio } from "@/app/content";
import { ThemeToggle } from "@/components/theme-toggle";

const primaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover";
const secondaryButton =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-card px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent";

export function Site() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const elements = portfolio.nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header className="nav-surface sticky top-0 z-40 border-b border-line">
        <div className="h-0.5 bg-accent" />
        <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
          <a href="#top" className="font-display text-xl tracking-tight text-ink">
            {portfolio.name.split(" ")[0]}
          </a>

          <nav
            id="primary-nav"
            aria-label="Primary"
            className={`${
              open ? "flex" : "hidden"
            } absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-paper px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0`}
          >
            {portfolio.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                onClick={closeMenu}
                className={`rounded-md px-2 py-2 text-sm transition-colors md:px-0 md:py-0 ${
                  active === item.id ? "font-medium text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink md:hidden"
              aria-expanded={open}
              aria-controls="primary-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto max-w-5xl px-5 pt-14 pb-20 sm:pt-24 sm:pb-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="order-2 min-w-0 flex-1 lg:order-1">
              <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                {portfolio.location}
              </p>
              <div className="relative mt-5 pl-5 sm:pl-7">
                <span className="hero-rule" aria-hidden="true" />
                <h1 className="font-display text-5xl leading-[1.02] font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  {portfolio.name}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-snug font-medium text-ink sm:text-xl">
                  {portfolio.title}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {portfolio.tagline}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#projects" className={primaryButton}>
                  View Projects
                </a>
                <a href={portfolio.resume} download className={secondaryButton}>
                  Download Resume
                </a>
                <a href="#contact" className={secondaryButton}>
                  Contact Me
                </a>
              </div>
            </div>
            <Image
              src="/avatar.png"
              alt="Portrait of Samadhan Shelke"
              width={580}
              height={580}
              priority
              className="order-1 size-48 shrink-0 self-start rounded-full object-cover object-[center_22%] ring-4 ring-card sm:size-40 lg:order-2 lg:size-48"
            />
          </div>
        </section>

        <Reveal>
          <section id="about" aria-labelledby="about-heading" className="border-t border-line">
            <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-[1.4fr_0.8fr] md:gap-16">
              <div>
                <SectionIndex index="01" />
                <h2
                  id="about-heading"
                  className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl"
                >
                  About
                </h2>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
                  {portfolio.about}
                </p>
              </div>
              <dl className="grid content-start gap-6 rounded-2xl border border-line bg-card p-6">
                <div>
                  <dt className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
                    Languages
                  </dt>
                  <dd className="mt-2 text-ink">{portfolio.languages.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
                    Education
                  </dt>
                  <dd className="mt-2 text-ink">{portfolio.education.degree}</dd>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {portfolio.education.school}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">{portfolio.education.date}</dd>
                </div>
              </dl>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="skills" aria-labelledby="skills-heading" className="border-t border-line">
            <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
              <SectionIndex index="02" />
              <h2
                id="skills-heading"
                className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl"
              >
                Skills
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {portfolio.skills.map((group, index) => (
                  <li
                    key={group.group}
                    className="rise rounded-2xl border border-line bg-card p-6 transition-colors duration-200 hover:border-accent"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <h3 className="font-display text-xl font-medium">{group.group}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-chip px-3 py-1 text-sm text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="experience"
            aria-labelledby="experience-heading"
            className="border-t border-line"
          >
            <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
              <SectionIndex index="03" />
              <h2
                id="experience-heading"
                className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl"
              >
                Experience
              </h2>
              <ExperienceList>
                {portfolio.experience.map((job) => (
                  <li key={job.company} className="relative pb-12 pl-8 last:pb-0">
                    <span
                      className="absolute top-1.5 -left-1 size-2.5 rounded-full bg-accent ring-4 ring-paper"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium text-accent">{job.dates}</p>
                    <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-muted">{job.company}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-accent">
                      {job.points.map((point) => (
                        <li key={point} className="text-sm leading-relaxed text-ink sm:text-base">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ExperienceList>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="projects" aria-labelledby="projects-heading" className="border-t border-line">
            <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
              <SectionIndex index="04" />
              <h2
                id="projects-heading"
                className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl"
              >
                Projects
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {portfolio.projects.map((project, index) => (
                  <li
                    key={project.title}
                    className="rise h-full"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition duration-200 hover:border-accent motion-safe:hover:-translate-y-0.5">
                      <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
                        {project.role}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {project.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full bg-chip px-3 py-1 text-xs text-ink sm:text-sm"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex gap-3 pt-6">
                        <a
                          href={project.live}
                          className={secondaryButton}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <a
                          href={project.github}
                          className={secondaryButton}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
            <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:py-20 md:grid-cols-2">
              <div>
                <SectionIndex index="05" />
                <h2
                  id="contact-heading"
                  className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl"
                >
                  Contact
                </h2>
                <p className="mt-6 max-w-sm text-muted">
                  For a role, a product, or a collaboration.
                </p>
                <ul className="mt-8 grid gap-4">
                  <li>
                    <a
                      href={`mailto:${portfolio.email}`}
                      className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                    >
                      {portfolio.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={portfolio.phoneHref}
                      className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                    >
                      {portfolio.phone}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <a
                      href={portfolio.github}
                      className="text-sm font-medium text-accent underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <a
                      href={portfolio.linkedin}
                      className="text-sm font-medium text-accent underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted">{portfolio.footer}</div>
      </footer>
    </div>
  );
}

function SectionIndex({ index }: { index: string }) {
  return <p className="font-display text-sm text-accent italic">{index}</p>;
}

function ExperienceList({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function update() {
      if (!list || !line) return;
      if (reduce) {
        line.style.transform = "scaleY(1)";
        return;
      }
      const rect = list.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const distance = Math.max(rect.height, 1) + window.innerHeight * 0.2;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      line.style.transform = `scaleY(${progress})`;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-10">
      <span aria-hidden="true" className="absolute top-1.5 bottom-0 left-0 w-px bg-line" />
      <span ref={lineRef} aria-hidden="true" className="timeline-line" />
      {children}
    </ol>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? "reveal is-visible" : "reveal"}>
      {children}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  const statusId = useId();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    setStatus("Opening your email app with this message.");
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-card p-6">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="min-h-11 rounded-lg border border-line bg-paper px-3 text-ink"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-11 rounded-lg border border-line bg-paper px-3 text-ink"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-lg border border-line bg-paper px-3 py-2 text-ink"
        />
      </div>
      <button type="submit" className={primaryButton}>
        Send message
      </button>
      <p id={statusId} role="status" className="min-h-5 text-sm text-muted">
        {status}
      </p>
    </form>
  );
}

function MenuIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
