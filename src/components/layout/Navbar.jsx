import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Bell, Wheat, LayoutDashboard, MapPin, Clock, ReceiptText } from 'lucide-react';
import { NotificationDrawer } from '../ui/NotificationDrawer';
import { FarmerMobileNav } from './FarmerMobileNav';

export const Navbar = () => {
  const { activeRole, farmerTab, setFarmerTab, notifications } = useDemo();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (n.forRole === activeRole || n.forRole === 'all')).length;

  return (
    <>
      {/* Top Header */}
      <header className="bg-agri-green text-white border-b border-agri-green-dark shadow-agri-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding Logo & DoCA Department Badge */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-agri-gold flex items-center justify-center text-agri-green-dark shadow-sm border border-agri-gold-light/40 shrink-0">
                <Wheat className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
                    KisanSetu
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-agri-green-dark/80 text-agri-gold px-2 py-0.5 rounded border border-agri-gold/30 hidden xs:inline-block font-mono">
                    DoCA Smart Mandi
                  </span>
                </div>
                <p className="text-[11px] text-agri-ivory/80 font-medium hidden sm:block">
                  Department of Consumer Affairs • Direct Crop Procurement
                </p>
              </div>
            </div>

            {/* Desktop Farmer Navigation Tabs */}
            {activeRole === 'farmer' && (
              <nav className="hidden md:flex items-center space-x-1 bg-agri-green-dark/50 p-1.5 rounded-xl border border-agri-green-light/20">
                <button
                  onClick={() => setFarmerTab('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'dashboard'
                      ? 'bg-[#FFFDF7] text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/60'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setFarmerTab('centres')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'centres'
                      ? 'bg-[#FFFDF7] text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/60'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Centre & Book</span>
                </button>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'queue'
                      ? 'bg-[#FFFDF7] text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/60'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Live Queue</span>
                </button>

                <button
                  onClick={() => setFarmerTab('history')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'history'
                      ? 'bg-[#FFFDF7] text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/60'
                  }`}
                >
                  <ReceiptText className="w-3.5 h-3.5" />
                  <span>Payouts</span>
                </button>
              </nav>
            )}

            {/* Operator / Admin Mode Indicator Badge */}
            {activeRole === 'operator' && (
              <div className="hidden md:flex items-center space-x-2 text-agri-gold bg-agri-green-dark px-3 py-1.5 rounded-xl text-xs font-bold border border-agri-gold/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-agri-gold animate-pulse"></span>
                <span>OPERATOR CONTROL DESK • SONIPAT YARD</span>
              </div>
            )}

            {activeRole === 'admin' && (
              <div className="hidden md:flex items-center space-x-2 text-agri-gold bg-agri-green-dark px-3 py-1.5 rounded-xl text-xs font-bold border border-agri-gold/30 font-mono">
                <span className="w-2 h-2 rounded-full bg-agri-gold animate-pulse"></span>
                <span>DoCA NATIONAL MONITORING GRID</span>
              </div>
            )}

            {/* Notification Bell & User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 text-agri-ivory hover:text-white rounded-xl hover:bg-agri-green-dark/60 transition-colors touch-target"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-agri-gold text-agri-green-dark text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="pl-2.5 sm:pl-3 border-l border-agri-green-light/30 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-agri-gold/20 text-agri-gold flex items-center justify-center font-bold text-xs border border-agri-gold/40 shrink-0">
                  {activeRole === 'farmer' ? 'RS' : activeRole === 'operator' ? 'OP' : 'AD'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold leading-tight text-white">
                    {activeRole === 'farmer' ? 'Ramesh Singh' : activeRole === 'operator' ? 'Operator #4' : 'DoCA Admin'}
                  </p>
                  <p className="text-[10px] text-agri-ivory/70 capitalize leading-tight font-sans">
                    {activeRole === 'farmer' ? 'Sonipat, Haryana' : activeRole === 'operator' ? 'Sonipat Yard' : 'New Delhi HQ'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR FOR FARMER */}
      {activeRole === 'farmer' && <FarmerMobileNav />}

      {/* Notification Slide-out Panel */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

