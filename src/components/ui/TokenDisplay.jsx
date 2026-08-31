import React from 'react';
import { Wheat, MapPin, Clock, CheckCircle2, QrCode } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const TokenDisplay = ({ booking, onLiveQueueClick }) => {
  if (!booking) return null;

  return (
    <div className="bg-gradient-to-br from-agri-surface via-agri-surface to-agri-ivory-surface rounded-2xl border-2 border-agri-green/30 p-6 shadow-agri-lg relative overflow-hidden">
      
      {/* Decorative wheat motif background element */}
      <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none text-agri-green">
        <Wheat className="w-48 h-48" />
      </div>

      {/* Top Pass Ribbon */}
      <div className="flex items-center justify-between pb-4 border-b border-agri-ivory-muted">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-agri-green text-white flex items-center justify-center font-bold text-xs">
            DoCA
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-agri-green">
              KisanSetu Official Token Pass
            </h4>
            <p className="text-[10px] text-agri-text-muted">
              Booking Ref: {booking.bookingId}
            </p>
          </div>
        </div>
        <StatusBadge status={booking.status} type="queue" />
      </div>

      {/* Token Main Core Number */}
      <div className="my-6 text-center bg-agri-ivory/60 rounded-xl p-5 border border-agri-gold/30 relative">
        <span className="text-[11px] font-bold text-agri-gold uppercase tracking-widest block mb-1">
          YOUR TOKEN NUMBER
        </span>
        <div className="font-heading font-extrabold text-4xl sm:text-5xl text-agri-green tracking-tight font-mono">
          {booking.token}
        </div>
        <div className="mt-2 inline-flex items-center space-x-1.5 bg-agri-green-soft px-3 py-1 rounded-full text-xs font-semibold text-agri-green-dark">
          <Clock className="w-3.5 h-3.5 text-agri-green" />
          <span>Assigned: {booking.counter}</span>
        </div>
      </div>

      {/* Key Queue Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-agri-surface p-3 rounded-lg border border-agri-ivory-muted text-center">
          <span className="text-[10px] uppercase font-bold text-agri-text-muted">Farmers Ahead</span>
          <p className="font-heading text-xl font-bold text-agri-text mt-0.5">3 Farmers</p>
        </div>
        <div className="bg-agri-surface p-3 rounded-lg border border-agri-ivory-muted text-center">
          <span className="text-[10px] uppercase font-bold text-agri-text-muted">Est. Waiting Time</span>
          <p className="font-heading text-xl font-bold text-agri-gold-dark mt-0.5">~24 mins</p>
        </div>
      </div>

      {/* Booking Location & Crop Details */}
      <div className="space-y-2.5 text-xs border-t border-agri-ivory-muted pt-4">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-agri-green shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-agri-text">{booking.centreName}</span>
            <p className="text-[11px] text-agri-text-muted">G.T. Road, Sector 15 Mandi Yard, Sonipat</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-agri-ivory/50 p-2.5 rounded-lg border border-agri-ivory-muted">
          <div>
            <span className="text-[10px] text-agri-text-muted uppercase font-semibold">Crop & Quantity</span>
            <p className="font-bold text-agri-text">{booking.crop} ({booking.expectedQty} Quintals)</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-agri-text-muted uppercase font-semibold">Slot Schedule</span>
            <p className="font-bold text-agri-green">{booking.slotTime}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {onLiveQueueClick && (
        <button
          onClick={onLiveQueueClick}
          className="mt-5 w-full bg-agri-green hover:bg-agri-green-dark text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all shadow-agri-sm flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-4 h-4 text-agri-gold" />
          <span>Track Live Queue Position</span>
        </button>
      )}

    </div>
  );
};
