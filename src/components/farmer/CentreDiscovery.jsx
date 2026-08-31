import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MapPin, Clock, Users, Calendar, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { SlotBookingModal } from './SlotBookingModal';

export const CentreDiscovery = () => {
  const { centres } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'RECOMMENDED' | 'NORMAL'
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
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-agri-ivory-muted">
        <div>
          <h1 className="font-heading text-2xl font-bold text-agri-text">
            Procurement Mandis & Centres Discovery
          </h1>
          <p className="text-xs text-agri-text-muted mt-1 font-sans">
            Compare queue congestion, real-time wait times, and book guaranteed time slots across Indian government procurement yards.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-agri-green-dark bg-agri-green-soft px-3 py-1.5 rounded-lg border border-agri-green-border">
          <ShieldCheck className="w-4 h-4 text-agri-green shrink-0" />
          <span>Real-time Mandi Queue Telemetry Sync (DoCA Network)</span>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="paper-surface rounded-xl p-4 border border-agri-ivory-muted shadow-agri-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-agri-text-muted" />
          <input
            type="text"
            placeholder="Search by Mandi name or district (e.g. Sonipat, Karnal)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-agri-ivory/60 border border-agri-ivory-muted rounded-lg text-xs text-agri-text focus:outline-none focus:ring-2 focus:ring-agri-green/30"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-agri-text-muted flex items-center space-x-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              filterStatus === 'ALL'
                ? 'bg-agri-green text-white shadow-sm'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            All Mandis ({centres.length})
          </button>

          <button
            onClick={() => setFilterStatus('RECOMMENDED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              filterStatus === 'RECOMMENDED'
                ? 'bg-agri-gold text-agri-green-dark shadow-sm font-bold'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            ⭐ Recommended
          </button>

          <button
            onClick={() => setFilterStatus('NORMAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              filterStatus === 'NORMAL'
                ? 'bg-agri-green-soft text-agri-green-dark border border-agri-green-border font-bold'
                : 'bg-agri-ivory text-agri-text-muted hover:bg-agri-ivory-muted'
            }`}
          >
            Lowest Load
          </button>
        </div>

      </div>

      {/* Mandi Cards Grid */}
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
            
            {/* Recommended Tag Header */}
            {centre.recommended && (
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-agri-gold text-agri-green-dark text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                <span>⭐ RECOMMENDED MANDI FOR TODAY</span>
              </div>
            )}

            <div>
              {/* Header Title & Status */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-agri-ivory-muted">
                <div>
                  <h3 className="font-heading text-lg font-bold text-agri-text">
                    {centre.name}
                  </h3>
                  <p className="text-xs text-agri-text-muted flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-agri-green shrink-0" />
                    <span>{centre.address}</span>
                  </p>
                </div>
                <StatusBadge status={centre.status} type="centre" />
              </div>

              {/* Core Telemetry Grid */}
              <div className="grid grid-cols-3 gap-3 my-4 py-3 bg-agri-ivory/50 rounded-xl border border-agri-ivory-muted text-center">
                
                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Users className="w-3 h-3 text-agri-green" />
                    <span>Live Queue</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-text mt-0.5">
                    {centre.queueCount} <span className="text-xs font-normal text-agri-text-muted">Farmers</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3 text-agri-gold-dark" />
                    <span>Est. Wait</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-gold-dark mt-0.5">
                    {centre.estWaitMinutes} <span className="text-xs font-normal">mins</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-agri-text-muted flex items-center justify-center space-x-1">
                    <Calendar className="w-3 h-3 text-agri-green" />
                    <span>Open Slots</span>
                  </span>
                  <p className="font-heading text-lg font-bold text-agri-green mt-0.5">
                    {centre.availableSlots} <span className="text-xs font-normal text-agri-text-muted">/ {centre.totalSlots}</span>
                  </p>
                </div>

              </div>

              {/* Progress Bar for Mandi Yard Capacity */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[11px]">
                  <span className="text-agri-text-muted font-medium">Yard Capacity Load</span>
                  <span className={`font-bold ${centre.capacityPercent > 85 ? 'text-agri-status-danger' : 'text-agri-green'}`}>
                    {centre.capacityPercent}% Occupied
                  </span>
                </div>
                <div className="w-full h-2 bg-agri-ivory-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      centre.capacityPercent > 85
                        ? 'bg-agri-status-danger'
                        : centre.capacityPercent > 70
                        ? 'bg-agri-status-warning'
                        : 'bg-agri-green'
                    }`}
                    style={{ width: `${centre.capacityPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Reason badge */}
              <p className="text-xs text-agri-text-muted italic flex items-center space-x-1.5 mb-5">
                <CheckCircle2 className="w-3.5 h-3.5 text-agri-green shrink-0" />
                <span>{centre.recommendationReason}</span>
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-agri-ivory-muted flex items-center justify-between">
              <div className="text-xs text-agri-text-muted font-medium">
                Active Inspection Counters: <strong className="text-agri-text">{centre.activeCounters}</strong>
              </div>

              <button
                onClick={() => handleOpenBooking(centre)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-agri-sm flex items-center space-x-2 ${
                  centre.recommended
                    ? 'bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark'
                    : 'bg-agri-green hover:bg-agri-green-dark text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot</span>
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
