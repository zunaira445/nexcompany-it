"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import GlowingOrb from "@/components/animations/GlowingOrb";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      <GlowingOrb color="purple" size={500} className="top-0 left-1/2 -translate-x-1/2" />
      
      <div className="section-padding max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card-strong p-8 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Your <span className="text-gradient">Digital Journey?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Let's discuss your project and turn your vision into reality. 
              Our team is ready to create something extraordinary for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton href="/contact" size="lg">
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </GradientButton>
              <GradientButton href="/contact" variant="outline" size="lg">
                <MessageCircle className="w-5 h-5" />
                Schedule a Call
              </GradientButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}