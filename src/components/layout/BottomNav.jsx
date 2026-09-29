import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  FileText, 
  Award, 
  MessageSquareHeart,
  FolderOpen
} from 'lucide-react';

export function BottomNav() {
  const { activeTab, setActiveTab, t, documents } = useApp();

  const hasActionDoc = documents.some(d => d.isActionRequired);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'opportunities', label: t.navOpportunities, icon: Compass },
    { id: 'applications', label: t.navApplications, icon: FileText },
    { id: 'passport', label: t.navPassport, icon: Award },
    { id: 'documents', label: t.navDocuments, icon: FolderOpen, badge: hasActionDoc }
  ];

  return (
    <>
      {/* Floating "Ask Saathi" Button on Mobile */}
      <button
        onClick={() => setActiveTab('saathi')}
        className="floating-saathi-btn"
        style={{
          position: 'fixed',
          bottom: '86px',
          right: '18px',
          zIndex: 45,
          backgroundColor: 'var(--color-terracotta)',
          color: '#FFFFFF',
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 24px rgba(201, 107, 75, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          fontSize: '0.9rem',
          border: '2px solid rgba(255,255,255,0.3)',
          transition: 'all 0.2s ease'
        }}
        aria-label="Ask Saathi AI Assistant"
      >
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>💬</span>
        <span>{t.askSaathi}</span>
      </button>

      {/* Mobile Bottom Navigation Bar (Visible on < 1024px screens) */}
      <nav
        className="bottom-nav-mobile"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68px',
          backgroundColor: 'var(--color-pure-white)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 40,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.04)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
        aria-label="Mobile Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                height: '100%',
                color: isActive ? 'var(--color-deep-forest)' : 'var(--color-subtle-text)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-3px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-warning)'
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.01em'
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '32px',
                    height: '3px',
                    backgroundColor: 'var(--color-terracotta)',
                    borderRadius: '0 0 3px 3px'
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
