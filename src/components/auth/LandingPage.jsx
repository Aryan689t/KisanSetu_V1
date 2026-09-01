import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Wheat,
  Clock,
  Calendar,
  Users,
  Eye,
  IndianRupee,
  MapPin,
  Ticket,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  Smartphone,
  Sparkles,
  HelpCircle,
  LogIn,
  ChevronRight
} from 'lucide-react';

export const LandingPage = () => {
  const { lang, setLang, setAuthScreen } = useDemo();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-agri-text font-sans selection:bg-agri-gold/30">
      
      {/* 1. PUBLIC HEADER / TOPBAR */}
      <header className="sticky top-0 z-40 bg-[#17432A] text-white border-b border-agri-green-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-agri-gold flex items-center justify-center text-agri-green-dark shadow-sm border border-agri-gold-light/40 shrink-0">
                <Wheat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading text-xl font-bold tracking-tight text-white">
                    KisanSetu
                  </span>
                  <span className="text-[10px] font-bold bg-[#102e1c] text-agri-gold px-2 py-0.5 rounded border border-agri-gold/30 font-mono">
                    DoCA Mandi
                  </span>
                </div>
                <p className="text-[11px] text-agri-ivory/80 hidden sm:block">
                  {lang === 'hi' ? 'स्मार्ट खरीद एवं कतार प्रबंधन प्रणाली' : 'Smart Procurement & Queue Management Platform'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-agri-ivory/90">
              <button onClick={() => scrollToSection('problem')} className="hover:text-agri-gold transition-colors">
                {lang === 'hi' ? 'समस्या' : 'The Problem'}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-agri-gold transition-colors">
                {lang === 'hi' ? 'कार्यप्रणाली' : 'How it Works'}
              </button>
              <button onClick={() => scrollToSection('smart-recommendation')} className="hover:text-agri-gold transition-colors">
                {lang === 'hi' ? 'स्मार्ट सुझाव' : 'Smart Recommendation'}
              </button>
              <button onClick={() => scrollToSection('dynamic-rerouting')} className="hover:text-agri-gold transition-colors">
                {lang === 'hi' ? 'डायनामिक रूटिंग' : 'Dynamic Rerouting'}
              </button>
            </nav>

            {/* Language Switcher & Auth Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-[#102e1c] p-0.5 rounded-lg border border-agri-gold/30">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                    lang === 'en' ? 'bg-agri-gold text-agri-green-dark shadow-sm' : 'text-agri-ivory/80 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                    lang === 'hi' ? 'bg-agri-gold text-agri-green-dark shadow-sm' : 'text-agri-ivory/80 hover:text-white'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              {/* Login CTA */}
              <button
                onClick={() => setAuthScreen('login')}
                className="text-white hover:text-agri-gold px-3 py-2 text-xs font-bold rounded-xl hover:bg-white/10 transition-all inline-flex items-center gap-1.5 touch-target min-h-[40px]"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
              </button>

              {/* Get Started Button */}
              <button
                onClick={() => setAuthScreen('language')}
                className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm flex items-center space-x-1.5 touch-target min-h-[40px] active:scale-95"
              >
                <span>{lang === 'hi' ? 'शुरू करें' : 'Get Started'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#17432A] via-[#1c4d32] to-[#FAF7EE] text-white pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Problem Statement 26032 Badge */}
              <div className="inline-flex items-center gap-2 bg-[#102e1c] border border-agri-gold/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-agri-gold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-agri-gold" />
                <span>{lang === 'hi' ? 'समस्या कथन 26032 • प्रत्यक्ष फसल खरीद समाधान' : 'Problem Statement 26032 • Smart Procurement Solution'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {lang === 'hi' ? (
                  <>
                    कम इंतजार। बेहतर योजना। <br />
                    <span className="text-agri-gold">समझदार फसल खरीद।</span>
                  </>
                ) : (
                  <>
                    Less waiting. Better planning. <br />
                    <span className="text-agri-gold">Smarter procurement.</span>
                  </>
                )}
              </h1>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-agri-ivory/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {lang === 'hi'
                  ? 'अपनी खरीद का स्लॉट बुक करें, घर या खेत से लाइव कतार ट्रैक करें, कम भीड़ वाली मंडियों का सुझाव पाएं और सीधे अपने बैंक खाते में भुगतान की स्थिति देखें।'
                  : 'Book your procurement slot, track your queue in real time, find less-congested mandis, and know exactly when your DBT payment is ready.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setAuthScreen('language')}
                  className="w-full sm:w-auto bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 touch-target min-h-[48px] active:scale-95"
                >
                  <span>{lang === 'hi' ? 'किसान खाता शुरू करें' : 'Get Started'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 touch-target min-h-[48px]"
                >
                  <HelpCircle className="w-4 h-4 text-agri-gold" />
                  <span>{lang === 'hi' ? 'कार्यप्रणाली देखें' : 'How KisanSetu Works'}</span>
                </button>
              </div>

              {/* Key Highlights Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 max-w-lg mx-auto lg:mx-0 border-t border-white/15 text-xs text-agri-ivory/80">
                <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-agri-gold shrink-0" />
                  <span>{lang === 'hi' ? 'शून्य कागजी पर्ची' : 'Zero Paper Loss'}</span>
                </div>
                <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-agri-gold shrink-0" />
                  <span>{lang === 'hi' ? 'लाइव कतार ट्रैकिंग' : 'Live Queue Turn'}</span>
                </div>
                <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-agri-gold shrink-0" />
                  <span>{lang === 'hi' ? 'सीधा DBT बैंक ट्रांसफर' : 'Direct DBT Payout'}</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card (Authentic Mobile-First Farmer View Simulation) */}
            <div className="lg:col-span-5">
              <div className="bg-[#17432A] text-white rounded-2xl p-5 sm:p-6 shadow-2xl border-2 border-agri-gold relative space-y-4">
                
                {/* Visual Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-agri-gold">
                      {lang === 'hi' ? 'लाइव मंडी स्थिति' : 'Live Mandi Status'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-[#102e1c] text-agri-ivory px-2.5 py-1 rounded-lg border border-agri-gold/20">
                    Sonipat Yard
                  </span>
                </div>

                {/* Farmer Status Box */}
                <div className="bg-[#102e1c] p-4 rounded-xl border border-agri-gold/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-agri-ivory/70 block">
                        {lang === 'hi' ? 'आपका डिजिटल टोकन' : 'Your Digital Token'}
                      </span>
                      <span className="font-heading font-extrabold text-3xl text-agri-gold font-mono">
                        SNP-014
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-agri-ivory/70 block">
                        {lang === 'hi' ? 'आगे किसान' : 'Farmers Ahead'}
                      </span>
                      <span className="font-heading font-extrabold text-2xl text-white">
                        3
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#17432A] p-2.5 rounded-lg border border-white/10 flex items-center justify-between text-xs text-agri-ivory/90">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-agri-gold" />
                      <span>{lang === 'hi' ? 'अनुमानित प्रतीक्षा समय:' : 'Estimated Wait:'}</span>
                    </span>
                    <strong className="text-agri-gold font-bold">~24 mins</strong>
                  </div>

                  <button
                    onClick={() => setAuthScreen('login')}
                    className="w-full bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm touch-target"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'अपनी बारी देखें' : 'Track My Turn'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Micro Visual Guidance */}
                <p className="text-[11px] text-agri-ivory/70 text-center">
                  {lang === 'hi'
                    ? '💡 बुलावा आने पर ही मंडी पहुंचें — अनावश्यक कतार से बचें।'
                    : '💡 Arrive only when called — avoid standing in long tractor queues.'}
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM SECTION (Problem Statement 26032) */}
      <section id="problem" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-agri-green bg-agri-green-soft px-3 py-1 rounded-full border border-agri-green-border">
            {lang === 'hi' ? 'समस्या का विश्लेषण' : 'Problem Statement 26032'}
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-agri-text">
            {lang === 'hi'
              ? 'वर्तमान मंडी खरीद प्रणाली में किसानों की चुनौतियां'
              : 'The Core Problem Farmers Face Today'}
          </h2>
          <p className="text-sm text-agri-text-muted leading-relaxed">
            {lang === 'hi'
              ? 'मंडियों में बिना योजना के पहुंचने से किसानों को भारी नुकसान और अनिश्चितता का सामना करना पड़ता है।'
              : 'Farmers face long waiting times, lack of information regarding procurement schedules, and uncertainty about status and payment.'}
          </p>
        </div>

        {/* 5 Problem Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Problem 1 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-agri-ivory-muted shadow-sm hover:border-agri-green/40 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-agri-text">
              {lang === 'hi' ? 'घंटों का लंबा इंतजार' : 'Long Waiting Times'}
            </h3>
            <p className="text-xs sm:text-sm text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'किसान भरी हुई ट्रैक्टर-ट्रॉलियों के साथ मंडी के बाहर 6 से 18 घंटे तक लाइन में खड़े रहने को मजबूर होते हैं।'
                : 'Farmers wait 6 to 18 hours in tractor queues outside procurement centres, wasting precious fuel and time.'}
            </p>
          </div>

          {/* Problem 2 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-agri-ivory-muted shadow-sm hover:border-agri-green/40 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-agri-text">
              {lang === 'hi' ? 'खरीद तारीखों की अनिश्चितता' : 'Uncertain Procurement Schedules'}
            </h3>
            <p className="text-xs sm:text-sm text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'किसानों को यह पहले से पता नहीं होता कि किस दिन और किस समय उनकी फसल की तौल हो पाएगी।'
                : 'Farmers lack prior knowledge about when their specific crop variety will be weighed and accepted at the mandi.'}
            </p>
          </div>

          {/* Problem 3 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-agri-ivory-muted shadow-sm hover:border-agri-green/40 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-agri-text">
              {lang === 'hi' ? 'मंडियों में अचानक भारी भीड़' : 'Severe Yard Congestion'}
            </h3>
            <p className="text-xs sm:text-sm text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'कुछ मंडियों में 90%+ क्षमता से अधिक भीड़ हो जाती है, जबकि पास की अन्य मंडियां खाली पड़ी रहती हैं।'
                : 'Certain main mandis become overloaded with 90%+ capacity while adjacent sub-centres remain underutilized.'}
            </p>
          </div>

          {/* Problem 4 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-agri-ivory-muted shadow-sm hover:border-agri-green/40 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-agri-text">
              {lang === 'hi' ? 'बारी व तौल की जानकारी का अभाव' : 'Zero Queue Visibility'}
            </h3>
            <p className="text-xs sm:text-sm text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'किसान को यह नहीं पता चलता कि कतार में उससे आगे कितने लोग हैं और उसका नंबर कब आएगा।'
                : 'Farmers have no live status to know how many farmers are ahead or when to move their vehicle to the gate.'}
            </p>
          </div>

          {/* Problem 5 */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-agri-ivory-muted shadow-sm hover:border-agri-green/40 transition-all space-y-3 sm:col-span-2 lg:col-span-2">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-agri-text">
              {lang === 'hi' ? 'भुगतान और DBT स्थिति की अनिश्चितता' : 'Payment Disbursal Uncertainty'}
            </h3>
            <p className="text-xs sm:text-sm text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'तौल के बाद कितने क्विंटल का कितना पैसा बना और बैंक खाते में कब पहुंचेगा, इसकी स्पष्ट डिजिटल रसीद नहीं मिलती।'
                : 'Lack of instant payout calculations, weight logs, and direct DBT reference tracking creates anxiety for farmers.'}
            </p>
          </div>

        </div>
      </section>

      {/* 4. HOW KISANSETU WORKS (VISUAL WORKFLOW) */}
      <section id="how-it-works" className="py-14 sm:py-20 bg-white border-y border-agri-ivory-muted px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-agri-gold-dark bg-agri-gold-light/60 px-3 py-1 rounded-full border border-agri-gold/40">
              {lang === 'hi' ? 'संपूर्ण किसान यात्रा' : 'End-to-End Farmer Workflow'}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-agri-text">
              {lang === 'hi' ? 'किसान सेतु कैसे काम करता है' : 'How KisanSetu Works'}
            </h2>
            <p className="text-sm text-agri-text-muted">
              {lang === 'hi' ? 'सरल 6 चरणों में खेत से बैंक खाते तक की पारदर्शी प्रक्रिया।' : 'Simple, transparent 6-step flow from harvest to bank payment.'}
            </p>
          </div>

          {/* 6 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-sm font-mono">1</span>
                <MapPin className="w-5 h-5 text-agri-green" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '1. मंडी चुनें' : '1. Choose Mandi'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'पास के खरीद केंद्रों की दूरी और लाइव भीड़ देखकर उपयुक्त केंद्र चुनें।' : 'Select nearest procurement centre by viewing live wait times and load.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-sm font-mono">2</span>
                <Calendar className="w-5 h-5 text-agri-green" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '2. समय स्लॉट बुक करें' : '2. Book Slot'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'अपनी सुविधानुसार 30 मिनट का समय स्लॉट चुनें ताकि लाइन में न लगना पड़े।' : 'Pick your preferred date & 30-minute time window in advance.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-sm font-mono">3</span>
                <Ticket className="w-5 h-5 text-agri-green" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '3. डिजिटल टोकन पाएं' : '3. Get Digital Token'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'सुरक्षित डिजिटल टोकन (जैसे SNP-014) और गेट पास आपके फोन पर तुरंत उपलब्ध।' : 'Instant digital pass with unique token code and assigned counter.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-sm font-mono">4</span>
                <Clock className="w-5 h-5 text-agri-green" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '4. लाइव कतार ट्रैक करें' : '4. Track Live Queue'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'घर से देखें कि कितने किसान आगे हैं और आपका बुलावा कब आने वाला है।' : 'Track farmers ahead in real-time from your tractor or home.'}
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-agri-green text-white font-bold flex items-center justify-center text-sm font-mono">5</span>
                <Wheat className="w-5 h-5 text-agri-green" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '5. पारदर्शी तौल व जांच' : '5. Transparent Weighment'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'धर्मकांटे पर सटीक वजन और नमी की डिजिटल एंट्री, बिना किसी बिचौलिए के।' : 'Direct weighbridge crop weight and moisture recorded digitally.'}
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-[#FAF7EE] p-5 rounded-2xl border border-agri-ivory-muted space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm font-mono">6</span>
                <IndianRupee className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="font-heading text-base font-bold text-agri-text">
                {lang === 'hi' ? '6. सीधा बैंक भुगतान (DBT)' : '6. Direct Bank DBT'}
              </h4>
              <p className="text-xs text-agri-text-muted leading-relaxed">
                {lang === 'hi' ? 'सरकारी एमएसपी दर के अनुसार भुगतान सीधे आपके बैंक खाते में भेजा जाता है।' : 'Government MSP payout disbursed directly to your bank account.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DIFFERENTIATOR 1: SMART MANDI RECOMMENDATION */}
      <section id="smart-recommendation" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-agri-green bg-agri-green-soft px-3 py-1 rounded-full border border-agri-green-border">
              {lang === 'hi' ? 'प्रमुख विशेषता 1' : 'Key Innovation #1'}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-agri-text">
              {lang === 'hi' ? 'स्मार्ट मंडी सुझाव' : 'Smart Mandi Recommendation'}
            </h2>
            <p className="text-sm sm:text-base text-agri-text-muted leading-relaxed">
              {lang === 'hi'
                ? 'किसान सेतु केवल स्लॉट बुकिंग ऐप नहीं है। यह सभी मंडियों की लाइव भीड़, उपलब्ध काउंटर, खाली स्लॉट और दूरी का लगातार विश्लेषण करके किसान को सबसे तेज केंद्र सुझाता है।'
                : 'KisanSetu dynamically evaluates real-time queue length, capacity load, available slots, active weigh counters, and distance to recommend the optimal procurement centre.'}
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-agri-text pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-agri-green shrink-0" />
                <span>{lang === 'hi' ? 'औसत 35+ मिनट के इंतजार की बचत' : 'Saves ~35+ minutes of unnecessary waiting'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-agri-green shrink-0" />
                <span>{lang === 'hi' ? 'मंडियों के बीच भार का स्वचालित संतुलन' : 'Balances procurement load across state yards'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-agri-green shrink-0" />
                <span>{lang === 'hi' ? 'गूगल मैप्स नेविगेशन से सीधा रास्ता' : 'Turn-by-turn navigation via Google Maps'}</span>
              </li>
            </ul>
          </div>

          {/* Comparative Recommendation Visual Card */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border-2 border-agri-gold shadow-md space-y-4">
            <h3 className="font-heading text-base font-bold text-agri-text flex items-center justify-between">
              <span>{lang === 'hi' ? 'लाइव केंद्र तुलना' : 'Live Centre Telemetry'}</span>
              <span className="text-xs text-agri-gold font-bold bg-agri-gold/10 px-2.5 py-0.5 rounded-full">
                {lang === 'hi' ? 'स्मार्ट मिलान' : 'Smart Match'}
              </span>
            </h3>

            <div className="space-y-3">
              {/* Congested Centre */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-agri-text block">Sonipat Main Yard</span>
                  <span className="text-xs text-rose-700 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'भारी भीड़ (94% लोड)' : 'Heavy Congestion (94% load)'}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-base font-bold text-rose-700 block">~67 min</span>
                  <span className="text-[10px] text-agri-text-muted">{lang === 'hi' ? 'इंतजार' : 'est. wait'}</span>
                </div>
              </div>

              {/* Better Recommended Centre */}
              <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 flex items-center justify-between shadow-sm">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-emerald-900">Panipat Sub-Mandi</span>
                    <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                      {lang === 'hi' ? 'सुझाया गया' : 'Recommended'}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-medium">
                    {lang === 'hi' ? 'सामान्य भीड़ (62% लोड) • 11 स्लॉट खाली' : 'Optimal clearance (62% load) • 11 slots open'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-extrabold text-emerald-800 block">~31 min</span>
                  <span className="text-[10px] text-emerald-700 font-bold">{lang === 'hi' ? '36 मिनट की बचत' : 'Save 36 mins'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setAuthScreen('language')}
                className="w-full bg-agri-green hover:bg-agri-green-dark text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-2 touch-target"
              >
                <span>{lang === 'hi' ? 'पानीपत मंडी में स्लॉट बुक करें' : 'Book Optimal Centre'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 6. DIFFERENTIATOR 2: DYNAMIC CONGESTION REROUTING */}
      <section id="dynamic-rerouting" className="py-14 sm:py-20 bg-[#17432A] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-amber-300 bg-amber-900/60 px-3 py-1 rounded-full border border-amber-400/40">
              {lang === 'hi' ? 'प्रमुख विशेषता 2' : 'Key Innovation #2'}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white">
              {lang === 'hi'
                ? 'यदि आपकी मंडी में अचानक भीड़ बढ़ जाए?'
                : 'What if your mandi suddenly gets crowded?'}
            </h2>
            <p className="text-sm sm:text-base text-agri-ivory/90 leading-relaxed">
              {lang === 'hi'
                ? 'यदि आपकी पहले से बुक की गई मंडी में अचानक ट्रकों का जाम लग जाता है, तो किसान सेतु आपको समय रहते सूचित करता है और कम भीड़ वाली नजदीकी मंडी में बदलने का विकल्प देता है।'
                : 'If heavy truck backlogs suddenly occur at your booked centre, KisanSetu alerts you before you leave home and offers a faster alternative.'}
            </p>

            <div className="bg-[#102e1c] p-4 rounded-xl border border-agri-gold/30 text-xs text-agri-ivory/90 space-y-2">
              <strong className="text-agri-gold font-bold block text-sm">
                {lang === 'hi' ? '✨ किसान का पूरा नियंत्रण' : '✨ Farmer Always in Full Control'}
              </strong>
              <p>
                {lang === 'hi'
                  ? 'सिस्टम कभी भी आपकी बुकिंग को बिना पूछे नहीं बदलता। आप चाहें तो नई मंडी चुन सकते हैं या अपनी पुरानी मंडी ही रख सकते हैं।'
                  : 'The system NEVER silently changes your booking. You explicitly choose to Switch or Keep your original centre.'}
              </p>
            </div>
          </div>

          {/* Right Visual Reroute Alert Simulation */}
          <div className="lg:col-span-6">
            <div className="bg-[#4A1510] text-white rounded-2xl p-5 sm:p-6 shadow-2xl border-2 border-rose-500 space-y-4">
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-rose-900 text-amber-300 rounded-xl shrink-0 border border-rose-500">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold bg-amber-400 text-rose-950 px-2.5 py-0.5 rounded inline-block">
                    {lang === 'hi' ? 'सोनीपत मंडी में भारी भीड़ अलर्ट' : 'Sonipat Mandi Backlog Alert'}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {lang === 'hi' ? 'सोनीपत में प्रतीक्षा समय बढ़कर ~67 मिनट हो गया' : 'Sonipat wait time increased to ~67 minutes'}
                  </h3>
                  <p className="text-xs text-rose-100 leading-relaxed">
                    {lang === 'hi'
                      ? 'आपकी वर्तमान बुकिंग सोनीपत की है। पास की पानीपत मंडी में केवल ~31 मिनट का इंतजार है।'
                      : 'Your current booking is at Sonipat. Panipat is available nearby with only ~31 minutes wait.'}
                  </p>
                </div>
              </div>

              {/* Explicit Choice Demonstration Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-rose-800">
                <button
                  onClick={() => setAuthScreen('login')}
                  className="bg-amber-400 hover:bg-amber-300 text-rose-950 font-extrabold text-xs px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 touch-target min-h-[44px]"
                >
                  <span>{lang === 'hi' ? 'पानीपत बदलें (~31 मिनट)' : 'Switch to Panipat (~31 min)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setAuthScreen('login')}
                  className="bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-semibold px-4 py-3 rounded-xl border border-rose-700 text-center touch-target min-h-[44px]"
                >
                  {lang === 'hi' ? 'सोनीपत ही रखें' : 'Keep Sonipat'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. FARMER-CENTRIC ACCESSIBILITY HIGHLIGHTS */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-agri-text">
            {lang === 'hi' ? 'किसानों के लिए विशेष रूप से डिज़ाइन किया गया' : 'Built Farmer-First & Mobile-First'}
          </h2>
          <p className="text-sm text-agri-text-muted">
            {lang === 'hi'
              ? 'सरल भाषा, बड़े टच बटन और बिना किसी तकनीकी उलझन के सहज अनुभव।'
              : 'Designed with large touch targets, visual symbols, and natural language for maximum ease of use.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          
          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <Smartphone className="w-7 h-7 text-agri-green mx-auto" />
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'मोबाइल अनुकूल' : 'Mobile-First'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? '375px+ फोन के लिए' : 'Thumb-friendly UI'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <span className="text-2xl block">🇮🇳</span>
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'हिंदी व English' : 'Hindi & English'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? 'सहज भाषा चयन' : 'Native translations'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <Ticket className="w-7 h-7 text-agri-green mx-auto" />
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'डिजिटल पास' : 'Digital Token'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? 'कागजी पर्ची मुक्त' : 'No paper loss'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <Users className="w-7 h-7 text-agri-green mx-auto" />
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'लाइव कतार' : 'Live Queue'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? 'खेत से निगरानी' : 'Track from tractor'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <Navigation className="w-7 h-7 text-agri-green mx-auto" />
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'मैप्स दिशा' : 'Maps Direct'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? 'मंडी तक सही रास्ता' : 'Turn-by-turn'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-agri-ivory-muted space-y-2">
            <IndianRupee className="w-7 h-7 text-agri-green mx-auto" />
            <strong className="text-xs sm:text-sm font-bold text-agri-text block">
              {lang === 'hi' ? 'सीधा भुगतान' : 'Direct DBT'}
            </strong>
            <span className="text-[11px] text-agri-text-muted block">
              {lang === 'hi' ? 'बैंक खाते में पैसा' : 'MSP guaranteed'}
            </span>
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-[#17432A] to-[#245C3A] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold">
            {lang === 'hi'
              ? 'मंडी में घंटों का इंतजार खत्म करने के लिए तैयार हैं?'
              : 'Ready to eliminate waiting hours at the mandi?'}
          </h2>
          <p className="text-sm sm:text-base text-agri-ivory/80 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'आज ही किसान सेतु पर अपना खरीद स्लॉट बुक करें और अपनी फसल का समय पर उचित मूल्य प्राप्त करें।'
              : 'Book your crop procurement slot on KisanSetu today and experience hassle-free procurement and timely MSP payouts.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setAuthScreen('language')}
              className="w-full sm:w-auto bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 touch-target min-h-[48px] active:scale-95"
            >
              <span>{lang === 'hi' ? 'नया खाता बनाएं' : 'Get Started Now'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setAuthScreen('login')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-xl border border-white/20 transition-all touch-target min-h-[48px]"
            >
              {lang === 'hi' ? 'पहले से खाता है? लॉगिन करें' : 'Already registered? Login'}
            </button>
          </div>
        </div>
      </section>

      {/* 9. PUBLIC SERVICE FOOTER */}
      <footer className="bg-[#102e1c] text-agri-ivory/70 text-xs py-8 px-4 sm:px-6 lg:px-8 border-t border-agri-green-dark">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-white font-bold font-heading text-sm">
              <Wheat className="w-4 h-4 text-agri-gold" />
              <span>KisanSetu • Department of Consumer Affairs (DoCA)</span>
            </div>
            <p className="text-[11px] text-agri-ivory/60 mt-0.5">
              Problem Statement 26032 • Smart Procurement & Queue Management System
            </p>
          </div>

          <div className="text-xs text-agri-ivory/80">
            <p className="font-bold text-white">Kisan Helpline: 1800-180-1551 (Toll-Free)</p>
            <p className="text-[11px] text-agri-ivory/60">24x7 Queue & Procurement Assistance</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
