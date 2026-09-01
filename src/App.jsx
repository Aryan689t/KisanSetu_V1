import { DemoProvider, useDemo } from './context/DemoContext';
import { Navbar } from './components/layout/Navbar';
import { SubtleDemoBar } from './components/layout/SubtleDemoBar';
import { Footer } from './components/layout/Footer';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { CentreDiscovery } from './components/farmer/CentreDiscovery';
import { LiveQueueTracker } from './components/farmer/LiveQueueTracker';
import { FarmerHistory } from './components/farmer/FarmerHistory';
import { OperatorDashboard } from './components/operator/OperatorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent = () => {
  const { activeRole, farmerTab } = useDemo();

  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full ${activeRole === 'farmer' ? 'pb-24 md:pb-8' : ''}`}>
      {activeRole === 'farmer' && (
        <>
          {farmerTab === 'dashboard' && <FarmerDashboard />}
          {farmerTab === 'centres' && <CentreDiscovery />}
          {farmerTab === 'queue' && <LiveQueueTracker />}
          {farmerTab === 'history' && <FarmerHistory />}
        </>
      )}

      {activeRole === 'operator' && <OperatorDashboard />}

      {activeRole === 'admin' && <AdminDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <DemoProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-agri-text selection:bg-agri-gold/30 font-sans">
        <SubtleDemoBar />
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </DemoProvider>
  );
}
