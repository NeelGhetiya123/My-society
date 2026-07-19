"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Check, ChevronRight, CircleDollarSign, Grid2X2, Megaphone, ScanFace, ShieldCheck, Sparkles, UsersRound, Wrench } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const features = [
  { icon: CircleDollarSign, title: "Money, without the mystery", text: "Invoices, collections and reserves in one readable ledger." },
  { icon: Wrench, title: "Issues get a proper owner", text: "Track every complaint from first note to final fix." },
  { icon: ShieldCheck, title: "Access that makes sense", text: "Every role sees the work they actually need." },
];

const metrics = [["Collection", "₹2.84L", "92%"], ["Outstanding", "₹1.57L", "6 flats"], ["Complaints", "8", "2 urgent"], ["Occupancy", "94%", "148 / 158"]];

export default function Home() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    scene.style.setProperty("--rx", `${y * -7}deg`);
    scene.style.setProperty("--ry", `${x * 9}deg`);
    scene.style.setProperty("--mx", `${x * 18}px`);
    scene.style.setProperty("--my", `${y * 18}px`);
  }

  function resetScene() {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--rx", "0deg");
    scene.style.setProperty("--ry", "0deg");
    scene.style.setProperty("--mx", "0px");
    scene.style.setProperty("--my", "0px");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-bg">
      <nav className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3 font-serif text-xl font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-primary text-[var(--bg)]"><Building2 size={20} /></span>
          My Society
        </div>
        <div className="flex items-center gap-2">
          <a href="#why" className="hidden rounded-full px-4 py-2 text-sm text-ink-soft transition hover:bg-surface-2 sm:block">Why it works</a>
          <ThemeToggle />
          <button onClick={() => router.push("/login")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition hover:-translate-y-0.5">Sign in</button>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[.88fr_1.12fr] lg:px-10 lg:pb-32 lg:pt-20">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-[590px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-bold uppercase tracking-[.1em] text-primary-strong"><Sparkles size={14} /> Built for real communities</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="font-serif text-[clamp(3.3rem,7vw,6.4rem)] font-semibold leading-[.92] tracking-[-.055em]">A calmer way to run your <em className="text-primary">society.</em></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-7 max-w-[48ch] text-lg leading-8 text-ink-soft">Maintenance, visitors, complaints and governance in one place. Less chasing. More clarity for every resident and committee.</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => router.push("/login")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-[var(--bg)] transition hover:-translate-y-1">Open the workspace <ArrowUpRight size={18} /></button>
            <a href="#why" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 font-semibold text-ink-soft transition hover:bg-surface-2">See how it works <ChevronRight size={17} /></a>
          </motion.div>
          <div className="mt-12 flex flex-wrap gap-x-9 gap-y-3 text-sm text-ink-faint"><span><b className="text-ink">158</b> homes</span><span><b className="text-ink">92%</b> collected</span><span><b className="text-ink">8</b> roles</span></div>
        </div>

        <motion.div ref={sceneRef} onMouseMove={handleMove} onMouseLeave={resetScene} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }} className="scene relative min-h-[500px]" style={{ perspective: "1400px" }}>
          <div className="scene-plane absolute inset-x-4 top-8 bottom-4 rounded-[34px] bg-primary shadow-2xl shadow-primary/15 sm:inset-x-8" />
          <div className="scene-orbit orbit-one" />
          <div className="scene-orbit orbit-two" />
          <div className="scene-label absolute left-8 top-10 z-10 flex items-center gap-2 text-sm font-semibold text-[var(--bg)] sm:left-14 sm:top-14"><UsersRound size={17} /> Greenwood Residency</div>
          <div className="absolute right-8 top-10 z-10 rounded-full border border-[color:var(--bg)]/30 px-3 py-1.5 text-xs text-[var(--bg)] sm:right-14 sm:top-14">Live overview</div>

          <div className="scene-object absolute inset-x-9 top-28 z-10 sm:inset-x-16">
            <div className="dashboard-face rounded-[24px] bg-surface p-5 text-ink shadow-2xl sm:p-7">
              <div className="flex items-start justify-between"><div><div className="text-xs font-bold uppercase tracking-[.12em] text-ink-faint">Sunday, 19 July</div><h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Good evening, Rahul</h2></div><span className="grid h-10 w-10 place-items-center rounded-full bg-primary-tint text-xs font-bold text-primary-strong">RS</span></div>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">{metrics.map(([label, value, note]) => <div key={label} className="border-t border-border pt-3"><div className="text-[.65rem] font-bold uppercase tracking-[.1em] text-ink-faint">{label}</div><div className="mt-2 text-lg font-bold tabular-nums sm:text-xl">{value}</div><div className="mt-1 text-xs text-primary-strong">{note}</div></div>)}</div>
              <div className="mt-8 border-t border-border pt-4"><div className="flex items-center justify-between text-sm font-semibold"><span>Latest notice</span><span className="text-xs text-ink-faint">2h ago</span></div><p className="mt-2 text-sm text-ink-soft">Annual General Meeting, 20 July, 6 PM Clubhouse</p></div>
            </div>
          </div>

          <motion.div className="float-chip chip-one" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><span className="chip-icon"><WalletIcon /></span><span><b>₹6,800 paid</b><small>Rahul Shah · A-1204</small></span></motion.div>
          <motion.div className="float-chip chip-two" animate={{ y: [0, 9, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: .4 }}><span className="chip-icon"><Wrench size={15} /></span><span><b>8 requests open</b><small>2 marked urgent</small></span></motion.div>
          <div className="scene-footer absolute bottom-10 left-8 right-8 z-10 flex items-end justify-between text-[var(--bg)] sm:left-14 sm:right-14"><div><div className="font-serif text-2xl">Everything in view.</div><div className="mt-1 text-sm opacity-75">The boring stuff, finally made simple.</div></div><span className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--bg)]/35"><Check size={20} /></span></div>
        </motion.div>
      </section>

      <section id="why" className="border-t border-border bg-surface"><div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><div className="text-xs font-bold uppercase tracking-[.14em] text-primary-strong">Why it works</div><h2 className="mt-4 max-w-[12ch] font-serif text-4xl font-semibold leading-tight sm:text-5xl">The right amount of software.</h2></div><div className="grid gap-9 sm:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <div key={title} className="border-t border-border pt-4"><Icon size={20} className="text-primary" /><h3 className="mt-5 text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p></div>)}</div></div></div></section>

      <style jsx global>{`
        .scene { --rx: 0deg; --ry: 0deg; --mx: 0px; --my: 0px; }
        .scene-plane { transform: rotateX(2deg) rotateY(-4deg); transition: transform 500ms cubic-bezier(.16,1,.3,1), background 300ms ease, box-shadow 300ms ease; }
        .scene:hover .scene-plane { transform: rotateX(calc(2deg + var(--rx))) rotateY(calc(-4deg + var(--ry))); }
        .scene-object { transform: translate3d(var(--mx), var(--my), 80px) rotateX(var(--rx)) rotateY(var(--ry)); transform-style: preserve-3d; transition: transform 500ms cubic-bezier(.16,1,.3,1); }
        .dashboard-face { transform: rotateX(2deg) rotateY(-3deg); transition: background 300ms ease, color 300ms ease; }
        .scene-orbit { position: absolute; border: 1px solid color-mix(in oklab, var(--bg) 48%, transparent); border-radius: 999px; pointer-events: none; }
        .orbit-one { width: 190px; height: 190px; right: -14px; top: 42px; transform: rotate(24deg); }
        .orbit-two { width: 92px; height: 92px; left: 4px; bottom: 76px; }
        .float-chip { position: absolute; z-index: 20; display: flex; align-items: center; gap: 10px; border: 1px solid var(--border); border-radius: 15px; background: var(--surface); color: var(--ink); padding: 11px 13px; box-shadow: 0 20px 45px color-mix(in oklab, var(--ink) 18%, transparent); transform: translate3d(var(--mx), var(--my), 130px); transition: transform 500ms cubic-bezier(.16,1,.3,1), background 300ms ease, color 300ms ease; }
        .chip-one { left: 0; top: 195px; }
        .chip-two { right: -4px; bottom: 170px; }
        .chip-icon { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 10px; background: var(--primary-tint); color: var(--primary-strong); }
        .float-chip b, .float-chip small { display: block; white-space: nowrap; }
        .float-chip b { font-size: .75rem; }
        .float-chip small { margin-top: 2px; color: var(--ink-faint); font-size: .65rem; }
        @media (max-width: 640px) { .float-chip { transform: scale(.88); } .chip-one { left: -14px; top: 184px; } .chip-two { right: -14px; bottom: 170px; } .scene-footer { left: 28px; right: 28px; } }
        @media (prefers-reduced-motion: reduce) { .scene-object, .scene-plane, .float-chip { transition: none; } }
      `}</style>
    </main>
  );
}

function WalletIcon() { return <span className="grid h-4 w-4 place-items-center text-[.75rem]">₹</span>; }
