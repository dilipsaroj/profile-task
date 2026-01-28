import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Experimentals from './pages/Experimentals';
import SlackArchives from './pages/SlackArchives';
import ReferFriend from './pages/ReferFriend';
import GiftSubscription from './pages/GiftSubscription';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolios" element={<Portfolio />} />
          <Route path="/experimentals" element={<Experimentals />} />
          <Route path="/slack-archives" element={<SlackArchives />} />
          <Route path="/refer" element={<ReferFriend />} />
          <Route path="/gift" element={<GiftSubscription />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
