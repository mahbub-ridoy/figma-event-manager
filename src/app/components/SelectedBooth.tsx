import { useState, useRef, useEffect } from 'react';
import { Home, Users, Play, Store, ChevronLeft, ChevronRight, MessageCircle, ChevronDown, Download, Video, Calendar, Mail, X, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PlaceholderEditor } from './PlaceholderEditor';
import { getDarkerShade } from '../utils/colorUtils';

interface SelectedBoothProps {
  imageUrl: string;
  title: string;
  onNavigate: (page: string) => void;
  allBooths?: any[];
  currentBoothId?: string;
  onBoothChange?: (boothId: string) => void;
  isAdmin?: boolean;
  onSaveLayout?: (placeholders: Placeholder[]) => void;
  initialPlaceholders?: Placeholder[];
  onEditStateChange?: (isEditMode: boolean, handlers: {
    addButton: () => void;
    addText: () => void;
    addImage: () => void;
    addBlinker: () => void;
    addVideo: () => void;
    save: () => void;
    cancel: () => void;
  } | null) => void;
  customization?: {
    brandColor?: string;
    secondaryColor?: string;
    announcementText?: string;
    logoUrl?: string;
    socialLinks?: any;
  };
}

interface Placeholder {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'image' | 'text' | 'button' | 'blinker' | 'video';
  content: string;
  link?: string;
  buttonColor?: string;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  fontWeight?: number;
}

interface EditingPlaceholder {
  id: string;
  type: 'image' | 'text' | 'button' | 'blinker' | 'video';
  content: string;
  link?: string;
  buttonColor?: string;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  fontWeight?: number;
}

