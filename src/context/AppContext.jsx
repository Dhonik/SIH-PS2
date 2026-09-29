import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENT_PROFILE,
  SCHOLARSHIPS_DATA,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_GRIEVANCES,
  INITIAL_NOTIFICATIONS,
  TRANSLATIONS
} from '../data/mockData';
import { evaluateStudentEligibility } from '../services/eligibilityEngine';
import confetti from 'canvas-confetti';

const AppContext = createContext();

import { useAuth } from './AuthContext';

export const parseRouteFromLocation = () => {
  if (typeof window === 'undefined') return { type: 'public', view: 'landing' };
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = window.location.pathname.replace(/^\//, '');
  const route = hash || path;

  if (!route || route === '' || route === 'login') {
    return { type: 'public', view: 'landing' };
  }
  if (route === 'student/login' || route === 'student-login') {
    return { type: 'public', view: 'student-login' };
  }
  if (route === 'student/register' || route === 'student-register') {
    return { type: 'public', view: 'student-register' };
  }
  if (route === 'officer/login' || route === 'officer-login') {
    return { type: 'public', view: 'officer-login' };
  }

  if (route.startsWith('officer')) {
    const parts = route.split('/');
    const tab = parts[1] || 'dashboard';
    const tabMap = {
      dashboard: 'home',
      home: 'home',
      schemes: 'opportunities',
      scholarships: 'opportunities',
      opportunities: 'opportunities',
      applications: 'applications',
      students: 'passport',
      passport: 'passport',
      documents: 'documents',
      disbursements: 'money',
      money: 'money',
      family: 'family',
      grievances: 'grievance',
      grievance: 'grievance',
      assistant: 'saathi',
      saathi: 'saathi',
      settings: 'settings'
    };
    return { type: 'protected', role: 'officer', tab: tabMap[tab] || 'home' };
  }

  if (route.startsWith('student')) {
    const parts = route.split('/');
    const tab = parts[1] || 'dashboard';
    const tabMap = {
      dashboard: 'home',
      home: 'home',
      explore: 'opportunities',
      opportunities: 'opportunities',
      applications: 'applications',
      passport: 'passport',
      documents: 'documents',
      money: 'money',
      family: 'family',
      assistant: 'saathi',
      saathi: 'saathi',
      grievance: 'grievance',
      settings: 'settings'
    };
    return { type: 'protected', role: 'student', tab: tabMap[tab] || 'home' };
  }

  return { type: 'public', view: 'landing' };
};

const initialRoute = parseRouteFromLocation();

export function AppProvider({ children }) {
  const { isAuthenticated, role: authRole, user: authUser } = useAuth();

  // Navigation & Role with URL route preservation
  const [activeTab, setActiveTab] = useState(
    initialRoute?.type === 'protected' ? initialRoute.tab : 'home'
  );
  const [userRole, setUserRole] = useState(authRole || 'student'); // 'student' | 'officer'
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);

  // Sync role with AuthContext
  useEffect(() => {
    if (authRole) {
      setUserRole(authRole);
    }
  }, [authRole]);

  // Student State
  const [studentProfile, setStudentProfile] = useState(() => {
    if (authUser && authUser.role === 'student') {
      return { ...INITIAL_STUDENT_PROFILE, ...authUser };
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    if (authUser && authUser.role === 'student') {
      setStudentProfile(prev => ({ ...prev, ...authUser }));
    }
  }, [authUser]);

  const [scholarships, setScholarships] = useState(SCHOLARSHIPS_DATA);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY_MEMBERS);
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals & Interactive Overlays
  const [applyModalScheme, setApplyModalScheme] = useState(null);
  const [explainerModalScheme, setExplainerModalScheme] = useState(null);
  const [docInspectionModal, setDocInspectionModal] = useState(null);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);

  // Accessibility & Localization
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' | 'hi'
  const [fontScale, setFontScale] = useState('md'); // 'sm' | 'md' | 'lg'
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dynamically update body classes for accessibility
  useEffect(() => {
    document.body.className = '';
    if (isHighContrast) document.body.classList.add('high-contrast');
    document.body.classList.add(`font-${fontScale}`);
  }, [isHighContrast, fontScale]);

  // Sync URL route, browser history, and document title (ONLY when authenticated in protected route)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isAuthenticated) return; // Do NOT force hash when on landing or public login routes!

    const currentParsed = parseRouteFromLocation();
    if (currentParsed.type === 'public') return; // Do not overwrite public pages
    if (currentParsed.role && currentParsed.role !== userRole) return; // Role mismatch handled by AccessDeniedScreen

    const rolePrefix = userRole === 'officer' ? 'officer' : 'student';
    const tabName = (() => {
      if (userRole === 'officer') {
        const officerTabMap = {
          home: 'dashboard',
          opportunities: 'schemes',
          applications: 'applications',
          passport: 'students',
          documents: 'documents',
          money: 'disbursements',
          family: 'family',
          saathi: 'assistant',
          grievance: 'grievances',
          settings: 'settings'
        };
        return officerTabMap[activeTab] || activeTab;
      } else {
        const studentTabMap = {
          home: 'dashboard',
          opportunities: 'explore',
          applications: 'applications',
          passport: 'passport',
          documents: 'documents',
          money: 'money',
          family: 'family',
          saathi: 'assistant',
          grievance: 'grievance',
          settings: 'settings'
        };
        return studentTabMap[activeTab] || activeTab;
      }
    })();

    const expectedHash = `#/${rolePrefix}/${tabName}`;
    if (window.location.hash !== expectedHash) {
      window.history.pushState(null, '', expectedHash);
    }

    // Dynamic document title
    const roleTitle = userRole === 'officer' ? 'Officer Portal' : 'Student Portal';
    const sectionNames = {
      home: userRole === 'officer' ? 'Officer Dashboard' : 'Home Command Center',
      opportunities: userRole === 'officer' ? 'Scholarship Schemes' : 'Explore Scholarships',
      applications: userRole === 'officer' ? 'Application Management' : 'Application Tracker',
      passport: userRole === 'officer' ? 'Students & Passports' : 'Scholarship Passport',
      documents: userRole === 'officer' ? 'Document Verification Center' : 'Document Vault',
      money: userRole === 'officer' ? 'Disbursement Management' : 'Money Journey',
      family: userRole === 'officer' ? 'Family Overview' : 'Family Tree',
      saathi: userRole === 'officer' ? 'Officer Assistant' : 'Ask Saathi',
      grievance: userRole === 'officer' ? 'Grievance Desk' : 'Help & Grievance',
      settings: userRole === 'officer' ? 'Officer Settings' : 'Student Settings'
    };
    document.title = `Scholar Orbit — ${sectionNames[activeTab] || roleTitle}`;
  }, [userRole, activeTab, isAuthenticated]);

  // Listen to browser forward/back (hashchange and popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleRouteSync = () => {
      const parsed = parseRouteFromLocation();
      if (parsed && parsed.type === 'protected') {
        setUserRole(parsed.role);
        setActiveTab(parsed.tab);
      }
    };

    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
    };
  }, []);

  // Text-To-Speech Listen capability for accessibility
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const cleanText = text.replace(/[*#_•]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Eligibility results calculated dynamically
  const eligibilityMatches = evaluateStudentEligibility(studentProfile, scholarships);

  // Upload or update document (with real file metadata and simulated AI verification check)
  const uploadDocument = (docCode, fileData = {}) => {
    const uploadedFileName = fileData.fileName || 'Income_Certificate_FY2026-27.pdf';
    const uploadedFileSize = fileData.fileSize || '1.2 MB';
    const uploadedFileType = fileData.fileType || 'PDF';
    const previewUrl = fileData.previewUrl || null;

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.code === docCode || doc.id === docCode || (docCode === 'INCOME_CERT' && doc.code === 'INCOME_CERT')) {
          return {
            ...doc,
            name: 'Annual Income Certificate',
            fileName: uploadedFileName,
            size: uploadedFileSize,
            type: uploadedFileType,
            previewUrl: previewUrl,
            status: 'Verified',
            isActionRequired: false,
            uploadedOn: 'Today (Uploaded & Verified)',
            verifiedBy: 'AI Optical Pre-Check & e-Sanction Desk',
            verifiedDate: 'Just now',
            remarks: `Fresh valid certificate (${uploadedFileName}) verified. Attached to Post-Matric application.`,
            fieldsDetected: [
              'Valid for FY: 2026-27',
              'Authority: Tahsildar e-District Portal',
              'Income: ₹2,50,000 Verified',
              `File: ${uploadedFileName}`
            ]
          };
        }
        return doc;
      })
    );

    // Update Post-Matric application status now that blocking document is resolved
    setApplications((prevApps) =>
      prevApps.map((app) => {
        if (app.id === 'app-post-matric-01' || app.applicationId === 'PM-2026-001245') {
          return {
            ...app,
            statusHuman: 'Your renewed Income Certificate has been verified. Directorate Government Scrutiny is now actively progressing.',
            lastUpdated: 'Just now',
            stages: app.stages.map((stg) => {
              if (stg.name === 'Government Verification') {
                return { ...stg, remarks: 'Fresh income certificate verified. Scrutiny in progress.' };
              }
              return stg;
            })
          };
        }
        return app;
      })
    );

    // Also update student profile completion to 100%
    setStudentProfile((prev) => ({
      ...prev,
      profileCompletion: Math.min(100, prev.profileCompletion + 20)
    }));

    // Add high-priority notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Income Certificate Verified',
        message: `${uploadedFileName} successfully verified and linked to your scholarship application.`,
        time: 'Just now',
        type: 'success',
        read: false
      },
      ...prev
    ]);

    // Trigger celebratory visual confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 }
      });
    } catch {
      // fallback
    }
  };

  // Submit new scholarship application
  const submitApplication = (scheme, formData) => {
    const newAppId = `APP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApplication = {
      id: `app-${Date.now()}`,
      applicationId: newAppId,
      schemeId: scheme.id,
      schemeTitle: scheme.title,
      appliedDate: 'Today',
      currentStage: 'Application Submitted',
      stageIndex: 0,
      statusHuman: 'Your application has been received and sent for College Verification.',
      nextExpectedStage: 'Institutional Nodal Verification',
      lastUpdated: 'Just now',
      academicYear: '2026-27',
      grantAmount: 40000,
      stages: [
        { name: 'Application Submitted', completed: true, current: true, date: 'Today', remarks: 'Submitted by student via Scholar Orbit' },
        { name: 'College Verification', completed: false, date: 'Pending', remarks: 'Verification by Institute Nodal Officer' },
        { name: 'Government Verification', completed: false, date: 'Pending', remarks: 'District Welfare Directorate' },
        { name: 'Approval', completed: false, date: 'Pending', remarks: 'Final sanction order' },
        { name: 'Payment', completed: false, date: 'Pending', remarks: 'DBT transfer to Aadhaar linked account' }
      ]
    };

    setApplications((prev) => [newApplication, ...prev]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Application Submitted Successfully',
        message: `Your application ${newAppId} for ${scheme.title} has been logged.`,
        time: 'Just now',
        type: 'success',
        read: false
      },
      ...prev
    ]);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setApplyModalScheme(null);
  };

  // Add Family Member
  const addFamilyMember = (newMember) => {
    const memberObj = {
      id: `fam-${Date.now()}`,
      name: newMember.name,
      relationship: newMember.relationship,
      age: Number(newMember.age) || 18,
      education: newMember.education,
      institution: newMember.institution,
      currentScheme: newMember.currentScheme || 'Exploring Opportunities',
      status: 'Enrolled',
      amountReceived: Number(newMember.amountReceived) || 0,
      hasActionRequired: false
    };
    setFamilyMembers((prev) => [...prev, memberObj]);
    setIsAddFamilyModalOpen(false);
  };

  // File Grievance
  const submitGrievance = (grievanceData) => {
    const ticketId = `GRV-TN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance = {
      id: `grv-${Date.now()}`,
      ticketNumber: ticketId,
      category: grievanceData.category || 'Application',
      subject: grievanceData.subject,
      applicationId: grievanceData.applicationId || 'PM-2026-001245',
      filedOn: 'Today',
      status: 'Submitted',
      officerRemarks: 'Received at Help Desk. Acknowledgment SMS dispatched to registered mobile.',
      timeline: [
        { date: 'Today, Just now', text: 'Grievance ticket created by student' },
        { date: 'Expected within 24h', text: 'Assignment to Department Welfare Officer' }
      ]
    };
    setGrievances((prev) => [newGrievance, ...prev]);
    setIsGrievanceModalOpen(false);
  };

  // Admin Officer actions
  const advanceApplicationStage = (appId, nextStageName) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId || app.applicationId === appId) {
          const newStages = app.stages.map((stg) => {
            if (stg.name === nextStageName) {
              return { ...stg, completed: true, current: true, date: 'Today', remarks: 'Approved by State Welfare Directorate' };
            }
            if (stg.name === app.currentStage) {
              return { ...stg, completed: true, current: false };
            }
            return stg;
          });
          return {
            ...app,
            currentStage: nextStageName,
            statusHuman: `Status updated by Officer: ${nextStageName} completed.`,
            lastUpdated: 'Just now',
            stages: newStages
          };
        }
        return app;
      })
    );
  };

  // Quick Demo Shortcuts
  const simulateIncomeCertificateUpload = () => {
    uploadDocument('INCOME_CERT', {});
  };

  const simulateGovernmentApproval = () => {
    advanceApplicationStage('app-post-matric-01', 'Approval');
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } catch {
      // fallback
    }
  };

  const resetAllDemoData = () => {
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    setGrievances(INITIAL_GRIEVANCES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setHasCompletedOnboarding(true);
    setActiveTab('home');
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        studentProfile,
        setStudentProfile,
        scholarships,
        applications,
        documents,
        familyMembers,
        grievances,
        notifications,
        eligibilityMatches,
        uploadDocument,
        submitApplication,
        addFamilyMember,
        submitGrievance,
        advanceApplicationStage,
        // Modals
        applyModalScheme,
        setApplyModalScheme,
        explainerModalScheme,
        setExplainerModalScheme,
        docInspectionModal,
        setDocInspectionModal,
        isAddFamilyModalOpen,
        setIsAddFamilyModalOpen,
        isGrievanceModalOpen,
        setIsGrievanceModalOpen,
        // Accessibility
        language,
        setLanguage,
        fontScale,
        setFontScale,
        isHighContrast,
        setIsHighContrast,
        isSpeaking,
        speakText,
        stopSpeaking,
        // Demo helpers
        simulateIncomeCertificateUpload,
        simulateGovernmentApproval,
        resetAllDemoData,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
