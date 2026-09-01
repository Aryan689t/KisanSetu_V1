import { useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { CheckCircle2, UserCheck, Cpu, ShieldCheck, ArrowRight, X, Calendar, Ticket, Clock, MapPin, Scale, Wallet } from 'lucide-react';

const WALKTHROUGH_STEPS = [
  {
    icon: Calendar,
    color: 'bg-agri-green',
    key: 'book',
    titleEn: 'Book your slot',
    titleHi: 'स्लॉट बुक करें',
    descEn: 'Pick a mandi and a time. You get a confirmed slot — no standing in line.',
    descHi: 'मंडी और समय चुनें। आपका स्लॉट पक्का होता है — लाइन में खड़े होने की ज़रूरत नहीं।'
  },
  {
    icon: Ticket,
    color: 'bg-agri-gold',
    key: 'token',
    titleEn: 'Get your token',
    titleHi: 'टोकन पाएं',
    descEn: 'A token number appears instantly. Remember it — that is your pass.',
    descHi: 'आपका टोकन नंबर तुरंत आता है। इसे याद रखें — यही आपका पास है।'
  },
  {
    icon: Clock,
    color: 'bg-blue-600',
    key: 'wait',
    titleEn: 'Wait for your turn',
    titleHi: 'बारी का इंतज़ार करें',
    descEn: 'Watch your live queue position. No need to wait at the mandi early.',
    descHi: 'कतार में अपनी लाइव स्थिति देखें। मंडी में समय से पहले जाने की ज़रूरत नहीं।'
  },
  {
    icon: MapPin,
    color: 'bg-rose-600',
    key: 'reach',
    titleEn: 'Reach the mandi',
    titleHi: 'मंडी पहुंचें',
    descEn: 'Get directions, then check in at the gate when called.',
    descHi: 'रास्ता देखें, फिर बुलावा आने पर गेट पर चेक-इन करें।'
  },
  {
    icon: Scale,
    color: 'bg-purple-600',
    key: 'sell',
    titleEn: 'Sell your crop',
    titleHi: 'फसल बेचें',
    descEn: 'Your crop is weighed on the machine and quality is checked.',
    descHi: 'धर्मकांटे पर आपकी फसल का तौल होता है और गुणवत्ता जांची जाती है।'
  },
  {
    icon: Wallet,
    color: 'bg-emerald-600',
    key: 'payment',
    titleEn: 'Get paid directly',
    titleHi: 'सीधा भुगतान पाएं',
    descEn: 'MSP money is credited straight to your bank account. No middlemen.',
    descHi: 'MSP राशि सीधे आपके बैंक खाते में आती है। कोई बिचौलिया नहीं।'
  }
];

export const OnboardingModal = () => {
  const {
    lang, setLang, setActiveRole,
    isOnboardingOpen, setIsOnboardingOpen,
    onboardingStep: step, setOnboardingStep: setStep,
    onboardingWalkStep: walkStep, setOnboardingWalkStep: setWalkStep,
    hasSeenWalkthrough, setHasSeenWalkthrough, openOnboarding
  } = useDemo();

  // Auto-open full onboarding on the very first visit so farmers learn how the app works
  useEffect(() => {
    if (!hasSeenWalkthrough) {
      openOnboarding();
    }
    // Runs once on mount to check the first-visit flag in localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOnboardingOpen) return null;

  const t = (en, hi) => (lang === 'hi' ? hi : en);

  const finishWalkthrough = () => {
    setHasSeenWalkthrough(true);
    try {
      localStorage.setItem('kisansetu_has_seen_walkthrough', 'true');
    } catch { /* ignore */ }
    setIsOnboardingOpen(false);
    setWalkStep(0);
  };

  const stepLabel = () => {
    if (step === 1) return t('Step 1: Language', 'चरण 1: भाषा');
    if (step === 2) return t('Step 2: Account', 'चरण 2: खाता');
    return t('Step 3: How it works', 'चरण 3: कैसे काम करता है');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF7] text-agri-text w-full max-w-md rounded-2xl border-2 border-agri-gold shadow-2xl p-6 relative space-y-6 max-h-[90vh] overflow-y-auto">

        {/* Close Button (only allow skipping on walkthrough) */}
        <button
          onClick={() => {
            if (step === 3) finishWalkthrough();
            else setIsOnboardingOpen(false);
          }}
          className="absolute top-4 right-4 p-2 text-agri-text-muted hover:text-agri-text rounded-full hover:bg-agri-ivory transition-colors"
          title="Close / Skip"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2 text-xs font-bold text-agri-green">
          <span className="w-6 h-6 rounded-full bg-agri-green text-white flex items-center justify-center font-mono text-xs">
            {step}
          </span>
          <span>{stepLabel()}</span>
        </div>

        {/* STEP 1: CHOOSE LANGUAGE */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-heading text-2xl font-bold text-agri-green">
                Namaste! Welcome to KisanSetu
              </h2>
              <p className="text-sm text-agri-text-muted">
                अपनी भाषा का चयन करें / Choose your preferred language
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setLang('hi')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  lang === 'hi'
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark font-extrabold shadow-sm'
                    : 'border-agri-ivory-muted bg-white text-agri-text hover:border-agri-gold'
                }`}
              >
                <span className="text-2xl block mb-1">🇮🇳</span>
                <span className="text-base font-bold">हिंदी</span>
                <span className="text-[11px] block text-agri-text-muted mt-0.5">Hindi</span>
              </button>

              <button
                onClick={() => setLang('en')}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  lang === 'en'
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark font-extrabold shadow-sm'
                    : 'border-agri-ivory-muted bg-white text-agri-text hover:border-agri-gold'
                }`}
              >
                <span className="text-2xl block mb-1">🌐</span>
                <span className="text-base font-bold">English</span>
                <span className="text-[11px] block text-agri-text-muted mt-0.5">अंग्रेज़ी</span>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-agri-green hover:bg-agri-green-dark text-white font-extrabold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px]"
            >
              <span>{t('Next Step', 'आगे बढ़ें')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: CHOOSE ROLE */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-heading text-xl font-bold text-agri-green">
                {t('Select Account Type', 'खाता प्रकार चुनें')}
              </h2>
              <p className="text-xs text-agri-text-muted">
                {t('Farmer is the primary service experience', 'किसान सुविधा मुख्य अनुभव है')}
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => {
                  setActiveRole('farmer');
                  setStep(3);
                  setWalkStep(0);
                }}
                className="w-full p-3.5 rounded-xl border-2 border-agri-green bg-agri-green-soft text-left flex items-center justify-between hover:bg-agri-green/10 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-agri-green text-white flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-bold text-agri-green-dark text-sm block">
                      👨‍🌾 {t('Farmer', 'किसान')}
                    </strong>
                    <span className="text-xs text-agri-text-muted">
                      {t('Token, queue status, payments', 'टोकन, लाइव कतार और भुगतान')}
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-agri-green shrink-0" />
              </button>

              <button
                onClick={() => {
                  setActiveRole('operator');
                  setStep(3);
                  setWalkStep(0);
                }}
                className="w-full p-3.5 rounded-xl border border-agri-ivory-muted bg-white text-left flex items-center justify-between hover:border-agri-gold transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-agri-ivory text-agri-green flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-bold text-agri-text text-sm block">
                      🏢 {t('Mandi Operator', 'मंडी ऑपरेटर')}
                    </strong>
                    <span className="text-xs text-agri-text-muted">Gate entry & weighment desk</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveRole('admin');
                  setStep(3);
                  setWalkStep(0);
                }}
                className="w-full p-3.5 rounded-xl border border-agri-ivory-muted bg-white text-left flex items-center justify-between hover:border-agri-gold transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-agri-ivory text-agri-green flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="font-bold text-agri-text text-sm block">
                      📊 {t('State Supervisor', 'राज्य प्रशासन')}
                    </strong>
                    <span className="text-xs text-agri-text-muted">DoCA telemetry dashboard</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: HOW IT WORKS — VISUAL WALKTHROUGH */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-heading text-xl font-bold text-agri-green">
                {t('How it works', 'कैसे काम करता है')}
              </h2>
              <p className="text-xs text-agri-text-muted">
                {t(
                  'Simple 6-step process to sell your crop',
                  'अपनी फसल बेचने की आसान प्रक्रिया — 6 कदम'
                )}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center space-x-1.5">
              {WALKTHROUGH_STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setWalkStep(i)}
                  aria-label={`Step ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === walkStep
                      ? 'w-5 bg-agri-green'
                      : i < walkStep
                      ? 'w-2 bg-agri-gold'
                      : 'w-2 bg-agri-ivory-muted'
                  }`}
                />
              ))}
            </div>

            {/* Current step card */}
            {(() => {
              const s = WALKTHROUGH_STEPS[walkStep];
              const Icon = s.icon;
              return (
                <div key={walkStep} className="rounded-xl border-2 border-agri-ivory-muted bg-agri-ivory/40 p-5 text-center space-y-3 animate-in fade-in duration-200">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${s.color} text-white flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-agri-gold block">
                      {t(`Step ${walkStep + 1} of 6`, `कदम ${walkStep + 1} / 6`)}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-agri-text mt-0.5">
                      {t(s.titleEn, s.titleHi)}
                    </h3>
                    <p className="text-sm text-agri-text-muted mt-1 leading-relaxed">
                      {t(s.descEn, s.descHi)}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Full path summary with connecting line + icons */}
            <div className="flex items-center justify-between px-2">
              {WALKTHROUGH_STEPS.map((s, i) => {
                const PathIcon = s.icon;
                return (
                  <div key={s.key} className="flex flex-col items-center space-y-1 relative">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        i <= walkStep ? 'bg-agri-green text-white shadow-sm' : 'bg-agri-ivory-muted text-agri-text-muted'
                      }`}
                    >
                      <PathIcon className="w-4 h-4" />
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center space-x-2.5 pt-1">
              {walkStep > 0 && (
                <button
                  onClick={() => setWalkStep(walkStep - 1)}
                  className="px-4 py-3 rounded-xl text-xs font-bold text-agri-text-muted bg-agri-ivory border border-agri-ivory-muted hover:bg-agri-ivory-muted transition-all touch-target min-h-[48px]"
                >
                  ← {t('Back', 'पीछे')}
                </button>
              )}

              {walkStep < WALKTHROUGH_STEPS.length - 1 ? (
                <button
                  onClick={() => setWalkStep(walkStep + 1)}
                  className="flex-1 bg-agri-green hover:bg-agri-green-dark text-white font-extrabold py-3 rounded-xl transition-all shadow-md touch-target min-h-[48px] flex items-center justify-center space-x-2"
                >
                  <span>{t('Next', 'आगे')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => finishWalkthrough()}
                  className="flex-1 bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold py-3 rounded-xl transition-all shadow-md touch-target min-h-[48px]"
                >
                  ✓ {t('I Understand, Start', 'समझ गया, शुरू करें')}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
