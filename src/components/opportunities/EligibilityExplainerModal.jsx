import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  HelpCircle,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { TribalDivider } from '../common/TribalPattern';

export function EligibilityExplainerModal() {
  const {
    explainerModalScheme,
    setExplainerModalScheme,
    setApplyModalScheme,
    studentProfile
  } = useApp();

  const [showRulesTab, setShowRulesTab] = useState(false);

  if (!explainerModalScheme) return null;

  const scheme = explainerModalScheme;

  const handleContinueApply = () => {
    const s = explainerModalScheme;
    setExplainerModalScheme(null);
    setApplyModalScheme(s);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(18, 59, 50, 0.45)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '16px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
          position: 'relative'
        }}
        className="tribal-accent-border"
      >
        {/* Top Header */}
        <div style={{
          padding: '22px 24px 16px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <span className="badge badge-terracotta" style={{ marginBottom: '6px' }}>
              Potential Match Breakdown
            </span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-deep-forest)', margin: '4px 0 2px' }}>
              Why this scholarship appears for you
            </h2>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
              {scheme.title}
            </div>
          </div>

          <button
            onClick={() => setExplainerModalScheme(null)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-charcoal)'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          {!showRulesTab ? (
            <>
              {/* SECTION: YOU TOLD US */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-muted-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px'
                }}>
                  YOU TOLD US:
                </div>

                <div style={{
                  backgroundColor: 'var(--color-warm-sand-light)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span><strong>ST category</strong> ({studentProfile.tribeSubcaste} community)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span><strong>{studentProfile.currentEducation}</strong> level</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span><strong>{studentProfile.course}</strong> ({studentProfile.institution})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>Family income: <strong>₹2.5 lakh</strong> / annum</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>State: <strong>{studentProfile.state}</strong> (District: {studentProfile.district})</span>
                  </div>
                </div>
              </div>

              {/* SECTION: RELEVANT FACTORS */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-terracotta)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px'
                }}>
                  RELEVANT FACTORS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {scheme.reasons ? (
                    scheme.reasons.map((r, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)'
                      }}>
                        <CheckCircle2 size={16} color="var(--color-success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal)', lineHeight: 1.45 }}>{r}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                        <CheckCircle2 size={16} color="var(--color-success)" />
                        <span>Category requirement appears relevant</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                        <CheckCircle2 size={16} color="var(--color-success)" />
                        <span>Education level appears relevant</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                        <CheckCircle2 size={16} color="var(--color-success)" />
                        <span>Other scheme criteria may apply</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* IMPORTANT MANDATORY STATUTORY NOTICE */}
              <div style={{
                backgroundColor: 'var(--color-warm-sand)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-deep-forest)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                  <AlertCircle size={15} color="var(--color-terracotta)" />
                  <span>IMPORTANT STATUTORY NOTICE</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)', margin: 0, lineHeight: 1.5 }}>
                  "Final eligibility is determined exclusively by the concerned competent authority (Ministry of Tribal Affairs / State Welfare Directorate). Tribal Saathi provides guidance and preparatory assistance."
                </p>
              </div>

              {/* BUTTONS */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleContinueApply}
                  className="btn-terracotta"
                  style={{ flex: 1.2, padding: '13px' }}
                >
                  <span>Continue Application</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setShowRulesTab(true)}
                  className="btn-secondary"
                  style={{ flex: 0.9, padding: '13px' }}
                >
                  <BookOpen size={16} />
                  <span>View Scheme Rules</span>
                </button>
              </div>
            </>
          ) : (
            /* OFFICIAL SCHEME RULES VIEW */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-deep-forest)' }}>
                  Official Guidelines & Criteria
                </h4>
                <button
                  onClick={() => setShowRulesTab(false)}
                  className="btn-ghost"
                  style={{ fontSize: '0.82rem', padding: '4px 8px' }}
                >
                  ← Back to Match Explainer
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {scheme.rules?.map((rule, idx) => (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-sand-light)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}>
                    • {rule}
                  </div>
                ))}
              </div>

              <div style={{ padding: '12px', backgroundColor: 'var(--color-warm-sand)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--color-muted-text)', marginBottom: '20px' }}>
                Sanctioning Authority: Ministry of Tribal Affairs, Government of India / Government of Tamil Nadu Adi Dravidar and Tribal Welfare Department.
              </div>

              <button
                onClick={handleContinueApply}
                className="btn-terracotta"
                style={{ width: '100%', padding: '14px' }}
              >
                <span>Proceed to Apply with These Rules</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
