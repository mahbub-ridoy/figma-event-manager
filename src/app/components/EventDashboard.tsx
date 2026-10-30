import { ArrowLeft, Users, MessageCircle, Eye, Calendar, ExternalLink, Edit, BarChart3, TrendingUp, Clock, LogOut, Layout, Download, Search, Filter, MapPin, Building2, Award, Activity } from 'lucide-react';
import { VirtualEvent, Visitor } from '../types';
import { useState } from 'react';

interface EventDashboardProps {
  event: VirtualEvent;
  onBack: () => void;
  onEdit: () => void;
  onEditLoungeLayout: () => void;
  onPreview: () => void;
  onLogout: () => void;
}

const generateMockVisitors = (eventId: string): Visitor[] => {
  const mockNames = [
    { name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', company: 'TechCorp Inc.', location: 'San Francisco, CA' },
    { name: 'Michael Chen', email: 'm.chen@innovate.io', company: 'Innovate Solutions', location: 'New York, NY' },
    { name: 'Emily Davis', email: 'emily.d@globalventures.com', company: 'Global Ventures', location: 'London, UK' },
    { name: 'James Wilson', email: 'jwilson@startuplab.com', company: 'Startup Lab', location: 'Austin, TX' },
    { name: 'Maria Garcia', email: 'maria.g@designstudio.com', company: 'Design Studio', location: 'Barcelona, Spain' },
    { name: 'David Brown', email: 'david.b@consultech.com', company: 'ConsulTech', location: 'Seattle, WA' },
    { name: 'Lisa Anderson', email: 'l.anderson@marketpro.com', company: 'MarketPro', location: 'Chicago, IL' },
    { name: 'Robert Taylor', email: 'r.taylor@cloudnetworks.com', company: 'Cloud Networks', location: 'Boston, MA' },
    { name: 'Jennifer Martinez', email: 'j.martinez@datascience.io', company: 'DataScience Corp', location: 'Toronto, Canada' },
    { name: 'Christopher Lee', email: 'chris.lee@aiventures.com', company: 'AI Ventures', location: 'Singapore' },
  ];

  return mockNames.map((visitor, index) => ({
    id: `visitor-${eventId}-${index}`,
    name: visitor.name,
    email: visitor.email,
    company: visitor.company,
    location: visitor.location,
    joinedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.5 ? 'online' : 'offline',
    timeSpent: Math.floor(Math.random() * 120) + 10,
    pagesVisited: ['Lobby', 'Auditorium', 'Lounge', 'Booth'].filter(() => Math.random() > 0.3),
    commentsCount: Math.floor(Math.random() * 15),
    points: Math.floor(Math.random() * 500) + 50,
  }));
};

export function EventDashboard({ event, onBack, onEdit, onEditLoungeLayout, onPreview, onLogout }: EventDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');

  const visitors = event.visitors && event.visitors.length > 0 
    ? event.visitors 
    : generateMockVisitors(event.id);

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExportVisitors = () => {
    const csv = [
      ['Name', 'Email', 'Company', 'Location', 'Status', 'Joined At', 'Last Active', 'Time Spent (min)', 'Comments', 'Points'],
      ...filteredVisitors.map(v => [
        v.name,
        v.email,
        v.company || '',
        v.location || '',
        v.status,
        new Date(v.joinedAt).toLocaleString(),
        new Date(v.lastActive).toLocaleString(),
        v.timeSpent.toString(),
        v.commentsCount.toString(),
        v.points.toString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.name}-visitors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
                <p className="text-sm text-slate-500">Event Dashboard & Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onPreview}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Preview Event
              </button>
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Edit className="w-4 h-4" />
                Edit Event
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF4D4F] to-[#FF1F1F] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{visitors.length}</p>
            <p className="text-sm text-slate-500">Total Visitors</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{visitors.filter(v => v.status === 'online').length}</p>
            <p className="text-sm text-slate-500">Active Now</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5B7C8F] to-[#4A6B7C] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{visitors.reduce((sum, v) => sum + v.commentsCount, 0)}</p>
            <p className="text-sm text-slate-500">Total Comments</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {Math.round(visitors.reduce((sum, v) => sum + v.timeSpent, 0) / visitors.length)}m
            </p>
            <p className="text-sm text-slate-500">Avg. Time Spent</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Event Access Link</h3>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Share this link with attendees:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-[#10B759] font-mono bg-white px-3 py-2 rounded border border-slate-200 overflow-hidden text-ellipsis">
                  {window.location.origin}/event/{event.id}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/event/${event.id}`);
                    alert('Link copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all text-sm font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#5B7C8F]" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Last Updated</p>
                  <p className="text-xs text-slate-500">{new Date(event.stats.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-[#10B759]" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Event Status</p>
                  <p className="text-xs text-slate-500">
                    {visitors.filter(v => v.status === 'online').length > 0 ? 'Active with users online' : 'Ready to launch'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Event Visitors</h3>
              <p className="text-sm text-slate-500">{filteredVisitors.length} visitor{filteredVisitors.length !== 1 ? 's' : ''} found</p>
            </div>
            <button
              onClick={handleExportVisitors}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'online' | 'offline')}
                className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Visitor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Activity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-500">
                      No visitors found
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {visitor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{visitor.name}</p>
                            {visitor.company && (
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Building2 className="w-3 h-3" />
                                <span>{visitor.company}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-sm text-slate-900">{visitor.email}</p>
                        {visitor.location && (
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{visitor.location}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {visitor.status === 'online' ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-green-600">Online</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                              <span className="text-sm text-slate-500">Offline</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Last active: {new Date(visitor.lastActive).toLocaleTimeString()}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#5B7C8F]" />
                            <span className="text-sm text-slate-900">{visitor.timeSpent} min</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-slate-500">{visitor.pagesVisited.length} pages</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-[#5B7C8F]" />
                            <span className="text-sm text-slate-900">{visitor.commentsCount} comments</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-semibold text-[#10B759]">{visitor.points} pts</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Event Configuration</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Lobby</h4>
                  <p className="text-xs text-slate-500">{event.lobby.title}</p>
                </div>
              </div>
              <img 
                src={event.lobby.imageUrl} 
                alt={event.lobby.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Auditorium</h4>
                  <p className="text-xs text-slate-500">{event.auditorium.title}</p>
                </div>
              </div>
              <img 
                src={event.auditorium.imageUrl} 
                alt={event.auditorium.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B7C8F] to-[#4A6B7C] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Networking Lounge</h4>
                  <p className="text-xs text-slate-500">{event.lounge.title}</p>
                </div>
              </div>
              <img 
                src={event.lounge.imageUrl} 
                alt={event.lounge.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={onEditLoungeLayout}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
              >
                <Layout className="w-4 h-4" />
                Edit Layout
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Booth</h4>
                  <p className="text-xs text-slate-500">{event.booth.title}</p>
                </div>
              </div>
              <img 
                src={event.booth.imageUrl} 
                alt={event.booth.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
