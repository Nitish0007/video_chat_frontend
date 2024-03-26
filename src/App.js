import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.js';

import styles from './styles/main.module.scss'
import MeetingPage from 'pages/MeetingPage/MeetingPage.js';
import SelfCamera from 'Components/SelfCamera/SelfCamera.js';

function App() {

  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingPage />} />
          <Route path="/camera" element={<SelfCamera />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
