import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Bell, Wheat, LayoutDashboard, MapPin, Clock, History, ChevronRight } from 'lucide-react';
import { NotificationDrawer } from '../ui/NotificationDrawer';

export const Navbar = () => {
  const { activeRole, farmerTab, setFarmerTab, notifications } = useDemo();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (n.forRole === activeRole || n.forRole === 'all')).length;

  return (
    <>
      <header className="bg-agri-green text-white border-b border-agri-green-dark shadow-agri-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Branding Logo & DoCA Department Badge */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-agri-gold flex items-center justify-center text-agri-green-dark shadow-sm border border-agri-gold-light/40">
                <Wheat className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-xl font-bold tracking-tight text-white">
                    KisanSetu
                  </span>
                  <span className="text-[10px] uppercase font-semibold bg-agri-green-dark/70 text-agri-gold px-2 py-0.5 rounded border border-agri-gold/30">
                    DoCA Smart Mandi
                  </span>
                </div>
                <p className="text-[11px] text-agri-ivory/80 font-medium hidden sm:block">
                  From harvest to payment, without the waiting.
                </p>
              </div>
            </div>

            {/* Farmer Navigation Tabs (Only visible when in Farmer role) */}
            {activeRole === 'farmer' && (
              <nav className="hidden md:flex items-center space-x-1 bg-agri-green-dark/40 p-1 rounded-lg border border-agri-green-light/20">
                <button
                  onClick={() => setFarmerTab('dashboard')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'dashboard'
                      ? 'bg-agri-surface text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setFarmerTab('centres')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'centres'
                      ? 'bg-agri-surface text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Centre & Book</span>
                </button>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'queue'
                      ? 'bg-agri-surface text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Live Queue</span>
                </button>

                <button
                  onClick={() => setFarmerTab('history')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    farmerTab === 'history'
                      ? 'bg-agri-surface text-agri-green shadow-sm'
                      : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Procurement & Payouts</span>
                </button>
              </nav>
            )}

            {/* Operator / Admin Mode Indicator Title */}
            {activeRole === 'operator' && (
              <div className="hidden md:flex items-center space-x-2 text-agri-gold bg-agri-green-dark px-3 py-1 rounded-md text-xs font-semibold border border-agri-gold/30">
                <span className="w-2 h-2 rounded-full bg-agri-gold animate-pulse"></span>
                <span>OPERATOR CONTROL CENTRE — SONIPAT YARD</span>
              </div>
            )}

            {activeRole === 'admin' && (
              <div className="hidden md:flex items-center space-x-2 text-agri-gold bg-agri-green-dark px-3 py-1 rounded-md text-xs font-semibold border border-agri-gold/30">
                <span className="w-2 h-2 rounded-full bg-agri-gold animate-pulse"></span>
                <span>DEPARTMENT OF CONSUMER AFFAIRS — NATIONAL MONITORING</span>
              </div>
            )}

            {/* Notification Bell & User Profile */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 text-agri-ivory hover:text-white rounded-lg hover:bg-agri-green-dark/60 transition-colors"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-agri-gold text-agri-green-dark text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="pl-3 border-l border-agri-green-light/30 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-agri-gold/20 text-agri-gold flex items-center justify-center font-bold text-xs border border-agri-gold/40">
                  {activeRole === 'farmer' ? 'RS' : activeRole === 'operator' ? 'OP' : 'AD'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold leading-tight text-white">
                    {activeRole === 'farmer' ? 'Ramesh Singh' : activeRole === 'operator' ? 'Operator #4' : 'DoCA Admin'}
                  </p>
                  <p className="text-[10px] text-agri-ivory/70 capitalize leading-tight">
                    {activeRole === 'farmer' ? 'Sonipat, HR' : activeRole === 'operator' ? 'Sonipat Yard' : 'New Delhi'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        {activeRole === 'farmer' && (
          <div className="md:hidden flex items-center justify-around border-t border-agri-green-dark/60 bg-agri-green-dark/40 py-2 px-1 text-xs">
            <button
              onClick={() => setFarmerTab('dashboard')}
              className={`px-2 py-1 rounded text-center font-medium ${
                farmerTab === 'dashboard' ? 'text-agri-gold font-bold bg-agri-green/60' : 'text-agri-ivory/80'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setFarmerTab('centres')}
              className={`px-2 py-1 rounded text-center font-medium ${
                farmerTab === 'centres' ? 'text-agri-gold font-bold bg-agri-green/60' : 'text-agri-ivory/80'
              }`}
            >
              Centres
            </button>
            <button
              onClick={() => setFarmerTab('queue')}
              className={`px-2 py-1 rounded text-center font-medium ${
                farmerTab === 'queue' ? 'text-agri-gold font-bold bg-agri-green/60' : 'text-agri-ivory/80'
              }`}
            >
              Queue
            </button>
            <button
              onClick={() => setFarmerTab('history')}
              className={`px-2 py-1 rounded text-center font-medium ${
                farmerTab === 'history' ? 'text-agri-gold font-bold bg-agri-green/60' : 'text-agri-ivory/80'
              }`}
            >
              Payouts
            </button>
          </div>
        )}
      </header>

      {/* Notification Slide-out Panel */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
