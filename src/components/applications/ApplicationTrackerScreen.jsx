import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle, 
  Download, 
  PlusCircle, 
  ShieldCheck,
  Building2,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function ApplicationTrackerScreen() {
  const {
    applications,
    setActiveTab,
    scholarships,
    setApplyModalScheme
  } = useApp();

  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || null);

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  return (
    <div className="application-tracker-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0 }}>
            Application Tracker
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Real-time stage transparency for your ST scholarship submissions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('opportunities')}
          className="btn-terracotta"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <PlusCircle size={16} />
          <span>Apply for Another Scheme</span>
        </button>
      </div>

      {applications.length === 0 ? (
        /* Empty State */
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: '0 0 8px' }}>
            You haven't applied yet.
          </h3>
          <p style={{ maxWidth: '420px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
            Explore high-matching schemes for ST students and submit in just 5 guided steps.
          </p>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <span>Find Scholarships</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* LEFT: Applications Selection List */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-muted-green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              Your Submissions ({applications.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applications.map((app) => {
                const isSelected = app.id === activeApp?.id;
                const isApproved = app.currentStage === 'Approved';

                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className="card"
                    style={{
                      padding: '18px',
                      cursor: 'pointer',
                      borderLeft: isSelected ? '5px solid var(--color-terracotta)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-warm-sand-light)' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-muted-green)' }}>
                        {app.applicationId}
                      </span>
                      <span className={`badge ${isApproved ? 'badge-success' : 'badge-warning'}`}>
                        {app.currentStage}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-charcoal)', margin: '0 0 6px' }}>
                      {app.schemeTitle}
                    </h4>

                    <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Applied: {app.appliedDate}</span>
                      <span>•</span>
                      <span>Grant: ₹{app.grantAmount?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Detailed Visual Vertical Stage Timeline */}
          {activeApp && (
            <motion.div
              key={activeApp.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="card tribal-accent-border"
              style={{ padding: '28px 24px', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-terracotta)' }}>
                    APPLICATION ID: {activeApp.applicationId}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', color: 'var(--color-deep-forest)', margin: '4px 0 2px' }}>
                    {activeApp.schemeTitle}
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                    Academic Session: {activeApp.academicYear} • Direct DBT Route
                  </div>
                </div>

                <span className="badge badge-forest">
                  Active Lifecycle
                </span>
              </div>

              {/* Status Explanation Highlight Card */}
              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '28px'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-muted-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Current Status Explanation
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                  {activeApp.currentStage}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', margin: 0, lineHeight: 1.45 }}>
                  "{activeApp.statusHuman}"
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '10px',
                  marginTop: '12px',
                  fontSize: '0.78rem',
                  color: 'var(--color-subtle-text)'
                }}>
                  <div>
                    Last updated: <strong>{activeApp.lastUpdated}</strong>
                  </div>
                  <div>
                    Next expected stage: <strong>{activeApp.nextExpectedStage}</strong>
                  </div>
                </div>
              </div>

              {/* Connected Vertical Timeline */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-charcoal)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
                  Verification & Disbursement Stages
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {activeApp.stages.map((stg, idx) => {
                    const isLast = idx === activeApp.stages.length - 1;

                    return (
                      <div key={stg.name} style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', minHeight: '64px' }}>
                        
                        {/* Vertical line connecting nodes */}
                        {!isLast && (
                          <div style={{
                            position: 'absolute',
                            left: '14px',
                            top: '28px',
                            bottom: '-6px',
                            width: '2px',
                            backgroundColor: stg.completed ? 'var(--color-success)' : 'var(--color-border)',
                            zIndex: 1
                          }} />
                        )}

                        {/* Node Icon */}
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: stg.completed ? 'var(--color-success)' : stg.current ? 'var(--color-terracotta)' : 'var(--color-warm-sand)',
                          color: stg.completed || stg.current ? '#FFFFFF' : 'var(--color-subtle-text)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          marginRight: '16px',
                          zIndex: 2,
                          flexShrink: 0,
                          boxShadow: stg.current ? '0 0 0 4px var(--color-terracotta-soft)' : 'none'
                        }}>
                          {stg.completed ? '✓' : stg.current ? '●' : '○'}
                        </div>

                        {/* Stage Text */}
                        <div style={{ flex: 1, paddingBottom: isLast ? 0 : '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <div style={{
                              fontWeight: stg.current ? 700 : 600,
                              fontSize: '0.95rem',
                              color: stg.current ? 'var(--color-terracotta-dark)' : stg.completed ? 'var(--color-deep-forest)' : 'var(--color-muted-text)'
                            }}>
                              {stg.name}
                            </div>
                            <span style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>
                              {stg.date}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                            {stg.remarks}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Informative Processing Notice */}
              <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)', backgroundColor: 'var(--color-warm-sand)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                * Note: Timelines are indicative and depend on state scrutiny cycles and Treasury clearance. No exact processing dates are legally guaranteed.
              </div>
            </motion.div>
          )}

        </div>
      )}
    </div>
  );
}
