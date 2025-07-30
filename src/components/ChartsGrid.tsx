import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function ChartsGrid() {
  const barRef = useRef<HTMLCanvasElement>(null);
  const pieRef = useRef<HTMLCanvasElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let barChart: Chart | undefined;
    let pieChart: Chart | undefined;

    // Configurações básicas do Chart.js
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#475569';

    // Dados do gráfico de barras
    const barData = {
      all: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Total de Chamados',
          data: [45, 52, 38, 61, 48, 73, 69, 84, 57, 68, 75, 82],
          backgroundColor: '#2563eb',
          borderRadius: 6
        }]
      },
      opened: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Chamados Abertos',
          data: [12, 15, 8, 18, 14, 22, 19, 28, 16, 21, 24, 26],
          backgroundColor: '#f59e0b',
          borderRadius: 6
        }]
      },
      closed: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Chamados Fechados',
          data: [33, 37, 30, 43, 34, 51, 50, 56, 41, 47, 51, 56],
          backgroundColor: '#10b981',
          borderRadius: 6
        }]
      }
    };

    // Criar gráfico de barras
    if (barRef.current) {
      barChart = new Chart(barRef.current, {
        type: 'bar',
        data: barData[activeFilter as keyof typeof barData],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false }
            },
            y: {
              beginAtZero: true,
              grid: { color: '#f1f5f9' },
              border: { display: false }
            }
          }
        }
      });
    }

    // Criar gráfico de pizza
    if (pieRef.current) {
      pieChart = new Chart(pieRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Solucionados', 'Em Andamento', 'Pendentes', 'Agendados'],
          datasets: [{
            data: [128, 45, 12, 28],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#06b6d4'],
            borderWidth: 0,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.parsed * 100) / total).toFixed(1);
                  return `${context.label}: ${context.parsed} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      barChart?.destroy();
      pieChart?.destroy();
    };
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleLegendClick = (index: number) => {
    // Implementar toggle da legenda se necessário
    console.log(`Legend item ${index} clicked`);
  };

  return (
    <div className="charts-grid">
      {/* Bar Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Chamados por Período</h3>
          <div className="chart-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'opened' ? 'active' : ''}`}
              onClick={() => handleFilterClick('opened')}
            >
              Abertos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'closed' ? 'active' : ''}`}
              onClick={() => handleFilterClick('closed')}
            >
              Fechados
            </button>
          </div>
        </div>
        <div className="chart-wrapper">
          <canvas ref={barRef} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <h3 className="chart-title">Status dos Chamados</h3>
        </div>
        <div className="pie-chart-wrapper">
          <canvas ref={pieRef} />
        </div>
        <div className="pie-legend">
          <div className="legend-item" onClick={() => handleLegendClick(0)}>
            <div className="legend-color" style={{ background: '#10b981' }}></div>
            <span className="legend-text">Solucionados</span>
            <span className="legend-value">128</span>
          </div>
          <div className="legend-item" onClick={() => handleLegendClick(1)}>
            <div className="legend-color" style={{ background: '#f59e0b' }}></div>
            <span className="legend-text">Em Andamento</span>
            <span className="legend-value">45</span>
          </div>
          <div className="legend-item" onClick={() => handleLegendClick(2)}>
            <div className="legend-color" style={{ background: '#ef4444' }}></div>
            <span className="legend-text">Pendentes</span>
            <span className="legend-value">12</span>
          </div>
          <div className="legend-item" onClick={() => handleLegendClick(3)}>
            <div className="legend-color" style={{ background: '#06b6d4' }}></div>
            <span className="legend-text">Agendados</span>
            <span className="legend-value">28</span>
          </div>
        </div>
      </div>
    </div>
  );
}