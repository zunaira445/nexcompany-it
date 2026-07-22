"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";
import { servicesData } from "@/data/services-data";

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-7xl mx-auto mb-20">
        <SectionHeading
          title="Our Premium Services"
          subtitle="What We Offer"
          className="mb-8"
        />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            From websites and mobile apps to design and marketing — we offer end-to-end digital
            solutions to help your business grow and thrive online.
          </p>
        </FadeIn>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="glass-card p-8 h-full group hover:bg-white/[0.08] transition-all duration-500 flex flex-col">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {service.heroDescription}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-padding max-w-5xl mx-auto mt-24">
        <FadeIn>
          <div className="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Talk to our team — we'll help you figure out the right solution for your business.
              </p>
              <GradientButton href="/contact" size="lg">
                Contact Us <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}