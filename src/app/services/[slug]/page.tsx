"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";
import { getServiceBySlug } from "@/data/services-data";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
              <Icon className={`w-10 h-10 ${service.iconColor}`} />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              {service.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 max-w-3xl">
              {service.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-8">
              {service.heroDescription}
            </p>
            <GradientButton href="/contact" size="lg">
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </GradientButton>
          </div>
        </FadeIn>
      </section>

      {/* Service Description */}
      <section className="section-padding max-w-4xl mx-auto mb-24">
        {service.description.map((para, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">{para}</p>
          </FadeIn>
        ))}
      </section>

      {/* Features */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="What's Included" subtitle="Features" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.features.map((feature, i) => (
            <FadeIn key={feature.title} delay={0.08 * i}>
              <div className="glass-card p-6 h-full hover:bg-white/[0.08] transition-all duration-500">
                <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding max-w-5xl mx-auto mb-24">
        <SectionHeading title="Technologies We Use" subtitle="Our Stack" className="mb-12" />
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Development Process */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Our Process" subtitle="How We Work" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.process.map((step, i) => (
            <FadeIn key={step.step} delay={0.08 * i}>
              <div className="glass-card p-6 h-full">
                <span className="text-4xl font-display font-bold bg-gradient-to-r from-primary/30 to-accent-purple/30 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding max-w-5xl mx-auto mb-24">
        <SectionHeading title="Benefits You Get" subtitle="Why It Matters" className="mb-12" />
        <div className="grid sm:grid-cols-2 gap-4">
          {service.benefits.map((benefit, i) => (
            <FadeIn key={benefit} delay={0.05 * i}>
              <div className="glass-card p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding max-w-4xl mx-auto mb-24">
        <SectionHeading title="Frequently Asked Questions" subtitle="FAQs" className="mb-12" />
        <div className="space-y-4">
          {service.faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Contact/Inquiry CTA */}
      <section className="section-padding max-w-5xl mx-auto">
        <FadeIn>
          <div className="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to Start Your {service.shortTitle} Project?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Tell us about your project and get a free, no-obligation consultation with our team.
              </p>
              <GradientButton href="/contact" size="lg">
                Request a Free Consultation <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}