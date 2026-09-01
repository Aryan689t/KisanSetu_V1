import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { Navbar } from './components/layout/Navbar';
import { SubtleDemoBar } from './components/layout/SubtleDemoBar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/auth/LandingPage';
import { LanguageSelectionScreen } from './components/auth/LanguageSelectionScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { SignUpScreen } from './components/auth/SignUpScreen';
import { FarmerOnboarding } from './components/auth/FarmerOnboarding';
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

const AppContent = () => {
  const { isAuthenticated, authScreen } = useDemo();

  // Public / Entry Flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-agri-text selection:bg-agri-gold/30 font-sans">
        <SubtleDemoBar />
        {authScreen === 'landing' && <LandingPage />}
        {authScreen === 'language' && <LanguageSelectionScreen />}
        {authScreen === 'login' && <LoginScreen />}
        {authScreen === 'signup' && <SignUpScreen />}
        {authScreen === 'onboarding' && <FarmerOnboarding />}
      </div>
    );
  }

  // First-time onboarding screen right after registration
  if (authScreen === 'onboarding') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-agri-text selection:bg-agri-gold/30 font-sans">
        <SubtleDemoBar />
        <FarmerOnboarding />
      </div>
    );
  }

  // Authenticated Main Application Flow
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EE] text-agri-text selection:bg-agri-gold/30 font-sans">
      <SubtleDemoBar />
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  );
}
