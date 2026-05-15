import React from 'react';
import { DollarSign, PieChart, TrendingDown } from 'lucide-react';

interface BudgetWidgetProps {
  budget: number;
  spent?: number;
}

export default function BudgetWidget({ budget, spent = 0 }: BudgetWidgetProps) {
  const percentage = Math.min((spent / budget) * 100, 100);

  return (
    <div className="widget">
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <DollarSign size={20} className="text-primary" />
        Budget Estimator
      </h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">${budget}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${budget - spent}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
          <span className="muted">Spending Progress</span>
          <span className="muted">{percentage.toFixed(0)}%</span>
        </div>
        <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${percentage}%`, 
            background: 'var(--primary)',
            transition: 'width 1s ease-out'
          }} />
        </div>
      </div>

      <div className="muted" style={{ fontSize: '0.75rem', marginTop: '1rem', fontStyle: 'italic' }}>
        Note: Estimates are based on local average prices for mid-range experiences.
      </div>
    </div>
  );
}
