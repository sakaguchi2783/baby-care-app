// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DiaperRecord from './pages/DiaperRecord';
import HealthData from './pages/HealthData';
import PoopAnalysis from './pages/PoopAnalysis';
import FeedingSchedule from './pages/FeedingSchedule';
import AllergyManagement from './pages/AllergyManagement';
import MomSupport from './pages/MomSupport';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/diaper-record">おむつ交換記録</Link></li>
            <li><Link to="/health-data">赤ちゃんの健康データ管理</Link></li>
            <li><Link to="/poop-analysis">うんち分析</Link></li>
            <li><Link to="/feeding-schedule">食事スケジュール</Link></li>
            <li><Link to="/allergy-management">アレルギー管理</Link></li>
            <li><Link to="/mom-support">お母さん応援コール</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/diaper-record" element={<DiaperRecord />} />
          <Route path="/health-data" element={<HealthData />} />
          <Route path="/poop-analysis" element={<PoopAnalysis />} />
          <Route path="/feeding-schedule" element={<FeedingSchedule />} />
          <Route path="/allergy-management" element={<AllergyManagement />} />
          <Route path="/mom-support" element={<MomSupport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
