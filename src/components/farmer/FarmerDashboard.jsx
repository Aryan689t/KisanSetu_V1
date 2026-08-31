import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Wheat, Calendar, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, UserCheck, AlertTriangle, Building, Calculator } from 'lucide-react';
import { TokenDisplay } from '../ui/TokenDisplay';
import { MetricCard } from '../ui/MetricCard';
import { SlotBookingModal } from './SlotBookingModal';

export const FarmerDashboard = () => {
  const { activeBooking, setFarmerTab, centres } = useDemo();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCentreForBooking, setSelectedCentreForBooking] = useState(null);

  const recommendedCentre = centres.find(c => c.recommended) || centres[0];
  const isCompleted = activeBooking?.status === 'COMPLETED';
  const isDisbursed = activeBooking?.paymentStatus === 'DISBURSED';
  const isProcessing = activeBooking?.status === 'PROCESSING';
  const isCheckedIn = activeBooking?.status === 'CHECKED_IN';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Hero Section — "What Do I Do Now?" */}
      <div className="bg-gradient-to-r from-agri-green-dark via-agri-green to-agri-green-dark text-white rounded-2xl p-6 sm:p-8 shadow-agri-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-field-pattern opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 bg-agri-gold/20 text-agri-gold px-3 py-1 rounded-full text-xs font-bold border border-agri-gold/30">
            <Wheat className="w-3.5 h-3.5" />
            <span>Kharif Harvest Procurement Season 2026</span>
          </div>

          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Namaste, Ramesh Singh ji 🙏
            </h1>
            <p className="text-xs sm:text-sm text-agri-ivory/90 mt-1 font-sans">
              Your procurement appointment is active at <strong className="text-agri-gold">{activeBooking?.centreName || 'Sonipat Main Procurement Centre'}</strong>.
            </p>
          </div>

          {/* DYNAMIC NEXT ACTION CARD - THE MOST IMPORTANT INFORMATION */}
          <div className="p-4 rounded-xl backdrop-blur-md border shadow-sm transition-all duration-300 font-sans">
            
            {/* WAITING State */}
            {activeBooking?.status === 'WAITING' && (
              <div className="bg-amber-500/20 border-amber-300/40 p-4 rounded-xl text-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-agri-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-agri-gold font-bold text-sm block">
                      Next Step: Wait for your token call
                    </strong>
                    <p className="text-xs text-amber-100/90 mt-0.5">
                      You are <strong>3 farmers away</strong> from your turn (~24 min est. wait). Please stay near Sonipat Mandi yard.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-4 py-2 rounded-lg transition-all shrink-0 flex items-center space-x-1.5 shadow-agri-sm"
                >
                  <span>Track Live Queue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* CHECKED_IN State */}
            {isCheckedIn && (
              <div className="bg-blue-500/20 border-blue-300/40 p-4 rounded-xl text-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-bold text-sm block">
                      Next Step: Gate Check-in Completed
                    </strong>
                    <p className="text-xs text-blue-100/90 mt-0.5">
                      Gate check-in verified. Please wait near <strong>Counter 2</strong>. You will be called shortly.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-blue-400 hover:bg-blue-300 text-agri-green-dark font-extrabold text-xs px-4 py-2 rounded-lg transition-all shrink-0 flex items-center space-x-1.5 shadow-agri-sm"
                >
                  <span>View Queue Position</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* PROCESSING State */}
            {isProcessing && (
              <div className="bg-agri-gold text-agri-green-dark p-4 rounded-xl shadow-agri-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-agri-green-dark shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-extrabold text-sm sm:text-base block">
                      🔔 YOUR TURN HAS ARRIVED!
                    </strong>
                    <p className="text-xs font-semibold text-agri-green-dark/90 mt-0.5">
                      Token #{activeBooking?.token}: Please proceed immediately to <strong>Counter 2</strong> for moisture & weighing inspection.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-agri-green-dark hover:bg-agri-green text-white font-extrabold text-xs px-4 py-2 rounded-lg transition-all shrink-0 flex items-center space-x-1.5 shadow-agri-sm"
                >
                  <span>Go to Counter 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* COMPLETED State (Pending Disbursal) */}
            {isCompleted && !isDisbursed && (
              <div className="bg-agri-green-soft/30 border-agri-green-border p-4 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-agri-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-agri-gold font-bold text-sm block">
                      Next Step: Procurement Completed & Verified
                    </strong>
                    <p className="text-xs text-agri-ivory/90 mt-0.5">
                      Weighed <strong>{activeBooking?.actualQty || 38.5} Quintals</strong> (Grade A). Your calculated payout of <strong>₹{((activeBooking?.actualQty || 38.5) * 2200).toLocaleString()}</strong> is undergoing Direct Benefit Transfer authorization.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('history')}
                  className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-4 py-2 rounded-lg transition-all shrink-0 flex items-center space-x-1.5 shadow-agri-sm"
                >
                  <span>View Payout Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* DISBURSED State */}
            {isDisbursed && (
              <div className="bg-agri-green-soft border-2 border-agri-green text-agri-green-dark p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-sm">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-agri-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-extrabold text-sm sm:text-base block text-agri-green-dark">
                      ✓ MSP Payment Disbursed via Direct Benefit Transfer
                    </strong>
                    <p className="text-xs font-medium text-agri-text mt-0.5">
                      <strong>₹84,700</strong> credited to SBI Bank A/C (****4092). Ref: <code className="font-mono font-bold bg-agri-green/10 px-1 py-0.5 rounded text-agri-green-dark">DBT-UTIB000984210</code>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('history')}
                  className="bg-agri-green hover:bg-agri-green-dark text-white font-extrabold text-xs px-4 py-2 rounded-lg transition-all shrink-0 flex items-center space-x-1.5 shadow-agri-sm"
                >
                  <span>Download Receipt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setFarmerTab('queue')}
              className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-bold text-xs px-4 py-2.5 rounded-xl shadow-agri-sm transition-all flex items-center space-x-2"
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
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-agri-gold" />
              <span>Book Another Crop Slot</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Key Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Token"
          value={activeBooking?.token || 'SNP-014'}
          subtitle={activeBooking?.centreName || 'Sonipat Mandi'}
          icon={Wheat}
          highlight={true}
          badgeText={activeBooking?.status}
        />
        <MetricCard
          title="Queue Position"
          value={isCompleted ? '0 Farmers' : '3 Farmers Ahead'}
          subtitle={isCompleted ? 'Procurement Logged' : 'Estimated wait: ~24 min'}
          icon={Clock}
        />
        <MetricCard
          title="Nearest Mandi"
          value="Sonipat Centre"
          subtitle="6.2 km • 58% Capacity"
          icon={MapPin}
          badgeText="Recommended"
        />
        <MetricCard
          title="Target Payout Rate"
          value="₹2,200 / Qtl"
          subtitle="MSP Paddy Grade A"
          icon={ShieldCheck}
        />
      </div>

      {/* 3. Main Grid: Active Token Pass + Harvest Journey & Smart Mandi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Active Token Pass Card (Takes 1 Col on Desktop) */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="font-heading text-lg font-bold text-agri-text flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-agri-green" />
            <span>Digital Mandi Pass</span>
          </h2>
          <TokenDisplay
            booking={activeBooking}
            onLiveQueueClick={() => setFarmerTab('queue')}
          />
        </div>

        {/* Harvest Journey Progress & Recommended Mandi (Takes 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Harvest Journey Progress Timeline */}
          <div className="paper-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-agri-ivory-muted">
              <div>
                <h3 className="font-heading text-base font-bold text-agri-text">
                  Your Harvest Journey Progress
                </h3>
                <p className="text-xs text-agri-text-muted">
                  Booking Reference: <strong className="font-mono text-agri-green">{activeBooking?.bookingId || 'BK-2026-8812'}</strong>
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-agri-green bg-agri-green-soft px-2 py-0.5 rounded border border-agri-green-border">
                Live State Tracking
              </span>
            </div>

            {/* 4-Stage Progress Track */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              
              {/* Step 1: Slot Booked */}
              <div className="p-3 rounded-xl bg-agri-green-soft border border-agri-green-border">
                <div className="w-6 h-6 mx-auto rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-xs mb-1">
                  ✓
                </div>
                <span className="font-bold text-agri-green-dark block">1. Slot Booked</span>
                <span className="text-[10px] text-agri-text-muted">11:00 - 11:30 AM</span>
              </div>

              {/* Step 2: Gate Check-in */}
              <div className={`p-3 rounded-xl border ${
                activeBooking?.status !== 'WAITING'
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  activeBooking?.status !== 'WAITING' ? 'bg-agri-green text-white' : 'bg-agri-gold text-agri-green-dark'
                }`}>
                  {activeBooking?.status !== 'WAITING' ? '✓' : '2'}
                </div>
                <span className="font-bold text-agri-text block">2. Gate Check-in</span>
                <span className="text-[10px] text-agri-text-muted">
                  {activeBooking?.status === 'WAITING' ? 'Pending' : 'Verified'}
                </span>
              </div>

              {/* Step 3: Inspection & Weighment */}
              <div className={`p-3 rounded-xl border ${
                isCompleted
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : isProcessing
                  ? 'bg-agri-gold-light/40 border-agri-gold ring-1 ring-agri-gold'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  isCompleted
                    ? 'bg-agri-green text-white'
                    : isProcessing
                    ? 'bg-agri-gold text-agri-green-dark animate-pulse'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {isCompleted ? '✓' : '3'}
                </div>
                <span className="font-bold text-agri-text block">3. Inspection</span>
                <span className="text-[10px] text-agri-text-muted">
                  {isCompleted ? 'Weighed 38.5 Qtl' : isProcessing ? 'In Progress' : 'Counter 2'}
                </span>
              </div>

              {/* Step 4: DBT Payment */}
              <div className={`p-3 rounded-xl border ${
                isDisbursed
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  isDisbursed
                    ? 'bg-agri-green text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {isDisbursed ? '✓' : '4'}
                </div>
                <span className="font-bold text-agri-text block">4. DBT Payout</span>
                <span className="text-[10px] text-agri-text-muted">
                  {isDisbursed ? '₹84,700 Paid' : 'Pending'}
                </span>
              </div>

            </div>

            {/* Explanatory Banner */}
            <div className="p-3 bg-agri-ivory/60 rounded-xl border border-agri-ivory-muted text-xs text-agri-text flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-agri-gold shrink-0" />
              <span>
                <strong>How it works:</strong> As your procurement progresses at Sonipat Mandi, each stage updates automatically on this dashboard and triggers an instant SMS notification.
              </span>
            </div>

          </div>

          {/* Smart Recommended Mandi Banner */}
          <div className="paper-surface rounded-2xl p-6 border-2 border-agri-green/20 relative shadow-agri-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-agri-ivory-muted">
              <div>
                <span className="text-[10px] uppercase font-bold text-agri-gold bg-agri-gold-light/40 px-2.5 py-1 rounded-full border border-agri-gold/40 inline-block mb-1">
                  ⭐ RECOMMENDED FOR YOU TODAY
                </span>
                <h3 className="font-heading text-xl font-bold text-agri-green">
                  {recommendedCentre.name}
                </h3>
                <p className="text-xs text-agri-text-muted flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
                  <span>{recommendedCentre.address} • {recommendedCentre.distanceKm} km away</span>
                </p>
              </div>

              <div className="text-left sm:text-right bg-agri-ivory/60 p-2.5 rounded-xl border border-agri-ivory-muted">
                <span className="text-2xl font-bold font-heading text-agri-green block font-mono">
                  ~{recommendedCentre.estWaitMinutes} min
                </span>
                <p className="text-[10px] text-agri-text-muted font-medium">Avg. Queue Wait Time</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-2 bg-agri-ivory/40 rounded-xl border border-agri-ivory-muted">
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block">Current Queue</span>
                <p className="font-heading text-base font-bold text-agri-text font-mono">{recommendedCentre.queueCount} Farmers</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Yard Capacity</span>
                <p className="font-heading text-base font-bold text-agri-green font-mono">{recommendedCentre.capacityPercent}%</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Open Slots</span>
                <p className="font-heading text-base font-bold text-agri-gold-dark font-mono">{recommendedCentre.availableSlots} Open</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs text-agri-text-muted italic flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-agri-green shrink-0" />
                <span><strong>Recommendation Reason:</strong> {recommendedCentre.recommendationReason}</span>
              </p>

              <button
                onClick={() => setFarmerTab('centres')}
                className="text-xs font-bold text-agri-green hover:text-agri-green-dark flex items-center space-x-1 shrink-0"
              >
                <span>Compare All Mandis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
