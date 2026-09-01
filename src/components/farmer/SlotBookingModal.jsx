import { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, Wheat, CheckCircle2, Calendar } from 'lucide-react';

export const SlotBookingModal = ({ centre, onClose }) => {
  const { crops, timeSlots, bookSlot, lang } = useDemo();

  const t = (hi, en) => (lang === 'hi' ? hi : en);

  const [selectedCrop, setSelectedCrop] = useState(crops[0].name);
  const [expectedQty, setExpectedQty] = useState(40);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[4]?.time || '11:00 AM - 11:30 AM');
  const [selectedDate, setSelectedDate] = useState('Today (Aug 29, 2026)');

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    bookSlot({
      centreId: centre.id,
      cropName: selectedCrop,
      slotTime: selectedSlot,
      expectedQty
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-agri-surface rounded-2xl max-w-xl w-full border border-agri-ivory-muted shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-agri-green text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-agri-gold tracking-widest block">
              {t('स्मार्ट स्लॉट बुकिंग', 'SMART SLOT BOOKING')}
            </span>
            <h3 className="font-heading text-xl font-bold text-white mt-0.5">
              {centre.name}
            </h3>
            <p className="text-xs text-agri-ivory/80">
              {centre.address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-agri-ivory hover:text-white hover:bg-agri-green-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitBooking} className="p-6 space-y-5">
          
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-agri-text mb-1.5 uppercase tracking-wider">
              {t('खरीद की तारीख चुनें', 'Select Procurement Date')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedDate('Today (Aug 29, 2026)')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center gap-1.5 ${
                  selectedDate.includes('Today')
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark ring-1 ring-agri-green'
                    : 'border-agri-ivory-muted bg-agri-ivory text-agri-text-muted'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('आज (29 अगस्त 2026)', 'Today (Aug 29, 2026)')}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate('Tomorrow (Aug 30, 2026)')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center gap-1.5 ${
                  selectedDate.includes('Tomorrow')
                    ? 'border-agri-green bg-agri-green-soft text-agri-green-dark ring-1 ring-agri-green'
                    : 'border-agri-ivory-muted bg-agri-ivory text-agri-text-muted'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('कल (30 अगस्त 2026)', 'Tomorrow (Aug 30, 2026)')}</span>
              </button>
            </div>
          </div>

          {/* Crop & Quantity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-text mb-1.5 uppercase tracking-wider">
                {t('फसल प्रकार चुनें', 'Select Crop Type')}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-2.5 bg-agri-ivory border border-agri-ivory-muted rounded-xl text-xs font-bold text-agri-text focus:ring-2 focus:ring-agri-green/30"
              >
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.name}>
                    {crop.name} (MSP ₹{crop.mspRate.toLocaleString()}/{t('क्विंटल', 'Qtl')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-text mb-1.5 uppercase tracking-wider">
                {t('अनुमानित वजन (क्विंटल)', 'Expected Harvest (Quintals)')}
              </label>
              <input
                type="number"
                min="5"
                max="500"
                value={expectedQty}
                onChange={(e) => setExpectedQty(e.target.value)}
                className="w-full p-2.5 bg-agri-ivory border border-agri-ivory-muted rounded-xl text-xs font-bold text-agri-text focus:ring-2 focus:ring-agri-green/30"
                required
              />
            </div>
          </div>

          {/* Time Slot Selection Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-agri-text uppercase tracking-wider">
                {t('उपलब्ध समय स्लॉट', 'Available Time Slots')}
              </label>
              <span className="text-[10px] font-semibold text-agri-green">
                {t('30-मिनट आगमन गारंटी', '30-Min Arrival Window Guarantee')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {timeSlots.map((slot) => {
                const isFull = slot.status === 'FULL';
                const isSelected = selectedSlot === slot.time;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isFull}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isFull
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'border-2 border-agri-green bg-agri-green-soft text-agri-green-dark shadow-sm ring-1 ring-agri-green'
                        : 'border-agri-ivory-muted bg-agri-ivory hover:border-agri-green-border text-agri-text'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{slot.time}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-agri-green" />}
                    </div>
                    <span className="text-[10px] flex items-center gap-1 mt-1 font-semibold">
                      {isFull ? (
                        <span className="text-gray-500">{t('फुल', 'Full')}</span>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{slot.remaining} {t('स्लॉट शेष', 'slots remaining')}</span>
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimated Payout Formula Transparency Callout */}
          <div className="p-3 bg-agri-gold-light/20 rounded-xl border border-agri-gold/40 text-xs text-agri-text">
            <div className="flex items-center justify-between font-bold">
              <span>{t('अनुमानित न्यूनतम समर्थन भुगतान (MSP):', 'Estimated Minimum Support Payout:')}</span>
              <span className="text-agri-green-dark font-heading text-sm">
                ₹{(expectedQty * 2200).toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-agri-text-muted mt-1 font-mono">
              {t('हिसाब:', 'Formula:')} {expectedQty} {t('क्विंटल', 'Quintals')} × ₹2,200/{t('क्विंटल', 'Quintal')} = ₹{(expectedQty * 2200).toLocaleString()}
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-agri-ivory-muted flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-agri-text-muted hover:bg-agri-ivory"
            >
              {t('रद्द करें', 'Cancel')}
            </button>
            <button
              type="submit"
              className="bg-agri-green hover:bg-agri-green-dark text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-agri-sm flex items-center space-x-2"
            >
              <Wheat className="w-4 h-4 text-agri-gold" />
              <span>{t('पुष्टि करें और टोकन पास जारी करें', 'Confirm & Issue Token Pass')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
