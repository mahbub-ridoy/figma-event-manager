import { Plus, Calendar, Users, Eye, Edit, Trash2, LogOut, BarChart3 } from 'lucide-react';
import { VirtualEvent } from '../types';

interface AdminDashboardProps {
  events: VirtualEvent[];
  onCreateEvent: () => void;
  onEditEvent: (eventId: string) => void;
  onViewEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onPreview: (eventId: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ 
  events, 
  onCreateEvent, 
  onEditEvent, 
  onViewEvent, 
  onDeleteEvent,
  onPreview,
  onLogout 
}: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">mypeople Admin</h1>
              <p className="text-xs text-slate-500">Virtual Event Management</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{events.length}</span>
            </div>
            <p className="text-sm opacity-90">Total Events</p>
          </div>

          <div className="bg-gradient-to-br from-[#5B7C8F] to-[#4A6B7C] rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">
                {events.reduce((sum, e) => sum + e.stats.totalVisitors, 0)}
              </span>
            </div>
            <p className="text-sm opacity-90">Total Visitors</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">
                {events.filter(e => e.stats.activeUsers > 0).length}
              </span>
            </div>
            <p className="text-sm opacity-90">Active Events</p>
          </div>
        </div>

        {/* Create New Event Button */}
        <div className="mb-6">
          <button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Create New Event
          </button>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Virtual Events</h2>
            <p className="text-sm text-slate-500">Manage and monitor your virtual events</p>
          </div>

          {events.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No events yet</h3>
              <p className="text-slate-500 mb-6">Create your first virtual event to get started</p>
              <button
                onClick={onCreateEvent}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {events.map((event) => (
                <div key={event.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{event.name}</h3>
                        {event.stats.activeUsers > 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Live
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Created {new Date(event.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.stats.totalVisitors} visitors
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {event.stats.activeUsers} active
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewEvent(event.id)}
                        className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => onPreview(event.id)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => onEditEvent(event.id)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${event.name}"?`)) {
                            onDeleteEvent(event.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}