import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ValentinePage from './pages/ValentinePage';
import TrackerPage from './pages/TrackerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/u/:id" element={<ValentinePage />} />
        <Route path="/track/:id" element={<TrackerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
