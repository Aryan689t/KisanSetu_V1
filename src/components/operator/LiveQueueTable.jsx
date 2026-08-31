import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { UserCheck, PhoneCall, Scale, CheckCircle2, Search, Filter } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { ActiveProcurementModal } from './ActiveProcurementModal';

export const LiveQueueTable = () => {
  const { queueItems, checkInFarmer, callNextFarmer } = useDemo();
  const [selectedTokenForInspection, setSelectedTokenForInspection] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredItems = queueItems.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  return (
    <>
      <div className="paper-surface rounded-2xl border border-agri-ivory-muted shadow-agri-sm overflow-hidden">
        
        {/* Table Filter Header */}
        <div className="p-4 bg-agri-ivory/50 border-b border-agri-ivory-muted flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className="font-bold text-agri-text">Filter Live Queue:</span>
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${filterStatus === 'ALL' ? 'bg-agri-green text-white font-bold shadow-agri-sm' : 'text-agri-text-muted hover:bg-agri-ivory'}`}
            >
              All ({queueItems.length})
            </button>
            <button
              onClick={() => setFilterStatus('WAITING')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${filterStatus === 'WAITING' ? 'bg-amber-600 text-white font-bold shadow-agri-sm' : 'text-agri-text-muted hover:bg-agri-ivory'}`}
            >
              Waiting
            </button>
            <button
              onClick={() => setFilterStatus('CHECKED_IN')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${filterStatus === 'CHECKED_IN' ? 'bg-blue-600 text-white font-bold shadow-agri-sm' : 'text-agri-text-muted hover:bg-agri-ivory'}`}
            >
              Checked In
            </button>
            <button
              onClick={() => setFilterStatus('PROCESSING')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${filterStatus === 'PROCESSING' ? 'bg-agri-gold text-agri-green-dark font-bold shadow-agri-sm' : 'text-agri-text-muted hover:bg-agri-ivory'}`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${filterStatus === 'COMPLETED' ? 'bg-agri-green-dark text-white font-bold shadow-agri-sm' : 'text-agri-text-muted hover:bg-agri-ivory'}`}
            >
              Completed
            </button>
          </div>

          <div className="text-agri-text-muted text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-agri-green animate-pulse"></span>
            Sonipat Yard • Operational Station: <strong className="text-agri-green">Counter 2</strong>
          </div>
        </div>

        {/* Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-agri-green-dark text-white uppercase text-[10px] tracking-wider font-heading">
              <tr>
                <th className="py-3.5 px-4">Token #</th>
                <th className="py-3.5 px-4">Farmer Details</th>
                <th className="py-3.5 px-4">Crop & Target</th>
                <th className="py-3.5 px-4">Slot Time</th>
                <th className="py-3.5 px-4">Station / Counter</th>
                <th className="py-3.5 px-4">Queue Status</th>
                <th className="py-3.5 px-4 text-right">Operational Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-agri-ivory-muted font-sans">
              {filteredItems.map((item) => {
                const isTargetDemo = item.token === 'SNP-014';

                return (
                  <tr
                    key={item.token}
                    className={`hover:bg-agri-ivory/50 transition-colors ${
                      isTargetDemo ? 'bg-agri-gold-light/20 font-medium' : ''
                    }`}
                  >
                    
                    {/* Token */}
                    <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-agri-green">
                      {item.token}
                    </td>

                    {/* Farmer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-agri-text flex items-center space-x-1.5">
                        <span>{item.farmerName}</span>
                        {isTargetDemo && (
                          <span className="text-[9px] bg-agri-gold text-agri-green-dark font-extrabold px-1.5 py-0.5 rounded">
                            TARGET DEMO
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-agri-text-muted">Aadhaar: ****{item.aadhaarLast4 || '4821'}</span>
                    </td>

                    {/* Crop */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-agri-text">{item.crop}</div>
                      <span className="text-[10px] text-agri-text-muted">Expected: {item.expectedQty} Qtl</span>
                    </td>

                    {/* Slot Time */}
                    <td className="py-3.5 px-4 font-medium text-agri-text">
                      {item.slotTime || '11:00 AM'}
                    </td>

                    {/* Station / Counter */}
                    <td className="py-3.5 px-4">
                      <span className="bg-agri-ivory px-2.5 py-1 rounded text-[11px] font-bold text-agri-green border border-agri-ivory-muted font-mono">
                        {item.counter || 'Unassigned'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} type="queue" />
                    </td>

                    {/* Operational Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        
                        {/* Step 1: Check In Gate (For WAITING) */}
                        {item.status === 'WAITING' && (
                          <button
                            onClick={() => checkInFarmer(item.token)}
                            className="bg-agri-green-soft text-agri-green-dark hover:bg-agri-green hover:text-white px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center space-x-1.5 transition-colors border border-agri-green-border shadow-agri-sm"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Gate Check-In</span>
                          </button>
                        )}

                        {/* Step 2: Call to Counter (For CHECKED_IN) */}
                        {item.status === 'CHECKED_IN' && (
                          <button
                            onClick={() => callNextFarmer(item.token, 'Counter 2')}
                            className="bg-agri-gold text-agri-green-dark hover:bg-agri-gold-dark font-extrabold px-3 py-1.5 rounded-lg text-[11px] flex items-center space-x-1.5 transition-all shadow-agri-sm animate-pulse"
                          >
                            <PhoneCall className="w-3.5 h-3.5 fill-agri-green-dark" />
                            <span>Call to Counter 2</span>
                          </button>
                        )}

                        {/* Step 3: Enter Quality & Weighment (For PROCESSING) */}
                        {item.status === 'PROCESSING' && (
                          <button
                            onClick={() => setSelectedTokenForInspection(item)}
                            className="bg-agri-green text-white hover:bg-agri-green-dark font-extrabold px-3 py-1.5 rounded-lg text-[11px] flex items-center space-x-1.5 transition-all shadow-agri-sm"
                          >
                            <Scale className="w-3.5 h-3.5 text-agri-gold" />
                            <span>Enter Quality & Weighment</span>
                          </button>
                        )}

                        {/* Step 4: Procurement Completed (For COMPLETED) */}
                        {item.status === 'COMPLETED' && (
                          <span className="text-agri-status-success font-bold text-[11px] inline-flex items-center space-x-1 bg-agri-green-soft px-2.5 py-1 rounded border border-agri-green-border">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Procured ({item.actualQty || 38.5} Qtl)</span>
                          </span>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Active Procurement Inspection Modal */}
      {selectedTokenForInspection && (
        <ActiveProcurementModal
          tokenItem={selectedTokenForInspection}
          onClose={() => setSelectedTokenForInspection(null)}
        />
      )}
    </>
  );
};
