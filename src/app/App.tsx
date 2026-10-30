import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { EngagementSidebar } from './components/EngagementSidebar';
import { SetupWizard } from './components/SetupWizard';
import { SelectedLobby } from './components/SelectedLobby';
import { SelectedAuditorium } from './components/SelectedAuditorium';
import { SelectedLounge } from './components/SelectedLounge';
import { Sessions } from './components/Sessions';
import { SelectedBooth } from './components/SelectedBooth';
import { BoothMarketplaceGrid } from './components/BoothMarketplaceGrid';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { EventDashboard } from './components/EventDashboard';
import { UserEventSelection } from './components/UserEventSelection';
import { LiveChatButton } from './components/LiveChatButton';
import { LoungeEditor } from './components/LoungeEditor';
import { UserProvider } from './contexts/UserContext';
import { UserProfileModal } from './components/UserProfileModal';
import { ActivityDashboard } from './components/ActivityDashboard';
import { BingoCard } from './components/BingoCard';
import { VirtualPhotoBooth } from './components/VirtualPhotoBooth';
import { VirtualEvent, User } from './types';
import auditorium1Image from 'figma:asset/bde8cf6d98ac6383b20409d99b5c06ceb58e5fb1.png';
import auditorium2Image from 'figma:asset/2031110debc3ec6f41ce22beb75db4eadb35019a.png';
import auditorium3Image from 'figma:asset/59cb1dad2aa5b5b70dc227985251b5d6cc3c4abb.png';
import auditorium4Image from 'figma:asset/49a8f4f572d1a63625c142070dc5899fb94c8bd2.png';
import auditorium5Image from 'figma:asset/e8af96365585ab22a28f504ae24ad9dd7d07f08a.png';
import auditorium6Image from 'figma:asset/481b09277c3d93631ea227112c8e620579d604c3.png';
import lobby1Image from 'figma:asset/8098b94ae9c6256d0724b44c64e952ddb650eebd.png';
import lobby2Image from 'figma:asset/bd2dbe0ab64c05bf70a425381088ea79bda99465.png';
import lobby3Image from 'figma:asset/63d328764545753e359c7915bfdc295ab90ca0b2.png';
import lobby4Image from 'figma:asset/6575708f8922074f0d598dfe9bd7d0fbd437760d.png';
import lobby5Image from 'figma:asset/db0b6a204d12cebc8cfed4b442654d4b1602b430.png';
import lobby6Image from 'figma:asset/9aac321c7f65c5f50b15e29a572916eefb222dc8.png';
import booth1Image from 'figma:asset/a43bc29e4bc500b95df98889fabeac4267654eef.png';
import booth2Image from 'figma:asset/1732dfa051a8bfe6a6715eb0a0ef4bde7e5cd629.png';
import booth3Image from 'figma:asset/c2da6ff143aec92c33f821de6bf87b174c20fe8d.png';
import booth4Image from 'figma:asset/6e3ff5547baad4d3a42e172f1e19c983c82e1cc9.png';
import booth5Image from 'figma:asset/47a9e556804e32615685ca74d063a5704e956e32.png';
import booth6Image from 'figma:asset/5551db020f9658b541a833b42a1334a5dbb86397.png';
import lounge1Image from 'figma:asset/4b05c74825a4cdd87ba6d7171731bab23d026775.png';
import lounge2Image from 'figma:asset/62169d3b514865c0921350561b72020d89e96236.png';
import lounge3Image from 'figma:asset/5bf61c4e7f4d6bd0c93e7242166c24519a6a2fce.png';
import lounge4Image from 'figma:asset/44fe4b5b21e7e61dd98ae1672a21cc65e66b92b9.png';
import lounge5Image from 'figma:asset/48d333eeb2fadfb551610727a0c5d9439b0c8ba7.png';
import lounge6Image from 'figma:asset/4b05c74825a4cdd87ba6d7171731bab23d026775.png';

interface Placeholder {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: 'image' | 'text' | 'button' | 'blinker';
  content?: string;
  link?: string;
  buttonColor?: string;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  fontWeight?: number;
  // Blinker-specific properties
  blinkerColor?: string;
  blinkerStyle?: 'pulse' | 'blink' | 'glow';
  blinkerSpeed?: 'slow' | 'medium' | 'fast';
}

