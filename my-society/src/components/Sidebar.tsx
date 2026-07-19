"use client";
/**
 * REPLACE: src/components/Sidebar.tsx
 * Responsive: fixed drawer on mobile (slides in), static column on desktop.
 */
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { MODULES, ACCESS, GROUP_ORDER, ROLES, type RoleKey, type ModuleKey } from "@/lib/data";

export default function Sidebar({ role, active, onNavigate, open, onClose }:{
  role: RoleKey; active: ModuleKey; onNavigate: (m: ModuleKey) => void;
  open: boolean; onClose: () => void;
}) {
  const R = ROLES[role];
  const router = useRouter();
  let i = 0;
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-[60] flex h-screen w-[264px] flex-col border-r border-border bg-surface
        transition-transform duration-300 ease-out lg:static lg:translate-x-0
        ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
    >
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-primary text-white">
          <Icons.Building2 size={19} />
        </span>
        <div className="flex-1">
          <div className="font-serif text-lg font-semibold leading-none">My Society</div>
          <div className="mt-0.5 text-xs text-ink-faint">Greenwood Residency</div>
        </div>
        <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-[7px] text-ink-soft hover:bg-surface-2 lg:hidden">
          <Icons.X size={18} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {GROUP_ORDER.map((group) => {
          const mods = (Object.keys(MODULES) as ModuleKey[]).filter(
            (m) => MODULES[m].group === group && ACCESS[m].includes(role)
          );
          if (!mods.length) return null;
          return (
            <div key={group}>
              <div className="px-3 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-faint">{group}</div>
              {mods.map((m) => {
                const Icon = (Icons as any)[MODULES[m].icon] ?? Icons.Circle;
                const on = active === m;
                return (
                  <motion.button
                    key={m}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i++ * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => { onNavigate(m); onClose(); }}
                    className={`flex w-full items-center gap-3 rounded-[7px] px-3 py-2 text-left text-[0.92rem] font-medium transition
                      ${on ? "bg-primary-tint text-primary-strong font-semibold" : "text-ink-soft hover:bg-surface-2 hover:text-ink"}`}
                  >
                    <Icon size={18} /> <span>{MODULES[m].label}</span>
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-[7px] px-2.5 py-2">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-primary-tint text-sm font-bold text-primary-strong">{R.initials}</span>
          <div className="overflow-hidden">
            <b className="block truncate text-[0.86rem] font-semibold">{R.name}</b>
            <span className="text-xs text-ink-faint">{R.label} · {R.flat}</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="mt-2 flex w-full items-center gap-3 rounded-[7px] px-3 py-2 text-left text-[0.9rem] font-medium text-ink-soft transition hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
        >
          <Icons.LogOut size={18} /> <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
