"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientButton from "@/components/ui/GradientButton";
import FadeIn from "@/components/animations/FadeIn";

const plans = [
  {
    name: "Basic",
    price: "$999",
    period: "starting price",
    description: "Perfect for small businesses and startups getting online.",
    features: [
      "5-Page Responsive Website",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Free Support",
      "Mobile-Friendly Design",
    ],
    notIncluded: ["Custom Backend/API", "E-Commerce Integration", "Priority Support"],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$2,499",
    period: "starting price",
    description: "Ideal for growing businesses that need more functionality.",
    features: [
      "Up to 12 Pages",
      "Custom UI/UX Design",
      "CMS Integration",
      "Advanced SEO Optimization",
      "3 Months Free Support",
      "Basic Analytics Dashboard",
      "API Integrations",
    ],
    notIncluded: ["Dedicated Project Manager"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$4,999",
    period: "starting price",
    description: "Full-scale solution for enterprises with complex needs.",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "Full-Stack Development",
      "Dedicated Project Manager",
      "6 Months Free Support",
      "Advanced Analytics & Reporting",
      "Priority 24/7 Support",
      "Third-Party Integrations",
    ],
    notIncluded: [],
    highlighted: false,
  },
];

const comparisonFeatures = [
  { feature: "Responsive Design", basic: true, standard: true, premium: true },
  { feature: "SEO Optimization", basic: "Basic", standard: "Advanced", premium: "Advanced" },
  { feature: "CMS Integration", basic: false, standard: true, premium: true },
  { feature: "Custom Backend/API", basic: false, standard: true, premium: true },
  { feature: "E-Commerce Ready", basic: false, standard: "Add-on", premium: true },
  { feature: "Dedicated Project Manager", basic: false, standard: false, premium: true },
  { feature: "Support Duration", basic: "1 Month", standard: "3 Months", premium: "6 Months" },
  { feature: "Priority Support", basic: false, standard: false, premium: true },
];

const faqs = [
  {
    question: "Are these prices fixed or can they vary?",
    answer:
      "These are starting prices. The final quote depends on your specific requirements, features, and project complexity. We provide a detailed, transparent quote after understanding your needs.",
  },
  {
    question: "Do you offer custom pricing for unique projects?",
    answer:
      "Yes, if your project doesn't fit neatly into one of these plans, we're happy to create a custom package tailored to your exact requirements and budget.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, major credit/debit cards, and popular payment gateways. Projects are typically billed in milestones.",
  },
  {
    question: "Is ongoing maintenance included after launch?",
    answer:
      "Each plan includes a free support period after launch. After that, we offer flexible monthly maintenance packages to keep your product updated and secure.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely. Many clients start with a Basic or Standard plan and upgrade as their business grows. We make transitions seamless.",
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-600 mx-auto" />
    );
  }
  return <span className="text-gray-300 text-sm">{value}</span>;
}

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="text-white font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-7xl mx-auto mb-16">
        <SectionHeading title="Simple, Transparent Pricing" subtitle="Pricing Plans" className="mb-8" />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Choose a plan that fits your business needs. All plans include a free consultation and
            a custom quote based on your exact requirements.
          </p>
        </FadeIn>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative glass-card p-8 flex flex-col ${
                plan.highlighted ? "border-2 border-primary shadow-lg shadow-primary/20 md:-translate-y-4" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent-purple text-white text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <X className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <GradientButton href="/contact" variant={plan.highlighted ? "primary" : "outline"} className="w-full justify-center">
                Get Started <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding max-w-6xl mx-auto mb-24">
        <SectionHeading title="Compare Plans" subtitle="Features Comparison" className="mb-12" />
        <FadeIn>
          <div className="glass-card overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 text-gray-400 font-medium">Feature</th>
                  <th className="text-center p-5 text-white font-semibold">Basic</th>
                  <th className="text-center p-5 text-primary font-semibold">Standard</th>
                  <th className="text-center p-5 text-white font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="p-5 text-gray-300 text-sm">{row.feature}</td>
                    <td className="p-5 text-center"><CellValue value={row.basic} /></td>
                    <td className="p-5 text-center"><CellValue value={row.standard} /></td>
                    <td className="p-5 text-center"><CellValue value={row.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* FAQs */}
      <section className="section-padding max-w-4xl mx-auto mb-24">
        <SectionHeading title="Pricing FAQs" subtitle="Common Questions" className="mb-12" />
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FaqAccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
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
                Need a Custom Quote?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Every project is unique. Let's talk about your requirements and get you an accurate,
                no-obligation quote.
              </p>
              <GradientButton href="/contact" size="lg">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}