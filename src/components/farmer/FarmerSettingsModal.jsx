import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  X,
  Globe,
  Bell,
  HelpCircle,
  User,
  LogOut,
  CheckCircle2,
  Phone,
  MapPin,
  Wheat,
  ShieldCheck
} from 'lucide-react';
import { FarmerOnboarding } from '../auth/FarmerOnboarding';

export const FarmerSettingsModal = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    currentUser,
    lang,
    setLang,
    logoutUser,
    activeRole
  } = useDemo();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  if (!isSettingsOpen) return null;

  return (
    <>
      {showTutorialModal && (
        <FarmerOnboarding isModal={true} onClose={() => setShowTutorialModal(false)} />
      )}

      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
        <div className="bg-white text-agri-text w-full max-w-md rounded-3xl border-2 border-agri-gold shadow-2xl p-6 relative space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-agri-ivory-muted pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-agri-gold flex items-center justify-center text-agri-green-dark">
                <Wheat className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-agri-green">
                {lang === 'hi' ? 'सेटिंग्स एवं प्रोफाइल' : 'Settings & Profile'}
              </h2>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-2 text-agri-text-muted hover:text-agri-text rounded-full hover:bg-agri-ivory transition-colors"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Farmer Profile Summary (NO AADHAAR) */}
          <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-agri-green text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'RS'}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-agri-text leading-tight">
                  {currentUser?.name || 'Ramesh Singh'}
                </h3>
                <p className="text-xs text-agri-text-muted flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-agri-green" />
                  <span>{currentUser?.mobile || '+91 98765 43210'}</span>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-agri-ivory-muted/60 flex items-center justify-between text-xs text-agri-text-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-agri-green" />
                <span>Sonipat, Haryana</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {activeRole === 'farmer' ? (lang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmer') : 'Staff Account'}
              </span>
            </div>
          </div>

          {/* 2. Settings Options */}
          <div className="space-y-3 divide-y divide-agri-ivory-muted/60 text-xs">
            
            {/* Language Switcher */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-agri-green shrink-0" />
                <div>
                  <span className="font-bold text-agri-text block text-sm">
                    {lang === 'hi' ? 'भाषा (Language)' : 'Language'}
                  </span>
                  <span className="text-[11px] text-agri-text-muted">
                    {lang === 'hi' ? 'हिंदी सक्रिय है' : 'English is active'}
                  </span>
                </div>
              </div>

              <div className="flex items-center bg-agri-ivory-muted p-1 rounded-xl">
                <button
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    lang === 'hi' ? 'bg-agri-green text-white shadow-sm' : 'text-agri-text'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    lang === 'en' ? 'bg-agri-green text-white shadow-sm' : 'text-agri-text'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Notifications Toggle */}
            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Bell className="w-4 h-4 text-agri-green shrink-0" />
                <div>
                  <span className="font-bold text-agri-text block text-sm">
                    {lang === 'hi' ? 'कतार सूचनाएं (SMS & App)' : 'Queue & Turn Alerts'}
                  </span>
                  <span className="text-[11px] text-agri-text-muted">
                    {lang === 'hi' ? 'बारी आने पर तुरंत संदेश प्राप्त करें' : 'Get notified when your turn arrives'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-7 rounded-full transition-colors relative flex items-center p-1 ${
                  notificationsEnabled ? 'bg-agri-green' : 'bg-gray-300'
                }`}
                aria-label="Toggle notifications"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Help / How KisanSetu Works */}
            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <HelpCircle className="w-4 h-4 text-agri-green shrink-0" />
                <div>
                  <span className="font-bold text-agri-text block text-sm">
                    {lang === 'hi' ? 'सहायता एवं कार्यप्रणाली' : 'Help / How it Works'}
                  </span>
                  <span className="text-[11px] text-agri-text-muted">
                    {lang === 'hi' ? '4-चरणीय ट्यूटोरियल दोबारा देखें' : 'View the 4-step visual guide'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowTutorialModal(true)}
                className="px-3 py-1.5 rounded-xl border border-agri-ivory-muted bg-white text-agri-green font-bold text-xs hover:border-agri-gold transition-all"
              >
                {lang === 'hi' ? 'देखें' : 'Open'}
              </button>
            </div>

          </div>

          {/* 3. Logout Button */}
          <div className="pt-2 border-t border-agri-ivory-muted">
            <button
              onClick={logoutUser}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all flex items-center justify-center space-x-2 touch-target min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'hi' ? 'लॉगआउट करें (मुख्य पृष्ठ पर जाएं)' : 'Log Out (Return to Landing)'}</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
