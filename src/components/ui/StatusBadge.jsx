import React from 'react';

export const StatusBadge = ({ status, type = 'centre' }) => {
  let label = status;
  let classes = 'bg-gray-100 text-gray-800 border-gray-200';
  let dotColor = 'bg-gray-400';

  if (type === 'centre') {
    if (status === 'NORMAL') {
      label = 'Normal Load';
      classes = 'bg-agri-green-soft text-agri-green-dark border-agri-green-border';
      dotColor = 'bg-emerald-500';
    } else if (status === 'MODERATE') {
      label = 'Moderate Queue';
      classes = 'bg-amber-50 text-amber-800 border-amber-200';
      dotColor = 'bg-amber-500';
    } else if (status === 'CONGESTED') {
      label = 'High Congestion';
      classes = 'bg-rose-50 text-rose-800 border-rose-200';
      dotColor = 'bg-rose-500';
    }
  } else if (type === 'queue') {
    if (status === 'WAITING') {
      label = 'In Queue';
      classes = 'bg-amber-50 text-amber-900 border-amber-200 font-semibold';
      dotColor = 'bg-amber-500';
    } else if (status === 'CHECKED_IN') {
      label = 'Checked-In Gate';
      classes = 'bg-blue-50 text-blue-900 border-blue-200 font-semibold';
      dotColor = 'bg-blue-500';
    } else if (status === 'PROCESSING') {
      label = 'At Inspection Counter';
      classes = 'bg-agri-gold-light text-agri-green-dark border-agri-gold font-bold';
      dotColor = 'bg-agri-gold-dark';
    } else if (status === 'COMPLETED') {
      label = 'Procurement Completed';
      classes = 'bg-agri-green-soft text-agri-status-success border-agri-green-border font-bold';
      dotColor = 'bg-emerald-600';
    }
  } else if (type === 'payment') {
    if (status === 'PENDING') {
      label = 'Awaiting Weighment';
      classes = 'bg-gray-100 text-gray-700 border-gray-300';
      dotColor = 'bg-gray-400';
    } else if (status === 'PENDING_DISBURSAL') {
      label = 'Approved / Payout Pending';
      classes = 'bg-amber-50 text-amber-800 border-amber-300 font-medium';
      dotColor = 'bg-amber-500';
    } else if (status === 'DISBURSED') {
      label = 'DBT Payment Disbursed';
      classes = 'bg-agri-green-soft text-agri-status-success border-agri-green-border font-bold';
      dotColor = 'bg-emerald-600';
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] border font-sans ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      <span>{label}</span>
    </span>
  );
};
