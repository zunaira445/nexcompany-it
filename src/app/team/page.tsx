"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Coffee, Sparkles } from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "@/components/icons/SocialIcons";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";
import { teamMembers as fallbackMembers } from "@/data/team-data";

interface DbMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
}

const cultureValues = [
  { icon: Heart, title: "People First", description: "We invest in our team's growth as much as our clients' success." },
  { icon: Sparkles, title: "Creative Freedom", description: "Everyone is encouraged to bring new ideas and challenge the status quo." },
  { icon: Coffee, title: "Work-Life Balance", description: "Flexible hours and remote-friendly culture that respects personal time." },
  { icon: Users, title: "Team Collaboration", description: "Cross-functional teams that learn from each other every day." },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<DbMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.members.length > 0) {
          setTeamMembers(data.members);
        } else {
          setTeamMembers(fallbackMembers.map((m, i) => ({ ...m, _id: String(i) })));
        }
      })
      .catch(() => setTeamMembers(fallbackMembers.map((m, i) => ({ ...m, _id: String(i) }))));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-7xl mx-auto mb-16">
        <SectionHeading title="Our Team" subtitle="Meet the Experts" className="mb-8" />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Meet the experts behind NexGen IT Solutions — a passionate team of developers,
            designers, and strategists dedicated to bringing your ideas to life.
          </p>
        </FadeIn>
      </section>

      {/* Team Grid */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {((member as any).skills || []).map((skill: string) => (
                    <span key={skill} className="text-[11px] text-gray-400 bg-white/5 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-500">{(member as any).experience || ""}</span>
                  <div className="flex items-center gap-3">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="text-gray-500 hover:text-primary transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="text-gray-500 hover:text-primary transition-colors">
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} className="text-gray-500 hover:text-primary transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Company Culture */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <SectionHeading title="Our Culture" subtitle="Life at NexGen IT" className="mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureValues.map((value, i) => (
            <FadeIn key={value.title} delay={0.08 * i}>
              <div className="glass-card p-6 h-full text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
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
                Want to Join Our Team?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                We're always looking for talented people who are passionate about technology.
              </p>
              <GradientButton href="/contact" size="lg">
                Get In Touch
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}