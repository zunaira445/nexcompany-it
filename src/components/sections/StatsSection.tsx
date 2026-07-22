"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/animations/CountUp";
import { Briefcase, Users, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful deliveries worldwide",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    description: "Trusted partnerships",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Awards Won",
    description: "Industry recognition",
  },
  {
    icon: Globe,
    value: 30,
    suffix: "+",
    label: "Countries Served",
    description: "Global reach",
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="glass-card p-6 lg:p-8 text-center hover:bg-white/10 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-purple/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                  {isInView && (
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                  )}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}