import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Restaurar estado salvo
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved === 'true') setIsCollapsed(true);
  }, []);

  useEffect(() => {
    // Salvar estado no localStorage
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <div className="logo">SUP</div>
        <div className="logo-text">Dashboard Sup</div>

        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-title">Dashboard</div>
          <a href="#" className="nav-item active">
            <div className="nav-icon"></div>
            <span className="nav-text">Dashboard Pessoal</span>
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon"></div>
            <span className="nav-text">Usuários</span>
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon"></div>
            <span className="nav-text">Relatórios</span>
          </a>
        </div>

        <div className="nav-section">
          <div className="nav-title">Configurações</div>
          <a href="#" className="nav-item">
            <div className="nav-icon"></div>
            <span className="nav-text">Configurações</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
