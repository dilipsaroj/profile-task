import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-box">
          <div className="logo-text">capitalmind</div>
          <span className="logo-premium">premium</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">🏠</span>
          Home
        </Link>
        <Link 
          to="/portfolios" 
          className={`nav-item ${location.pathname === '/portfolios' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">💼</span>
          Portfolios
        </Link>
        <Link 
          to="/experimentals" 
          className={`nav-item ${location.pathname === '/experimentals' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">🧪</span>
          Experimentals
        </Link>
        <Link 
          to="/slack-archives" 
          className={`nav-item ${location.pathname === '/slack-archives' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">📄</span>
          Slack Archives
        </Link>
        <Link 
          to="/refer" 
          className={`nav-item ${location.pathname === '/refer' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">👤+</span>
          Refer a friend
        </Link>
        <Link 
          to="/gift" 
          className={`nav-item ${location.pathname === '/gift' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">🎁</span>
          Gift a subscription
        </Link>
        <Link 
          to="/account" 
          className={`nav-item ${location.pathname === '/account' ? 'active' : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="nav-icon">👤</span>
          Account
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="subscription-info">
          <div className="subscription-badge">RN</div>
          <span className="subscription-text">CMP1Y Valid till Apr 19, 2025</span>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
