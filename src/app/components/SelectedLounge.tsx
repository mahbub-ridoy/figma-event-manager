import { useState, useRef, useEffect } from 'react';
import { Home, Users, Play, Store, MessageCircle, Video, Calendar, UserPlus, Mail, Building2, Clock, Send, Link as LinkIcon, Edit, Save, X, Plus, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PlaceholderEditor } from './PlaceholderEditor';
import { getDarkerShade } from '../utils/colorUtils';

interface SelectedLoungeProps {
  imageUrl: string;
  title: string;
  onNavigate: (page: string) => void;
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

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface ContentItem {
  id: string;
  type: 'heading' | 'text' | 'button' | 'link' | 'image';
  content: string;
  style?: 'primary' | 'secondary' | 'outline';
  url?: string;
}

interface Placeholder {
  id: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  type: 'image' | 'text' | 'button' | 'blinker' | 'video';
  content: string; // image URL, text content, or button text
  link?: string; // optional clickable link
  buttonColor?: string;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  fontWeight?: number;
  blinkerColor?: string;
  blinkerStyle?: 'pulse' | 'blink';
  blinkerSpeed?: 'slow' | 'medium' | 'fast';
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
  blinkerColor?: string;
  blinkerStyle?: 'pulse' | 'blink';
  blinkerSpeed?: 'slow' | 'medium' | 'fast';
}

export function SelectedLounge({ imageUrl, title, onNavigate, isAdmin = false, onSaveLayout, initialPlaceholders = [], onEditStateChange, customization }: SelectedLoungeProps) {
  const [newComment, setNewComment] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(initialPlaceholders);
  const [draggedPlaceholder, setDraggedPlaceholder] = useState<string | null>(null);
  const [resizingPlaceholder, setResizingPlaceholder] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingContent, setEditingContent] = useState<EditingPlaceholder | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const placeholdersRef = useRef<Placeholder[]>(initialPlaceholders);

