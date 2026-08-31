import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Clock, MapPin, CheckCircle2, UserCheck, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const LiveQueueTracker = () => {
  const { queueItems, activeBooking, callNextFarmer, completeProcurement } = useDemo();

  const youTokenIndex = queueItems.findIndex(q => q.token === activeBooking?.token);
  const farmersAheadCount = Math.max(0, youTokenIndex - 1); // Farmers between current processing and YOU

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Live Connection Status */}
      <div className="bg-agri-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-agri-green-soft text-agri-green-dark px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-agri-green-border">
            <span className="w-2 h-2 rounded-full bg-agri-green animate-ping"></span>
            <span>LIVE MANDI QUEUE TELEMETRY</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-agri-text">
            Queue Status — {activeBooking?.centreName || 'Sonipat Main Procurement Centre'}
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5">
            G.T. Road, Sector 15 Mandi Yard • Active Counters: <strong>Counter 1, Counter 2, Counter 3</strong>
          </p>
        </div>

        {/* Live Stat Badges */}
        <div className="flex items-center space-x-4 bg-agri-ivory p-3 rounded-xl border border-agri-ivory-muted">
          <div className="text-center px-3 border-r border-agri-ivory-muted">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted">Your Token</span>
            <p className="font-heading text-xl font-extrabold text-agri-green font-mono">
              {activeBooking?.token}
            </p>
          </div>
          <div className="text-center px-3 border-r border-agri-ivory-muted">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted">Ahead of You</span>
            <p className="font-heading text-xl font-extrabold text-agri-text">
              {farmersAheadCount} Farmers
            </p>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] uppercase font-bold text-agri-text-muted">Est. Waiting</span>
            <p className="font-heading text-xl font-extrabold text-agri-gold-dark">
              ~{farmersAheadCount * 12 + 10} mins
            </p>
          </div>
        </div>

      </div>

      {/* Banner Alert based on Active Status */}
      {activeBooking?.status === 'WAITING' && (
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs flex items-center justify-between shadow-agri-sm">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="font-bold block">Token {activeBooking?.token} is in queue waiting state</strong>
              <span>You have 3 farmers ahead. Please stay within Sonipat Yard premises.</span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-2.5 py-1 rounded">
            Gate Check-in Pending
          </span>
        </div>
      )}

      {activeBooking?.status === 'PROCESSING' && (
        <div className="p-4 rounded-xl bg-agri-gold-light/40 border-2 border-agri-gold text-agri-green-dark text-xs flex items-center justify-between shadow-agri-md animate-pulse">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-agri-green-dark shrink-0" />
            <div>
              <strong className="font-bold text-sm block">🔔 YOUR TURN HAS ARRIVED!</strong>
              <span>Token {activeBooking?.token}: Proceed immediately to <strong>Counter 2</strong> for weighing & moisture inspection.</span>
            </div>
          </div>
          <span className="text-xs uppercase font-extrabold bg-agri-green text-white px-3 py-1.5 rounded-lg">
            Proceed to Counter 2
          </span>
        </div>
      )}

      {activeBooking?.status === 'COMPLETED' && (
        <div className="p-4 rounded-xl bg-agri-green-soft border-2 border-agri-green text-agri-green-dark text-xs flex items-center justify-between shadow-agri-sm">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-agri-green shrink-0" />
            <div>
              <strong className="font-bold text-sm block">✓ Procurement Completed Successfully!</strong>
              <span>Weighed Quantity: <strong>{activeBooking?.actualQty || 38.5} Quintals</strong> • Payout Amount: <strong>₹{((activeBooking?.actualQty || 38.5) * 2200).toLocaleString()}</strong></span>
            </div>
          </div>
          <span className="text-xs uppercase font-bold bg-agri-green-dark text-white px-3 py-1.5 rounded-lg">
            Awaiting Admin DBT
          </span>
        </div>
      )}

      {/* Main Interactive Queue Visualizer Timeline */}
      <div className="paper-surface rounded-2xl p-6 sm:p-8 border border-agri-ivory-muted shadow-agri-md">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-agri-ivory-muted">
          <div>
            <h2 className="font-heading text-lg font-bold text-agri-text">
              Real-time Queue Timeline & Counter Clearance
            </h2>
            <p className="text-xs text-agri-text-muted">
              Live token movement at Sonipat Main Yard Counters
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-agri-status-success inline-block"></span>
              <span>Completed</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-agri-gold inline-block"></span>
              <span>Processing</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span>
              <span>Waiting</span>
            </span>
          </div>
        </div>

        {/* Timeline Nodes */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-1 before:bg-agri-ivory-muted">
          
          {queueItems.map((item, index) => {
            const isYou = item.token === activeBooking?.token;
            const isCompleted = item.status === 'COMPLETED';
            const isProcessing = item.status === 'PROCESSING';

            let nodeBg = 'bg-gray-200 border-gray-300 text-gray-700';
            let cardBg = 'paper-surface border-agri-ivory-muted';

            if (isCompleted) {
              nodeBg = 'bg-agri-green text-white border-agri-green';
              cardBg = 'bg-agri-green-soft/40 border-agri-green-border';
            } else if (isProcessing) {
              nodeBg = 'bg-agri-gold text-agri-green-dark border-agri-gold shadow-md animate-pulse';
              cardBg = 'bg-agri-gold-light/30 border-agri-gold ring-2 ring-agri-gold/40';
            } else if (isYou) {
              nodeBg = 'bg-agri-green-dark text-agri-gold border-agri-gold';
              cardBg = 'bg-agri-surface border-2 border-agri-green shadow-agri-md';
            }

            return (
              <div key={item.token} className="relative flex items-start space-x-4">
                
                {/* Node Icon */}
                <div className={`absolute -left-6 sm:-left-10 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm ${nodeBg}`}>
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* Card Container */}
                <div className={`flex-1 p-4 rounded-xl border transition-all ${cardBg}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div className="flex items-center space-x-3">
                      <span className="font-heading font-extrabold text-xl text-agri-green font-mono">
                        {item.token}
                      </span>

                      {isYou && (
                        <span className="bg-agri-gold text-agri-green-dark font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                          ⭐ YOU (Ramesh Singh)
                        </span>
                      )}

                      <span className="text-xs font-semibold text-agri-text">
                        {item.farmerName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-agri-text-muted">
                        Assigned: <strong>{item.counter}</strong>
                      </span>
                      <StatusBadge status={item.status} type="queue" />
                    </div>

                  </div>

                  {/* Crop & Timing info */}
                  <div className="mt-3 pt-3 border-t border-agri-ivory-muted flex flex-wrap items-center justify-between text-xs text-agri-text-muted gap-2">
                    <div className="flex items-center space-x-4">
                      <span>Crop: <strong className="text-agri-text">{item.crop}</strong></span>
                      <span>Target: <strong className="text-agri-text">{item.expectedQty} Quintals</strong></span>
                      {item.actualQty && (
                        <span className="text-agri-green font-bold">
                          Weighed: {item.actualQty} Qtl ({item.qualityGrade}, {item.moisturePercent}% Moisture)
                        </span>
                      )}
                    </div>
                    <div>
                      <span>Arrival: {item.arrivalTime}</span>
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
