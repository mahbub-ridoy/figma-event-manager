import { useState } from 'react';
import { X, Image as ImageIcon, Type, MousePointer, AlignLeft, AlignCenter, AlignRight, Bold, Radio, Video } from 'lucide-react';

interface PlaceholderEditorProps {
  placeholder: {
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
    blinkerStyle?: 'pulse' | 'blink' | 'glow';
    blinkerSpeed?: 'slow' | 'medium' | 'fast';
  };
  onSave: (data: {
    type: 'image' | 'text' | 'button' | 'blinker' | 'video';
    content: string;
    link?: string;
    buttonColor?: string;
    textColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: number;
    fontWeight?: number;
    blinkerColor?: string;
    blinkerStyle?: 'pulse' | 'blink' | 'glow';
    blinkerSpeed?: 'slow' | 'medium' | 'fast';
  }) => void;
  onCancel: () => void;
}

export function PlaceholderEditor({ placeholder, onSave, onCancel }: PlaceholderEditorProps) {
  const [type, setType] = useState(placeholder.type);
  const [content, setContent] = useState(placeholder.content);
  const [link, setLink] = useState(placeholder.link || '');
  const [buttonColor, setButtonColor] = useState(placeholder.buttonColor || '#10B759');
  const [textColor, setTextColor] = useState(placeholder.textColor || (placeholder.type === 'button' ? '#FFFFFF' : '#000000'));
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(placeholder.textAlign || 'center');
  const [fontSize, setFontSize] = useState(placeholder.fontSize || (placeholder.type === 'button' ? 16 : 24));
  const [fontWeight, setFontWeight] = useState(placeholder.fontWeight || 400);
  
  // Blinker states
  const [blinkerColor, setBlinkerColor] = useState(placeholder.blinkerColor || '#FFFFFF');
  const [blinkerStyle, setBlinkerStyle] = useState<'pulse' | 'blink' | 'glow'>(placeholder.blinkerStyle || 'pulse');
  const [blinkerSpeed, setBlinkerSpeed] = useState<'slow' | 'medium' | 'fast'>(placeholder.blinkerSpeed || 'medium');

  const handleSave = () => {
    onSave({
      type,
      content: type === 'blinker' ? content : content,
      link: link.trim() || undefined,
      buttonColor: type === 'button' ? buttonColor : undefined,
      textColor: (type === 'text' || type === 'button' || type === 'blinker') ? textColor : undefined,
      textAlign: type === 'text' ? textAlign : undefined,
      fontSize: (type === 'text' || type === 'button') ? fontSize : undefined,
      fontWeight: type === 'text' ? fontWeight : undefined,
      blinkerColor: type === 'blinker' ? blinkerColor : undefined,
      blinkerStyle: type === 'blinker' ? blinkerStyle : undefined,
      blinkerSpeed: type === 'blinker' ? blinkerSpeed : undefined,
    });
  };

  // Blinker design library
  const blinkerDesigns = [
    { 
      id: 'circle', 
      name: 'Circle',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" stroke={ringColor} strokeWidth="4" fill="none" />
          <circle cx="24" cy="24" r="6" fill={centerColor} />
        </svg>
      )
    },
    { 
      id: 'dot', 
      name: 'Dot',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="8" fill={centerColor} />
        </svg>
      )
    },
    { 
      id: 'ring', 
      name: 'Ring',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="15" stroke={ringColor} strokeWidth="6" fill="none" />
        </svg>
      )
    },
    { 
      id: 'pin', 
      name: 'Pin',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <path d="M24 4C16.268 4 10 10.268 10 18c0 9.75 14 26 14 26s14-16.25 14-26c0-7.732-6.268-14-14-14z" fill={ringColor} />
          <circle cx="24" cy="18" r="5" fill={centerColor} />
        </svg>
      )
    },
    { 
      id: 'star', 
      name: 'Star',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <path d="M24 4l5.5 11.1L42 17l-9 8.8 2.1 12.7L24 33l-11.1 5.5L15 25.8 6 17l12.5-1.9L24 4z" fill={ringColor} />
          <circle cx="24" cy="21" r="4" fill={centerColor} />
        </svg>
      )
    },
    { 
      id: 'pulse', 
      name: 'Pulse',
      svg: (ringColor: string, centerColor: string) => (
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" stroke={ringColor} strokeWidth="2" fill="none" opacity="0.3" />
          <circle cx="24" cy="24" r="14" stroke={ringColor} strokeWidth="3" fill="none" opacity="0.6" />
          <circle cx="24" cy="24" r="8" fill={centerColor} />
        </svg>
      )
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Edit Placeholder</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Placeholder Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setType('image')}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  type === 'image'
                    ? 'border-[#10B759] bg-[#10B759]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <ImageIcon className={`w-5 h-5 ${type === 'image' ? 'text-[#10B759]' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${type === 'image' ? 'text-[#10B759]' : 'text-slate-600'}`}>
                  Image
                </span>
              </button>

              <button
                onClick={() => setType('text')}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  type === 'text'
                    ? 'border-[#10B759] bg-[#10B759]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Type className={`w-5 h-5 ${type === 'text' ? 'text-[#10B759]' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${type === 'text' ? 'text-[#10B759]' : 'text-slate-600'}`}>
                  Text
                </span>
              </button>

              <button
                onClick={() => setType('button')}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  type === 'button'
                    ? 'border-[#10B759] bg-[#10B759]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <MousePointer className={`w-5 h-5 ${type === 'button' ? 'text-[#10B759]' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${type === 'button' ? 'text-[#10B759]' : 'text-slate-600'}`}>
                  Button
                </span>
              </button>

              <button
                onClick={() => setType('blinker')}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  type === 'blinker'
                    ? 'border-[#10B759] bg-[#10B759]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Radio className={`w-5 h-5 ${type === 'blinker' ? 'text-[#10B759]' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${type === 'blinker' ? 'text-[#10B759]' : 'text-slate-600'}`}>
                  Blinker
                </span>
              </button>

              <button
                onClick={() => setType('video')}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  type === 'video'
                    ? 'border-[#10B759] bg-[#10B759]/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Video className={`w-5 h-5 ${type === 'video' ? 'text-[#10B759]' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${type === 'video' ? 'text-[#10B759]' : 'text-slate-600'}`}>
                  Video
                </span>
              </button>
            </div>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {type === 'image' ? 'Image URL' : type === 'text' ? 'Text Content' : type === 'video' ? 'Video Embed Code or URL' : 'Button Label'}
            </label>
            {type === 'text' ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your text content here..."
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
              />
            ) : type === 'video' ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste YouTube iframe code OR video URL (https://example.com/video.mp4)"
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm font-mono text-xs"
              />
            ) : (
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'image' ? 'https://example.com/image.jpg' : 'Button Text'}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
              />
            )}
            
            {/* Video Helper Text */}
            {type === 'video' && (
              <div className="mt-2 space-y-2">
                <p className="text-xs text-slate-600">
                  <strong>Option 1:</strong> Paste YouTube/Vimeo embed code (starts with &lt;iframe...)
                </p>
                <p className="text-xs text-slate-600">
                  <strong>Option 2:</strong> Enter direct video URL (.mp4, .webm, .ogg)
                </p>
                <p className="text-xs text-slate-500 italic">
                  Note: For video file uploads, host your video online first, then paste the URL
                </p>
              </div>
            )}
            
            {/* Image Preview */}
            {type === 'image' && content && (
              <div className="mt-2">
                <img
                  src={content}
                  alt="Preview"
                  className="max-w-full h-32 object-contain rounded border border-slate-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
          </div>

          {/* Button Style Selection */}
          {type === 'button' && (
            <>
              {/* Button Preview */}
              <div>
                <div 
                  className="w-full px-6 py-3 rounded-lg text-center font-bold"
                  style={{
                    backgroundColor: buttonColor,
                    color: textColor,
                    fontSize: `${fontSize}px`
                  }}
                >
                  {content || 'Button'}
                </div>
              </div>

              {/* Color Pickers Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    BG Color
                  </label>
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-full h-10 border border-slate-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 border border-slate-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Text Inputs Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Button"
                    className="w-full px-3 py-2 border-2 border-[#10B759] rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="URL Here"
                    className="w-full px-3 py-2 border-2 border-[#10B759] rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                  />
                </div>
              </div>

              {/* Font Size Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Font Size (8-72px)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    min="8"
                    max="72"
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10B759]"
                  />
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    min="8"
                    max="72"
                    className="w-16 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] text-sm text-center"
                  />
                </div>
              </div>
            </>
          )}

          {/* Link Input for non-button types */}
          {type !== 'button' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Link URL (Optional)
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">
                Make this entire placeholder clickable by adding a link
              </p>
            </div>
          )}

          {/* Text Formatting - Compact Layout */}
          {type === 'text' && (
            <>
              {/* Row 1: Text Color and Font Size */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 border border-slate-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Font Size (8-72px)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      min="8"
                      max="72"
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10B759]"
                    />
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      min="8"
                      max="72"
                      className="w-14 px-2 py-1 border border-slate-300 rounded text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Text Alignment and Font Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Alignment
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTextAlign('left')}
                      className={`flex-1 px-2 py-2 rounded-lg transition-all flex items-center justify-center ${
                        textAlign === 'left'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTextAlign('center')}
                      className={`flex-1 px-2 py-2 rounded-lg transition-all flex items-center justify-center ${
                        textAlign === 'center'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTextAlign('right')}
                      className={`flex-1 px-2 py-2 rounded-lg transition-all flex items-center justify-center ${
                        textAlign === 'right'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFontWeight(400)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        fontWeight === 400
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setFontWeight(700)}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center ${
                        fontWeight === 700
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Compact Preview */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p 
                  style={{ 
                    fontSize: `${fontSize}px`,
                    color: textColor,
                    textAlign: textAlign,
                    fontWeight: fontWeight
                  }}
                >
                  {content || 'Preview Text'}
                </p>
              </div>
            </>
          )}

          {/* Blinker Style Selection */}
          {type === 'blinker' && (
            <>
              {/* Blinker Design Library */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Choose Design
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {blinkerDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setContent(design.id)}
                      className={`p-3 border-2 rounded-lg transition-all hover:border-[#10B759] ${
                        content === design.id
                          ? 'border-[#10B759] bg-[#10B759]/10'
                          : 'border-slate-200'
                      }`}
                      title={design.name}
                    >
                      <div style={{ width: '100%', height: '40px' }}>
                        {design.svg(blinkerColor, textColor)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blinker Preview */}
              <div className="p-6 bg-slate-900 rounded-lg border border-slate-200 flex items-center justify-center">
                <div 
                  className={`animate-blinker-${blinkerStyle}-${blinkerSpeed}`}
                  style={{ width: '100px', height: '100px' }}
                >
                  {blinkerDesigns.find(d => d.id === content)?.svg(blinkerColor, textColor) || blinkerDesigns[0].svg(blinkerColor, textColor)}
                </div>
              </div>

              {/* Color Pickers Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={blinkerColor}
                      onChange={(e) => setBlinkerColor(e.target.value)}
                      className="w-full h-10 border border-slate-300 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setBlinkerColor('#FFFFFF')}
                      className="px-3 py-2 bg-white border-2 border-slate-300 rounded-lg hover:border-[#10B759] text-xs"
                    >
                      White
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 border border-slate-300 rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => setTextColor('#FCD34D')}
                      className="px-3 py-2 bg-yellow-300 border-2 border-yellow-400 rounded-lg hover:border-[#10B759] text-xs"
                    >
                      Yellow
                    </button>
                  </div>
                </div>
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Link URL (Optional)
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border-2 border-[#10B759] rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                />
              </div>

              {/* Blinker Animation Style and Speed */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Animation
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBlinkerStyle('pulse')}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        blinkerStyle === 'pulse'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Pulse
                    </button>
                    <button
                      onClick={() => setBlinkerStyle('blink')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center ${
                        blinkerStyle === 'blink'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Blink
                    </button>
                    <button
                      onClick={() => setBlinkerStyle('glow')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center ${
                        blinkerStyle === 'glow'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Glow
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Speed
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBlinkerSpeed('slow')}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        blinkerSpeed === 'slow'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Slow
                    </button>
                    <button
                      onClick={() => setBlinkerSpeed('medium')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center ${
                        blinkerSpeed === 'medium'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setBlinkerSpeed('fast')}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center ${
                        blinkerSpeed === 'fast'
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Fast
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}