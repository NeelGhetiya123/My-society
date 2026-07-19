"use client";
/**
 * REPLACE: src/app/dashboard/page.tsx
 * Responsive shell: hamburger + drawer sidebar on mobile, static on desktop.
 * Tables scroll horizontally instead of overflowing.
 */
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Kpi from "@/components/Kpi";
import { ROLES, ACCESS, type RoleKey, type ModuleKey } from "@/lib/data";

/* ------------------------------------------------------------------ demo data */
const RESIDENTS = [
  { flat:"A-1204", name:"Rahul Shah",   type:"Owner",  members:4, phone:"+91 98200 12045", status:"Active", due:0 },
  { flat:"A-0501", name:"Ramesh Iyer",  type:"Owner",  members:3, phone:"+91 98211 55010", status:"Active", due:0 },
  { flat:"B-0902", name:"Anil Deshmukh",type:"Owner",  members:5, phone:"+91 90040 99002", status:"Active", due:0 },
  { flat:"B-0710", name:"Sana Qureshi", type:"Tenant", members:2, phone:"+91 99870 71001", status:"Active", due:4500 },
  { flat:"C-1108", name:"George Thomas",type:"Tenant", members:1, phone:"+91 97650 11008", status:"Notice", due:9000 },
  { flat:"D-1101", name:"Neha Kulkarni",type:"Owner",  members:4, phone:"+91 98115 11011", status:"Active", due:0 },
];
const BILLS = [
  { inv:"INV-2607-1204", flat:"A-1204", amt:6800, status:"Paid" },
  { inv:"INV-2607-0710", flat:"B-0710", amt:4500, status:"Overdue" },
  { inv:"INV-2607-1108", flat:"C-1108", amt:9000, status:"Overdue" },
  { inv:"INV-2607-0501", flat:"A-0501", amt:6800, status:"Paid" },
  { inv:"INV-2607-1101", flat:"D-1101", amt:6800, status:"Pending" },
];
const VISITORS = [
  { name:"Amazon Delivery", type:"Delivery", flat:"A-1204", in:"6:42 PM", status:"Inside" },
  { name:"Dr. S. Kapoor",   type:"Guest",    flat:"C-0304", in:"6:20 PM", status:"Inside" },
  { name:"Uber MH04 KT8890",type:"Cab",      flat:"B-0902", in:"6:05 PM", status:"Exited" },
  { name:"Unknown Guest",   type:"Guest",    flat:"B-0710", in:"6:50 PM", status:"Waiting" },
];
const COMPLAINTS = [
  { id:"CMP-341", cat:"Plumbing",    title:"Water leakage in A-wing parking", pri:"High",   status:"open" },
  { id:"CMP-338", cat:"Electrical",  title:"Lift 2 tripping in B-wing",        pri:"Urgent", status:"open" },
  { id:"CMP-336", cat:"Housekeeping",title:"Garbage not collected C-wing",     pri:"Medium", status:"progress" },
  { id:"CMP-329", cat:"Common Area", title:"Garden lights out near clubhouse", pri:"Medium", status:"resolved" },
  { id:"CMP-322", cat:"Electrical",  title:"Corridor MCB replacement A-wing",  pri:"Medium", status:"closed" },
];
const NOTICES = [
  { type:"Notice",    title:"Annual General Meeting — 20 July, 6 PM Clubhouse", by:"Secretary", when:"2h ago" },
  { type:"Emergency", title:"Water supply suspended 11 AM–2 PM",                by:"Admin",     when:"5h ago" },
  { type:"Event",     title:"Independence Day celebration & flag hoisting",     by:"Committee", when:"1d ago" },
];
const rupee = (n:number) => "₹" + Math.abs(n).toLocaleString("en-IN");

