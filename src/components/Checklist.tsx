import React from 'react';
import { Check, Square, ClipboardList } from 'lucide-react';

interface ChecklistProps {
  items: { id: string; text: string; completed: boolean }[];
  onToggle: (id: string) => void;
}

export default function Checklist({ items, onToggle }: ChecklistProps) {
  return (
    <div className="widget">
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ClipboardList size={20} className="text-primary" />
        Travel Checklist
      </h3>
      
      <div className="checklist">
        {items.map((item) => (
          <button 
            key={item.id} 
            className={`checklist-item ${item.completed ? 'checked' : ''}`}
            onClick={() => onToggle(item.id)}
          >
            <div className="checkbox">
              {item.completed && <Check size={14} color="white" />}
            </div>
            <span>{item.text}</span>
          </button>
        ))}
      </div>

      <div className="muted" style={{ fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
        Completed: {items.filter(i => i.completed).length} / {items.length}
      </div>
    </div>
  );
}
