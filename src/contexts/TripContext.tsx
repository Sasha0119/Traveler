import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  type: 'sightseeing' | 'food' | 'transport' | 'hotel';
}

export interface Trip {
  id: string;
  destination: string;
  dates: string;
  budget: number;
  image: string;
  itinerary: ItineraryItem[];
  checklist: { id: string; text: string; completed: boolean }[];
  saved: boolean;
}

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  setActiveTrip: (trip: Trip | null) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('trips');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);

  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip: Trip) => {
    setTrips((prev) => [trip, ...prev]);
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    if (activeTrip?.id === id) {
      setActiveTrip((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    if (activeTrip?.id === id) setActiveTrip(null);
  };

  return (
    <TripContext.Provider value={{ trips, activeTrip, addTrip, updateTrip, deleteTrip, setActiveTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
