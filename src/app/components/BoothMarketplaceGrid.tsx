import { Home, Users, Play, Store, Building2 } from 'lucide-react';

interface Booth {
  id: string;
  title: string;
  imageUrl: string;
}

interface BoothMarketplaceGridProps {
  booths: Booth[];
  onSelectBooth: (boothId: string) => void;
  onNavigate?: (page: string) => void;
}

export function BoothMarketplaceGrid({ booths, onSelectBooth, onNavigate }: BoothMarketplaceGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top Navigation Pills */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-8">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B759] text-white shadow-md"
                >
                  <Store className="w-4 h-4" />
                  <span className="text-sm font-medium">Booths</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Exhibitor Booths</h1>
          <p className="text-lg text-slate-600">Explore company booths and connect with exhibitors</p>
        </div>

        {/* Booth Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booths.map((booth) => (
            <button
              key={booth.id}
              onClick={() => onSelectBooth(booth.id)}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#10B759]"
            >
              {/* Booth Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={booth.imageUrl}
                  alt={booth.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: '1920/1080' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Booth Info */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#10B759] transition-colors">
                      {booth.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm font-medium text-[#10B759]">Visit Booth →</span>
                  <div className="w-8 h-8 bg-[#10B759]/10 rounded-full flex items-center justify-center group-hover:bg-[#10B759] transition-colors">
                    <Store className="w-4 h-4 text-[#10B759] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}