import { useState } from 'react';
import { Check, ChevronRight, X, Palette, Bell, Calendar, Eye, Plus, Image, Video } from 'lucide-react';

interface Template {
  id: string;
  title?: string;
  label?: string;
  imageUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
  style?: string;
}

interface SetupWizardProps {
  onComplete: (selections: Record<string, any>, eventName?: string, customization?: any) => void;
  lobbyTemplates: Template[];
  auditoriumTemplates: Template[];
  loungeTemplates: Template[];
  boothTemplates: Template[];
  initialSelections?: Record<string, any>;
  eventName?: string;
  initialCustomization?: any;
  onCancel?: () => void;
}

const steps = [
  { id: 'basic', label: 'Event Details', description: 'Basic information about your event', icon: Calendar },
  { id: 'branding', label: 'Branding', description: 'Colors, logo, and visual identity', icon: Palette },
  { id: 'content', label: 'Content', description: 'Announcements and messages', icon: Bell },
  { id: 'lobby', label: 'Lobby', description: 'Choose your entrance space', icon: null },
  { id: 'auditorium', label: 'Auditorium', description: 'Select your main stage', icon: null },
  { id: 'lounge', label: 'Lounge', description: 'Pick your networking area', icon: null },
  { id: 'booth', label: 'Booth', description: 'Configure your exhibit hall', icon: null },
];

const brandColorPresets = [
  { name: 'mypeople Green', color: '#10B759', secondary: '#0E9F4D' },
  { name: 'Ocean Blue', color: '#0EA5E9', secondary: '#0284C7' },
  { name: 'Royal Purple', color: '#9333EA', secondary: '#7C3AED' },
  { name: 'Sunset Orange', color: '#F97316', secondary: '#EA580C' },
  { name: 'Rose Pink', color: '#EC4899', secondary: '#DB2777' },
  { name: 'Emerald', color: '#10B981', secondary: '#059669' },
  { name: 'Amber', color: '#F59E0B', secondary: '#D97706' },
  { name: 'Indigo', color: '#6366F1', secondary: '#4F46E5' },
];

