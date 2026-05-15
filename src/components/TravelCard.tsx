import React from 'react';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { Trip } from '../contexts/TripContext';

interface TravelCardProps {
  trip: Trip;
  onClick?: () => void;
  onToggleSave?: (e: React.MouseEvent) => void;
}

const TravelCard: React.FC<TravelCardProps> = ({ trip, onClick, onToggleSave }) => {
  return (
    <div className="travel-card" onClick={onClick}>
      <div className="card-image-wrap">
        <img src={trip.image} alt={trip.destination} className="card-image" />
        <div className="card-badge">${trip.budget}</div>
        {onToggleSave && (
          <button 
            className="btn-icon" 
            style={{ 
              position: 'absolute', 
              top: '12px', 
              left: '12px', 
              background: 'rgba(255,255,255,0.2)', 
              backdropFilter: 'blur(8px)',
              color: trip.saved ? '#ff4444' : 'white'
            }}
            onClick={onToggleSave}
          >
            <Heart size={20} fill={trip.saved ? "#ff4444" : "none"} />
          </button>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{trip.destination}</h3>
        <div className="card-meta">
          <Calendar size={14} />
          {trip.dates}
        </div>
        <p className="muted" style={{ fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          Explore the beauty of {trip.destination}. A perfectly curated journey with WanderAI.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-primary" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Learn More</span>
          <div className="muted" style={{ fontSize: '0.8rem' }}>{trip.itinerary.length} spots</div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
