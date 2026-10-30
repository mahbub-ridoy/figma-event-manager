import { useState } from 'react';
import { X, Check, Download, GitCompare } from 'lucide-react';

interface Booth {
  id: string;
  title: string;
  imageUrl: string;
  company?: string;
  description?: string;
  features?: string[];
  resources?: number;
  category?: string;
}

interface BoothComparisonToolProps {
  allBooths: Booth[];
  onClose: () => void;
}

export function BoothComparisonTool({ allBooths, onClose }: BoothComparisonToolProps) {
  const [selectedBooths, setSelectedBooths] = useState<Booth[]>([]);

  const toggleBooth = (booth: Booth) => {
    if (selectedBooths.find(b => b.id === booth.id)) {
      setSelectedBooths(prev => prev.filter(b => b.id !== booth.id));
    } else if (selectedBooths.length < 3) {
      setSelectedBooths(prev => [...prev, booth]);
    }
  };

  const exportComparison = () => {
    // In a real app, this would generate a PDF
    alert('Comparison exported! (This would download a PDF in production)');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitCompare className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">Booth Comparison Tool</h3>
              <p className="text-sm text-white/90">Select up to 3 booths to compare side-by-side</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Booth Selection */}
          {selectedBooths.length < 3 && (
            <div className="bg-slate-50 border-b border-slate-200 p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Select Booths ({selectedBooths.length}/3)
              </h4>
              <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                {allBooths.map(booth => {
                  const isSelected = selectedBooths.find(b => b.id === booth.id);
                  return (
                    <button
                      key={booth.id}
                      onClick={() => toggleBooth(booth)}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-[#10B759] bg-green-50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-[#10B759] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <img 
                        src={booth.imageUrl} 
                        alt={booth.title}
                        className="w-full h-16 object-cover rounded mb-2"
                      />
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {booth.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comparison Table */}
          {selectedBooths.length > 0 ? (
            <div className="p-6">
              {/* Export Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={exportComparison}
                  className="px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export as PDF
                </button>
              </div>

              {/* Comparison Grid */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedBooths.length}, 1fr)` }}>
                {selectedBooths.map((booth) => (
                  <div key={booth.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    {/* Booth Header */}
                    <div className="relative">
                      <img 
                        src={booth.imageUrl} 
                        alt={booth.title}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        onClick={() => toggleBooth(booth)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{booth.title}</h4>
                      {booth.company && (
                        <p className="text-sm text-slate-600 mb-3">{booth.company}</p>
                      )}

                      {/* Features */}
                      <div className="space-y-3">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs font-semibold text-slate-500 mb-1">CATEGORY</div>
                          <div className="text-sm font-medium text-slate-900">
                            {booth.category || 'Technology'}
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs font-semibold text-slate-500 mb-1">RESOURCES</div>
                          <div className="text-sm font-medium text-slate-900">
                            {booth.resources || 5} downloadable items
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs font-semibold text-slate-500 mb-2">KEY FEATURES</div>
                          <ul className="space-y-1">
                            {(booth.features || [
                              'Live demos available',
                              'Meeting scheduling',
                              'Product documentation',
                              'Customer support'
                            ]).slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <Check className="w-3 h-3 text-[#10B759] flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs font-semibold text-slate-500 mb-1">OFFERINGS</div>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-white text-xs font-medium text-slate-700 rounded">
                              Products
                            </span>
                            <span className="px-2 py-1 bg-white text-xs font-medium text-slate-700 rounded">
                              Services
                            </span>
                            <span className="px-2 py-1 bg-white text-xs font-medium text-slate-700 rounded">
                              Support
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Summary */}
              {selectedBooths.length > 1 && (
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                  <h5 className="font-bold text-slate-900 mb-2">Quick Comparison</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600 mb-1">Most Resources</div>
                      <div className="font-semibold text-slate-900">
                        {[...selectedBooths].sort((a, b) => 
                          (b.resources || 5) - (a.resources || 5)
                        )[0].title}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 mb-1">Most Features</div>
                      <div className="font-semibold text-slate-900">
                        {[...selectedBooths].sort((a, b) => 
                          (b.features?.length || 4) - (a.features?.length || 4)
                        )[0].title}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 mb-1">Recommended</div>
                      <div className="font-semibold text-[#10B759]">
                        {selectedBooths[0].title}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <GitCompare className="w-16 h-16 mb-3" />
              <p className="text-sm">Select booths above to start comparing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
