export default function PerformanceSection() {
  return (
    <div className="performance-section">
        <div className="performance-card">
            <h3 className="performance-title">Métricas de Performance</h3>
            <div className="metric-item">
                <span className="metric-label">Tempo Médio de Resolução</span>
                <span className="metric-value">2h 35min</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '78%' }}></div>
                </div>
            </div>
            <div className="metric-item">
                <span className="metric-label">Taxa de Primeira Solução</span>
                <span className="metric-value">85%</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
            </div>
            <div className="metric-item">
                <span className="metric-label">Satisfação do Cliente</span>
                <span className="metric-value">4.8/5.0</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '96%' }}></div>
                </div>
            </div>
            <div className="metric-item">
                <span className="metric-label">Chamados por Dia</span>
                <span className="metric-value">18.5</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '92%' }}></div>
                </div>
            </div>
        </div>

        <div className="performance-card">
            <h3 className="performance-title">Categorias de Suporte</h3>
            <div className="metric-item">
                <span className="metric-label">Problemas de Conectividade</span>
                <span className="metric-value">45</span>
            </div>
            <div className="metric-item">
                <span className="metric-label">Configuração de Software</span>
                <span className="metric-value">32</span>
            </div>
            <div className="metric-item">
                <span className="metric-label">Hardware</span>
                <span className="metric-value">28</span>
            </div>
            <div className="metric-item">
                <span className="metric-label">Contas e Acesso</span>
                <span className="metric-value">23</span>
            </div>
            <div className="metric-item">
                <span className="metric-label">Outros</span>
                <span className="metric-value">15</span>
            </div>
        </div>
    </div>
  );
}