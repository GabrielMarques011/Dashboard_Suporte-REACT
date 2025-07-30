
// Componente para retornar o ícone correto baseado no nome
function StatIcon({ name }: { name: string }) {
  switch (name) {
    case 'check':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      );
    case 'star':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      );
    case 'chat':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function StatsGrid() {
  const stats = [
    {
      title: 'Casos Solucionados',
      value: 128,
      trend: '+12% em relação ao mês anterior',
      icon: 'check',
      type: 'success',
    },
    {
      title: 'Retenções',
      value: 18,
      trend: '+5% em relação ao mês anterior',
      icon: 'star',
      type: 'info',
    },
    {
      title: 'Upgrades',
      value: 10,
      trend: '-3% em relação ao mês anterior',
      icon: 'arrow-up',
      type: 'warning',
    },
    {
      title: 'BLIP Atendidos',
      value: 455,
      trend: '+8% em relação ao mês anterior',
      icon: 'chat',
      type: 'info',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.type}`}>
          <div className="stat-header">
            <div className="stat-title">{stat.title}</div>
            <div className={`stat-icon ${stat.type}`}>
              <StatIcon name={stat.icon} />
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-trend">
            <span className={`trend-${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}