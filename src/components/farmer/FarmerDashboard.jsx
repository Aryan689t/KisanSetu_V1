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
    setDismissedRerouteAlert,
    lang
  } = useDemo();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCentreForBooking, setSelectedCentreForBooking] = useState(null);

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
    <div className="space-y-5 animate-in fade-in duration-300 font-sans pb-6 sm:pb-0">
      
      {/* 1. DYNAMIC CONGESTION REROUTING ALERT */}
      {shouldShowRerouteWarning && (
        <div className="bg-[#4A1510] text-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-rose-500 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-rose-900 text-amber-300 rounded-xl shrink-0 border border-rose-500">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold bg-amber-400 text-rose-950 px-2.5 py-0.5 rounded font-sans inline-flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-950 shrink-0" />
                <span>{lang === 'hi' ? 'सोनीपत मंडी में भारी भीड़' : 'Sonipat Mandi is very busy'}</span>
              </span>

              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                {lang === 'hi'
                  ? `${bookedCentre.name} में इंतजार समय बढ़कर लगभग ${bookedCentre.estWaitMinutes} मिनट हो गया है`
                  : `${bookedCentre.name} waiting time increased to about ${bookedCentre.estWaitMinutes} minutes`}
              </h3>

              <p className="text-xs text-rose-100 leading-relaxed max-w-xl">
                {lang === 'hi'
                  ? `आपकी बुकिंग सोनीपत मंडी की है। पास की पानीपत मंडी में केवल लगभग ${recommendedCentre.estWaitMinutes} मिनट का इंतजार है।`
                  : `Your booking remains at Sonipat. Panipat Mandi is available nearby with only about ${recommendedCentre.estWaitMinutes} minutes wait.`}
              </p>
            </div>
          </div>

          {/* Reroute Contextual Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                switchBookingCentre(recommendedCentre.id);
              }}
              className="bg-amber-400 hover:bg-amber-300 text-rose-950 font-extrabold text-xs px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[48px]"
            >
              <span>{lang === 'hi' ? `पानीपत बदलें (~${recommendedCentre.estWaitMinutes} मिनट)` : `Switch to Panipat (~${recommendedCentre.estWaitMinutes} min wait)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDismissedRerouteAlert(true)}
              className="bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-semibold px-4 py-3 rounded-xl transition-colors border border-rose-700 text-center touch-target min-h-[48px]"
            >
              {lang === 'hi' ? 'सोनीपत ही रखें' : 'Keep Sonipat'}
            </button>
          </div>
        </div>
      )}

      {/* 2. PRIMARY FARMER STATUS HERO CARD (P0-1 & P0-2 & P0-3) */}
      <div className="bg-[#17432A] text-white rounded-2xl p-5 sm:p-6 shadow-agri-md space-y-4">
        
        {/* Greeting Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
              {lang === 'hi' ? 'नमस्ते, रमेश जी' : 'Namaste, Ramesh ji'}
            </h1>
            <p className="text-xs text-agri-ivory/80 mt-0.5">
              {lang === 'hi' ? 'आपकी फसल खरीद स्थिति' : 'Your crop procurement status'}
            </p>
          </div>

          <span className="text-xs text-agri-gold bg-[#102e1c] px-3 py-1.5 rounded-xl border border-agri-gold/20 font-mono">
            {bookedCentre.name.split(' ')[0]} Yard
          </span>
        </div>

        {/* PRIMARY STATUS & ONE VISUALLY DOMINANT PRIMARY CTA (P0-1) */}
        <div className="bg-[#102e1c] p-4.5 rounded-xl border border-agri-gold/30 space-y-3.5">
          
          {/* WAITING State */}
          {activeBooking?.status === 'WAITING' && (
            <div className="space-y-3 text-amber-100">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs text-agri-gold font-bold block">
                    {lang === 'hi' ? 'आपकी बारी आने वाली है' : 'Your turn is coming'}
                  </span>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white font-mono tracking-tight mt-0.5">
                    {activeBooking?.token || 'SNP-014'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-agri-ivory/70 block font-sans">
                    {lang === 'hi' ? 'आगे किसान' : 'Farmers ahead'}
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-agri-gold font-sans block mt-0.5">
                    3
                  </span>
                </div>
              </div>

              {/* Natural sans-serif text layout */}
              <div className="space-y-2 text-xs text-agri-ivory/90 bg-[#17432A] p-3 rounded-xl border border-white/10 font-sans">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-agri-gold shrink-0" />
                    <span>{lang === 'hi' ? 'अनुमानित इंतजार समय:' : 'Estimated waiting time:'}</span>
                  </span>
                  <strong className="text-agri-gold font-bold text-sm font-sans">~{bookedCentre.estWaitMinutes} minutes</strong>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-agri-ivory/80">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-agri-gold shrink-0" />
                    <span>{bookedCentre.name}</span>
                  </span>
                  <span>Slot: <strong className="text-white font-bold">{activeBooking?.slotTime || '11:00 AM – 11:30 AM'}</strong></span>
                </div>
              </div>

              {/* THE ONE VISUALLY DOMINANT PRIMARY CTA */}
              <button
                onClick={() => {
                  setFarmerTab('queue');
                }}
                className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px] active:scale-95"
              >
                <Clock className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपनी बारी का ट्रैक करें' : 'Track My Turn'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* CHECKED_IN State */}
          {isCheckedIn && (
            <div className="space-y-3 text-blue-100">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs text-blue-300 font-bold block">
                    {lang === 'hi' ? 'गेट चेक-इन पूरा हुआ' : 'Gate Check-in Verified'}
                  </span>
                  <span className="font-heading font-extrabold text-3xl text-white font-mono mt-0.5 block">
                    {activeBooking?.token}
                  </span>
                </div>
                <span className="bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/40 font-sans inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-blue-300" />
                  <span>Verified</span>
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('queue')}
                className="w-full bg-blue-400 hover:bg-blue-300 text-agri-green-dark font-extrabold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <Clock className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपनी बारी का ट्रैक करें' : 'Track My Turn'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PROCESSING State */}
          {isProcessing && (
            <div className="space-y-3 text-agri-green-dark bg-agri-gold p-4 rounded-xl">
              <div className="flex items-center justify-between border-b border-agri-green-dark/20 pb-2">
                <div>
                  <span className="text-xs font-extrabold block">
                    {lang === 'hi' ? 'आपकी बारी आ गई है!' : 'Your turn has arrived!'}
                  </span>
                  <span className="font-heading font-extrabold text-3xl font-mono mt-0.5 block">
                    #{activeBooking?.token}
                  </span>
                </div>
                <span className="bg-agri-green text-white text-xs font-extrabold px-3 py-1 rounded-full animate-bounce font-sans">
                  Counter 2
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('queue')}
                className="w-full bg-agri-green-dark hover:bg-agri-green text-white font-extrabold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>{lang === 'hi' ? 'काउंटर 2 पर जाएं' : 'Proceed to Counter 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* COMPLETED State */}
          {isCompleted && (
            <div className="space-y-3 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs text-agri-gold font-bold block">
                    {lang === 'hi' ? 'फसल तौल पूरा हुआ' : 'Crop Weighed & Logged'}
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-agri-gold font-sans mt-0.5 block">
                    {activeBooking?.actualQty || 38.5} Quintals
                  </span>
                </div>
                <span className="bg-agri-gold/20 text-agri-gold text-xs font-bold px-3 py-1 rounded-full border border-agri-gold/30 font-sans">
                  DBT Pending
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('history')}
                className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>{lang === 'hi' ? 'भुगतान राशि देखें' : 'View Payment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 3. WHAT HAPPENS NEXT? (CLEAN STEP SEQUENCE) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-agri-ivory-muted shadow-sm space-y-3 font-sans">
        <h3 className="font-heading text-base font-bold text-agri-text flex items-center space-x-2">
          <Clock className="w-5 h-5 text-agri-green shrink-0" />
          <span>{lang === 'hi' ? 'आगे की प्रक्रिया' : 'What happens next?'}</span>
        </h3>

        <div className="divide-y divide-agri-ivory-muted text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-6 rounded-full bg-agri-green/10 text-agri-green font-bold flex items-center justify-center text-xs shrink-0">1</span>
              <div>
                <span className="font-bold text-agri-text block">{lang === 'hi' ? 'बारी का इंतजार' : 'Wait for your turn'}</span>
                <span className="text-[11px] text-agri-text-muted">{lang === 'hi' ? 'बुलावा आने तक इंतजार करें' : 'Track queue status on phone'}</span>
              </div>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-6 rounded-full bg-agri-green/10 text-agri-green font-bold flex items-center justify-center text-xs shrink-0">2</span>
              <div>
                <span className="font-bold text-agri-text block">{lang === 'hi' ? 'मंडी पहुंचें' : 'Reach the mandi'}</span>
                <span className="text-[11px] text-agri-text-muted">{lang === 'hi' ? 'बुलावा आने पर मंडी गेट आएं' : 'Arrive at gate when called'}</span>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${bookedCentre.lat},${bookedCentre.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-agri-green hover:underline shrink-0 inline-flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5 text-agri-green" />
              <span>{lang === 'hi' ? 'रास्ता' : 'Map'}</span>
            </a>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-6 rounded-full bg-agri-green/10 text-agri-green font-bold flex items-center justify-center text-xs shrink-0">3</span>
              <div>
                <span className="font-bold text-agri-text block">{lang === 'hi' ? 'पास दिखाएं' : 'Show Mandi Pass'}</span>
                <span className="text-[11px] text-agri-text-muted">{lang === 'hi' ? 'काउंटर 2 पर अपना टोकन बताएं' : 'Show token at Counter 2'}</span>
              </div>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-6 rounded-full bg-agri-green/10 text-agri-green font-bold flex items-center justify-center text-xs shrink-0">4</span>
              <div>
                <span className="font-bold text-agri-text block">{lang === 'hi' ? 'फसल का तौल' : 'Weigh crop & get payout'}</span>
                <span className="text-[11px] text-agri-text-muted">{lang === 'hi' ? 'वजन कराएं और बैंक खाते में भुगतान पाएं' : 'Weighment & bank transfer'}</span>
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

