import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';

// Screens
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { OpportunitiesScreen } from './components/opportunities/OpportunitiesScreen';
import { ApplicationTrackerScreen } from './components/applications/ApplicationTrackerScreen';
import { PassportScreen } from './components/passport/PassportScreen';
import { DocumentVaultScreen } from './components/documents/DocumentVaultScreen';
import { MoneyJourneyScreen } from './components/money/MoneyJourneyScreen';
import { FamilyTreeScreen } from './components/family/FamilyTreeScreen';
import { AskSaathiScreen } from './components/saathi/AskSaathiScreen';
import { GrievanceScreen } from './components/grievance/GrievanceScreen';
import { AdminDashboardScreen } from './components/admin/AdminDashboardScreen';

// Modals
import { EligibilityExplainerModal } from './components/opportunities/EligibilityExplainerModal';
import { ApplicationFlowModal } from './components/applications/ApplicationFlowModal';

export function AppContent() {
  const { 
    hasCompletedOnboarding, 
    activeTab, 
    userRole,
    explainerModalScheme,
    applyModalScheme
  } = useApp();

  // If user hasn't completed guided onboarding, show the zero-confusion questionnaire first
  if (!hasCompletedOnboarding) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className="content-wrapper">
          <OnboardingScreen />
        </main>
      </div>
    );
  }

  // Active Screen renderer
  const renderActiveScreen = () => {
    if (userRole === 'officer' || activeTab === 'admin') {
      return <AdminDashboardScreen />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'opportunities':
        return <OpportunitiesScreen />;
      case 'applications':
        return <ApplicationTrackerScreen />;
      case 'passport':
        return <PassportScreen />;
      case 'documents':
        return <DocumentVaultScreen />;
      case 'money':
        return <MoneyJourneyScreen />;
      case 'family':
        return <FamilyTreeScreen />;
      case 'saathi':
        return <AskSaathiScreen />;
      case 'grievance':
        return <GrievanceScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-container">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="app-main">
        <Header />
        <main className="content-wrapper" role="main">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <BottomNav />

      {/* Modals & Overlays */}
      {explainerModalScheme && <EligibilityExplainerModal />}
      {applyModalScheme && <ApplicationFlowModal />}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
