import ExhibitHall from '../imports/ExhibitHall';
import { Phone } from 'lucide-react';
import { useState } from 'react';

interface ExhibitHallViewProps {
  onNavigate: (destination: string) => void;
}

export function ExhibitHallView({ onNavigate }: ExhibitHallViewProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="relative" onClick={(e) => {
      const target = e.target as HTMLElement;
      // Check if clicked on auditorium hotspot
      if (target.getAttribute('data-name') === 'Auditorium') {
        onNavigate('auditorium');
      }
      // Check if clicked on networking lounge hotspot
      if (target.getAttribute('data-name') === 'Networking Lounge') {
        onNavigate('lounge');
      }
    }}>
      <ExhibitHall />
      
      {/* Contact Us Button */}
      <button
        onClick={() => setShowContact(!showContact)}
        className="fixed right-0 top-[535px] z-40 flex h-[209px] w-[57px] items-center justify-center rounded-bl-[35px] rounded-tl-[35px] bg-white shadow-lg transition-all hover:w-[70px]"
      >
        <div className="flex h-[136px] w-[36px] items-center justify-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="font-['Poppins'] text-[24px] font-bold text-[#10B759]">
            Contact Us
          </span>
        </div>
      </button>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8" onClick={() => setShowContact(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F7F0]">
                <Phone className="h-6 w-6 text-[#10B759]" />
              </div>
              <h2 className="font-['Inter'] text-2xl font-bold text-[#5B7C8F]">Contact Us</h2>
            </div>
            <p className="mb-6 font-['Inter'] text-sm text-[#64748b]">
              Get in touch with our team for support, inquiries, or partnership opportunities.
            </p>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-[#334155]">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 font-['Inter'] text-sm focus:border-[#10B759] focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-[#334155]">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 font-['Inter'] text-sm focus:border-[#10B759] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-[#334155]">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 font-['Inter'] text-sm focus:border-[#10B759] focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full rounded-[4px] bg-[#10B759] px-6 py-3 font-['Inter'] text-sm font-medium text-white shadow-[0_2px_8px_rgba(16,183,89,0.3)] transition-all hover:bg-[#0E9F4D]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}