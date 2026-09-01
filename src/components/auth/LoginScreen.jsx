import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Phone, ArrowRight, ShieldCheck, ArrowLeft, Wheat, UserCheck, Cpu, CheckCircle2 } from 'lucide-react';

export const LoginScreen = () => {
  const { lang, loginUser, setAuthScreen } = useDemo();

  const [mobile, setMobile] = useState('9876543210');
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [otp, setOtp] = useState('123456');
  const [error, setError] = useState('');

  // Handle Step 1 Submit
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.replace(/\D/g, '').length < 10) {
      setError(lang === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep(2);
  };

  // Handle Step 2 Submit (OTP Verification & Role Routing)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError(lang === 'hi' ? 'कृपया मान्य ओटीपी दर्ज करें' : 'Please enter valid OTP');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    
    // Role determination based on account credentials
    if (cleanMobile === '9800000001') {
      loginUser('operator', {
        name: 'Gate Operator #4',
        mobile: '+91 98000 00001',
        role: 'operator'
      });
    } else if (cleanMobile === '9800000002') {
      loginUser('admin', {
        name: 'DoCA State Admin',
        mobile: '+91 98000 00002',
        role: 'admin'
      });
    } else {
      // Default: Farmer
      loginUser('farmer', {
        name: 'Ramesh Singh',
        mobile: `+91 ${cleanMobile}`,
        role: 'farmer'
      });
    }
  };

  // Quick preset login helper for evaluators
  const setQuickRole = (num) => {
    setMobile(num);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-agri-text font-sans flex flex-col justify-between p-4 sm:p-6 selection:bg-agri-gold/30">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (step === 2) setStep(1);
            else setAuthScreen('landing');
          }}
          className="p-2 text-agri-text hover:text-agri-green rounded-xl hover:bg-agri-ivory transition-colors flex items-center gap-1 text-xs font-bold touch-target min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 2 ? (lang === 'hi' ? 'नंबर बदलें' : 'Change Number') : (lang === 'hi' ? 'मुख्य पृष्ठ' : 'Landing Page')}</span>
        </button>

        <div className="flex items-center space-x-1.5 text-agri-green font-heading font-bold text-sm">
          <Wheat className="w-4 h-4 text-agri-gold" />
          <span>KisanSetu</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border-2 border-agri-gold/40 shadow-xl p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-agri-green">
            {lang === 'hi' ? 'किसान सेतु लॉगिन' : 'Welcome Back'}
          </h2>
          <p className="text-xs sm:text-sm text-agri-text-muted">
            {step === 1
              ? (lang === 'hi' ? 'अपने पंजीकृत मोबाइल नंबर से लॉगिन करें' : 'Enter your registered mobile number to continue')
              : (lang === 'hi' ? `+91 ${mobile} पर भेजा गया 6-अंकों का OTP दर्ज करें` : `Enter the 6-digit OTP sent to +91 ${mobile}`)}
          </p>
        </div>

        {/* STEP 1: MOBILE NUMBER FORM */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
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
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-rose-600 font-semibold mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-agri-green hover:bg-agri-green-dark text-white font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px] active:scale-95"
            >
              <span>{lang === 'hi' ? 'OTP प्राप्त करें' : 'Continue with OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: SIMULATED OTP FORM */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-agri-text">
                  {lang === 'hi' ? 'ओटीपी (OTP)' : 'Enter OTP'}
                </label>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                  Mock OTP: 123456
                </span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="1 2 3 4 5 6"
                className="w-full text-center tracking-widest text-2xl font-bold py-3.5 rounded-xl border-2 border-agri-ivory-muted focus:border-agri-green focus:outline-none text-agri-text touch-target min-h-[48px]"
                autoFocus
              />
              {error && <p className="text-xs text-rose-600 font-semibold mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md touch-target min-h-[48px] active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{lang === 'hi' ? 'सत्यापित करें और प्रवेश करें' : 'Verify & Continue'}</span>
            </button>
          </form>
        )}

        {/* Evaluator Quick Role Chips (Demarcated for testing) */}
        <div className="pt-2 border-t border-agri-ivory-muted text-xs space-y-2">
          <p className="text-[11px] font-bold text-agri-text-muted text-center uppercase tracking-wider">
            {lang === 'hi' ? 'डेमो टेस्ट लॉगिन (मूल्यांकन के लिए)' : 'Test Credentials (Hackathon Demo)'}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setQuickRole('9876543210')}
              className="p-1.5 rounded-lg border border-agri-ivory-muted bg-[#FAF7EE] hover:border-agri-green text-center text-[11px] font-bold"
            >
              👨‍🌾 Farmer
            </button>
            <button
              type="button"
              onClick={() => setQuickRole('9800000001')}
              className="p-1.5 rounded-lg border border-agri-ivory-muted bg-[#FAF7EE] hover:border-agri-green text-center text-[11px] font-bold"
            >
              💻 Operator
            </button>
            <button
              type="button"
              onClick={() => setQuickRole('9800000002')}
              className="p-1.5 rounded-lg border border-agri-ivory-muted bg-[#FAF7EE] hover:border-agri-green text-center text-[11px] font-bold"
            >
              🏛️ Admin
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-agri-text-muted">
            {lang === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setAuthScreen('signup')}
              className="text-agri-green font-bold hover:underline"
            >
              {lang === 'hi' ? 'नया खाता बनाएं' : 'Create Account'}
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
