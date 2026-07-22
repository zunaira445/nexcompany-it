"use client";

import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`${alignments[align]} ${className}`}>
      {subtitle && (
        <FadeIn delay={0}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            {subtitle}
          </span>
        </FadeIn>
      )}
      <TextReveal
        text={title}
        className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight"
        delay={0.1}
      />
    </div>
  );
}