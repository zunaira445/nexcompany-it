"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Wrench,
  Mail,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/admin-login");
    }
  }, [loading, user, router]);

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05050A]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex bg-[#05050A]">
      <aside className="w-64 border-r border-white/10 bg-[#0A0A12] p-6 flex flex-col fixed h-screen overflow-y-auto">
        <h1 className="text-xl font-display font-bold text-white mb-8">Admin Panel</h1>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-primary/15 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}