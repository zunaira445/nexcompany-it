"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormData = { name: "", email: "", phone: "", subject: "", message: "" };

const defaultSettings = {
  contactAddress: "123 Tech Avenue, Suite 400, Business District, Karachi, Pakistan",
  contactPhone: "+92 300 1234567",
  contactEmail: "info@nexgenit.com",
  contactHours: "Mon – Fri: 9:00 AM – 6:00 PM",
};

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings) setSiteSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const contactInfo = [
    { icon: MapPin, label: "Our Office", value: siteSettings.contactAddress },
    { icon: Phone, label: "Phone Number", value: siteSettings.contactPhone },
    { icon: Mail, label: "Email Address", value: siteSettings.contactEmail },
    { icon: Clock, label: "Business Hours", value: siteSettings.contactHours },
  ];
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Message sent successfully!");
        setForm(initialForm);
        setErrors({});
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-7xl mx-auto mb-16">
        <SectionHeading title="Contact Us" subtitle="Get In Touch" className="mb-8" />
        <FadeIn delay={0.15}>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            Get in touch with us for your next project. Fill out the form below and our team will
            get back to you within 24 hours.
          </p>
        </FadeIn>
      </section>

      <section className="section-padding max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent-purple text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </FadeIn>

          {/* Contact Info + Map */}
          <FadeIn direction="left" delay={0.15} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="glass-card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{info.label}</div>
                  <div className="text-white font-medium">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Google Map */}
            <div className="glass-card overflow-hidden rounded-2xl">
              <iframe
                title="NexGen IT Solutions Location"
                src="https://www.google.com/maps?q=Karachi,Pakistan&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}