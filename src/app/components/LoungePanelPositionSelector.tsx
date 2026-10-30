import { useState, useRef, useEffect } from 'react';
import { X, Check, MapPin, Move, GripVertical, Maximize2, Type, Link as LinkIcon, Plus, Trash2, Edit2, ArrowUp, ArrowDown, MousePointer } from 'lucide-react';
import { ContentItem } from '../types';

interface LoungePanelPositionSelectorProps {
  imageUrl: string;
  onConfirm: (position: { x: number; y: number; width: number; height: number; content: ContentItem[]; scale: number }) => void;
  onCancel: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  initialContent?: ContentItem[];
  initialScale?: number;
}

export function LoungePanelPositionSelector({ 
  imageUrl, 
  onConfirm, 
  onCancel,
  initialPosition,
  initialSize,
  initialContent,
  initialScale
}: LoungePanelPositionSelectorProps) {
  const [position, setPosition] = useState(initialPosition || { x: 70, y: 20 });
  const [size, setSize] = useState(initialSize || { width: 380, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [contentScale, setContentScale] = useState(initialScale || 0.8);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent || []);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  const handlePanelMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      width: size.width,
      height: size.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let xPercent = (x / rect.width) * 100;
        let yPercent = (y / rect.height) * 100;

        xPercent = Math.max(5, Math.min(95, xPercent));
        yPercent = Math.max(5, Math.min(95, yPercent));

        setPosition({ x: xPercent, y: yPercent });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartRef.current.mouseX;
        const deltaY = e.clientY - resizeStartRef.current.mouseY;

        const newWidth = Math.max(200, Math.min(600, resizeStartRef.current.width + deltaX));
        const newHeight = Math.max(250, Math.min(800, resizeStartRef.current.height + deltaY));

        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleConfirm = () => {
    onConfirm({ ...position, ...size, content: contentItems, scale: contentScale });
  };

  const handleAddContent = (type: 'heading' | 'text' | 'button' | 'link') => {
    const newItem: ContentItem = {
      id: `item-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Heading' : type === 'text' ? 'New text content' : type === 'button' ? 'Click Me' : 'Link Text',
      url: type === 'link' || type === 'button' ? 'https://example.com' : undefined,
      style: type === 'button' ? 'primary' : undefined,
    };
    setContentItems([...contentItems, newItem]);
  };

  const handleUpdateContent = (id: string, updates: Partial<ContentItem>) => {
    const updatedItems = contentItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setContentItems(updatedItems);
  };

  const handleDeleteContent = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  const handleMoveContent = (id: string, direction: 'up' | 'down') => {
    const index = contentItems.findIndex(item => item.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= contentItems.length) return;

    const newItems = [...contentItems];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setContentItems(newItems);
  };

  const renderContentPreview = (item: ContentItem) => {
    switch (item.type) {
      case 'heading':
        return (
          <h3 className="text-xl font-bold text-[#10B759]">{item.content}</h3>
        );
      case 'text':
        return (
          <p className="text-sm text-slate-700">{item.content}</p>
        );
      case 'button':
        const buttonStyle = item.style === 'primary' 
          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
          : item.style === 'secondary'
          ? 'bg-[#5B7C8F] text-white'
          : 'border-2 border-[#10B759] text-[#10B759] bg-transparent';
        return (
          <button className={`w-full px-4 py-2 rounded font-medium ${buttonStyle}`}>
            {item.content}
          </button>
        );
      case 'link':
        return (
          <a href={item.url} className="text-[#10B759] underline hover:text-[#0E9F4D] flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            {item.content}
          </a>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-white/10 max-w-[95vw] w-full max-h-[95vh] overflow-hidden flex">
        
        {/* Left Side - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-white/10 bg-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#10B759]/20 rounded-lg">
                <MapPin className="w-6 h-6 text-[#10B759]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Position & Configure Panel</h2>
                <p className="text-sm text-slate-400">Drag to move • Resize • Add content</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-white" />
            </button>
          </div>

          {/* Image Area with Draggable Panel */}
          <div className="flex-1 p-6 overflow-auto">
            <div 
              ref={imageRef}
              className="relative rounded-xl overflow-hidden border-2 border-[#10B759]/30 inline-block min-w-full"
              style={{ aspectRatio: '1920/1080' }}
            >
              <img 
                src={imageUrl} 
                alt="Lounge Preview"
                className="w-full h-auto select-none"
                draggable={false}
                style={{ aspectRatio: '1920/1080' }}
              />

              {/* Draggable & Resizable Panel Preview */}
              <div
                ref={panelRef}
                onMouseDown={handlePanelMouseDown}
                className={`absolute cursor-move select-none ${(isDragging || isResizing) ? 'scale-105' : 'hover:scale-105'} transition-transform`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                }}
              >
                {/* Positioning Guides */}
                {isDragging && (
                  <>
                    <div 
                      className="absolute top-1/2 left-1/2 w-0.5 bg-[#10B759]/50 pointer-events-none"
                      style={{
                        height: '200vh',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                    <div 
                      className="absolute top-1/2 left-1/2 h-0.5 bg-[#10B759]/50 pointer-events-none"
                      style={{
                        width: '200vw',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </>
                )}

                {/* Panel Preview */}
                <div className={`bg-white rounded-xl shadow-2xl h-full flex flex-col transition-all`}>
                  {/* Panel Content Preview */}
                  <div 
                    className="p-4 space-y-3 flex-1 overflow-y-auto" 
                    style={{ 
                      transform: `scale(${contentScale})`, 
                      transformOrigin: 'top center' 
                    }}
                  >
                    {contentItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-8">
                        <MousePointer className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-sm">No content added yet</p>
                        <p className="text-xs mt-1">Use the right panel to add content</p>
                      </div>
                    ) : (
                      contentItems.map(item => (
                        <div key={item.id} className="pointer-events-none">
                          {renderContentPreview(item)}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Resize Handle */}
                  <div 
                    className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize bg-[#10B759] rounded-tl-lg rounded-br-lg flex items-center justify-center group hover:bg-[#0E9F4D] transition-colors"
                    onMouseDown={handleResizeMouseDown}
                  >
                    <Maximize2 className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Position & Size Indicator */}
                {(isDragging || isResizing) && (
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl border border-[#10B759] whitespace-nowrap">
                    <p className="text-xs font-mono">
                      {isDragging && `X: ${position.x.toFixed(1)}% | Y: ${position.y.toFixed(1)}%`}
                      {isResizing && `W: ${size.width}px | H: ${size.height}px`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Position & Size Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <Move className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-semibold mb-1">Position</p>
                    <p className="text-sm text-slate-300">
                      {position.x.toFixed(1)}% left, {position.y.toFixed(1)}% top
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-lg border border-[#10B759]/30">
                <div className="flex items-start gap-3">
                  <Maximize2 className="w-5 h-5 text-[#10B759] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-semibold mb-1">Size</p>
                    <p className="text-sm text-slate-300">
                      {size.width}px × {size.height}px
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Content Scale Control */}
            <div className="mt-4 p-5 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-4 mb-3">
                <Maximize2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-1">Panel Content Scale</p>
                  <p className="text-xs text-slate-400">Adjust how large or small the content appears</p>
                </div>
                <div className="text-lg font-bold text-white bg-slate-800 px-3 py-1 rounded">
                  {(contentScale * 100).toFixed(0)}%
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 w-12">Tiny</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.05"
                  value={contentScale}
                  onChange={(e) => setContentScale(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10B759 0%, #10B759 ${((contentScale - 0.2) / 1.3) * 100}%, #334155 ${((contentScale - 0.2) / 1.3) * 100}%, #334155 100%)`
                  }}
                />
                <span className="text-xs text-slate-400 w-12 text-right">Large</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-white/10 bg-white/5 px-6 py-5 flex items-center justify-between flex-shrink-0">
            <button
              onClick={onCancel}
              className="px-8 py-3 rounded-lg border-2 border-white/20 text-white hover:bg-white/10 transition-all font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              className="px-10 py-3.5 rounded-lg font-medium transition-all flex items-center gap-2 bg-gradient-to-r from-[#10B759] to-emerald-600 text-white hover:shadow-xl hover:shadow-[#10B759]/40 hover:scale-105"
            >
              <Check className="w-5 h-5" />
              Confirm Configuration
            </button>
          </div>
        </div>

        {/* Right Side - Content Editor */}
        <div className="w-96 border-l border-white/10 bg-slate-900/50 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Panel Content</h3>
            <p className="text-sm text-slate-400">Add and customize content items</p>
          </div>

          {/* Add Content Buttons */}
          <div className="p-4 border-b border-white/10">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Add Element</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddContent('heading')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-white text-sm flex flex-col items-center gap-2"
              >
                <Type className="w-5 h-5" />
                Heading
              </button>
              <button
                onClick={() => handleAddContent('text')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-white text-sm flex flex-col items-center gap-2"
              >
                <Type className="w-5 h-5" />
                Text
              </button>
              <button
                onClick={() => handleAddContent('button')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-white text-sm flex flex-col items-center gap-2"
              >
                <MousePointer className="w-5 h-5" />
                Button
              </button>
              <button
                onClick={() => handleAddContent('link')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-white text-sm flex flex-col items-center gap-2"
              >
                <LinkIcon className="w-5 h-5" />
                Link
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {contentItems.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No content yet</p>
                <p className="text-xs mt-1">Click buttons above to add</p>
              </div>
            ) : (
              contentItems.map((item, index) => (
                <div key={item.id} className="bg-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveContent(item.id, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-slate-700 rounded disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleMoveContent(item.id, 'down')}
                        disabled={index === contentItems.length - 1}
                        className="p-1 hover:bg-slate-700 rounded disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(item.id)}
                        className="p-1 hover:bg-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">Content</label>
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => handleUpdateContent(item.id, { content: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded border border-slate-700 focus:border-[#10B759] focus:outline-none text-sm"
                      placeholder="Enter content..."
                    />
                  </div>

                  {(item.type === 'link' || item.type === 'button') && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">URL</label>
                      <input
                        type="text"
                        value={item.url || ''}
                        onChange={(e) => handleUpdateContent(item.id, { url: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 text-white rounded border border-slate-700 focus:border-[#10B759] focus:outline-none text-sm"
                        placeholder="https://example.com"
                      />
                    </div>
                  )}

                  {item.type === 'button' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Style</label>
                      <select
                        value={item.style || 'primary'}
                        onChange={(e) => handleUpdateContent(item.id, { style: e.target.value as 'primary' | 'secondary' | 'outline' })}
                        className="w-full px-3 py-2 bg-slate-900 text-white rounded border border-slate-700 focus:border-[#10B759] focus:outline-none text-sm"
                      >
                        <option value="primary">Primary (Green)</option>
                        <option value="secondary">Secondary (Blue)</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}