type Page = 'login' | 'admin-dashboard' | 'event-dashboard' | 'setup-wizard' | 'edit-event' | 'edit-lounge-layout' | 'user-event-selection' | 'lobby' | 'auditorium' | 'lounge' | 'sessions' | 'booth-marketplace' | 'booth-detail';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [events, setEvents] = useState<VirtualEvent[]>([]);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [engagementOpen, setEngagementOpen] = useState(false);
  const [currentBoothId, setCurrentBoothId] = useState<string>('');
  
  // Edit mode state for all pages
  const [editMode, setEditMode] = useState(false);
  const [editHandlers, setEditHandlers] = useState<{
    addButton: () => void;
    addText: () => void;
    addImage: () => void;
    addBlinker: () => void;
    save: () => void;
    cancel: () => void;
  } | null>(null);

  // New feature modals
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [showPhotoBoothModal, setShowPhotoBoothModal] = useState(false);

  const lobbyOptions = [
    { id: 'lobby-1', label: 'Modern Corporate Lobby', imageUrl: lobby1Image },
    { id: 'lobby-2', label: '3D Virtual Space', imageUrl: lobby2Image, videoUrl: 'YOUR_VIDEO_URL_HERE', isVideo: true },
    { id: 'lobby-3', label: 'Event Hall Entrance', imageUrl: lobby3Image },
    { id: 'lobby-4', label: 'Business Networking Space', imageUrl: lobby4Image },
    { id: 'lobby-5', label: 'Premium Lounge Area', imageUrl: lobby5Image },
    { id: 'lobby-6', label: 'Exhibition Reception', imageUrl: lobby6Image },
    { id: 'lobby-7', label: 'Animated Background Video', imageUrl: 'https://public-cdn.hr.com/remoteimages/website-images/podcasts/images/Animated_BG_2.mp4', videoUrl: 'https://public-cdn.hr.com/remoteimages/website-images/podcasts/images/Animated_BG_2.mp4', isVideo: true },
  ];

  const auditoriumOptions = [
    { id: 'auditorium-1', label: 'Main Conference Hall', imageUrl: auditorium1Image },
    { id: 'auditorium-2', label: 'Theater Stage View', imageUrl: auditorium2Image },
    { id: 'auditorium-3', label: 'Event Presentation Hall', imageUrl: auditorium3Image },
    { id: 'auditorium-4', label: 'Keynote Stage', imageUrl: auditorium4Image },
    { id: 'auditorium-5', label: 'Workshop Theater', imageUrl: auditorium5Image },
    { id: 'auditorium-6', label: 'Panel Discussion Hall', imageUrl: auditorium6Image },
  ];

  const loungeOptions = [
    { id: 'lounge-1', label: 'Networking Lounge', imageUrl: lounge1Image },
    { id: 'lounge-2', label: 'VIP Lounge', imageUrl: lounge2Image },
    { id: 'lounge-3', label: 'Social Hub', imageUrl: lounge3Image },
    { id: 'lounge-4', label: 'Breakout Area', imageUrl: lounge4Image },
    { id: 'lounge-5', label: 'Casual Meeting Space', imageUrl: lounge5Image },
    { id: 'lounge-6', label: 'Refreshment Zone', imageUrl: lounge6Image },
  ];

  const boothOptions = [
    { id: 'booth-1', title: 'Modern Exhibition Booth', imageUrl: booth1Image },
    { id: 'booth-2', title: 'Corporate Trade Show Exhibit', imageUrl: booth2Image },
    { id: 'booth-3', title: 'Tech Expo Booth Display', imageUrl: booth3Image },
    { id: 'booth-4', title: 'Virtual Booth Showcase', imageUrl: booth4Image },
    { id: 'booth-5', title: 'Convention Center Booth', imageUrl: booth5Image },
    { id: 'booth-6', title: 'Marketing Expo Display', imageUrl: booth6Image },
  ];

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('virtualEvents');
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      // Reconstruct image URLs from template IDs
      const reconstructedEvents = parsed.map((event: VirtualEvent) => {
        const lobby = lobbyOptions.find(opt => opt.id === event.lobby.template);
        const auditorium = auditoriumOptions.find(opt => opt.id === event.auditorium.template);
        const lounge = loungeOptions.find(opt => opt.id === event.lounge.template);
        const booth = boothOptions.find(opt => opt.id === event.booth.template);
        
        return {
          ...event,
          lobby: lobby ? { ...event.lobby, imageUrl: lobby.imageUrl } : event.lobby,
          auditorium: auditorium ? { ...event.auditorium, imageUrl: auditorium.imageUrl } : event.auditorium,
          lounge: lounge ? { ...event.lounge, imageUrl: lounge.imageUrl } : event.lounge,
          booth: booth ? { ...event.booth, imageUrl: booth.imageUrl } : event.booth,
        };
      });
      setEvents(reconstructedEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('virtualEvents', JSON.stringify(events));
    }
  }, [events]);

  const handleLogin = (username: string, role: 'admin' | 'user') => {
    const user: User = { username, role };
    setCurrentUser(user);

    if (role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      // User logs in - show event selection page
      setCurrentPage('user-event-selection');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentEventId(null);
    setEditingEventId(null);
    setCurrentPage('login');
  };

  const handleCreateEvent = () => {
    setEditingEventId(null);
    setCurrentPage('setup-wizard');
  };

  const handleEditEvent = (eventId: string) => {
    setEditingEventId(eventId);
    setCurrentPage('edit-event');
  };

  const handleViewEventDashboard = (eventId: string) => {
    setCurrentEventId(eventId);
    setCurrentPage('event-dashboard');
  };

  const handlePreviewEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    setCurrentPage('lobby');
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const updateEventStats = (eventId: string, updates: Partial<VirtualEvent['stats']>) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          stats: {
            ...event.stats,
            ...updates,
            lastUpdated: new Date().toISOString()
          }
        };
      }
      return event;
    }));
  };

  const handleWizardComplete = (selections: Record<string, any>, eventName?: string, customization?: any) => {
    const lobby = lobbyOptions.find(opt => opt.id === selections.lobby);
    const auditorium = auditoriumOptions.find(opt => opt.id === selections.auditorium);
    const lounge = loungeOptions.find(opt => opt.id === selections.lounge);
    const booth = boothOptions.find(opt => opt.id === selections.booth);

    if (editingEventId) {
      // Update existing event
      setEvents(events.map(event => {
        if (event.id === editingEventId) {
          return {
            ...event,
            name: eventName || event.name,
            customization: customization || event.customization,
            lobby: lobby ? { 
              template: lobby.id, 
              imageUrl: lobby.imageUrl, 
              title: lobby.label,
              ...(lobby.videoUrl && { videoUrl: lobby.videoUrl }),
              ...(lobby.isVideo && { isVideo: lobby.isVideo })
            } : event.lobby,
            auditorium: auditorium ? { template: auditorium.id, imageUrl: auditorium.imageUrl, title: auditorium.label } : event.auditorium,
            lounge: lounge ? { 
              template: lounge.id, 
              imageUrl: lounge.imageUrl, 
              title: lounge.label
            } : event.lounge,
            booth: booth ? { template: booth.id, imageUrl: booth.imageUrl, title: booth.title } : event.booth,
            stats: {
              ...event.stats,
              lastUpdated: new Date().toISOString()
            }
          };
        }
        return event;
      }));
      setEditingEventId(null);
      setCurrentPage('admin-dashboard');
    } else {
      // Create new event
      const newEvent: VirtualEvent = {
        id: `event-${Date.now()}`,
        name: eventName || `Virtual Event ${events.length + 1}`,
        createdAt: new Date().toISOString(),
        customization: customization || {
          brandColor: '#10B759',
          secondaryColor: '#0E9F4D',
          announcementText: 'Welcome to our virtual event! 🎉',
        },
        lobby: lobby ? { 
          template: lobby.id, 
          imageUrl: lobby.imageUrl, 
          title: lobby.label,
          ...(lobby.videoUrl && { videoUrl: lobby.videoUrl }),
          ...(lobby.isVideo && { isVideo: lobby.isVideo })
        } : { template: '', imageUrl: '', title: '' },
        auditorium: auditorium ? { template: auditorium.id, imageUrl: auditorium.imageUrl, title: auditorium.label } : { template: '', imageUrl: '', title: '' },
        lounge: lounge ? { 
          template: lounge.id, 
          imageUrl: lounge.imageUrl, 
          title: lounge.label
        } : { template: '', imageUrl: '', title: '' },
        booth: booth ? { template: booth.id, imageUrl: booth.imageUrl, title: booth.title } : { template: '', imageUrl: '', title: '' },
        stats: {
          totalVisitors: 0,
          activeUsers: 0,
          comments: 0,
          lastUpdated: new Date().toISOString()
        },
        link: `${window.location.origin}/event/${Date.now()}`
      };

      setEvents([...events, newEvent]);
      setCurrentPage('admin-dashboard');
    }
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'lobby':
      case 'auditorium':
      case 'lounge':
      case 'sessions':
      case 'booth-marketplace':
        setCurrentPage(page as Page);
        break;
      default:
        setCurrentPage(page as Page);
    }
  };

  const handleBoothSelect = (boothId: string) => {
    setCurrentBoothId(boothId);
    setCurrentPage('booth-detail');
  };

  const handleBoothChange = (boothId: string) => {
    setCurrentBoothId(boothId);
  };

  const handleUserSelectEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    setCurrentPage('lobby');
    // Increment visitor count
    updateEventStats(eventId, { totalVisitors: (events.find(e => e.id === eventId)?.stats.totalVisitors || 0) + 1 });
  };

  const handleGoToDashboard = () => {
    setCurrentPage('admin-dashboard');
    setCurrentEventId(null);
  };

  const handleEditLoungeLayout = (eventId: string) => {
    setCurrentEventId(eventId);
    setCurrentPage('edit-lounge-layout');
  };

  const handleSaveLoungeLayout = (position: { x: number; y: number }, size: { width: number; height: number }) => {
    if (!currentEventId) return;
    
    setEvents(events.map(event => {
      if (event.id === currentEventId) {
        return {
          ...event,
          lounge: {
            ...event.lounge,
            panelPosition: position,
            panelSize: size,
          }
        };
      }
      return event;
    }));
    
    setCurrentPage('event-dashboard');
  };

  const handleSaveLoungePlaceholders = (placeholders: Placeholder[]) => {
    if (!currentEventId) return;
    
    setEvents(events.map(event => {
      if (event.id === currentEventId) {
        return {
          ...event,
          lounge: {
            ...event.lounge,
            placeholders: placeholders,
          }
        };
      }
      return event;
    }));
  };

  const handleSaveLobbyPlaceholders = (placeholders: Placeholder[]) => {
    if (!currentEventId) return;
    
    setEvents(events.map(event => {
      if (event.id === currentEventId) {
        return {
          ...event,
          lobby: {
            ...event.lobby,
            placeholders: placeholders,
          }
        };
      }
      return event;
    }));
  };

  const handleSaveAuditoriumPlaceholders = (placeholders: Placeholder[]) => {
    if (!currentEventId) return;
    
    setEvents(events.map(event => {
      if (event.id === currentEventId) {
        return {
          ...event,
          auditorium: {
            ...event.auditorium,
            placeholders: placeholders,
          }
        };
      }
      return event;
    }));
  };

  const handleSaveBoothPlaceholders = (placeholders: Placeholder[]) => {
    if (!currentEventId) return;
    
    setEvents(events.map(event => {
      if (event.id === currentEventId) {
        return {
          ...event,
          booth: {
            ...event.booth,
            placeholders: placeholders,
          }
        };
      }
      return event;
    }));
  };

  const renderPage = () => {
    // Not logged in
    if (!currentUser) {
      return <Login onLogin={handleLogin} />;
    }

    // Admin views
    if (currentUser.role === 'admin') {
      switch (currentPage) {
        case 'admin-dashboard':
          return (
            <AdminDashboard
              events={events}
              onCreateEvent={handleCreateEvent}
              onEditEvent={handleEditEvent}
              onViewEvent={handleViewEventDashboard}
              onDeleteEvent={handleDeleteEvent}
              onPreview={handlePreviewEvent}
              onLogout={handleLogout}
            />
          );

        case 'event-dashboard': {
          const event = events.find(e => e.id === currentEventId);
          if (!event) return <div>Event not found</div>;
          return (
            <EventDashboard
              event={event}
              onBack={() => setCurrentPage('admin-dashboard')}
              onEdit={() => handleEditEvent(event.id)}
              onEditLoungeLayout={() => handleEditLoungeLayout(event.id)}
              onPreview={() => {
                setCurrentEventId(event.id);
                setCurrentPage('lobby');
              }}
              onLogout={handleLogout}
            />
          );
        }

        case 'setup-wizard':
          return (
            <SetupWizard
              onComplete={handleWizardComplete}
              lobbyTemplates={lobbyOptions}
              auditoriumTemplates={auditoriumOptions}
              loungeTemplates={loungeOptions}
              boothTemplates={boothOptions}
              onCancel={() => setCurrentPage('admin-dashboard')}
            />
          );

        case 'edit-event': {
          const event = events.find(e => e.id === editingEventId);
          if (!event) return <div>Event not found</div>;
          return (
            <SetupWizard
              onComplete={handleWizardComplete}
              lobbyTemplates={lobbyOptions}
              auditoriumTemplates={auditoriumOptions}
              loungeTemplates={loungeOptions}
              boothTemplates={boothOptions}
              initialSelections={{
                lobby: event.lobby.template,
                auditorium: event.auditorium.template,
                lounge: event.lounge.template,
                booth: event.booth.template
              }}
              eventName={event.name}
              initialCustomization={event.customization}
              onCancel={() => {
                setEditingEventId(null);
                setCurrentPage('admin-dashboard');
              }}
            />
          );
        }

        case 'edit-lounge-layout': {
          const event = events.find(e => e.id === currentEventId);
          if (!event) return <div>Event not found</div>;
          return (
            <LoungeEditor
              imageUrl={event.lounge.imageUrl}
              title={event.lounge.title}
              initialPosition={event.lounge.panelPosition}
              initialSize={event.lounge.panelSize}
              onSave={handleSaveLoungeLayout}
              onCancel={() => setCurrentPage('event-dashboard')}
            />
          );
        }

        // Admin can also preview events
        case 'lobby':
        case 'auditorium':
        case 'lounge':
        case 'sessions':
        case 'booth-marketplace':
        case 'booth-detail': {
          const event = events.find(e => e.id === currentEventId);
          if (!event) return <div>Event not found</div>;
          return renderEventPages(event);
        }

        default:
          return (
            <AdminDashboard
              events={events}
              onCreateEvent={handleCreateEvent}
              onEditEvent={handleEditEvent}
              onViewEvent={handleViewEventDashboard}
              onDeleteEvent={handleDeleteEvent}
              onPreview={handlePreviewEvent}
              onLogout={handleLogout}
            />
          );
      }
    }

    // User views - only event pages
    const event = events.find(e => e.id === currentEventId);
    if (!event) {
      // Show event selection if no event is selected
      if (currentPage === 'user-event-selection') {
        return (
          <UserEventSelection
            events={events}
            onSelectEvent={handleUserSelectEvent}
            onLogout={handleLogout}
            username={currentUser.username}
          />
        );
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No Event Available</h2>
            <p className="text-slate-600 mb-6">Please contact the event administrator.</p>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return renderEventPages(event);
  };

  const renderEventPages = (event: VirtualEvent) => {
    console.log('Rendering event pages - Event data:', event);
    console.log('Lobby imageUrl:', event.lobby.imageUrl);
    console.log('Lobby imageUrl type:', typeof event.lobby.imageUrl);
    
    switch (currentPage) {
      case 'lobby':
        return (
          <SelectedLobby
            imageUrl={event.lobby.imageUrl}
            videoUrl={(event.lobby as any).videoUrl}
            isVideo={(event.lobby as any).isVideo}
            title={event.lobby.title}
            onNavigate={handleNavigation}
            isAdmin={currentUser?.role === 'admin'}
            onSaveLayout={handleSaveLobbyPlaceholders}
            initialPlaceholders={(event.lobby as any).placeholders || []}
            onEditStateChange={(isEdit, handlers) => {
              setEditMode(isEdit);
              setEditHandlers(handlers);
            }}
            customization={event.customization}
          />
        );

      case 'auditorium':
        return (
          <SelectedAuditorium
            imageUrl={event.auditorium.imageUrl}
            videoUrl={(event.auditorium as any).videoUrl}
            isVideo={(event.auditorium as any).isVideo}
            title={event.auditorium.title}
            onNavigate={handleNavigation}
            isAdmin={currentUser?.role === 'admin'}
            onSaveLayout={handleSaveAuditoriumPlaceholders}
            initialPlaceholders={(event.auditorium as any).placeholders || []}
            onEditStateChange={(isEdit, handlers) => {
              setEditMode(isEdit);
              setEditHandlers(handlers);
            }}
            customization={event.customization}
          />
        );

      case 'lounge':
        return (
          <SelectedLounge
            imageUrl={event.lounge.imageUrl}
            title={event.lounge.title}
            onNavigate={handleNavigation}
            isAdmin={currentUser?.role === 'admin'}
            onSaveLayout={handleSaveLoungePlaceholders}
            initialPlaceholders={(event.lounge as any).placeholders || []}
            onEditStateChange={(isEdit, handlers) => {
              setEditMode(isEdit);
              setEditHandlers(handlers);
            }}
            customization={event.customization}
          />
        );

      case 'sessions':
        return (
          <Sessions
            onNavigate={handleNavigation}
            customization={event.customization}
          />
        );

      case 'booth-marketplace':
        return (
          <BoothMarketplaceGrid
            booths={boothOptions}
            onSelectBooth={handleBoothSelect}
            onNavigate={handleNavigation}
            customization={event.customization}
          />
        );

      case 'booth-detail': {
        const displayBoothId = currentBoothId || event.booth.template;
        const displayBooth = boothOptions.find(opt => opt.id === displayBoothId);
        
        if (displayBooth) {
          return (
            <SelectedBooth
              imageUrl={displayBooth.imageUrl}
              title={displayBooth.title || ''}
              onNavigate={handleNavigation}
              allBooths={boothOptions}
              currentBoothId={displayBoothId}
              onBoothChange={handleBoothChange}
              isAdmin={currentUser?.role === 'admin'}
              onSaveLayout={handleSaveBoothPlaceholders}
              initialPlaceholders={(event.booth as any).placeholders || []}
              onEditStateChange={(isEdit, handlers) => {
                setEditMode(isEdit);
                setEditHandlers(handlers);
              }}
              customization={event.customization}
            />
          );
        }
        return <div>Booth not found</div>;
      }

      default:
        return (
          <SelectedLobby
            imageUrl={event.lobby.imageUrl}
            title={event.lobby.title}
            onNavigate={handleNavigation}
            isAdmin={currentUser?.role === 'admin'}
            onSaveLayout={handleSaveLobbyPlaceholders}
            initialPlaceholders={(event.lobby as any).placeholders || []}
            onEditStateChange={(isEdit, handlers) => {
              setEditMode(isEdit);
              setEditHandlers(handlers);
            }}
            customization={event.customization}
          />
        );
    }
  };

  const shouldShowNavigation = currentUser && currentPage !== 'login' && currentPage !== 'admin-dashboard' && currentPage !== 'event-dashboard' && currentPage !== 'setup-wizard' && currentPage !== 'edit-event' && currentPage !== 'edit-lounge-layout' && currentPage !== 'user-event-selection';

  return (
    <UserProvider>
      <div className="relative min-h-screen bg-white">
        {shouldShowNavigation && (() => {
          const event = events.find(e => e.id === currentEventId);
          return (
            <Navigation
              currentPage={currentPage}
              onNavigate={handleNavigation}
              onlineUsers={142}
              onToggleEngagement={() => setEngagementOpen(!engagementOpen)}
              isAdmin={currentUser?.role === 'admin'}
              onGoToDashboard={currentUser?.role === 'admin' ? () => setCurrentPage('admin-dashboard') : undefined}
              onLogout={handleLogout}
              editMode={editMode}
              editHandlers={editHandlers}
              onOpenProfile={() => setShowProfileModal(true)}
              onOpenActivity={() => setShowActivityModal(true)}
              onOpenBingo={() => setShowBingoModal(true)}
              onOpenPhotoBooth={() => setShowPhotoBoothModal(true)}
              customization={event?.customization}
            />
          );
        })()}
        {renderPage()}
        {shouldShowNavigation && (
          <>
            <EngagementSidebar
              isOpen={engagementOpen}
              onClose={() => setEngagementOpen(false)}
            />
            <LiveChatButton onlineUsers={142} />
          </>
        )}

        {/* Feature Modals */}
        {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} />}
        {showActivityModal && <ActivityDashboard onClose={() => setShowActivityModal(false)} />}
        {showBingoModal && <BingoCard onClose={() => setShowBingoModal(false)} />}
        {showPhotoBoothModal && <VirtualPhotoBooth onClose={() => setShowPhotoBoothModal(false)} />}
      </div>
    </UserProvider>
  );
}