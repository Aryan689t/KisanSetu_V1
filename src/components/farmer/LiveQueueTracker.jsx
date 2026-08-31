import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Clock, MapPin, CheckCircle2, UserCheck, AlertTriangle, ShieldCheck, ArrowRight, Wheat, Activity } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const LiveQueueTracker = () => {
  const { queueItems, activeBooking } = useDemo();

  const youTokenIndex = queueItems.findIndex(q => q.token === activeBooking?.token);
  const farmersAheadCount = Math.max(0, youTokenIndex - 1);

  const isCompleted = activeBooking?.status === 'COMPLETED';
  const isDisbursed = activeBooking?.paymentStatus === 'DISBURSED';
  const isProcessing = activeBooking?.status === 'PROCESSING';
  const isCheckedIn = activeBooking?.status === 'CHECKED_IN';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Live Telemetry Header */}
      <div className="paper-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-agri-green-soft text-agri-green-dark px-3 py-1 rounded-full text-xs font-bold mb-2 border border-agri-green-border">
            <span className="w-2 h-2 rounded-full bg-agri-green animate-ping"></span>
            <span>LIVE MANDI QUEUE TELEMETRY</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-agri-text">
            Queue Tracker — {activeBooking?.centreName || 'Sonipat Main Procurement Centre'}
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5 font-sans">
            G.T. Road, Sector 15 Mandi Yard • Operating Counters: <strong className="text-agri-green">Counter 1, Counter 2</strong>
          </p>
        </div>

        {/* Live Stat Callouts */}
        <div className="grid grid-cols-3 gap-2 bg-agri-ivory/60 p-3 rounded-xl border border-agri-ivory-muted text-center shrink-0">
          <div className="px-2 border-r border-agri-ivory-muted">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted block">Your Token</span>
            <p className="font-heading text-xl font-extrabold text-agri-green font-mono">
              {activeBooking?.token || 'SNP-014'}
            </p>
          </div>
          <div className="px-2 border-r border-agri-ivory-muted">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted block font-sans">Ahead of You</span>
            <p className="font-heading text-xl font-extrabold text-agri-text font-mono">
              {isCompleted || isDisbursed ? '0' : `${farmersAheadCount} Farmers`}
            </p>
          </div>
          <div className="px-2">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted block font-sans">Est. Wait</span>
            <p className="font-heading text-xl font-extrabold text-agri-gold-dark font-mono">
              {isCompleted || isDisbursed ? '0 min' : `~${farmersAheadCount * 10 + 12} min`}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Status Alert Banner */}
      {activeBooking?.status === 'WAITING' && (
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-sm">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-sm block text-amber-900">Token {activeBooking?.token} is in queue waiting state</strong>
              <p className="text-xs text-amber-800 mt-0.5">
                You have <strong>3 farmers ahead</strong>. Gate check-in is pending. Please stay within Sonipat Yard premises.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg shrink-0 text-center font-mono">
            Gate Check-in Pending
          </span>
        </div>
      )}

      {isCheckedIn && (
        <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-300 text-blue-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-sm">
          <div className="flex items-start space-x-3">
            <UserCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-sm block text-blue-900">Gate Check-in Completed</strong>
              <p className="text-xs text-blue-800 mt-0.5">
                Your check-in is verified. Please wait near <strong>Counter 2</strong> for your turn call announcement.
              </p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold bg-blue-200 text-blue-900 px-3 py-1.5 rounded-lg shrink-0 text-center font-mono">
            Check-in Complete
          </span>
        </div>
      )}

      {isProcessing && (
        <div className="p-4 rounded-xl bg-agri-gold-light/40 border-2 border-agri-gold text-agri-green-dark text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-md animate-pulse">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-agri-green-dark shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-sm sm:text-base block">🔔 YOUR TURN HAS ARRIVED!</strong>
              <p className="text-xs font-semibold text-agri-green-dark mt-0.5">
                Token #{activeBooking?.token}: Proceed immediately to <strong>Counter 2</strong> for crop moisture & weight inspection.
              </p>
            </div>
          </div>
          <span className="text-xs uppercase font-extrabold bg-agri-green text-white px-4 py-2 rounded-xl shrink-0 text-center shadow-agri-sm">
            Proceed to Counter 2
          </span>
        </div>
      )}

      {isCompleted && !isDisbursed && (
        <div className="p-4 rounded-xl bg-agri-green-soft border-2 border-agri-green text-agri-green-dark text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-sm">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-agri-green shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-sm block">✓ Procurement Completed Successfully!</strong>
              <p className="text-xs text-agri-text mt-0.5">
                Weighed Quantity: <strong>{activeBooking?.actualQty || 38.5} Quintals</strong> • Payout Amount: <strong>₹{((activeBooking?.actualQty || 38.5) * 2200).toLocaleString()}</strong>
              </p>
            </div>
          </div>
          <span className="text-xs uppercase font-bold bg-agri-green-dark text-white px-3 py-1.5 rounded-lg shrink-0 text-center font-mono">
            Awaiting Admin DBT
          </span>
        </div>
      )}

      {isDisbursed && (
        <div className="p-4 rounded-xl bg-agri-green-soft border-2 border-agri-green text-agri-green-dark text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-agri-sm">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-agri-green shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-sm block">✓ DBT Payment Disbursed to Bank</strong>
              <p className="text-xs text-agri-text mt-0.5">
                Payout of <strong>₹84,700</strong> credited to SBI A/C (****4092). Ref: <code className="font-mono font-bold bg-agri-green/10 px-1 py-0.5 rounded text-agri-green-dark">DBT-UTIB000984210</code>.
              </p>
            </div>
          </div>
          <span className="text-xs uppercase font-bold bg-agri-green-dark text-white px-3 py-1.5 rounded-lg shrink-0 text-center font-mono">
            Disbursed via DBT
          </span>
        </div>
      )}

      {/* Main Queue Timeline Track */}
      <div className="paper-surface rounded-2xl p-5 sm:p-8 border border-agri-ivory-muted shadow-agri-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-agri-ivory-muted">
          <div>
            <h2 className="font-heading text-lg font-bold text-agri-text">
              Real-time Queue Timeline & Counter Position
            </h2>
            <p className="text-xs text-agri-text-muted">
              Sonipat Main Procurement Yard • Counter Clearance Status
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-status-success inline-block"></span>
              <span>Completed</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-gold inline-block"></span>
              <span>Processing</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>In Queue</span>
            </span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-1 before:bg-agri-ivory-muted">
          
          {queueItems.map((item, index) => {
            const isYou = item.token === activeBooking?.token;
            const isCompletedItem = item.status === 'COMPLETED';
            const isProcessingItem = item.status === 'PROCESSING';

            let nodeBg = 'bg-gray-200 border-gray-300 text-gray-700';
            let cardBg = 'paper-surface border-agri-ivory-muted';

            if (isCompletedItem) {
              nodeBg = 'bg-agri-green text-white border-agri-green';
              cardBg = 'bg-agri-green-soft/40 border-agri-green-border';
            } else if (isProcessingItem) {
              nodeBg = 'bg-agri-gold text-agri-green-dark border-agri-gold shadow-md animate-pulse';
              cardBg = 'bg-agri-gold-light/30 border-agri-gold ring-2 ring-agri-gold/40';
            } else if (isYou) {
              nodeBg = 'bg-agri-green-dark text-agri-gold border-agri-gold';
              cardBg = 'bg-agri-surface border-2 border-agri-green shadow-agri-md';
            }

            return (
              <div key={item.token} className="relative flex items-start space-x-3 sm:space-x-4">
                
                {/* Timeline Icon Node */}
                <div className={`absolute -left-6 sm:-left-10 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm ${nodeBg}`}>
                  {isCompletedItem ? '✓' : index + 1}
                </div>

                {/* Card Container */}
                <div className={`flex-1 p-4 rounded-xl border transition-all ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                      <span className="font-heading font-extrabold text-xl text-agri-green font-mono">
                        {item.token}
                      </span>

                      {isYou && (
                        <span className="bg-agri-gold text-agri-green-dark font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                          ⭐ YOU (Ramesh Singh)
                        </span>
                      )}

                      <span className="text-xs font-bold text-agri-text">
                        {item.farmerName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-xs font-medium text-agri-text-muted">
                        Counter: <strong className="text-agri-text font-mono">{item.counter || 'Counter 2'}</strong>
                      </span>
                      <StatusBadge status={item.status} type="queue" />
                    </div>

                  </div>

                  {/* Crop & Inspection details */}
                  <div className="mt-3 pt-3 border-t border-agri-ivory-muted flex flex-wrap items-center justify-between text-xs text-agri-text-muted gap-2">
                    <div className="flex items-center space-x-4 flex-wrap gap-y-1">
                      <span>Crop: <strong className="text-agri-text">{item.crop}</strong></span>
                      <span>Target: <strong className="text-agri-text">{item.expectedQty} Quintals</strong></span>
                      {item.actualQty && (
                        <span className="text-agri-green font-bold">
                          Weighed: {item.actualQty} Qtl ({item.qualityGrade || 'Grade A'}, {item.moisturePercent || 12.4}% Moisture)
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-[11px]">Arrival: {item.arrivalTime || '10:22 AM'}</span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};
