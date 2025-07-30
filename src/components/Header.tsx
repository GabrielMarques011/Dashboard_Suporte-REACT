

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h1 className="page-title">Dashboard Pessoal</h1>
          <nav className="breadcrumb">
            <span>Dashboard</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span>Pessoal</span>
          </nav>
        </div>
      </div>

      <div className="header-right">
        <div className="date-picker" id="datePicker">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span id="dateText">01 Jan - 31 Jan 2024</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar">GM</div>
          <div className="user-info">
            <div className="user-name">Gabriel Marques</div>
            <div className="user-role">Analista de Suporte</div>
          </div>
        </div>
      </div>
    </header>
  );
}
