import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldCheck, CheckCircle2, Calculator, ArrowRight, Building, Play } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const PaymentSettlement = () => {
  const { queueItems, disbursePayment } = useDemo();

  // Filter items that are completed or pending disbursal
  const pendingDisbursalItems = queueItems.filter(
    q => q.status === 'COMPLETED' || q.paymentStatus === 'PENDING_DISBURSAL' || q.token === 'SNP-014'
  );

  return (
    <div className="paper-surface rounded-2xl border border-agri-ivory-muted shadow-agri-sm overflow-hidden">
      
      <div className="p-4 bg-agri-green-dark text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-agri-gold" />
          <h3 className="font-heading font-bold text-sm">
            Direct Benefit Transfer (DBT) MSP Disbursal Management
          </h3>
        </div>
        <span className="text-[10px] text-agri-gold font-mono uppercase tracking-wider bg-agri-green/60 px-2.5 py-1 rounded border border-agri-gold/30">
          Public Financial Management System (PFMS) Sync
        </span>
      </div>

      <div className="p-4 bg-agri-gold-light/20 border-b border-agri-gold/30 text-xs text-agri-text flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-agri-gold-dark shrink-0" />
          <span>
            <strong>Required Standard:</strong> All payment releases must verify net weighment formula (`Quintals × MSP Rate = Total`).
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-agri-ivory border-b border-agri-ivory-muted uppercase text-[10px] text-agri-text-muted font-heading tracking-wider">
            <tr>
              <th className="py-3 px-4">Token / Farmer</th>
              <th className="py-3 px-4">Mandi Station</th>
              <th className="py-3 px-4">Inspection Result</th>
              <th className="py-3 px-4">Verified Payout Calculation</th>
              <th className="py-3 px-4">Bank DBT Account</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Disbursal Control</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-agri-ivory-muted font-sans">
            {pendingDisbursalItems.map((item) => {
              const isDisbursed = item.paymentStatus === 'DISBURSED';
              const isTargetDemo = item.token === 'SNP-014';
              const qty = item.actualQty || 38.5;
              const rate = item.ratePerQuintal || 2200;
              const totalAmount = item.totalAmount || Math.round(qty * rate);

              return (
                <tr
                  key={item.token}
                  className={`hover:bg-agri-ivory/50 transition-colors ${
                    isTargetDemo ? 'bg-agri-gold-light/10 font-medium' : ''
                  }`}
                >
                  
                  {/* Token & Farmer */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-extrabold text-sm text-agri-green">
                      {item.token}
                    </div>
                    <div className="font-bold text-agri-text mt-0.5">
                      {item.farmerName}
                    </div>
                  </td>

                  {/* Mandi */}
                  <td className="py-3.5 px-4 text-agri-text-muted">
                    <strong className="text-agri-text block">Sonipat Yard</strong>
                    Counter 2
                  </td>

                  {/* Inspection */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-agri-text">
                      {item.qualityGrade || 'Grade A'}
                    </div>
                    <span className="text-[10px] text-agri-text-muted">
                      Moisture: {item.moisturePercent || 12.4}%
                    </span>
                  </td>

                  {/* Formula */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-agri-green">
                      {qty} qtl × ₹{rate.toLocaleString()} = ₹{totalAmount.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-agri-text-muted block">Verified Net Weight</span>
                  </td>

                  {/* Bank Account */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-agri-text flex items-center space-x-1">
                      <Building className="w-3.5 h-3.5 text-agri-green" />
                      <span>SBI ****4092</span>
                    </div>
                    <span className="text-[10px] text-agri-text-muted">Direct Benefit Transfer</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.paymentStatus} type="payment" />
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    {!isDisbursed ? (
                      <button
                        onClick={() => disbursePayment(item.token)}
                        className="bg-agri-green hover:bg-agri-green-dark text-white font-extrabold px-3 py-1.5 rounded-lg text-[11px] inline-flex items-center space-x-1.5 transition-all shadow-agri-sm"
                      >
                        <Play className="w-3 h-3 text-agri-gold fill-agri-gold" />
                        <span>Disburse ₹{totalAmount.toLocaleString()}</span>
                      </button>
                    ) : (
                      <span className="text-agri-status-success font-bold text-[11px] inline-flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Disbursed via DBT</span>
                      </span>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
