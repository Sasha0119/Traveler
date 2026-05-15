/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TripProvider } from './contexts/TripContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Planner from './pages/Planner';
import SavedTrips from './pages/SavedTrips';
import Profile from './pages/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/saved" element={<SavedTrips />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </TripProvider>
    </ThemeProvider>
  );
}

