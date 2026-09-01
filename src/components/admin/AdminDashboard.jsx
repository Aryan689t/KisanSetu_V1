import { useState } from 'react';
import { ShieldCheck, Building2, Users, Scale, IndianRupee, Activity } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { CentreLoadBar } from './CentreLoadBar';
import { RequiresAttention } from './RequiresAttention';
import { PaymentSettlement } from './PaymentSettlement';
import { AnalyticsCharts } from './AnalyticsCharts';
import { CentreDetailModal } from './CentreDetailModal';

export const AdminDashboard = () => {
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* MOBILE SECTION NAVIGATION TABS (Issue 10) */}
      <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-2 border-b border-agri-ivory-muted text-xs font-sans font-bold">
        <button
          onClick={() => scrollToSection('admin-overview')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
            activeSection === 'admin-overview'
              ? 'bg-agri-green text-white'
              : 'text-agri-text-muted hover:text-agri-text'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => scrollToSection('admin-centres')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
            activeSection === 'admin-centres'
              ? 'bg-agri-green text-white'
              : 'text-agri-text-muted hover:text-agri-text'
          }`}
        >
          Centres
        </button>

        <button
          onClick={() => scrollToSection('admin-performance')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
            activeSection === 'admin-performance'
              ? 'bg-agri-green text-white'
              : 'text-agri-text-muted hover:text-agri-text'
          }`}
        >
          Performance
        </button>

        <button
          onClick={() => scrollToSection('admin-dbt')}
          className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
            activeSection === 'admin-dbt'
              ? 'bg-agri-green text-white'
              : 'text-agri-text-muted hover:text-agri-text'
          }`}
        >
          DBT Audit
        </button>
      </div>

      {/* 1. Command Centre Header & Banner */}
      <div className="bg-agri-green-dark text-white rounded-2xl p-6 sm:p-8 shadow-agri-md relative overflow-hidden border border-agri-green/40 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-agri-gold/20 text-agri-gold px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-agri-gold/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEPARTMENT OF CONSUMER AFFAIRS (DoCA) • SYSTEM OVERSIGHT</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
              State Procurement Telemetry & Congestion Command Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-agri-ivory/80 mt-1 font-sans">
              Real-time Mandi queue monitoring, congestion mitigation telemetry, and Direct Benefit Transfer (DBT) MSP settlement tracking.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-agri-gold bg-agri-green/60 px-3.5 py-2.5 rounded-xl border border-agri-gold/30 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-agri-gold animate-pulse"></span>
            <span className="font-bold">PFMS & National Mandi Grid Synchronized</span>
          </div>
        </div>
      </div>

      {/* 2. State-Level Operational Summary Strip (Issue 8) */}
      <div id="admin-overview" className="bg-white rounded-xl p-4 border border-agri-ivory-muted shadow-sm font-sans">
        <div className="text-xs font-bold text-agri-text-muted mb-2 font-sans flex items-center justify-between border-b border-agri-ivory-muted pb-1.5">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-agri-green" />
            <span>State Procurement Summary</span>
          </span>
          <span className="text-[11px] font-normal text-agri-green">40 Mandi Hubs Synchronized</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-agri-ivory-muted pt-1">
          <div className="p-2">
            <span className="text-[11px] text-agri-text-muted block font-sans">Registered Farmers</span>
            <span className="font-heading text-xl font-extrabold text-agri-text font-sans block mt-0.5">
              14,280
            </span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-agri-text-muted block font-sans">Active Mandis</span>
            <span className="font-heading text-xl font-extrabold text-agri-text font-sans block mt-0.5">
              40 Hubs
            </span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-agri-text-muted block font-sans">Today's Bookings</span>
            <span className="font-heading text-xl font-extrabold text-agri-text font-sans block mt-0.5">
              1,840
            </span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-agri-text-muted block font-sans">Procured Volume</span>
            <span className="font-heading text-xl font-extrabold text-agri-green-dark font-sans block mt-0.5">
              82,450 Qtl
            </span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-agri-text-muted block font-sans">DBT Disbursed</span>
            <span className="font-heading text-xl font-extrabold text-emerald-700 font-sans block mt-0.5">
              ₹18.14 Cr
            </span>
          </div>
        </div>
      </div>

      {/* 3. Mandi Congestion & Telemetry (HERO SECTION) */}
      <section id="admin-centres" className="space-y-3 scroll-mt-28">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-agri-text flex items-center gap-2">
            <Activity className="w-5 h-5 text-agri-green" />
            Centre Congestion & Real-Time Queue Telemetry
          </h2>
          <span className="text-xs text-agri-text-muted hidden sm:inline">
            Primary Operational Focus • Problem Statement 26032
          </span>
        </div>
        <CentreLoadBar onSelectCentre={setSelectedCentre} />
      </section>

      {/* 4. Requires Attention Alert Section */}
      <section className="space-y-3">
        <RequiresAttention onSelectCentre={setSelectedCentre} />
      </section>

      {/* 5. Procurement Performance & Volume Trends */}
      <section id="admin-performance" className="space-y-3 scroll-mt-28">
        <h2 className="font-heading text-lg font-bold text-agri-text">
          Procurement Performance & Seasonal Volume Trends
        </h2>
        <AnalyticsCharts />
      </section>

      {/* 6. Payment / Settlement Monitoring & Audit Trail */}
      <section id="admin-dbt" className="space-y-3 scroll-mt-28">
        <PaymentSettlement />
      </section>

      {/* Read-Only Supervisory Telemetry Modal */}
      {selectedCentre && (
        <CentreDetailModal
          centre={selectedCentre}
          onClose={() => setSelectedCentre(null)}
        />
      )}

    </div>
  );
};
