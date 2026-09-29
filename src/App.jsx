import React, { useState, useEffect } from 'react';
import { useApp, parseRouteFromLocation } from './context/AppContext';
import { useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';

// Public & Auth Screens
import { RootLandingScreen } from './components/auth/RootLandingScreen';
import { StudentLoginScreen } from './components/auth/StudentLoginScreen';
import { StudentRegisterScreen } from './components/auth/StudentRegisterScreen';
import { OfficerLoginScreen } from './components/auth/OfficerLoginScreen';
import { AccessDeniedScreen } from './components/auth/AccessDeniedScreen';

// Student Screens
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

// Dedicated Officer Workspaces
import { OfficerDashboard } from './components/admin/OfficerDashboard';
import { OfficerSchemes } from './components/admin/OfficerSchemes';
import { OfficerApplications } from './components/admin/OfficerApplications';
import { OfficerPassportSearch } from './components/admin/OfficerPassportSearch';
import { OfficerDocVerification } from './components/admin/OfficerDocVerification';
import { OfficerDisbursements } from './components/admin/OfficerDisbursements';
import { OfficerFamilyOverview } from './components/admin/OfficerFamilyOverview';
import { OfficerGrievanceView } from './components/admin/OfficerGrievanceView';
import { OfficerAssistant } from './components/admin/OfficerAssistant';
import { OfficerSettings } from './components/admin/OfficerSettings';

// Modals
import { EligibilityExplainerModal } from './components/opportunities/EligibilityExplainerModal';
import { ApplicationFlowModal } from './components/applications/ApplicationFlowModal';

export function AppContent() {
  const { isAuthenticated, role: authRole } = useAuth();
  const {
    hasCompletedOnboarding,
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    explainerModalScheme,
    applyModalScheme
  } = useApp();

  const [currentRoute, setCurrentRoute] = useState(parseRouteFromLocation());

  // Listen to browser forward/back and hash routing changes
  useEffect(() => {
    const handleRouteChange = () => {
      const parsed = parseRouteFromLocation();
      setCurrentRoute(parsed);
      if (parsed.type === 'protected' && isAuthenticated && parsed.role === authRole) {
        setUserRole(parsed.role);
        setActiveTab(parsed.tab);
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isAuthenticated, authRole, setActiveTab, setUserRole]);

  // Route navigation helper
  const navigateTo = (viewName) => {
    if (viewName === 'landing') window.location.hash = '#/';
    else if (viewName === 'student-login') window.location.hash = '#/student/login';
    else if (viewName === 'student-register') window.location.hash = '#/student/register';
    else if (viewName === 'officer-login') window.location.hash = '#/officer/login';
    else if (viewName === 'student-portal') {
      window.location.hash = '#/student/dashboard';
      setUserRole('student');
      setActiveTab('home');
    }
    else if (viewName === 'officer-portal') {
      window.location.hash = '#/officer/dashboard';
      setUserRole('officer');
      setActiveTab('home');
    }
  };

  // 1. PUBLIC / UNAUTHENTICATED FLOW
  if (!isAuthenticated) {
    if (currentRoute.view === 'student-login') {
      return <StudentLoginScreen onNavigate={navigateTo} />;
    }
    if (currentRoute.view === 'student-register') {
      return <StudentRegisterScreen onNavigate={navigateTo} />;
    }
    if (currentRoute.view === 'officer-login') {
      return <OfficerLoginScreen onNavigate={navigateTo} />;
    }
    // Default entry: Root Landing ("Who are you? 🎓 Student, 🛡️ Officer")
    return <RootLandingScreen onNavigate={navigateTo} />;
  }

  // 2. ROLE-BASED ROUTE PROTECTION CHECKS (Section 6 requirement)
  // Check if a Student is trying to access an Officer route
  if (authRole === 'student' && currentRoute.type === 'protected' && currentRoute.role === 'officer') {
    return (
      <AccessDeniedScreen
        attemptedRole="officer"
        currentRole="student"
        onReturn={() => navigateTo('student-portal')}
      />
    );
  }

  // Check if an Officer is trying to access a Student route
  if (authRole === 'officer' && currentRoute.type === 'protected' && currentRoute.role === 'student') {
    return (
      <AccessDeniedScreen
        attemptedRole="student"
        currentRole="officer"
        onReturn={() => navigateTo('officer-portal')}
      />
    );
  }

  // If user navigates to public landing or login while logged in, allow them to return or navigate
  if (currentRoute.type === 'public') {
    if (currentRoute.view === 'student-login' && authRole === 'officer') {
      return (
        <AccessDeniedScreen
          attemptedRole="student"
          currentRole="officer"
          onReturn={() => navigateTo('officer-portal')}
        />
      );
    }
    if (currentRoute.view === 'officer-login' && authRole === 'student') {
      return (
        <AccessDeniedScreen
          attemptedRole="officer"
          currentRole="student"
          onReturn={() => navigateTo('student-portal')}
        />
      );
    }
    return <RootLandingScreen onNavigate={navigateTo} />;
  }

  // If user hasn't completed guided onboarding, show the zero-confusion questionnaire first
  if (!hasCompletedOnboarding && authRole === 'student') {
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
    // 10 Distinct Officer Workspaces (When in Officer Mode)
    if (userRole === 'officer') {
      switch (activeTab) {
        case 'home':
        case 'dashboard':
          return <OfficerDashboard />;
        case 'opportunities':
        case 'scholarships':
          return <OfficerSchemes />;
        case 'applications':
          return <OfficerApplications />;
        case 'passport':
          return <OfficerPassportSearch />;
        case 'documents':
          return <OfficerDocVerification />;
        case 'money':
        case 'disbursements':
          return <OfficerDisbursements />;
        case 'family':
          return <OfficerFamilyOverview />;
        case 'grievance':
        case 'grievances':
          return <OfficerGrievanceView />;
        case 'saathi':
        case 'assistant':
          return <OfficerAssistant />;
        case 'settings':
          return <OfficerSettings />;
        case 'admin':
        default:
          return <OfficerDashboard />;
      }
    }

    switch (activeTab) {
      case 'home':
      case 'dashboard':
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
      case 'assistant':
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