export function SelectedBooth({ 
  imageUrl, 
  title, 
  onNavigate,
  allBooths = [],
  currentBoothId,
  onBoothChange,
  isAdmin = false,
  onSaveLayout,
  initialPlaceholders = [],
  onEditStateChange,
  customization
}: SelectedBoothProps) {
  const [showBoothDropdown, setShowBoothDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(initialPlaceholders);
  const [draggedPlaceholder, setDraggedPlaceholder] = useState<string | null>(null);
  const [resizingPlaceholder, setResizingPlaceholder] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingContent, setEditingContent] = useState<EditingPlaceholder | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const placeholdersRef = useRef<Placeholder[]>(initialPlaceholders);
  
  // Interactive modal states
  const [activeModal, setActiveModal] = useState<'resources' | 'demo' | 'meeting' | 'contact' | null>(null);
  const [selectedMeetingSlot, setSelectedMeetingSlot] = useState<string>('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [meetingForm, setMeetingForm] = useState({ name: '', email: '', topic: '' });

  // Dynamic brand colors
  const brandColor = customization?.brandColor || '#10B759';
  const darkerBrandColor = getDarkerShade(brandColor);
  const evenDarkerBrandColor = getDarkerShade(darkerBrandColor);
  const announcementText = customization?.announcementText || 'Visit our exhibitor booths now';

  // Comment states
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'Great booth! The product demos are very impressive. Looking forward to learning more about your enterprise solutions.',
      timestamp: '2 mins ago'
    },
    {
      id: '2',
      author: 'Michael Torres',
      avatar: 'https://i.pravatar.cc/150?img=2',
      text: 'Just downloaded the technical specifications. Very detailed and helpful documentation!',
      timestamp: '5 mins ago'
    },
    {
      id: '3',
      author: 'Emily Watson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      text: 'The pricing guide answered all my questions. Scheduling a meeting with your team now.',
      timestamp: '12 mins ago'
    },
    {
      id: '4',
      author: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=4',
      text: 'Excellent case studies! Would love to see more implementation examples.',
      timestamp: '18 mins ago'
    },
    {
      id: '5',
      author: 'Jessica Martinez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'The booth layout is fantastic. Very easy to navigate and find the information I needed.',
      timestamp: '25 mins ago'
    },
    {
      id: '6',
      author: 'Ryan Patel',
      avatar: 'https://i.pravatar.cc/150?img=6',
      text: 'Interactive demo was amazing! This is exactly what we need for our organization.',
      timestamp: '32 mins ago'
    }
  ]);

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'https://i.pravatar.cc/150?img=20',
        text: newComment,
        timestamp: 'Just now'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  // Keep ref in sync with state
  useEffect(() => {
    placeholdersRef.current = placeholders;
  }, [placeholders]);

  // Sync placeholders with initialPlaceholders only when not in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setPlaceholders(initialPlaceholders);
    }
  }, [initialPlaceholders, isEditMode]);

  const handleBoothSelect = (boothId: string) => {
    if (onBoothChange) {
      onBoothChange(boothId);
    }
    setShowBoothDropdown(false);
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    const currentRef = imageContainerRef.current;
    if (!currentRef) return;
    const rect = currentRef.getBoundingClientRect();
    const placeholder = placeholders.find(p => p.id === id);
    if (!placeholder) return;
    
    setDraggedPlaceholder(id);
    const placeholderLeft = (placeholder.x / 100) * rect.width;
    const placeholderTop = (placeholder.y / 100) * rect.height;
    
    setDragOffset({
      x: e.clientX - rect.left - placeholderLeft,
      y: e.clientY - rect.top - placeholderTop
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const currentRef = imageContainerRef.current;
    if (!currentRef) return;
    
    const rect = currentRef.getBoundingClientRect();

    if (draggedPlaceholder) {
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      const clampedX = Math.max(0, Math.min(100, percentX));
      const clampedY = Math.max(0, Math.min(100, percentY));
      
      setPlaceholders(placeholders.map(p => 
        p.id === draggedPlaceholder 
          ? { ...p, x: clampedX, y: clampedY }
          : p
      ));
    }

    if (resizingPlaceholder) {
      const placeholder = placeholders.find(p => p.id === resizingPlaceholder);
      if (!placeholder) return;

      const deltaX = e.clientX - dragOffset.x;
      const deltaY = e.clientY - dragOffset.y;

      const deltaWidthPercent = (deltaX / rect.width) * 100;
      const deltaHeightPercent = (deltaY / rect.height) * 100;

      const newWidth = Math.max(10, Math.min(100 - placeholder.x, placeholder.width + deltaWidthPercent));
      const newHeight = Math.max(10, Math.min(100 - placeholder.y, placeholder.height + deltaHeightPercent));

      setPlaceholders(placeholders.map(p =>
        p.id === resizingPlaceholder
          ? { ...p, width: newWidth, height: newHeight }
          : p
      ));

      setDragOffset({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggedPlaceholder(null);
    setResizingPlaceholder(null);
  };

  useEffect(() => {
    if (draggedPlaceholder || resizingPlaceholder) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedPlaceholder, resizingPlaceholder, dragOffset, placeholders]);

  const handleAddPlaceholder = (type: 'button' | 'text' | 'image' | 'blinker' | 'video') => {
    const newPlaceholder: Placeholder = {
      id: Date.now().toString(),
      x: 10,
      y: 10,
      width: 19.79,
      height: 55.56,
      type: type,
      content: type === 'button' ? 'Contact Us' : type === 'text' ? 'Booth Information' : 'https://via.placeholder.com/380x600',
      buttonColor: 'primary'
    };
    setPlaceholders(prev => [...prev, newPlaceholder]);
  };

  const handleRemovePlaceholder = (id: string) => {
    setPlaceholders(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveLayout = () => {
    if (onSaveLayout) {
      onSaveLayout(placeholdersRef.current);
    }
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setPlaceholders(initialPlaceholders);
    setIsEditMode(false);
  };

  const handleEditContent = (placeholderId: string) => {
    setPlaceholders(prev => {
      const placeholder = prev.find(p => p.id === placeholderId);
      if (placeholder) {
        setEditingContent({ 
          id: placeholderId, 
          type: placeholder.type, 
          content: placeholder.content, 
          link: placeholder.link, 
          buttonColor: placeholder.buttonColor, 
          textColor: placeholder.textColor, 
          textAlign: placeholder.textAlign, 
          fontSize: placeholder.fontSize, 
          fontWeight: placeholder.fontWeight 
        });
      }
      return prev;
    });
  };

  const handleSaveContent = (data: {
    type: 'image' | 'text' | 'button' | 'blinker' | 'video';
    content: string;
    link?: string;
    buttonColor?: 'primary' | 'secondary' | 'outline';
    textColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: number;
    fontWeight?: number;
  }) => {
    if (!editingContent) return;
    setPlaceholders(prev => prev.map(p =>
      p.id === editingContent.id
        ? { ...p, type: data.type, content: data.content, link: data.link, buttonColor: data.buttonColor, textColor: data.textColor, textAlign: data.textAlign, fontSize: data.fontSize, fontWeight: data.fontWeight }
        : p
    ));
    setEditingContent(null);
  };

  const renderPlaceholderContent = (placeholder: Placeholder) => {
    const WrapperComponent = placeholder.link && placeholder.type !== 'button'
      ? 'a'
      : 'div';
    
    const wrapperProps = placeholder.link && placeholder.type !== 'button'
      ? {
          href: placeholder.link,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'block w-full h-full cursor-pointer',
        }
      : { className: 'block w-full h-full' };

    switch (placeholder.type) {
      case 'image':
        return (
          <WrapperComponent {...wrapperProps as any}>
            <img
              src={placeholder.content}
              alt="Placeholder image"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid Image URL%3C/text%3E%3C/svg%3E';
              }}
            />
          </WrapperComponent>
        );
      
      case 'text':
        const textAlign = placeholder.textAlign || 'center';
        const textColor = placeholder.textColor || '#3B82F6';
        const fontSize = placeholder.fontSize || Math.max(16, Math.min(placeholder.width / 3, placeholder.height / 8));
        const fontWeight = placeholder.fontWeight || 400;
        
        return (
          <WrapperComponent {...wrapperProps as any}>
            <div className="px-4 h-full flex items-center" style={{ justifyContent: textAlign }}>
              <p 
                className="font-medium leading-relaxed" 
                style={{ 
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  textAlign: textAlign,
                  fontWeight: `${fontWeight}`
                }}
              >
                {placeholder.content}
              </p>
            </div>
          </WrapperComponent>
        );
      
      case 'button':
        const buttonColor = placeholder.buttonColor || '#10B759';
        const buttonTextColor = placeholder.textColor || '#FFFFFF';
        const buttonFontSize = placeholder.fontSize || 16;
        
        return (
          <a
            href={placeholder.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full px-3 flex items-center justify-center font-bold hover:opacity-90 transition-all rounded-lg"
            style={{ 
              backgroundColor: buttonColor,
              color: buttonTextColor,
              fontSize: `${buttonFontSize}px`,
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {placeholder.content}
          </a>
        );
      
      default:
        return null;
    }
  };

  useEffect(() => {
    if (onEditStateChange) {
      if (isEditMode) {
        onEditStateChange(true, {
          addButton: () => handleAddPlaceholder('button'),
          addText: () => handleAddPlaceholder('text'),
          addImage: () => handleAddPlaceholder('image'),
          addBlinker: () => handleAddPlaceholder('blinker'),
          addVideo: () => handleAddPlaceholder('video'),
          save: handleSaveLayout,
          cancel: handleCancelEdit
        });
      } else {
        onEditStateChange(false, {
          addButton: () => setIsEditMode(true),
          addText: () => {},
          addImage: () => {},
          addBlinker: () => {},
          addVideo: () => {},
          save: () => {},
          cancel: () => {}
        });
      }
    }
  }, [isEditMode]); // Only depend on isEditMode, handlers use functional updates

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation Pills */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <>
                  {/* Lobby */}
                  <button
                    onClick={() => onNavigate('lobby')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#10B759] hover:bg-[#10B759] hover:text-white transition-all group"
                  >
                    <Home className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                    <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Lobby</span>
                  </button>

                  {/* Auditorium */}
                  <button
                    onClick={() => onNavigate('auditorium')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#10B759] hover:bg-[#10B759] hover:text-white transition-all group"
                  >
                    <Play className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                    <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Auditorium</span>
                  </button>

                  {/* Lounge */}
                  <button
                    onClick={() => onNavigate('lounge')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#10B759] hover:bg-[#10B759] hover:text-white transition-all group"
                  >
                    <Users className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                    <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Lounge</span>
                  </button>

                  {/* Booth - Current */}
                  <button
                    onClick={() => onNavigate('booth-marketplace')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B759] text-white shadow-md"
                  >
                    <Store className="w-4 h-4" />
                    <span className="text-sm font-medium">Booths</span>
                  </button>
                </>
              )}
            </div>

            {/* Center - Live Update Scrolling Notification */}
            <div className="flex-1 flex items-center rounded-lg overflow-hidden max-w-xl mx-4"
                 style={{ background: `linear-gradient(to right, ${brandColor}, ${darkerBrandColor})` }}>
              <div className="flex-shrink-0 px-4 py-2 flex items-center gap-2 border-r border-white/20"
                   style={{ background: `linear-gradient(to right, ${darkerBrandColor}, ${evenDarkerBrandColor})` }}>
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
                      {announcementText}  •  {announcementText}  •  {announcementText}  •  {announcementText}  •  {announcementText}  •  {announcementText}
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

            {/* Booth Selector Dropdown */}
            {allBooths.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowBoothDropdown(!showBoothDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#10B759] text-[#10B759] rounded-lg hover:bg-[#10B759] hover:text-white transition-all font-medium"
                >
                  <span>Visit Company Booth</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBoothDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showBoothDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {allBooths.map((booth) => (
                      <button
                        key={booth.id}
                        onClick={() => handleBoothSelect(booth.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 ${
                          booth.id === currentBoothId ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={booth.imageUrl} 
                            alt={booth.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-slate-900">{booth.title}</div>
                            {booth.company && (
                              <div className="text-xs text-slate-500">{booth.company}</div>
                            )}
                          </div>
                          {booth.id === currentBoothId && (
                            <div className="w-2 h-2 bg-[#10B759] rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Image with Placeholders */}
      <div className="flex-1 relative px-4 md:px-8 py-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden flex items-center justify-center">
        <div ref={imageContainerRef} className="relative inline-block max-w-full max-h-[60vh] md:max-h-[70vh]">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-xl shadow-lg"
            style={{ aspectRatio: '1920/1080' }}
          />
          
          {/* Placeholders */}
          {placeholders.map((placeholder) => (
            <div
              key={placeholder.id}
              onMouseDown={isEditMode ? (e) => handleDragStart(placeholder.id, e) : undefined}
              style={{
                position: 'absolute',
                left: `${placeholder.x}%`,
                top: `${placeholder.y}%`,
                width: `${placeholder.width}%`,
                height: `${placeholder.height}%`,
                cursor: isEditMode ? (draggedPlaceholder === placeholder.id ? 'grabbing' : 'grab') : (placeholder.link || placeholder.type === 'button' ? 'pointer' : 'default'),
              }}
              className="overflow-hidden"
            >
              {/* Edit Mode Controls */}
              {isEditMode && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePlaceholder(placeholder.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditContent(placeholder.id);
                    }}
                    className="absolute -top-2 -left-2 w-8 h-8 bg-[#10B759] text-white rounded-full flex items-center justify-center hover:bg-[#0E9F4D] transition-all z-10"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </>
              )}
              
              {/* Placeholder Content */}
              <div className="space-y-3 h-full flex flex-col">
                {renderPlaceholderContent(placeholder)}
              </div>

              {/* Resize Handle - Bottom Right Corner */}
              {isEditMode && (
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setResizingPlaceholder(placeholder.id);
                    setDragOffset({ x: e.clientX, y: e.clientY });
                  }}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-[#10B759] cursor-nwse-resize flex items-center justify-center hover:bg-[#0E9F4D] transition-all"
                  style={{ cursor: 'nwse-resize' }}
                >
                  <div className="w-3 h-3 border-r-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Editor Modal */}
      {editingContent && (
        <PlaceholderEditor
          placeholder={editingContent}
          onSave={handleSaveContent}
          onCancel={() => setEditingContent(null)}
        />
      )}

      {/* Bottom Action Bar */}
      <div className="border-t border-slate-200 bg-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{title}</h2>
              <p className="text-sm text-slate-600">Explore our products and services</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveModal('resources')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
              >
                <Download className="w-4 h-4" />
                Resources
              </button>
              <button 
                onClick={() => setActiveModal('demo')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
              >
                <Video className="w-4 h-4" />
                Live Demo
              </button>
              <button 
                onClick={() => setActiveModal('meeting')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
              >
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </button>
              <button 
                onClick={() => setActiveModal('contact')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Comments Section */}
      <div className="border-t border-slate-200 bg-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Comment Input */}
          <div className="flex gap-3 items-center mb-4">
            <img 
              src="https://i.pravatar.cc/150?img=20" 
              alt="Your avatar"
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
              placeholder="Share your thoughts about this booth..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
            />
            <button
              onClick={handlePostComment}
              className="px-6 py-2.5 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Post
            </button>
          </div>

          {/* Comments Grid - 2 columns, 3 rows */}
          <div className="grid grid-cols-2 gap-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-sm text-slate-900">{comment.author}</span>
                    <span className="text-xs text-slate-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Modal */}
      {activeModal === 'resources' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Download Resources</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <p className="text-slate-600 mb-6">Access our comprehensive collection of resources, case studies, and product guides.</p>
              
              <div className="space-y-3">
                {/* PDF 1 */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#10B759] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Product Catalog 2026</h4>
                      <p className="text-sm text-slate-500">PDF • 2.4 MB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>

                {/* PDF 2 */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#10B759] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Case Study: Enterprise Solutions</h4>
                      <p className="text-sm text-slate-500">PDF • 1.8 MB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>

                {/* PDF 3 */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#10B759] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Technical Specifications</h4>
                      <p className="text-sm text-slate-500">PDF • 3.1 MB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>

                {/* PDF 4 */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#10B759] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Pricing & Plans Guide</h4>
                      <p className="text-sm text-slate-500">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>

                {/* PDF 5 */}
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#10B759] hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Implementation Roadmap</h4>
                      <p className="text-sm text-slate-500">PDF • 2.9 MB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all opacity-0 group-hover:opacity-100">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Modal */}
      {activeModal === 'demo' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full">
            <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Live Product Demo</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 mb-4">Interactive Product Demonstration</p>
                  <button className="px-6 py-3 bg-[#10B759] text-white rounded-lg hover:bg-[#0E9F4D] transition-all flex items-center gap-2 mx-auto">
                    <Play className="w-5 h-5" />
                    Start Demo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10B759] mb-1">15 min</div>
                  <div className="text-sm text-slate-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10B759] mb-1">Live</div>
                  <div className="text-sm text-slate-600">Interactive</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#10B759] mb-1">HD</div>
                  <div className="text-sm text-slate-600">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {activeModal === 'meeting' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Schedule a Meeting</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <p className="text-slate-600 mb-6">Book a one-on-one meeting with our team to discuss your needs.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={meetingForm.name}
                    onChange={(e) => setMeetingForm({ ...meetingForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={meetingForm.email}
                    onChange={(e) => setMeetingForm({ ...meetingForm, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Topic</label>
                  <input
                    type="text"
                    value={meetingForm.topic}
                    onChange={(e) => setMeetingForm({ ...meetingForm, topic: e.target.value })}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">Select a Time Slot</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Today, 2:00 PM EST',
                    'Today, 4:30 PM EST',
                    'Tomorrow, 10:00 AM EST',
                    'Tomorrow, 2:00 PM EST',
                    'Feb 2, 11:00 AM EST',
                    'Feb 2, 3:00 PM EST'
                  ].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedMeetingSlot(slot)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedMeetingSlot === slot
                          ? 'border-[#10B759] bg-[#10B759] text-white'
                          : 'border-slate-200 hover:border-[#10B759] text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Confirm Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full">
            <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 resize-none"
                  />
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}