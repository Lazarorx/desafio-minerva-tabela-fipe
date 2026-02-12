import { useAuth } from '../../context/AuthContext';
import { DashboardIcon, SearchIcon, HistoryIcon, CompareIcon, StarIcon, MoonIcon, SunIcon } from '../Icons/Icons';
import './Header.css';

function Header({ currentPage, onNavigate, theme, onToggleTheme }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon size={20} /> },
    { id: 'search', label: 'Consultar', icon: <SearchIcon size={20} /> },
    { id: 'history', label: 'Histórico', icon: <HistoryIcon size={20} /> },
    { id: 'compare', label: 'Comparar', icon: <CompareIcon size={20} /> },
    { id: 'favorites', label: 'Favoritos', icon: <StarIcon size={20} /> },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo" onClick={() => onNavigate('dashboard')}>
            <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="12" fill="white"/>
              <path d="M15 20h20M15 25h15M15 30h20M15 35h12" stroke="#667eea" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="35" cy="32" r="8" fill="#2ecc71"/>
              <path d="M32 32l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h1>FipeCheck</h1>
              <span className="version">V2</span>
            </div>
          </div>

          <nav className="nav-menu">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={onToggleTheme} title="Alternar tema">
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>

          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
            <button className="btn-logout" onClick={logout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
