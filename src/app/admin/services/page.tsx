"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  features: string[];
  category: string;
  isActive: boolean;
}

const categories = ["web-development", "mobile-app", "ui-ux-design", "graphic-design", "digital-marketing"];

const emptyForm = {
  title: "",
  description: "",
  longDescription: "",
  image: "",
  features: "",
  category: categories[0],
  isActive: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) setServices(data.services);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(s: ServiceItem) {
    setForm({
      title: s.title,
      description: s.description,
      longDescription: s.longDescription || "",
      image: s.image,
      features: s.features.join(", "),
      category: s.category,
      isActive: s.isActive,
    });
    setEditingId(s._id);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.title || !form.description || !form.image) {
      toast.error("Title, description and image are required");
      return;
    }
    setSaving(true);
    const payload = { ...form, features: form.features.split(",").map((f) => f.trim()).filter(Boolean) };
    try {
      const res = await fetch(editingId ? `/api/services/${editingId}` : "/api/services", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Service updated" : "Service added");
        setShowForm(false);
        loadServices();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Service deleted");
      loadServices();
    } else {
      toast.error(data.message || "Could not delete");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Services</h1>
          <p className="text-gray-400">
            Manage the title, description, image and features shown on each service page.
          </p>
        </div>
        <button onClick={openAddForm} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s._id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <img src={s.image} alt={s.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <span className="text-xs text-primary">{s.category}</span>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openEditForm(s)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No services in the database yet. The Services pages currently show built-in content —
              add entries here (matching category to each service slug) to start managing them from here.
            </p>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">{editingId ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white">
                {categories.map((c) => <option key={c} value={c} className="bg-[#0F172A]">{c}</option>)}
              </select>
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <textarea placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <textarea placeholder="Long description (optional)" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <label className="flex items-center gap-2 text-gray-300 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active (visible on the site)
              </label>
              <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}