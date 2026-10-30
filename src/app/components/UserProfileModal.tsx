import { useState } from 'react';
import { X, User, Building, Briefcase, Link as LinkIcon, FileText, Eye, EyeOff, Save, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface UserProfileModalProps {
  onClose: () => void;
}

export function UserProfileModal({ onClose }: UserProfileModalProps) {
  const { profile, updateProfile, points, badges, activity } = useUser();
  const [formData, setFormData] = useState(profile);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests || []);

  const availableInterests = [
    'AI/ML', 'Product Management', 'SaaS', 'Digital Transformation',
    'Cloud Computing', 'Cybersecurity', 'Data Analytics', 'DevOps',
    'Blockchain', 'IoT', 'Mobile Development', 'Web Development',
    'Marketing', 'Sales', 'HR Tech', 'FinTech'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleSave = () => {
    updateProfile({ ...formData, interests: selectedInterests });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">My Profile</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Profile Stats Bar */}
          <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B759]">{points}</div>
                <div className="text-xs text-slate-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B759]">{badges.length}</div>
                <div className="text-xs text-slate-600">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B759]">{activity.boothsVisited.length}</div>
                <div className="text-xs text-slate-600">Booths Visited</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B759]">{activity.commentsPosted}</div>
                <div className="text-xs text-slate-600">Comments</div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={formData.avatar} 
                  alt={formData.name}
                  className="w-24 h-24 rounded-full border-4 border-[#10B759]"
                />
                <button className="mt-2 text-xs text-[#10B759] hover:text-[#0E9F4D] font-medium">
                  Change Photo
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                  />
                </div>
              </div>
            </div>

            {/* Company & Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Your job title"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Bio
              </label>
              <textarea
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell others about yourself..."
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 resize-none"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                LinkedIn Profile
              </label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-[#10B759] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Looking For */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                What are you looking for at this event?
              </label>
              <input
                type="text"
                value={formData.lookingFor || ''}
                onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                placeholder="e.g., Networking, partnerships, learning opportunities"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
              />
            </div>

            {/* Privacy Setting */}
            <div className="bg-slate-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile Privacy
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFormData({ ...formData, privacy: 'public' })}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.privacy === 'public'
                      ? 'border-[#10B759] bg-[#10B759] text-white'
                      : 'border-slate-300 text-slate-700 hover:border-[#10B759]'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Public
                </button>
                <button
                  onClick={() => setFormData({ ...formData, privacy: 'private' })}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.privacy === 'private'
                      ? 'border-[#10B759] bg-[#10B759] text-white'
                      : 'border-slate-300 text-slate-700 hover:border-[#10B759]'
                  }`}
                >
                  <EyeOff className="w-4 h-4" />
                  Private
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {formData.privacy === 'public' 
                  ? 'Your profile is visible to all event attendees'
                  : 'Only you can see your profile information'
                }
              </p>
            </div>

            {/* Badges Display */}
            {badges.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Earned Badges
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {badges.map(badge => (
                    <div
                      key={badge.id}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 text-center"
                    >
                      <div className="text-3xl mb-1">{badge.icon}</div>
                      <div className="font-semibold text-sm text-slate-900">{badge.name}</div>
                      <div className="text-xs text-slate-600">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
