import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import TravelCard from '../components/TravelCard';
import { Trip } from '../contexts/TripContext';

const ALL_DESTINATIONS: Trip[] = [
  { id: '1', destination: 'Paris, France', dates: '5 Days', budget: 1500, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '2', destination: 'Tokyo, Japan', dates: '10 Days', budget: 2800, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '3', destination: 'Bali, Indonesia', dates: '7 Days', budget: 800, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '4', destination: 'New York, USA', dates: '4 Days', budget: 2000, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '5', destination: 'Rome, Italy', dates: '6 Days', budget: 1400, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '6', destination: 'London, UK', dates: '5 Days', budget: 1700, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '7', destination: 'Barcelona, Spain', dates: '5 Days', budget: 1100, image: 'https://images.unsplash.com/photo-1583422409516-2895a77ef96a?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
  { id: '8', destination: 'Dubai, UAE', dates: '4 Days', budget: 2500, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', itinerary: [], checklist: [], saved: false },
];

export default function Explore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter(d => 
      d.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Explore Destinations</h1>
        <p className="muted">Find your next perfect getaway from our curated list.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div className="search-bar" style={{ margin: 0, flex: 1, maxWidth: 'none' }}>
          <Search className="muted" size={20} />
          <input 
            type="text" 
            placeholder="Search destinations..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-icon" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)' }}>
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Oceania'].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={activeFilter === filter ? 'btn-primary' : ''}
            style={{ 
              padding: '8px 20px', 
              borderRadius: '99px',
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              background: activeFilter === filter ? '' : 'var(--surface)',
              border: activeFilter === filter ? '' : '1px solid var(--border)',
              color: activeFilter === filter ? 'white' : 'var(--muted)'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid-auto">
        {filteredDestinations.map(trip => (
          <TravelCard 
            key={trip.id} 
            trip={trip} 
            onClick={() => navigate(`/planner?dest=${trip.destination}`)}
          />
        ))}
        {filteredDestinations.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
            <div className="muted" style={{ fontSize: '1.25rem' }}>No destinations found for "{searchTerm}"</div>
            <button 
              className="text-primary" 
              style={{ marginTop: '1rem', fontWeight: 600 }}
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
