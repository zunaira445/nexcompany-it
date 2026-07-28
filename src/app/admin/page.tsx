"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Users, Wrench, Mail, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ portfolio: 0, team: 0, services: 0, messages: 0 });

  useEffect(() => {
    async function loadCounts() {
      try {
        const [p, t, s, m] = await Promise.all([
          fetch("/api/portfolio").then((r) => r.json()),
          fetch("/api/team").then((r) => r.json()),
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/contact").then((r) => r.json()),
        ]);
        setCounts({
          portfolio: p.projects?.length || 0,
          team: t.members?.length || 0,
          services: s.services?.length || 0,
          messages: m.messages?.length || 0,
        });
      } catch {
        // silently ignore — cards just show 0
      }
    }
    loadCounts();
  }, []);

  const cards = [
    { label: "Portfolio Projects", value: counts.portfolio, href: "/admin/portfolio", icon: Briefcase, color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" },
    { label: "Team Members", value: counts.team, href: "/admin/team", icon: Users, color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
    { label: "Services", value: counts.services, href: "/admin/services", icon: Wrench, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
    { label: "Contact Messages", value: counts.messages, href: "/admin/messages", icon: Mail, color: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Manage your website content from here.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div className="text-3xl font-display font-bold text-white mb-1">{card.value}</div>
              <div className="text-gray-400 text-sm flex items-center justify-between">
                {card.label}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}