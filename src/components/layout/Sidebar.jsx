import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  FileText, 
  Award, 
  FolderOpen, 
  DollarSign, 
  Users, 
  MessageSquareHeart, 
  LifeBuoy, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export function Sidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    userRole, 
    setUserRole, 
    studentProfile, 
    documents,
    t 
  } = useApp();

  const hasActionDoc = documents.some(d => d.isActionRequired);

  const mainNav = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'opportunities', label: t.navOpportunities, icon: Compass },
    { id: 'applications', label: t.navApplications, icon: FileText },
    { id: 'passport', label: t.navPassport, icon: Award },
    { id: 'documents', label: t.navDocuments, icon: FolderOpen, badge: hasActionDoc },
    { id: 'money', label: 'Money Journey', icon: DollarSign },
    { id: 'family', label: t.navFamily, icon: Users },
    { id: 'saathi', label: t.askSaathi, icon: MessageSquareHeart },
    { id: 'grievance', label: t.navHelp, icon: LifeBuoy }
  ];

  return (
    <aside
      className="desktop-sidebar hidden lg:flex"
      style={{
        width: '260px',
        backgroundColor: 'var(--color-pure-white)',
        borderRight: '1px solid var(--color-border)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        flexShrink: 0
      }}
    >
      <div>
        {/* Student Mini Profile Card */}
        <div style={{
          backgroundColor: 'var(--color-warm-sand-light)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-deep-forest)',
              color: '#FFFFFF',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>
              AK
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-charcoal)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {studentProfile.fullName}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>
                ST • {studentProfile.passportId}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
              <span>Profile Complete</span>
              <span style={{ fontWeight: 700, color: 'var(--color-deep-forest)' }}>{studentProfile.profileCompletion}%</span>
            </div>
            <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--color-warm-sand-dark)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${studentProfile.profileCompletion}%`, height: '100%', backgroundColor: 'var(--color-success)' }} />
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-subtle-text)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px 8px' }}>
            Navigation
          </div>

          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-deep-forest)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--color-charcoal)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} color={isActive ? '#FFFFFF' : 'var(--color-muted-green)'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    backgroundColor: isActive ? 'var(--color-warning)' : 'var(--color-warning-bg)',
                    color: isActive ? '#FFFFFF' : 'var(--color-warning-dark)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    Action
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Officer Portal Link */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        <button
          onClick={() => {
            setUserRole(userRole === 'officer' ? 'student' : 'officer');
            if (userRole === 'student') setActiveTab('admin');
            else setActiveTab('home');
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: userRole === 'officer' ? 'var(--color-terracotta)' : 'var(--color-warm-sand)',
            color: userRole === 'officer' ? '#FFFFFF' : 'var(--color-deep-forest)',
            fontSize: '0.82rem',
            fontWeight: 600
          }}
        >
          <ShieldCheck size={18} />
          <span>{userRole === 'officer' ? 'Officer Mode Active' : 'Switch to Officer View'}</span>
        </button>

        <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle-text)', textAlign: 'center', marginTop: '12px' }}>
          SIH 2026 • Unified ST Platform
        </div>
      </div>
    </aside>
  );
}
