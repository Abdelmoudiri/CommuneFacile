import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Autres routes existantes */}
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
