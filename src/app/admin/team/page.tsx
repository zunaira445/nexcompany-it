"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Member {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
  order: number;
}

const emptyForm = { name: "", role: "", bio: "", image: "", linkedin: "", twitter: "", github: "", order: 0 };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadMembers() {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.success) setMembers(data.members);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(m: Member) {
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio || "",
      image: m.image,
      linkedin: m.socials?.linkedin || "",
      twitter: m.socials?.twitter || "",
      github: m.socials?.github || "",
      order: m.order || 0,
    });
    setEditingId(m._id);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name || !form.role || !form.image) {
      toast.error("Name, role and image are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      image: form.image,
      order: form.order,
      socials: { linkedin: form.linkedin, twitter: form.twitter, github: form.github },
    };
    try {
      const res = await fetch(editingId ? `/api/team/${editingId}` : "/api/team", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Member updated" : "Member added");
        setShowForm(false);
        loadMembers();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this team member?")) return;
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Member removed");
      loadMembers();
    } else {
      toast.error(data.message || "Could not delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Team</h1>
          <p className="text-gray-400">Manage the members shown on your Team page.</p>
        </div>
        <button onClick={openAddForm} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <div key={m._id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <img src={m.image} alt={m.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-white font-semibold">{m.name}</h3>
                <p className="text-primary text-xs mb-3">{m.role}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEditForm(m)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(m._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {members.length === 0 && <p className="text-gray-500 col-span-full">No team members yet. Add your first one.</p>}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">{editingId ? "Edit Member" : "Add Member"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Role (e.g. Lead Developer)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <textarea placeholder="Short bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Photo URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="LinkedIn URL (optional)" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="Twitter URL (optional)" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input placeholder="GitHub URL (optional)" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <input type="number" placeholder="Display order (0 = first)" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500" />
              <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold disabled:opacity-60">
                {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}