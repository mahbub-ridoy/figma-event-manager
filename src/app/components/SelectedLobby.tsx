import { useState, useRef, useEffect } from 'react';
import { Home, Users, Play, Store, MessageCircle, X, Settings, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PlaceholderEditor } from './PlaceholderEditor';
import { getDarkerShade } from '../utils/colorUtils';

interface SelectedLobbyProps {
  imageUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
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

export function SelectedLobby({ imageUrl, videoUrl, isVideo, title, onNavigate, isAdmin = false, onSaveLayout, initialPlaceholders = [], onEditStateChange, customization }: SelectedLobbyProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>(initialPlaceholders);
  const [draggedPlaceholder, setDraggedPlaceholder] = useState<string | null>(null);
  const [resizingPlaceholder, setResizingPlaceholder] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingContent, setEditingContent] = useState<EditingPlaceholder | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const placeholdersRef = useRef<Placeholder[]>(initialPlaceholders);
  const [videoError, setVideoError] = useState(false);

  // Dynamic brand colors
  const brandColor = customization?.brandColor || '#10B759';
  const darkerBrandColor = getDarkerShade(brandColor);
  const evenDarkerBrandColor = getDarkerShade(darkerBrandColor);

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

  const sampleComments = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      comment: 'Incredible virtual space! The design is so immersive and professional.',
      timestamp: '2m'
    },
    {
      id: 2,
      user: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      comment: 'This platform is amazing! The lobby looks fantastic.',
      timestamp: '5m'
    },
    {
      id: 3,
      user: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      comment: 'Love the modern aesthetics! Great job on this experience.',
      timestamp: '8m'
    },
    {
      id: 4,
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      comment: 'Very impressed with the quality and attention to detail.',
      timestamp: '12m'
    },
    {
      id: 5,
      user: 'Alexandra Martinez',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      comment: 'The lobby space is beautifully designed. Looking forward to networking!',
      timestamp: '15m'
    },
    {
      id: 6,
      user: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      comment: 'Fantastic event platform. The user experience is top-notch!',
      timestamp: '18m'
    },
  ];

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
      content: type === 'button' ? 'Click Here' : type === 'text' ? 'Welcome to Lobby' : type === 'blinker' ? 'circle' : type === 'video' ? '' : 'https://via.placeholder.com/380x600',
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
        setEditingContent({ 
          id: placeholderId, 
          type: placeholder.type, 
          content: placeholder.content, 
          link: placeholder.link, 
          buttonColor: placeholder.buttonColor, 
          textColor: placeholder.textColor, 
          textAlign: placeholder.textAlign, 
          fontSize: placeholder.fontSize, 
          fontWeight: placeholder.fontWeight,
          blinkerColor: placeholder.blinkerColor,
          blinkerStyle: placeholder.blinkerStyle,
          blinkerSpeed: placeholder.blinkerSpeed
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
    const WrapperComponent = placeholder.link && placeholder.type !== 'button' && placeholder.type !== 'blinker'
      ? 'a'
      : 'div';
    
    const wrapperProps = placeholder.link && placeholder.type !== 'button' && placeholder.type !== 'blinker'
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
      {/* Compact Navigation Bar - Very Top */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Left Side - Navigation Buttons */}
            <div className="flex items-center gap-3">
              {/* Lobby - Current */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md"
                style={{ backgroundColor: brandColor }}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Lobby</span>
              </button>

              {/* Auditorium */}
              <button
                onClick={() => onNavigate('auditorium')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 transition-all group"
                style={{
                  ['--hover-border-color' as any]: brandColor,
                  ['--hover-bg-color' as any]: brandColor
                }}
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

              {/* Sessions */}
              <button
                onClick={() => onNavigate('sessions')}
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
                <Calendar className="w-4 h-4 text-[#5B7C8F] group-hover:text-white" />
                <span className="text-sm font-medium text-[#5B7C8F] group-hover:text-white">Sessions</span>
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

      {/* Full Image with Placeholders */}
      <div className="flex-1 relative px-4 md:px-8 py-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden flex items-center justify-center">
        <div ref={imageContainerRef} className="relative inline-block max-w-full max-h-[60vh] md:max-h-[70vh]">
          {isVideo && videoUrl && !videoError ? (
            <video
              key={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="max-w-full max-h-[60vh] md:max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-lg"
              style={{ display: 'block', aspectRatio: '1920/1080' }}
              onError={(e) => {
                const videoElement = e.target as HTMLVideoElement;
                const error = videoElement.error;
                console.error('Video failed to load:', videoUrl);
                if (error) {
                  console.error('Error code:', error.code);
                  console.error('Error message:', error.message);
                }
                setVideoError(true);
              }}
              onLoadedData={() => {
                console.log('Video loaded successfully:', videoUrl);
                setVideoError(false);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-xl shadow-lg"
              style={{ aspectRatio: '1920/1080' }}
            />
          )}
          
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
                    className="absolute -top-2 -left-2 w-8 h-8 text-white rounded-full flex items-center justify-center transition-all z-10"
                    style={{ backgroundColor: brandColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = darkerBrandColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = brandColor;
                    }}
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

      {/* Compact Comments Section */}
      <div className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#5B7C8F' }}>
              <MessageCircle className="w-4 h-4" style={{ color: brandColor }} />
              Attendee Comments ({sampleComments.length})
            </h3>
          </div>

          {/* Add Comment Input - Compact */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 mb-3">
            <div className="flex gap-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none transition-colors"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = brandColor;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '';
                  }}
                />
                <button
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all shadow-sm flex-shrink-0"
                  style={{ backgroundColor: brandColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = darkerBrandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = brandColor;
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Comments Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {sampleComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className="flex gap-2">
                  {/* Avatar */}
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  
                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-xs truncate" style={{ color: '#5B7C8F' }}>
                        {comment.user}
                      </h4>
                      <span className="text-xs text-slate-400 flex-shrink-0">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}