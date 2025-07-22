import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import BillingPage from './page/BillingPage';
// import type { Router, Routes, Route } from 'react-router-dom';

function App() {
  // Placeholder components for incomplete pages
  const OfficeSpacePage = () => <div>Office Space Page (Coming Soon)</div>;
  const ReserveResourcesPage = () => (
    <div>Reserve Resources Page (Coming Soon)</div>
  );
  const ReturnResourcesPage = () => (
    <div>Return Resources Page (Coming Soon)</div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BillingPage />} />
        <Route path="/office-space" element={<OfficeSpacePage />} />
        <Route path="/reserve-resources" element={<ReserveResourcesPage />} />
        <Route path="/return-resources" element={<ReturnResourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
