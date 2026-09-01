import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { MapPin, Ticket, Clock, IndianRupee, ArrowRight, X, Wheat, CheckCircle2 } from 'lucide-react';

export const FarmerOnboarding = ({ isModal = false, onClose }) => {
  const { lang, setAuthScreen, setIsOnboardingOpen, setFarmerTab } = useDemo();

  const handleFinish = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      setIsOnboardingOpen(false);
      setAuthScreen('landing');
      setFarmerTab('dashboard');
    }
  };

  const steps = [
    {
      num: 1,
      icon: MapPin,
      iconBg: 'bg-emerald-100 text-emerald-800',
      title: lang === 'hi' ? '1. मंडी चुनें' : '1. Book your Mandi',
      desc: lang === 'hi'
        ? 'नजदीकी केंद्र और अपनी सुविधा अनुसार उपलब्ध 30 मिनट का समय स्लॉट चुनें।'
        : 'Choose a procurement centre and select your preferred available slot.'
    },
    {
      num: 2,
      icon: Ticket,
      iconBg: 'bg-amber-100 text-amber-800',
      title: lang === 'hi' ? '2. डिजिटल टोकन पाएं' : '2. Get your Token',
      desc: lang === 'hi'
        ? 'आपका डिजिटल टोकन (जैसे SNP-014) कतार में आपकी जगह सुरक्षित करता है।'
        : 'Your digital token gives you your exact verified queue position.'
    },
    {
      num: 3,
      icon: Clock,
      iconBg: 'bg-blue-100 text-blue-800',
      title: lang === 'hi' ? '3. अपनी बारी ट्रैक करें' : '3. Track your Turn',
      desc: lang === 'hi'
        ? 'घर या रास्ते से लाइव कतार देखें — बुलावा आने पर ही मंडी पहुंचें।'
        : 'Follow the live queue on your phone instead of waiting unnecessarily.'
    },
    {
      num: 4,
      icon: IndianRupee,
      iconBg: 'bg-emerald-100 text-emerald-800',
      title: lang === 'hi' ? '4. तौल कराएं और भुगतान पाएं' : '4. Sell & Get Paid',
      desc: lang === 'hi'
        ? 'धर्मकांटे पर सटीक तौल दर्ज होती है और पैसा सीधे आपके बैंक खाते (DBT) में आता है।'
        : 'Procurement is recorded and payment is tracked directly through DBT.'
    }
  ];

  const content = (
    <div className="bg-white rounded-3xl border-2 border-agri-gold shadow-2xl p-6 sm:p-8 space-y-6 max-w-lg w-full relative font-sans">
      
      {/* Close button if in modal mode */}
      {isModal && (
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 p-2 text-agri-text-muted hover:text-agri-text rounded-full hover:bg-agri-ivory transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="w-12 h-12 rounded-2xl bg-agri-gold flex items-center justify-center text-agri-green-dark mx-auto shadow-sm">
          <Wheat className="w-7 h-7 stroke-[2.2]" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-agri-green pt-1">
          {lang === 'hi' ? 'किसान सेतु कैसे काम करता है?' : 'How KisanSetu Works'}
        </h2>
        <p className="text-xs sm:text-sm text-agri-text-muted">
          {lang === 'hi'
            ? '4 सरल चरणों में मंडी खरीद का पूरा अनुभव समझें'
            : '4 simple steps to hassle-free crop procurement'}
        </p>
      </div>

      {/* 4 Steps Visual Cards List */}
      <div className="space-y-3">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="p-3.5 sm:p-4 rounded-2xl border border-agri-ivory-muted bg-[#FAF7EE] flex items-start space-x-3.5 hover:border-agri-gold transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="font-heading font-bold text-sm sm:text-base text-agri-text">
                  {s.title}
                </h3>
                <p className="text-xs text-agri-text-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleFinish}
          className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px] active:scale-95"
        >
          <span>{lang === 'hi' ? 'किसान सेतु शुरू करें' : 'Start Using KisanSetu'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!isModal && (
          <button
            onClick={handleFinish}
            className="w-full text-xs font-bold text-agri-text-muted hover:text-agri-text py-2 touch-target min-h-[36px]"
          >
            {lang === 'hi' ? 'छोड़ें (सीधे डैशबोर्ड पर जाएं)' : 'Skip to Dashboard'}
          </button>
        )}
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-agri-text font-sans flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-agri-gold/30">
      {content}
    </div>
  );
};
