import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, DollarSign, Save, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { useTrips, Trip } from '../contexts/TripContext';
import { generateItinerary } from '../services/gemini';
import ItineraryTimeline from '../components/ItineraryTimeline';
import BudgetWidget from '../components/BudgetWidget';
import Checklist from '../components/Checklist';
import { motion, AnimatePresence } from 'motion/react';

export default function Planner() {
  const [searchParams] = useSearchParams();
  const { activeTrip, setActiveTrip, addTrip, updateTrip, deleteTrip } = useTrips();
  
  const [destination, setDestination] = useState(searchParams.get('dest') || '');
  const [budget, setBudget] = useState(1500);
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const dest = searchParams.get('dest');
    if (dest) setDestination(dest);
  }, [searchParams]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateItinerary(destination, budget, days);
      const newTrip: Trip = {
        id: Date.now().toString(),
        destination,
        dates: `${days} Days`,
        budget,
        image: `https://source.unsplash.com/featured/?${encodeURIComponent(destination)}`,
        itinerary: result.itinerary,
        checklist: result.checklist,
        saved: false
      };
      // For some reason source.unsplash.com is deprecated, switching to a better placeholder
      newTrip.image = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800`;
      
      setActiveTrip(newTrip);
      setSaved(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (activeTrip) {
      addTrip({ ...activeTrip, saved: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleToggleChecklist = (cid: string) => {
    if (activeTrip) {
      const updated = activeTrip.checklist.map(item => 
        item.id === cid ? { ...item, completed: !item.completed } : item
      );
      setActiveTrip({ ...activeTrip, checklist: updated });
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ marginBottom: '2rem' }}
        >
          <RefreshCw size={48} className="text-primary" />
        </motion.div>
        <h2>Designing your dream trip to {destination}...</h2>
        <p className="muted">WanderAI is analyzing hundreds of spots for you.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      {!activeTrip ? (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '3rem', background: 'var(--surface)', borderRadius: '2rem', border: '1px solid var(--border)' }}>
            <Sparkles size={48} className="text-primary" style={{ marginBottom: '1.5rem' }} />
            <h1 style={{ marginBottom: '1rem' }}>Let's Build Your Itinerary</h1>
            <p className="muted" style={{ marginBottom: '2rem' }}>
              Tell us where you're going and what your budget is, we'll do the rest.
            </p>
            
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div>
                <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Destination</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} className="muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="search-input" 
                    style={{ width: '100%', paddingLeft: '40px', background: 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '12px 12px 12px 40px' }}
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Duration (Days)</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} className="muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="number" 
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="search-input" 
                      style={{ width: '100%', paddingLeft: '40px', background: 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '12px 12px 12px 40px' }}
                      min={1}
                      max={30}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="small-caps" style={{ display: 'block', marginBottom: '0.5rem' }}>Budget ($)</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={18} className="muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="number" 
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="search-input" 
                      style={{ width: '100%', paddingLeft: '40px', background: 'var(--bg)', borderRadius: 'var(--radius-md)', padding: '12px 12px 12px 40px' }}
                      min={100}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '12px' }}>
                Generate Itinerary
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <button onClick={() => setActiveTrip(null)} className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                 ← Back to Plan
              </button>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Trip to {activeTrip.destination}
                <CheckCircle2 color="var(--primary)" size={32} />
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {saved ? 'Saved!' : 'Save Trip'}
              </button>
              <button onClick={() => setActiveTrip(null)} className="btn-icon" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                <Trash2 size={20} color="#ff4444" />
              </button>
            </div>
          </div>

          <div className="planner-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <BudgetWidget budget={activeTrip.budget} />
              <Checklist items={activeTrip.checklist} onToggle={handleToggleChecklist} />
              
              <div className="widget" style={{ background: 'var(--primary)', color: 'white' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>AI Recommendation</h4>
                <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  Based on your budget, we suggest visiting the local night market for dinner. 
                  It's authentic and significantly cheaper than tourist-trap restaurants!
                </p>
              </div>
            </div>

            <div className="itinerary-view">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Your Daily Itinerary</h3>
                <div className="card-badge" style={{ position: 'static' }}>{activeTrip.dates}</div>
              </div>
              <ItineraryTimeline items={activeTrip.itinerary} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
