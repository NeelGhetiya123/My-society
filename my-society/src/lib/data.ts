export type RoleKey =
  | "admin" | "chairman" | "secretary" | "treasurer"
  | "committee" | "resident" | "security" | "staff";

export const ROLES: Record<RoleKey, { name: string; flat: string; label: string; initials: string }> = {
  admin:     { name: "Priya Menon",   flat: "Admin Office", label: "Admin",             initials: "PM" },
  chairman:  { name: "Anil Deshmukh", flat: "B-0902",       label: "Chairman",          initials: "AD" },
  secretary: { name: "Fatima Sheikh", flat: "C-0304",       label: "Secretary",         initials: "FS" },
  treasurer: { name: "Ramesh Iyer",   flat: "A-0501",       label: "Treasurer",         initials: "RI" },
  committee: { name: "Neha Kulkarni", flat: "D-1101",       label: "Committee Member",  initials: "NK" },
  resident:  { name: "Rahul Shah",    flat: "A-1204",       label: "Resident",          initials: "RS" },
  security:  { name: "Vijay Pawar",   flat: "Main Gate",    label: "Security Guard",    initials: "VP" },
  staff:     { name: "Suresh Kadam",  flat: "Facilities",   label: "Maintenance Staff", initials: "SK" },
};

export const MODULES = {
  dashboard:  { label: "Dashboard",            icon: "LayoutDashboard", group: "Overview" },
  residents:  { label: "Residents",            icon: "Users",           group: "Community" },
  visitors:   { label: "Security & Visitors",  icon: "ScanFace",        group: "Community" },
  complaints: { label: "Complaints",           icon: "Wrench",          group: "Community" },
  comms:      { label: "Notices & Events",     icon: "Megaphone",       group: "Community" },
  billing:    { label: "Maintenance & Billing",icon: "ReceiptIndianRupee", group: "Finance" },
  finance:    { label: "Financials",           icon: "Landmark",        group: "Finance" },
  reports:    { label: "Reports",              icon: "BarChart3",       group: "Finance" },
  config:     { label: "Society Setup",        icon: "Settings2",       group: "Administration" },
  roles:      { label: "Roles & Permissions",  icon: "ShieldCheck",     group: "Administration" },
  migration:  { label: "Data Migration",       icon: "FileSpreadsheet", group: "Administration" },
} as const;

export type ModuleKey = keyof typeof MODULES;

// Role-based access control: which roles can see each module
export const ACCESS: Record<ModuleKey, RoleKey[]> = {
  dashboard:  ["admin","chairman","secretary","treasurer","committee","resident","security","staff"],
  residents:  ["admin","chairman","secretary","committee"],
  billing:    ["admin","chairman","treasurer","resident"],
  finance:    ["admin","chairman","treasurer","committee"],
  visitors:   ["admin","secretary","resident","security"],
  complaints: ["admin","chairman","secretary","resident","staff"],
  comms:      ["admin","chairman","secretary","committee","resident"],
  reports:    ["admin","chairman","treasurer"],
  migration:  ["admin"],
  roles:      ["admin"],
  config:     ["admin","chairman"],
};

export const GROUP_ORDER = ["Overview","Community","Finance","Administration"];

export const RESIDENTS = [
  { flat:"A-1204", name:"Rahul Shah",   type:"Owner",  members:4, phone:"+91 98200 12045", status:"Active", due:0 },
  { flat:"A-0501", name:"Ramesh Iyer",  type:"Owner",  members:3, phone:"+91 98211 55010", status:"Active", due:0 },
  { flat:"B-0710", name:"Sana Qureshi", type:"Tenant", members:2, phone:"+91 99870 71001", status:"Active", due:4500 },
  { flat:"C-1108", name:"George Thomas",type:"Tenant", members:1, phone:"+91 97650 11008", status:"Notice", due:9000 },
  { flat:"D-1101", name:"Neha Kulkarni",type:"Owner",  members:4, phone:"+91 98115 11011", status:"Active", due:0 },
];
