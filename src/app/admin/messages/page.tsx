"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        if (data.success) setMessages(data.messages);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-white mb-1">Messages</h1>
      <p className="text-gray-400 mb-8">Inquiries submitted through your Contact form.</p>

      {loading ? (
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {messages.map((m) => (
              <button
                key={m._id}
                onClick={() => setSelected(m)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selected?._id === m._id ? "bg-primary/10 border-primary/30" : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{m.name}</span>
                  <span className="text-gray-500 text-xs">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-xs truncate">{m.subject}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-1">{selected.subject}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-primary" /> {selected.email}
                  </span>
                  {selected.phone && (
                    <span className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-primary" /> {selected.phone}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                <a
                  href={`mailto:${selected.email}?subject=RE: ${selected.subject}`}
                  className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white text-sm font-medium"
                >
                  Reply via Email
                </a>
              </div>
            ) : (
              <p className="text-gray-500">Select a message to view it.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}