import { useState, useEffect } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import CreateApplicationForm from '../components/CreateApplicationForm.jsx';

const DEMO_APPS = [
  { id: 1, company: 'Google',    position: 'Software Engineer',      status: 'interview',  created_at: '2025-02-10' },
  { id: 2, company: 'Apple',     position: 'Frontend Developer',     status: 'applied',    created_at: '2025-02-08' },
  { id: 3, company: 'Stripe',    position: 'Full Stack Engineer',    status: 'offer',      created_at: '2025-01-28' },
  { id: 4, company: 'Meta',      position: 'React Developer',        status: 'screening',  created_at: '2025-02-05' },
  { id: 5, company: 'Netflix',   position: 'UI Engineer',            status: 'rejected',   created_at: '2025-01-20' },
  { id: 6, company: 'Airbnb',    position: 'Product Engineer',       status: 'wishlist',   created_at: '2025-01-15' },
];

const STATUS_LABELS = {
  wishlist:  'Wishlist',
  applied:   'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer:     'Offer',
  rejected:  'Rejected',
  withdrawn: 'Withdrawn',
};

const STATUS_COLORS = {
  wishlist:  'bg-gray-100 text-gray-600',
  applied:   'bg-blue-100 text-blue-700',
  screening: 'bg-yellow-100 text-yellow-700',
  interview: 'bg-orange-100 text-orange-700',
  offer:     'bg-green-100 text-green-700',
  rejected:  'bg-red-100 text-red-600',
  withdrawn: 'bg-gray-100 text-gray-500',
};

export default function ApplicationsPage() {
  const [apps, setApps]           = useState([]);
  const [statusFilter, setFilter] = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [error, setError]         = useState('');
  const { logout, isGuest } = useAuth();

  useEffect(() => {
    if (isGuest) {
      const filtered = statusFilter
        ? DEMO_APPS.filter(a => a.status === statusFilter)
        : DEMO_APPS;
      setApps(filtered);
      return;
    }
    const query = statusFilter ? `?status=${statusFilter}` : '';
    api.get(`/applications${query}`)
      .then(setApps)
      .catch(err => setError(err.message));
  }, [statusFilter, isGuest]);

  async function handleStatusChange(id, status) {
    if (isGuest) return;
    try {
      const updated = await api.patch(`/applications/${id}`, { status });
      setApps(prev => prev.map(a => a.id === id ? updated : a));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (isGuest) return;
    try {
      await api.del(`/applications/${id}`);
      setApps(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCreated(newApp) {
    setApps(prev => [newApp, ...prev]);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="applications-page">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900 text-sm">Job Application Tracker</span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
            data-testid="logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Guest banner */}
        {isGuest && (
          <div className="mb-6 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
            <p className="text-sm text-indigo-700">
              You are viewing a <strong>guest demo</strong> with sample data. Sign in to manage your own applications.
            </p>
            <button
              onClick={logout}
              className="ml-4 shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-800 underline transition"
            >
              Sign in
            </button>
          </div>
        )}

        {/* Page title + actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Applications</h1>
            <p className="text-sm text-gray-400 mt-0.5">{apps.length} total</p>
          </div>
          {!isGuest && (
            <button
              onClick={() => setShowForm(v => !v)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              data-testid="open-create-form"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {showForm ? 'Cancel' : 'New'}
            </button>
          )}
        </div>

        {/* Create form */}
        {showForm && (
          <CreateApplicationForm onCreated={handleCreated} onCancel={() => setShowForm(false)} />
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-red-600 text-sm" data-testid="list-error">{error}</p>
          </div>
        )}

        {/* Filter */}
        <div className="mb-4">
          <select
            value={statusFilter}
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            data-testid="status-filter"
          >
            <option value="">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>

        {/* List */}
        <ul className="space-y-3" data-testid="applications-list">
          {apps.length === 0 && (
            <li className="text-center py-16 text-gray-400 text-sm" data-testid="empty-state">
              No applications yet. Add your first one!
            </li>
          )}
          {apps.map(app => (
            <li
              key={app.id}
              className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
              data-testid="application-item"
            >
              <div>
                <p className="font-semibold text-gray-900" data-testid="app-company">{app.company}</p>
                <p className="text-sm text-gray-400 mt-0.5" data-testid="app-position">{app.position}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={app.status}
                  onChange={e => handleStatusChange(app.id, e.target.value)}
                  disabled={isGuest}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${isGuest ? 'cursor-default opacity-80' : 'cursor-pointer'} ${STATUS_COLORS[app.status]}`}
                  data-testid="status-select"
                >
                  {Object.keys(STATUS_LABELS).map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
                {!isGuest && (
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-gray-300 hover:text-red-400 transition"
                    data-testid="delete-application"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 011-1h4a1 1 0 011 1m-7 0H5" />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
