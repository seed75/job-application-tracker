import { useState } from 'react';
import { api } from '../api/client.js';

const STATUSES = ['wishlist', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'];

export default function CreateApplicationForm({ onCreated, onCancel }) {
  const [form, setForm]       = useState({ company: '', position: '', status: 'wishlist', notes: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const created = await api.post('/applications', form);
      onCreated(created);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-indigo-100 p-6 mb-6 shadow-sm"
      data-testid="create-application-form"
    >
      <h2 className="font-semibold text-gray-900 mb-4">New Application</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
          <p className="text-red-600 text-sm" data-testid="create-error">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={set('company')}
            placeholder="Acme Corp"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            data-testid="input-company"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">Position</label>
          <input
            type="text"
            value={form.position}
            onChange={set('position')}
            placeholder="Software Engineer"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            data-testid="input-position"
            required
          />
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <label className="block text-xs font-medium text-gray-600">Status</label>
        <select
          value={form.status}
          onChange={set('status')}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
          data-testid="input-status"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="space-y-1 mb-5">
        <label className="block text-xs font-medium text-gray-600">Notes</label>
        <textarea
          value={form.notes}
          onChange={set('notes')}
          placeholder="Optional notes..."
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          rows={2}
          data-testid="input-notes"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50 shadow-sm"
          data-testid="submit-create"
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          data-testid="cancel-create"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
