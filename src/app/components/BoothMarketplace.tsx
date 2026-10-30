import { useState } from 'react';
import { X } from 'lucide-react';
import booth1Image from 'figma:asset/8db5455991694191282d851d9c2fffcf724e9041.png';
import booth2Image from 'figma:asset/1732dfa051a8bfe6a6715eb0a0ef4bde7e5cd629.png';
import booth3Image from 'figma:asset/c2da6ff143aec92c33f821de6bf87b174c20fe8d.png';
import booth4Image from 'figma:asset/6e3ff5547baad4d3a42e172f1e19c983c82e1cc9.png';
import booth5Image from 'figma:asset/47a9e556804e32615685ca74d063a5704e956e32.png';
import booth6Image from 'figma:asset/5551db020f9658b541a833b42a1334a5dbb86397.png';

interface Booth {
  id: number;
  title: string;
  description: string;
  company: string;
  imageUrl?: string;
}

const booths: Booth[] = [
  {
    id: 1,
    title: 'Booth 1',
    description: 'Professional ecommerce Platform with integrated payment solutions and analytics dashboard',
    company: 'TechVentures Inc.',
    imageUrl: booth1Image
  },
  {
    id: 2,
    title: 'Booth 2',
    description: 'Professional ecommerce Platform for enterprise-level businesses and retail solutions',
    company: 'Global Commerce',
    imageUrl: booth2Image
  },
  {
    id: 3,
    title: 'Booth 3',
    description: 'Professional ecommerce Platform offering seamless checkout and inventory management',
    company: 'Digital Markets Pro',
    imageUrl: booth3Image
  },
  {
    id: 4,
    title: 'Booth 4',
    description: 'Professional ecommerce Platform with AI-powered recommendations and customer insights',
    company: 'SmartShop Solutions',
    imageUrl: booth4Image
  },
  {
    id: 5,
    title: 'Booth 5',
    description: 'Professional ecommerce Platform featuring multi-channel selling and automation tools',
    company: 'Retail Innovation Labs',
    imageUrl: booth5Image
  },
  {
    id: 6,
    title: 'Booth 6',
    description: 'Professional ecommerce Platform designed for scalability and global reach',
    company: 'WorldWide Trade',
    imageUrl: booth6Image
  },
];

export function BoothMarketplace() {
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7F0] to-white px-16 py-12">
      <div className="mb-8">
        <h1 className="font-['Inter'] text-4xl font-bold text-[#5B7C8F]">Booth Marketplace</h1>
        <p className="mt-2 font-['Inter'] text-lg text-[#64748b]">
          Explore our exhibitor booths and discover innovative solutions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {booths.map((booth) => (
          <div
            key={booth.id}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_8px_24px_rgba(0,168,45,0.15)]"
          >
            {booth.imageUrl && (
              <div className="aspect-video w-full overflow-hidden bg-slate-100">
                <img 
                  src={booth.imageUrl} 
                  alt={booth.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-['Inter'] text-xl font-semibold text-[#334155]">{booth.title}</h3>
              <p className="mt-1 font-['Inter'] text-sm font-medium text-[#10B759]">{booth.company}</p>
              <p className="mt-4 flex-1 font-['Inter'] text-sm leading-relaxed text-[#64748b]">
                {booth.description}
              </p>
              <button
                onClick={() => setSelectedBooth(booth)}
                className="mt-6 rounded-[4px] bg-[#10B759] px-6 py-3 font-['Inter'] text-sm font-medium text-white shadow-[0_2px_8px_rgba(16,183,89,0.3)] transition-all hover:bg-[#0E9F4D] hover:shadow-[0_4px_12px_rgba(16,183,89,0.4)]"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booth Details Overlay */}
      {selectedBooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8">
          <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setSelectedBooth(null)}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-slate-100"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="font-['Inter'] text-3xl font-bold text-[#334155]">{selectedBooth.title}</h2>
            <p className="mt-2 font-['Inter'] text-lg font-medium text-[#10B759]">{selectedBooth.company}</p>
            
            {selectedBooth.imageUrl && (
              <div className="mt-6 overflow-hidden rounded-lg">
                <img 
                  src={selectedBooth.imageUrl} 
                  alt={selectedBooth.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-['Inter'] text-lg font-semibold text-[#334155]">About</h3>
                <p className="mt-2 font-['Inter'] text-sm leading-relaxed text-[#64748b]">
                  {selectedBooth.description}
                </p>
              </div>
              
              <div>
                <h3 className="font-['Inter'] text-lg font-semibold text-[#334155]">Features</h3>
                <ul className="mt-2 space-y-2 font-['Inter'] text-sm text-[#64748b]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#10B759]"></span>
                    <span>Advanced analytics and reporting dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#10B759]"></span>
                    <span>Seamless integration with existing systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#10B759]"></span>
                    <span>24/7 customer support and dedicated account management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#10B759]"></span>
                    <span>Scalable infrastructure to grow with your business</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button className="flex-1 rounded-[4px] bg-[#10B759] px-6 py-3 font-['Inter'] text-sm font-medium text-white shadow-[0_2px_8px_rgba(16,183,89,0.3)] transition-all hover:bg-[#0E9F4D]">
                  Schedule Meeting
                </button>
                <button className="flex-1 rounded-[4px] border-2 border-[#10B759] px-6 py-3 font-['Inter'] text-sm font-medium text-[#10B759] transition-all hover:bg-[#10B759] hover:text-white">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}