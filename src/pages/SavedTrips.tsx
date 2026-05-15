import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Map, Trash2 } from 'lucide-react';
import { useTrips } from '../contexts/TripContext';
import TravelCard from '../components/TravelCard';

export default function SavedTrips() {
  const { trips, deleteTrip, setActiveTrip } = useTrips();
  const navigate = useNavigate();

  const handleTripClick = (trip: any) => {
    setActiveTrip(trip);
    navigate('/planner');
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Saved Adventures</h1>
        <p className="muted">Relive your planned journeys or pick up where you left off.</p>
      </div>

      {trips.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '6rem 2rem', 
          background: 'var(--surface)', 
          borderRadius: '2rem',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={40} />
          </div>
          <div>
            <h3>No trips saved yet</h3>
            <p className="muted" style={{ maxWidth: '400px', margin: '0.5rem auto' }}>
              Your collection is empty. Start exploring and planning to save your first adventure.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/explore')}>Browse Destinations</button>
        </div>
      ) : (
        <div className="grid-auto">
          {trips.map(trip => (
            <div key={trip.id} style={{ position: 'relative' }}>
              <TravelCard 
                trip={trip} 
                onClick={() => handleTripClick(trip)}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTrip(trip.id);
                }}
                className="btn-icon"
                style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '12px',
                  background: 'rgba(255, 68, 68, 0.1)',
                  color: '#ff4444'
                }}
                title="Remove Trip"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {trips.length > 0 && (
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--surface)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px dotted var(--border)' }}>
          <Map className="text-primary" size={24} />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1rem' }}>Map View (Coming Soon)</h4>
            <p className="muted" style={{ fontSize: '0.8rem' }}>We are working on a visual map to see all your saved adventures in one place.</p>
          </div>
          <button className="nav-pill" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Waitlist</button>
        </div>
      )}
    </div>
  );
}
