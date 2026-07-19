"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { ROLES, type RoleKey } from "@/lib/data";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<RoleKey>("resident");
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="absolute right-6 top-6"><ThemeToggle /></div>
      <motion.div
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="text-xs font-bold uppercase tracking-widest text-primary-strong">Welcome back</div>
        <h1 className="mt-2 font-serif text-3xl font-semibold">Sign in to My Society</h1>
        <p className="mb-6 mt-1 text-ink-soft">Pick a role. Each sees a different, permission-scoped workspace.</p>
        <label className="mb-1.5 block text-[0.82rem] font-semibold text-ink-soft">Sign in as role</label>
        <select value={role} onChange={(e) => setRole(e.target.value as RoleKey)}
          className="mb-4 w-full rounded-[7px] border border-border bg-surface px-3.5 py-2.5">
          {(Object.keys(ROLES) as RoleKey[]).map((k) => <option key={k} value={k}>{ROLES[k].label}</option>)}
        </select>
        <button
          onClick={() => router.push(`/dashboard?role=${role}`)}
          className="flex w-full items-center justify-center gap-2 rounded-[7px] bg-primary py-3 font-semibold text-white hover:bg-primary-strong"
        >
          <LogIn size={18} /> Enter workspace
        </button>
      </motion.div>
    </div>
  );
}
