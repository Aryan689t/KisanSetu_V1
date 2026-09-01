import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Clock, CheckCircle2, UserCheck, AlertTriangle, Navigation, ArrowRight, MapPin } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { TokenDisplay } from '../ui/TokenDisplay';

export const LiveQueueTracker = () => {
  const { queueItems, activeBooking, lang, centres } = useDemo();

  const currentCentre = centres.find(c => c.id === activeBooking?.centreId) || centres[0];
  const youTokenIndex = queueItems.findIndex(q => q.token === activeBooking?.token);
  const farmersAheadCount = Math.max(0, youTokenIndex - 1);

  const isCompleted = activeBooking?.status === 'COMPLETED';
  const isDisbursed = activeBooking?.paymentStatus === 'DISBURSED';
  const isProcessing = activeBooking?.status === 'PROCESSING';
  const isCheckedIn = activeBooking?.status === 'CHECKED_IN';

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-6 sm:pb-0">
      
      {/* 1. PRIMARY FARMER TOKEN & TURN HERO CARD */}
      <div className="bg-[#17432A] text-white rounded-2xl p-5 sm:p-6 shadow-agri-md relative space-y-4 font-sans">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-[11px] font-bold text-agri-gold bg-agri-gold/20 px-2.5 py-0.5 rounded-full border border-agri-gold/30 font-sans inline-flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-agri-gold" />
              <span>{lang === 'hi' ? 'आपकी बारी' : 'Your turn'}</span>
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {lang === 'hi' ? 'कतार की स्थिति' : 'Live Queue'}
            </h1>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-agri-ivory/70 block font-sans">{lang === 'hi' ? 'टोकन नंबर' : 'Token'}</span>
            <span className="font-heading font-extrabold text-3xl text-agri-gold font-mono">
              {activeBooking?.token || 'SNP-014'}
            </span>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className="bg-[#102e1c] p-4 rounded-xl border border-agri-gold/30 space-y-3 font-sans">
          
          {/* WAITING State */}
          {activeBooking?.status === 'WAITING' && (
            <div className="space-y-3 text-amber-100 font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-agri-gold animate-ping"></span>
                <strong className="font-bold text-base text-agri-gold font-sans">
                  {lang === 'hi' ? 'अपनी बारी का इंतज़ार करें' : 'Waiting for your turn'}
                </strong>
              </div>

              <div className="flex items-center justify-between text-xs text-agri-ivory/90 bg-[#17432A] p-3 rounded-xl border border-white/10 font-sans">
                <div>
                  <span className="text-agri-ivory/70 block text-[11px]">{lang === 'hi' ? 'आपकी स्थिति:' : 'Your status:'}</span>
                  <strong className="text-agri-gold font-bold text-sm font-sans">{farmersAheadCount} {lang === 'hi' ? 'किसान आगे हैं' : 'farmers ahead'} (~{farmersAheadCount * 10 + 12} min wait)</strong>
                </div>
              </div>

              <p className="text-xs text-agri-ivory/90 text-center font-sans">
                {lang === 'hi'
                  ? 'कृपया अपने टोकन नंबर का बुलावा आने तक मंडी परिसर में रहें।'
                  : 'Please stay near the mandi yard until your token is called.'}
              </p>
            </div>
          )}

          {/* CHECKED_IN State */}
          {isCheckedIn && (
            <div className="space-y-2 text-blue-100 font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <strong className="font-bold text-base text-white">
                  {lang === 'hi' ? 'गेट चेक-इन पूरा हुआ' : 'Gate Check-in Verified'}
                </strong>
              </div>
              <p className="text-xs text-blue-100/90 font-sans">
                {lang === 'hi'
                  ? 'गेट पर सत्यापन पूरा हो गया है। कृपया काउंटर 2 के पास रहें।'
                  : 'Check-in verified at entry gate. Please stay near Counter 2.'}
              </p>
            </div>
          )}

          {/* PROCESSING State */}
          {isProcessing && (
            <div className="space-y-2 text-agri-green-dark bg-agri-gold p-3.5 rounded-xl font-sans">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-agri-green-dark animate-bounce"></span>
                <strong className="font-extrabold text-base">
                  {lang === 'hi' ? 'आपकी बारी आ गई है!' : 'Your turn has arrived!'}
                </strong>
              </div>
              <p className="text-xs font-semibold text-agri-green-dark font-sans">
                {lang === 'hi'
                  ? 'टोकन SNP-014: कृपया तुरंत काउंटर 2 पर तौल के लिए जाएं।'
                  : 'Token SNP-014: Proceed immediately to Counter 2 for crop inspection.'}
              </p>
            </div>
          )}

          {/* COMPLETED State */}
          {isCompleted && (
            <div className="space-y-2 text-emerald-100 font-sans">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <strong className="font-bold text-base text-white">
                  {lang === 'hi' ? 'फसल तौल दर्ज हो गया है' : 'Procurement Logged'}
                </strong>
              </div>
              <p className="text-xs text-emerald-100/90 font-sans">
                {lang === 'hi'
                  ? `वजन: ${activeBooking?.actualQty || 38.5} क्विंटल। बैंक भुगतान प्रक्रिया में है।`
                  : `Weighed: ${activeBooking?.actualQty || 38.5} Qtl. Payout ₹${((activeBooking?.actualQty || 38.5) * 2200).toLocaleString()} via bank transfer.`}
              </p>
            </div>
          )}

        </div>

        {/* Location & Directions Button */}
        <div className="flex items-center justify-between pt-1 font-sans">
          <div className="text-xs text-agri-ivory/80">
            <span className="block font-bold text-white">{currentCentre.name}</span>
            <span className="text-[11px]">{lang === 'hi' ? 'स्लॉट समय:' : 'Slot:'} {activeBooking?.slotTime || '11:00 AM – 11:30 AM'}</span>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${currentCentre.lat},${currentCentre.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-all touch-target min-h-[40px] font-sans"
          >
            <Navigation className="w-3.5 h-3.5 text-agri-gold" />
            <span>{lang === 'hi' ? 'रास्ता देखें' : 'Get Directions'}</span>
          </a>
        </div>

      </div>

      {/* 2. SIMPLIFIED FARMER QUEUE TIMELINE */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-agri-ivory-muted shadow-sm space-y-4 font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-agri-ivory-muted">
          <div>
            <h3 className="font-heading text-base font-bold text-agri-text flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-agri-green" />
              <span>{lang === 'hi' ? 'मंडी कतार' : 'Mandi Queue'}</span>
            </h3>
            <p className="text-xs text-agri-text-muted">
              {currentCentre.name} • {lang === 'hi' ? 'काउंटर स्थिति' : 'Counter status'}
            </p>
          </div>

          <span className="text-[11px] font-bold text-agri-green bg-agri-green-soft px-2.5 py-0.5 rounded-full border border-agri-green-border font-sans">
            Counter 2
          </span>
        </div>

        {/* Simplified Queue List */}
        <div className="space-y-2.5">
          {queueItems.map((item) => {
            const isYou = item.token === activeBooking?.token;
            const isDone = item.status === 'COMPLETED';
            const isAtCounter = item.status === 'PROCESSING';

            return (
              <div
                key={item.token}
                className={`p-3.5 rounded-xl border transition-all ${
                  isYou
                    ? 'bg-[#FAF7EE] border-2 border-agri-gold shadow-sm ring-1 ring-agri-gold/40'
                    : isAtCounter
                    ? 'bg-amber-50 border-amber-300'
                    : isDone
                    ? 'bg-gray-50 border-gray-200 text-gray-500'
                    : 'bg-white border-agri-ivory-muted'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    {/* Status Symbol */}
                    <span className="text-base font-bold inline-flex items-center justify-center">
                      {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : isAtCounter ? <ArrowRight className="w-4 h-4 text-amber-600" /> : isYou ? <span className="w-2.5 h-2.5 rounded-full bg-agri-gold ring-2 ring-agri-gold/40"></span> : <span className="w-2 h-2 rounded-full bg-gray-400"></span>}
                    </span>

                    <span className="font-heading font-extrabold text-base text-agri-green font-mono">
                      {item.token}
                    </span>

                    <span className="text-xs font-bold text-agri-text">
                      {isYou ? (lang === 'hi' ? 'आप (रमेश सिंह)' : 'You (Ramesh Singh)') : item.farmerName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : isAtCounter
                        ? 'bg-amber-200 text-amber-900 font-extrabold animate-pulse'
                        : isYou
                        ? 'bg-agri-gold text-agri-green-dark font-extrabold'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isDone
                        ? (lang === 'hi' ? 'पूरा हुआ' : 'Completed')
                        : isAtCounter
                        ? (lang === 'hi' ? 'काउंटर 2 पर' : 'At Counter 2')
                        : isYou
                        ? (lang === 'hi' ? 'आपकी बारी' : 'Your Turn')
                        : (lang === 'hi' ? 'इंतजार में' : 'Waiting')}
                    </span>
                  </div>
                </div>

                {/* Subtitle helper for logged-in farmer */}
                {isYou && (
                  <p className="text-xs font-semibold text-agri-green-dark mt-1.5 pl-7">
                    {lang === 'hi'
                      ? `आपकी बारी आने वाली है • ${farmersAheadCount} किसान आगे हैं`
                      : `Your turn is coming • ${farmersAheadCount} farmers ahead`}
                  </p>
                )}

                {/* Simple Crop Summary line without internal debug details */}
                <div className="pt-2 mt-2 border-t border-agri-ivory-muted/60 flex items-center justify-between text-[11px]">
                  <span className="text-agri-text-muted">
                    {lang === 'hi' ? 'फसल:' : 'Crop:'} <strong className="text-agri-text">{item.crop} ({item.expectedQty} Qtl)</strong>
                  </span>
                  {isDone && item.actualQty && (
                    <span className="font-bold text-emerald-700">
                      {item.actualQty} Qtl Logged
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

