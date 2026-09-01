import { useDemo } from '../../context/DemoContext';
import { MapPin, Clock, ArrowRight, CheckCircle2, AlertTriangle, Navigation, Plus } from 'lucide-react';

export const FarmerDashboard = () => {
  const {
    activeBooking,
    setFarmerTab,
    centres,
    getRecommendedCentre,
    switchBookingCentre,
    dismissedRerouteAlert,
    setDismissedRerouteAlert,
    lang,
    speakText
  } = useDemo();

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

  const t = (en, hi) => (lang === 'hi' ? hi : en);

  // Farmers ahead (queue position based)
  const farmersAheadCount = Math.max(0, 2); // default demo context

  return (
    <div className="space-y-4 animate-in fade-in duration-300">

      {/* GREETING — light touch, then straight to the one thing that matters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-lg sm:text-xl font-bold text-agri-text">
            {t('Namaste, Ramesh Singh ji 🙏', 'नमस्ते, रमेश सिंह जी 🙏')}
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5">
            {isCompleted || isDisbursed
              ? t('Your procurement is done. 🎉', 'आपकी खरीद पूरी हो गई है। 🎉')
              : t('Here is what to do next', 'अगला कदम यह है')}
          </p>
        </div>
        <button
          onClick={() => setFarmerTab('centres')}
          className="bg-agri-green hover:bg-agri-green-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold touch-target min-h-[44px] shadow-agri-sm transition-all inline-flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{t('Book Slot', 'स्लॉट बुक करें')}</span>
        </button>
      </div>

      {/* 1. DYNAMIC CONGESTION REROUTING ALERT (prominent, high contrast) */}
      {shouldShowRerouteWarning && (
        <div className="bg-[#4A1510] text-white rounded-2xl p-4 sm:p-5 shadow-lg border-2 border-rose-500 relative overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-rose-900 text-amber-300 rounded-xl shrink-0 border border-rose-500">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase bg-amber-400 text-rose-950 px-2.5 py-0.5 rounded font-mono">
                  {t('⚠️ मंडी में भारी भीड़', '⚠️ MANDI HEAVY TRAFFIC ALERT')}
                </span>

                <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                  {t(
                    `${bookedCentre.name} में इंतजार बढ़कर ~${bookedCentre.estWaitMinutes} मिनट`,
                    `${bookedCentre.name} waiting is now ~${bookedCentre.estWaitMinutes} min`
                  )}
                </h3>

                <p className="text-xs text-rose-100 leading-relaxed max-w-xl">
                  {t(
                    `आपकी बुकिंग ${bookedCentre.name} की है। पास की मंडी में सिर्फ ~${recommendedCentre.estWaitMinutes} मिनट का इंतजार है।`,
                    `Your booking is at ${bookedCentre.name}. A nearby mandi has just ~${recommendedCentre.estWaitMinutes} min wait.`
                  )}
                </p>
              </div>
            </div>

            {/* Reroute Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <button
                onClick={() => {
                  switchBookingCentre(recommendedCentre.id);
                  speakText('आपकी बुकिंग बदल दी गई है', 'Your booking has been switched');
                }}
                className="bg-amber-400 hover:bg-amber-300 text-rose-950 font-extrabold text-sm px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[48px]"
              >
                <span>{t('पानीपत बदलें (~31म)', `Switch to ${recommendedCentre.name.split(' ')[0]} (~${recommendedCentre.estWaitMinutes}m)`)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDismissedRerouteAlert(true)}
                className="bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-semibold px-4 py-3 rounded-xl transition-colors border border-rose-700 text-center touch-target min-h-[44px]"
              >
                {t('अभी नहीं', 'Not now')}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. PRIMARY FARMER TOKEN CARD — ONE question answered: "What do I do now?" */}
      <div className="bg-[#17432A] text-white rounded-2xl p-5 sm:p-6 shadow-agri-md relative overflow-hidden space-y-4">
        {/* PRIMARY TASK BOX */}
        <div className="p-4.5 rounded-xl bg-[#123621] border border-agri-gold/30 shadow-inner font-sans space-y-3">

          {/* WAITING State */}
          {activeBooking?.status === 'WAITING' && (
            <div className="space-y-3.5 text-amber-100">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] text-agri-gold font-bold block">
                    {t('आपका टोकन नंबर', 'Your Token Number')}
                  </span>
                  <span className="font-heading font-extrabold text-3xl sm:text-4xl text-agri-gold font-mono tracking-tight">
                    {activeBooking?.token || 'SNP-014'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-agri-ivory/70 block">
                    {t('काउंटर', 'Counter')}
                  </span>
                  <span className="text-xs font-bold text-white font-mono bg-[#17432A] px-2.5 py-1 rounded-lg border border-agri-gold/30 inline-block mt-0.5">
                    {activeBooking?.counter || 'Counter 2'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#17432A]/80 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-agri-ivory/80 block">
                    {t('आगे किसान', 'Farmers ahead')}
                  </span>
                  <p className="font-heading text-2xl font-extrabold text-white font-mono mt-0.5">{farmersAheadCount}</p>
                </div>
                <div className="bg-[#17432A]/80 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-agri-ivory/80 block">
                    {t('अनुमानित समय', 'Estimated wait')}
                  </span>
                  <p className="font-heading text-2xl font-extrabold text-agri-gold font-mono mt-0.5">~{bookedCentre.estWaitMinutes} min</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setFarmerTab('queue');
                  speakText('अपनी कतार स्थिति देखें', 'Tracking live queue position');
                }}
                className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>⏱ {t('ट्रैक करें', 'Track My Turn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* CHECKED_IN State */}
          {isCheckedIn && (
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] text-blue-300 font-bold block">
                    {t('गेट चेक-इन सत्यापित', 'Gate Check-in Verified')}
                  </span>
                  <span className="font-heading font-extrabold text-3xl text-white font-mono">
                    {activeBooking?.token}
                  </span>
                </div>
                <span className="bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/40">
                  ✓ {t('गेट एंट्री पास', 'Gate Verified')}
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('queue')}
                className="w-full bg-blue-400 hover:bg-blue-300 text-agri-green-dark font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>{t('कतार स्थिति देखें', 'View Queue Position')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PROCESSING State */}
          {isProcessing && (
            <div className="space-y-3 text-agri-green-dark">
              <div className="flex items-center justify-between border-b border-agri-green-dark/20 pb-3">
                <div>
                  <span className="text-[11px] font-extrabold text-agri-green-dark block">
                    🔔 {t('आपकी बारी आ गई है!', 'Turn Arrived!')}
                  </span>
                  <span className="font-heading font-extrabold text-3xl text-agri-green-dark font-mono">
                    #{activeBooking?.token}
                  </span>
                </div>
                <span className="bg-agri-green text-white text-xs font-extrabold px-3 py-1 rounded-full animate-bounce">
                  {activeBooking?.counter || 'Counter 2'}
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('queue')}
                className="w-full bg-agri-green-dark hover:bg-agri-green text-white font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>{t(`काउंटर ${activeBooking?.counter?.replace('Counter ', '') || '2'} पर जाएं`, `Proceed to ${activeBooking?.counter || 'Counter 2'}`)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* COMPLETED / DISBURSED State */}
          {(isCompleted || isDisbursed) && (
            <div className="space-y-3 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[11px] text-agri-gold font-bold block">
                    {isDisbursed
                      ? t('भुगतान प्राप्त हुआ', 'Payment Received')
                      : t('फसल तौल दर्ज', 'Procurement Logged')}
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-agri-gold font-mono">
                    {isDisbursed
                      ? '✓'
                      : `${activeBooking?.actualQty || 38.5} Quintals`}
                  </span>
                </div>
                <span className="bg-agri-gold/20 text-agri-gold text-xs font-bold px-3 py-1 rounded-full border border-agri-gold/30">
                  {isDisbursed ? t('भुगतान हो गया', 'Paid') : 'DBT Pending'}
                </span>
              </div>
              <button
                onClick={() => setFarmerTab('history')}
                className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-5 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-agri-sm touch-target min-h-[48px]"
              >
                <span>{t('भुगतान रसीद देखें', 'View Payout Receipt')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Merged Mandi Info + Directions (was a separate card) */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="min-w-0">
            <span className="text-[10px] text-agri-ivory/70 font-bold block">
              📍 {t('आपकी मंडी', 'Your Mandi')}
            </span>
            <p className="font-heading font-bold text-sm text-white truncate">
              {bookedCentre.name}
            </p>
            <p className="text-[11px] text-agri-ivory/80 truncate">
              <span className="font-mono text-agri-gold">{activeBooking?.slotTime || '11:00 AM – 11:30 AM'}</span>
              <span className="mx-1.5 text-agri-ivory/50">·</span>
              {bookedCentre.distanceKm} km
            </p>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${bookedCentre.lat},${bookedCentre.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => speakText('मानचित्र दिशा-निर्देश खोले जा रहे हैं', 'Opening Google Maps directions')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shrink-0 transition-all touch-target min-h-[44px]"
          >
            <Navigation className="w-4 h-4 text-agri-gold" />
            <span>📍 {t('रास्ता देखें', 'Get Directions')}</span>
          </a>
        </div>
      </div>

      {/* 3. QUICK ACTION SHORTCUTS — optional, hidden secondary info stays out of the way */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <button
          onClick={() => setFarmerTab('centres')}
          className="bg-white rounded-xl p-3 border border-agri-ivory-muted shadow-sm hover:border-agri-gold transition-all touch-target min-h-[56px] flex flex-col items-center justify-center"
        >
          <MapPin className="w-5 h-5 text-agri-green mb-1" />
          <span className="text-[11px] font-bold text-agri-text">{t('मंडी खोजें', 'Find Mandi')}</span>
        </button>

        <button
          onClick={() => setFarmerTab('queue')}
          className="bg-white rounded-xl p-3 border border-agri-ivory-muted shadow-sm hover:border-agri-gold transition-all touch-target min-h-[56px] flex flex-col items-center justify-center"
        >
          <Clock className="w-5 h-5 text-agri-green mb-1" />
          <span className="text-[11px] font-bold text-agri-text">{t('मेरी कतार', 'My Queue')}</span>
        </button>

        <button
          onClick={() => setFarmerTab('history')}
          className="bg-white rounded-xl p-3 border border-agri-ivory-muted shadow-sm hover:border-agri-gold transition-all touch-target min-h-[56px] flex flex-col items-center justify-center"
        >
          <CheckCircle2 className="w-5 h-5 text-agri-green mb-1" />
          <span className="text-[11px] font-bold text-agri-text">{t('भुगतान', 'Payments')}</span>
        </button>
      </div>

    </div>
  );
};