import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  FileText, 
  Award, 
  Users 
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function RootLandingScreen({ onNavigate }) {
  const { loginAsStudent, loginAsOfficer } = useAuth();

  const handleQuickStudent = () => {
    loginAsStudent({ isDemo: true });
  };

  const handleQuickOfficer = () => {
    loginAsOfficer({ isDemo: true });
  };

  return (
    <div className="root-landing-screen" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-warm-sand-light)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <TribalWatermark opacity={0.03} />

      {/* Top Demo Tag Header */}
      <div style={{
        backgroundColor: 'var(--color-deep-forest)',
        color: 'var(--color-warm-sand)',
        padding: '8px 20px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: 'var(--color-terracotta)',
            color: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 800,
            fontSize: '0.72rem',
            letterSpacing: '0.04em'
          }}>
            SIH 2026 DEMO
          </span>
          <span>Unified Scholarship Guidance & Scrutiny Platform</span>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'rgba(245, 239, 230, 0.8)' }}>
          Ministry of Tribal Affairs • Civic-Tech Prototype
        </div>
      </div>

      {/* Main Hero Container */}
      <div style={{
        flex: 1,
        maxWidth: '1040px',
        width: '100%',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}>
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          {/* Subtle tribal geometric emblem */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '18px',
            backgroundColor: 'var(--color-deep-forest)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(18, 59, 50, 0.25)',
            marginBottom: '18px'
          }}>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 L28 26 L4 26 Z" stroke="var(--color-terracotta)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M16 12 L22 24 L10 24 Z" fill="var(--color-warm-sand)" />
              <circle cx="16" cy="18" r="2.5" fill="var(--color-deep-forest)" />
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--color-deep-forest)',
            margin: '0 0 8px',
            letterSpacing: '-0.02em'
          }}>
            SCHOLAR ORBIT
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--color-muted-text)',
            margin: '0 auto 16px',
            maxWidth: '560px',
            lineHeight: 1.5
          }}>
            "Your Scholarship Journey, Simplified."
          </p>

          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-warm-sand)',
            border: '1px solid var(--color-border)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--color-deep-forest)'
          }}>
            Who are you? Select your portal to continue
          </div>
        </motion.div>

        {/* Two Large Role Cards (Student vs Officer) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '880px',
          marginBottom: '36px'
        }}>
          {/* Card 1: 🎓 STUDENT */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="card tribal-accent-border"
            style={{
              padding: '32px 28px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-deep-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  🎓
                </div>
                <span className="badge badge-forest" style={{ fontSize: '0.74rem' }}>
                  STUDENT PORTAL
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '0 0 8px', fontWeight: 800 }}>
                STUDENT
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted-text)', lineHeight: 1.55, margin: '0 0 20px' }}>
                "Find scholarships, apply and track your journey."
              </p>

              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--color-charcoal)',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div>• Discover matched ST scholarship opportunities</div>
                <div>• Track 5-stage government verification live</div>
                <div>• Unified Document Vault & Scholarship Passport</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onNavigate('student-login')}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Continue as Student</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={handleQuickStudent}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                title="1-Click Instant Demo Login as Arun Kumar"
              >
                <Sparkles size={14} color="var(--color-terracotta)" />
                <span>Quick Demo: Student Mode (Arun Kumar)</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: 🛡️ OFFICER */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="card"
            style={{
              padding: '32px 28px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  🛡️
                </div>
                <span className="badge badge-terracotta" style={{ fontSize: '0.74rem' }}>
                  OFFICER PORTAL
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '0 0 8px', fontWeight: 800 }}>
                OFFICER
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted-text)', lineHeight: 1.55, margin: '0 0 20px' }}>
                "Review applications and manage scholarship cases."
              </p>

              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--color-charcoal)',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div>• Scrutiny workbench & priority queue</div>
                <div>• Document authenticity checking with e-Seal</div>
                <div>• DBT batch release & citizen grievance redressal</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onNavigate('officer-login')}
                className="btn-terracotta"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Officer Login</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={handleQuickOfficer}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                title="1-Click Instant Demo Login as Dr. K. Senthil Nathan, IAS"
              >
                <Sparkles size={14} color="var(--color-deep-forest)" />
                <span>Quick Demo: Officer Mode (Desk #04)</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Demo Environment Disclaimer Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          maxWidth: '720px',
          width: '100%',
          fontSize: '0.78rem',
          color: 'var(--color-muted-text)',
          textAlign: 'center',
          lineHeight: 1.5
        }}>
          <strong>SIH 2026 DEMO ENVIRONMENT:</strong> This platform is an educational civic-tech prototype demonstrating unified ST scholarship discovery, document verification, and DBT tracking. Demo accounts provide simulated government workflow access without exposing real personal or financial records.
        </div>
      </div>
    </div>
  );
}
