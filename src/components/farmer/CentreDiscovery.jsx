import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MapPin, Clock, Users, Calendar, Search, Filter, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { SlotBookingModal } from './SlotBookingModal';

export const CentreDiscovery = () => {
  const { centres } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCentres = centres.filter(centre => {
    const matchesSearch = centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          centre.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' ||
                          (filterStatus === 'RECOMMENDED' && centre.recommended) ||
                          (filterStatus === 'NORMAL' && centre.status === 'NORMAL');
    return matchesSearch && matchesFilter;
  });

  const handleOpenBooking = (centre) => {
    setSelectedCentre(centre);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-agri-ivory-muted">
        <div>
          <h1 className="font-heading text-2xl font-bold text-agri-text">
            Find Procurement Centre & Book Slot
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5 font-sans">
            Compare Mandi wait times, yard capacity load, and reserve guaranteed 30-minute arrival time slots.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-agri-green-dark bg-agri-green-soft px-3 py-1.5 rounded-xl border border-agri-green-border font-medium">
          <ShieldCheck className="w-4 h-4 text-agri-green shrink-0" />
          <span>Real-time Mandi Queue Telemetry Sync (DoCA Network)</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="paper-surface rounded-xl p-4 border border-agri-ivory-muted shadow-agri-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
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

        {/* Filter Action Badges */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
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
            Lowest Waiting Time
          </button>
        </div>

      </div>

      {/* Mandis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCentres.map((centre) => (
          <div
            key={centre.id}
            className={`paper-surface rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
              centre.recommended
                ? 'border-2 border-agri-gold shadow-agri-md ring-1 ring-agri-gold/40'
                : 'border-agri-ivory-muted hover:border-agri-green-border shadow-agri-sm'
            }`}
          >
            
            {/* Recommended Badge Ribbon */}
            {centre.recommended && (
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-agri-gold text-agri-green-dark text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-agri-sm flex items-center space-x-1 font-mono">
                <span>⭐ SMART RECOMMENDATION</span>
              </div>
            )}

            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-agri-ivory-muted">
                <div>
                  <h3 className="font-heading text-lg font-bold text-agri-text">
                    {centre.name}
                  </h3>
                  <p className="text-xs text-agri-text-muted flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
                    <span>{centre.address} • <strong>{centre.distanceKm} km away</strong></span>
                  </p>
                </div>
                <StatusBadge status={centre.status} type="centre" />
              </div>

              {/* Core Telemetry Grid */}
              <div className="grid grid-cols-3 gap-3 my-4 py-3 bg-agri-ivory/50 rounded-xl border border-agri-ivory-muted text-center">
                
                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Users className="w-3 h-3 text-agri-green" />
                    <span>Queue Size</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-text mt-0.5 font-mono">
                    {centre.queueCount} <span className="text-xs font-normal text-agri-text-muted font-sans">Farmers</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3 text-agri-gold-dark" />
                    <span>Est. Wait</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-gold-dark mt-0.5 font-mono">
                    ~{centre.estWaitMinutes} <span className="text-xs font-normal font-sans">min</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Calendar className="w-3 h-3 text-agri-green" />
                    <span>Open Slots</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-green mt-0.5 font-mono">
                    {centre.availableSlots} <span className="text-xs font-normal text-agri-text-muted font-sans">free</span>
                  </p>
                </div>

              </div>

              {/* Progress Bar for Mandi Yard Capacity */}
              <div className="space-y-1 mb-4">
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

              {/* Explanation of Recommendation Reason */}
              <p className="text-xs text-agri-text-muted italic flex items-center space-x-1.5 mb-5 bg-agri-ivory/40 p-2.5 rounded-lg border border-agri-ivory-muted">
                <CheckCircle2 className="w-4 h-4 text-agri-green shrink-0" />
                <span><strong>Recommendation Reason:</strong> {centre.recommendationReason}</span>
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-agri-ivory-muted flex items-center justify-between">
              <div className="text-xs text-agri-text-muted font-medium">
                Active Weighbridges: <strong className="text-agri-text font-mono">{centre.activeCounters} Counters</strong>
              </div>

              <button
                onClick={() => handleOpenBooking(centre)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-agri-sm flex items-center space-x-2 hover:scale-[1.02] ${
                  centre.recommended
                    ? 'bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark'
                    : 'bg-agri-green hover:bg-agri-green-dark text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot Here</span>
              </button>
            </div>

          </div>
        ))}
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
