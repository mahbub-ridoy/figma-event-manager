import { useState, useRef } from 'react';
import { Camera, Download, X, Type, Smile, Share2 } from 'lucide-react';

interface VirtualPhotoBoothProps {
  onClose: () => void;
}

export function VirtualPhotoBooth({ onClose }: VirtualPhotoBoothProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState('classic');
  const [textOverlay, setTextOverlay] = useState('');
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frames = [
    { id: 'classic', name: 'Classic', color: 'from-[#10B759] to-[#0E9F4D]' },
    { id: 'elegant', name: 'Elegant', color: 'from-purple-600 to-pink-600' },
    { id: 'modern', name: 'Modern', color: 'from-blue-600 to-cyan-600' },
    { id: 'vibrant', name: 'Vibrant', color: 'from-orange-500 to-red-500' }
  ];

  const stickers = ['🎉', '🎊', '🏆', '⭐', '💡', '🚀', '💼', '🎯', '👏', '🎪', '🎭', '🎨'];

  const capturePhoto = () => {
    // In production, this would use device camera or screen capture
    // For demo, we'll use a placeholder
    setCapturedImage('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800');
  };

  const downloadPhoto = () => {
    if (!capturedImage) return;
    
    // In production, this would create a canvas with frame + text + stickers and download
    alert('Photo downloaded! (This would save the customized image in production)');
  };

  const sharePhoto = () => {
    if (!capturedImage) return;
    
    alert('Share to social media! (This would open social sharing options in production)');
  };

  const selectedFrameData = frames.find(f => f.id === selectedFrame);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">Virtual Photo Booth</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Panel - Controls */}
            <div className="space-y-4">
              {/* Frame Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  🖼️ Frame Style
                </label>
                <div className="space-y-2">
                  {frames.map(frame => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedFrame === frame.id
                          ? 'border-[#10B759] bg-green-50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">{frame.name}</span>
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${frame.color}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Overlay */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Text Overlay
                </label>
                <input
                  type="text"
                  value={textOverlay}
                  onChange={(e) => setTextOverlay(e.target.value)}
                  placeholder="Add text to your photo..."
                  maxLength={50}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                />
              </div>

              {/* Stickers */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  Stickers
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {stickers.map(sticker => (
                    <button
                      key={sticker}
                      onClick={() => setSelectedSticker(sticker)}
                      className={`aspect-square flex items-center justify-center text-2xl rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedSticker === sticker
                          ? 'border-[#10B759] bg-green-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capture Button */}
              {!capturedImage && (
                <button
                  onClick={capturePhoto}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-bold flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </button>
              )}
            </div>

            {/* Center & Right - Preview */}
            <div className="col-span-2">
              <div className="sticky top-0">
                {/* Photo Frame */}
                <div className={`relative bg-gradient-to-r ${selectedFrameData?.color} p-4 rounded-2xl shadow-2xl`}>
                  <div className="bg-white p-2 rounded-lg">
                    {capturedImage ? (
                      <div className="relative aspect-video bg-slate-100 rounded overflow-hidden">
                        <img 
                          src={capturedImage} 
                          alt="Captured"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Text Overlay */}
                        {textOverlay && (
                          <div className="absolute top-4 left-0 right-0 text-center">
                            <div className="inline-block px-4 py-2 bg-black/70 text-white font-bold text-xl rounded-lg">
                              {textOverlay}
                            </div>
                          </div>
                        )}

                        {/* Sticker */}
                        {selectedSticker && (
                          <div className="absolute bottom-4 right-4 text-6xl animate-bounce">
                            {selectedSticker}
                          </div>
                        )}

                        {/* Event Branding */}
                        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 rounded-lg">
                          <div className="text-xs font-bold text-[#10B759]">mypeople.ai Event 2026</div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-slate-100 rounded flex items-center justify-center">
                        <div className="text-center text-slate-400">
                          <Camera className="w-16 h-16 mx-auto mb-3" />
                          <p className="text-sm">Click "Capture Photo" to start</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {capturedImage && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setCapturedImage(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium text-sm"
                    >
                      Retake
                    </button>
                    <button
                      onClick={downloadPhoto}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={sharePhoto}
                      className="px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                )}

                {/* Info */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-900">
                    📸 Capture memories from the event with custom frames and stickers!
                    Share your photos on social media to spread the word.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
