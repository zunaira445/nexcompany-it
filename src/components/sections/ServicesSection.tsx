"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  PenTool, 
  TrendingUp,
  ArrowRight,
  Code2,
  Layers
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxCard from "@/components/animations/ParallaxCard";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, responsive websites built with cutting-edge technologies. From landing pages to complex web applications.",
    features: ["React/Next.js", "Node.js Backend", "SEO Optimized", "CMS Integration"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
    features: ["React Native", "Flutter", "iOS & Android", "Push Notifications"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    href: "/services/mobile-app",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that combines aesthetics with functionality. Creating intuitive interfaces users love.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    href: "/services/ui-ux-design",
  },
  {
    icon: PenTool,
    title: "Graphic Designing",
    description: "Stunning visual designs that communicate your brand message. From logos to complete brand identity.",
    features: ["Brand Identity", "Logo Design", "Marketing Materials", "Social Media Graphics"],
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    href: "/services/graphic-design",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that increase visibility, engagement, and conversions for your business.",
    features: ["SEO & SEM", "Social Media", "Content Marketing", "Analytics"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    href: "/services/digital-marketing",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-32">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeading
          title="Our Premium Services"
          subtitle="What We Offer"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ParallaxCard className="h-full">
                <div className="glass-card p-8 h-full group hover:bg-white/[0.08] transition-all duration-500">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                        <Code2 className="w-3 h-3 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ParallaxCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
          >
            <Layers className="w-5 h-5" />
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}