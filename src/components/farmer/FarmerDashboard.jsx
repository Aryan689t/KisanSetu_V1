import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Wheat, Calendar, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { TokenDisplay } from '../ui/TokenDisplay';
import { MetricCard } from '../ui/MetricCard';
import { SlotBookingModal } from './SlotBookingModal';

export const FarmerDashboard = () => {
  const { activeBooking, setFarmerTab, centres, notifications } = useDemo();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCentreForBooking, setSelectedCentreForBooking] = useState(null);

  const recommendedCentre = centres.find(c => c.recommended) || centres[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Greeting */}
      <div className="bg-gradient-to-r from-agri-green-dark via-agri-green to-agri-green-dark text-white rounded-2xl p-6 sm:p-8 shadow-agri-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-field-pattern opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-agri-gold/20 text-agri-gold px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-agri-gold/30">
            <Wheat className="w-3.5 h-3.5" />
            <span>Kharif Harvest Procurement Season 2026</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Namaste, Ramesh Singh ji 🙏
          </h1>
          <p className="text-sm text-agri-ivory/90 mt-2 leading-relaxed font-sans">
            Welcome to KisanSetu. Your active procurement token <strong className="text-agri-gold font-bold">#{activeBooking?.token}</strong> is registered at Sonipat Procurement Centre for today.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFarmerTab('queue')}
              className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Track Live Queue Position</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setSelectedCentreForBooking(recommendedCentre);
                setIsBookingModalOpen(true);
              }}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border border-white/20 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-agri-gold" />
              <span>Book Another Crop Slot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Token"
          value={activeBooking?.token || 'None'}
          subtitle={activeBooking?.centreName || 'Sonipat Mandi'}
          icon={Wheat}
          highlight={true}
          badgeText={activeBooking?.status}
        />
        <MetricCard
          title="Queue Position"
          value="3 Farmers Ahead"
          subtitle="Estimated call: ~24 mins"
          icon={Clock}
        />
        <MetricCard
          title="Nearest Mandi"
          value="Sonipat Centre"
          subtitle="6.2 km • 58% Capacity"
          icon={MapPin}
          badgeText="⭐ Recommended"
        />
        <MetricCard
          title="Target Payout Rate"
          value="₹2,200 / Qtl"
          subtitle="MSP Rate for Paddy Grade A"
          icon={ShieldCheck}
        />
      </div>

      {/* Main Grid Section: Token Pass + Recommended Mandi & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Active Token Pass Card (Takes 1 Col on Desktop) */}
        <div className="lg:col-span-1">
          <h2 className="font-heading text-lg font-bold text-agri-text mb-3 flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-agri-green" />
            <span>Today's Active Pass</span>
          </h2>
          <TokenDisplay
            booking={activeBooking}
            onLiveQueueClick={() => setFarmerTab('queue')}
          />
        </div>

        {/* Mandi Discovery Callout & Live Status (Takes 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Smart Recommended Mandi Banner */}
          <div className="paper-surface rounded-2xl p-6 border-2 border-agri-green/20 relative shadow-agri-sm">
            <div className="flex items-center justify-between pb-4 border-b border-agri-ivory-muted">
              <div>
                <span className="text-[10px] uppercase font-bold text-agri-gold bg-agri-gold-light/40 px-2.5 py-1 rounded-full border border-agri-gold/40">
                  ⭐ SMART RECOMMENDATION FOR TODAY
                </span>
                <h3 className="font-heading text-xl font-bold text-agri-green mt-2">
                  {recommendedCentre.name}
                </h3>
                <p className="text-xs text-agri-text-muted mt-0.5">
                  {recommendedCentre.address} • {recommendedCentre.distanceKm} km away
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-bold font-heading text-agri-green">
                  {recommendedCentre.estWaitMinutes} min
                </span>
                <p className="text-[10px] text-agri-text-muted">Avg. Queue Wait Time</p>
              </div>
            </div>

            <div className="py-4 grid grid-cols-3 gap-3 text-center border-b border-agri-ivory-muted">
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold">Current Queue</span>
                <p className="font-heading text-base font-bold text-agri-text">{recommendedCentre.queueCount} Farmers</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold">Yard Capacity</span>
                <p className="font-heading text-base font-bold text-agri-green">{recommendedCentre.capacityPercent}% Loaded</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold">Available Slots</span>
                <p className="font-heading text-base font-bold text-agri-gold-dark">{recommendedCentre.availableSlots} Open</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <p className="text-xs text-agri-text-muted italic flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-agri-green" />
                <span>{recommendedCentre.recommendationReason}</span>
              </p>

              <button
                onClick={() => setFarmerTab('centres')}
                className="text-xs font-bold text-agri-green hover:text-agri-green-dark flex items-center space-x-1"
              >
                <span>Compare All Mandis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Connected Workflow Status Overview */}
          <div className="paper-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm">
            <h3 className="font-heading text-base font-bold text-agri-text mb-4 flex items-center justify-between">
              <span>Your Harvest Journey Progress</span>
              <span className="text-xs font-normal text-agri-text-muted">Procurement Ref: #BK-2026-8812</span>
            </h3>

            {/* Step-by-Step Progress Track */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-agri-green-soft border border-agri-green-border">
                <div className="w-6 h-6 mx-auto rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-xs mb-1">
                  ✓
                </div>
                <span className="font-bold text-agri-green-dark block">1. Slot Booked</span>
                <span className="text-[10px] text-agri-text-muted">11:00 - 11:30 AM</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                activeBooking?.status !== 'WAITING'
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  activeBooking?.status !== 'WAITING' ? 'bg-agri-green text-white' : 'bg-agri-gold text-agri-green-dark'
                }`}>
                  2
                </div>
                <span className="font-bold text-agri-text block">2. Gate Check-in</span>
                <span className="text-[10px] text-agri-text-muted">
                  {activeBooking?.status === 'WAITING' ? 'Waiting' : 'Checked-In'}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                activeBooking?.status === 'PROCESSING' || activeBooking?.status === 'COMPLETED'
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  activeBooking?.status === 'PROCESSING' || activeBooking?.status === 'COMPLETED'
                    ? 'bg-agri-green text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  3
                </div>
                <span className="font-bold text-agri-text block">3. Inspection</span>
                <span className="text-[10px] text-agri-text-muted">Counter 2</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                activeBooking?.paymentStatus === 'DISBURSED'
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  activeBooking?.paymentStatus === 'DISBURSED'
                    ? 'bg-agri-green text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  4
                </div>
                <span className="font-bold text-agri-text block">4. DBT Payout</span>
                <span className="text-[10px] text-agri-text-muted">
                  {activeBooking?.paymentStatus === 'DISBURSED' ? '₹84,700 Paid' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Quick Status Message Alert */}
            <div className="mt-4 p-3 bg-agri-ivory/60 rounded-xl border border-agri-ivory-muted text-xs text-agri-text flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-agri-gold shrink-0" />
              <span>
                <strong>Next Step:</strong> Stay near Counter 2 at Sonipat Procurement Yard. You will receive an audio announcement and SMS alert when your turn is called.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Slot Booking Modal */}
      {isBookingModalOpen && (
        <SlotBookingModal
          centre={selectedCentreForBooking}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

    </div>
  );
};
