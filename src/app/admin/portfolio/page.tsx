"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  featured: boolean;
}

const emptyForm = {
  title: "",
  description: "",
  image: "",
  technologies: "",
  category: "Web Development",
  link: "",
  featured: false,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.success) setProjects(data.projects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(p: Project) {
    setForm({
      title: p.title,
      description: p.description,
      image: p.image,
      technologies: p.technologies.join(", "),
      category: p.category,
      link: p.link || "",
      featured: p.featured,
    });
    setEditingId(p._id);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.title || !form.description || !form.image) {
      toast.error("Title, description and image are required");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(editingId ? `/api/portfolio/${editingId}` : "/api/portfolio", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Project updated" : "Project added");
        setShowForm(false);
        loadProjects();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Project deleted");
      loadProjects();
    } else {
      toast.error(data.message || "Could not delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Portfolio</h1>
          <p className="text-gray-400">Manage the projects shown on your Portfolio page.</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {loading ? (
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <span className="text-xs text-primary">{p.category}</span>
                <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(p)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500 col-span-full">No projects yet. Add your first one.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">{editingId ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white">
                {["Web Development", "Mobile Apps", "UI/UX Design", "Graphic Design", "Digital Marketing"].map((c) => (
                  <option key={c} value={c} className="bg-[#0F172A]">{c}</option>
                ))}
              </select>
              <input placeholder="Project link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <label className="flex items-center gap-2 text-gray-300 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured project
              </label>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}