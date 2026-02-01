'use client';

// ============================================================
// ADMIN DASHBOARD HOME
// Command Center Overview - Uses API to bypass RLS
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-purple-100 text-purple-700',
    checked_in: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-gray-100 text-gray-600',
    scheduled: 'bg-blue-100 text-blue-700',
    booked: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
    no_show: 'bg-red-100 text-red-700',
  };

  const labels: Record<string, string> = {
    completed: '✓ Completed',
    in_progress: 'In Progress',
    checked_in: 'Checked In',
    confirmed: 'Confirmed',
    scheduled: 'Scheduled',
    booked: 'Booked',
    cancelled: 'Cancelled',
    no_show: 'No Show',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {labels[status] || status}
    </span>
  );
}

// Skeleton loading component
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

interface DashboardStats {
  todayAppointments: number;
  totalClients: number;
  totalAppointments: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
}

interface UpcomingAppointment {
  id: string;
  time: string;
  status: string;
  client_name: string;
  service: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Format time from ISO string
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Fetch dashboard data via API
  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        setStats(data.stats);
        setUpcomingAppointments(data.upcomingAppointments || []);
        
        if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">{today}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/appointments/new"
            className="px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors"
          >
            + New Appointment
          </Link>
          <Link
            href="/pos"
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
          >
            Open POS
          </Link>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Today's Appointments</p>
          {loading ? (
            <Skeleton className="w-16 h-8" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{stats?.todayAppointments || 0}</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Today's Revenue</p>
          {loading ? (
            <Skeleton className="w-24 h-8" />
          ) : (
            <p className="text-3xl font-bold text-green-600">
              ${(stats?.todayRevenue || 0).toLocaleString()}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">This Week</p>
          {loading ? (
            <Skeleton className="w-24 h-8" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              ${(stats?.weekRevenue || 0).toLocaleString()}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">This Month</p>
          {loading ? (
            <Skeleton className="w-24 h-8" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              ${(stats?.monthRevenue || 0).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Total Clients</p>
          {loading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {(stats?.totalClients || 0).toLocaleString()}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Total Appointments</p>
          {loading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {(stats?.totalAppointments || 0).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Upcoming Appointments</h2>
          <Link href="/admin/calendar" className="text-sm text-pink-600 hover:text-pink-700">
            View Calendar →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-32 h-4" />
                </div>
                <Skeleton className="w-20 h-6 rounded-full" />
              </div>
            ))
          ) : upcomingAppointments.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-500">
              No upcoming appointments
            </div>
          ) : (
            upcomingAppointments.map((apt) => (
              <div key={apt.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900 w-20">
                    {formatTime(apt.time)}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{apt.client_name}</p>
                    <p className="text-sm text-gray-500">{apt.service}</p>
                  </div>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/clients"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">👥</span>
          <p className="font-medium text-gray-900 mt-2">View Clients</p>
          <p className="text-sm text-gray-500">{(stats?.totalClients || 0).toLocaleString()} clients</p>
        </Link>

        <Link
          href="/admin/services"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">✨</span>
          <p className="font-medium text-gray-900 mt-2">Services</p>
          <p className="text-sm text-gray-500">Manage service menu</p>
        </Link>

        <Link
          href="/admin/reports"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">📈</span>
          <p className="font-medium text-gray-900 mt-2">Reports</p>
          <p className="text-sm text-gray-500">View analytics</p>
        </Link>

        <Link
          href="/admin/consents"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:shadow-md transition-all"
        >
          <span className="text-2xl">📝</span>
          <p className="font-medium text-gray-900 mt-2">Consents</p>
          <p className="text-sm text-gray-500">Manage forms</p>
        </Link>
      </div>
    </div>
  );
}
