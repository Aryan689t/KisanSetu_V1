import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MapPin, Clock, Users, Calendar, Search, Filter, ShieldCheck, CheckCircle2, Navigation, HelpCircle } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { SlotBookingModal } from './SlotBookingModal';

export const CentreDiscovery = () => {
  const { centres, getRecommendedCentre, activeBooking } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWhyHero, setShowWhyHero] = useState(false);

  const recommendedCentre = getRecommendedCentre(centres);
  const bookedCentreId = activeBooking?.centreId;

  const filteredCentres = centres.filter(centre => {
    const matchesSearch = centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          centre.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' ||
                          (filterStatus === 'RECOMMENDED' && centre.id === recommendedCentre.id) ||
                          (filterStatus === 'NORMAL' && centre.status === 'NORMAL');
    return matchesSearch && matchesFilter;
  });

  const handleOpenBooking = (centre) => {
    setSelectedCentre(centre);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-agri-ivory-muted">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-agri-text">
            Procurement Mandis & Smart Discovery
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5 font-sans">
            Compare queue congestion, real-time wait times, and get directions to optimal procurement hubs.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-agri-green-dark bg-agri-green-soft px-3 py-1.5 rounded-xl border border-agri-green-border font-medium font-mono shrink-0">
          <ShieldCheck className="w-4 h-4 text-agri-green shrink-0" />
          <span>Real-time Mandi Telemetry</span>
        </div>
      </div>

      {/* FEATURE HERO: Best Procurement Centre For You */}
      <div className="paper-surface rounded-2xl p-5 sm:p-6 border-2 border-agri-gold shadow-agri-md relative space-y-4 bg-gradient-to-r from-agri-gold-light/10 via-[#FFFDF7] to-agri-ivory/50">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3.5 border-b border-agri-ivory-muted">
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1 mb-1.5">
              <span className="bg-agri-gold text-agri-green-dark px-3 py-0.5 rounded-full text-xs font-extrabold shadow-sm font-mono">
                ⭐ BEST PROCUREMENT CENTRE FOR YOU
              </span>
              {recommendedCentre.id !== bookedCentreId && (
                <span className="bg-agri-ivory text-agri-text text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-agri-ivory-muted font-sans">
                  Booked: {centres.find(c => c.id === bookedCentreId)?.name.split(' ')[0] || 'Sonipat'}
                </span>
              )}
            </div>
            
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-agri-green flex items-center gap-2">
              {recommendedCentre.name}
            </h2>

            <p className="text-xs text-agri-text-muted flex items-center space-x-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
              <span>{recommendedCentre.address} • <strong>{recommendedCentre.distanceKm} km away</strong></span>
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${recommendedCentre.lat},${recommendedCentre.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-agri-green-soft hover:bg-agri-green text-agri-green-dark hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center space-x-1.5 transition-colors border border-agri-green-border shadow-agri-sm touch-target"
              title="Open Google Maps directions"
            >
              <Navigation className="w-4 h-4" />
              <span>📍 Get Directions</span>
            </a>

            <button
              onClick={() => handleOpenBooking(recommendedCentre)}
              className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-agri-sm transition-all flex items-center justify-center space-x-1.5 touch-target"
            >
              <Calendar className="w-4 h-4" />
              <span>Select Centre & Book</span>
            </button>
          </div>
        </div>

        {/* Hero Telemetry Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center py-1">
          <div className="bg-agri-ivory/80 p-2.5 rounded-xl border border-agri-ivory-muted">
            <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Est. Wait</span>
            <p className="font-heading text-lg font-extrabold text-agri-gold-dark mt-0.5 font-mono">~{recommendedCentre.estWaitMinutes} min</p>
          </div>

          <div className="bg-agri-ivory/80 p-2.5 rounded-xl border border-agri-ivory-muted">
            <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Current Queue</span>
            <p className="font-heading text-lg font-extrabold text-agri-text mt-0.5 font-mono">{recommendedCentre.queueCount} Farmers</p>
          </div>

          <div className="bg-agri-ivory/80 p-2.5 rounded-xl border border-agri-ivory-muted">
            <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Yard Capacity</span>
            <p className="font-heading text-lg font-extrabold text-agri-green mt-0.5 font-mono">{recommendedCentre.capacityPercent}%</p>
          </div>

          <div className="bg-agri-ivory/80 p-2.5 rounded-xl border border-agri-ivory-muted">
            <span className="text-[10px] text-agri-text-muted uppercase font-bold block font-sans">Open Slots</span>
            <p className="font-heading text-lg font-extrabold text-agri-green mt-0.5 font-mono">{recommendedCentre.availableSlots} free</p>
          </div>
        </div>

        {/* Why Recommended Toggle Explanation */}
        <div className="pt-1">
          <button
            onClick={() => setShowWhyHero(!showWhyHero)}
            className="text-xs font-bold text-agri-green hover:text-agri-green-dark inline-flex items-center space-x-1.5"
          >
            <HelpCircle className="w-4 h-4 text-agri-gold" />
            <span>Why is this centre recommended?</span>
            <span className="text-[10px] text-agri-text-muted">({showWhyHero ? 'Hide reason' : 'View rationale'})</span>
          </button>

          {showWhyHero && (
            <div className="mt-3 p-3.5 bg-agri-ivory/90 rounded-xl border border-agri-ivory-muted text-xs text-agri-text space-y-2 animate-in fade-in duration-200">
              <strong className="font-bold text-agri-green-dark block font-heading">
                Dynamic Load Balancing Rationale:
              </strong>
              <p className="text-agri-text-muted leading-relaxed">
                KisanSetu continuously evaluates live queue sizes, weighbridge counter processing speeds, and yard capacity loads across Haryana. <strong>{recommendedCentre.name}</strong> is selected because it offers the lowest expected waiting time (~{recommendedCentre.estWaitMinutes} min) and optimal capacity load ({recommendedCentre.capacityPercent}%), avoiding heavy traffic backlogs at neighboring hubs like Karnal.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Comparison Filter Bar */}
      <div className="paper-surface rounded-xl p-3.5 border border-agri-ivory-muted shadow-agri-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-agri-text-muted" />
          <input
            type="text"
            placeholder="Search by Mandi or district (e.g. Sonipat, Karnal)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-agri-ivory/60 border border-agri-ivory-muted rounded-xl text-xs text-agri-text focus:outline-none focus:ring-2 focus:ring-agri-green/30"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-agri-text-muted flex items-center space-x-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              filterStatus === 'ALL'
                ? 'bg-agri-green text-white shadow-agri-sm font-bold'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            All Mandis ({centres.length})
          </button>

          <button
            onClick={() => setFilterStatus('RECOMMENDED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              filterStatus === 'RECOMMENDED'
                ? 'bg-agri-gold text-agri-green-dark shadow-agri-sm font-bold'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            ⭐ Recommended
          </button>

          <button
            onClick={() => setFilterStatus('NORMAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              filterStatus === 'NORMAL'
                ? 'bg-agri-green-soft text-agri-green-dark border border-agri-green-border font-bold'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            Lowest Load
          </button>
        </div>

      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCentres.map((centre) => {
          const isRec = centre.id === recommendedCentre.id;
          const isBooked = centre.id === bookedCentreId;

          return (
            <div
              key={centre.id}
              className={`paper-surface rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                isRec
                  ? 'border-2 border-agri-gold shadow-agri-md ring-1 ring-agri-gold/40'
                  : isBooked
                  ? 'border-2 border-agri-green shadow-agri-sm'
                  : 'border-agri-ivory-muted hover:border-agri-green-border shadow-agri-sm'
              }`}
            >
              
              {/* Badges Ribbon */}
              <div className="absolute top-0 right-5 -translate-y-1/2 flex items-center space-x-1 font-mono text-[10px] font-extrabold uppercase">
                {isBooked && (
                  <span className="bg-agri-green text-white px-2.5 py-0.5 rounded-full shadow-agri-sm">
                    YOUR BOOKING
                  </span>
                )}
                {isRec && (
                  <span className="bg-agri-gold text-agri-green-dark px-2.5 py-0.5 rounded-full shadow-agri-sm">
                    ⭐ RECOMMENDED
                  </span>
                )}
              </div>

              <div>
                {/* Header Title & Status */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-agri-ivory-muted">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-agri-text">
                      {centre.name}
                    </h3>
                    <p className="text-xs text-agri-text-muted flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
                      <span>{centre.address} • <strong>{centre.distanceKm} km</strong></span>
                    </p>
                  </div>
                  <StatusBadge status={centre.status} type="centre" />
                </div>

                {/* Core Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-3.5 py-2.5 bg-agri-ivory/50 rounded-xl border border-agri-ivory-muted text-center">
                  
                  <div>
                    <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1 font-sans">
                      <Users className="w-3 h-3 text-agri-green" />
                      <span>Queue</span>
                    </span>
                    <p className="font-heading text-base font-bold text-agri-text mt-0.5 font-mono">
                      {centre.queueCount} <span className="text-[10px] font-normal text-agri-text-muted font-sans">Farmers</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1 font-sans">
                      <Clock className="w-3 h-3 text-agri-gold-dark" />
                      <span>Est. Wait</span>
                    </span>
                    <p className="font-heading text-base font-bold text-agri-gold-dark mt-0.5 font-mono">
                      ~{centre.estWaitMinutes} <span className="text-[10px] font-normal font-sans">min</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1 font-sans">
                      <Calendar className="w-3 h-3 text-agri-green" />
                      <span>Open Slots</span>
                    </span>
                    <p className="font-heading text-base font-bold text-agri-green mt-0.5 font-mono">
                      {centre.availableSlots} <span className="text-[10px] font-normal text-agri-text-muted font-sans">free</span>
                    </p>
                  </div>

                </div>

                {/* Progress Bar for Mandi Yard Capacity */}
                <div className="space-y-1 mb-3.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-agri-text-muted font-medium">Yard Capacity Load</span>
                    <span className={`font-bold font-mono ${centre.capacityPercent > 85 ? 'text-rose-700' : 'text-agri-green'}`}>
                      {centre.capacityPercent}% Occupied
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-agri-ivory-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        centre.capacityPercent > 85
                          ? 'bg-rose-600'
                          : centre.capacityPercent > 70
                          ? 'bg-amber-500'
                          : 'bg-agri-green'
                      }`}
                      style={{ width: `${centre.capacityPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Reason badge */}
                <p className="text-xs text-agri-text-muted italic flex items-center space-x-1.5 mb-4 bg-agri-ivory/40 p-2 rounded-lg border border-agri-ivory-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-agri-green shrink-0" />
                  <span className="line-clamp-1">{centre.recommendationReason}</span>
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-agri-ivory-muted flex items-center justify-between gap-2">
                
                {/* Google Maps Directions Button */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-agri-ivory hover:bg-agri-ivory-muted text-agri-green-dark px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center space-x-1 border border-agri-ivory-muted transition-colors touch-target"
                  title="Open Google Maps directions to this mandi"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>📍 Directions</span>
                </a>

                <button
                  onClick={() => handleOpenBooking(centre)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-agri-sm flex items-center space-x-1.5 touch-target ${
                    isRec
                      ? 'bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark'
                      : 'bg-agri-green hover:bg-agri-green-dark text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Slot</span>
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedCentre && (
        <SlotBookingModal
          centre={selectedCentre}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
};

