'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Lock, Users, Mail, CalendarCheck, BarChart3 } from 'lucide-react';

interface AdminData {
  stats: { waitlist: number; contacts: number; demos: number };
  waitlist: Array<{ _id: string; name: string; businessName: string; industry: string; email: string; phone: string; createdAt: string }>;
  contacts: Array<{ _id: string; name: string; email: string; company: string; message: string; createdAt: string }>;
  demos: Array<{ _id: string; name: string; email: string; company: string; date: string; time: string; createdAt: string }>;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'waitlist' | 'contacts' | 'demos'>('waitlist');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (!res.ok) {
        throw new Error('Invalid password');
      }

      const result = await res.json();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="card-metric max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <Lock className="w-10 h-10 mx-auto mb-4 text-[var(--color-accent-glow)]" />
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Admin Dashboard</h1>
            <p className="text-sm text-[var(--color-text-muted)]">Enter your admin password to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="input-glass"
            />
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              <span className="flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'waitlist' as const, label: 'Waitlist', icon: Users, count: data.stats.waitlist },
    { key: 'contacts' as const, label: 'Contacts', icon: Mail, count: data.stats.contacts },
    { key: 'demos' as const, label: 'Demo Bookings', icon: CalendarCheck, count: data.stats.demos },
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="section-container section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[var(--color-accent-glow)]" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">OUTRICATE Submissions Overview</p>
          </div>
          <button onClick={() => setData(null)} className="btn-secondary !py-2 !px-4 !text-sm">
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => (
            <div key={tab.key} className="card-metric !p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/15 flex items-center justify-center">
                <tab.icon className="w-5 h-5 text-[var(--color-accent-glow)]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">{tab.count}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{tab.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/[0.06] pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-glow)] border border-[var(--color-accent-primary)]/25'
                  : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card-metric !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === 'waitlist' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Name', 'Business', 'Industry', 'Email', 'Phone', 'Date'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.waitlist.map((entry) => (
                    <motion.tr key={entry._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sm text-white">{entry.name}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.businessName}</td>
                      <td className="px-4 py-3 text-sm"><span className="badge !py-0.5 !px-2 !text-xs">{entry.industry}</span></td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.phone}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{new Date(entry.createdAt).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'contacts' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Name', 'Email', 'Company', 'Message', 'Date'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.contacts.map((entry) => (
                    <motion.tr key={entry._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sm text-white">{entry.name}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.company}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)] max-w-xs truncate">{entry.message}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{new Date(entry.createdAt).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'demos' && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Name', 'Email', 'Company', 'Date', 'Time', 'Submitted'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.demos.map((entry) => (
                    <motion.tr key={entry._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sm text-white">{entry.name}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.email}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.company}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-accent-glow)]">{entry.date}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">{entry.time}</td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{new Date(entry.createdAt).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty state */}
            {((activeTab === 'waitlist' && data.waitlist.length === 0) ||
              (activeTab === 'contacts' && data.contacts.length === 0) ||
              (activeTab === 'demos' && data.demos.length === 0)) && (
              <div className="text-center py-12 text-[var(--color-text-muted)]">
                No entries yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
