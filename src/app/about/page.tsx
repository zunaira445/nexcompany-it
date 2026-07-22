"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Rocket,
  Code2,
  Layers,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We do what's right for our clients, even when no one is watching.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly explore new technologies to keep our clients ahead of the curve.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We genuinely care about the success of every project we take on.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as an extension of your team, not just an outside vendor.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standard in everything we deliver.",
  },
  {
    icon: TrendingUp,
    title: "Growth Mindset",
    description: "We're always learning, iterating, and improving — for us and for you.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and project requirements in detail.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our designers craft wireframes and interactive prototypes so you can visualize the product early.",
  },
  {
    step: "03",
    title: "Development",
    description: "Our engineers build your solution using modern, scalable, and secure technology stacks.",
  },
  {
    step: "04",
    title: "Testing & QA",
    description: "Every feature is rigorously tested across devices and browsers before launch.",
  },
  {
    step: "05",
    title: "Deployment",
    description: "We handle a smooth, zero-downtime launch and make sure everything runs perfectly.",
  },
  {
    step: "06",
    title: "Support & Growth",
    description: "Post-launch, we provide ongoing maintenance, updates, and scaling support.",
  },
];

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "PHP (Laravel)", "REST & GraphQL APIs"] },
  { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"] },
  { category: "Cloud & DevOps", items: ["AWS", "Vercel", "Docker", "CI/CD Pipelines"] },
  { category: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"] },
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "80+", label: "Happy Clients" },
  { value: "6+", label: "Years of Experience" },
  { value: "25+", label: "Team Experts" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero / Company Introduction */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading
          title="Building Digital Futures, One Idea at a Time"
          subtitle="About NexGen IT Solutions"
          className="mb-8"
        />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            NexGen IT Solutions is a full-service digital agency helping startups and enterprises
            turn ambitious ideas into powerful, scalable technology products. From web and mobile
            development to UI/UX design and digital marketing, we combine strategy, design, and
            engineering to deliver solutions that drive real business growth.
          </p>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 * i}>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 leading-tight">
              A Team of Builders, Designers & Problem Solvers
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Founded with a vision to make world-class technology accessible to businesses of
              every size, NexGen IT Solutions has grown into a trusted digital partner for clients
              across industries — from ambitious startups to established enterprises.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our multidisciplinary team of developers, designers, and strategists works closely
              with every client to understand their unique challenges and build solutions that
              actually move the needle.
            </p>
          </FadeIn>
          <FadeIn direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-8 flex flex-col items-center text-center">
                <Code2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-white font-semibold mb-2">Expert Engineering</h3>
                <p className="text-gray-400 text-sm">Clean, scalable, production-ready code.</p>
              </div>
              <div className="glass-card p-8 flex flex-col items-center text-center mt-8">
                <Layers className="w-10 h-10 text-accent-purple mb-4" />
                <h3 className="text-white font-semibold mb-2">Thoughtful Design</h3>
                <p className="text-gray-400 text-sm">User-first interfaces that convert.</p>
              </div>
              <div className="glass-card p-8 flex flex-col items-center text-center">
                <Rocket className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-400 text-sm">Agile process, on-time launches.</p>
              </div>
              <div className="glass-card p-8 flex flex-col items-center text-center mt-8">
                <ShieldCheck className="w-10 h-10 text-accent-purple mb-4" />
                <h3 className="text-white font-semibold mb-2">Reliable Support</h3>
                <p className="text-gray-400 text-sm">We stay with you after launch.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="glass-card p-10 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower businesses with innovative, reliable, and scalable technology solutions
                that simplify operations, enhance customer experience, and accelerate growth —
                delivered with transparency and genuine care.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="glass-card p-10 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be a globally recognized digital agency known for turning bold ideas into
                exceptional digital products — setting the benchmark for quality, creativity, and
                client success in the IT industry.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Our Core Values" subtitle="What Drives Us" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, i) => (
            <FadeIn key={value.title} delay={0.08 * i}>
              <div className="glass-card p-6 h-full hover:bg-white/[0.08] transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Why Choose NexGen IT Solutions" subtitle="Our Advantage" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Proven track record with 150+ successful projects",
            "Dedicated project manager for every engagement",
            "Transparent pricing with no hidden costs",
            "Agile development with weekly progress updates",
            "Post-launch support & maintenance included",
            "Certified developers & designers",
            "Strict data security & confidentiality",
            "Flexible engagement models",
          ].map((point, i) => (
            <FadeIn key={point} delay={0.05 * i}>
              <div className="glass-card p-5 flex items-start gap-3 h-full">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{point}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Our Development Process" subtitle="How We Work" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <FadeIn key={step.step} delay={0.08 * i}>
              <div className="glass-card p-6 h-full relative overflow-hidden">
                <span className="text-5xl font-display font-bold bg-gradient-to-r from-primary/30 to-accent-purple/30 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Technologies We Use" subtitle="Our Tech Stack" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <FadeIn key={tech.category} delay={0.08 * i}>
              <div className="glass-card p-6 h-full">
                <h3 className="text-lg font-semibold text-white mb-4">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding max-w-5xl mx-auto">
        <FadeIn>
          <div className="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to Build Something Great?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss your project and discover how NexGen IT Solutions can help turn your
                vision into reality.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/contact" size="lg">
                  Get in Touch
                </GradientButton>
                <GradientButton href="/portfolio" variant="outline" size="lg">
                  View Our Work
                </GradientButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}