import { useState } from 'react';
import { Clock, Calendar, MapPin, Users, Play, VideoIcon, Home, MessageCircle, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getDarkerShade } from '../utils/colorUtils';

interface Session {
  id: string;
  time: string;
  endTime: string;
  date: string;
  duration: string;
  timezone: string;
  localTime: string;
  speakers: {
    name: string;
    title: string;
    company: string;
    imageUrl: string;
  }[];
  topic: string;
  description: string;
  location: string;
  capacity: string;
  tags: string[];
}

interface SessionsProps {
  onNavigate: (page: string) => void;
  customization?: {
    brandColor?: string;
    secondaryColor?: string;
    announcementText?: string;
  };
}

export function Sessions({ onNavigate, customization }: SessionsProps) {
  const brandColor = customization?.brandColor || '#10B759';
  const darkerBrandColor = getDarkerShade(brandColor);
  const evenDarkerBrandColor = getDarkerShade(darkerBrandColor);

  const sessions: Session[] = [
    {
      id: '1',
      time: '10:00 am',
      endTime: '10:55 am',
      date: 'Feb 10, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '09:00 PM - 09:55 PM',
      speakers: [
        {
          name: 'Mark Vickers',
          title: 'Talent Acquisition Leader',
          company: 'HR.com',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
        },
        {
          name: 'Mike Wood',
          title: 'Recruitment Strategist',
          company: 'HR.com',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        }
      ],
      topic: 'Rethinking Talent Acquisition in an Age of Accelerating AI',
      description: 'Talent acquisition leaders are operating in an environment defined by uncertainty, rising organizational expectations, and accelerating technology change. Hiring volumes fluctuate, skills gaps persist, and artificial intelligence is reshaping nearly every stage of the recruiting lifecycle.',
      location: 'Main Auditorium',
      capacity: '500 attendees',
      tags: ['AI', 'Talent', 'HR']
    },
    {
      id: '2',
      time: '11:00 am',
      endTime: '11:55 am',
      date: 'Feb 10, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '10:00 PM - 10:55 PM',
      speakers: [
        {
          name: 'Sarah Johnson',
          title: 'Director of Recruitment',
          company: 'TalentCore',
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
        }
      ],
      topic: 'Future-Proof Recruitment: 4 Trends for 2026 & the Software to Power Your Talent Strategy',
      description: 'Explore the latest trends reshaping recruitment in 2026 and discover the cutting-edge software tools that will help you stay ahead of the competition and build winning talent strategies.',
      location: 'Innovation Hub',
      capacity: '300 attendees',
      tags: ['Software', 'Strategy', 'Trends']
    },
    {
      id: '3',
      time: '12:00 pm',
      endTime: '12:55 pm',
      date: 'Feb 10, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '11:00 PM - 11:55 PM',
      speakers: [
        {
          name: 'David Chen',
          title: 'Chief HR Officer',
          company: 'FutureCorp',
          imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop'
        }
      ],
      topic: 'The Future is Human©: Human Skills in the Age of AI',
      description: 'As artificial intelligence continues to transform the workplace, human skills become more critical than ever. Learn how to develop and nurture essential human capabilities in your workforce.',
      location: 'Creative Studio',
      capacity: '250 attendees',
      tags: ['Human Skills', 'AI', 'Leadership']
    },
    {
      id: '4',
      time: '1:00 pm',
      endTime: '1:55 pm',
      date: 'Feb 10, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '12:00 AM - 12:55 AM',
      speakers: [
        {
          name: 'Jennifer Park',
          title: 'VP of Talent Development',
          company: 'Global Brands Ltd.',
          imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop'
        }
      ],
      topic: 'Building a Culture of Continuous Learning',
      description: 'Discover proven strategies for creating a learning culture that drives employee engagement, innovation, and organizational success in the modern workplace.',
      location: 'Tech Theater',
      capacity: '400 attendees',
      tags: ['Learning', 'Culture', 'Development']
    },
    {
      id: '5',
      time: '9:00 am',
      endTime: '9:55 am',
      date: 'Feb 11, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '08:00 PM - 08:55 PM',
      speakers: [
        {
          name: 'Lisa Anderson',
          title: 'Chief Innovation Officer',
          company: 'Future Labs',
          imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop'
        }
      ],
      topic: 'Innovation in the Age of Digital Transformation',
      description: 'How leading organizations are fostering innovation cultures and leveraging emerging technologies to stay ahead of the competition.',
      location: 'Main Auditorium',
      capacity: '500 attendees',
      tags: ['Innovation', 'Digital', 'Leadership']
    },
    {
      id: '6',
      time: '11:00 am',
      endTime: '11:55 am',
      date: 'Feb 11, 2026',
      duration: '55 min',
      timezone: 'ET',
      localTime: '10:00 PM - 10:55 PM',
      speakers: [
        {
          name: 'Robert Kim',
          title: 'Head of Data Science',
          company: 'Analytics Pro',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        }
      ],
      topic: 'Data-Driven Decision Making in Modern Business',
      description: 'Unlock the power of data analytics to make smarter business decisions and drive measurable results across your organization.',
      location: 'Analytics Lab',
      capacity: '350 attendees',
      tags: ['Data', 'Analytics', 'Business']
    }
  ];

  const [selectedDate, setSelectedDate] = useState('Feb 10, 2026');
  const [selectedSession, setSelectedSession] = useState<Session>(sessions[0]);

  // Get unique dates
  const dates = Array.from(new Set(sessions.map(s => s.date)));

  // Filter sessions by selected date
  const filteredSessions = sessions.filter(s => selectedDate === 'All' || s.date === selectedDate);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Compact Navigation Bar - Very Top */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Left Side - Navigation Buttons */}
            <div className="flex items-center gap-3">
              {/* Lobby */}
              <button
                onClick={() => onNavigate('lobby')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = brandColor;
                  e.currentTarget.style.backgroundColor = brandColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <Home className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Lobby</span>
              </button>

              {/* Auditorium */}
              <button
                onClick={() => onNavigate('auditorium')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = brandColor;
                  e.currentTarget.style.backgroundColor = brandColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <Play className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Auditorium</span>
              </button>

              {/* Lounge */}
              <button
                onClick={() => onNavigate('lounge')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = brandColor;
                  e.currentTarget.style.backgroundColor = brandColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <Users className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Lounge</span>
              </button>

              {/* Sessions - Current */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md"
                style={{ backgroundColor: brandColor }}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Sessions</span>
              </button>

              {/* Booth */}
              <button
                onClick={() => onNavigate('booth-marketplace')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = brandColor;
                  e.currentTarget.style.backgroundColor = brandColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.backgroundColor = '';
                }}
              >
                <Store className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Booths</span>
              </button>
            </div>

            {/* Right Side - Live Update Scrolling Notification */}
            <div 
              className="flex-1 flex items-center rounded-lg overflow-hidden max-w-2xl"
              style={{ background: `linear-gradient(to right, ${brandColor}, ${darkerBrandColor})` }}
            >
              <div 
                className="flex-shrink-0 px-4 py-2 flex items-center gap-2 border-r border-white/20"
                style={{ background: `linear-gradient(to right, ${darkerBrandColor}, ${evenDarkerBrandColor})` }}
              >
                <MessageCircle className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white font-semibold text-sm whitespace-nowrap">LIVE UPDATE</span>
              </div>
              <div className="flex-1 relative overflow-hidden py-2">
                <div className="absolute inset-0 flex items-center">
                  <div 
                    className="flex whitespace-nowrap"
                    style={{
                      animation: 'scroll-notification 15s linear infinite',
                    }}
                  >
                    <span className="text-white text-sm font-medium px-4">
                      {customization?.announcementText || 'Welcome to our virtual event! 🎉'}  •  {customization?.announcementText || 'Welcome to our virtual event! 🎉'}  •  {customization?.announcementText || 'Welcome to our virtual event! 🎉'}  •  {customization?.announcementText || 'Welcome to our virtual event! 🎉'}  •  {customization?.announcementText || 'Welcome to our virtual event! 🎉'}  •  {customization?.announcementText || 'Welcome to our virtual event! 🎉'}
                    </span>
                  </div>
                </div>
              </div>
              <style>{`
                @keyframes scroll-notification {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-1 px-8 py-3">
          <button
            onClick={() => setSelectedDate(dates[0])}
            className={`px-6 py-3 font-semibold text-sm transition-all relative ${
              selectedDate === dates[0]
                ? 'text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            style={selectedDate === dates[0] ? {
              background: `linear-gradient(135deg, ${brandColor} 0%, ${darkerBrandColor} 100%)`,
              borderRadius: '4px'
            } : {}}
          >
            {dates[0]}
          </button>
          <button
            onClick={() => setSelectedDate('All')}
            className={`px-6 py-3 font-semibold text-sm transition-all ${
              selectedDate === 'All'
                ? 'text-slate-900 border-b-2'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            style={selectedDate === 'All' ? { borderBottomColor: brandColor } : {}}
          >
            All
          </button>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Session List */}
        <div className="w-[45%] border-r border-slate-200 overflow-y-auto">
          <div className="p-6 space-y-3">
            {filteredSessions.map((session) => {
              const isSelected = selectedSession.id === session.id;
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    isSelected 
                      ? 'border-transparent shadow-lg' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={isSelected ? {
                    background: `linear-gradient(135deg, ${brandColor}10 0%, ${darkerBrandColor}10 100%)`,
                    borderColor: brandColor
                  } : {}}
                >
                  {/* Time */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: isSelected ? brandColor : '#10B759' }}
                    >
                      {session.time} - {session.endTime}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {session.timezone}
                    </span>
                    <span className="text-xs text-slate-400">
                      (local time: <span style={{ color: '#DC2626' }}>{session.localTime}</span>)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 mb-2 leading-tight">
                    {session.topic}
                  </h3>

                  {/* Edit Icon */}
                  <div className="flex justify-end">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400">
                        <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.6667L3.33301 11.3334L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Session Details */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Session Header */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span 
                  className="text-2xl font-bold"
                  style={{ color: brandColor }}
                >
                  {selectedSession.date}
                </span>
                <span 
                  className="text-xl font-bold"
                  style={{ color: brandColor }}
                >
                  {selectedSession.time} - {selectedSession.endTime}
                </span>
                <span className="text-sm text-slate-600 font-semibold">
                  {selectedSession.timezone}
                </span>
                <span className="text-sm text-slate-400">
                  (local time: <span style={{ color: '#DC2626' }}>{selectedSession.localTime}</span>)
                </span>
              </div>

              <div 
                className="inline-block px-3 py-1 mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${brandColor} 0%, ${darkerBrandColor} 100%)`,
                  borderRadius: '4px',
                  borderLeft: `4px solid ${brandColor}`
                }}
              >
                <h1 className="text-2xl font-bold text-white leading-tight">
                  {selectedSession.topic}
                </h1>
              </div>
            </div>

            {/* Action Button */}
            <div className="mb-6">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800 transition-all"
                style={{ borderRadius: '4px' }}
              >
                <VideoIcon className="w-4 h-4" />
                Attend Webcast
              </button>
            </div>

            {/* Presenters */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Presenters:</h3>
              <div className="space-y-2">
                {selectedSession.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ImageWithFallback
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p 
                        className="font-semibold"
                        style={{ color: brandColor }}
                      >
                        {speaker.name} ({speaker.company})
                      </p>
                      <p className="text-sm text-slate-600">{speaker.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-slate-700 leading-relaxed">
                {selectedSession.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" style={{ color: brandColor }} />
                <span>{selectedSession.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="w-4 h-4" style={{ color: brandColor }} />
                <span>{selectedSession.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" style={{ color: brandColor }} />
                <span>{selectedSession.duration}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedSession.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${brandColor}20`,
                    color: brandColor
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
