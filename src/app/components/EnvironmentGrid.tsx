import { ImageWithFallback } from './figma/ImageWithFallback';

interface EnvironmentOption {
  id: string;
  label: string;
  imageUrl: string;
}

interface EnvironmentGridProps {
  title: string;
  options: EnvironmentOption[];
  onSelect: (id: string) => void;
}

export function EnvironmentGrid({ title, options, onSelect }: EnvironmentGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7F0] to-white px-16 py-12">
      <h1 className="mb-12 font-['Inter'] text-4xl font-bold text-[#5B7C8F]">{title}</h1>
      
      <div className="grid grid-cols-3 gap-8">
        {options.map((option, index) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(16,183,89,0.2)]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={option.imageUrl}
                alt={option.label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="font-['Inter'] text-lg font-semibold text-[#334155]">
                Option {index + 1}
              </h3>
              <p className="mt-1 font-['Inter'] text-sm text-[#64748b]">{option.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}