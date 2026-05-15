import React from 'react';
import { Clock, MapPin, Camera, Utensils, Bus, Hotel } from 'lucide-react';
import { ItineraryItem } from '../contexts/TripContext';

const TypeIcon = ({ type }: { type: ItineraryItem['type'] }) => {
  switch (type) {
    case 'sightseeing': return <Camera size={14} />;
    case 'food': return <Utensils size={14} />;
    case 'transport': return <Bus size={14} />;
    case 'hotel': return <Hotel size={14} />;
    default: return <Clock size={14} />;
  }
};

export default function ItineraryTimeline({ items }: { items: ItineraryItem[] }) {
  if (!items || items.length === 0) {
    return <div className="muted" style={{ padding: '2rem', textAlign: 'center' }}>No activities planned yet.</div>;
  }

  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-time text-mono">{item.time}</div>
            <h4 className="font-serif-italic" style={{ fontSize: '1.25rem' }}>
              {item.activity}
            </h4>
            <div className="muted" style={{ marginTop: '0.25rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} />
              {item.location}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
