import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldCheck, Building2, Users, Scale, IndianRupee, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { CentreLoadBar } from './CentreLoadBar';
import { PaymentSettlement } from './PaymentSettlement';
import { AnalyticsCharts } from './AnalyticsCharts';

export const AdminDashboard = () => {
  const { queueItems } = useDemo();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Command Centre Banner */}
      <div className="bg-agri-green-dark text-white rounded-2xl p-6 sm:p-8 shadow-agri-md relative overflow-hidden border border-agri-green/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-agri-gold/20 text-agri-gold px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-agri-gold/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MINISTRY OF CONSUMER AFFAIRS (DoCA) MONITORING</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              State-wide Smart Procurement & Congestion Analytics
            </h1>
            <p className="text-xs text-agri-ivory/80 mt-1 font-sans">
              Real-time Mandi queue telemetry, congestion mitigation, and Direct Benefit Transfer (DBT) MSP disbursal tracking.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-agri-gold bg-agri-green/60 px-3 py-2 rounded-xl border border-agri-gold/30">
            <span className="w-2.5 h-2.5 rounded-full bg-agri-gold animate-pulse"></span>
            <span className="font-bold">PFMS & National Mandi Grid Connected</span>
          </div>
        </div>
      </div>

      {/* System Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Farmers Registered"
          value="14,280"
          subtitle="Aadhaar verified"
          icon={Users}
        />
        <MetricCard
          title="Active Mandis"
          value="40 Centres"
          subtitle="Sonipat, Karnal, etc."
          icon={Building2}
        />
        <MetricCard
          title="Today's Bookings"
          value="1,840"
          subtitle="Slot allocations"
          icon={Scale}
        />
        <MetricCard
          title="Procured Volume"
          value="82,450 Qtl"
          subtitle="Paddy & Wheat"
          icon={Scale}
          badgeText="Active"
        />
        <MetricCard
          title="DBT Disbursed"
          value="₹18.14 Cr"
          subtitle="Direct to bank"
          icon={IndianRupee}
          highlight={true}
        />
      </div>

      {/* Congestion Bar Visualizer */}
      <CentreLoadBar />

      {/* Recharts Analytics Charts */}
      <AnalyticsCharts />

      {/* Payment Settlement Action Board */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-agri-text">
          Pending MSP Disbursal Queue & Audit Trail
        </h2>
        <PaymentSettlement />
      </div>

    </div>
  );
};
