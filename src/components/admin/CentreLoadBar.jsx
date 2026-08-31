import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatusBadge } from '../ui/StatusBadge';
import { Users, Clock, AlertTriangle } from 'lucide-react';

export const CentreLoadBar = () => {
  const { centres } = useDemo();

  return (
    <div className="paper-surface rounded-2xl p-6 border border-agri-ivory-muted shadow-agri-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-agri-ivory-muted">
        <div>
          <h3 className="font-heading text-lg font-bold text-agri-text">
            Mandis Load & Queue Congestion Telemetry
          </h3>
          <p className="text-xs text-agri-text-muted">
            Real-time capacity utilization across state procurement yards
          </p>
        </div>
        <span className="text-[10px] uppercase font-bold text-agri-green bg-agri-green-soft px-2.5 py-1 rounded border border-agri-green-border">
          Live Telemetry
        </span>
      </div>

      <div className="space-y-4">
        {centres.map((centre) => {
          let barBg = 'bg-agri-green';
          if (centre.capacityPercent > 85) barBg = 'bg-agri-status-danger';
          else if (centre.capacityPercent > 70) barBg = 'bg-agri-status-warning';

          return (
            <div key={centre.id} className="bg-agri-ivory/50 p-4 rounded-xl border border-agri-ivory-muted space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="font-bold text-agri-text flex items-center space-x-2">
                  <span>{centre.name}</span>
                  <span className="text-agri-text-muted font-normal text-[11px]">({centre.district})</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] text-agri-text-muted">
                    Queue: <strong>{centre.queueCount} Farmers</strong> (~{centre.estWaitMinutes}m wait)
                  </span>
                  <StatusBadge status={centre.status} type="centre" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-agri-text-muted font-medium">
                  <span>Yard Capacity Load</span>
                  <span className="font-bold">{centre.capacityPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-agri-ivory-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barBg}`}
                    style={{ width: `${centre.capacityPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
