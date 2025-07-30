// Tipo para dados de clientes (usado em Retenções e Upgrades)
type ClientItem = {
  name: string;
  value?: number; // Valor do contrato/upgrade
  date?: string;  // Data da retenção/upgrade
  status?: 'concluído' | 'em_andamento' | 'pendente';
};

// Tipo que corresponde ao seu App
type SolvedItem = {
  name: string;
  count: number;
};

type Stat = {
  title: string;
  value: number;
  trend: string;
  icon: 'check' | 'star' | 'arrow-up' | 'chat';
  type: 'success' | 'info' | 'warning';
  solvedItems?: SolvedItem[]; // Lista opcional para casos solucionados
  clientItems?: ClientItem[]; // Lista opcional para clientes (retenções/upgrades)
};

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

export default function StatsGrid({ onStatClick }: { onStatClick: (stat: Stat) => void }) {
  const stats: Stat[] = [
    {
      title: 'Casos Solucionados',
      value: 128,
      trend: '+12% em relação ao mês anterior',
      icon: 'check',
      type: 'success',
      solvedItems: [
        { name: 'Lentidão no sistema', count: 45 },
        { name: 'Sem conexão com internet', count: 32 },
        { name: 'Erro de login', count: 28 },
        { name: 'Falha no pagamento', count: 15 },
        { name: 'Bug na interface', count: 12 },
        { name: 'Problema de sincronização', count: 10 },
      ]
    },
    {
      title: 'Retenções',
      value: 18,
      trend: '+5% em relação ao mês anterior',
      icon: 'star',
      type: 'info',
      clientItems: [
        { name: 'João Silva', value: 2500, date: '15/01/2025', status: 'concluído' },
        { name: 'Maria Santos', value: 1800, date: '18/01/2025', status: 'concluído' },
        { name: 'Pedro Costa', value: 3200, date: '20/01/2025', status: 'em_andamento' },
        { name: 'Ana Oliveira', value: 1500, date: '22/01/2025', status: 'pendente' },
        { name: 'Carlos Mendes', value: 2800, date: '25/01/2025', status: 'concluído' },
        { name: 'Luciana Rocha', value: 2100, date: '28/01/2025', status: 'em_andamento' },
      ]
    },
    {
      title: 'Upgrades',
      value: 10,
      trend: '-3% em relação ao mês anterior',
      icon: 'arrow-up',
      type: 'warning',
      clientItems: [
        { name: 'TechCorp Ltda', value: 5000, date: '10/01/2025', status: 'concluído' },
        { name: 'Inovação Digital', value: 7500, date: '14/01/2025', status: 'concluído' },
        { name: 'StartUp Solutions', value: 3500, date: '19/01/2025', status: 'em_andamento' },
        { name: 'Global Systems', value: 12000, date: '23/01/2025', status: 'pendente' },
        { name: 'Future Tech', value: 4200, date: '26/01/2025', status: 'concluído' },
      ]
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
        <div
          key={index}
          className={`stat-card ${stat.type}`}
          onClick={() => {
            console.log('Clicou no stat:', stat);
            onStatClick(stat);
          }}
        >
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