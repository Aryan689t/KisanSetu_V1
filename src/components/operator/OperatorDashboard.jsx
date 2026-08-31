import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Cpu, Users, Scale, Clock, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { LiveQueueTable } from './LiveQueueTable';
import { ActiveProcurementModal } from './ActiveProcurementModal';

export const OperatorDashboard = () => {
  const { queueItems, callNextFarmer, activeBooking } = useDemo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalBookings = queueItems.length;
  const checkedInCount = queueItems.filter(q => q.status === 'CHECKED_IN').length;
  const waitingCount = queueItems.filter(q => q.status === 'WAITING').length;
  const processingCount = queueItems.filter(q => q.status === 'PROCESSING').length;
  const completedCount = queueItems.filter(q => q.status === 'COMPLETED').length;

  const currentProcessingItem = queueItems.find(q => q.status === 'PROCESSING') || activeBooking;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Operations Control Centre Banner */}
      <div className="bg-agri-green-dark text-white rounded-2xl p-6 sm:p-8 shadow-agri-md relative overflow-hidden border border-agri-green/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-agri-gold/20 text-agri-gold px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-agri-gold/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>PROCUREMENT OPERATOR CONTROL DESK</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sonipat Main Procurement Yard — Gate & Counter Operations
            </h1>
            <p className="text-xs text-agri-ivory/80 mt-1 font-sans">
              Manage live queue clearance, verify moisture & quality metrics, and log official weighments for instant DBT settlement.
            </p>
          </div>

          {/* Call Next Token Primary Trigger */}
          <div className="bg-agri-surface/10 p-4 rounded-xl border border-white/20 text-right shrink-0">
            <span className="text-[10px] text-agri-gold font-bold uppercase tracking-wider block">
              OPERATOR QUICK CONTROL
            </span>
            <button
              onClick={() => callNextFarmer('SNP-014', 'Counter 2')}
              className="mt-2 bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 fill-agri-green-dark" />
              <span>CALL NEXT TOKEN (SNP-014)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operator Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Bookings"
          value={totalBookings}
          subtitle="Scheduled today"
          icon={Users}
        />
        <MetricCard
          title="Waiting Gate"
          value={waitingCount}
          subtitle="In yard queue"
          icon={Clock}
        />
        <MetricCard
          title="Checked-In"
          value={checkedInCount}
          subtitle="Verified at entry"
          icon={ShieldCheck}
        />
        <MetricCard
          title="Processing"
          value={processingCount}
          subtitle="At inspection counters"
          icon={Scale}
          highlight={processingCount > 0}
        />
        <MetricCard
          title="Completed"
          value={completedCount}
          subtitle="Weighed & logged"
          icon={CheckCircle2}
          badgeText="Today"
        />
      </div>

      {/* Currently Active Procurement Station Banner */}
      <div className="paper-surface rounded-2xl p-6 border-2 border-agri-gold shadow-agri-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-agri-ivory-muted">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-agri-gold text-agri-green-dark px-3 py-1 rounded-full">
              CURRENTLY ACTIVE AT INSPECTION COUNTER 2
            </span>
            <h2 className="font-heading text-xl font-bold text-agri-green mt-2 flex items-center space-x-3">
              <span>Token #{currentProcessingItem?.token || 'SNP-014'}</span>
              <span className="text-sm font-normal text-agri-text font-sans">
                ({currentProcessingItem?.farmerName || 'Ramesh Singh'})
              </span>
            </h2>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Crop: <strong>{currentProcessingItem?.crop || 'Paddy (Grade A)'}</strong> • Expected Target: <strong>{currentProcessingItem?.expectedQty || 40} Quintals</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-agri-green hover:bg-agri-green-dark text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-agri-sm transition-all flex items-center space-x-2"
            >
              <Scale className="w-4 h-4 text-agri-gold" />
              <span>Log Moisture & Weighment</span>
            </button>
          </div>
        </div>

        {/* Live Formula Display */}
        <div className="mt-4 p-3 bg-agri-ivory/60 rounded-xl text-xs font-mono text-agri-text flex items-center justify-between">
          <span>Target Rate: <strong>₹2,200/Quintal (MSP Grade A)</strong></span>
          <span className="text-agri-green font-bold">
            Formula: {currentProcessingItem?.actualQty || 38.5} Quintals × ₹2,200 = ₹{((currentProcessingItem?.actualQty || 38.5) * 2200).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Live Queue Management Table */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-agri-text">
          Live Mandi Queue Operational Management
        </h2>
        <LiveQueueTable />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ActiveProcurementModal
          tokenItem={currentProcessingItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
};
