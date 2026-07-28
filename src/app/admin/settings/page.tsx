"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Settings {
  aboutHeroTitle: string;
  aboutIntro: string;
  aboutMission: string;
  aboutVision: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  whatsappNumber: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success) setSettings(data.settings);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved");
      } else {
        toast.error(data.message || "Could not save");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return <Loader2 className="w-6 h-6 text-primary animate-spin" />;
  }

  function field(key: keyof Settings, label: string, multiline = false) {
    return (
      <div>
        <label className="block text-sm text-gray-400 mb-2">{label}</label>
        {multiline ? (
          <textarea
            rows={3}
            value={settings![key]}
            onChange={(e) => setSettings({ ...settings!, [key]: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
          />
        ) : (
          <input
            value={settings![key]}
            onChange={(e) => setSettings({ ...settings!, [key]: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-display font-bold text-white mb-1">Site Settings</h1>
      <p className="text-gray-400 mb-8">Edit the text shown on your About and Contact pages.</p>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
        <h2 className="text-lg font-semibold text-white">About Page</h2>
        {field("aboutHeroTitle", "Hero Title")}
        {field("aboutIntro", "Company Introduction", true)}
        {field("aboutMission", "Our Mission", true)}
        {field("aboutVision", "Our Vision", true)}
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
        <h2 className="text-lg font-semibold text-white">Contact Info</h2>
        {field("contactAddress", "Office Address")}
        {field("contactPhone", "Phone Number")}
        {field("contactEmail", "Email Address")}
        {field("contactHours", "Business Hours")}
        {field("whatsappNumber", "WhatsApp Number (digits only, e.g. 923001234567)")}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}