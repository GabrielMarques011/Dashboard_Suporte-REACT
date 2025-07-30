import './assets/estilo.css';
import Sidebar from './components/Sidebar';
import { Header } from './components/Header';
import StatsGrid from './components/StatsGrid';
import ChartsGrid from './components/ChartsGrid';
import PerformanceSection from './components/PerformanceSection';
import Modal from './components/Modal';
import Login from './components/Login';

import { useEffect, useState } from 'react';

// ✅ Tipo de estatística (você pode mover isso para um arquivo types.ts depois)
type Stat = {
  title: string;
  value: number;
  trend: string;
  icon: 'check' | 'star' | 'arrow-up' | 'chat';
  type: 'success' | 'info' | 'warning';
};

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Stat | null>(null);

  const openModal = (stat: Stat) => {
    setModalData(stat);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  useEffect(() => {
    const toggleButton = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const toggleSidebar = () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    };

    const closeSidebar = () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    };

    toggleButton?.addEventListener('click', toggleSidebar);
    overlay?.addEventListener('click', closeSidebar);

    return () => {
      toggleButton?.removeEventListener('click', toggleSidebar);
      overlay?.removeEventListener('click', closeSidebar);
    };
  }, []);

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  return (
    <>
      <button className="mobile-toggle" id="mobileToggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="dashboard-content">
            <StatsGrid onStatClick={openModal} />
            <ChartsGrid />
            <PerformanceSection />
          </div>
        </main>
      </div>

      {/* ✅ Modal */}
      {modalVisible && modalData && (
        <Modal visible={modalVisible} data={modalData} onClose={closeModal} />
      )}
    </>
  );
}

export default App;