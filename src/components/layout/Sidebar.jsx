import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
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
  AlertTriangle,
  Settings,
  User,
  ArrowRight,
  LogOut
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

  const { logout, user, switchToStudentDemo } = useAuth();

  const isOfficer = userRole === 'officer';
  const hasActionDoc = documents.some(d => d.isActionRequired);

  // Student Navigation Items (Section 10 requirement)
  const studentNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'opportunities', label: 'Opportunities', icon: Compass },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'passport', label: 'Passport', icon: Award },
    { id: 'documents', label: 'Documents', icon: FolderOpen, badge: hasActionDoc ? 'Action' : null },
    { id: 'money', label: 'Money Journey', icon: DollarSign },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'saathi', label: 'Ask Saathi', icon: MessageSquareHeart },
    { id: 'grievance', label: 'Help / Grievance', icon: LifeBuoy }
  ];

  // Officer Navigation Items (Section 9 requirement)
  const officerNav = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'opportunities', label: 'Scholarships', icon: Compass },
    { id: 'applications', label: 'Applications', icon: FileText, badge: '14 Pending' },
    { id: 'passport', label: 'Students / Passport', icon: Award },
    { id: 'documents', label: 'Documents', icon: FolderOpen, badge: '28 Action' },
    { id: 'money', label: 'Disbursements', icon: DollarSign },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'grievance', label: 'Grievances', icon: LifeBuoy, badge: '3 Open' },
    { id: 'saathi', label: 'Ask Saathi', icon: MessageSquareHeart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const currentNav = isOfficer ? officerNav : studentNav;

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
        {/* Profile Card: Adaptive for Student vs Officer */}
        {isOfficer ? (
          <div style={{
            backgroundColor: 'var(--color-warm-sand-light)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-deep-forest)',
                color: '#FFFFFF',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem'
              }}>
                SN
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-charcoal)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  Dr. K. Senthil Nathan, IAS
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                  District Welfare Officer
                </div>
              </div>
            </div>

            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>DESK #04</span>
              <span style={{ fontWeight: 700, color: 'var(--color-deep-forest)', backgroundColor: 'var(--color-warm-sand)', padding: '1px 6px', borderRadius: '4px' }}>
                TAMIL NADU
              </span>
            </div>
          </div>
        ) : (
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
        )}

        {/* Navigation Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-subtle-text)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px 8px' }}>
            {isOfficer ? 'Officer Navigation' : 'Navigation'}
          </div>

          {currentNav.map((item) => {
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
                  padding: '9px 13px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-deep-forest)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--color-charcoal)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.86rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} strokeWidth={isActive ? 2.2 : 1.75} color={isActive ? '#FFFFFF' : 'var(--color-muted-green)'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.66rem',
                    backgroundColor: isActive ? 'var(--color-warning)' : 'var(--color-warning-bg)',
                    color: isActive ? '#FFFFFF' : 'var(--color-warning-dark)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Mode Switcher */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        {isOfficer && (
          <button
            onClick={() => {
              switchToStudentDemo();
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-terracotta)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Demo function: Return to Student View"
          >
            <User size={16} />
            <span>Return to Student View (Demo)</span>
          </button>
        )}

        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            marginTop: '8px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted-text)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Sign out of your account"
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>

        <div style={{ fontSize: '0.68rem', color: 'var(--color-subtle-text)', textAlign: 'center', marginTop: '10px' }}>
          SIH 2026 • Unified ST Platform
        </div>
      </div>
    </aside>
  );
}

