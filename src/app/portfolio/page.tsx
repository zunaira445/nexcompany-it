"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";
import { portfolioProjects as fallbackProjects, portfolioCategories, portfolioStats } from "@/data/portfolio-data";

interface DbProject {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          // No admin-added projects yet — show sample data so the page isn't empty
          setProjects(fallbackProjects.map((p) => ({ ...p, _id: String(p.id) })));
        }
      })
      .catch(() => setProjects(fallbackProjects.map((p) => ({ ...p, _id: String(p.id) }))))
      .finally(() => setLoaded(true));
  }, []);

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="section-padding max-w-7xl mx-auto mb-16">
        <SectionHeading
          title="Our Portfolio"
          subtitle="Featured Projects"
          className="mb-8"
        />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Check out our latest projects and success stories — a showcase of how we've helped
            businesses across web development, mobile apps, design, and digital marketing.
          </p>
        </FadeIn>
      </section>

      {/* Stats */}
      <section className="section-padding max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {portfolioStats.map((stat, i) => (
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

      {/* Category Filters */}
      <section className="section-padding max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg shadow-primary/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl glass-card flex flex-col"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding max-w-5xl mx-auto">
        <FadeIn>
          <div className="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Let's create your next success story together. Reach out and let's talk about your
                goals.
              </p>
              <GradientButton href="/contact" size="lg">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}