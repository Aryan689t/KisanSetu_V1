import React from 'react';
import { Wheat, MapPin, Clock, CheckCircle2, Navigation, ArrowRight, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useDemo } from '../../context/DemoContext';

export const TokenDisplay = ({ booking, onLiveQueueClick }) => {
  const { centres } = useDemo();
  if (!booking) return null;

  // Find target centre details for GPS navigation
  const currentCentre = centres.find(c => c.id === booking.centreId) || centres.find(c => c.name === booking.centreName) || centres[0];
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentCentre.lat || 28.9931},${currentCentre.lng || 77.0151}`;

  return (
    <div className="bg-[#FFFDF7] rounded-2xl border-2 border-agri-green/40 p-4 sm:p-5 shadow-agri-md relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Motif */}
      <div className="absolute -right-8 -bottom-8 opacity-[0.04] pointer-events-none text-agri-green">
        <Wheat className="w-56 h-56" />
      </div>

      <div>
        {/* Pass Header Ribbon */}
        <div className="flex items-center justify-between pb-3 border-b border-agri-ivory-muted">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-agri-green text-white flex items-center justify-center font-extrabold text-[10px] shadow-sm font-mono">
              DoCA
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-agri-green">
                Digital Mandi Pass
              </h4>
              <p className="text-[10px] text-agri-text-muted font-mono">
                {booking.bookingId || 'BK-2026-8812'}
              </p>
            </div>
          </div>
          <StatusBadge status={booking.status} type="queue" />
        </div>

        {/* Farmer Name & Token Display Hero */}
        <div className="my-4 text-center bg-agri-ivory/60 rounded-xl p-4 border border-agri-gold/40 relative shadow-inner space-y-1">
          <div className="flex items-center justify-center space-x-1 text-xs text-agri-text font-bold mb-1">
            <User className="w-3.5 h-3.5 text-agri-green" />
            <span>{booking.farmerName?.replace(' (YOU)', '') || 'Ramesh Singh'}</span>
          </div>

          <span className="text-[10px] font-extrabold text-agri-gold-dark uppercase tracking-widest block font-mono">
            TOKEN NUMBER
          </span>
          <div className="font-heading font-extrabold text-4xl sm:text-5xl text-agri-green tracking-tight font-mono py-0.5">
            {booking.token}
          </div>

          <div className="mt-1 inline-flex items-center space-x-1.5 bg-agri-green-soft px-3 py-0.5 rounded-full text-[11px] font-bold text-agri-green-dark border border-agri-green-border font-mono">
            <Clock className="w-3.5 h-3.5 text-agri-green shrink-0" />
            <span>Assigned: {booking.counter || 'Counter 2'}</span>
          </div>
        </div>

        {/* Quick Queue Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-agri-surface p-2.5 rounded-xl border border-agri-ivory-muted text-center">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted block">Farmers Ahead</span>
            <p className="font-heading text-lg font-extrabold text-agri-text mt-0.5 font-mono">
              {booking.status === 'COMPLETED' ? '0' : '3 Farmers'}
            </p>
          </div>
          <div className="bg-agri-surface p-2.5 rounded-xl border border-agri-ivory-muted text-center">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted block">Est. Wait Time</span>
            <p className="font-heading text-lg font-extrabold text-agri-gold-dark mt-0.5 font-mono">
              {booking.status === 'COMPLETED' ? '0 min' : `~${currentCentre.estWaitMinutes || 24} min`}
            </p>
          </div>
        </div>

        {/* Mandi & Crop Details */}
        <div className="space-y-2 text-xs border-t border-agri-ivory-muted pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-agri-green shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-agri-text block text-xs">{booking.centreName || currentCentre.name}</strong>
                <p className="text-[11px] text-agri-text-muted line-clamp-1">{currentCentre.address}</p>
              </div>
            </div>

            {/* Google Maps Directions Button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-agri-green-soft hover:bg-agri-green text-agri-green-dark hover:text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center space-x-1 shrink-0 border border-agri-green-border transition-colors touch-target min-h-[36px]"
              title="Open Google Maps directions to this mandi"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>

          <div className="flex items-center justify-between bg-agri-ivory/60 p-2.5 rounded-xl border border-agri-ivory-muted text-xs">
            <div>
              <span className="text-[10px] text-agri-text-muted uppercase font-bold block">Crop & Expected Qty</span>
              <p className="font-bold text-agri-text mt-0.5">{booking.crop} • {booking.expectedQty} Qtl</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-agri-text-muted uppercase font-bold block">Slot Window</span>
              <p className="font-bold text-agri-green mt-0.5 font-mono">{booking.slotTime || '11:00 AM - 11:30 AM'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {onLiveQueueClick && (
        <button
          onClick={onLiveQueueClick}
          className="mt-4 w-full bg-agri-green hover:bg-agri-green-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-agri-sm flex items-center justify-center space-x-2 touch-target"
        >
          <CheckCircle2 className="w-4 h-4 text-agri-gold" />
          <span>Track Live Queue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

    </div>
  );
};

