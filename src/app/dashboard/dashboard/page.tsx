"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Total Requests", value: 12, icon: FileText, color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400" },
  { name: "In Progress", value: 3, icon: Clock, color: "from-amber-500/20 to-yellow-500/20", iconColor: "text-amber-400" },
  { name: "Completed", value: 8, icon: CheckCircle, color: "from-green-500/20 to-emerald-500/20", iconColor: "text-green-400" },
  { name: "Pending", value: 1, icon: Briefcase, color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
];

const recentRequests = [
  { id: "REQ-001", service: "Website Development", status: "in-progress", date: "2024-01-15" },
  { id: "REQ-002", service: "Mobile App Design", status: "completed", date: "2024-01-10" },
  { id: "REQ-003", service: "UI/UX Design", status: "pending", date: "2024-01-20" },
];

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-amber-500/20 text-amber-400",
      "in-progress": "bg-blue-500/20 text-blue-400",
      completed: "bg-green-500/20 text-green-400",
      rejected: "bg-red-500/20 text-red-400",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Welcome back, <span className="text-gradient">{user?.fullName || "User"}</span>
        </h1>
        <p className="text-gray-400">Here's what's happening with your projects</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Requests</h2>
          <Link
            href="/dashboard/requests"
            className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Request ID</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Service</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-6 py-4 text-white text-sm font-medium">{request.id}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{request.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                      {request.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid sm:grid-cols-2 gap-6"
      >
        <Link href="/dashboard/services" className="glass-card p-6 hover:bg-white/[0.08] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Request a Service</h3>
          <p className="text-gray-400 text-sm">Browse our services and submit a new request</p>
        </Link>

        <Link href="/dashboard/profile" className="glass-card p-6 hover:bg-white/[0.08] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-accent-purple" />
            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-accent-purple group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Update Profile</h3>
          <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
        </Link>
      </motion.div>
    </div>
  );
}