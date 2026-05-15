import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, Shield, Clock } from 'lucide-react';
import TravelCard from '../components/TravelCard';
import { Trip } from '../contexts/TripContext';

const FEATURED_TRIPS: Trip[] = [
  {
    id: 'f1',
    destination: 'Santorini, Greece',
    dates: '7 Days',
    budget: 1200,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    itinerary: [],
    checklist: [],
    saved: false
  },
  {
    id: 'f2',
    destination: 'Kyoto, Japan',
    dates: '10 Days',
    budget: 2500,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    itinerary: [],
    checklist: [],
    saved: false
  },
  {
    id: 'f3',
    destination: 'Swiss Alps',
    dates: '5 Days',
    budget: 1800,
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800',
    itinerary: [],
    checklist: [],
    saved: false
  }
];

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/explore?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="page-container">
      <section className="hero">
        <div className="text-mono" style={{ color: 'var(--primary)', marginBottom: '8px' }}>
          <span>AI-Powered Travel Planning</span>
        </div>
        <h1 className="hero-title">Your Next Adventure, <span className="text-primary italic">Curated by AI.</span></h1>
        <p className="hero-subtitle">
          Discover hidden gems and plan perfect itineraries.
        </p>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <Search className="muted" size={20} />
          <input 
            type="text" 
            placeholder="Where to? (e.g. Kyoto, Bali, Rome)" 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Search</button>
        </form>
      </section>

      <section style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>Popular Destinations</h2>
            <p className="muted">Hand-picked locations loved by researchers and travelers.</p>
          </div>
          <button onClick={() => navigate('/explore')} className="text-primary" style={{ fontWeight: 600 }}>View all</button>
        </div>

        <div className="grid-auto">
          {FEATURED_TRIPS.map(trip => (
            <TravelCard 
              key={trip.id} 
              trip={trip} 
              onClick={() => navigate(`/planner?dest=${trip.destination}`)} 
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: '6rem', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Why WanderAI?</h2>
          <p className="muted">The smartest way to plan your travels.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Sparkles size={24} />
            </div>
            <h3>Smart Itineraries</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>AI-driven planning based on your interests and budget constraints.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Shield size={24} />
            </div>
            <h3>Budget Control</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Real-time estimation of costs to help you stay within your financial goals.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Clock size={24} />
            </div>
            <h3>Persistent State</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Your trips are saved automatically to your device for offline reference.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
