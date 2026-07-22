"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, 
  Shield, 
  Clock, 
  Headphones,
  CheckCircle2
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const reasons = [
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "We use the latest frameworks and tools to build future-proof solutions that scale with your business.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security measures protect your data and ensure compliance with industry standards.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect deadlines. Our agile methodology ensures timely delivery without compromising quality.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock support team ready to assist you with any issues or questions anytime.",
  },
];

const features = [
  "Custom Solutions Tailored to Your Needs",
  "Transparent Communication & Reporting",
  "Dedicated Project Manager",
  "Post-Launch Maintenance & Updates",
  "Competitive Pricing",
  "100% Satisfaction Guarantee",
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <SectionHeading
              title="Why Choose NexGen IT?"
              subtitle="Our Advantage"
              align="left"
              className="mb-8"
            />
            
            <FadeIn delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We don't just build websites and apps — we create digital experiences 
                that transform businesses. Our team of experts combines creativity 
                with technical excellence to deliver results that exceed expectations.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="glass-card p-6 hover:bg-white/[0.08] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}