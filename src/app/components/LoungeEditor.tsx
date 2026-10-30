import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Save, X } from 'lucide-react';

interface LoungeEditorProps {
  imageUrl: string;
  title: string;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onSave: (position: { x: number; y: number }, size: { width: number; height: number }) => void;
  onCancel: () => void;
}

export function LoungeEditor({
  imageUrl,
  title,
  initialPosition = { x: 70, y: 20 },
  initialSize = { width: 380, height: 600 },
  onSave,
  onCancel,
}: LoungeEditorProps) {
  const [panelPosition, setPanelPosition] = useState(initialPosition);
  const [panelSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    
    setIsDragging(true);
    const rect = imageContainerRef.current.getBoundingClientRect();
    const panelX = (panelPosition.x / 100) * rect.width;
    const panelY = (panelPosition.y / 100) * rect.height;
    
    setDragOffset({
      x: e.clientX - panelX,
      y: e.clientY - panelY,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    // Convert to percentage
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Clamp values to keep panel within bounds
    const clampedX = Math.max(0, Math.min(100, percentX));
    const clampedY = Math.max(0, Math.min(100, percentY));

    setPanelPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleSave = () => {
    onSave(panelPosition, panelSize);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Lounge Layout</h1>
            <p className="text-sm text-slate-600 mt-1">
              Drag the white panel to position it on your lounge image
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Layout
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 px-8 py-8 flex items-center justify-center overflow-hidden">
        <div
          ref={imageContainerRef}
          className="relative inline-block max-w-full max-h-[70vh]"
        >
          {/* Lounge Image */}
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
            style={{ aspectRatio: '1920/1080' }}
          />

          {/* White Placeholder Panel */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: `${panelPosition.x}%`,
              top: `${panelPosition.y}%`,
              width: `${(panelSize.width / 1920) * 100}%`,
              height: `${(panelSize.height / 1080) * 100}%`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            className="bg-white rounded-xl"
          >
            {/* Panel Content - Just a label */}
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-400 text-sm font-medium">Networking Panel</p>
                <p className="text-slate-300 text-xs mt-1">Drag to position</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border-t border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3 text-sm text-slate-600">
            <div className="flex-1">
              <p className="font-medium text-slate-900 mb-1">Instructions:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click and drag the white panel to position it on your lounge image</li>
                <li>The panel position will be saved and remain consistent across all devices</li>
                <li>Click "Save Layout" when you're done positioning the panel</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-900">Position</p>
              <p className="text-xs text-slate-500 mt-1">
                X: {panelPosition.x.toFixed(1)}% | Y: {panelPosition.y.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
