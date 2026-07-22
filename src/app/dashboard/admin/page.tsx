"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: 1250,
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Total Services",
    value: 15,
    change: "+3",
    trend: "up",
    icon: Briefcase,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    name: "Active Requests",
    value: 48,
    change: "+8%",
    trend: "up",
    icon: FileText,
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
  },
  {
    name: "New Messages",
    value: 23,
    change: "-5%",
    trend: "down",
    icon: MessageSquare,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
];

const recentUsers = [
  { name: "John Smith", email: "john@example.com", date: "2024-01-20", status: "active" },
  { name: "Emma Wilson", email: "emma@example.com", date: "2024-01-19", status: "active" },
  { name: "David Brown", email: "david@example.com", date: "2024-01-18", status: "pending" },
  { name: "Lisa Anderson", email: "lisa@example.com", date: "2024-01-17", status: "active" },
];

const recentRequests = [
  { id: "REQ-001", user: "John Smith", service: "Website Development", status: "pending", date: "2024-01-20" },
  { id: "REQ-002", user: "Emma Wilson", service: "Mobile App", status: "in-progress", date: "2024-01-19" },
  { id: "REQ-003", user: "David Brown", service: "UI/UX Design", status: "completed", date: "2024-01-18" },
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-amber-500/20 text-amber-400",
      "in-progress": "bg-blue-500/20 text-blue-400",
      completed: "bg-green-500/20 text-green-400",
      active: "bg-green-500/20 text-green-400",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-gray-400">Overview of your platform</p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-400" : "text-red-400"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Recent Users</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentUsers.map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Recent Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-3">ID</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-3">User</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-3">Service</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-3 text-white text-xs font-medium">{req.id}</td>
                    <td className="px-6 py-3 text-gray-300 text-xs">{req.user}</td>
                    <td className="px-6 py-3 text-gray-300 text-xs">{req.service}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(req.status)}`}>
                        {req.status.replace("-", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}