  // Dynamic brand colors
  const brandColor = customization?.brandColor || '#10B759';
  const darkerBrandColor = getDarkerShade(brandColor);
  const evenDarkerBrandColor = getDarkerShade(darkerBrandColor);
  const announcementText = customization?.announcementText || 'Networking session starting now';

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

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?img=7',
      text: 'Great networking space! Would love to connect with other attendees here.',
      timestamp: '1 min ago'
    },
    {
      id: '2',
      author: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=8',
      text: 'The lounge design is so inviting. Perfect for casual conversations!',
      timestamp: '4 min ago'
    },
    {
      id: '3',
      author: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=9',
      text: 'Anyone interested in discussing the latest tech trends? Let\'s chat!',
      timestamp: '7 min ago'
    },
    {
      id: '4',
      author: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=10',
      text: 'This is exactly what we needed - a place to relax and network.',
      timestamp: '10 min ago'
    },
    {
      id: '5',
      author: 'Tom Roberts',
      avatar: 'https://i.pravatar.cc/150?img=11',
      text: 'Looking for collaboration opportunities. Feel free to reach out!',
      timestamp: '14 min ago'
    },
    {
      id: '6',
      author: 'Rachel Kim',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'Love the atmosphere here. Great job on the virtual lounge setup!',
      timestamp: '17 min ago'
    }
  ]);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://i.pravatar.cc/150?img=20',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setComments([comment, ...comments.slice(0, 5)]);
    setNewComment('');
  };

  const renderContentItem = (item: ContentItem) => {
    switch (item.type) {
      case 'heading':
        return <h3 key={item.id} className="text-xl font-bold text-[#10B759]">{item.content}</h3>;
      case 'text':
        return <p key={item.id} className="text-sm text-slate-700">{item.content}</p>;
      case 'button':
        const buttonStyle = item.style === 'primary' 
          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
          : item.style === 'secondary'
          ? 'bg-[#5B7C8F] text-white'
          : 'border-2 border-[#10B759] text-[#10B759] bg-transparent';
        return (
          <a
            key={item.id}
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full px-4 py-2 rounded font-medium text-center ${buttonStyle} hover:opacity-90 transition-all`}
          >
            {item.content}
          </a>
        );
      case 'link':
        return (
          <a
            key={item.id}
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#10B759] underline hover:text-[#0E9F4D] flex items-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            {item.content}
          </a>
        );
      case 'image':
        return (
          <img
            key={item.id}
            src={item.url || '#'}
            alt={item.content}
            className="w-full h-auto rounded-lg"
          />
        );
      default:
        return null;
    }
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

    // Handle dragging
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

    // Handle resizing
    if (resizingPlaceholder) {
      const placeholder = placeholders.find(p => p.id === resizingPlaceholder);
      if (!placeholder) return;

      const deltaX = e.clientX - dragOffset.x;
      const deltaY = e.clientY - dragOffset.y;

      const deltaWidthPercent = (deltaX / rect.width) * 100;
      const deltaHeightPercent = (deltaY / rect.height) * 100;

      const minSize = 2;
      const newWidth = Math.max(minSize, Math.min(100 - placeholder.x, placeholder.width + deltaWidthPercent));
      const newHeight = Math.max(minSize, Math.min(100 - placeholder.y, placeholder.height + deltaHeightPercent));

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
      width: type === 'blinker' ? 2 : type === 'video' ? 15 : 10,
      height: type === 'blinker' ? 3.56 : type === 'video' ? 8.44 : 17.78,
      type: type,
      content: type === 'button' ? 'Click Here' : type === 'text' ? 'Welcome to Lounge' : type === 'blinker' ? 'circle' : type === 'video' ? '' : 'https://via.placeholder.com/380x600',
      buttonColor: 'primary',
      blinkerColor: type === 'blinker' ? '#FFFFFF' : undefined,
      textColor: type === 'blinker' ? '#FCD34D' : undefined
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
        setEditingContent({ id: placeholderId, type: placeholder.type, content: placeholder.content, link: placeholder.link, buttonColor: placeholder.buttonColor, textColor: placeholder.textColor, textAlign: placeholder.textAlign, fontSize: placeholder.fontSize, fontWeight: placeholder.fontWeight, blinkerColor: placeholder.blinkerColor, blinkerStyle: placeholder.blinkerStyle, blinkerSpeed: placeholder.blinkerSpeed });
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
    blinkerColor?: string;
    blinkerStyle?: 'pulse' | 'blink';
    blinkerSpeed?: 'slow' | 'medium' | 'fast';
  }) => {
    if (!editingContent) return;
    setPlaceholders(prev => prev.map(p =>
      p.id === editingContent.id
        ? { ...p, type: data.type, content: data.content, link: data.link, buttonColor: data.buttonColor, textColor: data.textColor, textAlign: data.textAlign, fontSize: data.fontSize, fontWeight: data.fontWeight, blinkerColor: data.blinkerColor, blinkerStyle: data.blinkerStyle, blinkerSpeed: data.blinkerSpeed }
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
        const buttonFontSize = placeholder.fontSize || 16; // Fixed font size from editor
        
        return (
          <a
            href={placeholder.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full px-3 flex items-center justify-center font-bold hover:opacity-90 transition-all rounded-lg"
            style={{ 
              backgroundColor: buttonColor,
              color: buttonTextColor,
              fontSize: `${buttonFontSize}px`, // Fixed size, doesn't scale
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {placeholder.content}
          </a>
        );
      
      case 'blinker':
        const blinkerColor = placeholder.blinkerColor || '#FF0000';
        const blinkerTextColor = placeholder.textColor || '#FFFFFF';
        const blinkerFontSize = placeholder.fontSize || 16;
        const blinkerStyle = placeholder.blinkerStyle || 'pulse';
        const blinkerSpeed = placeholder.blinkerSpeed || 'medium';
        const animationClass = `animate-blinker-${blinkerStyle}-${blinkerSpeed}`;
        
        const BlinkerWrapper = placeholder.link ? 'a' : 'div';
        const blinkerWrapperProps = placeholder.link
          ? {
              href: placeholder.link,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: `w-full h-full flex items-center justify-center ${animationClass}`,
            }
          : {
              className: `w-full h-full flex items-center justify-center ${animationClass}`,
            };
        
        return (
          <BlinkerWrapper {...blinkerWrapperProps as any}>
            <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="17" stroke={blinkerColor} strokeWidth="6" fill="none" />
              <circle cx="24" cy="24" r="6" fill={blinkerTextColor} />
            </svg>
          </BlinkerWrapper>
        );
      
      case 'video':
        // Check if content is an iframe embed or a direct video URL
        const isIframe = placeholder.content.trim().startsWith('<iframe');
        const isVideoUrl = placeholder.content.trim().match(/\.(mp4|webm|ogg)$/i);
        
        if (isIframe) {
          // Render YouTube/Vimeo iframe embed
          return (
            <div className="w-full h-full">
              <div 
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                dangerouslySetInnerHTML={{ __html: placeholder.content }}
              />
            </div>
          );
        } else if (isVideoUrl || placeholder.content.trim().startsWith('http')) {
          // Render direct video URL
          return (
            <div className="w-full h-full">
              <video 
                className="w-full h-full object-contain"
                controls
                src={placeholder.content}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else {
          // Empty or invalid video content
          return (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
              Click settings to add video
            </div>
          );
        }
      
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
        // When not in edit mode, provide handler to trigger edit mode
        onEditStateChange(false, {
          addButton: () => setIsEditMode(true), // Edit Layout button uses this
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

                  {/* Lounge - Current */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md"
                    style={{ backgroundColor: brandColor }}
                  >
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Lounge</span>
                  </button>

                  {/* Booth */}
                  <button
                    onClick={() => onNavigate('booth-marketplace')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#10B759] hover:bg-[#10B759] hover:text-white transition-all group"
                  >
                    <Store className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                    <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Booths</span>
                  </button>
                </>
              )}
            </div>

            {/* Right Side - Live Update Scrolling Notification */}
            <div className="flex-1 flex items-center rounded-lg overflow-hidden max-w-2xl ml-4"
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

            {/* Edit Controls Removed - Moved to Top Navigation */}
          </div>
        </div>
      </div>

      {/* Main Content - Image with Overlay Panel */}
      <div className="flex-1 px-4 md:px-8 py-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden flex items-center justify-center">
        {/* Container with relative positioning for accurate panel placement */}
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
                  className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize flex items-center justify-center transition-all z-10"
                  style={{ 
                    cursor: 'nwse-resize',
                    backgroundColor: brandColor,
                    minWidth: '20px',
                    minHeight: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = darkerBrandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = brandColor;
                  }}
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
              placeholder="Start a conversation with other attendees..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
            />
            <button
              onClick={handlePostComment}
              className="px-6 py-2.5 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
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
    </div>
  );
}