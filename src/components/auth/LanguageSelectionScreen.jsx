import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ArrowRight, CheckCircle2, ArrowLeft, Wheat } from 'lucide-react';

export const LanguageSelectionScreen = () => {
  const { lang, setLang, setAuthScreen } = useDemo();

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-agri-text font-sans flex flex-col justify-between p-4 sm:p-6 selection:bg-agri-gold/30">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pt-2">
        <button
          onClick={() => setAuthScreen('landing')}
          className="p-2 text-agri-text hover:text-agri-green rounded-xl hover:bg-agri-ivory transition-colors flex items-center gap-1 text-xs font-bold touch-target min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'वापस' : 'Back'}</span>
        </button>

        <div className="flex items-center space-x-1.5 text-agri-green font-heading font-bold text-sm">
          <Wheat className="w-4 h-4 text-agri-gold" />
          <span>KisanSetu</span>
        </div>
      </div>

      {/* Main Language Box */}
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border-2 border-agri-gold/40 shadow-xl p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Title */}
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold text-agri-green bg-agri-green-soft px-3 py-1 rounded-full border border-agri-green-border font-sans">
            Step 1 of 2
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-agri-green pt-1">
            {lang === 'hi' ? 'अपनी भाषा चुनें' : 'Choose Your Language'}
          </h2>
          <p className="text-xs sm:text-sm text-agri-text-muted">
            {lang === 'hi' ? 'आप बाद में सेटिंग्स से भाषा बदल सकते हैं।' : 'You can change your language anytime from settings.'}
          </p>
        </div>

        {/* Language Options Grid (Strictly Hindi & English) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          
          {/* Hindi Option */}
          <button
            onClick={() => setLang('hi')}
            className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between touch-target min-h-[110px] ${
              lang === 'hi'
                ? 'border-agri-green bg-agri-green-soft text-agri-green-dark font-extrabold shadow-md ring-2 ring-agri-green/30'
                : 'border-agri-ivory-muted bg-[#FAF7EE] text-agri-text hover:border-agri-gold'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl block">🇮🇳</span>
              {lang === 'hi' && <CheckCircle2 className="w-5 h-5 text-agri-green" />}
            </div>
            <div>
              <strong className="text-lg font-bold block text-agri-text">हिंदी</strong>
              <span className="text-xs text-agri-text-muted">Hindi</span>
            </div>
          </button>

          {/* English Option */}
          <button
            onClick={() => setLang('en')}
            className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between touch-target min-h-[110px] ${
              lang === 'en'
                ? 'border-agri-green bg-agri-green-soft text-agri-green-dark font-extrabold shadow-md ring-2 ring-agri-green/30'
                : 'border-agri-ivory-muted bg-[#FAF7EE] text-agri-text hover:border-agri-gold'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl block">🌐</span>
              {lang === 'en' && <CheckCircle2 className="w-5 h-5 text-agri-green" />}
            </div>
            <div>
              <strong className="text-lg font-bold block text-agri-text">English</strong>
              <span className="text-xs text-agri-text-muted">अंग्रेज़ी</span>
            </div>
          </button>

        </div>

        {/* Primary Continue Button */}
        <button
          onClick={() => setAuthScreen('signup')}
          className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px] active:scale-95"
        >
          <span>{lang === 'hi' ? 'आगे बढ़ें (नया किसान खाता)' : 'Continue to Sign Up'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Direct Link to Login */}
        <div className="text-center pt-1">
          <button
            onClick={() => setAuthScreen('login')}
            className="text-xs text-agri-green font-bold hover:underline touch-target min-h-[36px]"
          >
            {lang === 'hi' ? 'पहले से खाता है? यहाँ लॉगिन करें' : 'Already have an account? Log In'}
          </button>
        </div>

      </div>

      {/* Footer helpline */}
      <div className="text-center text-[11px] text-agri-text-muted py-2">
        KisanSetu • Problem Statement 26032 • DoCA
      </div>

    </div>
  );
};
