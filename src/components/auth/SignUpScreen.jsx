import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ArrowRight, ArrowLeft, Wheat, CheckCircle2 } from 'lucide-react';

export const SignUpScreen = () => {
  const { lang, setLang, registerUser, setAuthScreen } = useDemo();

  const [name, setName] = useState('Ramesh Singh');
  const [mobile, setMobile] = useState('9876543210');
  const [preferredLang, setPreferredLang] = useState(lang || 'hi');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your name');
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      setError(lang === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    registerUser({
      name: name.trim(),
      mobile: `+91 ${mobile.replace(/\D/g, '')}`,
      preferredLang
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-agri-text font-sans flex flex-col justify-between p-4 sm:p-6 selection:bg-agri-gold/30">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pt-2">
        <button
          onClick={() => setAuthScreen('language')}
          className="p-2 text-agri-text hover:text-agri-green rounded-xl hover:bg-agri-ivory transition-colors flex items-center gap-1 text-xs font-bold touch-target min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'भाषा बदलें' : 'Back'}</span>
        </button>

        <div className="flex items-center space-x-1.5 text-agri-green font-heading font-bold text-sm">
          <Wheat className="w-4 h-4 text-agri-gold" />
          <span>KisanSetu</span>
        </div>
      </div>

      {/* Main Sign Up Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border-2 border-agri-gold/40 shadow-xl p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-agri-green bg-agri-green-soft px-3 py-1 rounded-full border border-agri-green-border font-sans">
            Step 2 of 2
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-agri-green pt-1">
            {lang === 'hi' ? 'किसान सेतु खाता बनाएं' : 'Create KisanSetu Account'}
          </h2>
          <p className="text-xs sm:text-sm text-agri-text-muted">
            {lang === 'hi'
              ? 'सरल और त्वरित पंजीकरण — तुरंत खरीद स्लॉट बुक करें'
              : 'Quick registration for seamless mandi slot booking & queue alerts'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-agri-text mb-1.5">
              {lang === 'hi' ? 'किसान का पूरा नाम' : 'Farmer Full Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Singh"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-agri-ivory-muted focus:border-agri-green focus:outline-none text-base font-bold text-agri-text touch-target min-h-[48px]"
              autoFocus
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-xs font-bold text-agri-text mb-1.5">
              {lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-agri-text-muted">
                +91
              </div>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="98765 43210"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-agri-ivory-muted focus:border-agri-green focus:outline-none text-base font-bold text-agri-text tracking-wider touch-target min-h-[48px]"
              />
            </div>
          </div>

          {/* Preferred Language Toggle (Hindi / English only) */}
          <div>
            <label className="block text-xs font-bold text-agri-text mb-1.5">
              {lang === 'hi' ? 'पसंदीदा भाषा' : 'Preferred Language'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setPreferredLang('hi'); setLang('hi'); }}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[44px] ${
                  preferredLang === 'hi'
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark'
                    : 'border-agri-ivory-muted bg-[#FAF7EE] text-agri-text'
                }`}
              >
                <span>🇮🇳</span>
                <span>हिंदी (Hindi)</span>
              </button>

              <button
                type="button"
                onClick={() => { setPreferredLang('en'); setLang('en'); }}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[44px] ${
                  preferredLang === 'en'
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark'
                    : 'border-agri-ivory-muted bg-[#FAF7EE] text-agri-text'
                }`}
              >
                <span>🌐</span>
                <span>English</span>
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px] active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{lang === 'hi' ? 'खाता बनाएं और आगे बढ़ें' : 'Create Account & Continue'}</span>
          </button>

        </form>

        {/* Existing User Login Link */}
        <div className="text-center pt-1 border-t border-agri-ivory-muted">
          <p className="text-xs text-agri-text-muted">
            {lang === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
            <button
              onClick={() => setAuthScreen('login')}
              className="text-agri-green font-bold hover:underline"
            >
              {lang === 'hi' ? 'यहाँ लॉगिन करें' : 'Login here'}
            </button>
          </p>
        </div>

      </div>

      <div className="text-center text-[11px] text-agri-text-muted py-2">
        KisanSetu • Problem Statement 26032 • DoCA
      </div>

    </div>
  );
};
