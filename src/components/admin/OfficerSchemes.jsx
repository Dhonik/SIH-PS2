import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  ArrowRight, 
  Sliders, 
  X,
  FileText
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerSchemes() {
  const { setActiveTab } = useApp();
  const [selectedSchemeForManage, setSelectedSchemeForManage] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  const officerSchemesList = [
    {
      id: 'pre-matric-st',
      code: 'PRE-ST-2026',
      name: 'Pre-Matric Scholarship for ST Students',
      shortName: 'PRE-MATRIC',
      status: 'Active',
      level: 'Secondary School (Class 9 & 10)',
      target: 'Supports ST children studying in Class 9 and 10 to minimise dropout rates.',
      applicationsCount: 3120,
      pendingCount: 412,
      approvedCount: 2580,
      applicationWindow: '01 Jul 2026 – 30 Nov 2026',
      incomeCeiling: '₹2,50,000 / year',
      budgetAllocated: '₹3.74 Cr',
      benefitRange: 'Up to ₹12,000 / year + book grants'
    },
    {
      id: 'post-matric-st',
      code: 'PM-ST-2026',
      name: 'Post-Matric Scholarship for ST Students',
      shortName: 'POST-MATRIC',
      status: 'Active',
      level: 'Higher Education (UG / PG / Diploma)',
      target: 'Primary financial support covering course fee and maintenance allowance for post-secondary education.',
      applicationsCount: 4821,
      pendingCount: 1102,
      approvedCount: 3240,
      applicationWindow: '01 Jul 2026 – 15 Nov 2026',
      incomeCeiling: '₹2,50,000 / year',
      budgetAllocated: '₹14.50 Cr',
      benefitRange: 'Up to ₹40,000 / year (Fee + Living)'
    },
    {
      id: 'top-class-st',
      code: 'TC-ST-2026',
      name: 'Top Class Education Scheme for ST Students',
      shortName: 'TOP CLASS',
      status: 'Active',
      level: 'Premier Institutes (IITs, NITs, AIIMS, CEG)',
      target: 'Full financial support for meritorious ST students admitted to notified institutions of national excellence.',
      applicationsCount: 420,
      pendingCount: 64,
      approvedCount: 310,
      applicationWindow: '15 Jun 2026 – 31 Oct 2026',
      incomeCeiling: '₹8,000,000 / year',
      budgetAllocated: '₹2.10 Cr',
      benefitRange: 'Full Tuition Fee + Living Expenses + Computer Grant (₹50,000+)'
    },
    {
      id: 'national-fellowship-st',
      code: 'NF-ST-2026',
      name: 'National Fellowship for ST Students',
      shortName: 'NATIONAL FELLOWSHIP',
      status: 'Active',
      level: 'Research (M.Phil / Ph.D)',
      target: 'Supports ST scholars pursuing regular full-time research in Indian universities.',
      applicationsCount: 180,
      pendingCount: 28,
      approvedCount: 120,
      applicationWindow: '01 Jan 2027 – 28 Feb 2027',
      incomeCeiling: 'No Income Ceiling',
      budgetAllocated: '₹1.85 Cr',
      benefitRange: '₹31,000 - ₹35,000 / month stipend + contingency'
    },
    {
      id: 'national-overseas-st',
      code: 'NOS-ST-2026',
      name: 'National Overseas Scholarship for ST Students',
      shortName: 'NATIONAL OVERSEAS',
      status: 'Active',
      level: 'International Studies (QS Top 500)',
      target: 'Financial assistance for ST students to pursue Masters, Ph.D, and Post-Doctoral studies abroad.',
      applicationsCount: 95,
      pendingCount: 14,
      approvedCount: 42,
      applicationWindow: '01 Mar 2027 – 30 Apr 2027',
      incomeCeiling: '₹6,00,000 / year',
      budgetAllocated: '₹4.20 Cr',
      benefitRange: 'Full international tuition + US$15,400 / £9,900 annual living'
    }
  ];

  const handleSaveSchemeConfig = (e) => {
    e.preventDefault();
    setSuccessToast(`Policy guidelines and quota allocation updated for ${selectedSchemeForManage.shortName}.`);
    setSelectedSchemeForManage(null);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="officer-schemes-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Scholarship Schemes
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              OFFICER MANAGEMENT DESK
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Ministry of Tribal Affairs central & centrally-sponsored schemes. Monitor quota, intake windows, and application scrutiny velocity.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('applications')}
          className="btn-primary"
          style={{ padding: '9px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FileText size={16} />
          <span>Go to Applications Queue</span>
        </button>
      </div>

      {/* Toast Notification */}
      {successToast && (
        <div style={{
          backgroundColor: 'var(--color-success-bg)',
          color: 'var(--color-success-dark)',
          border: '1px solid var(--color-success)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* 5 Scheme Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        {officerSchemesList.map((scheme) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {scheme.shortName}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                    {scheme.status}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                    • Code: {scheme.code}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '0 0 6px', fontWeight: 700 }}>
                  {scheme.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', margin: 0, maxWidth: '750px', lineHeight: 1.5 }}>
                  {scheme.target}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>View Applications</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => setSelectedSchemeForManage(scheme)}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Sliders size={14} />
                  <span>Manage Scheme</span>
                </button>
              </div>
            </div>

            {/* Scheme Metrics Dashboard Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              backgroundColor: 'var(--color-warm-sand-light)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '14px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Applications
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  {scheme.applicationsCount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>Logged statewide</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-warning-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Pending
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-warning-dark)', marginTop: '2px' }}>
                  {scheme.pendingCount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-warning-dark)' }}>In Scrutiny Queue</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-success-dark)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Approved
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-success-dark)', marginTop: '2px' }}>
                  {scheme.approvedCount.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-success)' }}>Sanction orders issued</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-deep-forest)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Budget Outlay
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-deep-forest)', marginTop: '2px' }}>
                  {scheme.budgetAllocated}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>Total Allocated</div>
              </div>
            </div>

            {/* Application Window & Benefit Meta */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--color-subtle-text)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--color-terracotta)" />
                <span>Application Window: <strong>{scheme.applicationWindow}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IndianRupee size={14} color="var(--color-deep-forest)" />
                <span>Benefit Cap: <strong>{scheme.benefitRange}</strong></span>
              </div>
              <div>
                Income Limit: <strong>{scheme.incomeCeiling}</strong>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scheme Management Drawer / Modal */}
      {selectedSchemeForManage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(18, 59, 50, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60,
          padding: '20px'
        }}>
          <div className="card tribal-accent-border" style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                  SCHEME CONFIGURATION
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '6px 0 0', fontWeight: 800 }}>
                  Manage {selectedSchemeForManage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchemeForManage(null)}
                style={{ color: 'var(--color-subtle-text)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSchemeConfig}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Application Cycle Window</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue={selectedSchemeForManage.applicationWindow}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Family Income Ceiling (₹)</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue={selectedSchemeForManage.incomeCeiling}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">District Quota Target</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue="3,500 Beneficiaries"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Active Verification Gateways</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" defaultChecked />
                      <span>State Revenue e-District API (Income & ST Certificate)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" defaultChecked />
                      <span>NPCI DBT Aadhaar Seeding Bridge</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" defaultChecked />
                      <span>Institute Nodal Officer Digital Signature Check</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Directorate Internal Circular Note</label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    placeholder="Enter special dispensation or instruction notes for verifying desk officers..."
                    defaultValue="Strictly verify Income Certificate validity for FY 2026-27 renewals."
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedSchemeForManage(null)}
                  className="btn-secondary"
                  style={{ padding: '10px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 18px' }}
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
