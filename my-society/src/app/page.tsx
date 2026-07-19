"use client";
/**
 * REPLACE: src/app/page.tsx  (delete the old redirect file, paste this)
 * The 3D parallax landing page. "Launch demo" -> /login.
 */
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Building2, Sparkles, Rocket, Play, ShieldCheck, ReceiptIndianRupee, FileSpreadsheet, Wallet, Wrench, ScanFace, CheckCheck, Truck } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);

  // mouse-driven parallax: rotate scene + shift each layer by its depth
  function onMove(e: React.MouseEvent) {
    const s = sceneRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    s.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
    s.querySelectorAll<HTMLElement>(".layer").forEach((l) => {
      const d = Number(l.dataset.depth || 20);
      if (l.classList.contains("tower")) return;
      l.style.transform = `translate3d(${dx * d}px, ${dy * d}px, 0)`;
    });
  }
  function onLeave() {
    const s = sceneRef.current;
    if (!s) return;
    s.style.transform = "";
    s.querySelectorAll<HTMLElement>(".layer").forEach((l) => {
      if (!l.classList.contains("tower")) l.style.transform = "";
    });
  }

  const rise = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { ease: [0.22, 1, 0.36, 1] as const, duration: 0.7 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white"
      style={{ background: "radial-gradient(140% 120% at 80% -10%, oklch(0.66 0.14 52) 0%, oklch(0.5 0.14 42) 38%, oklch(0.36 0.11 36) 72%, oklch(0.28 0.08 33) 100%)" }}>

      {/* dotted texture */}
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.5px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(120% 80% at 70% 0%, black, transparent 75%)" }} />

      {/* nav */}
      <nav className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10">
        <div className="flex items-center gap-3 font-serif text-xl font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur"><Building2 size={20} /></span>
          My Society
        </div>
        <div className="flex items-center gap-3 text-sm text-white/80">
          <a className="hidden hover:text-white sm:inline" href="#">Features</a>
          <a className="hidden hover:text-white sm:inline" href="#">Pricing</a>
          <div className="[&_button]:text-white"><ThemeToggle /></div>
          <button onClick={() => router.push("/login")} className="rounded-full bg-white/15 px-4 py-2 font-semibold backdrop-blur transition hover:bg-white/25">Sign in</button>
        </div>
      </nav>

      {/* hero */}
      <section className="relative z-[2] mx-auto grid max-w-[1340px] items-center gap-8 px-5 pb-16 pt-6 sm:px-10 lg:grid-cols-[1.05fr_1fr]" style={{ perspective: 1600 }}>
        <div className="max-w-[36ch]">
          <motion.span {...rise} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
            <Sparkles size={14} /> Trusted by 1,200+ housing societies
          </motion.span>
          <motion.h1 {...rise} transition={{ ...rise.transition, delay: 0.08 }} className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Your society, <em className="not-italic text-[oklch(0.93_0.06_70)]">running itself.</em>
          </motion.h1>
          <motion.p {...rise} transition={{ ...rise.transition, delay: 0.16 }} className="mt-5 max-w-[44ch] text-lg leading-relaxed text-white/80">
            Billing, complaints, visitors, accounts and governance for residential communities. Every role, one platform, zero spreadsheets.
          </motion.p>
          <motion.div {...rise} transition={{ ...rise.transition, delay: 0.24 }} className="mt-8 flex flex-wrap gap-3.5">
            <button onClick={() => router.push("/login")} className="inline-flex items-center gap-2.5 rounded-full bg-[oklch(0.98_0.012_60)] px-7 py-3.5 font-bold text-[oklch(0.44_0.13_40)] shadow-xl transition hover:-translate-y-0.5">
              <Rocket size={18} /> Launch demo
            </button>
            <button onClick={() => router.push("/login")} className="inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/10 px-6 py-3.5 font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
              <Play size={18} /> Explore roles
            </button>
          </motion.div>
          <motion.div {...rise} transition={{ ...rise.transition, delay: 0.32 }} className="mt-12 flex flex-wrap gap-7">
            {[["₹34.2L","managed annually"],["92%","collection rate"],["8 roles","fully permissioned"]].map(([b,s]) => (
              <div key={s}><b className="block font-serif text-2xl font-semibold tabular-nums">{b}</b><span className="text-sm text-white/70">{s}</span></div>
            ))}
          </motion.div>
        </div>

        {/* 3D scene */}
        <div ref={sceneRef} onMouseMove={onMove} onMouseLeave={onLeave}
          className="relative h-[380px] transition-transform duration-300 lg:h-[540px]"
          style={{ transformStyle: "preserve-3d" }}>

          {/* stacked floating tower */}
          <div className="layer tower absolute left-1/2 top-1/2" data-depth="10"
            style={{ width: 210, height: 340, transform: "translate(-50%,-50%) rotateX(52deg) rotateZ(42deg)", transformStyle: "preserve-3d", animation: "floatY 7s cubic-bezier(0.22,1,0.36,1) infinite" }}>
            {[0,52,104,156,208,260].map((t) => (
              <div key={t} className="absolute left-0 right-0 rounded-xl border border-white/30"
                style={{ top: t, height: 40, background: "linear-gradient(135deg, rgba(255,255,255,0.32), rgba(255,255,255,0.14))", boxShadow: "0 10px 20px rgba(60,30,10,0.28)" }} />
            ))}
          </div>

          {/* floating glass cards */}
          <FloatCard className="left-[-4%] top-[6%]" depth={46} anim="floatA">
            <CardTop icon={<Wallet size={16} />} label="Collection" />
            <div className="mt-2.5 font-serif text-2xl font-semibold tabular-nums">₹2.84L</div>
            <div className="mt-2.5 flex h-8 items-end gap-1.5">
              {[60,78,52,88,70,96].map((h,i) => <span key={i} className="flex-1 rounded-t bg-white/55" style={{ height: `${h}%` }} />)}
            </div>
          </FloatCard>

          <FloatCard className="bottom-[8%] right-[-6%]" depth={60} anim="floatB">
            <CardTop icon={<Wrench size={16} />} label="Complaints" />
            <div className="mt-2.5 font-serif text-2xl font-semibold">8 open</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/70"><CheckCheck size={12} /> 5 resolved this week</div>
          </FloatCard>

          <FloatCard className="bottom-[20%] left-[-8%] hidden sm:block" depth={34} anim="floatA">
            <CardTop icon={<ScanFace size={16} />} label="At the gate" />
            <div className="mt-2.5 font-serif text-2xl font-semibold">12 inside</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/70"><Truck size={12} /> 3 deliveries active</div>
          </FloatCard>

          <div className="layer absolute right-[4%] top-[14%] flex items-center gap-2.5 rounded-full border border-white/22 bg-white/14 px-3.5 py-2.5 backdrop-blur"
            data-depth="72" style={{ animation: "floatB 6s cubic-bezier(0.22,1,0.36,1) infinite" }}>
            <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-[oklch(0.93_0.06_70)] p-1 text-xs font-bold text-[oklch(0.44_0.13_40)]">RS</span>
            <b className="text-xs font-semibold">Rahul paid ₹6,800</b>
          </div>
        </div>
      </section>

      <div className="relative z-[2] px-6 pb-12 text-center text-sm text-white/60">
        Greenwood Residency Co-op Housing Society · Move your mouse over the scene
      </div>

      {/* keyframes (scoped) */}
      <style jsx global>{`
        @keyframes floatY { 0%,100%{ transform: translate(-50%,-50%) rotateX(52deg) rotateZ(42deg) translateZ(0);} 50%{ transform: translate(-50%,-52%) rotateX(52deg) rotateZ(42deg) translateZ(16px);} }
        @keyframes floatA { 0%,100%{ transform: translateY(0) rotate(-2deg);} 50%{ transform: translateY(-18px) rotate(-2deg);} }
        @keyframes floatB { 0%,100%{ transform: translateY(0) rotate(2deg);} 50%{ transform: translateY(-14px) rotate(2deg);} }
      `}</style>
    </div>
  );
}

function FloatCard({ children, className, depth, anim }:{ children:React.ReactNode; className:string; depth:number; anim:string }) {
  return (
    <div className={`layer absolute min-w-[190px] rounded-2xl border border-white/22 bg-white/14 p-4 backdrop-blur ${className}`}
      data-depth={depth} style={{ animation: `${anim} 7s cubic-bezier(0.22,1,0.36,1) infinite`, boxShadow: "0 40px 80px -20px rgba(40,20,5,0.45)" }}>
      {children}
    </div>
  );
}
function CardTop({ icon, label }:{ icon:React.ReactNode; label:string }) {
  return (
    <div className="flex items-center gap-2.5 text-xs font-semibold text-white/80">
      <span className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-white/20">{icon}</span>{label}
    </div>
  );
}
