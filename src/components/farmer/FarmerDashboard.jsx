import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Wheat, Calendar, MapPin, Clock, ArrowRight, CheckCircle2, ShieldCheck, UserCheck, AlertTriangle, Navigation, HelpCircle } from 'lucide-react';
import { TokenDisplay } from '../ui/TokenDisplay';
import { MetricCard } from '../ui/MetricCard';
import { SlotBookingModal } from './SlotBookingModal';

export const FarmerDashboard = () => {
  const {
    activeBooking,
    setFarmerTab,
    centres,
    getRecommendedCentre,
    switchBookingCentre,
    dismissedRerouteAlert,
    setDismissedRerouteAlert
  } = useDemo();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCentreForBooking, setSelectedCentreForBooking] = useState(null);
  const [showWhyRecommended, setShowWhyRecommended] = useState(false);

  // Derived booked centre vs recommended centre
  const bookedCentre = centres.find(c => c.id === activeBooking?.centreId) || centres[0];
  const recommendedCentre = getRecommendedCentre(centres);

  const isBookedCentreCongested = bookedCentre.status === 'CONGESTED' || bookedCentre.capacityPercent > 85;
  const isAlternativeBetter = recommendedCentre.id !== bookedCentre.id;
  
  const isCompleted = activeBooking?.status === 'COMPLETED';
  const isDisbursed = activeBooking?.paymentStatus === 'DISBURSED';
  const isProcessing = activeBooking?.status === 'PROCESSING';
  const isCheckedIn = activeBooking?.status === 'CHECKED_IN';

  // Congestion alert condition
  const shouldShowRerouteWarning = isBookedCentreCongested && isAlternativeBetter && !dismissedRerouteAlert && !isCompleted && !isDisbursed;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      
      {/* 1. DYNAMIC CONGESTION REROUTING ALERT (Shown ONLY when booked centre is congested and alert is not dismissed) */}
      {shouldShowRerouteWarning && (
        <div className="bg-[#5C1A14] text-white rounded-2xl p-4 sm:p-6 shadow-agri-lg border-2 border-rose-400 relative overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="space-y-3.5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-rose-900/90 text-amber-300 rounded-xl shrink-0 border border-rose-500/50">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-rose-950 px-2.5 py-0.5 rounded font-mono">
                      ⚠️ MANDI CROWDED ALERT
                    </span>
                    <span className="text-xs text-rose-200">Sonipat Yard Heavy Backlog</span>
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                    {bookedCentre.name} waiting time increased to ~{bookedCentre.estWaitMinutes} min
                  </h3>

                  <p className="text-xs text-rose-100/90 leading-relaxed max-w-xl">
                    Your current booking remains at <strong>{bookedCentre.name}</strong>. Panipat Mandi is available nearby with only <strong>~{recommendedCentre.estWaitMinutes} min wait</strong>.
                  </p>
                </div>
              </div>

              {/* Reroute Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 pt-1 md:pt-0">
                <button
                  onClick={() => switchBookingCentre(recommendedCentre.id)}
                  className="bg-amber-400 hover:bg-amber-300 text-rose-950 font-extrabold text-xs px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[44px]"
                >
                  <span>👉 Switch to {recommendedCentre.name.split(' ')[0]} (~{recommendedCentre.estWaitMinutes}m)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDismissedRerouteAlert(true)}
                  className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-semibold px-4 py-3 rounded-xl transition-colors border border-rose-700/60 text-center touch-target min-h-[44px]"
                >
                  Keep {bookedCentre.name.split(' ')[0]}
                </button>
              </div>
            </div>

            {/* Recommended Alternative Card Preview */}
            <div className="bg-rose-950/70 p-3 rounded-xl border border-rose-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-amber-300 font-bold font-mono text-[11px]">⭐ FASTER MANDI:</span>
                <span className="font-bold text-white">{recommendedCentre.name}</span>
              </div>
              <div className="flex items-center space-x-3 text-rose-200 font-mono text-[11px] flex-wrap">
                <span>Wait: <strong className="text-amber-300">~{recommendedCentre.estWaitMinutes} min</strong></span>
                <span>Load: <strong>{recommendedCentre.capacityPercent}%</strong></span>
                <span>Distance: <strong>{recommendedCentre.distanceKm} km</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. WHAT DO I DO NOW? — HERO ACTION BANNER FOR FARMER */}
      <div className="bg-[#17432A] text-white rounded-2xl p-4 sm:p-6 shadow-agri-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-field-pattern opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-extrabold uppercase bg-agri-gold/20 text-agri-gold px-2.5 py-0.5 rounded-full border border-agri-gold/30 font-mono inline-block mb-1">
                🟢 LIVE MANDI STATUS
              </span>
              <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                Namaste, Ramesh Singh ji 🙏
              </h1>
            </div>

            <span className="text-xs text-agri-ivory/80 bg-agri-green-dark/80 px-3 py-1 rounded-xl border border-agri-gold/20 font-mono self-start sm:self-auto">
              Booked: <strong className="text-agri-gold">{bookedCentre.name.split(' ')[0]} Yard</strong>
            </span>
          </div>

          {/* DYNAMIC NEXT ACTION CARD — LARGE & VISUAL */}
          <div className="p-4 rounded-xl bg-[#123621] border border-agri-gold/30 shadow-inner font-sans">
            
            {/* WAITING State */}
            {activeBooking?.status === 'WAITING' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-100">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-agri-gold/20 text-agri-gold flex items-center justify-center font-bold text-lg shrink-0 border border-agri-gold/40">
                    🎫
                  </div>
                  <div>
                    <strong className="text-agri-gold font-bold text-base block leading-tight">
                      ⏱ Token #{activeBooking?.token} • 3 Farmers Ahead
                    </strong>
                    <p className="text-xs text-amber-100/90 mt-1">
                      Estimated waiting time: <strong>~{bookedCentre.estWaitMinutes} min</strong> at {bookedCentre.name.split(' ')[0]} Yard.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-agri-sm touch-target min-h-[44px]"
                >
                  <span>⏱ Track My Turn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* CHECKED_IN State */}
            {isCheckedIn && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-lg shrink-0 border border-blue-400/40">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white font-bold text-base block leading-tight">
                      Gate Check-in Verified
                    </strong>
                    <p className="text-xs text-blue-100/90 mt-1">
                      Please stay near <strong>Counter 2</strong> at {bookedCentre.name.split(' ')[0]} Yard for turn call.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-blue-400 hover:bg-blue-300 text-agri-green-dark font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-agri-sm touch-target min-h-[44px]"
                >
                  <span>View Queue Position</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PROCESSING State */}
            {isProcessing && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-agri-gold text-agri-green-dark p-3.5 rounded-xl shadow-md animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-agri-green-dark text-agri-gold flex items-center justify-center font-bold text-lg shrink-0">
                    🔔
                  </div>
                  <div>
                    <strong className="font-extrabold text-base sm:text-lg block">
                      YOUR TURN HAS ARRIVED!
                    </strong>
                    <p className="text-xs font-semibold text-agri-green-dark/90 mt-0.5">
                      Token #{activeBooking?.token}: Proceed immediately to <strong>Counter 2</strong> for moisture & weighment inspection.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('queue')}
                  className="bg-agri-green-dark hover:bg-agri-green text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-agri-sm touch-target min-h-[44px]"
                >
                  <span>Proceed to Counter 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* COMPLETED State */}
            {isCompleted && !isDisbursed && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-agri-gold/20 text-agri-gold flex items-center justify-center font-bold text-lg shrink-0 border border-agri-gold/40">
                    ✓
                  </div>
                  <div>
                    <strong className="text-agri-gold font-bold text-base block">
                      Procurement Completed ({activeBooking?.actualQty || 38.5} Qtl)
                    </strong>
                    <p className="text-xs text-agri-ivory/90 mt-0.5">
                      Calculated MSP Payout: <strong>₹{((activeBooking?.actualQty || 38.5) * 2200).toLocaleString()}</strong>. Awaiting Admin DBT disbursal.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('history')}
                  className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-agri-sm touch-target min-h-[44px]"
                >
                  <span>View Payout Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* DISBURSED State */}
            {isDisbursed && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-agri-green-dark bg-agri-green-soft p-3.5 rounded-xl border border-agri-green-border">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-agri-green text-white flex items-center justify-center font-bold text-lg shrink-0">
                    💰
                  </div>
                  <div>
                    <strong className="font-extrabold text-base block text-agri-green-dark">
                      ✓ MSP Payment Disbursed via DBT
                    </strong>
                    <p className="text-xs font-medium text-agri-text mt-0.5">
                      <strong>₹84,700</strong> credited to SBI Bank A/C (****4092). Ref: <code className="font-mono font-bold bg-agri-green/10 px-1 py-0.5 rounded text-agri-green-dark">DBT-UTIB000984210</code>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setFarmerTab('history')}
                  className="bg-agri-green hover:bg-agri-green-dark text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-agri-sm touch-target min-h-[44px]"
                >
                  <span>Download Receipt</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              onClick={() => setFarmerTab('queue')}
              className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-bold text-xs px-4 py-3 rounded-xl shadow-agri-sm transition-all flex items-center justify-center space-x-2 touch-target min-h-[44px]"
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
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-3 rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 touch-target min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-agri-gold" />
              <span>Book Another Slot</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. KEY METRICS SUMMARY STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <MetricCard
          title="Active Token"
          value={activeBooking?.token || 'SNP-014'}
          subtitle={bookedCentre.name.split(' ')[0] + ' Mandi'}
          icon={Wheat}
          highlight={true}
          badgeText={activeBooking?.status}
        />
        <MetricCard
          title="Queue Position"
          value={isCompleted ? '0 Farmers' : '3 Farmers Ahead'}
          subtitle={isCompleted ? 'Procurement Logged' : `Est. wait: ~${bookedCentre.estWaitMinutes} min`}
          icon={Clock}
        />
        <MetricCard
          title="Booked Mandi"
          value={bookedCentre.name.split(' ')[0]}
          subtitle={`${bookedCentre.distanceKm} km • ${bookedCentre.capacityPercent}% Load`}
          icon={MapPin}
          badgeText="Booked"
        />
        <MetricCard
          title="Target MSP Rate"
          value="₹2,200 / Qtl"
          subtitle="Paddy Grade A"
          icon={ShieldCheck}
        />
      </div>

      {/* 4. MAIN GRID: DIGITAL MANDI PASS + SMART RECOMMENDATION & HARVEST JOURNEY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        
        {/* Digital Mandi Pass (1 Col on Desktop, Priority Card on Mobile) */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="font-heading text-base font-bold text-agri-text flex items-center space-x-2">
            <Wheat className="w-4 h-4 text-agri-green" />
            <span>Digital Mandi Pass</span>
          </h2>
          <TokenDisplay
            booking={activeBooking}
            onLiveQueueClick={() => setFarmerTab('queue')}
          />
        </div>

        {/* Smart Recommendation & Harvest Journey (2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* RECOMMENDATION CARD (Clearly shows "Your current booking: Sonipat") */}
          <div className="paper-surface rounded-2xl p-4 sm:p-6 border-2 border-agri-green/30 relative shadow-agri-md space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-agri-ivory-muted">
              <div>
                <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1">
                  <span className="text-[10px] uppercase font-extrabold text-agri-gold bg-agri-gold-light/40 px-2.5 py-0.5 rounded-full border border-agri-gold/40 font-mono">
                    💡 BETTER OPTION AVAILABLE
                  </span>

                  <span className="text-[10px] uppercase font-bold text-agri-text bg-agri-ivory px-2.5 py-0.5 rounded-full border border-agri-ivory-muted font-sans">
                    Your Booking: <strong>{bookedCentre.name.split(' ')[0]}</strong>
                  </span>
                </div>
                
                <h3 className="font-heading text-lg sm:text-xl font-bold text-agri-green flex items-center gap-2 flex-wrap">
                  <span>Recommended:</span>
                  <span className="text-agri-text font-extrabold">{recommendedCentre.name}</span>
                </h3>

                <p className="text-xs text-agri-text-muted flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
                  <span>{recommendedCentre.address} • <strong>{recommendedCentre.distanceKm} km away</strong></span>
                </p>
              </div>

              {/* Get Directions Action */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${recommendedCentre.lat},${recommendedCentre.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-agri-green hover:bg-agri-green-dark text-white px-3.5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center justify-center space-x-1.5 shrink-0 transition-all shadow-agri-sm touch-target min-h-[44px]"
              >
                <Navigation className="w-4 h-4 text-agri-gold" />
                <span>📍 Get Directions</span>
              </a>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-agri-ivory/60 rounded-xl border border-agri-ivory-muted">
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Queue Wait</span>
                <p className="font-heading text-base sm:text-lg font-bold text-agri-gold-dark font-mono mt-0.5">~{recommendedCentre.estWaitMinutes} min</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Yard Load</span>
                <p className="font-heading text-base sm:text-lg font-bold text-agri-green font-mono mt-0.5">{recommendedCentre.capacityPercent}%</p>
              </div>
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Open Slots</span>
                <p className="font-heading text-base sm:text-lg font-bold text-agri-text font-mono mt-0.5">{recommendedCentre.availableSlots} free</p>
              </div>
            </div>

            {/* Explanation Toggle */}
            <div className="pt-0.5">
              <button
                onClick={() => setShowWhyRecommended(!showWhyRecommended)}
                className="text-xs font-bold text-agri-green hover:text-agri-green-dark inline-flex items-center space-x-1.5 touch-target min-h-[36px]"
              >
                <HelpCircle className="w-4 h-4 text-agri-gold" />
                <span>Why is this recommended?</span>
                <span className="text-[10px] text-agri-text-muted">({showWhyRecommended ? 'Hide' : 'Show reason'})</span>
              </button>

              {showWhyRecommended && (
                <div className="mt-2 p-3 bg-agri-ivory/80 rounded-xl border border-agri-ivory-muted text-xs text-agri-text space-y-1.5 animate-in fade-in duration-200">
                  <strong className="font-bold text-agri-green-dark block font-heading">
                    Telemetry Recommendation Rationale:
                  </strong>
                  <ul className="space-y-1 text-agri-text-muted list-disc list-inside">
                    <li><strong>Wait Time:</strong> ~{recommendedCentre.estWaitMinutes} min wait vs ~{bookedCentre.estWaitMinutes} min at {bookedCentre.name.split(' ')[0]}.</li>
                    <li><strong>Yard Capacity:</strong> Operating at {recommendedCentre.capacityPercent}% load threshold.</li>
                    <li><strong>Open Slots:</strong> {recommendedCentre.availableSlots} arrival slots available today.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="pt-2 border-t border-agri-ivory-muted flex items-center justify-between gap-2">
              <p className="text-xs text-agri-text-muted italic flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-agri-green shrink-0" />
                <span className="line-clamp-1">{recommendedCentre.recommendationReason}</span>
              </p>

              <button
                onClick={() => setFarmerTab('centres')}
                className="text-xs font-bold text-agri-green hover:text-agri-green-dark flex items-center space-x-1 shrink-0 touch-target min-h-[36px]"
              >
                <span>View All Mandis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* HARVEST JOURNEY TIMELINE */}
          <div className="paper-surface rounded-2xl p-4 sm:p-6 border border-agri-ivory-muted shadow-agri-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-agri-ivory-muted">
              <div>
                <h3 className="font-heading text-base font-bold text-agri-text">
                  Harvest Journey Tracker
                </h3>
                <p className="text-xs text-agri-text-muted">
                  Booking Ref: <strong className="font-mono text-agri-green">{activeBooking?.bookingId || 'BK-2026-8812'}</strong>
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-agri-green bg-agri-green-soft px-2 py-0.5 rounded border border-agri-green-border font-mono">
                Live Status
              </span>
            </div>

            {/* 4-Stage Progress Track */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              
              {/* Step 1: Slot Booked */}
              <div className="p-2.5 rounded-xl bg-agri-green-soft border border-agri-green-border">
                <div className="w-6 h-6 mx-auto rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-xs mb-1">
                  ✓
                </div>
                <span className="font-bold text-agri-green-dark block text-xs">1. Slot Booked</span>
                <span className="text-[10px] text-agri-text-muted font-mono">{activeBooking?.slotTime || '11:00 AM'}</span>
              </div>

              {/* Step 2: Gate Check-in */}
              <div className={`p-2.5 rounded-xl border ${
                activeBooking?.status !== 'WAITING'
                  ? 'bg-agri-green-soft border-agri-green-border'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center text-xs mb-1 ${
                  activeBooking?.status !== 'WAITING' ? 'bg-agri-green text-white' : 'bg-agri-gold text-agri-green-dark'
                }`}>
                  {activeBooking?.status !== 'WAITING' ? '✓' : '2'}
                </div>
                <span className="font-bold text-agri-text block text-xs">2. Gate Check-in</span>
                <span className="text-[10px] text-agri-text-muted">
                  {activeBooking?.status === 'WAITING' ? 'Pending' : 'Verified'}
                </span>
              </div>

              {/* Step 3: Inspection & Weighment */}
              <div className={`p-2.5 rounded-xl border ${
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
                <span className="font-bold text-agri-text block text-xs">3. Inspection</span>
                <span className="text-[10px] text-agri-text-muted">
                  {isCompleted ? '38.5 Qtl Logged' : isProcessing ? 'In Progress' : 'Counter 2'}
                </span>
              </div>

              {/* Step 4: DBT Payment */}
              <div className={`p-2.5 rounded-xl border ${
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
                <span className="font-bold text-agri-text block text-xs">4. DBT Payout</span>
                <span className="text-[10px] text-agri-text-muted font-mono">
                  {isDisbursed ? '₹84,700 Paid' : 'Pending'}
                </span>
              </div>

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

