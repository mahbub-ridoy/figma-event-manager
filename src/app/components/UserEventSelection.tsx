import { Calendar, Users, ExternalLink, LogOut } from 'lucide-react';
import { VirtualEvent } from '../types';

interface UserEventSelectionProps {
  events: VirtualEvent[];
  onSelectEvent: (eventId: string) => void;
  onLogout: () => void;
  username: string;
}

export function UserEventSelection({ events, onSelectEvent, onLogout, username }: UserEventSelectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#10B759] to-[#5B7C8F] bg-clip-text text-transparent">
              mypeople Events
            </h1>
            <p className="text-slate-600 text-sm mt-1">Welcome, {username}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Available Events</h2>
          <p className="text-slate-600">Select an event to join and start networking</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Events Available</h3>
            <p className="text-slate-600">There are no events scheduled at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
              >
                {/* Event Card Content */}
                <div className="p-6">
                  {/* Event Logo & Name */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={event.customization?.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.name)}&background=10B759&color=fff&size=128&bold=true`}
                        alt="Event Logo"
                        className="w-16 h-16 object-contain rounded-lg bg-white p-2 border border-slate-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#10B759] transition-colors leading-tight">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Description */}
                  {event.customization?.eventDescription && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {event.customization.eventDescription}
                      </p>
                    </div>
                  )}

                  {/* Event Stats & Host */}
                  <div className="mb-4 pb-4 border-b border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-[#10B759]" />
                        <span className="font-semibold">{event.stats.totalVisitors}</span>
                        <span className="text-slate-500">attendees</span>
                      </div>
                      {event.customization?.organizerName && (
                        <div className="text-xs text-slate-500">
                          by <span className="font-medium text-slate-700">{event.customization.organizerName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sponsor Logos */}
                  <div className="mb-4 pb-4 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Sponsors</p>
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                        title="Google"
                      />
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Amazon"
                        className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                        title="Amazon"
                      />
                    </div>
                  </div>

                  {/* Enter Event Button */}
                  <button
                    onClick={() => onSelectEvent(event.id)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                    style={{ borderRadius: '4px' }}
                  >
                    <span>Enter Event</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Event Link */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate font-mono">{event.link}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}