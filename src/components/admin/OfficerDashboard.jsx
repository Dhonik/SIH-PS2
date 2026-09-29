import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  ArrowRight, 
  FolderOpen, 
  LifeBuoy, 
  DollarSign
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerDashboard() {
  const {
    studentProfile,
    applications,
    documents,
    grievances,
    setActiveTab,
    setUserRole
  } = useApp();

  const pendingDocsCount = documents.filter(d => d.status !== 'Verified').length;
  const pendingAppsCount = applications.filter(a => a.currentStage !== 'Approved' && a.currentStage !== 'Payment').length;
  const openGrievancesCount = grievances.filter(g => g.status !== 'Resolved').length;

  return (
    <div className="officer-dashboard-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Top Officer Status Header */}
      <div style={{
        backgroundColor: 'var(--color-deep-forest)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--color-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <ShieldCheck size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.55rem', color: '#FFFFFF', margin: 0, fontWeight: 800 }}>
                District Welfare Directorate Dashboard
              </h1>
              <span style={{ 
                fontSize: '0.72rem', 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: '#FFFFFF',
                padding: '3px 8px', 
                borderRadius: '4px', 
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                DESK #04 • TAMIL NADU
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-warm-sand)', margin: '4px 0 0' }}>
              Ministry of Tribal Affairs & Directorate of Tribal Welfare • Scrutiny & Verification Desk
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              setUserRole('student');
              setActiveTab('home');
            }}
            className="btn-secondary"
            style={{ 
              backgroundColor: '#FFFFFF', 
              color: 'var(--color-deep-forest)', 
              padding: '9px 16px', 
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Switch to Student View</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5 Official High-Level Statistics (Preserved & Prominent) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        
        {/* Total Students */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Users size={16} color="var(--color-deep-forest)" />
            <span>Total Students</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '6px 0 2px' }}>
            12,482
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>Verified ST Profiles</div>
        </div>

        {/* Applications */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <FileText size={16} color="var(--color-terracotta)" />
            <span>Applications</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-charcoal)', margin: '6px 0 2px' }}>
            8,294
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>Across 5 Schemes</div>
        </div>

        {/* Pending Verification */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning-dark)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Clock size={16} />
            <span>Pending Verification</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning-dark)', margin: '6px 0 2px' }}>
            1,842
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-warning-dark)' }}>Action required by desk</div>
        </div>

        {/* Approved */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-success)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success-dark)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <CheckCircle2 size={16} />
            <span>Approved</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success-dark)', margin: '6px 0 2px' }}>
            5,102
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-success)' }}>Sanction orders issued</div>
        </div>

        {/* Disbursed */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <IndianRupee size={16} color="var(--color-deep-forest)" />
            <span>Disbursed</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '6px 0 2px' }}>
            ₹2.84 Cr
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>Direct to bank (DBT)</div>
        </div>

      </div>

      {/* TODAY'S PRIORITY QUEUE SECTION */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Today's Priority Queue
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', margin: '3px 0 0' }}>
              Actionable tasks allocated to Officer Desk #04 for today's scrutiny cycle.
            </p>
          </div>
          <span className="badge badge-forest" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
            4 Priority Streams Active
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          
          {/* Priority Card 1: Applications Requiring Action */}
          <div className="card tribal-accent-border" style={{ padding: '22px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-deep-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={22} />
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  {pendingAppsCount} Applications Pending
                </span>
              </div>

              <h3 style={{ fontSize: '1.08rem', color: 'var(--color-charcoal)', margin: '0 0 6px', fontWeight: 700 }}>
                Applications Requiring Action
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Candidate applications pending Government Verification and district sanction orders.
              </p>

              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Top Candidate: {studentProfile.fullName}</div>
                <div style={{ color: 'var(--color-muted-text)' }}>Post-Matric Scholarship • CEG Anna Univ</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('applications')}
              className="btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Review Applications</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Priority Card 2: Documents Requiring Verification */}
          <div className="card" style={{ padding: '22px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FolderOpen size={22} />
                </div>
                <span className="badge badge-terracotta" style={{ fontSize: '0.72rem' }}>
                  {pendingDocsCount > 0 ? `${pendingDocsCount} Action Required` : 'All Clear'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.08rem', color: 'var(--color-charcoal)', margin: '0 0 6px', fontWeight: 700 }}>
                Documents Requiring Verification
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5, margin: '0 0 16px' }}>
                State Revenue & academic certificates uploaded by students requiring digital e-Seal inspection.
              </p>

              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Queue: Annual Income Certificate</div>
                <div style={{ color: 'var(--color-muted-text)' }}>AI Optical check: 98% confidence score</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('documents')}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Verify Documents</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Priority Card 3: Pending Grievances */}
          <div className="card" style={{ padding: '22px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LifeBuoy size={22} />
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  {openGrievancesCount} Open Escalations
                </span>
              </div>

              <h3 style={{ fontSize: '1.08rem', color: 'var(--color-charcoal)', margin: '0 0 6px', fontWeight: 700 }}>
                Pending Grievances
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Student escalations regarding disbursement timelines and renewal documentation queries.
              </p>

              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Ticket #{grievances[0]?.ticketNumber || 'GRV-2026-904'}</div>
                <div style={{ color: 'var(--color-muted-text)' }}>Category: Payment (Tranche 2 inquiry)</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('grievance')}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>Review Grievances</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Priority Card 4: Disbursements Awaiting Release */}
          <div className="card" style={{ padding: '22px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-deep-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DollarSign size={22} />
                </div>
                <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                  ₹45.44 L Queued
                </span>
              </div>

              <h3 style={{ fontSize: '1.08rem', color: 'var(--color-charcoal)', margin: '0 0 6px', fontWeight: 700 }}>
                Disbursements Awaiting Release
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Approved DBT batches countersigned by Treasury ready for PFMS dispatch.
              </p>

              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>Batch #TN-2026-B4</div>
                <div style={{ color: 'var(--color-muted-text)' }}>142 students • Ready for PFMS push</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('money')}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>View Disbursements</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="card" style={{ padding: '20px 24px', backgroundColor: 'var(--color-warm-sand-light)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-deep-forest)' }}>
              Officer Scrutiny Quick Navigation
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)' }}>
              Jump directly to specific verification workspaces in Officer Mode.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('applications')}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              [Review Applications]
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              [Verify Documents]
            </button>
            <button
              onClick={() => setActiveTab('grievance')}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              [Review Grievances]
            </button>
            <button
              onClick={() => setActiveTab('money')}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              [View Disbursements]
            </button>
          </div>
        </div>
      </div>

      {/* Compliance / Demo Notice */}
      <div style={{
        padding: '14px 18px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '0.78rem',
        color: 'var(--color-subtle-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <span>
          <strong>SIH 2026 DEMO ENVIRONMENT:</strong> Officer Portal connected to mock state registry. Actions simulate institutional verification flows.
        </span>
        <span style={{ color: 'var(--color-deep-forest)', fontWeight: 600 }}>
          Direct to DBT Engine • e-Office Standard Compliant
        </span>
      </div>
    </div>
  );
}
