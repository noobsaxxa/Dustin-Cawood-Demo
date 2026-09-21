import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Headphones, Linkedin, Mail, Play, Volume2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import soundStage from "@/assets/dustin-sound-stage.jpg";
import portrait from "@/assets/dustin-cawood.jpg";
import posterLincoln from "@/assets/poster-lincoln.jpg";
import posterChasingIce from "@/assets/poster-chasing-ice.jpg";
import posterWallE from "@/assets/poster-wall-e.jpg";
import posterSuper8 from "@/assets/poster-super-8.jpg";
import posterMissionImpossible from "@/assets/poster-mission-impossible.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dustin Cawood — Sound Designer & Sound Effects Editor" },
      { name: "description", content: "Selected work and reel from film sound designer and sound effects editor Dustin Cawood." },
      { property: "og:title", content: "Dustin Cawood — Film Sound Designer" },
      { property: "og:description", content: "Crafting the sonic worlds behind unforgettable stories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const credits = [
  { title: "Lincoln", role: "Sound Effects Editor", year: "2012", code: "01", poster: posterLincoln },
  { title: "Chasing Ice", role: "Sound Designer", note: "Academy Award® nominated", year: "2012", code: "02", poster: posterChasingIce },
  { title: "WALL·E", role: "Sound Editorial", year: "2008", code: "03", poster: posterWallE },
  { title: "Super 8", role: "Sound Editorial", year: "2011", code: "04", poster: posterSuper8 },
  { title: "Mission: Impossible – Ghost Protocol", role: "Sound Editorial", year: "2011", code: "05", poster: posterMissionImpossible },
];

function Waveform({ compact = false }: { compact?: boolean }) {
  const bars = [18, 34, 22, 50, 30, 70, 46, 88, 58, 98, 42, 78, 34, 64, 28, 48, 20, 36, 14, 28, 18, 42, 24, 62, 36, 76, 52, 92, 64, 80, 40, 68, 30, 54, 24, 38, 18, 28];
  return (
    <div className={`flex items-center ${compact ? "h-9 gap-0.5" : "h-32 gap-1 md:h-40"}`} aria-hidden="true">
      {bars.map((height, index) => (
        <span key={index} className="wave-bar block w-px bg-primary/70" style={{ height: `${compact ? Math.max(12, height / 2.8) : height}%`, animationDelay: `${index * 35}ms` }} />
      ))}
    </div>
  );
}

