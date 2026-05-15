import React from 'react';
import { User, Mail, Settings, Bell, Shield, LogOut, ChevronRight, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  const settings = [
    { icon: <Bell size={18} />, label: 'Notifications', value: 'Enabled' },
    { icon: <Shield size={18} />, label: 'Privacy & Security', value: '' },
    { icon: <MapPin size={18} />, label: 'Location Services', value: 'Precision' },
    { icon: <Settings size={18} />, label: 'General Settings', value: '' },
  ];

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '4rem', background: 'var(--surface)', padding: '2rem', borderRadius: '2rem', border: '1px solid var(--border)' }}>
        <div style={{ width: '100px', height: '100px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '50%' }}>
          <User size={48} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Explorer One</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <Mail size={14} />
            explorer@wanderai.com
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <span className="card-badge" style={{ position: 'static', background: 'var(--primary)' }}>Pro Member</span>
            <span className="card-badge" style={{ position: 'static' }}>12 Trips Planned</span>
          </div>
        </div>
        <button className="btn-icon" style={{ alignSelf: 'flex-start' }}>
          <Settings size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <section>
          <h3 className="small-caps" style={{ marginBottom: '1rem' }}>Preference</h3>
          <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="checklist-item" style={{ padding: '1rem', borderRadius: 0, cursor: 'pointer' }} onClick={toggleTheme}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '8px', background: 'var(--bg)', borderRadius: '8px' }}>
                  {theme === 'light' ? '🌞' : '🌙'}
                </div>
                <span>Appearance Mode</span>
              </div>
              <span className="muted">{theme === 'light' ? 'Light' : 'Dark'}</span>
              <ChevronRight size={18} className="muted" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="small-caps" style={{ marginBottom: '1rem' }}>Account Settings</h3>
          <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
            {settings.map((item, i) => (
              <div 
                key={i} 
                className="checklist-item" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: 0, 
                  cursor: 'pointer',
                  borderBottom: i < settings.length - 1 ? '1px solid var(--border)' : 'none'
                }}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '8px', background: 'var(--bg)', borderRadius: '8px' }}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.value && <span className="muted" style={{ fontSize: '0.8rem' }}>{item.value}</span>}
                <ChevronRight size={18} className="muted" />
              </div>
            ))}
          </div>
        </section>

        <button 
          className="checklist-item" 
          style={{ 
            marginTop: '2rem', 
            border: '1px solid #ff4444', 
            color: '#ff4444', 
            justifyContent: 'center',
            background: 'rgba(255, 68, 68, 0.05)'
          }}
        >
          <LogOut size={18} />
          <span style={{ fontWeight: 600 }}>Log Out</span>
        </button>
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <p className="muted" style={{ fontSize: '0.75rem' }}>WanderAI Version 1.0.4 - Made with ❤️ for Travelers</p>
      </div>
    </div>
  );
}
