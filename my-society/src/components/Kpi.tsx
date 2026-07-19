"use client";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
export default function Kpi({ label, value, delta, dir = "flat", index = 0 }:{ label:string; value:string; delta:string; dir?:"up"|"down"|"flat"; index?:number }) {
  const Icon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;
  const color = dir === "up" ? "text-[var(--good)]" : dir === "down" ? "text-[var(--bad)]" : "text-ink-faint";
  return <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:index*.06,duration:.45,ease:[.16,1,.3,1]}} whileHover={{y:-3}} className="group border-b border-border pb-4">
    <div className="flex items-center justify-between gap-3 text-[.72rem] font-bold uppercase tracking-[.11em] text-ink-faint"><span>{label}</span><span className={`grid h-7 w-7 place-items-center rounded-full bg-surface-2 ${color}`}><Icon size={15}/></span></div>
    <div className="mt-3 text-[2rem] font-semibold leading-none tabular-nums tracking-[-.04em]">{value}</div>
    <div className={`mt-2 text-[.78rem] font-semibold ${color}`}>{delta}</div>
  </motion.div>;
}
