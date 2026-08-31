import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { UserCheck, ShieldCheck, Cpu, RotateCcw, Play, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SubtleDemoBar = () => {
  const {
    activeRole,
    setActiveRole,
    callNextFarmer,
    completeProcurement,
    disbursePayment,
    resetDemoState,
    activeBooking,
    demoCondition,
    setDemoCondition
  } = useDemo();

  return (
    <div className="bg-agri-green-dark text-agri-ivory-surface text-xs py-1.5 px-4 border-b border-agri-green/40 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Role Selector Tabs */}
        <div className="flex items-center space-x-2">
          <span className="text-agri-gold font-medium flex items-center space-x-1 pr-2 border-r border-agri-green/50">
            <Cpu className="w-3.5 h-3.5" />
            <span>Role Context:</span>
          </span>

          <button
            onClick={() => setActiveRole('farmer')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1.5 ${
              activeRole === 'farmer'
                ? 'bg-agri-gold text-agri-green-dark font-semibold shadow-sm'
                : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Farmer (Ramesh Singh)</span>
          </button>

          <button
            onClick={() => setActiveRole('operator')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1.5 ${
              activeRole === 'operator'
                ? 'bg-agri-gold text-agri-green-dark font-semibold shadow-sm'
                : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Procurement Operator</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1.5 ${
              activeRole === 'admin'
                ? 'bg-agri-gold text-agri-green-dark font-semibold shadow-sm'
                : 'text-agri-ivory/80 hover:text-white hover:bg-agri-green/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DoCA Admin</span>
          </button>
        </div>

        {/* Demo Congestion Simulation & Workflow Actions */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          
          {/* Congestion Simulation Controls */}
          <div className="flex items-center space-x-1 border-r border-agri-green/50 pr-2">
            <span className="text-[10px] text-agri-gold uppercase tracking-wider font-mono">
              CONGESTION DEMO:
            </span>

            {demoCondition === 'NORMAL' ? (
              <button
                onClick={() => setDemoCondition('CONGESTED_SONIPAT')}
                className="bg-rose-900/80 hover:bg-rose-800 text-rose-200 px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center space-x-1 border border-rose-600/50"
                title="Simulate sudden heavy truck backlog at Sonipat Mandi (wait 24m -> 67m)"
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span>Simulate Sonipat Congestion</span>
              </button>
            ) : (
              <button
                onClick={() => setDemoCondition('NORMAL')}
                className="bg-agri-green-light hover:bg-agri-green text-white px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center space-x-1 border border-agri-green-light/50"
                title="Restore normal Mandi queue loads"
              >
                <CheckCircle2 className="w-3 h-3 text-agri-gold" />
                <span>Restore Normal Load</span>
              </button>
            )}
          </div>

          {/* Workflow Simulation Triggers */}
          {activeBooking?.status === 'WAITING' && (
            <button
              onClick={() => callNextFarmer('SNP-014')}
              className="bg-agri-green hover:bg-agri-green-light text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1 transition-all border border-agri-green-light/40"
              title="Simulate operator calling token SNP-014 to Counter 2"
            >
              <Play className="w-3 h-3 text-agri-gold fill-agri-gold" />
              <span>Simulate: Call SNP-014</span>
            </button>
          )}

          {activeBooking?.status === 'PROCESSING' && (
            <button
              onClick={() => completeProcurement({ tokenStr: 'SNP-014', actualQty: 38.5, moisturePercent: 12.4, qualityGrade: 'Grade A' })}
              className="bg-agri-gold hover:bg-agri-gold-dark text-agri-green-dark px-2.5 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition-all"
              title="Simulate operator weighing & completing procurement"
            >
              <Play className="w-3 h-3 fill-agri-green-dark" />
              <span>Simulate: Complete (38.5 Qtl)</span>
            </button>
          )}

          {activeBooking?.paymentStatus === 'PENDING_DISBURSAL' && (
            <button
              onClick={() => disbursePayment('SNP-014')}
              className="bg-agri-green-light hover:bg-agri-green text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1 transition-all"
              title="Simulate Admin disbursing MSP payment"
            >
              <Play className="w-3 h-3 text-white fill-white" />
              <span>Simulate: Disburse ₹84,700</span>
            </button>
          )}

          <button
            onClick={resetDemoState}
            className="text-agri-ivory/60 hover:text-agri-ivory px-2 py-1 rounded flex items-center space-x-1 text-[11px] transition-colors"
            title="Reset to default demo data baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>

        </div>

      </div>
    </div>
  );
};
