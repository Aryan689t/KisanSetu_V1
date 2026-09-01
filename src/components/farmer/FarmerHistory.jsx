import { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { CheckCircle2, Download, IndianRupee, HelpCircle, Wheat, MapPin, Building, ReceiptText } from 'lucide-react';

export const FarmerHistory = () => {
  const { lang, activeBooking, pastHistory: contextPastHistory, speakText } = useDemo();
  const [showFormulaHelp, setShowFormulaHelp] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const t = (hi, en) => (lang === 'hi' ? hi : en);

  const latestPayment = {
    crop: activeBooking?.crop || 'Wheat (Sharbati)',
    centre: 'Sonipat Main Procurement Centre',
    totalAmount: 118300,
    status: 'PAID',
    bankAccount: 'State Bank of India (****4092)',
    dbtReference: 'DBT-UTIB000984210',
    date: 'Aug 29, 2026'
  };

  const pastHistory = (contextPastHistory && contextPastHistory.length > 0) ? contextPastHistory : [
    {
      id: 'PAY-2026-001',
      crop: 'Wheat (Sharbati)',
      centre: 'Sonipat Main Procurement Centre',
      totalAmount: 118300,
      actualQty: 52,
      ratePerQuintal: 2275,
      qualityGrade: 'Grade A',
      moisturePercent: 11.2,
      bankAccount: 'State Bank of India (****4092)',
      dbtReference: 'DBT-UTIB000984210',
      date: 'Aug 29, 2026',
      status: 'PAID'
    },
    {
      id: 'PAY-2025-089',
      crop: 'Paddy (Basmati)',
      centre: 'Panipat Grain Market',
      totalAmount: 88400,
      actualQty: 40,
      ratePerQuintal: 2210,
      qualityGrade: 'Grade A',
      moisturePercent: 12.0,
      bankAccount: 'State Bank of India (****4092)',
      dbtReference: 'DBT-SBIN00428911',
      date: 'Nov 14, 2025',
      status: 'PAID'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300 pb-6 sm:pb-0 font-sans">
      
      {/* 1. TOP SUMMARY CARD: YOUR PAYMENTS */}
      <div className="bg-[#17432A] text-white rounded-2xl p-5 sm:p-6 shadow-agri-md space-y-4 border-2 border-agri-gold">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-agri-gold shrink-0" />
              <span>{t('आपकी भुगतान राशि', 'Your Payments')}</span>
            </h1>
            <p className="text-xs text-agri-ivory/80 mt-0.5">
              {t('सीधे आपके बैंक खाते में भेजा गया पैसा', 'Direct payment credited to your registered bank account.')}
            </p>
          </div>

          <span className="bg-emerald-900/90 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t('भुगतान मिल गया', 'Payment received')}</span>
          </span>
        </div>

        {/* PROMINENT AMOUNT DISPLAY */}
        <div className="bg-[#102e1c] p-4 sm:p-5 rounded-xl border border-agri-gold/30 text-center space-y-1 font-sans">
          <span className="text-xs text-agri-ivory/70 block">
            {t('प्राप्त कुल राशि', 'Total Amount Received')}
          </span>
          <div className="font-heading font-extrabold text-4xl sm:text-5xl text-agri-gold font-sans tracking-tight py-1">
            ₹{latestPayment.totalAmount.toLocaleString()}
          </div>
          <p className="text-xs font-bold text-white font-sans flex items-center justify-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-agri-gold" />
            <span>{latestPayment.crop} • {latestPayment.centre}</span>
          </p>
        </div>

        {/* Bank Account Callout */}
        <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/15 text-xs text-agri-ivory font-sans">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-agri-gold shrink-0" />
            <div>
              <span className="block font-bold text-white">
                {t('बैंक खाते में ट्रांसफर', 'Paid to bank account')}
              </span>
              <span className="text-[11px] text-agri-ivory/70">
                {latestPayment.bankAccount}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-agri-gold bg-agri-gold/20 px-2.5 py-1 rounded-lg border border-agri-gold/30 font-sans">
            Direct Bank Transfer
          </span>
        </div>
      </div>

      {/* 2. HOW PAYMENT WAS CALCULATED (COLLAPSIBLE HELP) */}
      <div className="bg-white rounded-xl p-3.5 border border-agri-ivory-muted shadow-sm font-sans">
        <button
          onClick={() => {
            const next = !showFormulaHelp;
            setShowFormulaHelp(next);
            if (next && speakText) speakText('भुगतान कैसे तय हुआ देखें', 'See how your payment was calculated');
          }}
          className="text-xs font-bold text-agri-green hover:text-agri-green-dark flex items-center justify-between w-full touch-target min-h-[44px]"
        >
          <span className="flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-agri-green shrink-0" />
            <span>{t('भुगतान कैसे तय हुआ?', 'How was your payment calculated?')}</span>
          </span>
          <span>{showFormulaHelp ? '▲' : '▾'}</span>
        </button>

        {showFormulaHelp && (
          <div className="mt-2.5 p-3 rounded-lg bg-agri-ivory/80 text-xs text-agri-text space-y-1.5 animate-in fade-in duration-200 font-sans">
            <p className="leading-relaxed">
              {t(
                'आपकी भुगतान राशि का हिसाब धर्मकांटे पर तौले गए वास्तविक वजन और सरकार द्वारा तय न्यूनतम समर्थन मूल्य (MSP) के आधार पर बिना किसी बिचौलिया कटौती के सीधा किया जाता है।',
                'Your payment is calculated using the verified weighbridge crop weight and government Minimum Support Price (MSP) rate with zero middleman deductions.'
              )}
            </p>
          </div>
        )}
      </div>

      {/* 3. SIMPLIFIED PAYMENT HISTORY RECORDS */}
      <div className="space-y-3 font-sans">
        <h3 className="font-heading text-base font-bold text-agri-text flex items-center gap-1.5">
          <ReceiptText className="w-4 h-4 text-agri-green" />
          <span>{t('भुगतान इतिहास', 'Payment History')}</span>
        </h3>

        {pastHistory.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-agri-ivory-muted shadow-sm space-y-3 hover:border-agri-green-border transition-all font-sans"
            >
              {/* Collapsed State Header */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-heading text-base font-bold text-agri-text flex items-center gap-1">
                      <Wheat className="w-3.5 h-3.5 text-agri-green shrink-0" />
                      <span>{item.crop}</span>
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-sans inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{t('भुगतान मिल गया', 'Payment received')}</span>
                    </span>
                  </div>

                  <p className="text-xs text-agri-text-muted mt-0.5 font-sans flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-agri-text-muted shrink-0" />
                    <span>{item.centre} • {item.date}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-heading font-extrabold text-lg text-agri-green font-sans block">
                    ₹{item.totalAmount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      setExpandedId(isExpanded ? null : item.id);
                    }}
                    className="text-xs font-bold text-agri-green hover:underline touch-target min-h-[36px] inline-flex items-center font-sans"
                  >
                    <span>{isExpanded ? t('छिपाएं ▲', 'Hide details ▲') : t('विवरण देखें ▾', 'View details ▾')}</span>
                  </button>
                </div>
              </div>

              {/* Expanded Payment Details */}
              {isExpanded && (
                <div className="pt-3 border-t border-agri-ivory-muted space-y-2 text-xs text-agri-text animate-in fade-in duration-200 font-sans">
                  <h5 className="font-heading font-bold text-xs text-agri-green-dark flex items-center gap-1">
                    <ReceiptText className="w-3.5 h-3.5 text-agri-green-dark shrink-0" />
                    <span>{t('भुगतान की जानकारी', 'Payment Details')}</span>
                  </h5>

                  <div className="divide-y divide-agri-ivory-muted/60 text-xs py-1 font-sans">
                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-agri-text-muted">{t('कुल वजन', 'Quantity')}</span>
                      <strong className="font-bold text-agri-text font-sans">{item.actualQty} Quintals</strong>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-agri-text-muted">{t('एमएसपी दर (MSP)', 'MSP Rate')}</span>
                      <strong className="font-bold text-agri-text font-sans">₹{item.ratePerQuintal.toLocaleString()}/Quintal</strong>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-agri-text-muted">{t('गुणवत्ता व नमी', 'Quality & Moisture')}</span>
                      <strong className="font-bold text-agri-text font-sans">{item.qualityGrade || 'Grade A'} • {item.moisturePercent || 11.2}% Moisture</strong>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-agri-text-muted">{t('बैंक खाता', 'Bank Account')}</span>
                      <strong className="font-bold text-agri-text font-sans">{item.bankAccount}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-agri-text-muted pt-1 font-sans">
                    <span>{t('भुगतान संदर्भ:', 'Payment Reference:')}</span>
                    <span className="font-mono text-agri-text font-bold">{item.dbtReference}</span>
                  </div>

                  <button
                    onClick={() => alert(`Downloading Procurement Receipt ${item.id}`)}
                    className="w-full mt-2 bg-agri-ivory hover:bg-agri-ivory-muted text-agri-green-dark font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 border border-agri-ivory-muted touch-target min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5 text-agri-green" />
                    <span>{t('रसीद डाउनलोड करें (PDF)', 'Download Receipt (PDF)')}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};