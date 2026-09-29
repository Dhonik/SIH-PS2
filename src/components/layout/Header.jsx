import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Eye, 
  Bell, 
  ShieldCheck, 
  User, 
  RotateCcw, 
  CheckCircle2, 
  FileUp, 
  Sparkles,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

export function Header() {
  const {
    t,
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
    setActiveTab
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showDemoBar, setShowDemoBar] = useState(true);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const handleListenScreen = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let speechText = '';
      if (activeTab === 'home') {
        speechText = `Welcome Arun. Your scholarship command center. Your next step: Upload Income Certificate. This document is needed before you can continue your application. You have two active applications: Post-Matric in government verification, and Top Class approved. Total received thirty-two thousand rupees.`;
      } else if (activeTab === 'passport') {
        speechText = `Scholarship Passport for Arun Kumar, Scheduled Tribe, B-Tech Computer Science, Tamil Nadu. Profile eighty percent complete. Five of six documents verified. Three potential matches.`;
      } else if (activeTab === 'opportunities') {
        speechText = `Five major ST scholarship opportunities identified for your education profile. Check the scholarship radar or tap view details to understand why each scheme matches.`;
      } else if (activeTab === 'documents') {
        speechText = `Document Vault. Action required on your Annual Income Certificate for financial year renewal. ST certificate, mark-sheet, and domicile are already verified.`;
      } else {
        speechText = `${t.brandName}. ${t.tagline}. We are here to guide your tribal scholarship journey step by step.`;
      }
      speakText(speechText);
    }
  };

  return (
    <header className="header-container" style={{
      backgroundColor: 'var(--color-pure-white)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Top Demo Helper Bar for Judges & Evaluators */}
      {showDemoBar && (
        <div style={{
          backgroundColor: 'var(--color-deep-forest)',
          color: 'var(--color-warm-sand)',
          padding: '6px 16px',
          fontSize: '0.8rem',
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
              fontWeight: 700, 
              fontSize: '0.72rem',
              letterSpacing: '0.04em'
            }}>
              SIH 2026 PROTOTYPE
            </span>
            <span>Judges' Live Simulation:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={simulateIncomeCertificateUpload}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Simulates uploading renewed income certificate to clear blocking state"
            >
              <FileUp size={13} />
              1-Click Upload Income Cert
            </button>

            <button
              onClick={simulateGovernmentApproval}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Simulates Directorate official approving the Post-Matric application"
            >
              <CheckCircle2 size={13} />
              1-Click Govt Approval
            </button>

            <button
              onClick={() => { setHasCompletedOnboarding(false); setActiveTab('home'); }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={13} />
              Try 2-Min Onboarding
            </button>

            <button
              onClick={resetAllDemoData}
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(245, 239, 230, 0.75)',
                padding: '3px 6px',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <RotateCcw size={12} />
              Reset Demo
            </button>

            <button
              onClick={() => setShowDemoBar(false)}
              style={{ color: 'rgba(255,255,255,0.6)', padding: '0 4px', fontSize: '1rem', lineHeight: 1 }}
              title="Dismiss banner"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          {/* Subtle tribal geometric emblem */}
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-deep-forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(18, 59, 50, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              {/* Geometric triangle motif */}
              <path d="M16 4 L28 26 L4 26 Z" stroke="var(--color-terracotta)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M16 12 L22 24 L10 24 Z" fill="var(--color-warm-sand)" />
              <circle cx="16" cy="18" r="2.5" fill="var(--color-deep-forest)" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-deep-forest)',
                letterSpacing: '-0.02em'
              }}>
                {t.brandName}
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                backgroundColor: 'var(--color-warm-sand)',
                color: 'var(--color-terracotta-dark)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--color-border)'
              }}>
                ST PORTAL
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', margin: 0 }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Accessibility Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Audio TTS Listen Tool */}
          <button
            onClick={handleListenScreen}
            className={`btn-ghost ${isSpeaking ? 'animate-pulse-subtle' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isSpeaking ? 'var(--color-terracotta)' : 'var(--color-warm-sand-light)',
              color: isSpeaking ? '#FFFFFF' : 'var(--color-deep-forest)',
              border: '1px solid var(--color-border)',
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
            title="Listen to screen guidance in plain speech"
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="hidden sm:inline">
              {isSpeaking ? 'Stop Audio' : '🔊 Listen'}
            </span>
          </button>

          {/* Text Resizer Tool: A- A A+ */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-warm-sand-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '2px 4px'
          }}>
            <button
              onClick={() => setFontScale('sm')}
              style={{
                padding: '4px 6px',
                fontSize: '0.75rem',
                fontWeight: fontScale === 'sm' ? 700 : 500,
                color: fontScale === 'sm' ? 'var(--color-terracotta)' : 'var(--color-muted-text)'
              }}
              title="Small text"
            >
              A−
            </button>
            <button
              onClick={() => setFontScale('md')}
              style={{
                padding: '4px 6px',
                fontSize: '0.85rem',
                fontWeight: fontScale === 'md' ? 700 : 500,
                color: fontScale === 'md' ? 'var(--color-terracotta)' : 'var(--color-muted-text)'
              }}
              title="Standard text"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('lg')}
              style={{
                padding: '4px 6px',
                fontSize: '1rem',
                fontWeight: fontScale === 'lg' ? 700 : 500,
                color: fontScale === 'lg' ? 'var(--color-terracotta)' : 'var(--color-muted-text)'
              }}
              title="Large readable text"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className="btn-ghost"
            style={{
              padding: '7px 10px',
              backgroundColor: isHighContrast ? 'var(--color-charcoal)' : 'transparent',
              color: isHighContrast ? '#FFFFFF' : 'var(--color-muted-text)',
              borderRadius: 'var(--radius-md)'
            }}
            title="Toggle High Contrast Mode"
          >
            <Eye size={17} />
          </button>

          {/* Multi-language Selector */}
          <div style={{ position: 'relative' }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '7px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-warm-sand)',
                color: 'var(--color-deep-forest)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              aria-label="Select Application Language"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-warm-sand)',
                color: 'var(--color-deep-forest)'
              }}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-terracotta)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
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
                backgroundColor: 'var(--color-pure-white)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                zIndex: 50,
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Notifications</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>Recent</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: notif.type === 'action' ? 'var(--color-warning-bg)' : 'var(--color-warm-sand-light)',
                        borderLeft: notif.type === 'action' ? '3px solid var(--color-warning)' : '3px solid var(--color-success)'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                        {notif.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '3px' }}>
                        {notif.message}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', marginTop: '4px' }}>
                        {notif.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher (Student / Officer) */}
          <button
            onClick={() => setUserRole(userRole === 'student' ? 'officer' : 'student')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: userRole === 'officer' ? 'var(--color-terracotta)' : 'var(--color-deep-forest)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Switch view between Student and Department Verification Officer"
          >
            {userRole === 'officer' ? <ShieldCheck size={16} /> : <User size={16} />}
            <span style={{ display: 'none', md: 'inline' }}>
              {userRole === 'officer' ? 'Officer Mode' : 'Student Mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