export function SetupWizard({
  onComplete,
  lobbyTemplates,
  auditoriumTemplates,
  loungeTemplates,
  boothTemplates,
  initialSelections,
  eventName: initialEventName,
  initialCustomization,
  onCancel,
}: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>(initialSelections || {});
  
  // Customization state
  const [eventName, setEventName] = useState(initialEventName || '');
  const [eventDescription, setEventDescription] = useState(initialCustomization?.eventDescription || '');
  const [eventDate, setEventDate] = useState(initialCustomization?.eventDate || '');
  const [eventTime, setEventTime] = useState(initialCustomization?.eventTime || '');
  const [timezone, setTimezone] = useState(initialCustomization?.timezone || 'UTC');
  const [organizerName, setOrganizerName] = useState(initialCustomization?.organizerName || '');
  const [organizerEmail, setOrganizerEmail] = useState(initialCustomization?.organizerEmail || '');
  
  const [brandColor, setBrandColor] = useState(initialCustomization?.brandColor || '#10B759');
  const [secondaryColor, setSecondaryColor] = useState(initialCustomization?.secondaryColor || '#0E9F4D');
  const [logoUrl, setLogoUrl] = useState(initialCustomization?.logoUrl || '');
  
  const [announcementText, setAnnouncementText] = useState(initialCustomization?.announcementText || 'Welcome to our virtual event! 🎉');
  const [welcomeMessage, setWelcomeMessage] = useState(initialCustomization?.welcomeMessage || 'Thank you for joining us today!');
  
  const [twitterUrl, setTwitterUrl] = useState(initialCustomization?.socialLinks?.twitter || '');
  const [linkedinUrl, setLinkedinUrl] = useState(initialCustomization?.socialLinks?.linkedin || '');
  const [facebookUrl, setFacebookUrl] = useState(initialCustomization?.socialLinks?.facebook || '');
  const [websiteUrl, setWebsiteUrl] = useState(initialCustomization?.socialLinks?.website || '');

  // Preview modal state
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // Custom template modal state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTemplateUrl, setCustomTemplateUrl] = useState('');
  const [customTemplateTitle, setCustomTemplateTitle] = useState('');
  const [customTemplateType, setCustomTemplateType] = useState<'image' | 'video'>('image');
  const [customTemplates, setCustomTemplates] = useState<Record<string, Template[]>>({
    lobby: [],
    auditorium: [],
    lounge: [],
    booth: [],
  });

  const getCurrentTemplates = (): Template[] => {
    switch (steps[currentStep].id) {
      case 'lobby':
        return [...lobbyTemplates, ...customTemplates.lobby];
      case 'auditorium':
        return [...auditoriumTemplates, ...customTemplates.auditorium];
      case 'lounge':
        return [...loungeTemplates, ...customTemplates.lounge];
      case 'booth':
        return [...boothTemplates, ...customTemplates.booth];
      default:
        return [];
    }
  };

  const handleSelect = (templateId: string) => {
    if (steps[currentStep].id === 'booth') {
      const currentBooths = selections.booth || [];
      const isAlreadySelected = currentBooths.includes(templateId);
      
      if (isAlreadySelected) {
        setSelections({
          ...selections,
          booth: currentBooths.filter((id: string) => id !== templateId),
        });
      } else {
        setSelections({
          ...selections,
          booth: [...currentBooths, templateId],
        });
      }
    } else {
      setSelections({
        ...selections,
        [steps[currentStep].id]: templateId,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const customization = {
      brandColor,
      secondaryColor,
      announcementText,
      eventDescription,
      logoUrl,
      welcomeMessage,
      eventDate,
      eventTime,
      timezone,
      organizerName,
      organizerEmail,
      socialLinks: {
        twitter: twitterUrl,
        linkedin: linkedinUrl,
        facebook: facebookUrl,
        website: websiteUrl,
      },
    };
    
    onComplete(selections, eventName, customization);
  };

  const canProceed = () => {
    const stepId = steps[currentStep].id;
    
    if (stepId === 'basic') {
      return eventName.trim() !== '';
    }
    if (stepId === 'branding') {
      return brandColor !== '';
    }
    if (stepId === 'content') {
      return announcementText.trim() !== '';
    }
    if (stepId === 'booth') {
      const selectedBooths = selections.booth || [];
      return selectedBooths.length >= 1;
    }
    
    return !!selections[stepId];
  };

  const applyColorPreset = (preset: typeof brandColorPresets[0]) => {
    setBrandColor(preset.color);
    setSecondaryColor(preset.secondary);
  };

  const handleAddCustomTemplate = () => {
    if (!customTemplateUrl || !customTemplateTitle) return;
    
    const stepId = steps[currentStep].id;
    const newTemplate: Template = {
      id: `custom-${Date.now()}`,
      label: customTemplateTitle,
      title: customTemplateTitle,
      imageUrl: customTemplateUrl, // Use the actual URL for both image and video
      ...(customTemplateType === 'video' && {
        videoUrl: customTemplateUrl,
        isVideo: true,
      }),
    };

    setCustomTemplates({
      ...customTemplates,
      [stepId]: [...customTemplates[stepId as keyof typeof customTemplates], newTemplate],
    });

    // Auto-select the newly added custom template
    handleSelect(newTemplate.id);

    // Reset and close modal
    setCustomTemplateUrl('');
    setCustomTemplateTitle('');
    setCustomTemplateType('image');
    setShowCustomModal(false);
  };

  const renderStepContent = () => {
    const stepId = steps[currentStep].id;

    // Basic Event Details
    if (stepId === 'basic') {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#10B759]" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Event Details</h3>
            <p className="text-slate-600">Tell us about your virtual event</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Event Name *
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Annual Tech Summit 2026"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Event Description
            </label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Brief description of your event..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Time
              </label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
            >
              <option value="UTC">UTC (GMT+0)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
              <option value="Asia/Dubai">Dubai (GST)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Organizer Name
              </label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                placeholder="Your name or company"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={organizerEmail}
                onChange={(e) => setOrganizerEmail(e.target.value)}
                placeholder="contact@example.com"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>
          </div>
        </div>
      );
    }

    // Branding
    if (stepId === 'branding') {
      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Palette className="w-16 h-16 mx-auto mb-4 text-[#10B759]" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Event Branding</h3>
            <p className="text-slate-600">Customize colors and visual identity</p>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Brand Color Presets
            </label>
            <div className="grid grid-cols-4 gap-3">
              {brandColorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyColorPreset(preset)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    brandColor === preset.color
                      ? 'border-slate-900 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div 
                    className="w-full h-12 rounded-lg mb-2"
                    style={{ background: `linear-gradient(135deg, ${preset.color}, ${preset.secondary})` }}
                  />
                  <div className="text-xs font-medium text-slate-900">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Primary Brand Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  placeholder="#10B759"
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  placeholder="#0E9F4D"
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Color Preview</h4>
            <div className="flex gap-3">
              <button
                className="px-6 py-3 text-white rounded-lg font-semibold transition-all"
                style={{ background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})` }}
              >
                Primary Button
              </button>
              <button
                className="px-6 py-3 rounded-lg font-semibold transition-all border-2"
                style={{ 
                  borderColor: brandColor,
                  color: brandColor
                }}
              >
                Secondary Button
              </button>
              <div 
                className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: brandColor }}
              >
                Badge
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Event Logo URL (Optional)
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
            />
            {logoUrl && (
              <div className="mt-3 p-4 bg-white rounded-lg border-2 border-slate-200">
                <img src={logoUrl} alt="Event Logo" className="h-16 object-contain" />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Content
    if (stepId === 'content') {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <Bell className="w-16 h-16 mx-auto mb-4 text-[#10B759]" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Event Content</h3>
            <p className="text-slate-600">Configure announcements and messages</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Announcement Banner Text *
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Welcome to our virtual event! 🎉"
              maxLength={100}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-slate-500">This will scroll across the top of all pages</p>
              <p className="text-xs text-slate-400">{announcementText.length}/100</p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Preview</h4>
            <div 
              className="py-3 px-4 rounded-lg text-white text-center font-medium overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})` }}
            >
              <div className="animate-pulse">{announcementText || 'Your announcement text will appear here'}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Welcome Message
            </label>
            <textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder="Thank you for joining us today!"
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 resize-none"
            />
          </div>
        </div>
      );
    }

    // Template selection for lobby, auditorium, lounge, booth
    const templates = getCurrentTemplates();
    const isBoothStep = stepId === 'booth';
    const selectedBooths = selections.booth || [];
    const canAddCustom = ['lobby', 'auditorium', 'lounge'].includes(stepId);

    return (
      <div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {steps[currentStep].label}
          </h3>
          <p className="text-slate-600">{steps[currentStep].description}</p>
          {isBoothStep && (
            <p className="text-sm text-[#10B759] font-semibold mt-2">
              Select at least 1 booth template
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {templates.map((template) => {
            const isSelected = isBoothStep
              ? selectedBooths.includes(template.id)
              : selections[stepId] === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden ${
                  isSelected ? 'ring-4 ring-[#10B759]' : ''
                }`}
              >
                <div className="aspect-video overflow-hidden relative">
                  {/* Eye Icon Preview Button */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage({ 
                        url: template.imageUrl, 
                        title: template.label || template.title || '' 
                      });
                    }}
                    className="absolute top-2 left-2 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Preview full image"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewImage({ 
                          url: template.imageUrl, 
                          title: template.label || template.title || '' 
                        });
                      }
                    }}
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  
                  {template.isVideo && template.videoUrl ? (
                    <video
                      src={template.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src={template.imageUrl}
                      alt={template.label || template.title || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900">
                    {template.label || template.title}
                  </h4>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#10B759] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}

          {/* Add Custom Button - Only for lobby, auditorium, lounge */}
          {canAddCustom && (
            <button
              onClick={() => setShowCustomModal(true)}
              className="group relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-2 border-dashed border-slate-300 hover:border-[#10B759]"
            >
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center group-hover:bg-[#10B759] transition-all">
                    <Plus className="w-8 h-8 text-slate-400 group-hover:text-white transition-all" />
                  </div>
                  <p className="text-slate-600 font-semibold group-hover:text-[#10B759] transition-all">
                    Add Custom
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Image or Video</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {initialEventName ? 'Edit Event' : 'Create Virtual Event'}
              </h1>
              <p className="text-slate-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white scale-110'
                          : isCompleted
                          ? 'bg-[#10B759] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : Icon ? (
                        <Icon className="w-6 h-6" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-semibold ${
                          isActive ? 'text-[#10B759]' : 'text-slate-600'
                        }`}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded ${
                        isCompleted ? 'bg-[#10B759]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 min-h-[500px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            Back
          </button>

          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleComplete}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-5 h-5" />
                Complete Setup
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-7xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              title="Close preview"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Title */}
            <div className="absolute -top-12 left-0 text-white">
              <h3 className="text-xl font-semibold">{previewImage.title}</h3>
              <p className="text-sm text-white/70">Full preview</p>
            </div>

            {/* Image */}
            <div className="bg-white rounded-xl p-2 shadow-2xl">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-auto rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Template Upload Modal */}
      {showCustomModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowCustomModal(false);
            setCustomTemplateUrl('');
            setCustomTemplateTitle('');
            setCustomTemplateType('image');
          }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Add Custom Media</h3>
                <p className="text-sm text-slate-600 mt-1">Upload your own image or video</p>
              </div>
              <button
                onClick={() => {
                  setShowCustomModal(false);
                  setCustomTemplateUrl('');
                  setCustomTemplateTitle('');
                  setCustomTemplateType('image');
                }}
                className="p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Media Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Media Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCustomTemplateType('image')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      customTemplateType === 'image'
                        ? 'border-[#10B759] bg-[#10B759]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image className={`w-8 h-8 mx-auto mb-2 ${
                      customTemplateType === 'image' ? 'text-[#10B759]' : 'text-slate-400'
                    }`} />
                    <p className={`font-semibold ${
                      customTemplateType === 'image' ? 'text-[#10B759]' : 'text-slate-600'
                    }`}>Image</p>
                  </button>
                  <button
                    onClick={() => setCustomTemplateType('video')}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      customTemplateType === 'video'
                        ? 'border-[#10B759] bg-[#10B759]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Video className={`w-8 h-8 mx-auto mb-2 ${
                      customTemplateType === 'video' ? 'text-[#10B759]' : 'text-slate-400'
                    }`} />
                    <p className={`font-semibold ${
                      customTemplateType === 'video' ? 'text-[#10B759]' : 'text-slate-600'
                    }`}>Video</p>
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={customTemplateTitle}
                  onChange={(e) => setCustomTemplateTitle(e.target.value)}
                  placeholder={`e.g., Custom ${customTemplateType === 'image' ? 'Background' : 'Video'}`}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                />
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {customTemplateType === 'image' ? 'Image' : 'Video'} URL *
                </label>
                <input
                  type="url"
                  value={customTemplateUrl}
                  onChange={(e) => setCustomTemplateUrl(e.target.value)}
                  placeholder={`https://example.com/${customTemplateType === 'image' ? 'image.jpg' : 'video.mp4'}`}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supports: {customTemplateType === 'image' ? '.jpg, .png, .gif, .webp' : '.mp4, .webm, .mov, YouTube, Vimeo'}
                </p>
              </div>

              {/* Preview */}
              {customTemplateUrl && (
                <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Preview</h4>
                  <div className="aspect-video bg-white rounded-lg overflow-hidden">
                    {customTemplateType === 'image' ? (
                      <img
                        src={customTemplateUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225"%3E%3Crect width="400" height="225" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16"%3EInvalid image URL%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                        {customTemplateUrl ? (
                          <video
                            src={customTemplateUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('Video load error:', e);
                            }}
                          />
                        ) : (
                          <div className="text-center">
                            <Video className="w-16 h-16 mx-auto mb-2" />
                            <p className="text-sm">Video preview not available</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCustomModal(false);
                    setCustomTemplateUrl('');
                    setCustomTemplateTitle('');
                    setCustomTemplateType('image');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomTemplate}
                  disabled={!customTemplateUrl || !customTemplateTitle}
                  className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                    customTemplateUrl && customTemplateTitle
                      ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white hover:shadow-lg'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Add {customTemplateType === 'image' ? 'Image' : 'Video'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}