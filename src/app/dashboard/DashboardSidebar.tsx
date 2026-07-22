"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  Users,
  FolderOpen,
  Shield,
  LogOut,
} from "lucide-react";

const userLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "My Requests", href: "/dashboard/requests", icon: FileText },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Portfolio", href: "/admin/portfolio", icon: FolderOpen },
  { name: "Team", href: "/admin/team", icon: Shield },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Requests", href: "/admin/requests", icon: FileText },
];

export default function DashboardSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  const links = userRole === "admin" ? adminLinks : userLinks;
  const basePath = userRole === "admin" ? "/admin" : "/dashboard";

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-800 border-r border-white/5 z-40 hidden lg:flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-accent-purple/20 text-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}