/* ------------------------------------------------------------------ atoms */
function Panel({ title, children }:{ title:string; children:React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="border-b border-border px-5 py-4 text-base font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  );
}
function Pill({ s }:{ s:string }) {
  const map:Record<string,string> = {
    Paid:"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    Overdue:"bg-red-500/15 text-red-600 dark:text-red-400",
    Pending:"bg-black/5 dark:bg-white/10 text-ink-soft",
    Active:"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    Notice:"bg-amber-500/15 text-amber-600 dark:text-amber-400",
    Inside:"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    Exited:"bg-black/5 dark:bg-white/10 text-ink-soft",
    Waiting:"bg-amber-500/15 text-amber-600 dark:text-amber-400",
    Urgent:"bg-red-500/15 text-red-600 dark:text-red-400",
    High:"bg-amber-500/15 text-amber-600 dark:text-amber-400",
    Medium:"bg-blue-500/15 text-blue-600 dark:text-blue-400",
    Owner:"bg-primary-tint text-primary-strong",
    Tenant:"bg-blue-500/15 text-blue-600 dark:text-blue-400",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[s] ?? "bg-black/5 dark:bg-white/10 text-ink-soft"}`}>{s}</span>;
}
const th = "px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-wide text-ink-faint whitespace-nowrap";
const td = "border-t border-border px-4 py-3 text-sm whitespace-nowrap";
/* horizontal-scroll wrapper so wide tables never break mobile layout */
function Scroll({ children }:{ children:React.ReactNode }) {
  return <div className="overflow-x-auto"><div className="min-w-[560px]">{children}</div></div>;
}

function KpiRow({ items }:{ items:[string,string,string,("up"|"down"|"flat")][] }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((k,i) => <Kpi key={k[0]} index={i} label={k[0]} value={k[1]} delta={k[2]} dir={k[3]} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ per-module content */
function ModuleView({ mod, role }:{ mod:ModuleKey; role:RoleKey }) {
  if (mod === "dashboard") return (
    <>
      <KpiRow items={[
        ["Collection this cycle","₹2.84L","92% collected","up"],
        ["Outstanding dues","₹1.57L","6 flats pending","down"],
        ["Open complaints","8","2 urgent","flat"],
        ["Occupancy","94%","148 / 158 flats","up"],
      ]}/>
      <Panel title="Latest notices">
        {NOTICES.map((n,i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3.5 first:border-t-0">
            <div><b className="text-[0.92rem]">{n.title}</b><div className="text-xs text-ink-faint">{n.type} · by {n.by}</div></div>
            <span className="text-xs text-ink-faint">{n.when}</span>
          </div>
        ))}
      </Panel>
    </>
  );

  if (mod === "residents") return (
    <>
      <KpiRow items={[["Total flats","158","4 blocks A–D","flat"],["Owners","112","71% of units","flat"],["Tenants","36","KYC verified","up"],["Vacant","10","6% of units","down"]]}/>
      <Panel title="Resident directory">
        <Scroll>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Resident</th><th className={th}>Flat</th><th className={th}>Type</th><th className={th}>Members</th><th className={th}>Status</th><th className={th}>Outstanding</th></tr></thead>
            <tbody>
              {RESIDENTS.map(r => (
                <tr key={r.flat} className="hover:bg-surface-2">
                  <td className={td}><div className="font-semibold">{r.name}</div><div className="text-xs text-ink-faint">{r.phone}</div></td>
                  <td className={td+" font-semibold"}>{r.flat}</td>
                  <td className={td}><Pill s={r.type}/></td>
                  <td className={td+" tabular-nums"}>{r.members}</td>
                  <td className={td}><Pill s={r.status}/></td>
                  <td className={td+" tabular-nums"}>{r.due>0 ? <span className="font-semibold text-red-500">{rupee(r.due)}</span> : <span className="text-ink-faint">Nil</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </Panel>
    </>
  );

  if (mod === "billing") return (
    <>
      <KpiRow items={[["Billed (July)","₹3.09L","158 invoices","flat"],["Collected","₹2.84L","92%","up"],["Pending","₹15.7K","3 flats","flat"],["Overdue + late fee","₹13.5K","2 flats","down"]]}/>
      <Panel title="Invoice register">
        <Scroll>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Invoice</th><th className={th}>Flat</th><th className={th}>Amount</th><th className={th}>Status</th></tr></thead>
            <tbody>
              {BILLS.map(b => (
                <tr key={b.inv} className="hover:bg-surface-2">
                  <td className={td+" font-semibold"}>{b.inv}</td><td className={td}>{b.flat}</td>
                  <td className={td+" tabular-nums"}>{rupee(b.amt)}</td><td className={td}><Pill s={b.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </Panel>
    </>
  );

  if (mod === "visitors") return (
    <>
      <KpiRow items={[["Entries today","42","+6","up"],["Inside now","12","3 deliveries","flat"],["Deliveries","18","peak 6–8 PM","up"],["Awaiting approval","1","B-0710","flat"]]}/>
      <Panel title="Gate activity">
        <Scroll>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Visitor</th><th className={th}>Type</th><th className={th}>Flat</th><th className={th}>In</th><th className={th}>Status</th></tr></thead>
            <tbody>
              {VISITORS.map((v,i) => (
                <tr key={i} className="hover:bg-surface-2">
                  <td className={td+" font-semibold"}>{v.name}</td><td className={td}><Pill s={v.type}/></td>
                  <td className={td}>{v.flat}</td><td className={td+" tabular-nums"}>{v.in}</td><td className={td}><Pill s={v.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </Panel>
    </>
  );

  if (mod === "complaints") {
    const cols:[string,string][] = [["open","Open"],["progress","In Progress"],["resolved","Resolved"],["closed","Closed"]];
    return (
      <>
        <KpiRow items={[["Open","2","1 urgent","flat"],["In progress","1","within SLA","flat"],["Resolved (7d)","5","avg 1.2 days","up"],["Satisfaction","4.6","from 22 ratings","up"]]}/>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cols.map(([key,label]) => (
            <div key={key} className="rounded-2xl bg-surface-2 p-3">
              <div className="px-2 pb-3 pt-1.5 text-sm font-semibold">{label} <span className="ml-1 text-ink-faint">{COMPLAINTS.filter(c=>c.status===key).length}</span></div>
              {COMPLAINTS.filter(c=>c.status===key).map(c => (
                <div key={c.id} className="mb-2.5 rounded-xl border border-border bg-surface p-3">
                  <div className="text-[0.7rem] font-bold uppercase text-ink-faint">{c.cat}</div>
                  <h4 className="my-1.5 text-[0.9rem] font-semibold leading-snug">{c.title}</h4>
                  <div className="flex items-center gap-2"><Pill s={c.pri}/><span className="text-xs text-ink-faint">{c.id}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (mod === "comms") return (
    <>
      <KpiRow items={[["Active notices","5","4 unread avg","flat"],["Upcoming events","2","64 RSVPs","up"],["Delivery rate","98%","in-app+email+SMS","up"],["Read rate","81%","last 30 days","up"]]}/>
      <Panel title="Communication feed">
        {NOTICES.map((n,i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3.5 first:border-t-0">
            <div><b className="text-[0.92rem]">{n.title}</b><div className="text-xs text-ink-faint">{n.type} · by {n.by} · reaches 158 flats</div></div>
            <span className="text-xs text-ink-faint">{n.when}</span>
          </div>
        ))}
      </Panel>
    </>
  );

  if (mod === "finance") return (
    <>
      <KpiRow items={[["Income (FY26)","₹34.2L","+8% YoY","up"],["Expenses (FY26)","₹28.8L","+5% YoY","down"],["Net surplus","₹5.4L","healthy","up"],["Reserve fund","₹18.4L","corpus intact","up"]]}/>
      <Panel title="General ledger">
        <Scroll>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Description</th><th className={th}>Category</th><th className={th}>Amount</th></tr></thead>
            <tbody>
              {[["Maintenance collection · July","Income",284600],["Security agency · SecureGuard","Expense",-96000],["Common electricity · MSEB","Expense",-63400],["Lift AMC · OtisCare","Expense",-42000]].map((t,i)=>(
                <tr key={i} className="hover:bg-surface-2">
                  <td className={td+" font-semibold"}>{t[0] as string}</td>
                  <td className={td}><Pill s={(t[1] as string)==="Income"?"Paid":"Pending"}/></td>
                  <td className={td+" tabular-nums font-semibold "+((t[2] as number)>0?"text-emerald-600 dark:text-emerald-400":"")}>{(t[2] as number)>0?"+":"−"}{rupee(t[2] as number)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </Panel>
    </>
  );

  if (mod === "reports") {
    const health:[string,number][] = [["Collection efficiency",92],["Complaint SLA",88],["Occupancy",94],["Reserve adequacy",76],["Engagement",81]];
    return (
      <Panel title="Society health index">
        <div className="p-5">
          {health.map(([k,v]) => (
            <div key={k} className="mb-4">
              <div className="mb-1.5 flex justify-between text-sm"><b>{k}</b><span className="tabular-nums text-ink-faint">{v}%</span></div>
              <div className="h-2 overflow-hidden rounded bg-black/10 dark:bg-white/10"><div className="h-full rounded bg-primary" style={{width:`${v}%`}}/></div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (mod === "config") {
    const rows:[string,string][] = [["Society name","Greenwood Residency CHS"],["Registration no.","MH/2011/00842"],["Buildings","4 (A, B, C, D)"],["Total units","158"],["Billing cycle","Monthly"],["Rate","₹4.25 / sq.ft"],["Late fee","2% / month after 10 days"]];
    return (
      <Panel title="Society configuration">
        <div className="p-5">
          {rows.map(([k,v]) => (
            <div key={k} className="flex flex-wrap justify-between gap-2 border-b border-dashed border-border py-3 last:border-0">
              <span className="text-ink-soft">{k}</span><span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (mod === "roles") return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {(Object.keys(ROLES) as RoleKey[]).map(k => (
        <div key={k} className="rounded-2xl border border-border bg-surface p-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint text-sm font-bold text-primary-strong">{ROLES[k].initials}</span>
            <h4 className="font-semibold">{ROLES[k].label}</h4>
          </div>
          <div className="text-sm text-ink-soft">Can access {(Object.keys(ACCESS) as ModuleKey[]).filter(m=>ACCESS[m].includes(k)).length} modules</div>
        </div>
      ))}
    </div>
  );

  if (mod === "migration") return (
    <Panel title="Import from Excel">
      <div className="p-5">
        <div className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-surface-2 p-8 text-center text-ink-faint hover:border-primary sm:p-12">
          Drop your .xlsx or .csv here · residents, payments, complaints
        </div>
        <div className="mt-4 text-sm text-ink-soft">154 valid · 3 warnings · 1 duplicate flagged</div>
      </div>
    </Panel>
  );

  return null;
}

/* ------------------------------------------------------------------ shell */
function Shell() {
  const params = useSearchParams();
  const role = (params.get("role") as RoleKey) || "resident";
  const [active, setActive] = useState<ModuleKey>("dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const R = ROLES[role];
  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
  const titles:Record<ModuleKey,string> = {
    dashboard:`${greeting}, ${R.name.split(" ")[0]}`, residents:"Residents", billing:"Maintenance & Billing",
    finance:"Financials", visitors:"Security & Visitors", complaints:"Complaints & Service Requests",
    comms:"Notices & Events", reports:"Reports", config:"Society Setup", roles:"Roles & Permissions", migration:"Data Migration",
  };

  return (
    <div className="lg:grid lg:grid-cols-[264px_1fr]">
      <Sidebar role={role} active={active} onNavigate={setActive} open={navOpen} onClose={() => setNavOpen(false)} />

      {/* mobile scrim */}
      {navOpen && <div onClick={() => setNavOpen(false)} className="fixed inset-0 z-[55] bg-black/45 backdrop-blur-sm lg:hidden" />}

      <div className="h-screen overflow-y-auto">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur sm:px-6">
          <button onClick={() => setNavOpen(true)} className="grid h-[38px] w-[38px] place-items-center rounded-[9px] text-ink-soft hover:bg-surface-2 lg:hidden">
            <Menu size={20} />
          </button>
          <input placeholder="Search..."
            className="w-full max-w-[420px] rounded-[11px] border border-border bg-surface px-3.5 py-2" />
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <button className="grid h-[38px] w-[38px] place-items-center rounded-[9px] text-ink-soft hover:bg-surface-2"><Bell size={19} /></button>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-tint text-sm font-bold text-primary-strong">{R.initials}</span>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div key={active} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ ease:[0.22,1,0.36,1] }}>
            <h1 className="mb-6 font-serif text-2xl font-semibold sm:text-3xl">{titles[active]}</h1>
            <ModuleView mod={active} role={role} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
export default function Dashboard() {
  return <Suspense><Shell /></Suspense>;
}
