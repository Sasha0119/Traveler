import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Compass, Calendar, Bookmark, User, Plane, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar" id="main-nav">
      <NavLink to="/" className="nav-brand">
        <span>V</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '1rem', lineHeight: 1 }}>WanderAI</div>
          <div className="text-mono" style={{ fontSize: '0.6rem', opacity: 0.5 }}>By AI Voyager</div>
        </div>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Explore
        </NavLink>
        <NavLink to="/planner" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Planner
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Saved
        </NavLink>
      </div>

      <div className="nav-actions">
        <div className="nav-links" style={{ marginRight: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', border: '1px solid var(--border)' }}>
            <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></div>
            <span className="text-mono" style={{ fontSize: '0.6rem' }}>AI Assistant Online</span>
          </div>
        </div>
        <NavLink to="/planner" className="btn-primary">
          Plan Trip
        </NavLink>
      </div>
    </nav>
  );
}

