import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  Bell, 
  ShieldCheck, 
  User, 
  CheckCircle2, 
  FileUp, 
  Sparkles,
  ChevronDown,
  Menu,
  X,
  LogOut,
  FolderOpen,
  DollarSign,
  Users,
  MessageSquareHeart,
  LifeBuoy,
  Settings,
  Award,
  Compass,
  FileText,
  Home,
  RotateCcw
} from 'lucide-react';

export function Header() {
  const { logout, user: authUser, switchToStudentDemo } = useAuth();
  const {
    studentProfile,
    userRole,
    setUserRole,
    language,
    setLanguage,
    fontScale,
    setFontScale,
    isHighContrast,
    setIsHighContrast,
    isSpeaking,
    speakText,
    stopSpeaking,
    notifications,
    setHasCompletedOnboarding,
    simulateIncomeCertificateUpload,
    simulateGovernmentApproval,
    resetAllDemoData,
    activeTab,
    setActiveTab,
    documents
  } = useApp();

  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showDemoBar, setShowDemoBar] = useState(true);

  const moreRef = useRef(null);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const isOfficer = userRole === 'officer';
  const hasActionDoc = documents?.some(d => d.isActionRequired);
  const unreadNotifCount = notifications?.filter(n => !n.read).length || 0;

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowMoreDropdown(false);
        setShowProfileDropdown(false);
        setShowNotifDropdown(false);
        setMobileDrawerOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMoreDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setShowMoreDropdown(false);
    setShowProfileDropdown(false);
    setMobileDrawerOpen(false);
  };

  const handleListenScreen = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let speechText = '';
      if (activeTab === 'home') {
        speechText = `Welcome to Scholar Orbit. One student, one orbit, every opportunity. Next step: Upload Income Certificate for post-matric verification.`;
      } else if (activeTab === 'passport') {
        speechText = `Scholarship Passport for ${studentProfile.fullName}. Digital profile eighty percent complete.`;
      } else if (activeTab === 'opportunities') {
        speechText = `Explore Scholarship Radar and matched opportunities for Scheduled Tribe students.`;
      } else {
        speechText = `Scholar Orbit. One student, one orbit, every opportunity. Guiding your tribal scholarship journey step by step.`;
      }
      speakText(speechText);
    }
  };

  // Section Name mapping for subtle breadcrumb
  const breadcrumbSection = (() => {
    if (isOfficer) {
      const officerLabels = {
        home: 'Dashboard',
        opportunities: 'Schemes',
        applications: 'Applications',
        passport: 'Students',
        documents: 'Documents',
        money: 'Disbursements',
        family: 'Family Overview',
        grievance: 'Grievances',
        saathi: 'Assistant',
        settings: 'Settings'
      };
      return officerLabels[activeTab] || 'Dashboard';
    } else {
      const studentLabels = {
        home: 'Home',
        opportunities: 'Explore',
        applications: 'Applications',
        passport: 'Passport',
        documents: 'Documents',
        money: 'Money Journey',
        family: 'Family',
        saathi: 'Ask Saathi',
        grievance: 'Help & Grievance',
        settings: 'Settings'
      };
      return studentLabels[activeTab] || 'Home';
    }
  })();

  const isMoreTabActive = ['documents', 'money', 'family', 'saathi', 'grievance', 'settings'].includes(activeTab);

  return (
    <>
      <header className="scholar-orbit-top-nav" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(18, 59, 50, 0.04)'
      }}>
        {/* Top Demo Simulation Bar (Judges / Hackathon Evaluators) */}
        {showDemoBar && (
          <div style={{
            backgroundColor: 'var(--color-deep-forest)',
            color: 'var(--color-warm-sand)',
            padding: '5px 20px',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                backgroundColor: 'var(--color-terracotta)', 
                color: '#FFFFFF', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontWeight: 800, 
                fontSize: '0.7rem',
                letterSpacing: '0.04em'
              }}>
                SIH 2026 DEMO
              </span>
              <span>Unified ST Scholarship & Scrutiny Platform</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={simulateIncomeCertificateUpload}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
                title="Simulates uploading renewed income certificate"
              >
                <FileUp size={12} />
                <span>Simulate Upload</span>
              </button>

              <button
                onClick={simulateGovernmentApproval}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
                title="Simulates Directorate official approving application"
              >
                <CheckCircle2 size={12} />
                <span>Simulate Approval</span>
              </button>

              <button
                onClick={resetAllDemoData}
                style={{
                  backgroundColor: 'transparent',
                  color: 'rgba(245, 239, 230, 0.75)',
                  padding: '2px 6px',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setShowDemoBar(false)}
                style={{ color: 'rgba(255,255,255,0.6)', padding: '0 4px', fontSize: '0.9rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
                title="Dismiss demo banner"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Main Desktop & Tablet Header Bar (Height ~64-70px) */}
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          height: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* LEFT: 🪐 SCHOLAR ORBIT BRANDING */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div 
              onClick={() => handleNavClick('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              title="Scholar Orbit — Home"
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                backgroundColor: 'var(--color-deep-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 2px 8px rgba(18, 59, 50, 0.22)'
              }}>
                🪐
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--color-deep-forest)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15
                  }}>
                    SCHOLAR ORBIT
                  </span>

                  {isOfficer && (
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--color-terracotta)',
                      color: '#FFFFFF',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      letterSpacing: '0.04em'
                    }}>
                      OFFICER MODE
                    </span>
                  )}
                </div>

                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-muted-text)',
                  lineHeight: 1.1,
                  display: 'none',
                  sm: 'block'
                }} className="hidden sm:block">
                  One Student. One Orbit. Every Opportunity.
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE: HORIZONTAL TEXT NAVIGATION (DESKTOP >= 1024px) */}
          <nav className="hidden lg:flex" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0
          }} aria-label="Main Navigation">
            {isOfficer ? (
              /* Officer Navigation Items (Section 6 & 7) */
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  style={getNavStyle(activeTab === 'home')}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => handleNavClick('opportunities')}
                  style={getNavStyle(activeTab === 'opportunities')}
                >
                  Schemes
                </button>

                <button
                  onClick={() => handleNavClick('applications')}
                  style={getNavStyle(activeTab === 'applications')}
                >
                  Applications
                </button>

                <button
                  onClick={() => handleNavClick('passport')}
                  style={getNavStyle(activeTab === 'passport')}
                >
                  Students
                </button>

                <button
                  onClick={() => handleNavClick('documents')}
                  style={getNavStyle(activeTab === 'documents')}
                >
                  Documents
                </button>

                <button
                  onClick={() => handleNavClick('money')}
                  style={getNavStyle(activeTab === 'money')}
                >
                  Disbursements
                </button>

                <button
                  onClick={() => handleNavClick('grievance')}
                  style={getNavStyle(activeTab === 'grievance')}
                >
                  Grievances
                </button>

                <button
                  onClick={() => handleNavClick('saathi')}
                  style={getNavStyle(activeTab === 'saathi')}
                >
                  Assistant
                </button>
              </>
            ) : (
              /* Student Navigation Items (Section 3 & 4) */
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  style={getNavStyle(activeTab === 'home')}
                >
                  Home
                </button>

                <button
                  onClick={() => handleNavClick('opportunities')}
                  style={getNavStyle(activeTab === 'opportunities')}
                >
                  Explore
                </button>

                <button
                  onClick={() => handleNavClick('applications')}
                  style={getNavStyle(activeTab === 'applications')}
                >
                  Applications
                </button>

                <button
                  onClick={() => handleNavClick('passport')}
                  style={getNavStyle(activeTab === 'passport')}
                >
                  Passport
                </button>

                {/* More ▼ Dropdown Menu */}
                <div style={{ position: 'relative' }} ref={moreRef}>
                  <button
                    onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                    style={{
                      ...getNavStyle(isMoreTabActive),
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    aria-expanded={showMoreDropdown}
                    aria-haspopup="true"
                  >
                    <span>More</span>
                    <ChevronDown size={14} style={{ transform: showMoreDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
                    {hasActionDoc && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-warning)',
                        display: 'inline-block'
                      }} />
                    )}
                  </button>

                  {showMoreDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '42px',
                      left: 0,
                      width: '210px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--color-border)',
                      padding: '8px',
                      zIndex: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      animation: 'fadeIn 0.15s ease'
                    }}>
                      <button
                        onClick={() => handleNavClick('documents')}
                        style={getDropdownItemStyle(activeTab === 'documents')}
                      >
                        <FolderOpen size={16} color="var(--color-terracotta)" />
                        <span style={{ flex: 1 }}>Documents</span>
                        {hasActionDoc && <span style={{ fontSize: '0.68rem', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning-dark)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>Action</span>}
                      </button>

                      <button
                        onClick={() => handleNavClick('money')}
                        style={getDropdownItemStyle(activeTab === 'money')}
                      >
                        <DollarSign size={16} color="var(--color-muted-green)" />
                        <span>Money Journey</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('family')}
                        style={getDropdownItemStyle(activeTab === 'family')}
                      >
                        <Users size={16} color="var(--color-deep-forest)" />
                        <span>Family</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('saathi')}
                        style={getDropdownItemStyle(activeTab === 'saathi')}
                      >
                        <MessageSquareHeart size={16} color="var(--color-terracotta)" />
                        <span>Ask Saathi</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('grievance')}
                        style={getDropdownItemStyle(activeTab === 'grievance')}
                      >
                        <LifeBuoy size={16} color="var(--color-charcoal)" />
                        <span>Help & Grievance</span>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }} />

                      <button
                        onClick={() => handleNavClick('settings')}
                        style={getDropdownItemStyle(activeTab === 'settings')}
                      >
                        <Settings size={16} color="var(--color-muted-text)" />
                        <span>Settings</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* RIGHT: CONTROLS, ACCESSIBILITY, NOTIFICATIONS & PROFILE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Quick Audio Read-Aloud Tool */}
            <button
              onClick={handleListenScreen}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: isSpeaking ? 'var(--color-terracotta)' : 'var(--color-warm-sand-light)',
                color: isSpeaking ? '#FFFFFF' : 'var(--color-deep-forest)',
                border: '1px solid var(--color-border)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Listen to screen guidance in plain speech"
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span className="hidden xl:inline">
                {isSpeaking ? 'Stop' : '🔊 Listen'}
              </span>
            </button>

            {/* Notifications Bell with Popover */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                style={{
                  position: 'relative',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-warm-sand-light)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-deep-forest)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="View notifications"
                title="Notifications"
              >
                <Bell size={17} />
                {unreadNotifCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-terracotta)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)',
                  zIndex: 60,
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-deep-forest)' }}>Notifications</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-muted-text)' }}>Recent</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications?.map((notif) => (
                      <div 
                        key={notif.id}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: notif.type === 'action' ? 'var(--color-warning-bg)' : 'var(--color-warm-sand-light)',
                          borderLeft: notif.type === 'action' ? '3px solid var(--color-warning)' : '3px solid var(--color-success)'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--color-charcoal)' }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                          {notif.message}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle-text)', marginTop: '4px' }}>
                          {notif.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown: Arun ▼ or Officer ▼ */}
            <div style={{ position: 'relative' }} ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-warm-sand-light)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}
                aria-expanded={showProfileDropdown}
                aria-haspopup="true"
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isOfficer ? 'var(--color-terracotta)' : 'var(--color-deep-forest)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isOfficer ? 'SN' : 'AK'}
                </div>

                <span style={{
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--color-deep-forest)'
                }}>
                  {isOfficer ? 'Officer' : 'Arun'}
                </span>

                <ChevronDown size={14} style={{ color: 'var(--color-muted-text)', transform: showProfileDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
              </button>

              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '10px',
                  zIndex: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {/* Profile Header Box */}
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-warm-sand-light)',
                    marginBottom: '6px'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--color-charcoal)' }}>
                      {isOfficer ? 'Dr. K. Senthil Nathan, IAS' : studentProfile.fullName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                      {isOfficer ? 'District Welfare Officer • Desk #04' : `${studentProfile.tribeSubcaste} (ST) • Anna Univ`}
                    </div>
                  </div>

                  {isOfficer ? (
                    <>
                      <button
                        onClick={() => handleNavClick('home')}
                        style={getDropdownItemStyle(activeTab === 'home')}
                      >
                        <ShieldCheck size={15} color="var(--color-deep-forest)" />
                        <span>Officer Dashboard</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('settings')}
                        style={getDropdownItemStyle(activeTab === 'settings')}
                      >
                        <Settings size={15} color="var(--color-muted-text)" />
                        <span>Desk Settings</span>
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }} />

                      <button
                        onClick={() => {
                          switchToStudentDemo();
                          setShowProfileDropdown(false);
                        }}
                        style={getDropdownItemStyle(false)}
                        title="Demo function: Return to Student View"
                      >
                        <User size={15} color="var(--color-terracotta)" />
                        <span>Return to Student View (Demo)</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleNavClick('passport')}
                        style={getDropdownItemStyle(activeTab === 'passport')}
                      >
                        <User size={15} color="var(--color-deep-forest)" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('passport')}
                        style={getDropdownItemStyle(activeTab === 'passport')}
                      >
                        <Award size={15} color="var(--color-terracotta)" />
                        <span>Scholarship Passport</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('settings')}
                        style={getDropdownItemStyle(activeTab === 'settings')}
                      >
                        <Settings size={15} color="var(--color-muted-text)" />
                        <span>Profile Settings</span>
                      </button>
                    </>
                  )}

                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }} />

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileDropdown(false);
                    }}
                    style={{
                      ...getDropdownItemStyle(false),
                      color: 'var(--color-terracotta-dark)',
                      fontWeight: 700
                    }}
                  >
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button (Screens < 1024px) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden"
              style={{
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-deep-forest)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Open mobile navigation"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>

        {/* SUBTLE BREADCRUMB BAR (Section 8 Requirement) */}
        <div style={{
          backgroundColor: 'var(--color-warm-sand-light)',
          borderTop: '1px solid var(--color-border-subtle)',
          padding: '5px 24px',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--color-muted-text)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-deep-forest)' }}>
              {isOfficer ? 'Officer' : 'Scholar Orbit'}
            </span>
            <span style={{ color: 'var(--color-border-dark)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--color-terracotta)' }}>
              {breadcrumbSection}
            </span>
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', fontWeight: 600 }} className="hidden sm:block">
            {isOfficer ? 'Tamil Nadu Welfare Directorate • Desk #04' : `Logged in as ${studentProfile.fullName}`}
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OVER NAVIGATION DRAWER (Section 9 Requirement) */}
      {mobileDrawerOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            width: '300px',
            maxWidth: '85vw',
            height: '100%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
            animation: 'slideInRight 0.25s ease'
          }}>
            {/* Drawer Top */}
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🪐</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-deep-forest)' }}>SCHOLAR ORBIT</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-muted-text)' }}>
                    {isOfficer ? 'Officer Verification Desk' : 'One Student. One Orbit.'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileDrawerOpen(false)}
                style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: 'var(--color-charcoal)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Nav Links */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {isOfficer ? (
                  <>
                    <button onClick={() => handleNavClick('home')} style={getMobileItemStyle(activeTab === 'home')}><Home size={18} /><span>Dashboard</span></button>
                    <button onClick={() => handleNavClick('opportunities')} style={getMobileItemStyle(activeTab === 'opportunities')}><Compass size={18} /><span>Schemes</span></button>
                    <button onClick={() => handleNavClick('applications')} style={getMobileItemStyle(activeTab === 'applications')}><FileText size={18} /><span>Applications</span></button>
                    <button onClick={() => handleNavClick('passport')} style={getMobileItemStyle(activeTab === 'passport')}><Award size={18} /><span>Students</span></button>
                    <button onClick={() => handleNavClick('documents')} style={getMobileItemStyle(activeTab === 'documents')}><FolderOpen size={18} /><span>Documents</span></button>
                    <button onClick={() => handleNavClick('money')} style={getMobileItemStyle(activeTab === 'money')}><DollarSign size={18} /><span>Disbursements</span></button>
                    <button onClick={() => handleNavClick('grievance')} style={getMobileItemStyle(activeTab === 'grievance')}><LifeBuoy size={18} /><span>Grievances</span></button>
                    <button onClick={() => handleNavClick('saathi')} style={getMobileItemStyle(activeTab === 'saathi')}><MessageSquareHeart size={18} /><span>Assistant</span></button>
                    <button onClick={() => handleNavClick('settings')} style={getMobileItemStyle(activeTab === 'settings')}><Settings size={18} /><span>Settings</span></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleNavClick('home')} style={getMobileItemStyle(activeTab === 'home')}><Home size={18} /><span>Home</span></button>
                    <button onClick={() => handleNavClick('opportunities')} style={getMobileItemStyle(activeTab === 'opportunities')}><Compass size={18} /><span>Explore</span></button>
                    <button onClick={() => handleNavClick('applications')} style={getMobileItemStyle(activeTab === 'applications')}><FileText size={18} /><span>Applications</span></button>
                    <button onClick={() => handleNavClick('passport')} style={getMobileItemStyle(activeTab === 'passport')}><Award size={18} /><span>Passport</span></button>
                    <button onClick={() => handleNavClick('documents')} style={getMobileItemStyle(activeTab === 'documents')}><FolderOpen size={18} /><span>Documents</span></button>
                    <button onClick={() => handleNavClick('money')} style={getMobileItemStyle(activeTab === 'money')}><DollarSign size={18} /><span>Money Journey</span></button>
                    <button onClick={() => handleNavClick('family')} style={getMobileItemStyle(activeTab === 'family')}><Users size={18} /><span>Family</span></button>
                    <button onClick={() => handleNavClick('saathi')} style={getMobileItemStyle(activeTab === 'saathi')}><MessageSquareHeart size={18} /><span>Ask Saathi</span></button>
                    <button onClick={() => handleNavClick('grievance')} style={getMobileItemStyle(activeTab === 'grievance')}><LifeBuoy size={18} /><span>Help</span></button>
                    <button onClick={() => handleNavClick('settings')} style={getMobileItemStyle(activeTab === 'settings')}><Settings size={18} /><span>Settings</span></button>
                  </>
                )}
              </div>
            </div>

            {/* Drawer Footer with Logout */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-warm-sand-light)' }}>
              {isOfficer && (
                <button
                  onClick={() => {
                    switchToStudentDemo();
                    setMobileDrawerOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '9px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-warm-sand)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-deep-forest)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Return to Student View (Demo)
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-terracotta)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Nav link style helpers (clean text navigation with subtle pill active state)
function getNavStyle(isActive) {
  return {
    padding: '7px 14px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    backgroundColor: isActive ? 'var(--color-warm-sand)' : 'transparent',
    color: isActive ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textDecoration: 'none'
  };
}

function getDropdownItemStyle(isActive) {
  return {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: isActive ? 'var(--color-warm-sand-light)' : 'transparent',
    color: isActive ? 'var(--color-deep-forest)' : 'var(--color-charcoal)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.84rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'left',
    transition: 'background-color 0.15s ease'
  };
}

function getMobileItemStyle(isActive) {
  return {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: isActive ? 'var(--color-warm-sand)' : 'transparent',
    color: isActive ? 'var(--color-deep-forest)' : 'var(--color-charcoal)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.92rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left'
  };
}
