import { Bell, ChevronDown, Users, User, LogOut, Settings, HelpCircle, LayoutDashboard, Edit, Save, X, Trophy, Camera, TrendingUp, Grid3x3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mypeopleLogoImage from 'figma:asset/28aef9bee0cb0fdff89e5470b4bf1593492d971d.png';
import { useState, useEffect, useRef } from 'react';
import { NotificationCenter } from './NotificationCenter';
import { useUser } from '../contexts/UserContext';
import { getDarkerShade } from '../utils/colorUtils';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  editMode?: boolean;
  editHandlers?: {
    addButton: () => void;
    addText: () => void;
    addImage: () => void;
    addBlinker: () => void;
    addVideo: () => void;
    save: () => void;
    cancel: () => void;
  };
  customization?: {
    brandColor?: string;
    secondaryColor?: string;
    announcementText?: string;
    logoUrl?: string;
    socialLinks?: any;
  };
  onLogout?: () => void;
  isAdmin?: boolean;
  onGoToDashboard?: () => void;
}

export function Navigation({ onNavigate, currentPage, editMode, editHandlers, customization, onLogout, isAdmin, onGoToDashboard }: NavigationProps) {
  const navItems = [
    { id: 'lobby', label: 'Lobby' },
    { id: 'auditorium', label: 'Auditorium' },
    { id: 'lounge', label: 'Lounge' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'booths', label: 'Booths', hasDropdown: true },
    { id: 'engagement', label: 'Engagement', hasDropdown: true },
    { id: 'more', label: 'More', hasDropdown: true },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addElementModalOpen, setAddElementModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const addElementRef = useRef<HTMLDivElement>(null);
  const { profile, points } = useUser();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (addElementRef.current && !addElementRef.current.contains(event.target as Node)) {
        setAddElementModalOpen(false);
      }
    }

    if (dropdownOpen || addElementModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, addElementModalOpen]);

  // Check if we should show edit controls - show on lobby, auditorium, lounge, and booth-detail pages when admin
  const shouldShowEditControls = isAdmin && editHandlers && (currentPage === 'lobby' || currentPage === 'auditorium' || currentPage === 'lounge' || currentPage === 'booth-detail');

  // Dynamic brand colors
  const brandColor = customization?.brandColor || '#10B759';
  const darkerBrandColor = getDarkerShade(brandColor);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex items-center justify-between px-16 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={mypeopleLogoImage}
            alt="mypeople"
            className="h-[53px] w-[162px] cursor-pointer object-contain"
            onClick={() => onNavigate('lobby')}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Edit Controls - Show for Lobby, Auditorium, Lounge, and Booth pages when admin */}
        {shouldShowEditControls && (
          <div className="flex items-center gap-2 mr-4 relative">
            {!editMode ? (
              <button
                onClick={editHandlers.addButton}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-all"
                style={{ 
                  borderRadius: '4px',
                  background: `linear-gradient(to right, ${brandColor}, ${darkerBrandColor})`
                }}
              >
                <Edit className="h-4 w-4" />
                <span>Edit Layout</span>
              </button>
            ) : (
              <>
                {/* Add Element Button with Modal */}
                <div className="relative" ref={addElementRef}>
                  <button
                    onClick={() => setAddElementModalOpen(!addElementModalOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-all"
                    style={{ 
                      borderRadius: '4px',
                      background: `linear-gradient(to right, ${brandColor}, ${darkerBrandColor})`
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Add Element</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${addElementModalOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Add Element Modal */}
                  {addElementModalOpen && (
                    <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                      <button
                        onClick={() => {
                          editHandlers.addButton();
                          setAddElementModalOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Add Button
                      </button>
                      <button
                        onClick={() => {
                          editHandlers.addText();
                          setAddElementModalOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Add Text
                      </button>
                      <button
                        onClick={() => {
                          editHandlers.addImage();
                          setAddElementModalOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Add Image
                      </button>
                      <button
                        onClick={() => {
                          editHandlers.addBlinker();
                          setAddElementModalOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Add Blinker
                      </button>
                      <button
                        onClick={() => {
                          editHandlers.addVideo();
                          setAddElementModalOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Add Video
                      </button>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={editHandlers.save}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-all"
                  style={{ 
                    borderRadius: '4px',
                    background: `linear-gradient(to right, ${brandColor}, ${darkerBrandColor})`
                  }}
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>

                {/* Cancel Button */}
                <button
                  onClick={editHandlers.cancel}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-300 text-slate-700 hover:bg-slate-400 transition-all"
                  style={{ borderRadius: '4px' }}
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Admin Dashboard Button */}
        {isAdmin && onGoToDashboard && (
          <button
            onClick={onGoToDashboard}
            className="mr-4 px-4 py-2 bg-gradient-to-r from-[#5B7C8F] to-[#4A6A7C] text-white rounded font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            style={{ borderRadius: '4px' }}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
        )}

        {/* User Feature Buttons */}
        <div className="flex items-center gap-3 mr-4">
          {/* Points Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg">
            <Trophy className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-slate-900">{points}</span>
            <span className="text-xs text-slate-600">pts</span>
          </div>

          {/* Activity Dashboard */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('activity')}
              className="p-2 hover:bg-slate-100 rounded-full transition-all relative"
              title="My Activity"
            >
              <TrendingUp className="w-5 h-5 text-slate-700" />
            </button>
          )}

          {/* Bingo Card */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('bingo')}
              className="p-2 hover:bg-slate-100 rounded-full transition-all relative"
              title="Networking Bingo"
            >
              <Grid3x3 className="w-5 h-5 text-slate-700" />
            </button>
          )}

          {/* Photo Booth */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('photo-booth')}
              className="p-2 hover:bg-slate-100 rounded-full transition-all"
              title="Virtual Photo Booth"
            >
              <Camera className="w-5 h-5 text-slate-700" />
            </button>
          )}

          {/* Notification Center */}
          <NotificationCenter />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-105 shadow-md"
            style={{ 
              background: `linear-gradient(to bottom right, ${brandColor}, ${darkerBrandColor})`
            }}
          >
            <User className="h-5 w-5" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50" ref={dropdownRef}>
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${brandColor}, ${darkerBrandColor})`
                    }}
                  >
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">John Doe</h4>
                    <p className="text-xs text-slate-500">john.doe@example.com</p>
                  </div>
                </div>
              </div>

              {/* Online Users */}
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Online Attendees</span>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" style={{ color: brandColor }} />
                    <span className="text-sm font-semibold" style={{ color: brandColor }}>142</span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    onNavigate('profile');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                >
                  <User className="h-4 w-4 text-[#5B7C8F]" />
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <Settings className="h-4 w-4 text-[#5B7C8F]" />
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <HelpCircle className="h-4 w-4 text-[#5B7C8F]" />
                  Help & Support
                </button>
                {isAdmin && onGoToDashboard && (
                  <button 
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors" 
                    onClick={() => {
                      setDropdownOpen(false);
                      onGoToDashboard();
                    }}
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#5B7C8F]" />
                    Dashboard
                  </button>
                )}
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 pt-1">
                <button 
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors" 
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onLogout) {
                      onLogout();
                    }
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}