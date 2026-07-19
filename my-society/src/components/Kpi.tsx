"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
export default function Kpi({ label, value, delta, dir = "flat", index = 0 }:{
  label: string; value: string; delta: string; dir?: "up" | "down" | "flat"; index?: number;
}) {
  const Arrow = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;
  const color = dir === "up" ? "text-emerald-500" : dir === "down" ? "text-red-500" : "text-ink-faint";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-surface p-5"
    >
      <div className="text-[0.82rem] font-semibold text-ink-soft">{label}</div>
      <div className="mt-2.5 text-3xl font-bold tabular-nums tracking-tight">{value}</div>
      <div className={`mt-1 flex items-center gap-1.5 text-[0.8rem] font-semibold ${color}`}>
        <Arrow size={14} /> {delta}
      </div>
    </motion.div>
  );
}
