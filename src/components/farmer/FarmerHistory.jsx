import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { History, ShieldCheck, Download, CheckCircle2, Calculator, Building, FileCheck } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const FarmerHistory = () => {
  const { pastHistory, activeBooking } = useDemo();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-agri-ivory-muted">
        <div>
          <h1 className="font-heading text-2xl font-bold text-agri-text">
            Procurement Receipts & Direct Benefit Transfer (DBT) Payouts
          </h1>
          <p className="text-xs text-agri-text-muted mt-0.5 font-sans">
            Transparent MSP calculations, government quality inspection logs, and direct bank settlement records.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-agri-green-dark bg-agri-green-soft px-3.5 py-2 rounded-xl border border-agri-green-border font-medium">
          <Building className="w-4 h-4 text-agri-green shrink-0" />
          <span>Aadhaar-Linked DBT Bank A/C: <strong>State Bank of India (****4092)</strong></span>
        </div>
      </div>

      {/* Transparent Calculation Standard Explanation Banner */}
      <div className="p-4 bg-agri-gold-light/20 rounded-2xl border border-agri-gold/40 text-xs text-agri-text flex items-start space-x-3 shadow-agri-sm">
        <Calculator className="w-5 h-5 text-agri-gold-dark shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-agri-green-dark text-sm block">
            Transparent Government MSP Settlement Formula
          </strong>
          <p className="text-agri-text-muted mt-0.5 leading-relaxed font-sans">
            All procurement payouts are calculated strictly based on verified net weighment at Mandi weighbridges multiplied by the official Cabinet Committee on Economic Affairs (CCEA) Minimum Support Price (MSP) rate. Direct transfer to your bank account with zero middleman deductions.
          </p>
        </div>
      </div>

      {/* Procurement History Cards */}
      <div className="space-y-6">
        {pastHistory.map((item) => (
          <div
            key={item.id}
            className="paper-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm hover:border-agri-green-border transition-all"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-agri-ivory-muted">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase bg-agri-green-soft text-agri-green-dark px-2.5 py-0.5 rounded border border-agri-green-border">
                    {item.season}
                  </span>
                  <span className="text-xs text-agri-text-muted font-medium">{item.date}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-agri-text mt-1">
                  {item.crop}
                </h3>
                <p className="text-xs text-agri-text-muted">
                  {item.centre}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <StatusBadge status={item.paymentStatus} type="payment" />
                <button
                  onClick={() => alert(`Downloading official DoCA Procurement Receipt ${item.id}`)}
                  className="p-2 rounded-xl bg-agri-ivory text-agri-green hover:bg-agri-green-soft transition-colors border border-agri-ivory-muted"
                  title="Download Official PDF Receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Payout Calculation Formula Box */}
            <div className="my-5 bg-agri-ivory/60 rounded-xl p-4 border border-agri-gold/30">
              <div className="text-xs font-bold text-agri-gold-dark uppercase tracking-wider mb-2 flex items-center space-x-1.5 font-mono">
                <Calculator className="w-4 h-4 text-agri-gold-dark" />
                <span>Verified Government Payout Formula</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-heading text-xl sm:text-2xl font-extrabold text-agri-green font-mono">
                    {item.formula}
                  </div>
                  <p className="text-xs text-agri-text-muted font-sans">
                    Verified Weighbridge Net Weight: <strong>{item.actualQty} Quintals</strong> • MSP Rate: <strong>₹{item.ratePerQuintal.toLocaleString()} / Qtl</strong>
                  </p>
                </div>

                <div className="text-left lg:text-right bg-agri-surface p-3 rounded-xl border border-agri-ivory-muted">
                  <span className="text-[10px] text-agri-text-muted uppercase font-bold block">Total Disbursed Payout</span>
                  <p className="font-heading text-2xl font-extrabold text-agri-green font-mono">
                    ₹{item.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Inspection & Bank Account Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-agri-surface p-3 rounded-xl border border-agri-ivory-muted">
              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-semibold block">Quality Grade & Moisture</span>
                <p className="font-bold text-agri-text mt-0.5">
                  {item.qualityGrade || 'Grade A'} • Moisture: {item.moisturePercent || 12.4}%
                </p>
              </div>

              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-semibold block">Bank Account Credit</span>
                <p className="font-bold text-agri-text mt-0.5">
                  {item.bankAccount || 'State Bank of India (****4092)'}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-agri-text-muted uppercase font-semibold block">DBT Reference ID</span>
                <p className="font-mono text-xs font-bold text-agri-green mt-0.5">
                  {item.dbtReference || 'DBT-UTIB000984210'}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
