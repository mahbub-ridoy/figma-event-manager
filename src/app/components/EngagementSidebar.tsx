import { X, FileText, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface EngagementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Attendee {
  name: string;
  role: string;
  online: boolean;
}

const attendees: Attendee[] = [
  { name: 'Md Rayhan', role: 'Product Manager', online: true },
  { name: 'Salman Khan', role: 'UX Designer', online: true },
  { name: 'Sarah Johnson', role: 'Developer', online: true },
  { name: 'Michael Chen', role: 'Marketing Director', online: false },
  { name: 'Emily Davis', role: 'Sales Executive', online: true },
  { name: 'James Wilson', role: 'CTO', online: true },
];

const polls = [
  {
    id: 1,
    question: 'What topic interests you most?',
    options: [
      { text: 'AI & Machine Learning', votes: 45 },
      { text: 'Cloud Computing', votes: 32 },
      { text: 'Cybersecurity', votes: 28 },
    ],
  },
];

const news = [
  { id: 1, title: 'Welcome to Virtual Event 2026', time: '2h ago' },
  { id: 2, title: 'Keynote starts in 30 minutes', time: '1h ago' },
  { id: 3, title: 'New exhibitor booth opened', time: '45m ago' },
];

const documents = [
  { id: 1, name: 'Event Schedule.pdf', size: '2.4 MB' },
  { id: 2, name: 'Speaker Bios.pdf', size: '1.8 MB' },
  { id: 3, name: 'Exhibitor Directory.pdf', size: '3.2 MB' },
];

export function EngagementSidebar({ isOpen, onClose }: EngagementSidebarProps) {
  const [activeTab, setActiveTab] = useState<'polls' | 'news' | 'documents' | 'attendees'>('polls');

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[400px] transform bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="font-['Inter'] text-xl font-bold text-[#5B7C8F]">Engagement</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('polls')}
              className={`flex-1 px-4 py-3 font-['Inter'] text-sm font-medium transition-colors ${
                activeTab === 'polls'
                  ? 'border-b-2 border-[#10B759] text-[#10B759]'
                  : 'text-[#64748b] hover:text-[#5B7C8F]'
              }`}
            >
              <BarChart3 className="mx-auto mb-1 h-4 w-4" />
              Polls
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 px-4 py-3 font-['Inter'] text-sm font-medium transition-colors ${
                activeTab === 'news'
                  ? 'border-b-2 border-[#10B759] text-[#10B759]'
                  : 'text-[#64748b] hover:text-[#5B7C8F]'
              }`}
            >
              <TrendingUp className="mx-auto mb-1 h-4 w-4" />
              News
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 px-4 py-3 font-['Inter'] text-sm font-medium transition-colors ${
                activeTab === 'documents'
                  ? 'border-b-2 border-[#10B759] text-[#10B759]'
                  : 'text-[#64748b] hover:text-[#5B7C8F]'
              }`}
            >
              <FileText className="mx-auto mb-1 h-4 w-4" />
              Docs
            </button>
            <button
              onClick={() => setActiveTab('attendees')}
              className={`flex-1 px-4 py-3 font-['Inter'] text-sm font-medium transition-colors ${
                activeTab === 'attendees'
                  ? 'border-b-2 border-[#10B759] text-[#10B759]'
                  : 'text-[#64748b] hover:text-[#5B7C8F]'
              }`}
            >
              <Users className="mx-auto mb-1 h-4 w-4" />
              People
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'polls' && (
              <div className="space-y-6">
                {polls.map((poll) => (
                  <div key={poll.id} className="rounded-lg bg-slate-50 p-4">
                    <h3 className="font-['Inter'] text-sm font-semibold text-[#334155]">
                      {poll.question}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {poll.options.map((option, idx) => {
                        const total = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                        const percentage = Math.round((option.votes / total) * 100);
                        return (
                          <div key={idx}>
                            <div className="mb-1 flex justify-between font-['Inter'] text-xs text-[#64748b]">
                              <span>{option.text}</span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-[#10B759]"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-3">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
                  >
                    <h3 className="font-['Inter'] text-sm font-medium text-[#334155]">{item.title}</h3>
                    <p className="mt-1 font-['Inter'] text-xs text-[#64748b]">{item.time}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
                  >
                    <FileText className="h-8 w-8 text-[#10B759]" />
                    <div className="flex-1">
                      <h3 className="font-['Inter'] text-sm font-medium text-[#334155]">{doc.name}</h3>
                      <p className="font-['Inter'] text-xs text-[#64748b]">{doc.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'attendees' && (
              <div className="space-y-3">
                {attendees.map((attendee, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7F0] font-['Inter'] text-sm font-semibold text-[#5B7C8F]">
                        {attendee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {attendee.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#10B759]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Inter'] text-sm font-medium text-[#334155]">{attendee.name}</h3>
                      <p className="font-['Inter'] text-xs text-[#64748b]">{attendee.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}