function Index() {
  const [playing, setPlaying] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-foreground/10">
        <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10" aria-label="Main navigation">
          <a href="#top" className="font-display text-xl font-semibold uppercase tracking-[0.12em]">DC<span className="text-primary">.</span></a>
          <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#work">Selected work</a>
            <a className="transition-colors hover:text-primary" href="#reel">Reel</a>
            <a className="transition-colors hover:text-primary" href="#about">About</a>
          </div>
          <Button asChild variant="cinematicOutline" size="sm"><a href="#contact">Contact</a></Button>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-[92svh] items-end border-b border-border">
        <img src={soundStage} width={1920} height={1280} alt="A film sound mixing stage illuminated by warm console lights" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute bottom-12 right-0 hidden w-[44%] opacity-55 lg:block"><Waveform /></div>
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-36 md:px-10 md:pb-20 lg:pb-24">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary"><span className="h-px w-8 bg-primary" /> Film sound</p>
          <h1 className="max-w-5xl font-display text-[clamp(4.25rem,12vw,11rem)] font-semibold uppercase leading-[0.76] tracking-normal">Dustin<br /><span className="text-outline">Cawood</span></h1>
          <div className="mt-9 flex max-w-3xl flex-col gap-5 border-l border-primary pl-5 md:flex-row md:items-end md:justify-between md:pl-7">
            <div>
              <p className="font-display text-2xl uppercase tracking-[0.04em] md:text-3xl">Sound Designer &amp; Sound Effects Editor</p>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">Crafting the sonic worlds behind unforgettable stories.</p>
            </div>
            <a href="#work" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary">Explore work <ArrowDown className="size-4" /></a>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-border py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:grid-cols-[0.65fr_1.35fr] md:px-10">
          <div>
            <p className="section-label">01 / About</p>
            <img src={portrait} alt="Portrait of Dustin Cawood" width={640} height={768} className="mt-8 aspect-[4/5] w-full max-w-xs border border-border object-cover" />
          </div>
          <div>
            <h2 className="font-display text-4xl font-medium uppercase leading-[1.05] md:text-6xl">The story is seen.<br /><span className="text-muted-foreground">The feeling is heard.</span></h2>
            <div className="mt-10 grid gap-8 text-base leading-7 text-muted-foreground sm:grid-cols-2">
              <p>Dustin Cawood is a film sound designer and sound effects editor whose work spans acclaimed features, documentaries, and large-scale studio productions.</p>
              <p>An MFA graduate of FSU’s College of Motion Picture Arts, he built his career at Skywalker Sound and now serves as Sound Designer in Residence at FSU.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-5">
            <div><p className="section-label">02 / Selected work</p><h2 className="mt-3 font-display text-5xl uppercase md:text-7xl">Film credits</h2></div>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground md:block">A selected filmography</p>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
            {credits.map((credit) => (
              <article key={credit.title} className="group relative min-h-[420px] overflow-hidden bg-card p-5 md:min-h-[500px]">
                <img src={credit.poster} alt={`${credit.title} poster`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/50" />
                <div className="poster-grain absolute inset-0 opacity-20" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground"><span>{credit.code}</span><span>{credit.year}</span></div>
                  <div>
                    <div className="mb-8 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                    <h3 className="font-display text-3xl font-semibold uppercase leading-[0.95]">{credit.title}</h3>
                    <p className="mt-4 text-xs uppercase tracking-[0.15em] text-primary">{credit.role}</p>
                    {credit.note && <p className="mt-2 text-xs leading-5 text-muted-foreground">{credit.note}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reel" className="border-y border-border bg-card py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <p className="section-label">03 / Listen</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-border bg-reel">
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-30"><Waveform /></div>
              <button onClick={() => setPlaying(!playing)} className="relative z-10 flex size-20 items-center justify-center rounded-full border border-primary bg-background/70 text-primary backdrop-blur transition-transform hover:scale-105" aria-label={playing ? "Pause demo reel" : "Play demo reel"}>
                {playing ? <Volume2 className="size-7" /> : <Play className="ml-1 size-7" fill="currentColor" />}
              </button>
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><span>{playing ? "Playing selection" : "Demo reel / 2026"}</span><span>05:14</span></div>
            </div>
            <div>
              <h2 className="font-display text-5xl uppercase md:text-7xl">Hear the<br />work</h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">A focused selection of sound design, effects editing, and cinematic atmosphere.</p>
              <div className="mt-10 flex items-center gap-4 border-t border-border pt-5"><Headphones className="size-5 text-primary" /><Waveform compact /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="teaching" className="border-b border-border py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:grid-cols-[0.65fr_1.35fr] md:px-10">
          <p className="section-label">04 / Teaching</p>
          <div><p className="font-display text-3xl uppercase text-primary md:text-4xl">Florida State University</p><h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-none md:text-7xl">Sound Designer<br />in Residence</h2><p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">At FSU’s College of Motion Picture Arts, Dustin mentors the next generation of filmmakers—helping emerging artists discover how sound shapes story, emotion, and the audience’s experience.</p></div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-16 px-5 md:grid-cols-2 md:px-10">
          <div><p className="section-label">05 / Contact</p><h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] md:text-8xl">Let’s make<br />some noise<span className="text-primary">.</span></h2><p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">For projects, collaborations, and speaking opportunities, send a note.</p>
            <div className="mt-10 flex gap-3">
              <Button asChild variant="cinematicOutline" size="icon"><a href="mailto:?subject=Sound%20design%20inquiry%20for%20Dustin%20Cawood" aria-label="Email Dustin"><Mail /></a></Button>
              <Button asChild variant="cinematicOutline" size="icon"><a href="https://www.linkedin.com/search/results/all/?keywords=Dustin%20Cawood" target="_blank" rel="noreferrer" aria-label="Find Dustin on LinkedIn"><Linkedin /></a></Button>
              <Button asChild variant="cinematicOutline" size="icon"><a href="https://www.imdb.com/find/?q=Dustin%20Cawood" target="_blank" rel="noreferrer" aria-label="Find Dustin on IMDb"><span className="font-display text-xs font-bold">IMDb</span></a></Button>
            </div>
          </div>
          <form className="space-y-7" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <div className="grid gap-7 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="name" className="form-label">Name</Label><Input id="name" required placeholder="Your name" className="form-control" /></div><div className="space-y-2"><Label htmlFor="email" className="form-label">Email</Label><Input id="email" type="email" required placeholder="you@example.com" className="form-control" /></div></div>
            <div className="space-y-2"><Label htmlFor="subject" className="form-label">Subject</Label><Input id="subject" required placeholder="Project or inquiry" className="form-control" /></div>
            <div className="space-y-2"><Label htmlFor="message" className="form-label">Message</Label><Textarea id="message" required placeholder="Tell me about your project…" className="form-control min-h-32 resize-none" /></div>
            <div className="flex items-center gap-5"><Button type="submit" variant="cinematic" size="lg">Send inquiry <ArrowUpRight /></Button>{sent && <p className="text-sm text-primary" role="status">Thanks — your note is ready to send.</p>}</div>
          </form>
        </div>
      </section>

      <footer className="border-t border-border py-8"><div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10"><span>© 2026 Dustin Cawood</span><span>Sound designed for picture</span></div></footer>
    </main>
  );
}
